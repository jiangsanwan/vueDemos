<template>
    <section class="dashboard">
       <a-alert :message="alertMsg" show-icon type="success">
            <template v-slot:description>
                <p class="alert-info mb4px">
                    该项目全面拥抱<router-link to="/learn/vue">vue3.0</router-link>技术栈，
                    状态管理器使用的是<router-link to="/learn/vuex">4.0.0-alpha.1</router-link>版本，
                    路由管理器使用的是<router-link to="/learn/router">4.0.0-alpha.6</router-link>版本，
                    点击相应版本可跳转至学习页面。
                </p>
                <p class="alert-info"><span class="color87000c">注意</span>：目前项目中在左侧导航栏初始化的时候会报几个warn，但这并不会影响路由、布局以及页面功能，故而可以不用关心。</p>
            </template>
        </a-alert>
        <a-card class="mt20px">
            <a-row :gutter="10">
                <a-col :span="18">
                    <pending-total :data="pendingTotalLists" />
                </a-col>
                <a-col :span="6" class="mine-card-has-icon">
                    <a-card title="反馈满意程度">
                        <lay-icon class="mine-card-head-icon" :componentName="componentNames[0]" />
                        <feedback :data="feedbackList" />
                    </a-card>
                </a-col>
            </a-row>
        </a-card>
        <a-card class="mt20px">
            <a-row :gutter="10">
                <a-col :span="18" class="mine-card-has-icon">
                    <a-card title="待处理信息分类统计">
                        <lay-icon class="mine-card-head-icon" :componentName="componentNames[1]" />
                        <classification :data="classificationList" />
                    </a-card>
                </a-col>
                <a-col :span="6" class="mine-card-has-icon">
                    <a-card title="待处理信息组成">
                        <lay-icon class="mine-card-head-icon" :componentName="componentNames[2]" />
                        <compose :data="composeList" />
                    </a-card>
                </a-col>
            </a-row>
        </a-card>
        <a-card class="mt20px no-pad-ant-card-body">
            <a-row :gutter="10">
                <a-col :span="8" class="mine-card-has-icon" v-for="(item, index) in noticeTitles" :key="index">
                    <notice :item="item" />
                </a-col>
            </a-row>
        </a-card>
    </section>
</template>
<script type="text/ecmascript-6">
    import PendingTotal from './pendingTotal/index'
    import LayIcon from '@/components/layIcon/index'
    import Feedback from './feedback/index'
    import Classification from './classification/index'
    import Compose from './compose/index'
    import Notice from './notice/index'
    import { ref, onMounted } from 'vue'
    import { formatDate } from '@/utils/common'
    export default {
        name: 'Dashboard',
        components: { PendingTotal, LayIcon, Feedback, Classification, Compose, Notice },
        setup () {
            let alertMsg = ref(''),
                timer = ref(null),
                pendingTotalLists = ref([
                    { text: '待审核用户', number: 12, unit: '位', componentName: 'UserSwitchOutlined', url: '' },
                    { text: '待复审核', number: 110, unit: '条', componentName: 'SolutionOutlined', url: '' },
                    { text: '用户反馈', number: 10, unit: '条', componentName: 'FormOutlined', url: '' },
                    { text: '待处理信息', number: 12, unit: '条', componentName: 'MessageOutlined', url: '' },
                    { text: '新增内容', number: 110, unit: '项', componentName: 'PlusCircleOutlined', url: '' },
                    { text: '待编辑项', number: 10, unit: '条', componentName: 'EditOutlined', url: '' },
                    { text: '问卷调查', number: 12, unit: '项', componentName: 'ExceptionOutlined', url: '' },
                    { text: '未来预增加项', number: 110, unit: '项', componentName: 'ClockCircleOutlined', url: '' }
                ]),
                feedbackList = ref([10, 200, 35, 50, 90]),
                classificationList = ref([10, 100, 135, 50, 190, 80, 200, 35, 50, 90, 3]),
                composeList = ref([80, 30, 120, 200]),
                componentNames = ref(['AreaChartOutlined', 'BarChartOutlined', 'PieChartOutlined']),
                noticeTitles = ref([
                    { title: '最新教程', componentName: 'SendOutlined', moreUrl: '', lists: [
                        { label: 'aaaaa', id: 'dsa', date: '2020-10-12' },
                        { label: 'sssss', id: 'ewq', date: '2020-10-14' },
                        { label: 'ddddd', id: 'hgf', date: '2020-10-18' },
                        { label: 'fffff', id: 'cxz', date: '2020-10-28' },
                        { label: 'ggggg', id: 'iop', date: '2020-10-31' }
                    ] },
                    { title: '最新文章', componentName: 'ProfileOutlined', moreUrl: '', lists: [
                        { label: 'qqqqq', id: 'dsa', date: '2020-10-12' },
                        { label: 'wwwww', id: 'ewq', date: '2020-10-14' },
                        { label: 'eeeee', id: 'hgf', date: '2020-10-18' },
                        { label: 'rrrrr', id: 'cxz', date: '2020-10-28' },
                        { label: 'ttttt', id: 'iop', date: '2020-10-31' }
                    ] },
                    { title: '日志', componentName: 'PaperClipOutlined', moreUrl: '', lists: [
                        { label: 'zzzzz', id: 'dsa', date: '2020-10-12' },
                        { label: 'xxxxx', id: 'ewq', date: '2020-10-14' },
                        { label: 'ccccc', id: 'hgf', date: '2020-10-18' },
                        { label: 'vvvvv', id: 'cxz', date: '2020-10-28' },
                        { label: 'bbbbb', id: 'iop', date: '2020-10-31' }
                    ] }
                ]),
                initAlertMsg = () => {
                    alertMsg.value = `当前时间为 ${formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss week')}`
                };
            onMounted(() => {
                initAlertMsg()
                if(!timer.value) {
                    timer.value = setInterval(initAlertMsg, 1000);
                }
            })
            return {
                alertMsg,
                pendingTotalLists,
                feedbackList,
                classificationList,
                componentNames,
                noticeTitles,
                composeList
            }
        }
    }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
	@import './../../assets/stylus/reset'
    .dashboard {
        .alert-info {
            margin-bottom(0)
        }
    }
</style>