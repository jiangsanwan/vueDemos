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
/**
 * 学历
 * 初中及以下 1，中专/中技 2，高中 3，大专 4，本科 5，硕士 6，博士 7
 */
let educationArr = ['-', '初中及以下', '中专/中技', '高中', '大专', '本科', '硕士', '博士']
export function educationFilter (input) {
	if(input) {
		input = Number(input)
		return educationArr[input]
	} else {
		return educationArr[0]
	}
}
/**
 * 公司财政
 * 不需要融资 6，已上市 5，天使轮 7，A轮 1，B轮 2，C轮 3，D轮 4
 */
let financeArr = ['-', 'A轮', 'B轮', 'C轮', 'D轮', '已上市', '不需要融资', '天使轮']
export function financeFilter (input) {
	if(input) {
		input = Number(input)
		return financeArr[input]
	} else {
		return financeArr[0]
	}
}

/**
 * 周末工作形式
 * 0单双周、1双休、2单休、3无休
 */
let weekendArr = ['单双周', '双休', '单休', '无休', '-']
export function weekendFilter (input) {
	if(input != null) {
		return weekendArr[input]
	} else {
		return weekendArr[weekendArr.length - 1]
	}
}
/**
 * 加班形式
 * 0偶尔加班、1不加班、2加班调休、3弹性工作
 */
let overtimeArr = ['偶尔加班', '不加班', '加班调休', '弹性工作', '-']
export function overtimeFilter (input) {
	if(input != null) {
		return overtimeArr[input]
	} else {
		return overtimeArr[overtimeArr.length - 1]
	}
}
/**
 * 限制内容长度
 */
export function limitLengthFilter (input, length) {
	if(input == null) { 
		return '-'
	} else {
		if(length == 0 || input.length < length) {
			return input
		} else {
			return `${input.substr(0, length)}...`
		}
	}
}