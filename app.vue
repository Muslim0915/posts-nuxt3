<script lang="ts" setup>
import {usePostsStore} from "~/store";
import AppButton from "~/components/ui/AppButton.vue";

const loadNextPage = ()=>{
   store.state.sumOfPosts += 10;
  store.getPosts(store.state.sumOfPosts);
}

const loadPrevPage = ()=>{
  store.state.sumOfPosts -= 10;
  store.getPosts(store.state.sumOfPosts);
}

const store = usePostsStore();
onMounted(()=>{
  store.getPosts(store.state.sumOfPosts);
})
</script>

<template>

  <div class="w-screen h-screen flex flex-col">
    <Loader v-if="store.state.isLoading"/>
    <PostsTable />

    <div  class="flex items-center gap-5 self-end">
      <AppButton @click="loadPrevPage">
        Prev
      </AppButton>
    <AppButton @click="loadNextPage">
      Next
    </AppButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
