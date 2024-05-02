<template>
    <Navbar />
    <div class="currency-layout">
        <slot></slot>
    </div>
    <FooterComponent />
</template>

<script setup lang="ts">
import Navbar from '@/components/NavBar.vue';
import FooterComponent from '@/components/FooterComponent.vue';
</script>

<style scoped lang="scss">
.currency-layout {
    padding-top: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    width: 100%;
}
</style>
