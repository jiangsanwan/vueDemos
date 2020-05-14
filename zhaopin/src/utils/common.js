/**
 * 将对象初始化的原始状态
 * @params obj Object 需要修改的对象
 * @params def String 初始化时候的值
 * void 无返回值
 */
export function resetStatus (obj, def) {
    for(let attr in obj) {
        obj[attr] = def
    }
}
/**
 * 将字符串转成对象，尤其处理非json字符串类型的字符串
 */
export function stringToObject (str) {
    let _str = str,
        _arr = [],
        _obj = {};
    // 1、将最外层的花括号删除
    _str = _str.slice(1)
    _str = _str.slice(0, -1)
    // 2、先用逗号切割，将第一步处理完的字符串转成数组
    _arr = _str.split(', ')
    // 3、遍历数组
    _arr.forEach(v => {
        // 4、将数组元素再次切割
        let _v = v.split(': ')
        // 5、将在此切割后的数组元素组合成对象
        _obj[_v[0]] = _v[1].replace(/\'/g, '')
    })
    return _obj
}