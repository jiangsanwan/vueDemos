<template>
    <div class="setup">
        <a-list item-layout="horizontal" :data-source="setupLists">
            <template #renderItem="{ item }">
                <a-list-item>
                    <a-list-item-meta>
                        <template #title>
                            {{ item.title }}
                        </template>
                        <template #description>
                            <p v-for="(itm, idx) in item.info" :key="idx" v-html="itm"></p>
                        </template>
                    </a-list-item-meta>
                </a-list-item>
            </template>
        </a-list>
        <!--<a-divider />
        <p>{{ name }}</p>-->
    </div>
</template>

<script type="text/ecmascript-6">
    import imgJson from './imgJson'
    import { ref } from 'vue'
    export default {
        name: 'Setup',
        props: {
            msg: {
                default: '',
                requited: true,
                type: String
            }
        },
        // setup (props, ctx) {
        setup () {
            let setupLists = ref([
                {
                    title: '',
                    info: [
                        'setup函数是一个新的组件选项。作为在组件内使用 Composition API 的入口点。',
                        'Composition API都在setup里面写',
                        '<span class="colorf00">注：在 `setup()` 函数中无法访问 `this`</span>'
                    ]
                },
                {
                    title: '1. 调用时机',
                    info: ['setup函数会在 `beforeCreatee` 钩子之前被调用']
                },
                {
                    title: '2. 返回值',
                    info: ['如果 `setup` 返回一个对象，则对象（即return后面的对象）的属性可以在组件模板中被访问']
                },
                {
                    title: '3. 参数',
                    info: [
                        '第一个参数为 `props`，接收当前组件props选项的值，即获取父组件传递过来的参数',
                        `<img style="width: 400px; margin-bottom: 20px;" src="${imgJson.setup1}" alt="" />`,
                        '第二个参数为`context`，接收一个上下文对象，该对象中包含了一些在`vue 2.x` 中需要通过 `this` 才能访问到属性',
                        `<img style="width: 400px;" src="${imgJson.setup2}" alt="" />`,
                    ]
                },
            ])
            // console.log('setup')// 先打印
            // console.log(props.msg)
            // console.log(ctx)// props属性，emit事件的触发，slots插槽
            // // 下面申明的变量不具备响应式
            // var name = 'pxy'
            // setTimeout(() => {
            //     name = 'fremember'// 这里改变了，但是页面没有改变
            //     console.log(name)
            // }, 3000)
            return {
                setupLists,
                // name
            }
        },
        beforeCreate() {
            console.log('beforeCreate')// 后打印
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './../../../../assets/stylus/vue'
</style>