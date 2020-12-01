<template>
    <div class="children">{{ children }}</div>
</template>
<script type="text/ecmascript-6">
    import { ref, watch, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'
    export default {
        name: 'Children',
        props: {
            fromParent: {
                default: 0,
                required: true,
                type: Number
            }
        },
        setup (props) {
            let getProps = (name) => {
                    return ref(name)
                },
                children = getProps(props.fromParent);
            /* 组件创建即会执行的生命周期钩子函数   开始 */
            onBeforeMount(() => {
                console.log('onBeforeMount')
            })
            onMounted(() => {
                console.log('onMounted')
            })
            /* 组件创建即会执行的生命周期钩子函数   结束 */

            // 监听props中fromParent的变化
            watch(
                () => props.fromParent,
                val => {
                    children.value = val
                }
            )

            /* 运行过程中需要执行的钩子函数，这里验证的是props更新的时候执行的钩子函数  开始 */
            onBeforeUpdate(() => {
                console.log('onBeforeUpdate')
            })
            onUpdated(() => {
                console.log('onUpdated')
            })
            /* 运行过程中需要执行的钩子函数，这里验证的是props更新的时候执行的钩子函数  结束 */

            /* 组件销毁阶段执行的钩子函数  开始 */
            onBeforeUnmount(() => {
                console.log('onBeforeUnmount')
            })
            onUnmounted(() => {
                console.log('onUnmounted')
            })
            /* 组件销毁阶段执行的钩子函数  结束 */
            return {
                children
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import './../../../../../assets/stylus/reset'
</style>