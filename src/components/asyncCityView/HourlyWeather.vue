<template>
  <div class="w-full max-w-screen-md py-12">
    <div class="mx-8 text-white">
      <h2 class="mb-4 text-sm opacity-30"><i class="fa fa-clock pr-1"></i>每小时天气预报</h2>
      <div class="flex gap-10 overflow-x-scroll">
        <div
          v-for="hourData in hoursWeatherData"
          :key="hourData.fxTime"
          class="flex flex-col gap-2 items-center">
          <p class="whitespace-nowrap text-md">{{ new Date(hourData.fxTime).getHours() }}时</p>
          <i :class="`qi-${hourData.icon}-fill text-xl`"></i>
          <p class="whitespace-nowrap text-md">{{ hourData.temp }}&deg;</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useWeather } from '@/hooks/useWeather';

const route = useRoute();

const getHoursWeather = async () => {
  try {
    const weatherData = await useWeather(route.query.location, '24h');
    return weatherData.hourly;
  } catch (error) {
    console.log(error);
  }
};

const hoursWeatherData = await getHoursWeather();
</script>

<style lang="scss" scoped></style>
