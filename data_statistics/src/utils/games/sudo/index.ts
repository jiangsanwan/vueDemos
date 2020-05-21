import Sudoku from './core/sudoku'
/**
 * 面向页面的数独类
 */
export class Grid {
    public pazzleMatrix?: Array<any>// 暴露给页面使用的数独数组
    private v: number// 生成数组时，填入数组元素中的初始值
    private len: number// 生成数组的长度
    private level: number// 数独的等级
    constructor (v: number = 0, len: number = 9, level: number = 5) {
        this.v = v
        this.len = len
        this.level = level
    }
    build () {// 新建数独数组的具体方法
        let sudoku = new Sudoku(this.v, this.len)
        sudoku.make(this.level)// 根据等级设置数组
        this.pazzleMatrix = sudoku.pazzleMatrix// 获取根据等级设置后的数组
    }
}

export default Grid