<template>
	<view class="box">
		
		<view class="settings" @click="gotoSettings">
			<image src="../../static/img/settings.png" mode=""></image>
		</view>
		
		<view class="userInfo">
			<image src="../../static/logo.png" mode=""></image>
			<text>{{username}}</text>
		</view>
		
		<view class="message">
			
			<view class="like">
				<view class="num">0</view>
				<view class="font">点赞</view>
			</view>
			
			<view class="collection">
				<view class="num">0</view>
				<view class="font">收藏</view>
			</view>
			
			<view class="subscribe">
				<view class="num">0</view>
				<view class="font">关注</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import config from '../../util/config.js'
	export default {
		name:'Login',
		data(){
			return {
				username:''
			}
		},
		mounted(){
			const token = uni.getStorageSync('utoken');
			uni.request({
				url:`${config.url}/user/getuser`,
				method:'GET',
				header:{
					'authorization':'Bearer '+token
				},
				success: (res) => {
					this.username=res.data.message
				}
			})
		},
		methods:{
			gotoSettings(){
				uni.navigateTo({
					url:'../../pages/others/settings'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.settings {
		width: 30px;
		height: 30px;
		float: right;
		margin-top: 40px;
		margin-right: 20px;
		image {
			width: 100%;
			height: 100%;
		}
	}
	.userInfo {
		display: flex;
		justify-content: flex-start;
		width: 100%;
		height: 50px;
		image {
			margin: 40px 20px 0 20px;
			width: 60px;
			height: 60px;
			border-radius: 50%;
		}
		text {
			margin-top: 55px;
			font-size: 18px;
			font-weight:600;
		}
	}
	
	.message {
		margin: 0 auto;
		height: 10vh;
		width: 80vw;
		margin-top: 10vh;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: #EEF2F5;
		border-radius: 10px;
		.num {
			margin-left: 2vw;
			font-size: 18px;
			font-weight: 600;
		}
		.font {
			font-size: 14px;
			color: #4F5A69;
		}
	}
	
	
</style>
