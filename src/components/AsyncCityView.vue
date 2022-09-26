<template>
  <div></div>
</template>

<script setup>
  import axios from 'axios';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const weatherAPIKey = '7efa332cf48aeb9d2d391a51027f1a71';

  const { lat, lng } = route.query;

  const getWeatherData = async () => {
    try {
      const weatherData = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude={part}&appid=${weatherAPIKey}&lang=zh_cn`
      );
      return weatherData;
    } catch (error) {
      console.log(error);
    }
  };

  const weatherData = await getWeatherData();
  console.log(weatherData);
</script>
