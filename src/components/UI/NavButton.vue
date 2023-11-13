<template>
    <button class="button">
        <slot></slot>
    </button>
</template>

<script>
export default { name: 'nav-button' }
</script>

<style scoped>
.button {
    background-color: #06998d;
    border: none;
    border-radius: 5px;
    color: #fff;
    padding: 10px 15px;
    font-size: 1rem;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
        'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    cursor: pointer;
    box-shadow: 2px 2px 2px #a79e84bd;
    transition: all 0.9s;
}

.button:hover {
    background-color: #fff;
    color: #12c0b2;
    box-shadow: 2px 2px 2px #a79e84bd;
}
</style>
