<template>
  <div
    class="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer"
  >
    <div class="flex flex-col flex-1 gap-4">
      <div>
        <h2 class="text-3xl">{{ city.city }}</h2>
        <h3 class="text-blue-200">{{ city.state }}</h3>
      </div>
      <p class="text-sm text-blue-200">
        {{ city.weather.weather[0].description }}
      </p>
    </div>

    <div class="flex flex-col gap-4">
      <p class="text-5xl self-end">
        {{ Math.round(city.weather.main.temp) }}&deg;
      </p>
      <div class="flex gap-2 text-sm flex-1 items-end text-blue-200">
        <span>最高 {{ Math.round(city.weather.main.temp_max) }}&deg;</span>
        <span>最低 {{ Math.round(city.weather.main.temp_min) }}&deg;</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  city: {
    type: Object,
    default: () => {},
  },
});
</script>
