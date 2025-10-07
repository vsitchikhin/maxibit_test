import { Service } from '@/services/service';
import { cocktailsStore } from '@/services/cocktails/cocktails.store';
import type { CocktailNamesEnum, ICocktail, Ingredient } from '@/types/coctail.types';
import { LoadingStatusesEnum } from '@/types/api.types';

export class CocktailsService extends Service {
  private store;

  public constructor() {
    super();
    this.store = cocktailsStore();
  }

  // --------------------------------------------------------
  // Геттеры из стора
  get cocktails() {
    return this.store.cocktails;
  }

  // --------------------------------------------------------
  // API запросы
  public async getCocktailInfo(code: CocktailNamesEnum) {
    const url = `${this.apiUrl}search.php?s=${code}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        const message = `HTTP ${response.status}`;
        this.store.SET_COCKTAIL_STATE_BY_CODE(code, {
          data: null,
          status: LoadingStatusesEnum.error,
          error: message,
        });

        return false;
      }

      let raw: unknown;
      try {
        raw = await response.json();
      } catch(err) {
        const message = 'Invalid Response';
        this.store.SET_COCKTAIL_STATE_BY_CODE(code, {
          data: null,
          status: LoadingStatusesEnum.error,
          error: message,
        });

        return false;
      }

      const payload = this.normalizePayload(raw);

      // Финальная проверка ошибок
      if (typeof payload === 'string') {
        this.store.SET_COCKTAIL_STATE_BY_CODE(code, {
          data: null,
          status: LoadingStatusesEnum.error,
          error: payload,
        });

        return false;
      }

      if (payload === null) {
        this.store.SET_COCKTAIL_STATE_BY_CODE(code, {
          data: null,
          status: LoadingStatusesEnum.error,
          error: 'Something went wrong',
        });

        return false;
      }

      this.store.SET_COCKTAIL_STATE_BY_CODE(code, {
        data: payload.map(cocktail => ({
          ...cocktail,
          ingredients: this.extractIngredients(cocktail),
        })),
        status: LoadingStatusesEnum.loaded,
        error: null,
      });

      return true;
    } catch(error) {
      const message = error instanceof Error ? error.message : 'Network Error';
      this.store.SET_COCKTAIL_STATE_BY_CODE(code, {
        data: null,
        status: LoadingStatusesEnum.error,
        error: message,
      });

      return false;
    }
  }

  // --------------------------------------------------------
  // Методы сервиса
  public checkDataExists(code: CocktailNamesEnum) {
    return this.cocktails[code].data !== null;
  }

  protected normalizePayload(raw: unknown): string | ICocktail[] | null {
    if (typeof raw === 'string') return raw;
    if (raw === null) return raw;

    if (typeof raw === 'object' && 'drinks' in (raw as Record<string, unknown>)) {
      const drinks = (raw as { drinks: unknown }).drinks;
      if (Array.isArray(drinks) || drinks === null) return drinks as ICocktail[] | null;

      return 'Payload error: drinks must be an array or null.';
    }

    if (Array.isArray(raw)) return raw as ICocktail[];

    return 'Payload error';
  }

  public extractIngredients(cocktail: ICocktail) {
    const ingredientPrefix = 'strIngredient';
    const measurePrefix = 'strMeasure';

    const ingredientRx = new RegExp(`^${ingredientPrefix}(\\d+)$`);
    const measureRx = new RegExp(`^${measurePrefix}(\\d+)$`);

    const ingredientList: Record<number, Ingredient> = {};

    for (const [key, value] of Object.entries(cocktail)) {
      if (value === null) {
        continue;
      }

      let match = key.match(ingredientRx);
      if (match) {
        const index = Number(match[1]) - 1;
        if (!ingredientList[index]) ingredientList[index] = { measure: '', name: '' };
        ingredientList[index].name = value.trim();
      }

      match = key.match(measureRx);
      if (match) {
        const index = Number(match[1]) - 1;
        if (!ingredientList[index]) ingredientList[index] = { measure: '', name: '' };
        ingredientList[index].measure = value.trim();
      }
    }

    return Object.keys(ingredientList)
      .map(n => parseInt(n))
      .sort((a, b) => a - b)
      .map(index => {
        if (!ingredientList[index]) ingredientList[index] = { measure: '', name: '' };
        const { name, measure } = ingredientList[index];
        return { index, name, measure };
      })
      .filter(item => !!item.name && item.name.trim() !== '' && !!item.measure && item.measure.trim() !== '');
  }
}
