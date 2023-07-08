<template>
  <div class="w-full max-w-screen-md py-12">
    <div class="mx-8 text-white divide-y divide-gray-200/10">
      <h2 class="mb-4 text-sm opacity-30"><i class="fa fa-calendar-alt pr-1"></i>每周天气预报</h2>
      <div
        v-for="dayData in daysWeatherData"
        :key="dayData.fxDate"
        class="flex items-center justify-between py-2">
        <p>{{ week[new Date(dayData.fxDate).getDay()] }}</p>
        <i :class="`qi-${dayData.iconDay}-fill text-xl`"></i>
        <div class="flex gap-2">
          <p>最低温：{{ dayData.tempMin }}</p>
          ---
          <p>最高温：{{ dayData.tempMax }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useWeather } from '@/hooks/useWeather';

const route = useRoute();
const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

const getDaysWeather = async () => {
  try {
    const weatherData = await useWeather(route.query.location, '7d');
    return weatherData.daily;
  } catch (error) {
    console.log(error);
  }
};

const daysWeatherData = await getDaysWeather();
</script>

<style lang="scss" scoped></style>
