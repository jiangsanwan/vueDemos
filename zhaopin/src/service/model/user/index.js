module.exports.user =  {
	'user': {type: String, require: true},// 用户名
	'pwd': {type: String, require: true},// 密码
	'type': {type: String, require: true},// boss或者genius
	'active': { 'type': Number, 'require': true },// 标识用户是否在线
	'avatar': {'type': String},// 头像
	'desc': {'type': String},// 个人简介或者职位简介
	'title': {type: String},// 招聘的职位名或者求职的职位名
	// 如果是boss还有两个字段
	'company': {'type': String},// 公司名
	'money': {'type': String},// 薪资
	'timeStamp': { 'type': Number, 'require': true }// 用户登录的事件戳
};
// db.users.update({}, {$set: {active: 0}}, {multi: 1})