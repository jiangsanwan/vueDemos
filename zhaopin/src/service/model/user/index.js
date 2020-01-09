module.exports.user = {
	'user': {type: String, require: true},// 用户名
	'pwd': {type: String, require: true},// 密码
	'type': {type: String, require: true},// boss或者genius
	'active': { type: Number, require: true },// 标识用户是否在线
	'avatar': {type: String, require: true},// 头像
	'desc': {type: String, require: true},// 个人简介或者职位简介
	'title': {type: String, require: true},// 招聘的职位名或者求职的职位名
	'timeStamp': {type: Number, require: true},// 用户登录的事件戳
	'applyReadStory': {type: String, require: true},// 想看故事
	'applyViewPartners': {type: String, require: true},
	// 如果是boss还有两个字段
	'company': {type: String, require: true},// 公司名
	'companyType': {type: String, require: true},// 公司类型
	'scaleMin': { type: String, require: true },// String 公司人数规模最小值
	'scaleMax': { type: String, require: true },// String 公司人数规模最大值
	'logo': { type: String, require: true },// 公司logo
	'teamIntroduction': { type: String, require: true },// 公司介绍
	'detailedAddress': { type: String, require: true },// String 详细地址
	'briefAddress': { type: String, require: true },// String 地址
	'city': { type: String, require: true },// 公司所在的城市
	'finance': { type: String, require: true },// 公司财政
};
// db.users.update({}, {$set: {applyReadStory: "", applyViewPartners: ""}}, {multi: 1})

/*
{
	"_id": ObjectId("5dfc7382de250a5713bf33c2"),
	"user": "admin",
	"pwd": "cc87233de8292772241981a3d98df391",
	"type": "Boss",
	"title": "技术人才",
	"desc": "{"recruit":"开发人员","position":"HRBP","tags":"积极主动###扁平化管理"}",
	"company": "合肥达链",
	"companyType": "互联网",
	"scaleMin": "100",
	"scaleMax": "500",
	"teamIntroduction": "区块链技术开发",
	"detailedAddress": "安徽省合肥市高新区创新产业园",
	"briefAddress": "安徽省合肥市",
	"city": "合肥市",
	"applyReadStory": "",
	"applyViewPartners": "",
	"logo": "",
	"timeStamp": 1576825751427,
	"active": 1,
	"avatar": "",
	"__v": 0
}
 */

/*
注册Boss用户，从第一行输入开始到最后一行形式为：
用户名
密码
确认密码
Boss职位
Boss类型
{"recruit":"开发人员","position":"HRBP","tags":"积极主动###扁平化管理"}
公司名称
公司财政
公司类型
规模下线
规模上限
{"teamLabel": "公司气氛好###领导nice###美女如云###带薪年假###年终分红###扁平管理","otherInfo":"氛围轻松，激情无限，你能想到的好，可能都有，哈哈，等你来，前端骚年！"}
详细地址
简短地址
所在城市
 */