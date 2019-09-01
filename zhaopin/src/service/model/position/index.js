module.exports.position = {
	'title': { 'type': String, 'require': true },// String 职位名称
	'recommendLatest': { 'type': Number },// Number 推荐或最新 0推荐，1最新
	'positionType': { 'type': Number },// Number 职位类型 0常规招聘，1急聘
	'salary': { 'type': String, 'require': true },// String 薪资范围
	'salaryNumber': { 'type': Number, 'require': true },// Number 多少薪
	'company': { 'type': String, 'require': true },// String 公司名称
	'finance': { 'type': String, 'require': true },// String 不需要融资，已上市，天使轮，A轮，B轮，C轮，D轮
	'detailedAddress': { 'type': String, 'require': true },// String 详细地址
	'briefAddress': { 'type': String, 'require': true },// String 地址
	'workingYears': { 'type': String, 'require': true },// String 工作年限
	'education': { 'type': String, 'require': true },// String 学历
	'publisherAvatar': { 'type': String, 'require': true },// String 发布者头像
	'publisherNickName': { 'type': String, 'require': true },// String 发布者昵称
	'publisherPosition': { 'type': String, 'require': true },// String 发布者职位
	'positionDetails': { 'type': String, 'require': true },// String 岗位职责
	'qualification': { 'type': String, 'require': true },// String 任职资格
	'skillsRequired': { 'type': String, 'require': true },// String 技能要求
	'scale': { 'type': String, 'require': true },// String 公司人数规模
	'companyType': { 'type': String, 'require': true },// String 公司类型
	'logo': { 'type': String, 'require': true },// 公司logo
};

/*db.positions.insert({
	'recommendLatest': 0,
	'city': '合肥',
	'title': 'php开发工程师',
	'positionType': 0,
	'salary': '8K-12K',
	'salaryNumber': 13,
	'company': '合肥达链',
	'finance': '不需要融资',
	'detailedAddress': '安徽省合肥市高新区创新产业园3期J2区',
	'briefAddress': '安徽 合肥 高新区',
	'workingYears': '1-3年',
	'education': '大专',
	'publisherAvatar': '1.png',
	'publisherNickName': '张三',
	'publisherPosition': '程序员',
	'positionDetails': '负责用友云产品前端框架、工具、类库、组件的封装和开发，技术产品的培训和支持工作，研究前沿技术的应用',
	'qualification': '1.统招本科及以上学历，5年以上前端相关经验，精通HTML/CSS/JS/Node.js任一项，熟悉vue/react等主流框架###2.不需要有代码洁癖，但对代码、程序要有追求###3.有自己的技术博客###4.对前端工程化、模块化有深入理解###5.喜欢在Github上分享和学习',
	'skillsRequired': 'spring###mysql###radis',
	'scale': '20-100人',
	'companyType': '互联网',
	'logo': '',
});*/