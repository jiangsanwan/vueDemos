<template>
    <section class="pagination">
        <div class="title mb20px">Pagination 分页</div>
        <div class="info mb10px">当数据量过多时，使用分页分解数据。</div>
        <div class="info mb40px">分页组件默认采用flex布局，分成两个主题，左侧主要显示当前显示数据的开始和结束的条数，以及数据总量；右侧主要是分页的相关按钮操作，其中包括：切换页面显示条数的下拉框、上一页、页码、下一页、跳转到第几页的输入框</div>
        <p class="info mb40px">
            源码地址: <a href="https://github.com/fremember/vueDemos/blob/master/mine_components/src/components/mineConponents/pagination/index.vue" target="_blank">https://github.com/fremember/vueDemos/blob/master/mine_components/src/components/mineConponents/pagination/index.vue</a>
        </p>
        <div class="sub-title">全部用法</div>
        <div class="code-box mb40px">
            <div class="code-conp">
                <mine-pagination
                    layout="number, total, sizes, jumper"
                    prev-text="上一页"
                    next-text="下一页"
                    :total="total"
                    :pageNum="pageNum"
                    :pageSize="pageSize"
                    :pageSizes="pageSizes"
                    :pagegroup="pagegroup"
                    @pageNumChange="pageNumChange"
                    @pageSizeChange="pageSizeChange"
                >
                </mine-pagination>
            </div>
            <transition name="slide-up-down">
                <div class="code-cont" v-show="showCode">
                    <pre v-highlightjs=configStr><code class="lua"></code></pre>
                </div>
            </transition>
            <code-btn @callback="callback"></code-btn>
        </div>
        <div class="sub-title">参数说明</div>
        <div>
            layout: total, sizes, prev, next, jumper
            <mine-table :data="tableData"></mine-table>
        </div>
    </section>
</template>

<script type="text/ecmascript-6">
    import MinePagination from '@/components/mineComponents/pagination/index'
    import MineTable from '@/components/mineComponents/table/index'
    import CodeBtn from '@/components/common/codeBtn/index'
    export default {
        name: 'Pagination',
        components: { MinePagination, CodeBtn, MineTable },
        data () {
			return {
				total: 128,// 
				pageNum: 1,
				pageSize: 10,
				pageSizes: [10, 20, 50, 100],
                pagegroup: 5,
                showCode: false,
                configStr: `
<template>
    <mine-pagination
        :total="total"
        :pageNum="pageNum"
        :pageSize="pageSize"
        :pageSizes="pageSizes"
        :pagegroup="pagegroup"
        @pageNumChange="pageNumChange"
        @pageSizeChange="pageSizeChange"
    >
    </mine-pagination>
</template>
<script type="text/ecmascript-6">
    import MinePagination from '@/components/mineConponents/pagination/index'
    export default {
        name: 'Pagination',
        data () {
            return {
                total: 128,
                pageNum: 1,
                pageSize: 10,
                pageSizes: [10, 20, 50, 100],
                pagegroup: 5
            }
        }
    }
<\/script>
                `,
                tableData: [
                    { key: 'layout', describe: '控制分页布局的展示', type: 'String', defaultValue: 'number, total, sizes, prev, next, jumper' },
                    { key: 'prev-text', describe: '替代图标显示的上一页文字	', type: 'String', defaultValue: '-' },
                    { key: 'next-text', describe: '替代图标显示的上一页文字	', type: 'String', defaultValue: '-' }
                ]
            }
		},
		methods: {
			pageNumChange (val) {
				this.pageNum = val;
			},
			pageSizeChange (val) {
				this.pageSize = val;
			},
            callback (bol) {
                this.showCode = bol
            }
        }
    }
</script>

<style lang="stylus">
</style>