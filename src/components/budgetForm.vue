<template>
    <ElCard class="form-card">
        <ElForm :model="formData" ref="addItemForm" :rules="rules" label-position="left">
            <ElFormItem label="Тип бюджета" prop="type">
                <ElSelect
                    class="form-card__select"
                    v-model="formData.type"
                    placeholder="Выберите тип бюджета"
                >
                    <ElOption value="INCOME" label="Доход" />
                    <ElOption value="OUTCOME" label="Расход" />
                </ElSelect>
            </ElFormItem>
            <ElFormItem label="Комментарий" float="left" prop="comment">
                <ElInput
                    placeholder="Введите комментарий"
                    v-model="formData.comment"
                />
            </ElFormItem>
            <ElFormItem label="Сумма" prop="value">
                <ElInput
                    placeholder="Введите сумму"
                    v-model.number="formData.value"
                />
            </ElFormItem>
            <ElButton type="primary" @click="onSubmit" size="medium">Добавить</ElButton>
        </ElForm>
    </ElCard>
</template>

<script>
export default {
    name: "Form",
    data() {
        const validateValue = (rule, value, callback) => {
            if (value === 0) {
                callback(new Error('validateValue'));
                this.$refs.addItemForm.validateField('validateValue');
            } else {
                callback();
            }
        };

        return {
            formData: {
                type: "INCOME",
                comment: "",
                value: '',
                date: '',
            },
            rules: {
                type: [
                    {
                        required: true,
                        message: "Вы не выбрали тип бюджета",
                        trigger: "submit",
                    },
                ],
                comment: [
                    {
                        required: true,
                        message: "Вы не указали комментарий",
                        trigger: "submit",
                    },
                ],
                value: [
                    {
                        required: true,
                        message: "Вы не указали сумму",
                        trigger: "submit",
                    },
                    {
                        type: 'number',
                        message: "Сумма указывается цифрами",
                        trigger: "submit"
                    },
                    {
                        validator: validateValue,
                        message: "Сумма не должна быть равна 0",
                        trigger: 'submit'
                    }
                ],
            },
        }
    },
    methods: {
        onSubmit() {
            this.$refs.addItemForm.validate((valid) => {
                if (valid) {
                    const date = new Date();
                    this.formData.date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

                    if (this.formData.type === 'OUTCOME') this.formData.value = -this.formData.value;
                    this.$emit('onSubmit', { ...this.formData });
                    this.$refs.addItemForm.resetFields();
                }
            })
        },
    }
};

</script>

<style lang='scss' scoped>
.form-card {
    max-width: 500px;
    margin: 0 auto;

    &__select {
        width: 100%;
    }
}
</style>