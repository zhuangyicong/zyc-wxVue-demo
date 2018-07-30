import {
    baseUrl
} from '../config/env';
import fetch from "./fetch";
import {showLoading, hideLoading} from './toast';
import {parseURL} from './utils';

let ajax = {
	/**
	 * @param  {[String]} api  [只需要写调用哪个api就好了]
	 * @param  {Object} data [get的请求参数，可有可无]
     * @param  {Object} opt [get的请求参数，可有可无, isMessage, isload]
	 * @return {[Object]}      [返回请求的结果]
	 */
    get: async function (api, data = {}, opt = {}) {
        let defaultOpt = {
            token: '',
            isMessage: true,
            isload: true
        };
        let { token, isMessage, isload } = Object.assign({}, defaultOpt, opt);

        try {
            //发起请求
            if(isload) showLoading();
            let result = await fetch(baseUrl + api, data, 'GET', token);
            if(isload) hideLoading();

            if(result.message == "微信登录凭证校验失败" &&　result.code == 4011){
                window.localStorage.removeItem("token");
                // let obj = parseURL(location.href);
                // window.location.href = obj.protocol + '://' + obj.host + '/index';
                return;
            }
           
            if(result.message == "请求要求身份验证"){
                window.localStorage.removeItem("token");
                let obj = parseURL(location.href);
                window.location.href = obj.protocol + '://' + obj.host + '/index';
                return;
            }

            if (result.success) {
                return result
            } else {
                if(isMessage) {
                    window.wxapp.$vux.alert.show({
                        title: "提示",
                        content: result.message
                    });
                }
                return result;
            }
        } catch (error) {
            //抛出错误，由调用者来处理错误

            throw error;
        }
    },

    /**
	 * @param  {[String]} api  [只需要写调用哪个api就好了]
	 * @param  {Object} data [get的请求参数，可有可无]
     * @param  {Object} opt [get的请求参数，可有可无, isMessage, isload]
	 * @return {[Object]}      [返回请求的结果]
	 */
    post: async function (api, data = {}, opt = {}) {
        let defaultOpt = {
            token: '',
            isMessage: true,
            isload: true
        };
        let { token, isMessage, isload } = Object.assign({}, defaultOpt, opt);

        try {
            //发起请求
            if(isload) showLoading();
            let result = await fetch(baseUrl + api, data, 'POST', token);
            if(isload) hideLoading();

            if(result.message == "微信登录凭证校验失败" &&　result.code == 4011){
                window.localStorage.removeItem("token");
                // let obj = parseURL(location.href);
                // window.location.href = obj.protocol + '://' + obj.host + '/index';
                return;
            }
        
            if(result.message == "请求要求身份验证"){
                window.localStorage.removeItem("token");
                let obj = parseURL(location.href);
                window.location.href = obj.protocol + '://' + obj.host + '/index';
                return;
            }

            if (result.success) {
                return result
            } else {
                if(isMessage) {
                    window.wxapp.$vux.alert.show({
                        title: "提示",
                        content: result.message
                    });
                }
                return result;
            }
        } catch (error) {
            //抛出错误，由调用者来处理错误

            throw error;
        }
    }

}

export default ajax;
