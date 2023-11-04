<template>
    <form class="form" @submit.prevent>
        <h4>Создание поста</h4>
        <my-input
            v-model="post.title"
            v-focus
            type="text"
            placeholder="Название"
        />
        <my-input v-model="post.body" type="text" placeholder="Описание" />

        <div class="create-post__btn">
            <big-button @click="createPost">Опубликовать</big-button>
        </div>
    </form>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
export default {
    emits: ['create'],
    data() {
        return {
            post: {
                id: '',
                title: '',
                body: '',
            },
        }
    },

    methods: {
        createPost() {
            this.post.id = uuidv4()
            this.$emit('create', this.post)
            this.post = {
                id: '',
                title: '',
                body: '',
            }
        },
    },
}
</script>

<style scoped>
.form {
    max-width: 600px;
    margin: 0 auto;
    padding: 15px;
}
.form h4 {
    margin: 15px 0 0 0;
    text-align: center;
    font-size: 2rem;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
        'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
.create-post__btn {
    margin-top: 15px;
}
</style>
