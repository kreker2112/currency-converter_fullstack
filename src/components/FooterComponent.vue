<template>
    <footer class="footer-component">
        <div className="copyright">
            <p>
                © 2023 All rights reserved <br />
                <a href="https://github.com/kreker2112/-urrency-converter.git">
                    kreker2112.github.io
                </a>
            </p>
        </div>
    </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'FooterComponent',
});
</script>

<style scoped>
.footer-component {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 76px;
    padding: 20px 0 20px;
    background-color: #12c0b2;
    color: #fff;
}
.copyright {
    font-size: 16px;
    text-align: center;
}

.copyright p + p {
    margin-top: 0.5em;
}
</style>
