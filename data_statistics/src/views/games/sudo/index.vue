<template>
    <div class="sudo" @click="emitgrid">数独{{ msg }}</div>
</template>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import Grid from '@/utils/games/sudo/index'
    // let Grid = require('@/utils/games/sudo/index')
    @Component
    export default class Sudo extends Vue {
        private msg: String = 'msg'
        private grid: any = null
        private pazzleMatrix?: Array<any>
        mounted () {
            this.grid = new Grid(0, 9, 5)
        }
        private emitgrid () {
            this.grid.build()
            this.pazzleMatrix = this.grid.pazzleMatrix
            console.log(this.pazzleMatrix)
        }
    }
</script>
<style lang="stylus" scoped>
    @import './../../../assets/stylus/reset'
</style>