<template>
  <v-tabs v-model="currentTab" direction="vertical">
    <v-tab
      v-for="code in codes"
      :key="code"
      :value="code"
      color="accent"
    >
      {{ code }}
    </v-tab>
  </v-tabs>
</template>

<script lang="ts">
import { defineComponent, type PropType, ref, watch } from 'vue';
import type { CocktailNamesEnum } from '@/types/coctail.types';

export default defineComponent({
  props: {
    modelValue: {
      type: String as PropType<CocktailNamesEnum>,
      required: true,
    },
    codes: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },

  emits: {
    'update:model-value': null,
  },

  setup(props, ctx) {
    const currentTab = ref(props.modelValue);

    watch(
      () => currentTab.value,
      (newValue: CocktailNamesEnum) => ctx.emit('update:model-value', newValue),
    );

    return {
      currentTab,
    };
  },
});
</script>

