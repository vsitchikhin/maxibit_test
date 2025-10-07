import { Service } from '@/services/service';
import { cocktailsStore } from '@/services/cocktails/cocktails.store';
import type { CocktailNamesEnum, ICocktail } from '@/types/coctail.types';
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
        data: payload,
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
}
