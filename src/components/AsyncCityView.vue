<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- Banner -->
    <div
      v-if="route.query.preview"
      class="w-full bg-weather-secondary text-white p-4 text-center">
      <p>你正在预览当前城市天气状况，点击 “+” 可将该城市添加到天气列表。</p>
    </div>

    <!-- Weather Overview -->
    <NowWeather />

    <hr class="border-white border-opacity-10 border w-full" />

    <!-- hourly weather -->
    <HourlyWeather />

    <hr class="border-white border-opacity-10 border w-full" />

    <!-- week weather -->
    <DailyWeather />

    <div
      class="flex items-center gap-2 py-12 text-white cursor-pointer hover:text-red-500 duration-150"
      v-if="!route.query.local"
      @click="removeCity">
      <i class="fas fa-trash"></i>
      <p>删除</p>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import NowWeather from './asyncCityView/NowWeather.vue';
import HourlyWeather from './asyncCityView/HourlyWeather.vue';
import DailyWeather from './asyncCityView/DailyWeather.vue';

const route = useRoute();
const router = useRouter();

const removeCity = () => {
  const cities = JSON.parse(localStorage.getItem('savedCities'));
  const updatedCities = cities.filter((city) => city.id !== route.query.id);

  localStorage.setItem('savedCities', JSON.stringify(updatedCities));

  router.push({ name: 'home' });
};
</script>

<style lang="scss" scoped></style>
