<template>
  <LocalCityCard />
  <template
    v-for="city in savedCities"
    :key="city.id">
    <CityCard :city="city" />
  </template>

  <!-- <p v-if="savedCities.length === 0">没有已跟踪的城市，请输入你想要查询的城市名！</p> -->
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import CityCard from './CityCard.vue';
import LocalCityCard from './LocalCityCard.vue';

const router = useRouter();

const savedCities = ref([]);
const getCities = async () => {
  if (localStorage.getItem('savedCities')) {
    savedCities.value = JSON.parse(localStorage.getItem('savedCities'));
  }

  const requests = [];

  savedCities.value.forEach((city) => {
    requests.push(axios.get(`https://devapi.qweather.com/v7/weather/now?key=d63bf1dc11fb44e6b78dfc81d64165b0&location=${city.coords.location}`));
  });

  const weatherData = await Promise.all(requests);

  weatherData.forEach((value, index) => {
    savedCities.value[index].weather = value.data.now;
  });
};
await getCities();
</script>

<style lang="scss" scoped></style>
