<template>
    <div class="footer__container">
        <footer class="footer">
            <div className="copyright">
                <p>
                    © 2023 All rights reserved <br />
                    <a
                        href="https://kreker2112.github.io/goit_js_basic_course/"
                    >
                        kreker2112.github.io
                    </a>
                </p>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'FooterComponent',
}
</script>

<style scoped>
.footer__container {
    position: relative;
}
.footer {
    position: absolute;
    width: 100%;
    padding: 60px 0 50px;
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
