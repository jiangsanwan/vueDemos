<template>
    <div class="provide-inject">
        <a-list item-layout="horizontal" :data-source="piData">
            <template #renderItem="{ item }">
                <a-list-item>
                    <a-list-item-meta>
                        <template #title>
                            <p v-html="item.title"></p>
                        </template>
                        <template #description>
                            <p v-for="(itm, idx) in item.info" :key="idx" v-html="itm"></p>
                        </template>
                    </a-list-item-meta>
                </a-list-item>
            </template>
        </a-list>
        <a-divider />
        <children />
    </div>
</template>

<script type="text/ecmascript-6">
import { ref, provide, onMounted } from 'vue'
import Children from './children/index'
export default {
    name: 'ProvideInject',
    components: { Children },
    setup () {
        let piData = ref([
                { title: '', info: ['依赖注入就是祖先组件向后代组件传递数据，使用`provide()` 和 `inject()` 函数来实现，功能类似 vue 2.x中的 `provide/inject`'] },
                { title: '这两个函数只能在 `setup()` 函数中使用：', info: [
                    '在祖先组件中使用`provide()`函数向下传递数据',
                    '在后代组件中使用`inject()`函数获取上层传递过来的数据'
                ] }
            ]),
            colorRef = ref('red');
        /**
        * 向后代传递普通数据
        */
        provide('color','pink')
        /**
        * 传递响应式数据
        */
        provide('colorRef', colorRef)
        onMounted(() => {
            setTimeout(() => {
                colorRef.value = 'f00'
            }, 3000)
        })
        return {
            piData
        }
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './../../../../assets/stylus/vue'
</style>