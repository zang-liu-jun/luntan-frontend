<template>
	<view>
		
		<view class="background"></view>
		
		<NoLogin v-if="!isLogin"></NoLogin>
		<Login v-if="isLogin"></Login>
	</view>
</template>

<script>

	import NoLogin from '../../components/user/NoLogin.vue'
	import Login from '../../components/user/Login.vue'
	export default {
		components:{
			NoLogin,
			Login
		},
		data() {
			return {
				isLogin:false,
			}
		},
		methods: {
			
		},
		onShow() {
			const token = uni.getStorageSync('utoken');
			if(!token){
				this.isLogin=false
			}else{
				this.$nextTick(()=>{
					this.isLogin=true
				})
			}
		}
	}
</script>

<style scoped lang="scss">

</style>
