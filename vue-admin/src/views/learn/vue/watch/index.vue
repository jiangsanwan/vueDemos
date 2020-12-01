<template>
    <div class="watch">
        <a-list item-layout="horizontal" :data-source="watchList">
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
        <test-watch />
    </div>
</template>

<script type="text/ecmascript-6">
    import { ref } from 'vue'
    import imgJson from './imgJson'
    import TestWatch from './testwatch'
    export default {
        name: 'Watch',
        components: { TestWatch },
        setup () {
            let watchList = ref([
                {
                    title: '<span class="colorf00">监听器 watch 是一个方法，它包含 2 个参数，第一个参数是监听的值，count.value 表示当 count.value 发生变化就会触发监听器的回调函数，即第二个参数，第二个参数可以执行监听时候的回调</span>',
                    info: [
                        '类似于一种懒监听，不会立即执行传入的函数',
                        '<span class="colorf00">监听ref的时候，可以使用属性或者函数形式返回</span>',
                        '<span class="colorf00">但是监听reactive对象的时候，只能使用函数形式返回</span>'
                    ]
                },
                {
                    title: '1、watch 监听一个值',
                    info: [
                        '通过函数返回值',
                        `<img style="width: 400px; margin-bottom: 20px;" src="${imgJson.watch1}" alt="" />`,
                        '通过直接放置ref',
                        `<img style="width: 400px;" src="${imgJson.watch2}" alt="" />`
                    ]
                },
                {
                    title: '2、watch 监听多个值',
                    info: [
                        '监听多个值的时候，第一个参数是一个数组，数组中包含所有要监听的属性',
                        '通过函数返回值',
                        `<img style="width: 400px; margin-bottom: 20px;" src="${imgJson.watch3}" alt="" />`,
                        '通过直接放置ref',
                        `<img style="width: 400px;" src="${imgJson.watch4}" alt="" />`
                    ]
                },
                {
                    title: '3、watch 取消监视',
                    info: [
                        'watch方法会返回一个用于取消监视的函数',
                        `<img style="width: 400px;" src="${imgJson.watch6}" alt="" />`
                    ]
                },
                {
                    title: '4、watch 清除无效的异步任务',
                    info: [
                        '应用场景1：防抖 对于短时间内连续触发的事件，防抖的含义就是让某个时间期限内，事件处理函数只会执行一次',
                        '当出现以下情况时，会自动触发执行clean()函数，来清理无效的异步任务，即上次还未执行的异步任务',
                        '1.当前监视器即将重新执行时',
                        '2.监视器被停止时',
                        `<img style="width: 400px;" src="${imgJson.watch7}" alt="" />`
                    ]
                },
                {
                    title: '5、watchEffect监听数据',
                    info: [
                        '接受一个函数作为参数，并理解执行该函数，同时响应式的追踪其依赖，并在其依赖变更时重新运行该函数',
                        '<span class="colorf00">先立即执行传入的函数，当函数内依赖的数据发生变化时，会再次执行函数</span>',
                        `<img style="width: 400px;" src="${imgJson.watch5}" alt="" />`
                    ]
                },
            ])
            return {
                watchList,
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './../../../../assets/stylus/vue'
   
</style>