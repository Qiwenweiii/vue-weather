<template>
  <teleport to="body">
    <transition name="modal-outer">
      <div
        v-show="modalActive"
        class="absolute w-full bg-black bg-opacity-30 h-screen top-0 left-0 flex justify-center px-8"
      >
        <transition name="modal-inner">
          <div
            v-if="modalActive"
            class="bg-white self-start p-4 mt-32 max-w-screen-md rounded-lg"
          >
            <slot />
            <div class="flex justify-center">
              <button
                @click="$emit('close-modal')"
                class="bg-weather-primary text-white mt-8 py-2 px-6 rounded-md"
              >
                关闭
              </button>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
  defineProps({
    modalActive: {
      type: Boolean,
      default: false,
    },
  });

  defineEmits(['close-modal']);
</script>

<style scoped>
  .modal-outer-enter-active,
  .modal-outer-leave-active {
    transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
  }

  .modal-outer-enter-from,
  .modal-outer-leave-to {
    opacity: 0;
  }

  .modal-inner-enter-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
  }
  .modal-inner-leave-active {
    transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
  }

  .modal-inner-enter-from {
    opacity: 0;
    transform: scale(0.8);
  }

  .modal-inner-leave-to {
    transform: scale(0.8);
  }
</style>
