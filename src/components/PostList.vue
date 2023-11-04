<template>
    <div v-if="posts.length > 0" class="container__post">
        <h3>Список постов:</h3>
        <transition-group name="post-list">
            <post-item
                v-for="post in posts"
                :key="post.id"
                :post="post"
                @remove="$emit('remove', post)"
        /></transition-group>
    </div>
    <h2 v-else class="no_posts">Постов нет</h2>
</template>

<script>
import PostItem from '@/components/PostItem'
export default {
    components: { PostItem },
    props: {
        posts: {
            type: Array,
            required: true,
        },
    },
    emits: ['remove'],
}
</script>

<style scoped>
.container__post {
    max-width: 100%;
    margin: 0 auto;
    padding: 15px;
}
.container__post h3 {
    margin: 15px 0 0 0;
    text-align: center;
    font-size: 2rem;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
        'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}

.no_posts {
    display: flex;
    margin-top: 15px;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
        'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    color: #ff0000;
}
.post-list-item {
    display: inline-block;
    margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
    transition: all 1s ease;
}
.post-list-enter-from,
.post-list-leave-to {
    opacity: 0;
    transform: translateX(130px);
}
.post-list-move {
    transition: transform 0.4s ease;
}
</style>
