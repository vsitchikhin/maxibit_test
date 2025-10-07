<template>
  <div class="d-flex flex-column justify-center align-center">
    <div class="d-flex align-center justify-center w-100 h-100 mb-8">
      <v-img src="404.png" />
    </div>
    <v-btn type="text" text="Go to main page" color="accent" @click="gotoMainPage" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();
    function gotoMainPage() {
      router.push('/');
    }

    return {
      gotoMainPage,
    };
  },
});
</script>
