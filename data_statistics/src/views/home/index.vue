<template>
    <section class="home">
        home
    </section>
</template>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    @Component
    export default class Home extends Vue {
    }
</script>
<style lang="stylus" scoped>
    @import './../../assets/stylus/reset'
    .home {
        width(100%)
        height(100%)
    }
</style>