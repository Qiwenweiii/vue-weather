<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6"
    >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex item-center gap-3">
          <i class="fa-solid fa-cloud text-2xl"></i>
          <p class="text-2xl">天气应用</p>
        </div>
      </RouterLink>
      <div class="flex gap-3 flex-1 justify-end">
        <i
          @click="toggleModal"
          class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer"
        ></i>
        <i
          v-if="route.query.preview"
          @click="addCity"
          class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"
        ></i>
      </div>

      <BaseModal :modalActive="modalActive" @close-modal="toggleModal">
        <div class="text-black">
          <h1 class="text-2xl mb-1 font-bold">关于:</h1>
          <p class="mb-4">天气应用允许您跟踪选择的城市当前和未来的天气。</p>
          <h2 class="text-2xl font-bold">如何使用:</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>通过在搜索栏中输入名称来搜索您的城市。</li>
            <li>在结果中选择一个城市，您将看到当地的天气。</li>
            <li>
              通过单击右上角的“+”图标来跟踪城市，这将保存城市以便稍后在主页上查看。
            </li>
          </ol>

          <h2 class="text-2xl font-bold">移除城市:</h2>
          <p>
            如果您不希望继续跟踪某个城市，只需进入当前城市的主页。在页面底部可以看到删除城市按钮。
          </p>
        </div>
      </BaseModal>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { uid } from 'uid';
import { useRoute, useRouter } from 'vue-router';
import BaseModal from './common/BaseModal.vue';

const router = useRouter();
const route = useRoute();
const modalActive = ref(null);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};

const savedCities = ref([]);
const addCity = () => {
  // 读取本地存储的城市
  if (localStorage.getItem('savedCities')) {
    savedCities.value = JSON.parse(localStorage.getItem('savedCities'));
  }

  const locationObj = {
    id: uid(),
    state: route.params.state,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lng: route.query.lng,
    },
  };

  savedCities.value.unshift(locationObj);
  localStorage.setItem('savedCities', JSON.stringify(savedCities.value));

  let newQuery = Object.assign({}, route.query);
  delete newQuery.preview;

  // 添加 id 到路由中，后续删除城市时会用到
  newQuery.id = locationObj.id;
  router.replace({ query: newQuery });
};
</script>
