import App from "./App";

// #ifndef VUE3
import Vue from "vue";
Vue.config.productionTip = false;
App.mpType = "app";
const app = new Vue({
	...App,
});
app.$mount();
// #endif

// #ifdef VUE3
import { createSSRApp } from "vue";
export function createApp() {
	const app = createSSRApp(App);
	return {
		app,
	};
}
// #endif

// 在main.js 中引入api.js
// import {uni} from "@/common/api.js";
import { uni } from "./apis/api"
