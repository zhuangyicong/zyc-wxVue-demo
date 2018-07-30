import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const index = r =>
	require.ensure([], () => r(require("@/page/index")), "index");

export default new Router({
	mode: "history", // history hash
	routes: [
		{
			path: "/",
			redirect: "/index"
		},
		{
			path: "/index",
			name: "index",
			meta: {
				title: "收款"
			},
			component: index
		}
	]
});
