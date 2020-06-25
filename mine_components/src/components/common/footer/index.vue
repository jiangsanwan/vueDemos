<template>
    <section class="common-footer">
        <div class="f-content">
            Copyright © 2020 www.fremember.com 版权所有 fremember
            <br />
            联系方式：18769567910(手机同微信)、605941383(QQ)、18769567910@163.com(163邮箱)
        </div>
    </section>
</template>

<script type="text/ecmascript-6">
    export default {
        name: 'CommonFooter'
    }
</script>

<style lang="stylus">
    .common-footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100vw;
        border-top: 1px solid #fffff0;
        .f-content {
            margin: 0 auto;
            padding: 6px 0;
            line-height: 20px;
            text-align: center;
            font-size: 12px;
        }
    }
</style>