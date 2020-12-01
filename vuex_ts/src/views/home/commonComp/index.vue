<template>
    <div class="common-comp">
        <p class="title">无命名空间时state、getters、mutations、actions的使用</p>
        <div class="cont">
            <p class="sub-title">1、获取state使用 store.state</p>
            <div class="box">this.$store.state.name</div>
            <p class="sub-title">2、获取getters使用 store.getters</p>
            <div class="box">this.$store.getters.name</div>
            <p class="sub-title">3、触发commit方法使用 store.commit</p>
            <div class="box">this.$store.commit('setName', 'fremember')</div>
            <p class="sub-title">4、触发dispatch使用 store.dispatch</p>
            <div class="box">this.$store.dispatch('setName', 'fmoment')</div>
        </div>
    </div>
</template>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'

    @Component({
        name: 'CommonComp'
    })
    export default class CommonComp extends Vue {
        mounted () {
            console.log(this.$store.state.name)// pxy
            console.log(this.$store.getters.age)// 29
            console.log(this.$store)
            this.$store.commit('setName', 'fremember')
            console.log(this.$store.state.name)// fremember
            this.$store.dispatch('setName', 'fmoment')
            console.log(this.$store.state.name)// fmoment
        }
    }
</script>
<style scoped lang="less">

</style>