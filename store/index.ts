import {defineStore} from 'pinia';
import type {IPost} from '~/services/typing';

export const usePostsStore = defineStore('posts', ()=>{
    const state = reactive({
        API_URL: 'https://jsonplaceholder.typicode.com/posts',
        posts: [] as IPost[],
        currentPage: null,
        sumOfPosts: 10,
        isLoading: false,
        isModalOpen: false,
        error: null,
    })
    const getPosts = async (limit:number) => {
        state.isLoading = true;
        try {
            const response = await fetch(`${state.API_URL}?_limit=${limit}`);
            state.posts = await response.json();
        }
        catch (error) {
            console.log(error);
        }
        state.isLoading = false;
        console.log(limit);
    }
    return{
        state,
        getPosts,
    }
})