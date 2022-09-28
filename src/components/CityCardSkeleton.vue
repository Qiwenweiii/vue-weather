<template>
  <div class="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md">
    <div class="flex flex-col flex-1 gap-4">
      <div class="flex flex-col gap-2">
        <AnimatedPlaceholder class="max-w-[50%]" />
        <AnimatedPlaceholder class="max-w-[40%]" />
      </div>
      <AnimatedPlaceholder class="max-w-[75px]" />
    </div>

    <div class="flex flex-col gap-4 flex-1 items-end">
      <AnimatedPlaceholder class="max-w-[75px] w-full flex-1" />
      <AnimatedPlaceholder class="max-w-[120px] w-full h-[30px]" />
    </div>
  </div>
</template>

<script setup>
import AnimatedPlaceholder from './common/AnimatedPlaceholder.vue';
</script>
