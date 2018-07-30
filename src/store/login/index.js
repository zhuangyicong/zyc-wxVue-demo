import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";

const state = {
	headImg: "",
	cellPhone: "",
	inviteCode: "",
	nickName: "",
	token: "",
	realName: "",
	userId: null,
	userStatus: 0,
	init: false,
	lvlName: "",
	userType: 0
};

export default {
	state,
	getters,
	actions,
	mutations
};
