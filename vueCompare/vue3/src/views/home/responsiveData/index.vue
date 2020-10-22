<template>
	<div class="pad20px border responsive-data">
        <p class="title">响应式数据<span class="blue">(对应的组件是：vue3/src/views/responsiveData/index.vue)</span></p>
        <p class="title text-indent">响应式数据在3.0中有多种声明方式，在2.0种在data中声明（不做过多描述）</p>
        <p>1、使用ref声明响应式数据</p>
        <p class="text-indent">1、在html标签中，插值表达式里可以直接使用<span class="blue">基础变量名称</span>，但是在setup函数里面如果使用基础变量这需要使用：<span class="blue">基础变量名.value</span>的方式。</p>
        <p class="text-indent">例如声明基础变量：ref1 = ref('home')，在setup里面使用是：<span class="red">ref1.value</span>，结果为：{{ ref1 }}</p>
        <p class="text-indent">2、在html标签中，插值表达式里可以直接使用<span class="blue">对象变量名称.属性名</span>，但是在setup函数里面如果使用对象属性值则需要使用：<span class="blue">对象变量名.value.属性名</span>的方式。</p>
        <p class="text-indent">例如声明对象变量：ref2 = ref({ name: 'fremember', age: 30 })，在setup里面使用是：<span class="red">ref2.value.name</span>，结果为：{{ ref2.name }}</p>
        <p>2、使用reactive声明响应式对象数据<span class="red">（注意：一定是对象数据）</span></p>
        <p class="text-indent">在html标签中，插值表达式里可以直接使用<span class="blue">对象变量名称.属性名</span>，但是在setup函数里面如果使用对象属性值则需要使用：<span class="blue">对象变量名.属性名</span>的方式。</p>
        <p class="text-indent">例如声明对象变量：reactive1 = reactive({ name: 'fmoment', age: 29 })，在setup里面使用是：<span class="red">reactive1.name</span>，结果为：{{ reactive1.name }}</p>
        <p>3、使用toRefs将reactive声明响应式对象数据转换为普通的对象</p>
        <p class="text-indent">例如将reactive1转换为reactive_ref1，<span class="blue">reactive_ref1 = toRefs(reactive1)</span></p>
        <p class="text-indent">在html标签中，插值表达式里可以直接使用<span class="blue">对象变量名称.属性名.value</span>，在setup函数里面如果使用对象属性值也需要使用：<span class="blue">对象变量名.属性名.value</span>的方式。</p>
        <p class="text-indent">在setup里面使用是：<span class="red">reactive_ref1.name.value</span>，结果为：{{ reactive_ref1.name.value }}</p>
    </div>
</template>

<script type="text/ecmascript-6">
    import { ref, reactive, toRefs, onMounted } from 'vue'
	export default {
        name: 'ResponsiveData',
		setup () {
            let ref1 = ref('home'),
				ref2 = ref({ name: 'fremember', age: 30 }),
				reactive1 = reactive({ name: 'fmoment', age: 29 }),
                reactive_ref1 = toRefs(reactive1);
            onMounted(() => {
				console.log(ref2.value.name)// fremember
				console.log(reactive1.name)// fmoment
				console.log(reactive_ref1.name.value)// fmoment
			})
			return {
				ref1,
				ref2,
				reactive1,
				reactive_ref1
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	
</style>