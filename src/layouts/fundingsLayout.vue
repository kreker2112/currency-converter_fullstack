<template>
    <Navbar />
    <div class="fundings-layout">
        <slot></slot>
    </div>
    <FooterComponent />
</template>

<script setup lang="ts">
import Navbar from '@/components/NavBar.vue';
import FooterComponent from '@/components/FooterComponent.vue';
</script>

<style scoped lang="scss">
.fundings-layout {
    padding-top: 80px;
}
</style>
