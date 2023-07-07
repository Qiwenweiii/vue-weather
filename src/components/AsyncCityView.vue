<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- Banner -->
    <div
      v-if="route.query.preview"
      class="w-full bg-weather-secondary text-white p-4 text-center">
      <p>你正在预览当前城市天气状况，点击 “+” 可将该城市添加到天气列表。</p>
    </div>

    <!-- Weather Overview -->
    <div class="flex flex-col items-center text-white py-12">
      <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
      <p class="text-8xl mb-8">{{ nowWeatherData.temp }}&deg;</p>
      <i :class="`qi-${nowWeatherData.icon}-fill text-6xl mb-4`"></i>
      <p class="capitalize">{{ nowWeatherData.text }}</p>
      <div class="text-center">体感温度：{{ nowWeatherData.feelsLike }}&deg;</div>
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <!-- hourly weather -->
    <div class="w-full max-w-screen-md py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4 text-sm opacity-30"><i class="fa fa-clock pr-1"></i>每小时天气预报</h2>
        <div class="flex gap-10 overflow-x-scroll">
          <div
            v-for="hourData in hoursWeatherData"
            :key="hourData.fxTime"
            class="flex flex-col gap-2 items-center">
            <p class="whitespace-nowrap text-md">{{ new Date(hourData.fxTime).getHours() }}时</p>
            <i :class="`qi-${hourData.icon}-fill text-xl`"></i>
            <p class="whitespace-nowrap text-md">{{ hourData.temp }}&deg;</p>
          </div>
        </div>
      </div>
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <!-- weekly weather -->
    <div class="w-full max-w-screen-md py-12">
      <div class="mx-8 text-white divide-y divide-gray-200/10">
        <h2 class="mb-4 text-sm opacity-30"><i class="fa fa-calendar-alt pr-1"></i>每周天气预报</h2>
        <div
          v-for="dayData in daysWeatherData"
          :key="dayData.fxDate"
          class="flex items-center justify-between py-2">
          <p>{{ week[new Date(dayData.fxDate).getDay()] }}</p>
          <i :class="`qi-${dayData.iconDay}-fill text-xl`"></i>
          <div class="flex gap-2">
            <p>最低温：{{ dayData.tempMin }}</p>
            ---
            <p>最高温：{{ dayData.tempMax }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { useRoute } from 'vue-router';

const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

const route = useRoute();

const getNowWeather = async () => {
  try {
    const weatherData = await axios.get(`https://devapi.qweather.com/v7/weather/now?key=d63bf1dc11fb44e6b78dfc81d64165b0&location=${route.query.location}`);
    return weatherData.data.now;
  } catch (error) {
    console.log(error);
  }
};

const nowWeatherData = await getNowWeather();

const getHoursWeather = async () => {
  try {
    const weatherData = await axios.get(`https://devapi.qweather.com/v7/weather/24h?key=d63bf1dc11fb44e6b78dfc81d64165b0&location=${route.query.location}`);
    return weatherData.data.hourly;
  } catch (error) {
    console.log(error);
  }
};

const hoursWeatherData = await getHoursWeather();

const getDaysWeather = async () => {
  try {
    const weatherData = await axios.get(`https://devapi.qweather.com/v7/weather/7d?key=d63bf1dc11fb44e6b78dfc81d64165b0&location=${route.query.location}`);
    return weatherData.data.daily;
  } catch (error) {
    console.log(error);
  }
};

const daysWeatherData = await getDaysWeather();
</script>

<style lang="scss" scoped></style>
