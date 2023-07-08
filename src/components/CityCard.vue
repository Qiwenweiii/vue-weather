<template>
  <div class="flex justify-between py-6 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer">
    <div class="flex flex-col gap-2">
      <h2 class="text-3xl">{{ city.area }}</h2>
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
defineProps({
  city: {
    type: Object,
    default: () => {},
  },
});
</script>

<style lang="scss" scoped></style>
