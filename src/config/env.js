/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 *
 */

let webUrl =''
let routerMode = 'hash';
if (process.env.NODE_ENV == 'development') {//本地开发
	webUrl = '';
}else if(process.env.NODE_ENV == 'testing'){//现场测试环境
}else if(process.env.NODE_ENV == 'devtesting'){//公司开发测试发环境
}else if(process.env.NODE_ENV == 'production'){//生产环境
}
let baseUrl = webUrl;
export {
	baseUrl,
	routerMode,
	webUrl
}
