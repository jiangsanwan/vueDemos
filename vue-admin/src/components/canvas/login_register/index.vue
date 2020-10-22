<template>
    <section class="login-register-canvas" :ref="canvasWrapper"></section>
</template>
<script type="text/ecmascript-6">
    import { ref, onMounted, nextTick } from 'vue'
    import { mineCanvas } from './canvas'
    export default {
        name: 'LoginRegister',
        setup () {
            let canvasWrapper = el => {
                    canvasDom.value = el
                },
                canvasDom = ref(null),
                initCanvas = () => {
                    nextTick(() => {// 执行画图方法
                        mineCanvas({
                            el: canvasDom.value,
                            dotsNumber: 100,
                            lineMaxLength: 300,
                            dotsAlpha: .5,
                            speed: 1.5,
                            clickWithDotsNumber: 5
                        })
                    })
                };
            onMounted(() => {// 执行初始化方法
                initCanvas()
                window.onresize = () => {
                    initCanvas()
                }
            })
            return {
                canvasWrapper
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './../../../assets/stylus/reset'
	.login-register-canvas {
        width(100%)
        height(100%)
        background(radial-gradient(farthest-corner at 10% 5%, #14D3D8, #0C35A6))
    }
</style>
