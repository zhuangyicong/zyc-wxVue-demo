<template>
    <div id="app">
        <!-- <router-view/> -->
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import { wxConfig } from "./utils/wx_config";
import { parseURL } from "./utils/utils";

export default {
    name: "App",
    data() {
        return {
            showLoading: true
        };
    },
    created() {
        let { code, state } = parseURL(location.href).params;
        let token = this.$getStorage("token");

        if (token) {
            this.SET_TOKEN({ token: token });
            this.loading();
        } else if (code && state) {
            this.SET_AUTHORIZE_CODE(code);
            this.SET_AUTHORIZE_STATE(state);
            this.login(code);
        } else {
            this.getAuthorize();
        }
    },
    computed: {
        ...mapState({
            init: state => state.login.init,
            userId: state => state.login.userId,
            token: state => state.login.token,
            merchantsInit: state => state.merchant.merchantsInit,
            // merchantArg: state => state.merchant.merchantArg,
            // GH001: state => state.merchant.GH001,
            YB001: state => state.merchant.YB001
        }),
        // 重定向url
        redirect_uri() {
            return this.$store.getters.getUrl;
        },
        // 电话
        cellPhone() {
            return this.$store.getters.getPhone;
        }
    },
    mounted() {
        // 测试
        // this.login();
    },
    methods: {
        ...mapMutations([
            "SET_AUTHORIZE_CODE",
            "SET_AUTHORIZE_STATE",
            "SET_TOKEN"
        ]),
        ...mapActions([
            "getAuthorize",
            "login",
            "loading",
            "merchants",
            "getYB001",
            // "getGH001",
            "getSignature"
        ])
    },
    watch: {
        redirect_uri(val) {
            let { code, state } = parseURL(location.href).params;

            if (!(code && state)) {
                window.location.href = val;
            }
        },
        token(val) {
            let u = navigator.userAgent;
            let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

            if (val) {
                this.$setStorage("token", val);
                this.merchants({ token: this.token });
                if (window.__wxjs_is_wkwebview == true || isIOS)
                    this.getSignature({ token: this.token, url: document.URL });
            }
        },
        init(val) {
            let url = parseURL(location.href).path;

            if (val && !this.cellPhone) {
                if (url == "/share") return;
                this.$router.push("/phone");
            }
        },
        merchantsInit(val) {
            let that = this;

            // if((this.GH001.merchStatus == 8 ) && (this.YB001.merchStatus == 8)){
            //     this.$vux.confirm.show({
            //         title:'温馨提示',
            //         content: '您开通提交的资料审核不通过，原因如下：' + this.YB001.reason +  this.GH001.reason,
            //         confirmText: '重新提交',
            //         onConfirm () {
            //             that.$router.push("/info");
            //         }
            //     });
            //     return;
            // }
            // this.YB001.reason
            // if(this.YB001.merchStatus == 8 && window.location.pathname != "/yeepay/update"){
            //     this.$vux.confirm.show({
            //         title:'温馨提示',
            //         content: '您开通提交的资料审核不通过，原因如下：' + this.YB001.reason,
            //         confirmText: '重新提交',
            //         onConfirm () {
            //             that.$router.push("/yeepay/update");
            //         }
            //     });
            //     return;
            // }
            // this.GH001.reason
            // if(this.GH001.merchStatus == 8 && window.location.pathname != "/xibpay/update"){
            //     this.$vux.confirm.show({
            //         title:'温馨提示',
            //         content: '您开通提交的资料审核不通过，原因如下：' + this.GH001.reason,
            //         confirmText: '重新提交',
            //         onConfirm () {
            //             that.$router.push("/xibpay/update");
            //         }
            //     });
            //     return;
            // }
        }
        // YB001(val) {
        //     if (val.init) {
        //         this.getYB001({ token: this.token });
        //     }
        // },
        // GH001(val) {
        //     if (val.init) {
        //         this.getGH001({ token: this.token });
        //     }
        // }
    }
};
</script>

<style lang="scss">
@import "./assets/css/base";
@import "./assets/css/vux";
</style>
