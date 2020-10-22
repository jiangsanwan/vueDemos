/**
 * 判断是不是外部链接
 * @param {*} path 需要校验的地址
 * @return { Boolean }
 */
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}
/**
 * 判断是不是数字
 * @param {*} value 
 * @return { Boolean }
 */
export function isNumber (value) {
    return /^[0-9]*$/.test(value)
}
/**
 * 判断是不是名称
 * @param {*} value
 * @return { Boolean }
 */
export function isName (value) {
    return /^[\u4e00-\u9fa5aa-zA-Z0-9]+$/.test(value)
}
/**
 * 判断是不是IP
 * @param {*} ip
 * @return { Boolean }
 */
export function isIP (ip) {
    return /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(ip)
}
/**
 * 判断是不是传统网站
 * @param {*} url 
 * @return { Boolean }
 */
export function isUrl(url) {
    return /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/.test(url)
}
/**
 * 判断是不是小写字母
 * @param {*} value 
 * @return { Boolean }
 */
export function isLowerCase (value) {
    return /^[a-z]+$/.test(value)
}
/**
 * 判断是不是大写字母
 * @param {*} value 
 * @return { Boolean }
 */
export function isUpperCase (value) {
    return /^[A-Z]+$/.test(value)
}
/**
 * 判断是不是字母
 * @param {*} value 
 * @return { Boolean }
 */
export function isAlphabets (value) {
    return /^[A-Za-z]+$/.test(value)
}
/**
 * 判断是不是字符串
 * @param {*} value 
 * @return { Boolean }
 */
export function isString (value) {
    return typeof value == 'string' || value instanceof String
}
/**
 * 判断是不是数组
 * @param {*} value 
 * @return { Boolean }
 */
export function isArray (arg) {
    if (typeof Array.isArray === 'undefined') {
        return Object.prototype.toString.call(arg) === '[object Array]'
    } else {
        return Array.isArray(arg)
    }
}
/**
 * 判断是不是端口号
 * @param {*} value 
 * 格式是0-65535
 * @return { Boolean }
 */
export function isPort (value) {
    // [0-9] 0～9
    // [1-9]\d 10～99
    // [1-9]\d{2} 100～999
    // [1-9]\d{3} 1000～9999
    // [1-5]\d{4} 10000～59999
    // 6[0-4]\d{3} 60000～64999
    // 65[0-4]\d{2}
    // 655[0-2]\d
    // 6553[0-5]
    return /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/.test(value)
}
/**
 * 判断是不是手机号
 * @param {*} value
 * @return { Boolean }
 */
export function isPhone (value) {
    return /^1[345678]\d{9}/.test(value)
}
/**
 * 判断是不是（第二代）身份证号
 * @param {*} value 
 * @return { Boolean }
 */
export function isIdCard (value) {
    // [1-9]\d{5} 匹配身份证号的前6位
    // (18|19|([23]\d))\d{2} 匹配年份 1800～3999
    // ((0[1-9])|(10|11|12)) 匹配月份 01～12
    // (([0-2][1-9])|10|20|30|31) 匹配日 01～09 11～19 21～29 10 20 30 31
    // \d{3}[0-9Xx] 匹配身份证的最后四位，最后一位可能是0～9、x、X
    return /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(value)
}
/**
 * 判断是不是邮箱
 * @param {*} value 
 * @return { Boolean }
 */
export function isEmail (value) {
    return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)
}
/**
 * 判断是不是中文，长度：2～4
 * @param {*} value 
 * @return { Boolean }
 */
export function isChina (value) {
    return /^[\u4E00-\u9FA5]{2,4}$/.test(value)
}
/**
 * 判断是否为空
 * @param {*} value 
 * @return { Boolean }
 */
export function isBlank (value) {
    return (
        value == null ||
        false ||
        value === '' ||
        value.trim() === '' ||
        value.toLocaleLowerCase().trim() === 'null'
    )
}
/**
 * 判断是不是固话
 * 格式：以0开头，后面任意两位或者三位数字 比如区号0215， 接着分隔符-，然后为任意7位或者8位数字
 * 例如： 010-1234567    010 12345678
 * @param {*} value 
 */
export function isTel (value) {
    return /^[048]\d{2,3}(-|\s){1}\d{7,8}$/.test(value)
}
/**
 * 判断数字且小数点后最多两位小数
 * @param {*} value
 * @return { Boolean }
 */
export function isNum (value) {
    return /^\d+(\.\d{1,2})?$/.test(value)
}
/**
 * 判断经度
 * 经度范围：-180.0000~180.0000
 * @param {*} value 
 * @return { Boolean }
 */
export function isLongitude (value) {
    return /^[-|+]?(0?\d{1,2}\.\d{1,5}|1[0-7]?\d{1}\.\d{1,5}|180\.0{1,5})$/.test(value)
}
/**
 * 判断维度
 * @param {*} value 
 * 纬度范围：-90.0000~90.0000
 * @return { Boolean }
 */
export function isLatitude (value) {
    return /^[-|+]?(0?\d{1,2}\.\d{1,5}|1[0-7]?\d{1}\.\d{1,5}|180\.0{1,5})$/.test(value)
}
/**
 * rtsp校验，只要有rtsp://
 * @param value
 * @returns {boolean}
 */
export function isRTSP(value) {
    const reg = /^rtsp:\/\/([a-z]{0,10}:.{0,10}@)?(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
    const reg1 = /^rtsp:\/\/([a-z]{0,10}:.{0,10}@)?(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5]):[0-9]{1,5}/
    const reg2 = /^rtsp:\/\/([a-z]{0,10}:.{0,10}@)?(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\//
    return reg.test(value) || reg1.test(value) || reg2.test(value)
}
/**
 * 判断是不是json
 * @param {*} value 
 * @return { Boolean }
 */
export function isJson (value) {
    if(typeof value == 'string') {
        try {
            let obj = JSON.parse(value)
            // if(typeof obj == 'object' && obj) {
            //     return true
            // } else {
            //     return false
            // }
            return (typeof obj == 'object' && obj)
        } catch(e) {
            return false
        }
    }
}