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
    created() {},
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
