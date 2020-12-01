<template>
	<div class="pos-r not-found">
		<div class="pos-a error-content">
			<a-row :gutter="20">
				<a-col :lg="12" :md="12" :sm="24" :xl="12" :xs="24">
					<div class="pos-r pic-error">
						<img class="pic-error-parent" src="@/assets/images/404.png" />
						<img class="pos-a pic-error-child left" src="@/assets/images/cloud.png" />
					</div>
				</a-col>
				<a-col :lg="12" :md="12" :sm="24" :xl="12" :xs="24">
					<div class="pos-r bullshit">
						<div class="bullshit-oops">{{ oops }}</div>
						<div class="bullshit-headline">{{ headline }}</div>
						<div class="bullshit-info">{{ info }}</div>
						<router-link class="db tac bullshit-return-home" to="/dashboard/index">{{ jumpTime }}s&nbsp;{{ btn }}</router-link>
					</div>
				</a-col>
			</a-row>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	import { ref, onMounted, onBeforeUnmount, getCurrentInstance } from 'vue'
	export default {
		name: 'NotFound',
		setup () {
			let { ctx } = getCurrentInstance(),
				oops = ref('抱歉'),
				headline = ref('当前页面不存在'),
				info = ref('请检查您输入的网址是否正确，或点击下面的按钮返回首页。'),
				jumpTime = ref(5),
				btn = ref('返回首页'),
				timer = ref(null),
				resetTimer = () => {
					if(timer.value) {
						clearInterval(timer.value)
						timer.value = null
					}
				};
			onMounted(() => {
				timer.value = setInterval(() => {
					if (jumpTime.value) {
						jumpTime.value--
					} else {
						ctx.$router.push('/dashboard/index')
						resetTimer()
					}
				}, 1000)
			})
			onBeforeUnmount(() => {
				resetTimer()
			})
			return {
				oops,
				headline,
				info,
				jumpTime,
				btn
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import './../../../assets/stylus/error'
</style>