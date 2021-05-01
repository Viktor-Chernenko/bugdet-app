<template>
    <h3 class="total-budget">
        <span class="total-budget__item">Общий баланс:</span>
        <span :class="[{'total-budget_positive': total > 0, 'total-budget_negative': total < 0}]">{{total}} руб</span>
    </h3>
</template>

<script>
export default {
    name: 'totalBudget',
    props: {
        total: {
            type: Number,
            default: 0
        }
    },
}
</script>

<style lang="scss" scoped>
.total-budget {
    font-size: 24px;
    font-weight: bold;
    text-align: center;

    &__item {
        padding-right: 15px;
    }

    &_negative {
        color: rgb(255, 30, 30);
    }

    &_positive {
        color: #0eb300;
    }
}

@media (max-width: 600px) {
    .total-budget {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        &__item {
            padding-top: 0;
            padding-bottom: 10px;
        }
    }
}
</style>