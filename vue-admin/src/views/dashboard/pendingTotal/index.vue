<template>
    <ul class="flex ai-c pending-total">
        <li v-for="(item, index) in dataSource" :key="index">
            <router-link class="flex ai-c" :to="item.url">
                <lay-icon :componentName="item.componentName" />
                <div class="outer-wrapper">
                    <p class="flex ai-e number">
                        <span class="big">{{ item.number }}</span>
                        <span class="small">{{ item.unit }}</span>
                    </p>
                    <p class="text">{{ item.text }}</p>
                </div>
            </router-link>
        </li>
    </ul>
</template>
<script type="text/ecmascript-6">
    import LayIcon from '@/components/layIcon/index'
    import { ref, onMounted } from 'vue'
    export default {
        name: 'PendingTotal',
        components: { LayIcon },
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
                dataSource = getProps(props.data);
            onMounted(() => {
                console.log(dataSource.value)
            })
            return {
                dataSource
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './../../../assets/stylus/reset'
    .pending-total {
        flex-wrap: wrap
        margin-bottom(0)
        li {
            padding-all(10px)
            width(calc(25% - 8px))
            height(86px)
            border-radius(2px)
            cursor(pointer)
            a {
                width(100%)
                height(100%)
                .outer-wrapper {
                    padding-left(20px)
                    font-color(#fff)
                    p {
                        margin-bottom(0)
                        &.number {
                            margin-bottom(10px)
                            span {
                                &.big {
                                    height(28px)
                                    line-height(28px)
                                    font-size(28px)
                                }
                                &.small {
                                    margin-left(5px)
                                    font-size(12px)
                                }
                            }
                        }
                        &.text {
                            font-size(12px)
                        }
                    }
                }
            }
            &:hover {
                box-shadow: 0px 0 2px 0px rgba(0, 0, 0, .5);
            }
            &:nth-of-type(1),
            &:nth-of-type(2),
            &:nth-of-type(3),
            &:nth-of-type(4) {
                margin-bottom(10px)
                &:nth-of-type(1) {
                    background: #578ebe;
                }
                &:nth-of-type(2) {
                    background: #e35b5a;
                }
                &:nth-of-type(3) {
                    background: #44b6ae;
                }
                &:nth-of-type(4) {
                    background: #8775a7;
                }
                &:not(:nth-of-type(4)) {
                    margin-right(10px)
                }
            }
            &:nth-of-type(5),
            &:nth-of-type(6),
            &:nth-of-type(7),
            &:nth-of-type(8) {
                &:nth-of-type(5) {
                    background: #4f5c65;
                }
                &:nth-of-type(6) {
                    background:#14aae4;
                }
                &:nth-of-type(7) {
                    background: #949FB1;
                }
                &:nth-of-type(8) {
                    background: #f29503;
                }
                &:not(:nth-of-type(8)) {
                    margin-right(10px)
                }
            }
        }
    }
</style>