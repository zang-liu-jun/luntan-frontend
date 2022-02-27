<template>
	<view>
		<Artlist
		v-for="item in articleList"
		:aid='item.aid'
		:title='item.title'
		:author='item.author'
		:time='item.time'
		:likes='item.likes'
		:comments='item.comments'
		:image='item.image'
		:preview='item.content'
		@click.native="enterArticle(item.aid)"
		:key='item.aid'
		></Artlist>
	</view>
</template>

<script>
	import Artlist from '../../components/article/Artlist.vue'
	import {onMounted} from 'vue'
	import {utc2beijing} from '../../util/timeFormatter.js'
	import config from '../../util/config.js'
	
	export default {
		components:{
			Artlist
		},
		data(){
			return {
				page:1,
				limit:10,
				articleList:[]
			}
		},
		mounted() {
			this.page=1
			uni.request({
				url:`${config.url}/api/getarticle`,
				method:'GET',
				data:{
					page:this.page,
					limit:this.limit
				},
				success: (res) => {
					this.articleList=res.data.data
					for(let key of this.articleList){
						key.time=utc2beijing(key.time)
					}
				}
			})
		},
		methods: {
			enterArticle(aid){
				uni.navigateTo({
					url:`./articleDetail?aid=${aid}`
				})
			}
		},
		onPullDownRefresh() {
			this.page=1
			uni.request({
				url:`${config.url}/api/getarticle`,
				method:'GET',
				data:{
					page:this.page,
					limit:this.limit
				},
				success: (res) => {
					this.articleList=res.data.data
					for(let key of this.articleList){
						key.time=utc2beijing(key.time)
					}
				}
			})
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onReachBottom(){
			this.page++
			uni.request({
				url:`${config.url}/api/getarticle`,
				method:'GET',
				data:{
					page:this.page,
					limit:this.limit
				},
				success: (res) => {
					for(let key of res.data.data){
						key.time=utc2beijing(key.time)
					}
					this.articleList=[...this.articleList,...res.data.data]
				}
			})
		}
	}
</script>

<style>

</style>
