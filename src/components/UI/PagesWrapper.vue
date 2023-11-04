<template>
    <div class="pages__wrapper">
        <div
            v-for="pageNumber in totalPages"
            :key="pageNumber"
            class="page"
            :class="{ 'current-page': page === pageNumber }"
            @click="changePage(pageNumber)"
        >
            {{ pageNumber }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'pages-wrapper',
    props: {
        page: {
            type: Number,
            required: true,
        },
        limit: {
            type: Number,
            required: true,
        },
        totalPages: {
            type: Number,
            required: true,
        },
    },
    emits: ['change-page'],
    methods: {
        changePage(pageNumber) {
            this.$emit('change-page', pageNumber)
        },
    },
}
</script>

<style scoped>
.pages__wrapper {
    display: flex;
    justify-content: center;

    margin: 15px 0;
}
.page {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border: 1px solid #000;
    margin-right: 5px;
    cursor: pointer;
}

.current-page {
    border: 2px solid #15c4ca;
}
</style>
