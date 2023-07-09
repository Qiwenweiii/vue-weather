<template>
  <CityCard
    :city="localCity"
    v-if="localCity" />
  <CityCardSkeleton v-else />

  <p v-if="localErr">您的定位权限未开启，无法跟踪本地天气，请打开定位或者查询您想要查看的城市名！</p>
</template>

<script setup>
import { ref } from 'vue';
import CityCard from './CityCard.vue';
import { useCity } from '../hooks/useCity';
import { useWeather } from '../hooks/useWeather';
import CityCardSkeleton from './CityCardSkeleton.vue';

const localCity = ref(null);
const localErr = ref(false);

navigator.geolocation.getCurrentPosition(
  async (pos) => {
    const coords = pos.coords;

    const lat = coords.latitude.toFixed(2);
    const lng = coords.longitude.toFixed(2);
    const location = `${lng},${lat}`;

    const localPos = await useCity(location);

    const city = localPos.location[0];

    const weatherData = await useWeather(city.id, 'now');

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
      weather: weatherData.now,
      local: true,
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
