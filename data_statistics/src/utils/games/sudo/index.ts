import Sudoku from './core/sudoku'
import Checker from './core/checker'
/**
 * 面向页面的数独类
 */
export class Grid {
    public pazzleMatrix: Array<any> = []// 暴露给页面使用的数独数组
    public stepArr: Array<any> = []// 用于记录数独的每一步操作
    private v: number// 生成数组时，填入数组元素中的初始值
    private len: number// 生成数组的长度
    private level: number// 数独的等级
    constructor (v: number = 0, len: number = 9, level: number = 5) {
        this.v = v
        this.len = len
        this.level = level
    }
    /**
     * classType标识是否可以点击，以及类型
     * 0表示可以点击，且没有输入
     * 1表示不可以点击，有默认值
     * 2表示可以点击，且验证失败错误
     * 3表示可以标识
     */
    private formatPazzleMatrix (array: number[][]): Array<any> {
        let _array: Array<any> = []
        array.map((val, itm) => {
            _array[itm] = []
            val.map((v, i) => {
                let temp:any = {}
                temp.value = v
                temp.classType = v === 0 ? 0 : 1
                _array[itm][i] = temp
            })
        })
        return _array
    }
    build (): void {// 新建数独数组的具体方法
        let sudoku = new Sudoku(this.v, this.len)
        sudoku.make(this.level)// 根据等级设置数组
        // this.pazzleMatrix = sudoku.pazzleMatrix // 获取根据等级设置后的数组
        this.pazzleMatrix = this.formatPazzleMatrix(sudoku.pazzleMatrix)// 获取根据等级设置后的数组
    }
    setItem (rowIndex: number, colIndex: number, value: number): void {
        this.pazzleMatrix[rowIndex][colIndex]['value'] = value
    }
    check (): boolean {// 校验数独面板
        let _data: number[][] = []
        // 为Checker重构数组
        this.pazzleMatrix.map((val, rowIndex) => {
            _data[rowIndex] = []
            val.map((v: any, colIndex: number) => {
                _data[rowIndex][colIndex] = v.value
            })
        })
        let checker = new Checker(this.len, _data)
        // 检查成功，直接返回true
		if(checker.check()) {
			return true
        }
        // 检查不成功，进行标记
        let marks = checker.matrixMarks
        this.pazzleMatrix.forEach((val, rowIndex) => {
            val.forEach((v: any, colIndex: number) => {
                if(!marks[rowIndex][colIndex]) {
                    this.pazzleMatrix[rowIndex][colIndex].classType = 2
                }
            })
        })
        return false
    }
    notify (rowIndex: number, colIndex: number): void {// 添加数独元素的标识
        this.pazzleMatrix[rowIndex][colIndex]['classType'] = 3
        this.saveStep(rowIndex, colIndex, 0, 3)
    }
    clearNotify (): void {// 清除标记
        this.pazzleMatrix.forEach((val, rowIndex) => {
            val.forEach((v: any, colIndex: number) => {
                if(this.pazzleMatrix[rowIndex][colIndex].classType != 1) {
                    this.pazzleMatrix[rowIndex][colIndex].classType = 0
                }
            })
        })
    }
    reset (): void {
        this.pazzleMatrix.forEach((val, rowIndex) => {
            val.forEach((v: any, colIndex: number) => {
                if(this.pazzleMatrix[rowIndex][colIndex].classType != 1) {
                    this.pazzleMatrix[rowIndex][colIndex].classType = 0
                    this.setItem(rowIndex, colIndex, 0)
                    // this.pazzleMatrix[rowIndex][colIndex].value = 0
                }
            })
        })
    }
    /**
     * 存储用户操作
     * @param rowIndex 操作元素的行
     * @param colIndex 操作元素的列
     * @param value 操作元素的值
     * @param classType 操作元素的类型
     * @return null
     */
    saveStep (rowIndex: number, colIndex: number, value: number = 0, classType: number = 0) {
        let _temp:any = {}
        _temp.rowIndex = rowIndex
        _temp.colIndex = colIndex
        _temp.value = value
        _temp.classType = classType
        this.stepArr.push(_temp)
    }
    prevStep (): void {
        let _index = this.stepArr.length > 0 ? this.stepArr.length - 1 : -1,
            _rowIndex = -1,
            _colIndex = -1;
        if(_index !== -1) {
            _rowIndex = this.stepArr[_index].rowIndex
            _colIndex = this.stepArr[_index].colIndex
        }
        if(_rowIndex !== -1 && _rowIndex !== -1) {
            this.setItem(_rowIndex, _colIndex, 0)
            this.pazzleMatrix[_rowIndex][_colIndex]['classType'] = 0
            this.stepArr.pop()
        }
    }
}

export default Grid