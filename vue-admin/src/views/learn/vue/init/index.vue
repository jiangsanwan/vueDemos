<template>
    <a-list item-layout="horizontal" :data-source="initData">
        <template #renderItem="{ item }">
            <a-list-item>
                <a-list-item-meta>
                    <template #description>
                        <p v-show="item.desc">{{ item.desc }}</p>
                        <a-card v-show="!item.desc">
                            <a-row :gutter="10">
                                <a-col :span="6" v-for="(itm, index) in item.diffImgs" :key="index">
                                    <a-card :title="itm.title" style="width: 300px">
                                        <img :src="itm.src" alt="">
                                    </a-card>
                                </a-col>
                            </a-row>
                        </a-card>
                    </template>
                    <template #title>{{ item.title }}</template>
                </a-list-item-meta>
            </a-list-item>
        </template>
    </a-list>
</template>

<script type="text/ecmascript-6">
    import { ref } from 'vue'
    import imgJson from './imgJson'
    export default {
        name: 'Init',
        setup () {
            let initData = ref([
                { title: '1、系统环境', desc: 'npm -v' },
                { title: '2、查看npm仓库', desc: 'nrm ls' },
                { title: '3、安装@vue/cli', desc: 'npm install @vue/cli -g' },
                { title: '4、创建项目', desc: 'vue create 项目名' },
                { title: '5、在项目中安装 `vue-next`插件，试用Vue3 beta', desc: 'vue add vue-next' },
                { title: '6、项目变化(图片看不清楚，可以打开源文件查看)', desc: '', diffImgs: [
                    { title: 'vue3.0配置vue-router', src: imgJson.init1 },
                    { title: 'vue3.0配置vuex', src: imgJson.init2 },
                    { title: 'vue3.0配置antd组件', src: imgJson.init3 },
                    { title: 'vue3.0配置main.js文件', src: imgJson.init4 }
                ] },
                { title: '7、启动项目', desc: 'npm run serve' },
                { title: '8、打包项目', desc: 'npm run build' }
            ])
            return {
                initData
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import './../../../../assets/stylus/vue'
        img {
            width(100%)
        }
</style>