<template>
    <div class="convertation-history container">
        <h1 class="convertation-history header">История конвертаций:</h1>
        <ButtonComponent button-style="cleanup-history" @click="clearHistory"
            >Очистить историю</ButtonComponent
        >
        <transition-group name="convertation-history list"
            ><div
                v-for="item in getCurrenciesHistory"
                :key="item"
                class="convertation-history list-item"
            >
                {{ item }}
            </div>
        </transition-group>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';

export default defineComponent({
    name: 'ConvertationHistory',

    computed: {
        ...mapGetters({ getCurrenciesHistory: 'convert/getCurrenciesHistory' }),
    },

    mounted() {
        const historyInLocalStorage: string | null = localStorage.getItem(
            'convertListItemsArray',
        );
        if (historyInLocalStorage) {
            const convertListItemsArray: string[] = JSON.parse(
                historyInLocalStorage,
            );
            this.addConvertListItemToHistoryArray(convertListItemsArray);
        }
    },

    methods: {
        ...mapMutations({
            cleanCurrenciesHistory: 'convert/cleanCurrenciesHistory',
            addConvertListItemToHistoryArray:
                'convert/addConvertListItemToHistoryArray',
        }),

        clearHistory(): void {
            localStorage.removeItem('convertListItemsArray');
            this.cleanCurrenciesHistory();
        },
    },
});
</script>

<style scoped lang="scss">
.convertation-history.container {
    top: 80px;
    right: 0;
    padding: 15px;
    width: 350px;
    height: calc(100vh - 156px);
    border-left: 4px solid #12c0b2;
    overflow-y: scroll;

    .header {
        margin-bottom: 15px;
        font-size: 24px;
    }

    .list {
        display: flex;
        flex-direction: column;
        align-items: center;
        list-style: none;
    }
    .list-item {
        text-align: center;
        padding: 15px;
        width: 100%;
        border: 2px solid #12c0b2;
        border-radius: 5px;

        &:not(:last-of-type) {
            margin-bottom: 10px;
        }
    }
    .list-enter-active,
    .list-leave-active {
        transition: all 1s;
    }
    .list-enter-from,
    .list-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }
}
</style>
