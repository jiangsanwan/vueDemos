<template>
    <div class="highcharts">
        <ul>
            <li v-for="(item, index) in ulList" :key="index">
                <router-link :to="item.url">{{ item.text }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    @Component
    export default class Edits extends Vue {
       private ulList: Array<any> = [
           { text: 'highcharts柱状图', url: '/h_histogram' }
       ]
    }
</script>

<style lang="stylus" scoped>
</style>