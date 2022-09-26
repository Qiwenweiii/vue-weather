<template>
  <main class="container text-white">
    <div class="pt-4 mb-8">
      <input
        v-model="searchQuery"
        @input="getSearchResults"
        type="text"
        placeholder="请输出要查询的城市或地区"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004e71]"
      />
      <ul
        v-if="searchResults"
        class="bg-weather-secondary text-white w-full shadow-md py-2 px-1 mt-4"
      >
        <p v-if="searchError" class="px-2">好像出现了什么错误，请再试一次！</p>
        <p v-if="!searchError && searchResults.length === 0" class="px-2">
          无法查询到您输入的城市或地区，请重新输入！
        </p>
        <template v-else>
          <li
            v-for="result in searchResults"
            :key="result.id"
            @click="previewCity(result)"
            class="py-2 cursor-pointer"
          >
            {{ result.text }}
          </li>
        </template>
      </ul>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const mapboxAPIKey =
  'pk.eyJ1IjoicWl3ZW53ZWlpaSIsImEiOiJjbDhiZDdxbTkwaWZvM25uMnE2bmpxZHN3In0.xx9eJNti_JqryOLnJfXrnw';

const searchQuery = ref('');
const queryTimeout = ref(null);
const searchResults = ref(null);
const searchError = ref(null);

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== '') {
      try {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place&language=zh-Hans&country=CN`
        );
        searchResults.value = result.data.features;
        console.log(searchResults.value);
      } catch (error) {
        searchError.value = true;
      }
      return;
    }
    searchResults.value = null;
  }, 300);
};

const previewCity = (result) => {
  console.log(result);
  const state = result.context[0].text;
  const city = result.text;
  router.push({
    name: 'cityView',
    params: {
      state: state,
      city: city,
    },
    query: {
      lat: result.geometry.coordinates[1],
      lng: result.geometry.coordinates[0],
      preview: true,
    },
  });
};
</script>
