<template>
	<view class="answer_box">
		<view class="info">
			<image src="../../static/logo.png" mode=""></image>
			<view class="user">
				<view class="name">{{author}}</view>
				<view class="gray">
					<text>第{{index+2}}楼</text>
					<text>·</text>
					<text>{{time}}</text>
				</view>
			</view>
		</view>
		
		<view class="content">
			{{content}}
		</view>
		
	</view>
</template>

<script>
	export default {
		name:'Answer',
		props:['author','content','time','index']
	}
</script>

<style scoped lang="scss">
	.answer_box {
		padding-bottom: 10px;
	}
	
	.info{
		display: flex;
		justify-content: flex-start;
		height: 40px;
		// background-color: pink;
		image {
			width: 35px;
			height: 35px;
			margin: 10px;
			border-radius: 50%;
		}
		.user {
			margin-top: 10px;
			.name {
				font-size: 15px;
			}
			.gray {
				font-size: 14px;
				color: #999;
			}
		}
	}
	
	.content {
		margin: 20px 20px 0 40px;
		padding-bottom: 10px;
		font-size: 14px;
		line-height: 20px;
		border-bottom: 2px solid #F1F3F4;
	}
	
</style>
