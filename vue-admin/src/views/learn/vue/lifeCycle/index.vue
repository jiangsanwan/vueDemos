<template>
	<div class="life-cycle">
        <a-list item-layout="horizontal" :data-source="lifeCycleLists">
            <template #renderItem="{ item }">
                <a-list-item>
                    <a-list-item-meta :description="item.info">
                        <template #title>
                            {{ item.title }}
                        </template>
                    </a-list-item-meta>
                </a-list-item>
            </template>
        </a-list>
        <a-divider />
        <div class="flex ai-c">
            <span class="mr10px">测试生命周期钩子函数</span>
            <span class="mr10px" @click="changeParentNumber">更新</span>
            <span class="mr10px" @click="destroyEvent(false)">销毁</span>
            <span class="mr10px" @click="destroyEvent(true)">新建</span>
            <children v-if="destroyFlag" :fromParent="parentNumber" />
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import { ref } from 'vue'
    import Children from './children/index'
    export default {
        name: 'LifeCycle',
        components: { Children },
        setup () {
            let lifeCycleLists = ref([
                    { title: '', info: '这些生命周期钩子函数只能在 `setup()` 函数中使用' },
                    { title: 'setup', info: 'setup中包含两部分内容：beforeCreate和created，此时完成了实例在内存中的创建（包括data和methods），还没有开始模版的编译' },
                    { title: 'onBeforeMount', info: '此时已经完成了模板的编译，但是还没有挂载到页面中' },
                    { title: 'onMounted', info: '此时，已经将编译好的模板，挂载到了页面指定的容器中显示' },
                    { title: 'onBeforeUpdate', info: '状态更新之前执行此函数， 此时 data 中的状态值是最新的，但是界面上显示的 数据还是旧的，因为此时还没有开始重新渲染DOM节点' },
                    { title: 'onUpdated', info: '实例更新完毕之后调用此函数，此时 data 中的状态值 和 界面上显示的数据，都已经完成了更新，界面已经被重新渲染好了' },
                    { title: 'onBeforeUnmount', info: '实例销毁之前调用。在这一步，实例仍然完全可用' },
                    { title: 'onUnmounted', info: 'Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁' },
                    { title: 'onErrorCaptured', info: '当捕获一个来自子孙组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 false 以阻止该错误继续向上传播' },
                    { title: 'onRenderTracked', info: '目前没研究明白' },
                    { title: 'onRenderTriggered', info: '目前没研究明白' }
                ]),
                parentNumber = ref(12),
                destroyFlag = ref(true),
                changeParentNumber = () => {
                    parentNumber.value = parentNumber.value * 2
                },
                destroyEvent = (bol) => {
                    destroyFlag.value = bol
                };
            return {
                lifeCycleLists,
                parentNumber,
                changeParentNumber,
                destroyFlag,
                destroyEvent
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import './../../../../assets/stylus/vue'
</style>