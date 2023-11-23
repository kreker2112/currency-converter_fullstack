<template>
    <footer class="footer">
        <div className="copyright">
            <p>
                © 2023 All rights reserved <br />
                <a href="https://kreker2112.github.io/goit_js_basic_course/">
                    kreker2112.github.io
                </a>
            </p>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'FooterComponent',
}
</script>

<style scoped>
.footer {
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
