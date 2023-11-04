<template>
    <div>
        <h1 class="header__1">Страница с постами</h1>
        <div class="container-search__input">
            <my-input
                v-model="searchQuery"
                v-focus
                class="search__input"
                placeholder="Поиск..."
            />
        </div>

        <div class="app__btns">
            <div class="btn_container">
                <big-button @click="ShowDialog">Создать пост</big-button>
                <my-select v-model="selectedSort" :options="sortOptions" />
            </div>
        </div>

        <my-dialog v-model:show="dialogVisible">
            <PostForm @create="createPost"
        /></my-dialog>

        <PostList
            v-if="!isPostLoading"
            :posts="sortedAndSearchedPosts"
            @remove="removePost"
        />
        <div v-else class="header__loading-container">
            <h1 class="header__loading">Идет загрузка...</h1>
            <div class="loader"><div class="posts__loader"></div></div>
        </div>
        <div v-intersection="loadMorePosts" class="observer"></div>
        <!-- Постраничный вывод (пагинация): -->
        <!-- <pages-wrapper
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
import axios from 'axios'
export default {
    name: 'PostPage',
    components: {
        PostForm,
        PostList,
    },
    data() {
        return {
            posts: [],
            dialogVisible: false,
            isPostLoading: false,
            selectedSort: '',
            searchQuery: '',
            page: 1,
            limit: 10,
            totalPages: 0,
            sortOptions: [
                { value: 'id', name: 'По ID' },
                { value: 'title', name: 'По названию' },
                { value: 'body', name: 'По содержимому' },
            ],
        }
    },
    computed: {
        sortedPosts() {
            return [...this.posts].sort((post1, post2) => {
                return post1[this.selectedSort]?.localeCompare(
                    post2[this.selectedSort],
                )
            })
        },
        sortedAndSearchedPosts() {
            return this.sortedPosts.filter((post) =>
                post.title
                    .toLowerCase()
                    .includes(this.searchQuery.toLowerCase()),
            )
        },
    },
    watch: {
        // Наблюдение за изменением страницы пагинации и вызов метода fetchJsonplaceholderPosts() при каждом изменении страницы:
        // page() {
        //     this.fetchJsonplaceholderPosts()
        // },
    },
    mounted() {
        // Загрузка постов при жизненном цикле компонента "после монтирования" (mounted):
        this.fetchJsonplaceholderPosts()

        // Бесконечная загрузка (отдельно выведена как директива v-intersection и передана в div с классом observer):
        // const options = {
        //     rootMargin: '0px',
        //     threshold: 1.0,
        // }
        // const callback = (entries) => {
        //     if (entries[0].isIntersecting && this.page < this.totalPages) {
        //         this.loadMorePosts()
        //     }
        // }
        // const observer = new IntersectionObserver(callback, options)
        // observer.observe(this.$refs.observer)
    },
    methods: {
        createPost(post) {
            this.posts.unshift(post)
            this.dialogVisible = false
        },
        removePost(post) {
            this.posts = this.posts.filter((item) => item.id !== post.id)
        },
        ShowDialog() {
            this.dialogVisible = true
        },
        // Смена страницы пагинации
        // changePage(pageNumber) {
        //     this.page = pageNumber
        // },
        async fetchJsonplaceholderPosts() {
            try {
                this.isPostLoading = true

                const response = await axios.get(
                    'https://jsonplaceholder.typicode.com/posts',
                    {
                        params: {
                            _page: this.page,
                            _limit: this.limit,
                        },
                    },
                )

                this.totalPages = Math.ceil(
                    response.headers['x-total-count'] / this.limit,
                )
                this.posts = response.data
            } catch (e) {
                alert(e)
            } finally {
                this.isPostLoading = false
            }
        },
        async loadMorePosts() {
            try {
                this.page += 1
                const response = await axios.get(
                    'https://jsonplaceholder.typicode.com/posts',
                    {
                        params: {
                            _page: this.page,
                            _limit: this.limit,
                        },
                    },
                )

                this.totalPages = Math.ceil(
                    response.headers['x-total-count'] / this.limit,
                )
                this.posts = [...this.posts, ...response.data]
            } catch (e) {
                alert(e)
            }
        },
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
