<template>
	<view>
		<view class="title">
			欢迎登录
		</view>
		
		<view class="username">
			<input type="text" value="" placeholder="用户名" placeholder-class="placeholder" v-model="username" />
		</view>
		
		<view class="password">
			<input type="password" value="" placeholder="密码" placeholder-class="placeholder" v-model="password"/>
		</view>
		
		<view class="reg" @click="gotoReg">
			<text>注册</text>
		</view>
		
		<view class="login">
			<button type="default" @click="login">登   录</button>
		</view>
	</view>
</template>

<script>
	import config from '../../util/config.js'
	export default {
		data() {
			return {
				username:'',
				password:''
			}
		},
		methods: {
			gotoReg(){
				uni.navigateTo({
				  url:'./register'  
				});
			},
			login(){
				uni.request({
					url:`${config.url}/api/login`,
					method:'POST',
					data:{
						username:this.username,
						password:this.password
					},
					success: (res) => {
						if(res.data.status===0){
							uni.setStorage({
								key:'utoken',
								data:res.data.token
							})
							uni.switchTab({
							    url: 'userInfo'
							});
						}else if(res.data.status===1){
							this.password=''
							uni.showToast({
								title:'登录失败，用户名或密码错误',
								icon:'none'
							})
						}
					},
					fail:(res)=>{
						console.log(res);
					}
				})
			}
		}
	}
</script>

<style scoped >
	.title {
		margin: 20px;
		font-size: 30px;
	}
	
	.username,
	.password {
		width: 80vw;
		height: 40px;
		margin-top: 50px;
		margin-left: 20px;
		border-bottom: 1px solid #e7e7e7;
		
	}
	
	input {
		width: 70vw;
		margin-top: 40px;
		margin-left: 20px;
	}
	
	.reg {
		float: right;
		font-size: 14px;
		margin-right: 40px;
		margin-top: 30px;
		color: #24ACF2;
	}
	
	.placeholder {
		color: #D2D2D2;
	}

	.login {
		margin: 80px auto;
	}
	
	.login button {
		width: 80vw;
		color: white;
		font-weight: 600;
		background-color: #409EFF;
	}
</style>
