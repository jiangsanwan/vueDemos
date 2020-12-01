<template>
    <div class="compose" :ref="echarPieWrapper"></div>
</template>

<script type="text/ecmascript-6">
    import { ref, onMounted } from 'vue'
    let echarts = require('echarts')
    export default {
        name: 'Compose',
        props: {
            data: {
                required: true,
                type: Array
            }
        },
        setup (props) {
            let getProps = (name) => {
                    return ref(name)
                },
                seriesData = getProps(props.data),
                echartPieDom = ref(null),
                echarPieWrapper = (el) => {
                    echartPieDom.value = el
                },
                initEchartPie = () => {
                    let echarPie = echarts.init(echartPieDom.value)
                    echarPie.setOption({
                        tooltip: {
                            trigger: 'item',
                            formatter: '{a} <br/>{b}: {c} ({d}%)'
                        },
                        legend: {
                            orient: 'horizontal',
                            left: 10,
                            data: [ '用户审核', '聊天信息', '技术交流', '期待新内容' ]
                        },
                        series: [{
                            name: '待处理信息组成',
                            data: [
                                { value: seriesData.value[0], name: '用户审核' },
                                { value: seriesData.value[1], name: '聊天信息' },
                                { value: seriesData.value[2], name: '技术交流' },
                                { value: seriesData.value[3], name: '期待新内容' }
                            ],
                            type: 'pie',
                            center: ['60%', '58%'],
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: '14',
                                    fontWeight: 'bold'
                                }
                            },
                            labelLine: {
                                show: false
                            },
                        }]
                    })
                };
            onMounted(() => {
                initEchartPie()
            })
            return {
                echarPieWrapper
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './../../../assets/stylus/reset'
	.compose {
        width(100%)
        height(158px)
    }
</style>