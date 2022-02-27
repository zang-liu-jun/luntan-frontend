<template>
	<view>
		<button type="default" @click="quit">退出登录</button>
	</view>
</template>

<script>
	import config from '../../util/config.js'
	export default {
		data() {
			return {}
		},
		methods: {
			quit(){
				const token = uni.getStorageSync('utoken');
				uni.request({
					url:`${config.url}/user/quit`,
					method:'GET',
					header:{
						'authorization':'Bearer '+token
					},
					success: (res) => {
						console.log(res);
						uni.removeStorage({
							key:'utoken',
							success: () => {
								uni.switchTab({
								  url: '../user/userInfo'
								});
							}
						})
					}
				})
			}
		}
	}
</script>

<style>
	button {
		margin-top: 10px;
		color: #E64340;
		background-color: #F4F5F6;
	}
</style>
