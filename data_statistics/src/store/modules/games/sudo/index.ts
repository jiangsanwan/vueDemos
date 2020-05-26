export default {
    state: {
        level_number: '3',
        
        stepArr: [// 记录数组的步数，以及每一步对应的属性值
            // {
            //     rowIndex: 0,// 行数
            //     colIndex: 0,// 列数
            //     value: 0,// 行列对应位置的值
            //     classType: 0// 元素的class类型，0：初始化的时候没有值，1：初始化的时候有值，2：输入后验证失败，3、标记输入的值
            // }
        ]
    },
    mutations: {
        SET_LEVELNUMBER (state: any, str: string): void {
            state.level_number = str
        }
    }
}