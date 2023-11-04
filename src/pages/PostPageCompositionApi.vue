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
                <big-button>Создать пост</big-button>
                <my-select v-model="selectedSort" :options="sortOptions" />
            </div>
        </div>

        <my-dialog v-model:show="dialogVisible"> <PostForm /></my-dialog>

        <PostList v-if="!isPostLoading" :posts="sortedAndSearchedPosts" />
        <div v-else class="header__loading-container">
            <h1 class="header__loading">Идет загрузка...</h1>
            <div class="loader"><div class="posts__loader"></div></div>
        </div>
    </div>
</template>

<script>
// Импорт компонентов
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import BigButton from '@/components/UI/BigButton.vue'
import MySelect from '@/components/UI/MySelect.vue'
import MyInput from '@/components/UI/MyInput.vue'
// Импорт хуков
import usePosts from '@/hooks/usePosts'
import useSortedPosts from '@/hooks/useSortedPosts'
import useSortedAndSearchedPosts from '@/hooks/useSortedAndSearchedPosts'
export default {
    name: 'PostPageCompositionApi',
    components: {
        PostForm,
        PostList,
        BigButton,
        MySelect,
        MyInput,
    },
    setup() {
        const { posts, totalPages, isPostLoading } = usePosts(10)
        const { selectedSort, sortedPosts } = useSortedPosts(posts)
        const { searchQuery, sortedAndSearchedPosts } =
            useSortedAndSearchedPosts(sortedPosts)
        return {
            posts,
            totalPages,
            isPostLoading,
            sortedPosts,
            selectedSort,
            searchQuery,
            sortedAndSearchedPosts,
        }
    },
    data() {
        return {
            dialogVisible: false,

            sortOptions: [
                { value: 'id', name: 'По ID' },
                { value: 'title', name: 'По названию' },
                { value: 'body', name: 'По содержимому' },
            ],
        }
    },
}
</script>

<style>
.likes__container {
    margin: 15px 0 0 0;
    text-align: center;
    font-size: 2rem;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
        'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.like_btn {
    display: flex;
    justify-content: center;
    margin: 0 auto;
    width: 200px;
    height: 50px;
    padding: 15px 25px;
    font-size: 1rem;
    font-weight: 700;
    border-radius: 5px;
    border: 2px solid #d82727;
    background-color: #27d8b2;
}

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
