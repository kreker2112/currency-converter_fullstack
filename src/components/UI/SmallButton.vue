<template>
    <button class="button">
        <slot></slot>
    </button>
</template>

<script>
export default { name: 'small-button' }
</script>

<style scoped>
.button {
    background-color: #18aa66;
    border: none;
    color: #fff;
    padding: 10px 15px;
    font-size: 1rem;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
        'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    cursor: pointer;
    transition: all 0.9s;
    border-radius: 0 10px 10px 0;
}

.button:hover {
    background-color: #6ac054;
}
</style>
