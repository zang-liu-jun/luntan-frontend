<template>
	<view>
		<view class="title">{{articleMessage.title}}</view>
		
		<view class="message">
			<view class="author_img"></view>
			<view class="user_box">
				<view class="author_name">{{articleMessage.author}}</view>
				<view class="article_time">{{articleMessage.time}}</view>
			</view>
		</view>
		
		<view class="article_box">
			<text>{{articleMessage.content}}</text>
			<image :src="baseUrl" mode="" v-if="haveImage" @click="previewImg" ></image>
		</view>
		
		<view class="iconfont like">
			<text class="like_icon" @click="flag&&addLike()" ref="likeicon">&#xe677;</text>
			<text class="like_num">{{likeNum}}</text>
		</view>
		
		<view class="border"></view>
		
		<view class="all">
			<text>全部回复</text>
		</view>
		
		<Answer
		v-for="(item,index) in articleMessage.comments"
		:author="item.comment_author"
		:content="item.comment_content"
		:time="item.comment_time"
		:index="index"
		></Answer>
		
		<view class="block"><text>已经到底了哦</text></view>
		
		<Comment class="comment" :aid='aid'></Comment>
	</view>
</template>

<script>
	import config from '../../util/config.js'
	import {utc2beijing} from '../../util/timeFormatter.js'
	import Answer from '../../components/article/Answer.vue'
	import Comment from '../../components/article/Comment.vue'
	
	export default {
		components:{
			Answer,
			Comment
		},
		data() {
			return {
				aid:'',
				articleMessage:{},
				haveImage:false,
				baseUrl:'',
				test:'',
				likeNum:0,
				flag:true
			}
		},
		methods: {
			addLike(){
				this.likeNum++
				uni.request({
					url:`${config.url}/api/like`,
					method:'GET',
					data:{
						aid:this.aid
					}
				})
				this.flag=false
			},
			previewImg(){
				uni.previewImage({
					urls:[this.baseUrl]
				})
			}
		},
		onLoad: function (option) {
			this.aid=option.aid
		},
		mounted() {
			uni.request({
				url:`${config.url}/api/articledetail`,
				method:'GET',
				data:{
					aid:this.aid
				},
				success:(res)=>{
					this.articleMessage=res.data.data
					this.articleMessage.time=utc2beijing(this.articleMessage.time)
					this.likeNum=this.articleMessage.likes
					for(let key of this.articleMessage.comments){
						key.comment_time=utc2beijing(key.comment_time)
					}
					if(this.articleMessage.image){
						this.haveImage=true		
					}
					this.baseUrl=`${config.url}/images/${this.articleMessage.image}`
				}
			})
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../static/font/iconfont.css";
	
	.title {
		width: 100%;
		margin: 10px;
		font-size: 20px;
		font-weight: bold;
	}
	
	.message {
		display: flex;
		margin: 10px;
		.author_img {
			width: 30px;
			height: 30px;
			border-radius: 50%;
			vertical-align: middle;
			background: url(../../static/logo.png) no-repeat;
		}
		.user_box {
			margin-left: 10px;
			.author_name {
				font-size: 14px;
			}
			.article_time {
				font-size: 12px;
				color: #999;
			}
		}
	}
	
	.article_box {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		margin: 10px;
		font-size: 14px;
		line-height: 20px;
		image {
			margin-top: 20px;
			width: 100px;
			height: 100px;
		}
	}
	
	.like {
		display: flex;
		justify-content: center;
		width: 100%;
		height: 40px;
		.like_icon {
			font-size: 35px;
		}
		.like_num {
			padding-top: 5px;
			margin-left: 15px;
			font-size: 20px;
		}
	}
	
	.border {
		width: 100%;
		height: 5px;
		background-color: #F7F7F7;
	}
	
	.all {
		margin: 10px;
		font-size: 14px;
	}
	
	.block {
		display: flex;
		justify-content: center;
		height: 10vh;
		text {
			font-size: 14px;
			color: #B9B9B9;
		}
	}
	
	.comment {
		position: fixed;
		bottom: 0px;
	}
	
</style>
