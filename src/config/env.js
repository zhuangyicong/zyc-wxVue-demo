/**
 * 配置编译环境和线上环境之间的切换
 *
 *
 */
let baseUrl = process.env.API_URL;

if (process.env.NODE_ENV == "development") {
	baseUrl = "/apis";
	// baseUrl = "/mock";
} else {
}

export { baseUrl, imgUrl };
