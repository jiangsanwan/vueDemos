<template>
    <!-- 定义页面ref方式1 -->
    <div class="refs" :ref="refsDom">
        <a-list item-layout="horizontal" :data-source="refsData">
            <template #renderItem="{ item, index }">
                <a-list-item>
                    <a-list-item-meta>
                        <template #title>
                            <p v-html="item.title"></p>
                        </template>
                        <template #description>
                            <p v-for="(itm, idx) in item.info" :key="idx" v-html="itm"></p>
                            <img v-show="index == 1" src="./ref1.png" alt="" />
                        </template>
                    </a-list-item-meta>
                </a-list-item>
            </template>
        </a-list>
        <!-- 定义页面ref方式2 -->
        <div ref="divDom"></div>
        <!-- 获取子组件的方式 -->
        <com-refs ref="comRefs" />
    </div>
</template>

<script type="text/ecmascript-6">
import { ref, onMounted } from 'vue'
import ComRefs from './comRefs'
export default {
    name: 'Refs',
    components: { ComRefs },
    setup () {
        let refsData = ref([
                { title: '', info: [ '通过 `ref()`函数还可以引用页面上的元素或组件，功能类似于 vue 2.x中的 `vm.$refs`' ] },
                { title: '步骤：', info: [
                    '1. 在 `setup()` 中创建一个 ref 对象并返回它',
                    '2. 在页面上为元素添加 ref 属性，并设置属性值与创建的 ref 对象的名称相同',
                    '3. 当页面渲染完成后，可以通过该 ref 对象获取到页面中对应的DOM元素'
                ] },
            ]),
            oDiv = ref(null),// 接收变量
            refsDom = el => {// 页面元素，返回的是元素dom节点
                oDiv.value = el
            },
            divDom = ref(null),
            comRefs = ref(null);
        onMounted(() => {
            console.log(oDiv.value)
            console.log(divDom.value)
            console.log(comRefs.value)// 获取子组件
            console.log(comRefs.value.msg)// 获取子组件的属性 abc
            comRefs.value.change()// 调用子组件的方法 123
        })
        return {
            refsData,
            refsDom,
            divDom,
            comRefs
        }
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import './../../../../assets/stylus/vue'
img {
    margin-top(20px)
    width(400px)
}
</style>