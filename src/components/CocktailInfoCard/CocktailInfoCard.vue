<template>
  <div class="cocktail-info-card">
    <v-row>
      <v-col cols="6">
        <div class="text-h4 mb-8">{{ cocktailData.strDrink }}</div>
        <div class="text-body1 mb-1">{{ cocktailData.strCategory }}</div>
        <div class="text-body1 mb-1">{{ cocktailData.strAlcoholic }}</div>
        <div class="text-body1 mb-8">{{ cocktailData.strGlass }}</div>
        <div class="text-body1">Instructions:</div>
        <div class="text-body1">{{ cocktailData.strInstructions }}</div>
      </v-col>
      <v-col cols="6">
        <v-img
          v-if="cocktailData.strDrinkThumb"
          :src="cocktailData.strDrinkThumb"
          cover
          height="400"
          :eager="false"
          @error="onImageError"
          @load="onImageLoad"
        />
      </v-col>
    </v-row>
    <v-row v-for="(ingredient, index) in cocktailData.ingredients" :key="index">
      <v-col cols="3">
        <div class="text-body1">{{ ingredient.measure }}</div>
      </v-col>
      <v-col cols="3">
        <div class="text-body1">{{ ingredient.name }}</div>
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

export default defineComponent({
  props: {
    cocktailData: {
      type: Object as PropType<ICocktail>,
      required: true,
    },
  },
  setup() {
    const isImageLoaded = ref(false);

    const isShowToast = ref(false);
    const toastContent = ref<string | null>(null);

    function onImageLoad() {
      isImageLoaded.value = true;
      toastContent.value = null;
    }

    function onImageError() {
      isImageLoaded.value = false;
      toastContent.value = 'Image loading error';
      isShowToast.value = true;
    }

    return {
      isImageLoaded,
      isShowToast,
      toastContent,
      TOAST_TIMEOUT,

      onImageLoad,
      onImageError,
    };
  },
});
</script>
