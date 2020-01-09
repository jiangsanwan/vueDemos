module.exports.position = {
	'title': { type: String, require: true },// String 职位名称
	'recommendLatest': { type: Number },// Number 推荐或最新 0推荐，1最新
	'positionType': { type: Number },// Number 职位类型 0常规招聘，1急聘
	'salaryMin': { type: String, require: true },// String 薪资最小值
	'salaryMax': { type: String, require: true },// String 薪资最大值
	'salaryNumber': { type: Number, require: true },// Number 多少薪
	'company': { type: String, require: true },// String 公司名称
	'finance': { type: String, require: true },// String 不需要融资 6，已上市 5，天使轮 0，A轮 1，B轮 2，C轮 3，D轮 4
	'detailedAddress': { type: String, require: true },// String 详细地址
	'briefAddress': { type: String, require: true },// String 地址
	'workingYearsMin': { type: String, require: true },// String 工作年限最小值
	'workingYearsMax': { type: String, require: true },// String 工作年限最大值
	'education': { type: String, require: true },// String 学历 初中及以下 1，中专/中技 2，高中 3，大专 4，本科 5，硕士 6，博士 7
	'publicId': { type: String, require: true },// String 发布者_id
	'publisherAvatar': { type: String, require: true },// String 发布者头像
	'publisherNickName': { type: String, require: true },// String 发布者昵称
	'publisherPosition': { type: String, require: true },// String 发布者职位
	'positionDetails': { type: String, require: true },// String 岗位职责
	'qualification': { type: String, require: true },// String 任职资格
	'skillsRequired': { type: String, require: true },// String 技能要求
	'scaleMin': { type: String, require: true },// String 公司人数规模最小值
	'scaleMax': { type: String, require: true },// String 公司人数规模最大值
	'companyType': { type: String, require: true },// String 公司类型
	'logo': { type: String, require: true },// 公司logo
	'active': { type: Number, require: true },// 标识用户是否在线，
	'timeStamp': { type: Number, require: true },// 用户登录的事件戳
	'teamIntroduction': { type: String, require: true },// 公司介绍
	'bonusPoints': { type: String, require: false },// 加分项
	'city': { type: String, require: true },// 公司所在的城市
	'visitorsNumber': { type: Number, require: true },// 职位被浏览的次数
	'positionId': { type: Number, require: true },// 职位序列
};

// db.positions.update({}, {$set: {publicId: '5d09fa8c0a73e0678734a921'}}, {multi: 1})

/*db.positions.insert({
	"recommendLatest" : 0,
	"city" : "合肥",
	"title" : "程序员鼓励师",
	"positionType" : 0,
	"salaryMin" : "14000",
	"salaryMax" : "22000",
	"salaryNumber" : 13,
	"company" : "凯叔讲故事",
	"finance" : "不需要融资",
	"detailedAddress" : "安徽省合肥市高新区创新产业园3期J2区",
	"briefAddress" : "安徽 合肥 高新区",
	"workingYearsMin" : "1",
	"workingYearsMax" : "3",
	"education" : "大专",
	"publisherAvatar" : "1.png",
	"publisherNickName" : "admin",
	"publisherPosition" : "程序员",
	"positionDetails" : "负责用友云产品前端框架、工具、类库、组件的封装和开发，技术产品的培训和支持工作，研究前沿技术的应用",
	"qualification" : "1.统招本科及以上学历，5年以上前端相关经验，精通HTML/CSS/JS/Node.js任一项，熟悉vue/react等主流框架###2.不需要有代码洁癖，但对代码、程序要有追求###3.有自己的技术博客###4.对前端工程化、模块化有深入理解###5.喜欢在Github上分享和学习",
	"skillsRequired" : "spring###mysql###radis",
	"scaleMin" : "20",
	"scaleMax" : "100",
	"companyType" : "互联网",
	"logo" : "",
	"avatar": "",
	"active" : 0,
	"timeStamp" : 0,
	"publicId": "5df8c95934a94636f293b48e",
	"teamIntroduction" : "{\"teamLabel\": \"公司气氛好###领导nice###美女如云###带薪年假###年终分红###扁平管理\",\"otherInfo\":\"氛围轻松，激情无限，你能想到的好，可能都有，哈哈，等你来，前端骚年！\"}",
	"bonusPoints" : "1、擅长音视频、图形图像处理；###2、有自己的开源项目；###3、对H5开发以及与App之间交互有一定的经验。",
	"visitorsNumber": "0"
});*/
/*
添加职位，从第一行输入开始到最后一行形式为：
高级前端开发
12000
18000
1
3
14
5
负责用友云产品前端框架、工具、类库、组件的封装和开发，技术产品的培训和支持工作，研究前沿技术的应用
1.统招本科及以上学历，5年以上前端相关经验，精通HTML/CSS/JS/Node.js任一项，熟悉vue/react等主流框架###2.不需要有代码洁癖，但对代码、程序要有追求###3.有自己的技术博客###4.对前端工程化、模块化有深入理解###5.喜欢在Github上分享和学习
JS###ES6###Vue###react###webpack
1、擅长音视频、图形图像处理；###2、有自己的开源项目；###3、对H5开发以及与App之间交互有一定的经验。
 */










