// 检查数独的解决方案
function checkArray(array: number[]): boolean[] {
	let length = array.length,
		marks:boolean[] = new Array(length);
	marks.fill(true)
	for(let i = 0; i <= length - 1; i++) {
		if(!marks[i]) {
			continue;
		}
		let v = array[i]
		// 是否有效，0--->无效，1-9--->有效
		if(!v) {
			marks[i] = false
			continue
		}
		// 是否有重复，i+1~9是否和i位置数据重复
		for(var j = i + 1; j < length; j++) {
			if(v === array[j]) {
				marks[i] = marks[j] = false
			}
		}
	}
	return marks
}

import Toolkit from './toolkit'

// 输入：用户完成的数独数据
// 处理：对matrix 行、列、宫进行检查，并填写marks
// 输出：检查是否成功，marks
export class Checker {
	private _len: number;
	private _matrix: number[][];
	private _matrixMarks: boolean[][];
	private _success: boolean = false;

	constructor(len: number, matrix: number[][]) {
		this._len = len
		this._matrix = matrix
		this._matrixMarks = Toolkit.matrix.makeMatrix(true, this._len)
	}
	get matrixMarks(): boolean[][] {
		return this._matrixMarks
	}
	get isSuccess(): boolean {
		return this._success
	}
	check(): boolean {
		this.checkRows()
		this.checkCols()
		this.checkBoxes()
		// 检查是否成功
		this._success = this._matrixMarks.every(row => row.every(mark => mark))
		return this._success
	}
	private checkRows() {
		for(let rowIndex = 0; rowIndex < this._len; rowIndex++) {
			let row = this._matrix[rowIndex],
				marks = checkArray(row);
			for(let colIndex = 0; colIndex < marks.length; colIndex++) {
				if(!marks[colIndex]) {
					this._matrixMarks[rowIndex][colIndex] = false
				}
			}
		}
	}
	private checkCols() {
		for(let colIndex = 0; colIndex < this._len; colIndex++) {
			let cols = []
			for(let rowIndex = 0; rowIndex < this._len; rowIndex++) {
				cols[rowIndex] = this._matrix[rowIndex][colIndex]
			}

			let marks = checkArray(cols)
			for(let rowIndex = 0; rowIndex < marks.length; rowIndex++) {
				if(!marks[rowIndex]) {
					this._matrixMarks[rowIndex][colIndex] = false
				}
			}
		}
	}
	private checkBoxes() {
		let _item: number = Math.pow(this._len, 0.5)
		for(let boxIndex = 0; boxIndex < this._len; boxIndex++) {
			let boxes = Toolkit.box.getBoxCells(this._matrix, boxIndex, _item,this._len),
				marks = checkArray(boxes);
			for(let cellIndex = 0; cellIndex < this._len; cellIndex++) {
				if(!marks[cellIndex]) {
					let {rowIndex, colIndex} = Toolkit.box.convertFromBoxIndex(boxIndex, cellIndex, _item)
					this._matrixMarks[rowIndex][colIndex] = false
				}
			}
		}
	}
}

export default Checker