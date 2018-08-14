// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import "./assets/js/init";
import core from "lxb-vue-core";
import { AlertPlugin, ConfirmPlugin, LoadingPlugin } from "vux";
import FastClick from "fastclick";

if ("addEventListener" in document) {
	document.addEventListener(
		"DOMContentLoaded",
		function() {
			FastClick.attach(document.body);
		},
		false
	);
}

Vue.config.productionTip = false;
Vue.use(core);
Vue.use(AlertPlugin);
Vue.use(ConfirmPlugin);
Vue.use(LoadingPlugin);

// title
router.afterEach(transition => {
	let title = transition.meta.title;
	document.setTitle(title);
});

/**
 * 请求拦截
 */
Vue.ajax.interceptors.request.use(
	config => {
		config.headers["token"] = Vue.cookie.get("token"); // 请求头带上token
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

/**
 * 响应拦截
 */
Vue.ajax.interceptors.response.use(
	response => {
		if (response.data && response.data.code === 4011) {
			// 401, token失效
			Vue.cookie.delete("token");
			router.options.isAddDynamicMenuRoutes = false;
			// router.push({ name: "login" });
		}
		return response;
	},
	error => {
		return Promise.reject(error);
	}
);

/* eslint-disable no-new */
new Vue({
	el: "#app",
	router,
	store,
	components: { App },
	template: "<App/>"
});
