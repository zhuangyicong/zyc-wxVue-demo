// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './assets/js/init'
// import lxb from 'lxb-base'
import { AlertPlugin, ConfirmPlugin, LoadingPlugin } from 'vux'
import FastClick from 'fastclick'

if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
    }, false);
}

Vue.config.productionTip = false;
// Vue.use(lxb);
Vue.use(AlertPlugin);
Vue.use(ConfirmPlugin);
Vue.use(LoadingPlugin)

// title
router.afterEach((transition) => {
    let title = transition.meta.title;
    document.setTitle(title);
})

/* eslint-disable no-new */
window.wxapp = new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
