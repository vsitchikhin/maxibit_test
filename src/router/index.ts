import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { CocktailNamesEnum, DEFAULT_COCKTAIL } from '@/types/coctail.types';

const enumValues = Object.values(CocktailNamesEnum);
const pattern = `(${enumValues.join('|')})`;

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: DEFAULT_COCKTAIL,
  },
  {
    path: `/:cocktailCode${pattern}`,
    name: 'Cocktail',
    component: () => import('@/pages/CocktailPage.vue'),
    props: route => ({ cocktailCode: route.params.cocktailCode }),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/pages/NotFound.vue'),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
