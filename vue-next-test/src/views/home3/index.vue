<template>
	<div class="home3">
        <h1>{{ vuexa }}<span @click="updateA">更新a</span></h1>
        <h1>{{ vuexaa }}<span @click="updateAa">更新aa</span></h1>
        <router-link to='/home1'>跳转到home1</router-link>
        <router-link to='/home2'>跳转到home2</router-link>
    </div>
</template>

<script type="text/ecmascript-6">
    import { computed, getCurrentInstance } from 'vue'
    // Vue 3.0 中通过 getCurrentInstance 方法获取当前组件的实例，然后通过 ctx 属性获得当前上下文，
    // ctx.$router 是 Vue Router 实例，里面包含了 currentRoute 可以获取到当前的路由信息

    // 通过计算属性使用 Vuex 状态
    // ctx.$store.commit触发vuex的同步操作
	export default {
		setup () {
            let { ctx } = getCurrentInstance(),
                vuexa = computed(() => ctx.$store.state.a),
                vuexaa = computed(() => ctx.$store.state.test.aa),
                updateA = () => { ctx.$store.commit('setA', 6) },
                updateAa = () => { ctx.$store.commit('setTestA', 4) };
            console.log(ctx.$router.currentRoute.value)
			return {
                vuexa,
                vuexaa,
                updateA,
                updateAa
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.home3 {
        h1 {
            display: flex;
            align-items: center;
            span {
                margin: 0 20px;
                height: 20px;
                text-align: center;
                line-height: 20px;
            }
        }
    }
</style>