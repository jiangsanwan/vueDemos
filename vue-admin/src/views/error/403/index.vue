<template>
	<div class="pos-r forbiden">
		<div class="pos-a error-content">
			<a-row :gutter="20">
				<a-col :lg="12" :md="12" :sm="24" :xl="12" :xs="24">
					<div class="pos-r pic-error">
						<img class="pic-error-parent" src="@/assets/images/403.png" />
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
        name: 'Forbiden',
		setup () {
			let { ctx } = getCurrentInstance(),
				oops = ref('抱歉!'),
				headline = ref('您没有操作角色...'),
				info = ref('当前帐号没有操作角色,请联系管理员。'),
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