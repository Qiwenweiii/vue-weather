<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- Banner -->
    <div
      v-if="route.query.preview"
      class="text-white p-4 bg-weather-secondary w-full text-center"
    >
      你正在预览当前城市天气状况，点击 “+” 可将当前城市添加到城市列表。
    </div>

    <!-- 天气预览 -->
    <div class="flex flex-col items-center text-white py-12">
      <h1 class="text-4xl mb-2">{{ city }}</h1>
      <p class="text-sm mb-12">
        {{ new Date(weatherData.currentTime).toLocaleDateString() }}
        {{ new Date(weatherData.currentTime).toLocaleTimeString() }}
      </p>
      <p class="text-8xl mb-8">
        {{ Math.round(weatherData.current.temp) }}&deg;
      </p>
      <p class="capitalize">
        {{ weatherData.current.weather[0].description }}
      </p>
      <img
        class="w-[150px] h-auto"
        :src="`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
        alt=""
      />
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <!-- 每小时天气 -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">未来48小时的天气状况</h2>
        <div class="flex gap-10 overflow-x-scroll">
          <div
            v-for="(hourData, index) in weatherData.hourly"
            :key="hourData.dt"
            class="flex flex-col gap-4 items-center"
          >
            <p class="whitespace-nowrap text-md">
              {{
                index === 0
                  ? '现在'
                  : new Date(hourData.currentTime).toLocaleTimeString('en-us', {
                      hour: 'numeric',
                    })
              }}
            </p>
            <img
              class="w-auto h-[50px] object-cover"
              :src="`https://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
              alt=""
            />
            <p class="text-xl">{{ Math.round(hourData.temp) }}&deg;</p>
          </div>
        </div>
      </div>
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

    <!-- 每周天气 -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">未来一周的天气状况</h2>
        <div
          v-for="(day, index) in weatherData.daily"
          :key="day.dt"
          class="flex items-center"
        >
          <p class="flex-1">
            {{
              index === 0
                ? '今天'
                : weekday[
                    new Date(day.dt * 1000).toLocaleDateString('en-us', {
                      weekday: 'long',
                    })
                  ]
            }}
          </p>
          <img
            class="w-[50px] h-[50px] object-cover"
            :src="`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
            alt=""
          />
          <div class="flex gap-0.5 flex-1 justify-end">
            <p>
              {{ Math.round(day.temp.min) }}&deg; ~
              {{ Math.round(day.temp.max) }}&deg;
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 删除 -->
    <div
      @click="removeCity"
      class="flex items-center gap-2 py-12 text-white cursor-pointer duration-150 hover:text-red-500"
    >
      <i class="fa-solid fa-trash-can"></i>
      <p>删除</p>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const weekday = {
  Monday: '周一',
  Tuesday: '周二',
  Wednesday: '周三',
  Thursday: '周四',
  Friday: '周五',
  Saturday: '周六',
  Sunday: '周日',
};

const route = useRoute();
const weatherAPIKey = '7efa332cf48aeb9d2d391a51027f1a71';

const { city } = route.params;
const { lat, lng } = route.query;

const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude={part}&appid=${weatherAPIKey}&lang=zh_cn&units=metric`
    );

    // 时间计算
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.data.currentTime =
      utc + 1000 * weatherData.data.timezone_offset;

    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
    });

    return weatherData.data;
  } catch (error) {
    console.log(error);
  }
};

const weatherData = await getWeatherData();

const router = useRouter();
const removeCity = () => {
  const cities = JSON.parse(localStorage.getItem('savedCities'));
  const updatedCities = cities.filter((city) => city.id !== route.query.id);
  localStorage.setItem('savedCities', JSON.stringify(updatedCities));
  router.push({
    name: 'home',
  });
};
</script>
