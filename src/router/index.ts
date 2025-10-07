import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { CocktailNamesEnum } from '@/types/coctail.types';
import { DEFAULT_COCKTAIL } from '@/consts/cocktail.consts';

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
