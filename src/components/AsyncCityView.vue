<template>
  <div></div>
</template>

<script setup>
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();

const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(`https://devapi.qweather.com/v7/weather/now?key=d63bf1dc11fb44e6b78dfc81d64165b0&location=${route.query.location}`);

    return weatherData;
  } catch (error) {
    console.log(error);
  }
};

const weatherData = await getWeatherData();
console.log(weatherData);
</script>

<style lang="scss" scoped></style>
