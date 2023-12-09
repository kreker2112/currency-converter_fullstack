<template>
    <div class="converter-page">
        <div class="input-form__container">
            <InputForm />
        </div>
    </div>
</template>

<script setup lang="ts">
import InputForm from '@/components/InputForm.vue';
</script>

<style scoped lang="scss">
.converter-page {
    margin: 0 auto;
}
.input-form__container {
    margin: 0 auto;
}
</style>
