<template>
    <div class="move-to-top-wrapper b-i-moreinfo">
        <div class="title">
            <i class="iconfont icon-cross" @click="$emit('callback')"></i>
        </div>
        <ul>
            <li>
                <div class="k">企业法人</div>
                <div class="v">{{ detailObj.businessInformation.legalRepresentative }}</div>
            </li>
            <li>
                <div class="k">注册资本</div>
                <div class="v">{{ detailObj.businessInformation.registeredCapital }}</div>
            </li>
            <li>
                <div class="k">成立时间</div>
                <div class="v">{{ detailObj.businessInformation.createTime }}</div>
            </li>
            <li>
                <div class="k">经营状态</div>
                <div class="v">{{ detailObj.businessInformation.businessStatus }}</div>
            </li>
            <li>
                <div class="k">注册地址</div>
                <div class="v">{{ detailObj.businessInformation.registeredAddress }}</div>
            </li>
            <li>
                <div class="k">统一信用代码</div>
                <div class="v">{{ detailObj.businessInformation.creditCode }}</div>
            </li>
            <li>
                <div class="k">经营范围</div>
                <div class="v">{{ detailObj.businessInformation.businessScope }}</div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'BiMoreinfo',
    props: {
        detailObj: {
            default: {},
            required: true,
            type: Object
        }
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './../../../../../assets/stylus/reset'
    @import './../../../../../assets/stylus/common_move_to_top'
    .b-i-moreinfo {
        ul {
            padding-top(.3rem)
            li {
                height(.26rem)
                display(flex)
                align-items(center)
                div {
                    font-size(.12rem)
                    &.k {
                        width(.9rem)
                    }
                    &.k {
                        flex(1)
                    }
                }
            }
        }
    }
</style>