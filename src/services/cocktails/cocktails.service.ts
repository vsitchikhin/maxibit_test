import { Service } from '@/services/service';
import { cocktailsStore } from '@/services/cocktails/cocktails.store';
import type { CocktailNamesEnum } from '@/types/coctail.types';

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
      console.log(response); // это чтоб не ругался линтер
    } catch(error) {
      console.log(error);
    }
  }

  // --------------------------------------------------------
  // Методы сервиса
  public checkDataExists(code: CocktailNamesEnum) {
    return this.cocktails[code].data !== null;
  }
}
