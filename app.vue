<script setup lang="ts">
import { usePostsStore } from "~/store";
import { computed } from "vue";
import Loader from "~/components/Loader.vue";
import PostsTable from "~/components/PostsTable.vue";
import AppButton from "~/components/ui/AppButton.vue";
import NewPostModal from "~/components/ui/NewPostModal.vue";

const store = usePostsStore();
const editedPost = computed(() => store.state.editingPost || {
  id: store.state.posts.length > 0
    ? Math.max(...store.state.posts.map(post => post.id)) + 1
    : 1,
  title: '',
  body: ''
});

const isEditMode = computed(() => store.state.editingPost !== null);

const loadNextPage = async () => {
  store.state.currentPage++;
  await store.getPosts(store.state.currentPage);
};

const loadPrevPage = async () => {
  if (store.state.currentPage > 1) {
    store.state.currentPage--;
    await store.getPosts(store.state.currentPage);
  }
};

const openCreatePostModal = () => {
  store.openModal();
  store.state.editingPost = null;
  editedPost.value.title ='';
  editedPost.value.body = '';
};

const submitPost = async () => {
  if (isEditMode.value) {
    await store.editPost(editedPost.value.id, editedPost.value);
  } else {
    await store.createPost(editedPost.value);
  }
  store.closeModal();
};

onMounted(() => {
    store.getPosts();
});
</script>
<template>
  <div class="w-full min-h-screen overflow-hidden flex flex-col bg-blue-950 text-white">
    <div class="container mx-auto flex flex-col gap-10">
      <AppButton @click="openCreatePostModal" class="bg-blue-500 hover:bg-blue-600">
        Create Post
      </AppButton>
      <Loader v-if="store.state.isLoading"/>
      <PostsTable />
      <div class="flex items-center gap-5 self-end">
        <AppButton @click="loadPrevPage" :disabled="store.state.currentPage === 1"
                   class="disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed bg-blue-500 hover:bg-blue-600"
        >
          Prev
        </AppButton>
        <AppButton @click="loadNextPage" class="bg-green-500 hover:bg-green-600">
          Next
        </AppButton>

      </div>
    </div>
    <NewPostModal v-if="store.state.isModalOpen" @close="store.closeModal">
      <form @submit.prevent="submitPost" class="flex flex-col gap-4 rounded-2xl w-96 z-20 bg-white py-20 px-10">
        <input
            v-model="editedPost.title"
            placeholder="Title"
            class="text-xl text-blue-900 capitalize font-bold border-2 border-gray-300 rounded-xl py-2 px-4 w-full focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        />
        <input
            v-model="editedPost.body"
            placeholder="Body"
            class="text-xl text-blue-900 capitalize font-bold border-2 border-gray-300 rounded-xl py-2 px-4 w-full focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        />
        <AppButton type="submit" class="bg-blue-500 hover:bg-blue-600">
          {{ isEditMode ? 'Edit Post' : 'Create Post' }}
        </AppButton>
      </form>
    </NewPostModal>
  </div>
</template>


