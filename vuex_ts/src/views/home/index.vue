<template>
    <div class="home">
        <ul>
            <li v-for="(item, index) in navLists" :class="{'active': compName == item.compName}" :key="index" @click="compName = item.compName">{{ item.title }}</li>
        </ul>
        <div class="info">
            <p>公用组件里面提供的是没有命名空间时，state、getters、mutations、actions的使用</p>
            <p>state、getters、mutations、actions分组件中提供的是有命名空间时的使用</p>
        </div>
        <transition name="fade-transform" mode="out-in">
            <component :is="compName" />
        </transition>
    </div>
</template>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import CommonComp from './commonComp/index.vue'
    import StateComp from './stateComp/index.vue'
    import GetterComp from './getterComp/index.vue'
    import MutationComp from './mutationComp/index.vue'
    import ActionComp from './actionComp/index.vue'

    interface SquareConfig {
        title: string;
        compName: string;
    }

    @Component({
        name: 'Home',
        components: {
            CommonComp,
            StateComp,
            GetterComp,
            MutationComp,
            ActionComp
        }
    })
    export default class Home extends Vue {
        private navLists?: Array<SquareConfig> = [
            { title: '公用方法', compName: 'CommonComp' },
            { title: 'state', compName: 'StateComp' },
            { title: 'getter', compName: 'GetterComp' },
            { title: 'mutation', compName: 'MutationComp' },
            { title: 'action', compName: 'ActionComp' }
        ]
        private compName?: string = 'CommonComp'
    }
</script>
<style scoped lang="less">
    .fade-transform-leave-active,
    .fade-transform-enter-active {
        transition: all 0.3s;
    }
    .fade-transform-enter {
        opacity: 0;
        transform: translateX(-30px);
    }
    .fade-transform-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }
    .home {
        margin: 50px auto;
        padding: 20px;
        width: 900px;
        // height: calc(100vh - 150px);
        border-radius: 4px;
        box-shadow: 0 0 4px 0 #ccc;
        ul {
            display: flex;
            align-items: center;
            border-bottom: 1px solid #ccc;
            li {
                width: 90px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                border-radius: 4px 4px 0 0;
                cursor: pointer;
                &.active {
                    background: #0164fa;
                    color: #fff;
                }
            }
        }
        .info {
            margin-top: 20px;
            padding: 15px;
            color: rgba(0, 0, 0, 0.65);
            line-height: 1.5715;
            border-radius: 2px;
            background-color: #f6ffed;
            border: 1px solid #b7eb8f;
        }
    }
</style>