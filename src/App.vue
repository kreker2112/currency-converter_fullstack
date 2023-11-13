<template>
    <Navbar />
    <div class="app">
        <router-view />
    </div>
</template>

<script>
import Navbar from './components/UI/NavBar.vue'

export default {
    name: 'App',
    components: {
        Navbar,
    },
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.app {
    max-width: 1480px;
    margin: 0 auto;
    padding: 15px;
    padding-top: 20vh;
}
</style>
