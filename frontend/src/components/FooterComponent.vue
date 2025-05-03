<template>
    <footer class="footer-component">
        <div className="copyright">
            <p>
                © 2023 All rights reserved <br />
                <a
                    href="https://github.com/kreker2112/currency-converter_fullstack"
                >
                    Project repo
                </a>
            </p>
        </div>
    </footer>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.footer-component {
    width: 100%;
    height: 76px;
    padding: 20px 0;
    background-image: linear-gradient(
        var(--primary-color),
        var(--secondary-color)
    );
    color: var(--footer-text-color);
    display: flex;
    justify-content: center;
    align-items: center;
    transition:
        background-color 0.3s ease,
        color 0.3s ease;

    .copyright {
        font-size: 16px;
        text-align: center;

        p {
            font-family: 'Montserrat';
            line-height: 1.5;
        }

        a {
            font-family: 'Montserrat';
            color: var(--footer-text-color);
            text-decoration: underline;
        }
    }
}
</style>
