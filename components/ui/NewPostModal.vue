<script setup lang="ts">
import {usePostsStore} from "~/store";

defineProps({
  onClose: Function,
});
const store = usePostsStore();
</script>

<template>
  <div class="modal flex flex-col justify-center items-center bg-gray-900 backdrop-filter backdrop-blur bg-opacity-70 fixed top-0 left-0 w-screen h-full z-10" @click="store.closeModal()">
    <div class="modal-content" @click.stop>
      <button @click="store.closeModal()" class="w-8 h-8 rounded-full bg-white absolute top-10 right-10 flex justify-center items-center"><span class="text-red-600 text-3xl">X</span></button>
      <slot></slot>
    </div>
  </div>
</template>

