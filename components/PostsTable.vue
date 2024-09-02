<script setup lang="ts">
import { usePostsStore } from "~/store";
import { computed, ref } from "vue";
import AppButton from "~/components/ui/AppButton.vue";
import type {IPost} from "~/services/typing";

const store = usePostsStore();

const sortById = ref<boolean>(true);

const sortedPosts = computed(() => {
  return store.state.posts.slice().sort((a, b) => sortById.value ? a.id - b.id : b.id - a.id);
});

const handleSortById = () => {
  sortById.value = !sortById.value;
};

const handleEditPost = (post: IPost) => {
  store.openModal(post);
};

const handleDeletePost = (id: number) => {
  store.deletePost(id);
};
</script>
<template>
  <div>
    <table class="min-w-full text-white">
      <thead class="bg-gray-800">
      <tr>
        <th class="w-1/6 py-3 px-4 uppercase font-semibold text-sm max-sm:py-0 max-sm:px-0">ID</th>
        <th class="w-1/3 py-3 px-4 uppercase font-semibold text-sm max-sm:py-0 max-sm:px-0">Title</th>
        <th class="py-3 px-4 uppercase font-semibold text-sm max-sm:py-0 max-sm:px-0">Body</th>
        <th class="py-3 px-4 uppercase font-semibold text-sm max-sm:py-0 max-sm:px-0">Actions</th>
      </tr>
      </thead>
      <tbody class="text-white">
      <tr v-for="post in sortedPosts" :key="post.id" class="hover:bg-gray-600 border-b cursor-pointer" @click="handleEditPost(post)">
        <td class="py-3 px-4 border-r  max-sm:px-0">{{ post.id }}</td>
        <td class="py-3 px-4 border-r  max-sm:px-0">{{ post.title }}</td>
        <td class="py-3 px-4 border-r  max-sm:px-0">{{ post.body }}</td>
        <td class=" py-3 px-4 h-full max-sm:px-0">
          <AppButton @click.stop @click="handleDeletePost(post.id)" class="bg-red-500 hover:bg-red-600">Delete</AppButton>
        </td>
      </tr>
      </tbody>
    </table>
    <AppButton @click="handleSortById" class="mt-4 bg-gray-900 hover:bg-gray-950">
      Sort by ID {{ sortById ? 'Descending' : 'Ascending' }}
    </AppButton>
  </div>
</template>


