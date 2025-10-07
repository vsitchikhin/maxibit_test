<template>
  <div class="cocktail-info">
    <div v-for="cocktail in cocktailInfo" :key="cocktail.idDrink" class="cocktail-info-card">
      <cocktail-info-card :cocktail-data="cocktail" />
      <v-divider class="my-8" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { ICocktail } from '@/types/coctail.types';
import CocktailInfoCard from '@/components/CocktailInfoCard/CocktailInfoCard.vue';

export default defineComponent({
  components: { CocktailInfoCard },
  props: {
    cocktailInfo: {
      type: Array as PropType<ICocktail[]>,
      required: true,
    },
  },
  setup() {},
});
</script>
