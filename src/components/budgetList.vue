<template>
    <div class="budget-wrap">
        <div class="select-sort">
            <span class="select-sort__text">Сортировать список</span>
            <ElSelect v-model="selectValue" @change="changeSelect">
                <ElOption value="ALL" label="Все"></ElOption>
                <ElOption value="INCOME" label="Доходы"></ElOption>
                <ElOption value="OUTCOME" label="Расходы"></ElOption>
            </ElSelect>
        </div>
        <template v-if="isEmpty">
            <ElCard :header="titleCard">
                <budgetListItem v-for="(item) in list" :key="item.id" @removeItem='removeQuest' :item='item'/>
            </ElCard>
            <ElDialog :title="titleDialog" :visible.sync="question">
                <span slot="footer">
                    <ElButton @click="removeItemList">Да</ElButton>
                    <ElButton @click="question = false">Нет</ElButton>
                </span>
            </ElDialog>
        </template>
        <ElAlert v-else :title="titleAlert" :closable="false"></ElAlert>
    </div>
</template>

<script>
import budgetListItem from "@/components/budgetListItem.vue";

export default {
    name: "budgetList",
    components: {
        budgetListItem
    },
    data: () => ({
        titleCard: "Бюджет",
        confirmationDeleteValue: false,
        titleDialog: 'Вы уверены что хотите удалить?',
        titleAlert: "Список пуст",
        typeItem: true,
        question: false,
        idRemoveItem: 0,
        selectValue: 'ALL',
    }),
    props: {
        list: {
            type: Object,
            default: () => ({}),
        }
    },
    computed: {
        isEmpty() {
            return Object.keys(this.list).length;
        }
    },
    methods: {
        removeItemList() {
            this.question = false;
            this.$emit('removeItem', this.idRemoveItem);
        },
        removeQuest(value) {
            this.question = true;
            this.idRemoveItem = value;
        },
        changeSelect() {
            this.$emit('changeList', this.selectValue);
        }
    }
};
</script>

<style lang="scss" scoped>
.budget-wrap {
    max-width: 600px;
    margin: 0 auto;
    padding-bottom: 50px;
}

.list-item {
    display: flex;
    align-items: center;
    padding: 10px 15px;

    &:not(:last-child) {
        margin-bottom: 15px;
    }

    &__value {
        margin-right: 20px;
        margin-left: auto;
    }
}

.select-sort {
    margin-bottom: 20px;

    &__text {
        padding-right: 20px;
    }
}

@media (max-width: 600px) {
    .select-sort {
        display: flex;
        flex-direction: column;
        max-width: 90%;
        margin: 0 auto 20px;

        &__text {
            padding: 0 0 20px;
        }
    }
}
</style>