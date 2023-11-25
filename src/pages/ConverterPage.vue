<template>
    <div class="input-form__container">
        <InputForm />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import InputForm from '@/components/InputForm.vue';
export default defineComponent({
    name: 'ConverterPage',
    components: {
        InputForm,
    },
});
</script>

<style scoped>
.input-form__container {
    margin: 0 auto;
}
</style>
