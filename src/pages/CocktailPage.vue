<template>
  <div class="cocktail-page">
    <v-row class="pa-0 ma-0">
      <v-col cols="2" class="pa-0 ma-0">
        <side-panel v-model="currentCode" :codes="cocktailCodeList" />
      </v-col>
      <v-col cols="12" sm="10" class="pa-0 ma-0">
        <cocktail-list />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, type PropType, ref, watch } from 'vue';
import { CocktailsService } from '@/services/cocktails/cocktails.service';
import { CocktailNamesEnum } from '@/types/coctail.types';
import SidePanel from '@/components/SidePanel/SidePanel.vue';
import CocktailList from '@/components/CocktailList/CocktailList.vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  components: { CocktailList, SidePanel },
  props: {
    cocktailCode: {
      type: String as PropType<CocktailNamesEnum>,
      required: true,
    },
  },

  setup(props) {
    // ------------------------------------------------------
    // Сервисы, необходимые для работы страницы
    const cocktailService = new CocktailsService();
    const router = useRouter();

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

    // ------------------------------------------------------
    // Свойства для сайд панели
    const cocktailCodeList = Object.values(CocktailNamesEnum);

    const currentCode = ref(props.cocktailCode);

    watch(
      () => currentCode.value,
      (newValue: CocktailNamesEnum) => {
        router.push({
          name: 'Cocktail',
          params: { cocktailCode: newValue },
        });
      },
    );

    return {
      cocktailCodeList,
      currentCode,
    };
  },
});
</script>

<style scoped lang="scss">
.cocktail-page {
  max-width: 1024px;
  margin: 40px auto;
}
</style>
