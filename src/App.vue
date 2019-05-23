<template>
  <div id="app">
    <keep-alive>
    <router-view v-if="$route.meta.keepAlive"></router-view>
  </keep-alive>
  <router-view v-if="!$route.meta.keepAlive"></router-view>
</div>

</template>
<script>
export default {
  name: "App"
};
</script>
<style lang="less">
@import './assets/css/base.css';
@import './assets/css/func.less';
@import './assets/css/iconfont.css';
// @import 'http://at.alicdn.com/t/font_1141052_4pjcab4gyp.css';


body {
	font-family: PingFangSC-Regular, SFNSDisplay-Regular, Segoe UI, HelveticaNeue-Light, sans-serif;
}

#app {
	color: #333;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	font-size: px2rem(28);
}

.pages {
	display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	width: 100%;
	height: 100%;
}

.page-frame {
	overflow: auto;
	-webkit-overflow-scrolling: touch;
	width: 100%;
	height: 100%;
	background: #f5f5f5;
	flex-shrink: 0;
}

.page-layout {
	position: relative;

	.title-bar-content {
		position: absolute !important;
		left: 0;
		right: 0;
		top: 0;
	}

	.page-content {
		position: absolute;
		top: px2rem(100);
		left: 0;
		right: 0;
		bottom: 0;
		overflow-y: auto;
		z-index: 1;
	}
}

</style>
