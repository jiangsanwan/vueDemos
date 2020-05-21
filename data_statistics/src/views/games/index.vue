<template>
    <div class="game">
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
    export default class Games extends Vue {
       private ulList: Array<any> = [
           { text: '数独', url: '/sudo' }
       ]
    }
</script>

<style lang="stylus" scoped>
    @import './../../assets/stylus/reset'
</style>