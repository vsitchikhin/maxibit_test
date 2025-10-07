<template>
  <div class="cocktail-page">
    <v-icon v-if="!smAndUp" class="px-6 mb-6" @click="openDrawer">mdi-menu</v-icon>
    <v-navigation-drawer v-if="!smAndUp" v-model="isDrawerOpen" temporary>
      <side-panel v-model="currentCode" :codes="cocktailCodeList" />
    </v-navigation-drawer>
    <v-row class="pa-0 ma-0">
      <v-col v-if="smAndUp" cols="3" md="2" class="pa-0 ma-0">
        <side-panel v-model="currentCode" :codes="cocktailCodeList" />
      </v-col>
      <v-col cols="12" sm="9" md="10" class="py-0 px-4 ma-0">
        <cocktail-info v-if="!!currentCocktail.data" :cocktail-info="currentCocktail.data" />
      </v-col>
    </v-row>
    <v-snackbar
      v-model="isShowToast"
      :timeout="TOAST_TIMEOUT"
      color="error"
      location="top end"
    >
      {{ toastContent }}
    </v-snackbar>
    <v-overlay
      :model-value="isShowLoader"
      persistent
      class="d-flex align-center justify-center"
      scrim="rgba(0, 0, 0, 0.8)"
    >
      <v-progress-circular
        indeterminate
        color="accent"
        size="64"
      />
    </v-overlay>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, type PropType, ref, watch } from 'vue';
import { CocktailsService } from '@/services/cocktails/cocktails.service';
import { CocktailNamesEnum } from '@/types/coctail.types';
import SidePanel from '@/components/SidePanel/SidePanel.vue';
import { useRouter } from 'vue-router';
import CocktailInfo from '@/components/CocktailInfo/CocktailInfo.vue';
import { TOAST_TIMEOUT } from '@/consts/core.consts';
import { LoadingStatusesEnum } from '@/types/api.types';
import { useDisplay } from 'vuetify/framework';

export default defineComponent({
  components: { CocktailInfo, SidePanel },
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
    // Настройки всплывающих сообщений
    const isShowToast = ref(false);
    const toastContent = ref<string | null>(null);

    function openToast(message: string | null) {
      toastContent.value = message;
      isShowToast.value = true;
    }

    // ------------------------------------------------------
    // Получение данных о необходимом коктейле
    async function fetchData() {
      const isDataExists = cocktailService.checkDataExists(props.cocktailCode);
      if (!isDataExists) {
        const result = await cocktailService.getCocktailInfo(props.cocktailCode);

        if (!result) {
          openToast(currentCocktail.value.error);
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

    // ------------------------------------------------------
    // Свойства для блока информации о коктейле
    const cocktailList = computed(() => cocktailService.cocktails);
    const currentCocktail = computed(() => cocktailList.value[currentCode.value]);

    // ------------------------------------------------------
    // Параметры лоадера
    const isShowLoader = computed(() => currentCocktail.value.status === LoadingStatusesEnum.loading);

    // ------------------------------------------------------
    // Медиа настройки
    const { smAndUp } = useDisplay();

    const isDrawerOpen = ref(false);
    function openDrawer() {
      isDrawerOpen.value = true;
    }

    return {
      cocktailCodeList,
      currentCode,

      currentCocktail,

      isShowToast,
      toastContent,
      TOAST_TIMEOUT,

      isShowLoader,

      smAndUp,
      isDrawerOpen,
      openDrawer,
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
