<template>
	<view>
		<view class="img">
			<image src="../../static/img/nologin.png" mode=""></image>
		</view>
		
		<view class="title">
			<text>您还未登录哦</text>
		</view>
		
		<view class="button">
			<button size="mini" @click="goLog">请登陆后查看</button>
		</view>
	</view>
</template>

<script>
	export default {
		name:'NoLogin',
		methods:{
			goLog(){
				uni.navigateTo({
					url:'../../pages/user/login',
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.title {
		position: relative;
		color: #B5B5B5;
		text {
			position: absolute;
			top: -20px;
			left: 50%;
			transform: translateX(-50%);
		}
	}
	.img {
		width: 100%;
		height: 320px;
		position: relative;
		image {
			position: absolute;
			top: 60%;
			left: 50%;
			transform: translate(-50%,-50%);
		}
	}
	.button {
		position: relative;
		button {
			position: absolute;
			top: 20px;
			left: 50%;
			transform: translateX(-50%);
			height: 35px;
			line-height: 35px;
			font-size: 14px;
			color: white;
			border-radius: 15px;
			border: 0px;
			background-image: linear-gradient(to bottom right, #6BE0F8, #44BEFF);
		}
	}
</style>
