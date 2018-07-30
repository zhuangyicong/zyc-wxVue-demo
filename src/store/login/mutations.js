import * as types from "./types";

export const mutations = {
	[types.LOGIN](state, data) {
		state.init = true;
		state = Object.assign(state, { ...data });
	},
	[types.LOADING_INFO](state, data) {
		state.init = true;
		state = Object.assign(state, { ...data });
	},
	[types.SET_TOKEN](state, data) {
		state = Object.assign(state, { ...data });
	}
};
