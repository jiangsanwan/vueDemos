<template>
	<div class="pad20px border life-cycle">
        <p class="title">生命周期钩子函数<span class="blue">(对应的组件是：vue3/src/views/home/lifeCycle/index.vue<span class="red padd-l-r20px">###</span>vue2/src/views/home/lifeCycle/index.vue)</span></p>
        <ul class="flex">
            <li class="border-r">
                <p>vue3.0 computed 计算属性</p>
				<p class="text-indent red">computed()用来创造计算属性，和过去一样，它返回的值是一个ref对象。里面可以传方法，或者一个对象，对象中包含set()、get()方法</p>
				<p class="text-indent">1、传入方法，例如com1 = computed(() => ref1.value.split('').join('_'))</p>
				<p class="text-indent">其中<span class="blue">computed为一个可执行函数</span>，可执行函数内部是一个箭头函数，函数返回的是变量的值</p>
				<p class="text-indent">在html标签中，插值表达式里可以直接使用<span class="blue">变量名称</span>，但是在setup函数里面如果使用变量这需要使用：<span class="blue">变量名.value</span>的方式。</p>
				<p class="text-indent">例如声明基础变量：com1 = computed(() => ref1.value.split('').join('_'))，在setup里面使用是：com1.value，结果为：{{ com1 }}</p>
				<p class="text-indent">2、传入对象，例如com2 = computed({ get () { return ref3.value.split('').join('…') }, set (val) { console.log(val); ref3.value = val } })</p>
				<p class="text-indent">get可以获取com2的值，set可以设置ref3的值，设置后com2会跟随改变</p>
				<p class="text-indent">在html标签中，插值表达式里可以直接使用<span class="blue">变量名称</span>，但是在setup函数里面如果使用变量这需要使用：<span class="blue">变量名.value</span>的方式。</p>
				<p class="text-indent">com2 = computed({ get () { return ref3.value.split('').join('…') }, set (val) { console.log(val); ref3.value = val } })，在setup里面使用是：<span class="blue" @click="changeCom2">com2.value(点击可以改变值)</span>，结果为：{{ com2 }}</p>
                <img src="./com_3.png" alt="">
            </li>
            <li>
				<p>vue2.0 computed 计算属性</p>
				<p class="text-indent red">computed()用来创造计算属性，里面可以传方法，或者一个对象，对象中包含set()、get()方法</p>
                <p class="text-indent">1、传入方法，例如computed: { com1 () { return this.ref1.split('').join('_') } }</p>
                <p class="text-indent">2、传入对象，例如com2 =  = computed({ get () { return ref3.value.split('').join('#') }, set (val) { console.log(val) ref3.value = val } })</p>
                <p class="text-indent">两种方式的使用都是：在html标签中，插值表达式里可以直接使用，在conputed、watch、methods、生命周期钩子函数等可以使用<span class="blue">this.变量名</span>的方式获取</p>
                <p class="text-indent blue">两种方式都可以使用改变宿主属性的方式来改变其值</p>
                <p class="text-indent red">注意：传入方法的时候，不能直接改变计算属性的值，否则会报错；传入对象的时候，可以直接改变计算属性的值</p>
                <p class="text-indent" @click="changeCom2">点击直接改变计算属性的值{{ com2 }}</p>
                <img src="./com_2.png" alt="">
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
	export default {
        name: 'Computed',
       data () {
            return {
               ref1: 'home',
               ref3: 'qwer'
            }
        },
        computed: {
            com1 () {
                return this.ref1.split('').join('_')
            },
            com2: {
                get () {
                    return this.ref3.split('').join('#')
                },
                set (val) {
                    console.log(val)
                    this.ref3 = val
                }
            }
        },
        methods: {
            changeCom2 () {
                // this.com1 = 'wer' // 报错
                // this.com2 = 'wer' // 正确执行
                // this.com2 = `${Math.random()}_asdfg`
                this.ref3 = `${Math.random()}_asdfg`
            }
        }
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	
</style>