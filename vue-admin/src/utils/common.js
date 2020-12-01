/**
 * 格式化时间
 */
function doubleDate(date) {
    return date < 10 ? '0' + date : date;
}
function changeDay (date) {
    let weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    return weekday[date]
}
export function formatDate(input, type) {
    var date = new Date(input);
    var o = {
        "yyyy": date.getFullYear(),
        "MM": doubleDate(date.getMonth() + 1), //月份
        "dd": doubleDate(date.getDate()), //日
        "HH": doubleDate(date.getHours()),//小时
        "mm": doubleDate(date.getMinutes()), //分
        "ss": doubleDate(date.getSeconds()), //秒
        "week": changeDay(date.getDay())
    };
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(type)) {
            type = type.replace(RegExp.$1, o[k]);
        }
    }
    return type;
}
/**
 * 格式化：上午、中午、下午、晚上
 */
export function formatTimeSlot () {
    let date = new Date(),
        hour = date.getHours();
    return hour < 8
        ? '早上好'
        : hour <= 11
        ? '上午好'
        : hour <= 13
        ? '中午好'
        : hour < 18
        ? '下午好'
        : '晚上好'
}