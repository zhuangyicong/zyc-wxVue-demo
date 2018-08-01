<template>
    <div class="form_input">
        <div class="form_input_box">
            <!-- 提示信息 -->
            <div class="txt warn" v-if="warnTxt">{{warnTxt}}</div>
            <!-- input的标题 -->
            <div class="txt" v-else-if="val">{{tit}}</div>
            <!-- 占位 -->
            <div class="txt" v-else></div>
            <!-- input -->
            <input ref="input" class="form_input_con" :disabled="disabled" :name="name" :pattern="pattern" :type="type" :placeholder="placeholder" :maxlength="maxlength" v-model="val" @focus="handleFocus" @blur="handleBlur" @keyup="handleInput" />
            <!-- 右 -->
            <div class="iconfont icon-you" v-if="you"></div>
            <!-- 右 -->
            <div class="iconfont icon-shanchuguanbicha" v-if="clear" @click="onclear"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "form_input",
    data() {
        return {
            val: ""
        };
    },
    // props: ['alertText'],
    props: {
        name: {
            default: "input"
        },
        type: {
            default: "text"
        },
        tit: {
            default: "input的名称"
        },
        placeholder: {
            default: "这是一个input"
        },
        warnTxt: {
            default: ""
        },
        value: {
            default: ""
        },
        maxlength: {
            default: "99"
        },
        disabled: {
            default: false
        },
        pattern: {
            default: ""
        },
        you: {
            default: false
        },
        clear: {
            default: false
        }
    },
    created() {
        this.initData();
    },
    mounted() {},
    methods: {
        // 初始化组件
        initData() {
            this.val = this.value;
        },

        // 输入事件
        handleInput(e) {
            this.val = this.val.substring(0, this.maxlength);
            this.$emit("onChange", this.name, this.val);
        },

        // 焦点事件
        handleFocus($event) {
            this.$emit("onfocus", this.name, this.val);
        },

        // 失焦事件
        handleBlur($event) {
            this.$emit("onblur", this.name, this.val);
        },

        // 校验
        validate(val) {},

        onclear() {
            this.val = "";
            this.focus();
        },

        focus() {
            let u = navigator.userAgent;
            let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

            if (!(window.__wxjs_is_wkwebview || isIOS)) {
                this.$refs.input.focus();
            }
        },

        blur() {
            this.$refs.input.blur();
        }
    },
    watch: {
        val(val) {
            this.validate(val);
        }
    }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/config.scss";
.form_input {
    padding: 0 p2r(24);
    .form_input_box {
        position: relative;
        padding: p2r(7) 0 p2r(8);
        // border-bottom: solid $border-size $border-color;
        &:after {
            content: " ";
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 1px;
            border-bottom: solid $border-size $border-color;
            -webkit-transform-origin: 0 100%;
            -ms-transform-origin: 0 100%;
            transform-origin: 0 100%;
            -webkit-transform: scaleY(0.5);
            -ms-transform: scaleY(0.5);
            transform: scaleY(0.5);
        }
        .txt {
            line-height: p2r(18);
            min-height: p2r(18);
            font-size: p2r(14);
            color: $fc-2;
        }
        .warn {
            color: $fc-3;
        }
        .form_input_con {
            line-height: p2r(26);
            min-height: p2r(26);
            color: $fc-1;
            font-size: p2r(14);
            width: 100%;
        }
        .icon-you {
            position: absolute;
            right: 0;
            top: p2r(28);
            line-height: p2r(26);
            min-height: p2r(26);
            font-size: p2r(14);
            color: #a8aaa7;
        }
        .icon-shanchuguanbicha {
            position: absolute;
            right: p2r(6);
            top: p2r(28);
            line-height: p2r(26);
            min-height: p2r(26);
            font-size: p2r(20);
            color: #a8aaa7;
        }
    }
}
</style>
