<template>
  <div class="cocktail-page">{{ cocktailCode }} page</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, type PropType, watch } from 'vue';
import { CocktailsService } from '@/services/cocktails/cocktails.service';
import type { CocktailNamesEnum } from '@/types/coctail.types';

export default defineComponent({
  props: {
    cocktailCode: {
      type: String as PropType<CocktailNamesEnum>,
      required: true,
    },
  },

  setup(props) {
    const cocktailService = new CocktailsService();

    // ------------------------------------------------------
    // Получение данных о необходимом коктейле
    async function fetchData() {
      const isDataExists = cocktailService.checkDataExists(props.cocktailCode);
      if (!isDataExists) {
        const result = await cocktailService.getCocktailInfo(props.cocktailCode);

        if (!result) {
          // todo: вывести тост с ошибкой
        }
      }
    }

    // делаем запрос при монтировании и после изменения параметра
    onMounted(async () => {
      await fetchData();
    });

    watch(
      () => props.cocktailCode,
      async () => await fetchData(),
    );
  },
});
</script>
