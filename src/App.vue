<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";

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
        ...mapState({})
    },
    mounted() {},
    methods: {
        ...mapMutations([]),
        ...mapActions([])
    },
    watch: {}
};
</script>

<style lang="scss">
@import "./assets/css/base";
@import "./assets/css/vux";
</style>
