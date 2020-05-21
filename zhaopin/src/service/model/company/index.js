module.exports.company = {
	'employeeWelfare': { 'type': String, 'require': true },// 员工福利
		/*'workStart': { 'type': String, 'require': true },// 上班时间
		'workEnd': { 'type': String, 'require': true },// 下班时间
		'weekend': { 'type': String, 'require': true },// 周末工作形式，0单双周、1双休、2单休、3无休
		'overtime': { 'type': String, 'require': true },// 加班形式，0偶尔加班、1不加班、2加班调休、3弹性工作*/
	'abstract': { 'type': String, 'require': true },// 公司简介
	'introduceFigure': { 'type': String, 'require': true },// 图集
	'introduce': { 'type': String, 'require': true },// {thumb(缩略图), title(标题), slogon(口号), label(标签)} 产品介绍
	'executivesintroduce': { 'type': String, 'require': true },// [{avatar(头像),name(名字),position(职位),introduction(简介),publicId(发布者ID)}] 高管介绍
	'businessAddress': { 'type': String, 'require': true },// 办公地址
	'officialWebsite': { 'type': String, 'require': true },// 公司官网
	'publicId': { 'type': String, 'require': true },// 招聘者信息
	'businessInformation': { 'type': Number, 'require': true }// 工商信息
		// 'CompanyFullName': { 'type': Number, 'require': true },// 公司全称
		// 'legalRepresentative':  { 'type': String, 'require': true }// 法人代表
		// 'createTime': { 'type': String, 'require': true },// 注册时间
		// 'registeredCapital': { 'type': String, 'require': true },// 注册资本
		// 'registeredAddress': { 'type': String, 'require': true },// 注册地址
		// 'businessStatus': { 'type': String, 'require': true },// 营业状况
		// 'creditCode': { 'type': String, 'require': true },// 统一信用代码
		// 'businessScope': { 'type': String, 'require': true },// 经营范围
}
/*
db.companys.insert({
	'employeeWelfare': '{"workStart": "9:00", "workEnd": "17:00", "weekend": 1, "overtime": 1, "risksGold": "{title: \'五险一金\', content: \'缴纳养老保险、医疗保险、失业保险、工伤保险、生育保险和住房公积金\'}", "annualLeave": "{title: \'定期年假\', content: \'阶段性职业健康检查\'}", "annualBonus": "{title: \'年终奖\', content: \'年末给予员工年终奖励，对一年来的工作业绩给予肯定\'}", "paidAnnualLeave": "{title: \'带薪年假\', content: \'给员工提供带薪年休假\'}", "mealSupplement": "{title: \'餐补\', content: \'工作餐的额外补助\'}", "communicationSubsidy": "{title: \'通讯补贴\', content: \'补贴员工因公实际发生的公务话费\'}", "holidaySubsidy": "{title: \'节日补贴\', content: \'法定或者特定节日时提供礼物\'}"}',
	'abstract': '"凯叔讲故事"微信公众号和"凯叔讲故事"APP由原中央电视台主持人王凯创办，每天与1300多万家庭互动分享，孩子的古诗大全，父母的育儿宝典。',
	'introduceFigure': '1.jpg###2.jpg###3.jpg',
	'introduce': '{"thumb": "ksjgs.png", "title": "凯叔讲故事","slogon":"让更多的孩子拥有幸福童年","label":"原创故事在线收听阅读"}',
	'executivesintroduce': '[{"avatar": "1.png","name":"王凯","position":"CEO","introduction":"一个有情怀的逗比主持人","publicId": "5e0761666beddc0eed511051"},{"avatar": "1.png","name":"fremember","position":"Coo","introduction":"技术大牛","publicId": "5e0761666beddc0eed511051"}]',
	'businessAddress': '北京朝阳区·国际广场T3楼4层###北京朝阳区望京东园保利国际广场T3',
	'officialWebsite': 'http://www.kaishustory.com/',
	'publicId': '5e07586eee14d60e86787577',
	'businessInformation': '{"CompanyFullName": "北京凯声文化传媒有限责任公司","createTime": "2013-03-22","registeredAddress": "北京市东城区幸福大街甲39号1号楼三层303房", "registeredCapital": "545.4545万元","legalRepresentative": "王凯","businessStatus": "开业", "creditCode": "911101010649160266", "businessScope": "组织文化艺术交流；承办展览展示..."}'
});
 */
