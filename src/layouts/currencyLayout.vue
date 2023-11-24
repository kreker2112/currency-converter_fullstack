<template>
    <Navbar />
    <div class="currency-layout">
        <slot></slot>
        <ConvertationHistory />
    </div>
    <FooterComponent />
</template>

<script setup>
import ConvertationHistory from '@/components/ConvertationHistory.vue';
import Navbar from '@/components/NavBar.vue';
import FooterComponent from '@/components/FooterComponent.vue';
</script>

<style scoped>
.currency-layout {
    padding-top: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    width: 100%;
}
</style>
