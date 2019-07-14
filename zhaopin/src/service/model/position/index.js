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
	'companyType': { 'type': String, 'require': true }// String 公司类型
};

/*db.positions.insert({
	title: 'Java工程师(中级)',
	recommendLatest: 0,
	positionType: 1,
	salary: '15000-20000',
	salaryNumber: 13,
	company: '平安好医生',
	finance: '已上市',
	detailedAddress: '安徽省合肥市高新区1314路78号',
	briefAddress: '安徽省 合肥市',
	workingYears: '3-5年',
	education: '专科及以上',
	publisherAvatar: '',
	publisherNickName: 'fremember',
	publisherPosition: '全栈开发工程师',
	positionDetails: '这个还没有想好呢，比较多',
	qualification: '写代码啊，逗大家开心啊',
	skillsRequired: 'node、javascript、es6',
	scale: '20-100人',
	companyType: '互联网',
});*/