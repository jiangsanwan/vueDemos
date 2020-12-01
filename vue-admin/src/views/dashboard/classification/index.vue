<template>
	<div class="classification" :ref="echarBarWrapper"></div>
</template>

<script type="text/ecmascript-6">
    import { ref, onMounted } from 'vue'
    let echarts = require('echarts')
	export default {
        name: 'Classification',
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
                echarBarDom = ref(null),
                echarBarWrapper = el => {
                    echarBarDom.value = el
                },
                initEchartBar = () => {
                    let echarBar = echarts.init(echarBarDom.value)
                    echarBar.setOption({
                        tooltip: {
                            trigger: 'axis',
                        },
                        xAxis: {
                            type: 'category',
                            data: ['用户审核', '聊天信息', '技术交流', '期待新内容', '可视化使用', '技术栈使用', '动画扩展', '期待新内容', '可视化使用', '技术栈使用', '动画扩展']
                        },
                        yAxis: {
                            type: 'value'
                        },
                        grid: {
                            x: '30px',
                            y: '10px',
                            width: '98%',
                            height: '75%'
                        },
                        series: [{
                            data: seriesData.value,
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    color: (params) => {
                                        var colorList = [
                                            '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B',
                                            '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD',
                                            '#D7504B'
                                        ];
                                        return colorList[params.dataIndex]
                                    }
                                }
                            }
                        }]
                    })
                };
            onMounted(() => {
                initEchartBar()
            })
			return {
				echarBarWrapper
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	@import './../../../assets/stylus/reset'
	.classification {
        width(100%)
        height(158px)
    }
</style>