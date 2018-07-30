import ajax from "../../utils/ajax";
import bankName from "./bankname";

// 手机号校验
export function isPhone_verify(phone) {
	let reg = /^[1][1,2,3,4,5,6,7,8,9][0-9]{9}$/;
	if (!reg.test(phone)) return false;
	return true;
}

// 验证码校验
export function isVerify_verify(val) {
	let reg = /^[0-9]*$/;
	if (!(reg.test(val) && val.length == 6)) return false;
	return true;
}

// btn校验
export function btn_verify(obj = []) {
	let state = true;
	for (let index = 0; index < obj.length; index++) {
		if (!this.$refs[obj[index]].val || this[obj[index] + "Tip"]) {
			state = false;
			break;
		}
	}
	return state;
}

// 照片
export function photo_verify(obj = []) {
	let state = true;
	for (let index = 0; index < obj.length; index++) {
		if (this.$refs[obj[index]] && !this.$refs[obj[index]].localUrl) {
			state = false;
			break;
		}
	}
	return state;
}

// 商户简称判断
export async function shortName_verify(val, merchId = "") {
	console.log(val);
	if (!val.length) {
		this.setState({
			shortNameTip: "请输入商户简称"
		});
		return;
	}

	let res = await ajax.get(
		"/merchant/checkShorName",
		{ shortName: val, merchId },
		{
			token: this.token
		}
	);

	if (!res.success) {
		this.setState({
			shortNameTip: "商户简称重复"
		});
		return;
	}

	// 清除
	if (this.shortNameTip) {
		this.setState({
			shortNameTip: ""
		});
	}
}

/**
 * 银行卡号
 * @param {string} val
 * @param {Array} list
 * @param {string} isCC  是否是信用卡
 */
export async function cardCode_verify(name, val, list = [], opt = {}) {
	let that = this;
	let code = val.replace(/\s+/g, "");
	let cardTypeMap = {
		DC: "储蓄卡",
		CC: "信用卡",
		SCC: "准贷记卡",
		PC: "预付费卡"
	};
	let def_opt = {
		isCC: false,
		cl_list: [] // 对比的数组
	};

	Object.assign(def_opt, opt);

	if (!val.length) {
		this[name + "Tip"] = def_opt.tip || "请输入结算银行卡号";
		return;
	}

	if (def_opt.cl_list.length) {
		for (let index = 0; index < def_opt.cl_list.length; index++) {
			const element = def_opt.cl_list[index];
			if (element.bankAccount == code) {
				this[name + "Tip"] = "该银行卡已添加过了，无需重复添加";
				this.$vux.alert.show({
					title: "提示",
					content: "该银行卡已添加过了，无需重复添加"
				});
				return;
			}
		}
	}

	let result = (await ajax.get(
		"/bank/card/validate/" + code,
		{},
		{ token: this.token, isload: false }
	)).data;
	let bank_name = "";

	console.log(result);
	// 银行卡校验
	if (!result.validated) {
		this[name + "Tip"] = "请输入正确的银行账号";
		return;
	} else {
		// 是否是信用卡  6229 0915 6133 3595 16
		if (def_opt.isCC && result.cardType != "CC") {
			this["cardTypeTip"] = "请添加信用卡";
			this.$refs.cardType.val =
				(bankName[result.bankCode] || "") + cardTypeMap[result.cardType];
			return;
		}
		console.log(that);
		// 如果是信用卡 校验是否之前是否有绑定过
		if (def_opt.isCC) {
			let isdele_res = await ajax.post(
				"/merchant/payment-bankcard/is-deleted",
				{
					bankAccount: code,
					merchId: that.merchId
				},
				{ token: this.token, isload: false }
			);

			if (
				isdele_res.success &&
				isdele_res.data &&
				isdele_res.data.isDeleted == "1"
			) {
				this.$vux.alert.show({
					title: "提示",
					content: "您之前已绑定过该银行卡，不用重新绑定，可立即使用。",
					buttonText: "立即使用",
					async onHide() {
						let recovery = await ajax.post(
							"/merchant/payment-bankcard/recovery",
							{
								bankAccount: code,
								merchId: that.merchId
							},
							{ token: that.token, isload: false }
						);
						if (recovery.success && that.last) {
							window.location.href = that.last;
						}
					}
				});
				return;
			}
		}

		// 信用卡 并且 对比列表为空
		if (def_opt.isCC && list.length == 0) {
			this.setState({
				cardTypeTip: "暂不支持该银行"
			});
			this.$refs.cardType.val =
				(bankName[result.bankCode] || "") + cardTypeMap[result.cardType];
			return;
		}
		if (def_opt.isCC && list.length) {
			let verify = false;
			let chnlBankCode = "";
			let chnlBankName = "";
			list.forEach(element => {
				if (element.bankCode == result.bankCode) {
					verify = true;
					chnlBankCode = element.chnlBankCode;
					chnlBankName = element.chnlBankName;
					bank_name = element.bankName;
				}
			});

			if (!verify) {
				this.setState({
					cardTypeTip: "暂不支持该银行"
				});
				this.$refs.cardType.val =
					(bankName[result.bankCode] || "") + cardTypeMap[result.cardType];
				return;
			} else {
				this.chnlBankCode = chnlBankCode;
				this.chnlBankName = chnlBankName;
			}
		}

		if (!def_opt.isCC && list.length == 0) {
			this[name + "Tip"] = "暂不支持该银行";
			this.settleAcctBank = "";
			return;
		}
		if (!def_opt.isCC && list.length) {
			let verify = false;
			list.forEach(element => {
				if (element.bankCode == result.bankCode) {
					verify = true;
					bank_name = element.bankName;
				}
			});

			if (!verify) {
				this[name + "Tip"] = "暂不支持该银行";
				this.settleAcctBank = "";
				return;
			}
		}

		this.setState({
			bankCode: result.bankCode,
			showBank: true
		});

		if (this.$refs.cardType) {
			this.cardTypeTip = "";
			this.$refs.cardType.val =
				(bankName[result.bankCode] || bank_name) + cardTypeMap[result.cardType];
		}
		if (this.$refs.settleAcctBank) {
			this.$refs.settleAcctBank.val = bankName[result.bankCode] || bank_name;
			this[name + "Tip"] = "";
		}
	}
}

// 真实姓名
export function settleAcctName_verify(val, tip) {
	if (!val.length) {
		this.setState({
			settleAcctNameTip: tip ? "请输入" + tip : "请输入真实姓名"
		});
		return;
	}

	// 清除
	if (this.settleAcctNameTip) {
		this.setState({
			settleAcctNameTip: ""
		});
	}
}

// 身份证
export function legalIdCode_verify(val) {
	if (!val.length) {
		this.setState({
			legalIdCodeTip: "请输入身份证号码"
		});
		return;
	}

	let reg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
	if (!reg.test(val)) {
		this.setState({
			legalIdCodeTip: "请输入正确的身份证号码"
		});
		return;
	}

	// 清除
	if (this.legalIdCodeTip) {
		this.setState({
			legalIdCodeTip: ""
		});
	}
}

// 银行所在地
export function address_verify(name, val) {
	if (!val.length) {
		this.setState({
			addressTip: "请选择银行所在地"
		});
		return;
	}

	// 清除
	if (this.addressTip) {
		this.setState({
			addressTip: ""
		});
	}
}
