<template>
    <div class="computed">
        <a-list item-layout="horizontal" :data-source="computedLists">
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
        <img class="demo-img" src="./computed.png" alt="">
    </div>
</template>

<script type="text/ecmascript-6">
    import { ref, computed, onMounted } from 'vue'
    export default {
        name: 'Computed',
        setup () {
            let ref1 = ref('home'),
                com1 = computed(() => ref1.value.split('').join('_')),
                ref3 = ref('qwer'),
                com2 = computed({
                    get () {
                        return ref3.value.split('').join('#')
                    },
                    set (val) {
                        console.log(val)
                        ref3.value = val
                    }
                }),
                computedLists = ref([
                    {
                        title: '<span class="colorf00">computed()用来创造计算属性，和过去一样，它返回的值是一个ref对象。里面可以传方法，或者一个对象，对象中包含set()、get()方法</span>',
                        info: []
                    },
                    {
                        title: '1、传入方法，例如com1 = computed(() => ref1.value.split("").join("_"))',
                        info: [
                            '<span class="colorf00">注意：这里只是取值，没有设置，所以只能使用，但是不能修改其值</span>',
                            '其中<span class="color00f">computed为一个可执行函数</span>，可执行函数内部是一个箭头函数，函数返回的是变量的值',
                            '在html标签中，插值表达式里可以直接使用<span class="color00f">变量名称</span>，但是在setup函数里面如果使用变量这需要使用：<span class="color00f">变量名.value</span>的方式。',
                            '例如声明基础变量：com1 = computed(() => ref1.value.split("").join("_"))，在setup里面使用是：com1.value，结果为：h_o_m_e'
                        ]
                    },
                    {
                        title: '2、传入对象，例如com2 = computed({ get () { return ref3.value.split("").join("…") }, set (val) { console.log(val); ref3.value = val } })',
                        info: [
                            '<span class="colorf00">注意：这里既可以取值又可以设置</span>',
                            'get可以获取com2的值，set可以设置ref3的值，设置后com2会跟随改变',
                            '在html标签中，插值表达式里可以直接使用<span class="color00f">变量名称</span>，但是在setup函数里面如果使用变量这需要使用：<span class="color00f">变量名.value</span>的方式。',
                            `com2 = computed({ get () { return ref3.value.split("").join("…") }, set (val) { console.log(val); ref3.value = val } })，在setup里面使用是：<span class="color00f" id="oDiv">com2.value(点击可以改变值)</span>，结果为：${com2.value}`,
                            '<span class="color00f">两种方式都可以使用改变宿主属性的方式来改变其值</span>',
                            '<span class="colorf00">注意：传入方法的时候，不能直接改变计算属性的值，否则会报错；传入对象的时候，可以直接改变计算属性的值</span>'
                        ]
                    }
                ]),
                changeCom2 = () => {
                    com2.value = `${Math.random()}_asdfg`
                };
            onMounted(() => {
                let oDiv = document.getElementById('oDiv')
                oDiv.onclick = changeCom2
            })
            return {
                computedLists,
                ref1,
                com1,
                com2
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './../../../../assets/stylus/vue'
</style>