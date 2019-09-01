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