// 生成数独解决方案
import Toolkit from './toolkit'

export class Generator {
	matrix: number[][] = [];
	orders: number[][] = [];
	private _len: number;
	private _v: number;
	constructor (v: number, len: number) {
		this._v = v
		this._len = len
	}
	generate(): void {
		while(!this.initialGenerate()) {
			console.warn("try again");
		}
	}
	initialGenerate() {
		this.matrix = Toolkit.matrix.makeMatrix(this._v, this._len)
		this.orders = Toolkit.matrix.makeMatrix(this._v, this._len)
			.map(row => row.map((v, i) => i))
			.map(row => Toolkit.matrix.shuffle(row))
		for(let n = 1; n <= this._len; n++) {
			if(!this.fillNumber(n)) {
				return false;
			}
		}
		return true
	}
	private fillNumber(n: number): boolean {
		return this.fillRow(n, 0)
	}
	private fillRow(n: number, rowIndex: number): boolean {
		if(rowIndex > this._len - 1) {
			return true
		}

		const row = this.matrix[rowIndex]
		const orders = this.orders[rowIndex]
		// 随机选择列
		for(let i = 0; i < 9; i++) {
			const colIndex = orders[i]
			// 如果这个位置已经有值，跳过
			if(row[colIndex]) {
				continue
			}
			// 检查这个位置是否可以填n
			if(!Toolkit.matrix.checkFillable(this.matrix, n, rowIndex, colIndex, this._len)) {
				continue
			}
			row[colIndex] = n
			// 当前行填写n成功，递归调用fillRow()来在下一行中填写n
			// 去下一行填写n，如果没填进去，就继续寻找当前行的下一个位置
			if(!this.fillRow(n, rowIndex + 1)) {
				row[colIndex] = 0
				continue
			}
			return true
		}
		return false
	}
}

export default Generator