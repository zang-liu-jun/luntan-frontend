<template>
	<view class="box">
		<view class="welcome">
			<image src="../../static/img/smile.png" mode=""></image>
			<text>欢迎</text>
		</view>
		
		<view class="email">
			<input type="text" value="" placeholder="请输入你的邮箱" placeholder-class="placeholder" v-model="email"/>
		</view>
		
		<view class="code">
			<input type="text" value="" placeholder="输入验证码" placeholder-class="placeholder" v-model="verifyCode">
			<button size="mini" @click="getCode" :disabled="disActive" ref="code">{{code_mes}}</button>
		</view>
		
		<view class="username">
			<input type="text" value="" placeholder="用户名" placeholder-class="placeholder" v-model="username">
		</view>
		
		<view class="password">
			<input type="password" value="" placeholder="密码" placeholder-class="placeholder" v-model="password">
		</view>
		
		<button type="default" size="mini" class="verify" @click="register">注册</button>
	</view>
</template>

<script>
	import config from '../../util/config.js'
	export default {
		data() {
			return {
				email:'',
				verifyCode:'',
				disActive:false,
				sec:30,
				code_mes:'获取验证码',
				username:'',
				password:''
			}
		},
		methods: {
			wait(){
			    var timer = setInterval(() => {
						this.disActive=true
						this.sec-=1
						this.code_mes=`${this.sec}S`
						if(this.sec===0){
							clearInterval(timer)
							this.sec=30
							this.disActive=false
							this.code_mes='获取验证码'
						}
			    }, 1000)
			},
			getCode(){
				let t  = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/
				if(t.test(this.email)){
					this.disActive=true
					this.$options.methods.wait.call(this)
					uni.request({
						url:`${config.url}/api/mail`,
						method:'GET',
						data:{
							email:this.email
						},
						success: (res) => {
							uni.setStorageSync('etoken',res.data.token)
						}
					})
				}else {
					uni.showToast({
					  title:"邮箱格式不正确" ,
						icon:'none'
					})
					this.email=''
				}
			},
			register(){
				let nameTest = /^.{1,12}$/
				let psdTest=/^.{6,15}$/
				if(nameTest.test(this.username)){
					if(psdTest.test(this.password)){
						let token=uni.getStorageSync('etoken')
						uni.request({
							url:`${config.url}/user/register`,
							method:'POST',
							data:{
								username:this.username,
								password:this.password,
								code:this.verifyCode,
							},
							header:{
								'authorization':'Bearer '+token
							},
							success: (res) => {
								console.log(res);
								if(res.data.status===0){
									uni.removeStorage({
									    key: 'etoken',
									})
									uni.showToast({
										title:'注册成功'
									})
									setTimeout(()=>{
										uni.redirectTo({
										  url: './login',
											fail:(err)=>{
												console.log(err);
											}
										})
									},1000)
								}else {
									uni.showToast({
										title:res.data.message,
										icon:'error'
									})
								}
							},
							fail: (res) => {
								uni.showToast({
								  title:"注册失败" ,
									icon:'none'
								})
							}
						})
					}else{
						uni.showToast({
						  title:"密码必须由数字、字母组成，长度8-15位" ,
							icon:'none'
						})
					}
				}else{
					uni.showToast({
					  title:"用户名长度必须在1-12位" ,
						icon:'none'
					})
				}
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.box {
		position: relative;
	}
	.welcome {
		margin-top: 40px ;
		margin-left: 30px;
		width: 200px;
		font-size: 40px;
		image {
			width: 64px;
			height: 64px;
			vertical-align: middle;
		}
		text {
			margin-left: 10px;
		}
	}
	
	.email {
		margin: 30px auto;
		height: 80px;
		width: 80vw;
		border-top: 1px solid white;
		border-bottom: 2px solid #E7E7E7;
		input {
			margin-top: 40px;
			margin-left: 20px;
		}
	}
	
	.username {
		margin: 20px auto;
		height: 80px;
		width: 80vw;
		border-top: 1px solid white;
		border-bottom: 2px solid #E7E7E7;
		input {
			margin-top: 40px;
			margin-left: 20px;
		}
	}
	
	.password {
		margin: 20px auto;
		height: 80px;
		width: 80vw;
		border-top: 1px solid white;
		border-bottom: 2px solid #E7E7E7;
		input {
			margin-top: 40px;
			margin-left: 20px;
		}
	}
	
	.code {
		display: flex;
		justify-content: space-between;
		margin: 20px auto;
		height: 80px;
		width: 80vw;
		border-top: 1px solid white;
		border-bottom: 2px solid #E7E7E7;
		input {
			width: 80px;
			margin-top: 40px;
			margin-left: 20px;
		}
		button {
			margin-top: 40px;
			margin-right: -5px;
			color: #24ADF3;
			width: 100px;
			height: 30px;
		}
	}
	
	.verify {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		margin-top: 40px;
		width: 80vw;
		height: 40px;
		color: white;
		font-size: 18px;
		background-color: #50A0FE;
	}
	.placeholder {
		color: #D2D2D2;
	}
</style>
