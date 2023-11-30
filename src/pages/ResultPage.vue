<template>
    <div class="result-page">
        <div class="container result__container">
            <h1 class="result__container-header">Результат</h1>
            <span>{{ getResult }} {{ getOptionInput }}</span>
        </div>
        <div class="buttons buttons__contaier">
            <ButtonComponent
                button-style="cancel-result"
                @click="cancelOperation"
            >
                Вернуться в начало
            </ButtonComponent>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
export default defineComponent({
    name: 'ResultPage',

    computed: {
        ...mapGetters({
            getResult: 'convert/getResult',
            getOptionInput: 'convert/getOptionInput',
        }),
    },

    methods: {
        cancelOperation() {
            this.$router.push('/converter');
        },
    },
});
</script>

<style scoped>
.result-page {
    margin: 0 auto;
    height: 100%;
}
.container.result__container {
    margin: 0 auto;
    width: 15vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 2px solid #12c0b2;
    border-radius: 5px;
    padding: 20px;
}
.result__container-header {
    margin-bottom: 20px;
    font-size: 2em;
}

span {
    font-size: 1.5em;
    font-weight: 700;
}

.buttons.buttons__contaier {
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
}
</style>
