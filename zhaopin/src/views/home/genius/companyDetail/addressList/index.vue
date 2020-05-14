<template>
    <div class="move-to-top-wrapper address-list">
        <div class="title">
            <i class="iconfont icon-cross" @click="$emit('callback')"></i>
            公司地址
        </div>
        <ul class="addr-list">
            <li class="flex" v-for="(item, index) in addressList" :key="index">
                {{ item }}
                <!-- 打开百度地图的组件 -->
                <i class="iconfont icon-arrowRight"></i>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'AddressList',
    props: {
        detailObj: {
            default: {},
            required: true,
            type: Object
        }
    },
    data () {
        return {
            addressList: []
        }
    },
    mounted () {
        this.addressList = this.detailObj.businessAddress.split('###')
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './../../../../../assets/stylus/reset'
    @import './../../../../../assets/stylus/common_move_to_top'
    .address-list {
        .title {
            position(relative)
            text-align(center)
            font-size(.16rem)
            font-color(#333)
            font-weight(550)
            .iconfont {
                position(absolute)
                top(0)
                left(0)
                font-size(.16rem)
            }
        }
        .addr-list {
            margin-top(.2rem)
            li {
                align-items(center)
                justify-content(space-between)
                height(.3rem)
                font-size(.14rem)
                font-color(#999)
            }
        }
    }
</style>