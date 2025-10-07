import { defineStore } from 'pinia';
import {
  type CocktailCode,
  CocktailNamesEnum,
  type CocktailObject,
  type CocktailState,
  type ICocktail,
} from '@/types/coctail.types';
import { LoadingStatusesEnum } from '@/types/api.types';

// На случай, если будет расширяться список коктейлей - такая конструкция позволяет добавить код в енам
// и стор автоматически расширится для работы с ним
const ALL_COCKTAILS_CODES = Object.values(CocktailNamesEnum) as CocktailCode[];

function makeCocktailObjects<T>(factory: () => T): CocktailObject<T> {
  return ALL_COCKTAILS_CODES.reduce((acc, code) => {
    acc[code] = factory();
    return acc;
  }, {} as CocktailObject<T>);
}

export const cocktailsStore = defineStore('cocktails', {
  state: () => ({
    cocktails: makeCocktailObjects<CocktailState<ICocktail[]>>(() => ({
      data: null,
      status: LoadingStatusesEnum.notLoaded,
      error: null,
    })),
  }),

  actions: {
    CREATE_CODE_IF_NOT_EXISTS(code: CocktailCode) {
      if (!(code in this.cocktails)) {
        this.cocktails[code] = { data: null, status: LoadingStatusesEnum.notLoaded, error: null };
      }
    },

    SET_COCKTAIL_STATE_BY_CODE(code: CocktailCode, payload: CocktailState<ICocktail[]>) {
      this.CREATE_CODE_IF_NOT_EXISTS(code);
      this.cocktails[code].data = payload.data;
      this.cocktails[code].status = payload.status;
      this.cocktails[code].error = payload.error;
    },
  },
});
