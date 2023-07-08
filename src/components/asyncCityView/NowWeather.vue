<template>
  <div class="flex flex-col items-center text-white py-12">
    <h1 class="text-4xl mb-2">{{ route.params.area }}</h1>
    <p class="text-8xl mb-8">{{ nowWeatherData.temp }}&deg;</p>
    <i :class="`qi-${nowWeatherData.icon}-fill text-6xl mb-4`"></i>
    <p class="capitalize">{{ nowWeatherData.text }}</p>
    <div class="text-center">体感温度：{{ nowWeatherData.feelsLike }}&deg;</div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { useWeather } from '@/hooks/useWeather';

const route = useRoute();

const getNowWeather = async () => {
  try {
    const weatherData = await useWeather(route.query.location, 'now');
    return weatherData.now;
  } catch (error) {
    console.log(error);
  }
};

const nowWeatherData = await getNowWeather();
</script>

<style lang="scss" scoped></style>
