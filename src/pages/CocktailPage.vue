<template>
  <div class="cocktail-page">{{ cocktailCode }} page</div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { CocktailsService } from '@/services/cocktails/cocktails.service';
import type { CocktailNamesEnum } from '@/types/coctail.types';

export default defineComponent({
  props: {
    cocktailCode: {
      type: String as PropType<CocktailNamesEnum>,
      required: true,
    },
  },

  async setup(props) {
    const cocktailService = new CocktailsService();

    // ------------------------------------------------------
    // Получение данных о необходимом коктейле
    await cocktailService.getCocktailInfo(props.cocktailCode);
  },
});
</script>
