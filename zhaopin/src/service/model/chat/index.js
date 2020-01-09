module.exports.chat =  {
	'chatid': {  'type': String, 'require': true },// 信息的唯一标识
	'from': { 'type': String, 'require': true },// 信息来自谁
	'to': { 'type': String, 'require': true },// 信息发送给谁
	'read': { 'type': Boolean, 'default': false },// 消息已读或未读的状态，且该字段只对to所对应的人有作用
	'content': { 'type': String, 'require': true, 'default': '' },// 信息内容
	'timeStamp': { 'type': Number, 'default': 0 }// 信息创建时间
};