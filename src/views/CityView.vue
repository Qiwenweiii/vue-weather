<template>
  <div class="container">
    <Suspense>
      <AsyncCityView />
      <template #fallback>
        <p>Loading...</p>
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import AsyncCityView from '../components/AsyncCityView.vue';
</script>

<style lang="scss" scoped></style>
