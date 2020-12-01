<template>
    <div class="responsive-data">
        <a-list item-layout="horizontal" :data-source="responsiveDataLists">
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
    </div>
</template>

<script type="text/ecmascript-6">
    import { ref, reactive, readonly, onMounted } from 'vue'
    export default {
        name: 'ResponsiveData',
        setup () {
            let responsiveDataLists = ref([
                    {
                        title: '1、`ref()`函数接收一个参数值，返回一个响应式的数据对象。该对象只包含一个指向内部值的 `.value` 属性',
                        info: [
                            '步骤一、按需导入 `ref` 函数',
                            '步骤二、调用 `ref` 函数，创建响应式数据对象',
                            '1、在html标签中，插值表达式里可以直接使用<span class="color00f">基础变量名称</span>，但是在setup函数里面如果使用基础变量这需要使用：<span class="color00f">基础变量名.value</span>的方式。',
                            '例如声明基础变量：ref1 = ref("home")，在setup里面使用是：<span class="colorf00">ref1.value</span>，结果为：home',
                            '2、在html标签中，插值表达式里可以直接使用<span class="color00f">对象变量名称.属性名</span>，但是在setup函数里面如果使用对象属性值则需要使用：<span class="color00f">对象变量名.value.属性名</span>的方式。',
                            '例如声明对象变量：ref2 = ref({ name: "fremember", age: 30 })，在setup里面使用是：<span class="colorf00">ref2.value.name</span>，结果为：fremember'
                        ]
                    },
                    {
                        title: '2、`reactive()`函数接收一个普通对象，返回该普通对象的响应式代理对象，<span class="ml10px colorf00">(注意：一定是对象数据）</span>',
                        info: [
                            '简单来说，就是用来创建响应式的数据对象，等同于`vue 2.x` 的 `Vue.observable()`函数',
                            '步骤一、按需导入 `reactive` 函数',
                            '步骤二、调用 `reactive` 函数，创建响应式数据对象',
                            '在html标签中，插值表达式里可以直接使用<span class="color00f">对象变量名称.属性名</span>，但是在setup函数里面如果使用对象属性值则需要使用：<span class="color00f">对象变量名.属性名</span>的方式。',
                            '例如声明对象变量：reactive1 = reactive({ name: "fmoment", age: 29 })，在setup里面使用是：<span class="colorf00">reactive1.name</span>，结果为：fmoment'
                        ]
                    },
                    {
                        title: '3、`readonly()`函数接收一个对象（普通或响应式），返回一个原始对象的只读代理对象',
                        info: [
                            '如果后期给其设置新属性的时候会报错，Set operation on key attribute failed: target is readonly.',
                            '<span class="colorf00">注意1: 如果传入的响应式对象修改了，那么readonly()函数返回的对象内容也会改变</span>',
                            '<span class="colorf00">注意2: 一定是对象数据，否则不具备只读属性</span>',
                            '在html标签中，插值表达式里可以直接使用<span class="color00f">对象变量名称.属性名</span>，但是在setup函数里面如果使用对象属性值则需要使用：<span class="color00f">对象变量名.属性名</span>的方式。'
                        ]
                    }
                ]),
                ref1 = ref('home'),
				ref2 = ref({ name: 'fremember', age: 30 }),
				reactive1 = reactive({ name: 'fmoment', age: 29 }),
                rObj = readonly({ name: 'asdf', age: 29 }),
                rNumber = readonly('abs');
            onMounted(() => {
				console.log(ref2.value.name)// fremember
				console.log(reactive1.name)// fmoment
                console.log(rObj)
                console.log(rObj.name)
                rObj.name = 'pxy'// Set operation on key "name" failed: target is readonly.
                console.log(rObj)// asdf
                console.log(rNumber)
                rNumber = '123'
                console.log(rNumber)
			})
            return {
                responsiveDataLists,
                ref1,
				ref2,
				reactive1
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './../../../../assets/stylus/vue'
</style>