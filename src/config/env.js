/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * 
 */

let webUrl =''
let routerMode = 'history';
if (process.env.NODE_ENV == 'development') {//本地开发
	// webUrl = 'http://192.168.112.205:8083'; 
	webUrl = 'http://muyang.yangzhang7.top'; 
	// webUrl = 'http://wechat.tibetairlines.com.cn';
}else if(process.env.NODE_ENV == 'testing'){//现场测试环境
	webUrl = 'http://muyang.yangzhang7.top'; 
}else if(process.env.NODE_ENV == 'devtesting'){//公司开发测试发环境
	webUrl = 'http://wechat.tibetairlines.com.cn';
}else if(process.env.NODE_ENV == 'production'){//生产环境
	webUrl = 'http://wechat.tibetairlines.com.cn';
}
let baseUrl = webUrl+'/xzair-rest'; 
export {
	baseUrl,
	routerMode,
	webUrl
}