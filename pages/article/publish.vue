<template>
	<view class="father">
		<!-- <view class="publish">
			<text v-bind:style="{'color':title ? '#6E84F8':'#7BBFEA'}" class="pubtext" @click="publish">发布</text>
		</view> -->
		
		<view class="title">
			<input type="text" value="" placeholder="请输入完整帖子标题" maxlength=30 placeholder-class="title_placeholder" v-model="title"/>
		</view>
		
		<view class="content">
			<textarea value="" placeholder="尽情发挥吧..." maxlength=400 placeholder-class="placeholder" v-model="content" />
			<image :src="imagePath" mode="" class="preview" @click="previewImg"></image>
			<text @click="imagePath=''" :style="{'color':imagePath ? '#E64340':'#ffffff'}">删除图片</text>
		</view>
		
		<view class="bottom_box" >
			<image src="../../static/img/img.png" mode="" @click="chooseImg" class="chooseimg"></image>
			<button type="default" size="mini" @click="publish" :style="{'background-color':title ? '#01CAFC':'#B1EFFC'}">发布</button>
		</view>
		
	</view>
</template>

<script>
	import config from '../../util/config.js'
	export default {
		data() {
			return {
				title:'',
				content:'',
				imagePath:''
			}
		},
		methods: {
			chooseImg(){
				uni.chooseImage({
					count:1,
					success: (res) => {
						this.imagePath=res.tempFilePaths[0]
					}
				})
			},
			publish(){
				if(!this.title) return;
				if(this.content.length===0) {
					uni.showToast({
						title:'你确定不想说两句话吗?',
						icon:'none',
					})
					return;
				}
				const token = uni.getStorageSync('utoken');
				if(!token){
					uni.navigateTo({
						url:'../user/login'
					})
					return;
				}
				if(this.imagePath){
					uni.uploadFile({
						url:`${config.url}/user/add`,
						filePath:this.imagePath,
						name:'picture',
						header:{
							'authorization':'Bearer '+token
						},
						timeout:2000,
						formData:{
							title:this.title,
							content:this.content
						},
						success:(res)=>{
							uni.showToast({
								title:'发表成功，快去首页刷新看看吧!'
							})
							this.title=''
							this.content=''
							this.imagePath=''
						}
					})
				}else {
					uni.request({
						url:`${config.url}/user/add`,
						header:{
							'authorization':'Bearer '+token
						},
						method:'POST',
						data:{
							title:this.title,
							content:this.content
						},
						success:(res)=>{
							uni.showToast({
								title:'发表成功，快去首页刷新看看吧!'
							})
							this.title=''
							this.content=''
							this.imagePath=''
						}
					})
				}
			},
			previewImg(){
				uni.previewImage({
					urls:[this.imagePath]
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	$line:1px solid #EEEEEF;
	
	.father {
		height: 100vh;
	}
	
	.pubtext {
		position: absolute;
		right: 20px;
		top: -30px;
		font-weight: 600;
	}
	
	.title_placeholder {
		color: #B9B8BD;
		font-size: 14px;
		font-weight: 550;
	}
	
	.placeholder {
		color: #B9B8BD;
		font-size: 14px;
	}
	
	.title {
		height: 40px;
		padding: 10px;
		input {
			width: 100%;
			height: 100%;
		}
	}
	
	.content {
		border-top: $line;
		border-bottom: $line;
		height: 50vh;
		padding: 10px;
		textarea {
			width: 100%;
			height: 75%;
			background-color: #F8F9F9;
		}
		.preview {
			margin-top: 5%;
			width: 20%;
			height: 20%;
		}
		text {
			font-size: 14px;
			margin-left: 10px;
		}
	}
	
	.bottom_box {
		height: 40px;
		background-color: white;
		border-bottom: $line ;
		image {
			margin-left: 20px;
			margin-top: 5px;
			width: 30px;
			height: 30px;
		}
		button {
			float: right;
			margin-top: 5px;
			margin-right: 20px;
			width: 20%;
			height: 30px;
			color: white;
			font-weight: 600;
			border-radius: 20px;
		}
	}

</style>
