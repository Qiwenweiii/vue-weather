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
        class="absolute top-[66px] bg-weather-secondary w-full shadow-md">
        <p v-if="searchError">貌似出了点问题，请再试一次！</p>
        <p v-if="!searchError && searchResults.length === 0">没有找到匹配的城市，请重新输入！</p>
        <template v-else>
          <li
            v-for="searchResult in searchResults"
            :key="searchResult.id"
            @click="previewCity(searchResult)"
            class="p-2 cursor-pointer hover:bg-weather-primary">
            {{ searchResult.name }} <span>{{ searchResult.adm1 }}</span>
          </li>
        </template>
      </ul>
    </div>
    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList />
        <template #fallback>
          <CityCardSkeleton />
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import CityList from '../components/CityList.vue';
import CityCardSkeleton from '../components/CityCardSkeleton.vue';
import { useCity } from '../hooks/useCity';

const router = useRouter();

const searchQuery = ref('');
const queryTimer = ref(null);
const searchResults = ref(null);
const searchError = ref(false);

const getSearchResult = () => {
  clearTimeout(queryTimer.value);
  queryTimer.value = setTimeout(async () => {
    if (searchQuery.value) {
      try {
        const result = await useCity(searchQuery.value);
        if (result.location) {
          searchResults.value = result.location;
        } else {
          searchResults.value = [];
        }
      } catch (error) {
        searchError.value = true;
      }
      return;
    }
    searchResults.value = null;
  }, 300);
};

const previewCity = (searchResult) => {
  const routePath = {
    name: 'city',
    params: {
      state: searchResult.adm1,
      city: searchResult.adm2,
      area: searchResult.name,
    },
    query: {
      lat: (+searchResult.lat).toFixed(2),
      lng: (+searchResult.lon).toFixed(2),
      location: searchResult.id,
      preview: true,
    },
  };

  if (localStorage.getItem('savedCities')) {
    const savedCities = JSON.parse(localStorage.getItem('savedCities'));

    savedCities.forEach((city) => {
      if (city.coords.location === searchResult.id) {
        routePath.query.id = city.id;
        delete routePath.query.preview;
      }
    });
  }

  router.push(routePath);
};
</script>
