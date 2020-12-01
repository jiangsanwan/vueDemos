<template>
    <div class="tool">
        <a-list item-layout="horizontal" :data-source="toolData">
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
        <!-- {{ refAge }} -->
        <!-- {{ name }} -->
    </div>
</template>

<script type="text/ecmascript-6">
    import { isRef, ref, reactive, onMounted, isReactive, readonly, isReadonly, isProxy, unref, toRefs, toRef } from 'vue'
    export default {
        name: 'Tool',
        setup () {
            let toolData = ref([
                { title: '1. isRef', info: ['检查一个值是否为一个 ref 对象。如果是，返回true；否则返回false'] },
                { title: '2. isReactive', info: ['检查一个对象是否是由 `reactive` 创建的响应式代理。如果是，返回true；否则返回false'] },
                { title: '3. isReadonly', info: ['检查一个对象是否是由 `readonly` 创建的只读代理。如果是，返回true；否则返回false'] },
                { title: '4. isProxy', info: ['检查一个对象是否是由 `reactive` 还是 `readonly` 方法创建的代理。如果是，返回true；否则返回false'] },
                { title: '5. unref', info: ['如果参数是一个 ref 则返回它的 `value`，否则返回参数本身。它是 `val = isRef(val) ? val.value : val` 的语法糖。'] },
                { title: '6. toRef', info: [
                    '`toRef()`函数用来将 reactive 对象的一个属性创建为一个 ref，并且这个 ref 具有响应性，可以被传递。',
                    '例如将reactive1的age转换为refAge，<span class="color00f">refAge = toRef(reactive1, "age")</span>',
                    '在html标签中，插值表达式里可以直接使用<span class="color00f">对象变量名称.value</span>，在setup函数里面如果使用对象属性值也需要使用：<span class="color00f">对象变量名.value</span>的方式。',
                    '在setup里面使用是：<span class="colorf00">refAge.value</span>，结果为：20',
                    '<span class="colorf00">refAge的修改会传递给reactive1.age，同时reactive1.age的修改也会传递给refAge</span>'
                ] },
                { title: '7. toRefs', info: [
                    '`toRefs()`函数用来将 reactive 对象创建为一个普通对象，但该普通对象的每个属性都是一个 ref，并且这个 ref 具有响应性，可以被传递。',
                    '例如将reactive1转换为reactive_ref1，<span class="color00f">reactive_ref1 = toRefs(reactive1)</span>',
                    '在html标签中，插值表达式里可以直接使用<span class="color00f">对象变量名称.属性名.value</span>，在setup函数里面如果使用对象属性值也需要使用：<span class="color00f">对象变量名.属性名.value</span>的方式。',
                    '在setup里面使用是：<span class="colorf00">reactive_ref1.name.value</span>，结果为：fmoment',
                    '<span class="colorf00">reactive_ref1属性的修改会传递给reactive1，同时reactive1属性的修改也会传递给reactive_ref1</span>'
                ] },
                { title: '8. toRef和toRefs应用场景', info: [
                    '当return出来reactive对象的时候，在页面中的插值表达式需要使用 <span class="color00f">对象.属性</span> 的形式，比较麻烦，',
                    '这个时候有的人会使用扩展运算符（...）但是这样做了之后，属性就是去了响应式了；',
                    '所以最好的方式就是使用toRef将属性转换出来，这样在页面中的插值表达式就可以使用<span class="color00f">属性</span> 的形式了',
                    '或者是使用toRefs将对象转成ref对象，然后在使用扩展运算符取得属性，这样在页面中的插值表达式就可以使用<span class="color00f">属性</span> 的形式了'
                ]}
            ]),
            count1 = ref(2),
            count2 = 3,
            obj1 = ref({ name: 'pxy', age: 29 }),
            obj2 = reactive({ name: 'fremember', age: 29 }),
            obj3 = { name: 'yangzi', ag2: 29 },
            rnumber = readonly({ name: 'fmoment', age: 29 }),
            reactive1 = reactive({ name: 'z3', age: 20 }),
            refAge = toRef(reactive1, 'age'),
            reactive_ref1 = toRefs(reactive1);
            onMounted(() => {
                console.log(isRef(count1))// true
                console.log(isRef(count2))// false
                console.log(isReactive(obj1))// false
                console.log(isReactive(obj2))// true
                console.log(isReactive(obj3))// false
                console.log(isReadonly(rnumber))// true
                console.log(isProxy(obj2))// true
                console.log(isProxy(rnumber))// true
                console.log(isProxy(obj1))// false
                console.log(isProxy(obj3))// false
                console.log(unref(count1))// 2
                console.log(unref(obj1))// Proxy {name: "pxy", age: 29}
                console.log(unref(obj2))// Proxy { name: "fremember", age: 29 }
                console.log(refAge.value)// 20
                console.log(reactive_ref1.name.value)// z3
                setTimeout(() => {
                    refAge.value = 123
                    console.log(refAge.value)// 123
                    console.log(reactive1.age)// 123
                }, 3000)
            })
            return {
                toolData,
                // refAge
                // ...toRefs(reactive_ref1)
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import './../../../../assets/stylus/vue'
</style>