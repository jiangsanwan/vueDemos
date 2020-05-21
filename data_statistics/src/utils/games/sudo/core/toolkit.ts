/**
 * 宫坐标系工具
 */
export interface IBoxCoord {
	boxIndex: number;
	cellIndex: number;
}
export interface IRowColCoord {
	rowIndex: number;
	colIndex: number;
}
const boxToolkit = {
		convertToBoxIndex(rowIndex: number, colIndex: number, item: number): IBoxCoord {
			return {
				boxIndex: Math.floor(rowIndex / item) * item + Math.floor(colIndex / item),
				cellIndex: rowIndex % item * item + colIndex % item
			}
		},
		convertFromBoxIndex(boxIndex: number, cellIndex: number, item: number): IRowColCoord {
			return {
				rowIndex: Math.floor(boxIndex / item) * item + Math.floor(cellIndex / item),
				colIndex: boxIndex % item * item + cellIndex % item
			}
		},
		getBoxCells(matrix: number[][], boxIndex: number, item: number, len: number): number[] {
			const startRowIndex = Math.floor(boxIndex / item) * item;
			const startColIndex = boxIndex % item * item;
			const result = [];
			for(let cellIndex = 0; cellIndex < len; cellIndex++) {
				const rowIndex = startRowIndex + Math.floor(cellIndex / item);
				const colIndex = startColIndex + cellIndex % item;
				result.push(matrix[rowIndex][colIndex]);
			}
			return result;
		}
	}
/**
 * 矩阵和数组相关的工具
 */
class MatrixToolkit {
	/**
	* 生成一行
	 */
	static makeRow(): number[]
	static makeRow<T>(v: T, len: T): T[]
	static makeRow(v: any = 0, len: any = 9): any[] {
		return new Array(len).fill(v)
	}
	/*
	* 生成二维数组
	 */
	static makeMatrix(): number[][]
	static makeMatrix<T>(v: T, len: any): T[][]
	static makeMatrix(v:any = 0, len: any = 9): any[][] {
		return Array.from({length: len}, () => this.makeRow(v, len));
	}

	/*
	* Fisher-Yates 洗牌算法
	 */
	static shuffle<T>(array: T[]): T[] {
		let endIndex = array.length - 2
		for(let i = 0; i <= endIndex; i++) {
			let j = i + Math.floor(Math.random() * array.length - i);
			[array[i], array[j]] = [array[j], array[i]]
		}
		return array
	}
	/**
	 * 检查指定位置是否可以填写数字n
	 */
	static checkFillable(matrix: number[][], n: number, rowIndex: number, colIndex: number, len: number): boolean {
		let row = matrix[rowIndex],
			item = Math.pow(len, 0.5),
			column = this.makeRow().map((v, i) => matrix[i][colIndex]),
			{ boxIndex } = boxToolkit.convertToBoxIndex(rowIndex, colIndex, item),
			box = boxToolkit.getBoxCells(matrix, boxIndex, item, len);
		for(let i = 0; i < len; i++) {
			if(row[i] === n || column[i] === n || box[i] === n) {
				return false
			}
		}
		return true
	}
};


// 工具
export class Toolkit {
	/**
	 * 矩阵和数组相关的工具
	 */
	static get matrix(): typeof MatrixToolkit {
		return MatrixToolkit;
	}
	/**S
	 * 宫坐标系相关的工具
	 */
	static get box() {
		return boxToolkit;
	}
}

export default Toolkit