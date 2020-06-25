<template>
    <section class="code-btn" @click="operateEvent">
        <span class="arraw" :class="{'arraw-active': showCode}"></span>
        <span class="text">{{ showCode ? '显示代码' : '隐藏代码' }}</span>
    </section>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'CodeBtn',
        data () {
            return {
                showCode: false
            }
        },
        methods: {
            operateEvent () {
                this.showCode = !this.showCode
                this.$emit('callback', this.showCode)
            }
        }
    }
</script>

<style lang="stylus">
    .code-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 40px;
        cursor: pointer;
        border-top: 1px solid #fffff0;
        background: rgba(245, 245, 245, .3);
        .arraw {
            border-right: 6px solid transparent;
            border-bottom: 8px solid #fffff0;
            border-left: 6px solid transparent;
            transition: all .3s;
            &.arraw-active {
                transform: rotate(180deg);
            }
        }
        .text {
            margin-left: 10px;
            font-size: 14px;
        }
        &:hover {
            .arraw {
                border-bottom-color: #7fff00;
            }
            .text {
                color: #7fff00;
            }
        }
    }
</style>