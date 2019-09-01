module.exports.position = {
	'company': { 'type': String, 'require': true },// 公司名
	'logo': { 'type': String, 'require': true },// 公司logo
	'briefAddress': { 'type': String, 'require': true },// 地址
	'detailedAddress': { 'type': String, 'require': true },// 详细地址
	'finance': { 'type': String, 'require': true },// 不需要融资，以上市，天使轮，A轮，B轮，C轮，D轮
	'scale': { 'type': String, 'require': true },// 公司人数规模
	'companyType': { 'type': String, 'require': true },// 公司类型
	'hotPosition': { 'type': String, 'require': true },// 热招职位
	'totalPosition': { 'type': Number, 'require': true },// 招聘职位个数
	'introduceFigure': { 'type': String, 'require': true },// 图集
	'abstract': { 'type': String, 'require': true },// 公司简介
	'introduce': { 'type': String, 'require': true },// {thumb(缩略图), title(标题), slogon(口号), label(标签)} 产品介绍
	'executivesintroduce': { 'type': String, 'require': true },// [{avatar(头像),name(名字),position(职位),introduction(简介)}] 高管介绍
	'businessAddress': { 'type': String, 'require': true },// 办公地址
	'officialWebsite': { 'type': String, 'require': true },// 公司官网
	'createTime': { 'type': String, 'require': true },// 成立时间
	'registeredCapital': { 'type': String, 'require': true },// 注册资本
	'legalRepresentative': { 'type': String, 'require': true }// 法人代表
}

/*db.companys.insert({
	'company': '凯叔讲故事',
	'logo': 'ksjgs.png',
	'briefAddress': '安徽 合肥 高新区',
	'detailedAddress': '安徽省合肥市高新区创新产业园3期J2区',
	'finance': 'B轮',
	'scale': '100-499人',
	'companyType': '互联网',
	'hotPosition': 'html5高级开发工程师',
	'totalPosition': 180,
	'introduceFigure': '1.jpg###2.jpg###3.jpg',
	'abstract': '"凯叔讲故事"微信公众号和"凯叔讲故事"APP由原中央电视台主持人王凯创办，每天与1300多万家庭互动分享，孩子的古诗大全，父母的育儿宝典。',
	'introduce': '{"thumb": "ksjgs.png", "title": "凯叔讲故事","slogon":"让更多的孩子拥有幸福童年","label":"原创故事在线收听阅读"}',
	'executivesintroduce': '{"avatar": "1.png","name":"王凯","position":"CEO","introduction":"一个有情怀的逗比主持人"},{"avatar": "1.png","name":"fremember","position":"Coo","introduction":"技术大牛"}',
	'businessAddress': '北京朝阳区·国际广场T3楼4层###北京朝阳区望京东园保利国际广场T3',
	'officialWebsite': 'http://www.kaishustory.com/',
	'createTime': '2013-03-22',
	'registeredCapital': '545.4545万元',
	'legalRepresentative': '王凯'
})*/
