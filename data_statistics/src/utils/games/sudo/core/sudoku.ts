// 生成数独游戏

// 1、生成完成的解决方案：Generator
// 2、随机去除部分数据：按比例

import Generator from './generator'

export class Sudoku {
	solutionMatrix: number[][] = []
	pazzleMatrix: number[][] = []
	private _len: number
	constructor(v: number, len: number) {
		this._len = len
		// 生成完成的解决方案
		let generator = new Generator(v, len)
		generator.generate()
		this.solutionMatrix = generator.matrix
	}
	// level:number表示随机从每行中去掉5个数
	make(level: number = 5): void {
		// 生成迷盘
		this.pazzleMatrix = this.solutionMatrix.map(row => {
			return row.map(cell => Math.random() * this._len < level ? 0 : cell)
		})
	}
}

export default Sudoku