<template>
	<div class="home">
        <h1>
            ref1: {{ ref1 }}
            <span @click="add">加</span>
        </h1>
        <h2>double ref1 (watch): {{ doubleRef1 }}</h2>
        <h1>count: {{ count }} <span @click="red">减</span></h1>
        <h2>double count (computed): {{ doubleCount }}</h2>
        <router-link to='/home2'>跳转到home2</router-link>
        <router-link to='/home3?name=pxy'>跳转到home3</router-link>
    </div>
</template>

<script type="text/ecmascript-6">
    import { ref, computed, watch } from 'vue'
	export default {
        // setup中不能使用this
        // Vue 3.0 中初始化状态通过 setup 方法，
        // 定义状态需要调用 ref 方法
		setup () {
            let ref1 = ref(10),// 定义状态
                count = ref(12),
                add = () => ref1.value++,// 定义方法
                red = () => count.value--,
                // 这里的add、red方法不再需要定义在 methods 中，
                // 但注意更新 count 值的时候不能直接使用 count++，而应使用 count.value++，ref1也是一样的
                
                // 计算属性 computed 是一个方法，里面需要包含一个回调函数，当我们访问计算属性返回结果时，会自动获取回调函数的值
                doubleCount = computed(() => count.value * 2),
                doubleRef1 = computed(() => ref1.value * 2);

                // 监听器 watch 同样是一个方法，它包含 2 个参数，2 个参数都是 function
                // 第一个参数是监听的值，count.value 表示当 count.value 发生变化就会触发监听器的回调函数，
                // 即第二个参数，第二个参数可以执行监听时候的回调
                watch(
                    () => ref1.value,
                    val => {
                        doubleRef1.value = val * 2
                    }
                )
			return {
                ref1,
                doubleRef1,
                count,
                doubleCount,
                add,
                red
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .home {
        h1 {
            display: flex;
            align-items: center;
            span {
                margin-left: 20px;
                width: 40px;
                height: 20px;
                text-align: center;
                line-height: 20px;
            }
        }
    }
</style>