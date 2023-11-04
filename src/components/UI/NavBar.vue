<template>
    <div class="navbar">
        <div class="navbar_title" @click="$router.push('/')">Vue3</div>
        <div class="navbar__btns">
            <nav-button @click="$router.push('/posts')">Посты</nav-button>

            <nav-button @click="$router.push('/store')">Хранилище</nav-button>
            <nav-button @click="$router.push('/composition')"
                >Композиция</nav-button
            >
            <nav-button @click="$router.push('/about')">О сайте</nav-button>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style scoped>
.navbar {
    /* position: fixed;
    width: 100%; */
    height: 80px;
    background-color: #12c0b2;
    box-shadow: 2px 2px 4px #a79e84bd;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    padding: 0 15px;
    cursor: pointer;
}
.navbar_title {
    font-size: 2rem;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
        'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    color: #fff;
    padding: 15px;
}

.navbar__btns {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 15px;
    padding-right: 20px;
}
</style>
