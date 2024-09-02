<script setup lang="ts">
import { usePostsStore } from "~/store";
import type {IPost} from "~/services/typing";
import type { ComputedRef } from "vue";

const store = usePostsStore();

const getLimitedPosts:ComputedRef<IPost[]> = computed(()=>{
  return store.state.posts?.slice(-10);
})
</script>

<template>
  <div>
    <table class="min-w-full bg-white">
      <thead class="bg-gray-800 text-white">
      <tr>
        <th class="w-1/6 py-3 px-4 uppercase font-semibold text-sm">ID</th>
        <th class="w-1/3 py-3 px-4 uppercase font-semibold text-sm">Title</th>
        <th class="py-3 px-4 uppercase font-semibold text-sm">Body</th>
      </tr>
      </thead>
      <tbody class="text-gray-700">
      <tr v-for="post in getLimitedPosts" :key="post.id" class="hover:bg-gray-100">
        <td class="py-3 px-4">{{ post.id }}</td>
        <td class="py-3 px-4">{{ post.title }}</td>
        <td class="py-3 px-4">{{ post.body }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
