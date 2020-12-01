<template>
    <div class="test-watch">
        <!--{{ number }}-->
        <!--{{ state.count }}-->

        <!--{{ name }}-{{ age }}-->

        <!--{{ count }}
        <span @click="unWatch">取消监听</span>-->
        <input type="text" v-model="keywords">
    </div>
</template>

<script type="text/ecmascript-6">
    // import { ref, reactive, watch, onMounted, watchEffect } from 'vue'
    import { ref, watch } from 'vue'
    export default {
        setup () {
            /**
            * 监视单个数据源
            */
            /*
            // 1.监视ref数据源
            let number = ref(1);
            watch(number, (newVal, oldVal) => {
                console.log(oldVal, newVal)
            })
            onMounted(() => {
                setTimeout(() => {
                    number.value = 5
                }, 3000)
            })
            */

            /*
            // 2.监视reactive数据源
            let state = reactive({ count: 1 })
            watch(() => state.count, (newVal, oldVal) => {
                console.log(oldVal, newVal)
            })
            onMounted(() => {
                setTimeout(() => {
                    state.count = 5
                }, 3000)
            })
            */

            /**
            * 监视多个数据源
            */
            /*
            let name = ref('tom'),
                age = ref(29);
            watch([name, age], ([ newName, newAge ], [ oldName, oldAge ]) => {
                console.log(oldName, newName);
                console.log(oldAge, newAge);
            })
            onMounted(() => {
                setTimeout(() => {
                    name.value = 'jarry';
                    age.value = 25;
                }, 3000)
            })
            */

            /**
            * 取消监视
            */
            /*
            let count = ref(1),
                unWatch = watch(count, (newVal, oldVal) => {
                    console.log(oldVal, newVal)
                });
            onMounted(() => {    
                setTimeout(() => {
                    count.value = 5
                }, 10000)
            })
            */

            /**
            * 清除无效的异步任务
            */
            let keywords = ref(''),
            // 定义一个函数，用来异步执行打印任务，返回对应的计时器
            print = value => {
                return setTimeout(() => {
                    console.log(value)
                },1000)
            };
            watch(keywords, (newValue, oldValue, clean) => {
                // 参数clean是一个用来清理无效异步任务的函数
                var timer = print(newValue)
                clean(() => {
                    clearTimeout(timer)// 停止上次还未执行完成的异步任务
                })
            })

            /**
            * watchEffect监听
            * 1.先立即执行传入的函数
            * 2.当函数内依赖的数据发生变化时会再次执行函数
            */
            /*
            let weCount = ref(1)
            watchEffect(() => {
                console.log(weCount.value)
            })
            onMounted(() => {
                setTimeout(() => {
                    weCount.value = 6
                }, 3000)
            })
            */

            return {
                // number
                // state
                // name, age

                // count,
                // unWatch

                keywords
            }


        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .test-watch {
        h1 {
            display: flex;
            align-items: center;
            span {
                margin: 0 20px;
                width: 40px;
                height: 20px;
                text-align: center;
                line-height: 20px;
            }
        }
    }
</style>