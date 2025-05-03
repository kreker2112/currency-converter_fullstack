<template>
    <div class="result-page">
        <div class="result__container">
            <h1 class="result__container-header">Result</h1>
            <span>{{ getResult }} {{ getOptionInput }}</span>
        </div>
        <div class="buttons__contaier">
            <ButtonComponent
                button-style="cancel-result"
                @click="cancelOperation"
            >
                Back to the beginning
            </ButtonComponent>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const getResult = store.getters['convert/getResult'];
const getOptionInput = store.getters['convert/getOptionInput'];

const cancelOperation = (): void => {
    router.push('/converter');
};
</script>

<style scoped lang="scss">
.result-page {
    margin: 0 auto;
    height: 100%;
    .result__container {
        margin: 0 auto;
        width: 15vw;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 2px solid var(--primary-color);
        border-radius: 5px;
        padding: 20px;
        &-header {
            margin-bottom: 20px;
            font-size: 2em;
        }
        span {
            font-size: 1.5em;
            font-weight: 700;
        }
    }
    .buttons__contaier {
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 10px;
    }
}
</style>
