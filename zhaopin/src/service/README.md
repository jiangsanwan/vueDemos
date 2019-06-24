# service说明
	该service是基于express中间件机制转发路由为前端vue招聘项目提供接口服务的项目

# 主要npm包有：
	body-parser: 格式化请求接口的数据
	cookie-parser: 设置本地存储的cookie信息
	express: 提供中间件路由转发服务
	mongoose: 提供数据库存储服务
	socket.io: 提供服务端socket支持
	utility: 提供加密服务

# service结构：
	README.md ---> 帮助用户理解文档结构的说明文档
	package.json ---> npm包管理文件
	index.js ---> 文档的入口文件，即启动服务的时候直接使用node index.js或者node index
	comment.js ---> 接口错误状态码说明文档
	model ---> 数据表结构
		index.js ---> 入口文件，用于数据库连接，以及初始化mongoose操作的集合
		user -> index.js 用户集合
		chat -> index.js 聊天集合
	routers ---> 接口路由配置文件
		user -> index.js 用户表相关的操作
	utils ---> 工具文件夹
		encryption.js ---> 加密文件夹，暴露加密接口

# 接口说明：（注意参数均是JSON对象格式）

	/user/register POST 参数如下：
		{
			'user': {type: String, require: true},// 用户名
			'pwd': {type: String, require: true},// 密码
			'type': {type: String, require: true},// boss或者genius
			'avatar': {'type': String},// 头像
			'desc': {'type': String},// 个人简介或者职位简介
			'title': {type: String},// 招聘的职位名或者求职的职位名
			// 如果是boss还有两个字段
			'company': {'type': String},// 公司名
			'money': {'type': String},// 薪资
		}

	/user/login POST 参数如下
		{
			'user': {type: String, require: true},// 用户名
			'pwd': {type: String, require: true},// 密码
			'type': {type: String, require: true}// boss或者genius
		}

