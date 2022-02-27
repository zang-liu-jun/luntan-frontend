<template>
	<view class="artlist">
		<view class="title">{{title}}</view>
		
		<view class="authorInfo">
			<image src="../../static/logo.png" mode=""></image>
			<text>{{author}}</text>
		</view>
		
		<view class="articleInfo">
			<view :class="{articlePreview:isActive,noimage:!isActive}">
				<text>{{preview}}</text>
			</view>
			<view class="artImage" v-if="isActive">
				<image :src="imageUrl"></image>
			</view>
		</view>
		
		<view class="articleMessage">
			<text class="likes">{{likes}}  喜欢</text>
			<text class="comments">{{comments}}  评论</text>
			<text class="time">{{time}}</text>
		</view>
	</view>
</template>

<script>
	import config from '../../util/config.js'
	
	export default {
		name:'Artlist',
		props:['aid','title','author','time','likes','comments','image','preview'],
		data(){
			return {
				imageUrl:'',
				isActive:false,
			}
		},
		mounted() {
			if(this.image){
				this.imageUrl=config.url+'/images/'+this.image
				this.isActive=true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.artlist {
		width: 100%;
		border-bottom: 4px solid #DEE1E6;
		.title {
			margin: 10px;
			font-size: 20px;
			font-weight: bold;
		}
		.authorInfo {
			margin: 10px;
			image {
				width: 25px;
				height: 25px;
				border-radius: 50%;
			}
			text {
				font-size: 14px;
				vertical-align:top;
				margin-left: 5px;
			}
		}
		.articleInfo {
			display: flex;
			justify-content: space-between;
			padding: 10px;
			padding-top:0;
			.articlePreview {
				width: 230px;
				height: 40px;
				// 溢出文字省略号
				overflow:hidden; 
				text-overflow:ellipsis;
				display:-webkit-box; 
				-webkit-box-orient:vertical;
				-webkit-line-clamp:2; 
			}
			.noimage {
				width: 400px;
				height: 40px;
				// 溢出文字省略号
				overflow:hidden; 
				text-overflow:ellipsis;
				display:-webkit-box; 
				-webkit-box-orient:vertical;
				-webkit-line-clamp:2; 
			}
			.artImage {
				width: 90px;
				height: 50px;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.articleMessage {
		display: flex;
		justify-content: space-between;
		font-size: 14px;
		color: gray;
		text {
			margin: 5px;
		}
	}
</style>
