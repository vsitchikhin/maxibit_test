<template>
  <div class="cocktail-info-card">
    <v-row>
      <v-col cols="6">
        <div class="text-h5 text-sm-h4 mb-8">{{ cocktailData.strDrink }}</div>
        <div class="text-body-2 text-sm-body-1 mb-1">{{ cocktailData.strCategory }}</div>
        <div class="text-body-2 text-sm-body-1 mb-1">{{ cocktailData.strAlcoholic }}</div>
        <div class="text-body-2 text-sm-body-1 mb-8">{{ cocktailData.strGlass }}</div>
        <div v-if="mdAndUp" class="text-body-2 text-sm-body-1">Instructions:</div>
        <div v-if="mdAndUp" class="text-body-2 text-sm-body-1">{{ cocktailData.strInstructions }}</div>
      </v-col>
      <v-col cols="6">
        <v-img
          v-if="cocktailData.strDrinkThumb"
          :src="cocktailData.strDrinkThumb"
          cover
          :eager="false"
          aspect-ratio="1"
        >
          <template #placeholder>
            <v-skeleton-loader class="w-100 h-100" />
          </template>
        </v-img>
      </v-col>
    </v-row>
    <div v-if="!mdAndUp" class="text-body-2 text-sm-body-1">Instructions:</div>
    <div v-if="!mdAndUp" class="text-body-2 text-sm-body-1 mb-8">{{ cocktailData.strInstructions }}</div>
    <v-row v-for="(ingredient, index) in cocktailData.ingredients" :key="index">
      <v-col cols="6" sm="3">
        <div class="text-body-2 text-sm-body-1">{{ ingredient.measure }}</div>
      </v-col>
      <v-col cols="6" sm="3">
        <div class="text-body-2 text-sm-body-1">{{ ingredient.name }}</div>
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
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, ref } from 'vue';
import type { ICocktail } from '@/types/coctail.types';
import { TOAST_TIMEOUT } from '@/consts/core.consts';
import { useDisplay } from 'vuetify/framework';

export default defineComponent({
  props: {
    cocktailData: {
      type: Object as PropType<ICocktail>,
      required: true,
    },
  },
  setup() {
    const isShowToast = ref(false);
    const toastContent = ref<string | null>(null);

    const { mdAndUp } = useDisplay();

    return {
      isShowToast,
      toastContent,
      TOAST_TIMEOUT,

      mdAndUp,
    };
  },
});
</script>
