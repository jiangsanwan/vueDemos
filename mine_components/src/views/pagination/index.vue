<template>
    <section class="pagination">
        <div class="title">Pagination 分页</div>
        <div class="info">当数据量过多时，使用分页分解数据。</div>
        <div class="sub-title">基础用法</div>
        <div class="code-box">
            <div class="code-conp">
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
            </div>
            <transition name="slide-up-down">
                <div class="code-cont" v-show="showCode">
                    <pre v-highlightjs=configStr><code class="lua"></code></pre>
                </div>
            </transition>
            <code-btn @callback="callback"></code-btn>
        </div>
    </section>
</template>

<script type="text/ecmascript-6">
    import MinePagination from '@/components/mineConponents/pagination/index'
    import CodeBtn from '@/components/common/codeBtn/index'
    export default {
        name: 'Pagination',
        components: { MinePagination, CodeBtn },
        data () {
			return {
				total: 128,
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