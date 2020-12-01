<template>
    <a-card class="notice" :title="noticeItem.title">
        <lay-icon class="mine-card-head-icon" :componentName="noticeItem.componentName" />
        <template #extra>
            <router-link :to="`/${item.moreUrl}`">更多</router-link>
        </template>
        <div class="pos-r wrapper" :ref="ulEleDom">
            <ul class="w100 pos-a" :style="{'height': `${heightNumber}px`}">
                <li class="flex ai-c jc-s" v-for="(item, index) in noticeItem.lists" :key="index">
                    <router-link :to="`/${item.id}`" @mouseover="mouseoverEvent" @mouseout="mouseoutEvent">{{ item.label }}</router-link>
                    <span>{{ item.date }}</span>
                </li>
            </ul>
        </div>
    </a-card>
</template>

<script type="text/ecmascript-6">
    import LayIcon from '@/components/layIcon/index'
    import { ref, onMounted, onBeforeUnmount } from 'vue'
	export default {
        name: 'Notice',
        components: { LayIcon },
        props: {
            item: {
                required: true,
                type: Object
            }
        },
		setup (props) {
            let getProps = (name) => {
                    return ref(name)
                },
                noticeItem = getProps(props.item),
                ulEle = ref(null),
                ulEleDom = el => {
                    ulEle.value = el
                },
                heightNumber = ref(0),
                timer = ref(null),
                animate = () => {
                    timer.value = setInterval(() => {
                        if(ulEle.value) {
                            ulEle.value.scrollTop++
                            if(ulEle.value.scrollTop >= heightNumber.value / 2) {
                                ulEle.value.scrollTop = 0;
                            }
                        }
                    }, 80)
                },
                mouseoverEvent = () => {
                    clearInterval(timer.value)
                },
                mouseoutEvent = () => {
                    animate()
                };
            onMounted(() => {
                noticeItem.value.lists = [ ...noticeItem.value.lists, ...noticeItem.value.lists ]
                heightNumber.value = noticeItem.value.lists.length * 22
                animate()
            })
            onBeforeUnmount(() => {
                if(timer.value) {
                    clearInterval(timer.value)
                    timer.value = null
                }
            })
			return {
                noticeItem,
                heightNumber,
                ulEleDom,
                mouseoverEvent,
                mouseoutEvent
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './../../../assets/stylus/reset'
	.notice {
        .wrapper {
            height(110px)
            overflow: hidden
            ul {
                li {
                    height(22px)
                    line-height(22px)
                    border-bottom: 1px solid #f0f0f0
                    a {
                        font-color(#475059)
                        &:hover {
                            font-color(#1890ff)
                        }
                    }
                    span {
                        font-color(rgba(0, 0, 0, .45))
                    }
                }
            }
        }
    }
</style>