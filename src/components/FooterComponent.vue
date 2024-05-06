<template>
    <footer class="footer-component">
        <div className="copyright">
            <p>
                © 2023 All rights reserved <br />
                <a href="https://github.com/kreker2112/-urrency-converter.git">
                    Project repo
                </a>
            </p>
        </div>
    </footer>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.footer-component {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 76px;
    padding: 20px 0 20px;
    background-color: #12c0b2;
    color: #fff;

    .copyright {
        gap: 5px;
        font-size: 16px;
        text-align: center;

        p {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }

        a {
            color: #273baa;
            text-decoration: underline;
        }
    }
}
</style>
