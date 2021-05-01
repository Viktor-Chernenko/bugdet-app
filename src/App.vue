<template>
    <div id="app">
        <Form @onSubmit="addNewItem"/>
        <totalBudget :total="totalBalance" />
        <budgetList :list="list" @removeItem="removeElement" @changeList="filterList"/>
    </div>
</template>

<script>
import budgetList from "@/components/budgetList.vue";
import totalBudget from "@/components/budgetTotal.vue";
import Form from "@/components/budgetForm.vue";

export default {
    name: "App",
    components: {
        budgetList,
        totalBudget,
        Form,
    },
    data: () => ({
        list: {},
        listAll: {},
    }),
    computed: {
        totalBalance() {
            return Object.values(this.list).reduce((acc, item) => {
                acc += item.value;
                return acc;
            }, 0);
        },
    },
    methods: {
        removeElement(id) {
            this.$delete(this.list, id);
            this.$delete(this.listAll, id);
            localStorage.listBudget = JSON.stringify(this.listAll);
        },
        addNewItem(data) {
            const newObjId = {
                ...data,
                id: String(Math.random())
            };
            this.list = this.listAll;
            this.$set(this.list, newObjId.id, newObjId);
            this.$set(this.listAll, newObjId.id, newObjId);

            localStorage.listBudget = JSON.stringify(this.listAll);
        },
        filterList(value) {
            this.list = this.listAll;

            if (value !== "ALL") {
                this.list = {};
                const newList = Object.values(this.listAll).filter((item) => item.type === value);
                newList.forEach(item => {
                    this.list[item.id] = item;
                });
            }
        }
    },
    mounted() {
        if (localStorage.listBudget) {
            this.list = JSON.parse(localStorage.listBudget);
            this.listAll = JSON.parse(localStorage.listBudget);
        }
    }
};
</script>

<style lang="scss">
body {
    margin: 0;
    padding: 0;
}
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    min-height: 100vh;
    padding: 50px 15px;
    box-sizing: border-box;
}
</style>
