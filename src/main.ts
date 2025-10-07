import { createApp } from 'vue';
import App from './App.vue';
import { pinia } from '@/plugins/pinia';
import { vuetify } from '@/plugins/vuetify';
import { router } from '@/router';

createApp(App)
  .use(pinia)
  .use(vuetify)
  .use(router)
  .mount('#app');
