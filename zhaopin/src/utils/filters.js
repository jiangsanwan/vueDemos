function doubleDate(date) {
	return date < 10 ? '0' + date : date;
}
// 格式化时间
export function formatDate(input, type) {
	var date = new Date(input);
	var o = {
		"yyyy": date.getFullYear(),
		"MM": doubleDate(date.getMonth() + 1), //月份
		"dd": doubleDate(date.getDate()), //日
		// "hh": date.getHours() >= 12 ? doubleDate(date.getHours() - 12) : doubleDate(date.getHours()), //小时
		"HH": doubleDate(date.getHours()),//小时
		"mm": doubleDate(date.getMinutes()), //分
		"ss": doubleDate(date.getSeconds()) //秒
	};
	for (var k in o) {
		if (new RegExp("(" + k + ")").test(type)){
			type = type.replace(RegExp.$1, o[k]);
		}
	}
	return type;
}
export function formatSalaryToK (input, bol) {
	if(!input) {
		return '-'
	} else {
		return bol ? Number(input) / 1000 + 'K' : Number(input) / 1000
	}
}
export function formatWorkingYears (input, bol) {
	if(!input) {
		return '-'
	} else {
		return bol ? input + '年' : input
	}
}
/*
* 刚刚活跃（登录时间距离现在小于一天）
* 本周活跃（登录时间距离现在大于一天小于一周）
* 本月活跃（登录时间距离现在大于一周小于一月）
* 本年活跃（登录时间距离现在大于一月小于一年）
* */
export function userActiveFilter (input, timeStamp) {
	if(input == null) {
		return ''
	} else {
		let date = new Date(timeStamp),
			yyyy = date.getFullYear(),
			MM = date.getMonth() + 1,
			dd = date.getDate(),

			_date = new Date(),
			_yyyy = _date.getFullYear(),
			_MM = _date.getMonth() + 1,
			_dd = _date.getDate();

		if(_yyyy > yyyy) {// 当前年份大于登陆年份
			return `最近登陆：${yyyy}-${MM}-${dd}`
		} else if(_yyyy == yyyy && _MM > MM) {
			return '本年活跃'
		} else if(_yyyy == yyyy && _MM == MM && _dd - dd >= 7) {
			return '本月活跃'
		} else if(_yyyy == yyyy && _MM == MM && _dd - dd > 1) {
			return '本周活跃'
		} else {
			return '刚刚活跃'
		}
	}
}
