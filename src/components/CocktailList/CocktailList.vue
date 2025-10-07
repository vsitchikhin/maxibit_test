<template>
  <cocktail-info />
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import CocktailInfo from '@/components/CocktailInfo/CocktailInfo.vue';

export default defineComponent({
  components: { CocktailInfo },
});
</script>
