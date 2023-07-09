import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: '天气应用',
      },
    },
    {
      path: '/weather/:state/:city/:area',
      name: 'city',
      component: () => import('../views/CityView.vue'),
      meta: {
        title: '城市天气',
      },
    },
  ],
});

router.beforeEach((to, from) => {
  const { state, city } = to.params;

  let title = to.meta.title;

  if (to.params.state) {
    title = `${state}·${city}`;
  }

  document.title = `${title} | The Local Weather`;
});

export default router;
