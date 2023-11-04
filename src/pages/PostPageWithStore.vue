<template>
    <div>
        <h1 class="header__1">Страница с постами</h1>
        <div class="container-search__input">
            <my-input
                v-focus
                :model-value="searchQuery"
                class="search__input"
                placeholder="Поиск..."
                @update:model-value="setSearchQuery"
            />
        </div>

        <div class="app__btns">
            <div class="btn_container">
                <big-button @click="ShowDialog">Создать пост</big-button>
                <my-select
                    :model-value="selectedSort"
                    :options="sortOptions"
                    @update:model-value="setSelectedSort"
                />
            </div>
        </div>

        <my-dialog v-model:show="dialogVisible">
            <PostForm @create="createPost"
        /></my-dialog>

        <PostList
            v-if="!isPostLoading"
            :model-value="posts"
            :posts="sortedAndSearchedPosts"
            @remove="deletePost"
        />
        <div v-else class="header__loading-container">
            <h1 class="header__loading">Идет загрузка...</h1>
            <div class="loader"><div class="posts__loader"></div></div>
        </div>
        <div v-intersection="loadMorePosts" class="observer"></div>
        <!-- Постраничный вывод:
        <pages-wrapper
            :page="page"
            :limit="limit"
            :total-pages="totalPages"
            @change-page="changePage"
        /> -->
    </div>
</template>

<script>
import PostForm from '@/components/PostForm'
import PostList from '@/components/PostList'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
export default {
    name: 'PostPageWithStore',
    components: {
        PostForm,
        PostList,
    },
    data() {
        return {
            dialogVisible: false,
        }
    },
    computed: {
        ...mapState({
            posts: (state) => state.post.posts,
            isPostLoading: (state) => state.post.isPostLoading,
            selectedSort: (state) => state.post.selectedSort,
            searchQuery: (state) => state.post.searchQuery,
            page: (state) => state.post.page,
            limit: (state) => state.post.limit,
            totalPages: (state) => state.post.totalPages,
            sortOptions: (state) => state.post.sortOptions,
        }),
        ...mapGetters({
            sortedPosts: 'post/sortedPosts',
            sortedAndSearchedPosts: 'post/sortedAndSearchedPosts',
        }),
    },
    watch: {},
    mounted() {
        this.setPage(0)
        this.fetchJsonplaceholderPosts()
    },
    methods: {
        ...mapMutations({
            setPage: 'post/setPage',
            setPosts: 'post/setPosts',
            setSearchQuery: 'post/setSearchQuery',
            setSelectedSort: 'post/setSelectedSort',
            deletePost: 'post/deletePost',
        }),

        ...mapActions({
            loadMorePosts: 'post/loadMorePosts',
            fetchJsonplaceholderPosts: 'post/fetchJsonplaceholderPosts',
        }),
        createPost(post) {
            this.posts.push(post)
            this.dialogVisible = false
        },
        ShowDialog() {
            this.dialogVisible = true
        },
        // Смена страницы пагинации
        // changePage(pageNumber) {
        //     this.page = pageNumber
        // },
    },
}
</script>

<style>
.header__1 {
    margin: 15px 0 0 0;
    text-align: center;
    font-size: 2rem;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
        'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
.container-search__input {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 15px 0;
}
.search__input {
    margin: auto;
    font-size: 1rem !important;
    width: 20rem !important;
}
.btn_container {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 15px;
    margin: 0 auto;

    padding: 15px;
}

.header__loading {
    margin: 15px 0 0 0;
    text-align: center;
    font-size: 2rem;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
        'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
.header__loading-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 15px 0 0 0;
}

.loader {
    display: flex;
    justify-content: center;
    margin: 15px 0 0 0;
}
.posts__loader {
    border-top: 16px solid blue;
    border-right: 16px solid green;
    border-bottom: 16px solid red;
    border-left: 16px solid pink;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
}
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
.btn_fetch {
    display: flex;
    justify-content: center;
    margin: 15px 0;
}
.app__btns {
    margin: auto;
    max-width: 400px;
    display: flex;
    justify-content: space-between;
}
</style>
