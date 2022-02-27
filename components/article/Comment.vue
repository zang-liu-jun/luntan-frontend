<template>
	<view class="comment_box">
		<textarea value="" placeholder=""  v-model="comment" />
		<button 
		type="default"
		hover-class="none"
		size="mini"
		@click="publish"
		:style="{'background-color':comment ? '#01CAFC':'#B1EFFC'}">发表</button>
	</view>
</template>

<script>
	import config from '../../util/config.js'
	export default {
		name:'Comment',
		props:['aid'],
		data(){
			return {
				comment:''
			}
		},
		methods:{
			publish(){
				if(!this.comment){
					return;
				}
				const token = uni.getStorageSync('utoken');
				if(!token){
					uni.navigateTo({
						url:'../../pages/user/login'
					})
					return;
				}
				uni.request({
					url:`${config.url}/user/comment`,
					method:'POST',
					header:{
						'authorization':'Bearer '+token
					},
					data:{
						aid:this.aid,
						content:this.comment
					},
					success: (res) => {
						this.comment=''
						uni.redirectTo({
							url:'../../pages/article/articleDetail?aid='+this.aid
						})
					}
				})
			}
		}
	}
</script>

<style scoped >
	.comment_box {
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 40px;
		border-top: 1px solid #F1F3F4;
		background-color: white;
	}
	textarea {
		margin: 10px;
		width: 180px;
		height: 25px;
		padding-left: 14px;
		font-size: 14px;
		border-radius: 15px;
		background-color: #F3F3F5;
	}
	
	button {
		margin-top: 5px;
		margin-right: 20px;
		width: 20%;
		height: 30px;
		color: white;
		font-weight: 600;
		border-radius: 20px;
	}
</style>
