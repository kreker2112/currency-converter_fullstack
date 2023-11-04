<template>
    <div class="post">
        <div class="post__titles">
            <div class="post__id"><strong>ID:</strong> {{ post.id }}</div>
            <div class="post__name">
                <strong>Название:</strong> {{ post.title }}
            </div>
            <div class="post__body">
                <strong>Описание:</strong> {{ post.body }}
            </div>
        </div>
        <div class="post__btns--container">
            <small-button @click="$router.push(`/posts/${post.id}`)"
                >Открыть</small-button
            >
            <small-button @click="$emit('remove', post)">Удалить</small-button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        post: {
            type: Object,
            required: true,
        },
    },
    emits: ['remove'],
}
</script>

<style scoped>
.post {
    border: 2px solid #189ca5;
    padding: 15px;
    margin: 15px 0 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
}

.post__titles {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 15px;
    padding: 5px;
    font-size: larger;
    font-family: Arial, Helvetica, sans-serif;
}
.post__btns--container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 15px;
    padding: 15px;
    border-radius: 10px;
}

.post__id {
    font-size: 1.5rem;
    font-family: Arial, Helvetica, sans-serif;
    text-align: center;
    padding-bottom: 20px;
}
</style>
