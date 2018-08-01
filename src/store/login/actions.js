import { LOGIN, LOADING_INFO } from "./types.js";

export const actions = {
    async login({ commit, state }, data) {
        // let res = await ajax.get('/cgi/wxservice/login', { code: data });
        // if(res.success) commit(LOGIN, res.data);
    },
    async loading({ commit, state }) {
        // let res = await ajax.get('/cgi/wxservice/user/info', {}, { token: state.token });
        // if(res.success) commit(LOADING_INFO, res.data);
    }
}