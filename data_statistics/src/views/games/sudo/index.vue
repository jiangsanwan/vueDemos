<template>
    <div class="sudo">
        <div class="content">
            <div class="select-level">
                选择数独难度等级：
                <el-select v-model="levelNumber" placeholder="请选择难度等级" @change="levelChange">
                    <el-option v-for="item in levelList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </div>
            <ul class="pazzle-matrix pos-r">
                <li class="flex sudo-wrapper" v-for="(item, index) in pazzleMatrix" :key="index">
                    <div class="w-h-40px" :class="{'fixed': itm.classType == 1, 'empty': itm.classType == 0, 'error': itm.classType == 2, 'notify': itm.classType == 3}" v-for="(itm, idx) in item" :key="idx" @click="itemClickEvent($event, itm, index, idx)">
                        {{ itm.value === 0 ? '' : itm.value }}
                    </div>
                </li>
                <li class="flex pos-a popup-wrapper" :style="{'top': posTop + 'px', 'left': posLeft + 'px'}" v-if="showPopup">
                    <div class="w-h-40px" v-for="item in 9" :key="item" @click="setItem(item)">{{ item }}</div>
                </li>
            </ul>
            <ul class="flex operate-btns">
                <li class="flex_1 tac" v-for="item in operateBtnList" :key="item.value" @click="operateEvent(item.value)">{{ item.text }}</li>
            </ul>
            <div class="notice-info">
                <p class="ni-title">按钮操作解释：</p>
                <p class="ni-item" v-for="item in operateBtnList" :key="item.value">{{ item.value }}、{{ item.info }}</p>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
    import Grid from './../../../utils/games/sudo/index'

    const gamesModule = namespace('games')
    @Component
    export default class Sudo extends Vue {
        @gamesModule.State(state => state.level_number) level_number?: string

        private grid: any = null// 数独对象
        private pazzleMatrix: Array<any> = []// 生成的数独二维数组
        private showPopup: Boolean = false// 标识是否显示数字小面板
        private posTop: Number = 0// 数字小面板的定位之top
        private posLeft: Number = 0// 数字小面板的定位之left
        private rowIndex: Number = 0// 点击元素所在的行
        private colIndex: Number = 0// 点击元素所在的列
        private levelNumber: any = '3'// 数独等级
        // 修改数据初始化的位置，添加state，然后再main.ts文件中初始化localStorage
        private levelList: Array<any> = [// 数独等级数组
            { value: '3', label: '简单' },
            { value: '4', label: '容易' },
            { value: '5', label: '中等' },
            { value: '6', label: '困难' },
            { value: '7', label: '专家' }
        ]
        private operateBtnList: Array<any> = [// 操作按钮的数组，以及每个按钮的相关解释
            { value: 1, text: '标记', info: '标记当前待输入项' },
            { value: 2, text: '检查', info: '调用检查的方法，校验全局输入，该操作不会被记录' },
            { value: 3, text: '重置', info: '将填入的所有数据置空，如果有颜色标记也清除' },
            { value: 4, text: '清理', info: '单纯的清除颜色标记' },
            { value: 5, text: '撤回', info: '撤销上一步填入的数据或做的颜色标记' },
            { value: 6, text: '重建', info: '重新初始化整个数据盘' }
        ]
        mounted (): void {
            this.levelNumber = this.level_number
            this.initGrid(this.levelNumber)
        }
        private emitgrid (): void {// 根据初始化的数独面板生成可使用的数独
            this.grid.build()
            this.pazzleMatrix = this.grid.pazzleMatrix
        }
        private initGrid (level: number): void {// 初始化数独面板
            this.grid = new Grid(0, 9, level)
            this.emitgrid()
        }
        private levelChange (): void {// 每次切换数独难度等级后，重新初始化数独对象
            localStorage.setItem('fremember_dataStatistics_sudo_level', this.levelNumber)
            this.initGrid(this.levelNumber)
        }
        /**
         * 点击数独中可点击区域，显示弹窗
         * 根据index(行)，idx(列)来判断弹窗的方位，右下、左下、右上、左上
         * 根据target.offsetTop、target.offsetLeft来设置top、left对应的值
         * @params e 点击事件所对应的信息，用于获取点击的元素
         * @params itm 点击的元素对应的二维数组的元素
         * @params index 行序号
         * @params idx 列序号
         * @return 无返回
         */
        private itemClickEvent (e: any, itm: any, index: number, idx: number): void {// 点击数独面板中的每个元素的逻辑
            /**
             * classType标识是否可以点击，以及类型
             * 0表示可以点击，且没有输入
             * 1表示不可以点击，有默认值
             * 2表示可以点击，且验证失败错误
             */
            if(itm.classType !== 1) {
                let target: any = e.target
                this.showPopup = true
                this.rowIndex = index
                this.colIndex = idx
                if(index < 6) {
                    if(index == 2 || index == 5) {
                        this.posTop = target.offsetHeight + target.offsetTop - 2
                    } else {
                        this.posTop = target.offsetHeight + target.offsetTop
                    }
                } else {
                    if(index == 6) {
                        this.posTop = target.offsetTop - 126
                    } else if(index == 7) {
                        this.posTop = target.offsetTop - 125
                    } else {
                        this.posTop = target.offsetTop - 124
                    }
                }
                if(idx < 6) {
                    if(idx == 2 || idx == 5) {
                        this.posLeft = target.offsetWidth + target.offsetLeft - 2
                    } else {
                        this.posLeft = target.offsetWidth + target.offsetLeft
                    }
                } else {
                    if(idx == 6) {
                        this.posLeft = target.offsetLeft - 126
                    } else if(idx == 7) {
                        this.posLeft = target.offsetLeft - 125
                    } else {
                        this.posLeft = target.offsetLeft - 124
                    }
                }
            } else {
                this.showPopup = false
            }
        }
        private setItem (item: any): void {// 设置数独面板中的被点击元素
            this.pazzleMatrix.forEach((val: Array<any>, idx: number): void => {
                if(idx === this.rowIndex) {
                    val.forEach((v: Array<any>, i: number): void => {
                        if(i === this.colIndex) {
                            this.pazzleMatrix[idx][i]['value'] = item
                            this.grid.saveStep(idx, i, item, 0)
                        }
                    })
                }
            })
            this.showPopup = false
        }
        private operateEvent (value: number): void {// 操作按钮逻辑
            switch (value) {
                case 1:// 标记，主要是修改背景色
                    if(this.showPopup) {
                        this.grid.notify(this.rowIndex, this.colIndex)
                    }
                    break
                case 2:// 全局检查用户输入内容是否合法
                    this.grid.check()// 验证输入
                    break
                case 3:// 将填入的所有数据置空，如果有颜色标记也清除
                    this.grid.reset()
                    break
                case 4:// 单纯的清除颜色标记
                    this.grid.clearNotify()
                    break
                case 5:// 撤销上一步填入的数据或做的颜色标记
                    this.grid.prevStep()
                    break
                case 6:// 重新初始化整个数据盘
                    this.initGrid(this.levelNumber)
                    break
            }
            this.showPopup = false
        }
        private storageGrid () {
            localStorage.setItem('fremember_dataStatistics_sudo_grid', JSON.stringify(this.pazzleMatrix))
        }
    }
</script>
<style lang="stylus" scoped>
    @import './../../../assets/stylus/reset'
    .w-h-40px {
        width(40px)
        height(40px)
        text-align(center)
        line-height(40px)
        font-color(#000)
    }
    .sudo {
        .content {
            margin-auto(0)
            width(374px)
            .select-level {
                margin-bottom(20px)
            }
            .pazzle-matrix {
                margin-bottom(100px)
                // height(calc(100vh - 200px))
                .sudo-wrapper {
                    div {
                        cursor(pointer)
                        border: 1px dashed #ccc
                        &.fixed {
                            cursor(auto)
                            background(#eee)
                        }
                        &.empty {
                            background(#fff)
                        }
                        &.error {
                            background(lightpink)
                        }
                        &.notify {
                            background(#67c23a)
                        }
                        &:not(:last-child) {
                            border-right: none
                        }
                        &:first-child {
                            border-left: 2px solid #ccc
                        }
                        &:nth-of-type(3),
                        &:nth-of-type(6),
                        &:last-child {
                            border-right: 2px solid #ccc
                        }
                        &:nth-of-type(4),
                        &:nth-of-type(7) {
                            border-left: none
                        }
                    }
                    &:first-child {
                        div {
                            border-top: 2px solid #ccc
                        }
                    }
                    &:not(:last-child) {
                        div {
                            border-bottom: none
                        }
                    }
                    &:nth-of-type(3),
                    &:nth-of-type(6),
                    &:nth-of-type(9) {
                        div {
                            border-bottom: 2px solid #ccc
                        }
                    }
                    &:nth-of-type(4),
                    &:nth-of-type(7) {
                        div {
                            border-top: none
                        }
                    }
                }
                .popup-wrapper {
                    flex-wrap: wrap
                    width(126px)
                    height(126px)
                    div {
                        background(#fff)
                        border: 1px dashed #ccc
                        &:nth-of-type(1),
                        &:nth-of-type(2),
                        &:nth-of-type(3) {
                            border-top: 2px solid #ccc
                        }
                        &:nth-of-type(3),
                        &:nth-of-type(6),
                        &:nth-of-type(9) {
                            border-right: 2px solid #ccc
                        }
                        &:nth-of-type(7),
                        &:nth-of-type(8),
                        &:nth-of-type(9) {
                            border-bottom: 2px solid #ccc
                        }
                        &:nth-of-type(1),
                        &:nth-of-type(4),
                        &:nth-of-type(7) {
                            border-left: 2px solid #ccc
                        }
                        &:nth-of-type(1),
                        &:nth-of-type(2),
                        &:nth-of-type(4),
                        &:nth-of-type(5) {
                            border-right: none
                            border-bottom: none
                        }
                        &:nth-of-type(3),
                        &:nth-of-type(6) {
                            border-bottom: none
                        }
                        &:nth-of-type(7),
                        &:nth-of-type(8) {
                            border-right: none
                        }
                    }
                }
            }
            .operate-btns {
                align-items(center)
                margin-bottom(40px)
                width(374px)
                li {
                    padding-t-b(8px)
                    background(rgb(242, 246, 252))
                    font-color(#303133)
                    cursor(pointer)
                    border: 1px solid #ccc
                    border-top-width: 2px
                    border-bottom-width: 2px
                    &:hover {
                        font-color(#409eff)
                    }
                    &:not(:last-child) {
                        border-right-style: dashed
                    }
                    &:not(:first-child) {
                        border-left: none
                    }
                    &:first-child {
                        border-left-width: 2px
                    }
                    &:last-child {
                        border-right-width: 2px
                    }
                }
            }
            .notice-info {
                .ni-title {
                    margin-bottom(20px)
                    font-size(16px)
                    font-weight(550)
                }
                .ni-item {
                    font-size(14px)
                    text-indent: 24px
                    &:not(:last-child) {
                        margin-bottom(10px)
                    }
                }
            }
        }
    }
</style>