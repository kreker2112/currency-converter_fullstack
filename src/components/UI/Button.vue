<template>
    <button class="button">
        <slot></slot>
    </button>
</template>

<script>
export default { name: 'ButtonForConvert' }
</script>

<style scoped>
.button {
    font-size: 1.5rem;
    width: 100%;
    height: 65px;
    border: 2px solid #18aa66;
    background-color: #18aa66;
    box-shadow: 2px 2px 2px #6ac054;
    padding: 15px;
    color: #fff;
    cursor: pointer;
    border-radius: 10px 5px 10px 5px;
}

.button:hover {
    background-color: #6ac054;
    box-shadow: 2px 2px 2px #18aa66;
    transform: scale(1.01);
    transition: all 0.9s;
}
</style>
