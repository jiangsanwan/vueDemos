<template>
    <div class="echarts-has-triangle feedback" :ref="echarLineWrapper"></div>
</template>

<script type="text/ecmascript-6">
    import { ref, onMounted } from 'vue'
    let echarts = require('echarts')
    export default {
        name: 'Feedback',
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
                echarLineDom = ref(null),
                echarLineWrapper = el => {
                    echarLineDom.value = el
                },
                initEchartLine = () => {
                    let echarLine = echarts.init(echarLineDom.value)
                    echarLine.setOption({
                        tooltip: {
                            trigger: 'item',
                            backgroundColor: 'rgba(0, 0, 0, .7)',
                            padding: [5, 20],
                            position: 'top'
                        },
                        xAxis: {
                            type: 'category',
                            boundaryGap: false,
                            data: [ '满意', '一般', '不满意', '有待改善', '其它' ]
                        },
                        yAxis: {
                            type: 'value',
                            scale : true,
                            max : 200,
                            min: 0,
                            splitNumber : 5,
                        },
                        grid: {
                            x: '30px',
                            y: '10px',
                            width: '87%',
                            height: '70%'
                        },
                        series: [{
                            data: seriesData.value,
                            type: 'line',
                            areaStyle: {
                                normal: {
                                    color: 'rgba(220, 220, 220, 0.2)' // 改变区域颜色
                                }
                            },
                            itemStyle : { 
                                normal: { 
                                    color: 'rgba(220, 220, 220, 1)',// 改变折线点的颜色
                                    lineStyle: {
                                        color:'rgba(220,220,220, 1)' // 改变折线颜色
                                    } 
                                }
                            }
                        }]
                    })
                };
            onMounted(() => {
                initEchartLine()
            })
            return {
                echarLineWrapper
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './../../../assets/stylus/reset'
	.feedback {
        width(100%)
        height(118px)
    }
</style>