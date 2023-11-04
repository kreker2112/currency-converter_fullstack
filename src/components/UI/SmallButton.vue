<template>
    <button class="post__btn">
        <slot></slot>
    </button>
</template>

<script>
export default {
    name: 'small-button',
}
</script>

<style scoped>
.post__btn {
    max-width: 1480px;
    font-size: 1.5rem;
    background-color: #189ca5;
    color: #fff;
    border: none;
    box-shadow: 2px 2px 2px red;
    padding: 5px 10px;
    border-radius: 10px;
    cursor: pointer;
}
.post__btn:hover {
    background-color: #6ac054;
    box-shadow: 2px 2px 2px #18aa66;
    transform: scale(1.01);
    transition: all 0.9s;
}
</style>
