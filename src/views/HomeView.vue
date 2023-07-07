<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResult"
        placeholder="Search for a city or state"
        class="py-2 px-1 w-full bg-transparent border-b outline-none focus:border-weather-secondary focus:shadow-[0px_1px_0_0_#004e71]" />
      <ul
        v-if="searchResults"
        class="absolute top-[66px] bg-weather-secondary w-full shadow-md py-2 px-1">
        <p v-if="searchError">貌似出了点问题，请再试一次！</p>
        <p v-if="!searchError && searchResults.length === 0">没有找到匹配的城市，请重新输入！</p>
        <template v-else>
          <li
            v-for="searchResult in searchResults"
            :key="searchResult.id"
            class="py-2 cursor-pointer">
            {{ searchResult.text }}
          </li>
        </template>
      </ul>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const mapboxAPIKey = 'pk.eyJ1IjoicWl3ZW53ZWlpaSIsImEiOiJjbDhiZDdxbTkwaWZvM25uMnE2bmpxZHN3In0.xx9eJNti_JqryOLnJfXrnw';
const searchQuery = ref('');
const queryTimer = ref(null);
const searchResults = ref(null);
const searchError = ref(false);

const getSearchResult = () => {
  clearTimeout(queryTimer.value);
  queryTimer.value = setTimeout(async () => {
    if (searchQuery.value) {
      try {
        const result = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&country=CN&language=zh_Hans&types=place`);
        searchResults.value = result.data.features;
      } catch (error) {
        searchError.value = true;
      }
      return;
    }
    searchResults.value = null;
  }, 300);
};
</script>
