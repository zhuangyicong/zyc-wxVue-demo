export default {
    install(Vue, options) {
        // 常量定义
        Vue.prototype.global_config = {
            request_prefix: process.env.REST_API_URL,
            _lock_pool: new Array(),
            _g_lock: false,
            SUCCESS_CODE: 10000
        };

        // 缓存本地变量
        Vue.prototype.$saveStorage = function (_key, _value) {
            _key = 'vue_' + _key;
            sessionStorage.setItem(_key, _value);
        };
        Vue.prototype.$getStorage = function (_key) {
            _key = 'vue_' + _key;
            return sessionStorage.getItem(_key);
        };

        // 缓存本地变量
        Vue.prototype.$setStorage = function (name, content) {
            if (!name) return;
            if (typeof content !== "string") {
                content = JSON.stringify(content);
            }
            window.localStorage.setItem(name, content);
        };
        Vue.prototype.$getStorage = function (name) {
            if (!name) return;
            return window.localStorage.getItem(name);
        };

        // 跳转默认首页
        Vue.prototype.$goDefaultPage = function () {
            this.$openTabPage({ path: '/index', title: '' });
        };

        Vue.prototype.setState = function (object) {
            for (const key in object) {
                if (object.hasOwnProperty(key)) {
                    const element = object[key];
                    this[key] = element;
                }
            }
        };
    }
}
