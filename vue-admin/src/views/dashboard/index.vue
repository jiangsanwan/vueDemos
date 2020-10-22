<template>
    <section class="dashboard">
       <router-link to="/user/index">userIndex</router-link>
       <router-link to="/user/info">userInfo</router-link>
    </section>
</template>
<script type="text/ecmascript-6">
    export default {
        name: 'Dashboard',
        setup () {}
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import './../../assets/stylus/reset'
</style>