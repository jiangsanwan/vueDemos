// 加载插件
let requirePlugin = require.context('./plugins', true, /\.js$/)
requirePlugin.keys().forEach(fileName => {
    requirePlugin(fileName)
})