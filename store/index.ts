import { defineStore } from 'pinia';
import type { IPost } from '~/services/typing';

export const usePostsStore = defineStore('posts', () => {
    const state = reactive({
        API_URL: 'https://jsonplaceholder.typicode.com/posts',
        posts: [] as IPost[],
        currentPage: 1,
        postsPerPage: 10,
        isLoading: false,
        isModalOpen: false,
        editingPost: null as IPost | null,
    });

    const openModal = (post: IPost | null = null) => {
        state.editingPost = post;
        state.isModalOpen = true;
    };

    const closeModal = () => {
        state.isModalOpen = false;
        state.editingPost = null;
    };

    const getPosts = async (page: number = state.currentPage) => {
        state.isLoading = true;

        try {
            const response = await fetch(`${state.API_URL}?_page=${page}&_limit=${state.postsPerPage}`);
            const newPosts = await response.json();

            if (newPosts.length === 0) {
                console.error('You have reached the end of the posts.');
            } else {
                state.posts = newPosts;
            }
        } catch (error) {
            console.log(error);
        } finally {
            state.isLoading = false;
        }
    };


    const createPost = async (newPost: {id: number; title: string; body: string }) => {
        state.isLoading = true;
        try {
            const response = await fetch(state.API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPost),
            });

            if (!response.ok) {
                throw new Error('Failed to create post');
            }

            state.posts.unshift(newPost);
            closeModal();
        } catch (error) {
            console.log(error);
        } finally {
            state.isLoading = false;
        }
    };

    const deletePost = async (id: number) => {
        state.posts = state.posts.filter(post => post.id !== id);
    };

    const editPost = async (id: number, updatedPost: { title: string; body: string }) => {
        const index = state.posts.findIndex(post => post.id === id);
        if (index !== -1) {
            state.posts[index] = <IPost>updatedPost;
        }
    };

    return {
        state,
        getPosts,
        createPost,
        deletePost,
        editPost,
        openModal,
        closeModal,
    };
});
