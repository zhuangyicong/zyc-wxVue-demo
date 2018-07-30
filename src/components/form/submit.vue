<template>
    <div class="submit">
        <button type="button" class="form__submit" :class="state" :disabled="state == 'disabled'" v-on:click="handleSubmit">{{subBtnTxt}}</button>
    </div>
</template>

<script>
export default {
    name: "submit",
    data() {
        return {};
    },
    props: {
        subBtnTxt: {
            default: "确 认"
        }
    },
    computed: {
        state() {
            return this.$parent.subBtnState;
        }
    },
    methods: {
        // 事件
        handleSubmit() {
            if (this.state == "enable") {
                this.$emit("onClick");
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/config.scss";
.submit {
    padding: 0 p2r(24);
    button.form__submit {
        margin: 0;
        padding: 0;
        border-radius: p2r(3);
        letter-spacing: p2r(3);
        line-height: p2r(47);
        text-align: center;
        white-space: nowrap;
        color: #fff;
        height: p2r(47);
        font-size: p2r(18);
        background: $second-color;
        border: 0;
        width: 100%;
    }
    button.enable {
        background-color: $main-color;
    }
    button.count_btn[disabled] {
        background: $second-color;
    }
}
</style>
