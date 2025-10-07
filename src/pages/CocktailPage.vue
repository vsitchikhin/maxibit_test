<template>
  <div class="cocktail-page">{{ cocktailCode }} page</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    cocktailCode: {
      type: String,
      required: true,
    },
  },
});
</script>
