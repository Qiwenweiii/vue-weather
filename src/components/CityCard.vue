<template>
  <div
    class="flex justify-between py-6 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer"
    @click="goToCityView(city)">
    <div class="flex flex-col gap-2">
      <div class="flex gap-2">
        <h2 class="text-3xl">
          {{ city.area }}
        </h2>
        <i
          v-if="city.local"
          class="fa-solid fa-location-arrow text-sm self-start"></i>
      </div>
      <h3>{{ city.state }}{{ city.city === city.area ? '' : ' · ' + city.city + '市' }}</h3>
    </div>
    <div class="flex flex-col gap-2">
      <p class="text-3xl self-end">{{ city.weather.temp }}&deg;</p>
      <div class="flex gap-2">
        <i :class="`qi-${city.weather.icon}-fill`"></i>
        <p>{{ city.weather.text }} · {{ city.weather.windDir }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

defineProps({
  city: {
    type: Object,
    default: () => {},
  },
});

const router = useRouter();

const goToCityView = (city) => {
  router.push({
    name: 'city',
    params: {
      state: city.state,
      city: city.city,
      area: city.area,
    },
    query: {
      id: city.id,
      lat: city.coords.lat,
      lng: city.coords.lng,
      location: city.coords.location,
      local: city.local,
    },
  });
};
</script>

<style lang="scss" scoped></style>
