<template>
  <template v-if="localCity">
    <CityCard :city="localCity" />
  </template>

  <p v-if="localErr">您的定位权限未开启，无法跟踪本地天气，请打开定位或者查询您想要查看的城市名！</p>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import CityCard from './CityCard.vue';

const localCity = ref(null);
const localErr = ref(false);

navigator.geolocation.getCurrentPosition(
  async (pos) => {
    const coords = pos.coords;

    const lat = coords.latitude.toFixed(2);
    const lng = coords.longitude.toFixed(2);

    const localPos = await axios.get(`https://geoapi.qweather.com/v2/city/lookup?location=${lng},${lat}&key=d63bf1dc11fb44e6b78dfc81d64165b0`);

    const city = localPos.data.location[0];

    const weatherData = await axios.get(`https://devapi.qweather.com/v7/weather/now?key=d63bf1dc11fb44e6b78dfc81d64165b0&location=${city.id}`);

    const localCityObj = {
      id: city.id,
      state: city.adm1,
      city: city.adm2,
      area: city.name,
      coords: {
        lat,
        lng,
        location: city.id,
      },
      weather: weatherData.data.now,
    };

    localCity.value = localCityObj;
  },
  (err) => {
    console.log(err.message);
    const savedCities = JSON.parse(localStorage.getItem('savedCities'));

    if (savedCities) {
      localErr.value = savedCities.length !== 0 ? false : true;
      return;
    }

    localErr.value = true;
  }
);
</script>

<style lang="scss" scoped></style>
