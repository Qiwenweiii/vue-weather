<template>
  <div></div>
</template>

<script setup>
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const weatherAPIKey = 'f2bfaf5880bea10526bbd6a1d3815e02';

const { lat, lng } = route.query;

const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lng}&exclude={part}&appid=${weatherAPIKey}&lang=zh_cn`
    );
    return weatherData;
  } catch (error) {
    console.log(error);
  }
};

const weatherData = await getWeatherData();
console.log(weatherData);
</script>
