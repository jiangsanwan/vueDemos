<template>
    <div class="pad20px border life-cycle">
        <p class="title">生命周期钩子函数<span class="blue">(对应的组件是：vue3/src/views/home/lifeCycle/index.vue<span class="red padd-l-r20px">###</span>vue2/src/views/home/lifeCycle/index.vue)</span></p>
        <ul class="flex">
            <li>
                <p>vue3.0生命周期钩子函数</p>
                <p class="text-indent">setup</p>
                <p class="text-indent">onBeforeMount</p>
                <p class="text-indent">onMounted</p>
                <p class="text-indent">onBeforeUpdate</p>
                <p class="text-indent">onUpdated</p>
                <p class="text-indent">onBedoreUnmount</p>
                <p class="text-indent">onUnmounted</p>
                <p class="text-indent">onErrorCaptured</p>
            </li>
            <li class="border-l">
                <p>vue2.0生命周期钩子函数</p>
                <p class="text-indent">beforeCreate</p>
                <p class="text-indent">created</p>
                <p class="text-indent">beforeMount</p>
                <p class="text-indent">mounted</p>
                <p class="text-indent">beforeUpdate</p>
                <p class="text-indent">updated</p>
                <p class="text-indent">beforeDestroy</p>
                <p class="text-indent">destroyed</p>
                <p class="text-indent">errorCaptured</p>
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
	export default {
        name: 'LifeCycle',
		setup () {
			return {
				// 
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	
</style>