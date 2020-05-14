<template>
    <div class="move-to-top-wrapper employee-welfare" @click="$emit('callback')">
        <div class="title">
            <i class="iconfont icon-cross" @click="$emit('callback')"></i>
        </div>
        <div class="outer-title">工作时间与福利待遇</div>
        <div class="info">福利信息由公司提供，可能根据实际岗位有所不同，具体岗位可与BOSS或HR确认</div>
        <div class="thin-width"></div>
        <div class="ew-title">工作时间</div>
        <ul class="flex work-time">
            <li class="flex work-start-end">
                <i class="iconfont icon-time"></i>
                上午{{ detailObj.employeeWelfare.workStart }} - 下午{{ detailObj.employeeWelfare.workEnd }}
            </li>
            <li class="flex weekend">
                <i class="iconfont icon-daily"></i>
                {{ detailObj.employeeWelfare.weekend | weekendFilter }}
            </li>
            <li class="flex overtime">
                <i class="iconfont icon-company"></i>
                {{ detailObj.employeeWelfare.overtime | overtimeFilter }}
            </li>
        </ul>
        <div class="thin-width"></div>
        <div class="ew-title">员工福利</div>
        <ul class="welfare-wrapper">
            <li class="flex" v-for="(item, index) in welfareList" :key="index">
                <i class="iconfont" :class="item.icon"></i>
                <div class="flex_1 welfare-inner">
                    <p class="wel-title">{{ item.title }}</p>
                    <p class="wel-info">{{ item.content }}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'EmployeeWelfare',
    props: {
        detailObj: {
            default: {},
            required: true,
            type: Object
        },
        welfareList: {
            default: [],
            required: true,
            type: Array
        }
    },
    data () {
        return {
        }
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './../../../../../assets/stylus/reset'
    @import './../../../../../assets/stylus/common_move_to_top'
    .employee-welfare {
        .title {
            margin-bottom(.16rem)
            .iconfont {
                font-size(.16rem)
            }
        }
        .outer-title {
            margin-bottom(.14rem)
            font-size(.18rem)
            font-color(#333)
            font-weight(550)
        }
        .info {
            margin-bottom(.2rem)
            line-height(.2rem)
            font-size(.12rem)
            font-color(#666)
        }
        .ew-title {
            margin-top(.2rem)
            font-size(.16rem)
            font-color(#333)
            font-weight(550)
        }
        .work-time {
            padding-t-b(.18rem)
            align-items(center)
            li {
                align-items(center)
                font-size(.12rem)
                &.weekend {
                    padding-l-r(.12rem)
                }
            }
		}
        .welfare-wrapper {
            padding-top(.2rem)
            li {
                align-items(flex-start)
                .iconfont {
                    margin-right(.1rem)
                    font-size(.5rem)
                    font-color(#333)
                }
                .welfare-inner {
                    .wel-title {
                        margin-bottom(.1rem)
                        font-size(.14rem)
                        font-color(#333)
                        font-weight(550)
                    }
                    .wel-info {
                        line-height(.18rem)
                        font-size(.12rem)
                        font-color(#666)
                    }
                }
                &:not(:last-child) {
                    margin-bottom(.2rem)
                }
            }
        }
    }
</style>