<template>
    <div class="list-item"
        :class="{'class-income': item.type === 'INCOME', 'class-outcome': item.type === 'OUTCOME'}">
        <div class="list-item__box">
            <span class="list-item__date">Дата: {{item.date}}</span>
        </div>
        <span class="list-item__value">Сумма: {{ item.value }}</span>
        <div class="item-comment">
            <div class="item-comment__label">Комментарий: </div>
            <div class="item-comment__text">{{ item.comment }}</div>
        </div>
        <ElButton type="danger" size="medium" class="list-item__btn" @click="removeItem(item.id)">Удалить</ElButton>
    </div>
</template>

<script>
export default {
    name: 'budgetListItem',
    props: {
        item: {
            type: Object,
            default: () => ({}),
        },
    },
    methods: {
        removeItem(id) {
            this.$emit('removeItem', id);
        }
    }
}
</script>

<style lang="scss" scoped>
.class-income {
    background: #1db100;
}

.class-outcome {
    background: #606266;
}

.item-comment {
    padding: 10px;
    width: 90%;

    &__label {
        margin-bottom: 15px;
        color: #fff;
        font-weight: bold;
    }

    &__text {
        background: #fff;
        border-radius: 5px;
        padding: 10px;
    }
}

.list-item {
    padding: 0 15px;
    display: flex;
    flex-direction: column;
    border-radius: 5px;

    &__box {
        padding: 10px 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    &__date {
        font-weight: bold;
        color: #fff;
    }

    &:not(:last-child) {
        margin-bottom: 15px;
    }

    &__value {
        margin: 0 20px;
        font-weight: bold;
        font-size: 22px;
        color: #fff;
    }
}
</style>