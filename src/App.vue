<template>
    <div class="app">
        <InputForm />
    </div>
</template>

<script>
import InputForm from './components/InputForm.vue'

export default {
    name: 'App',
    components: {
        InputForm,
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
