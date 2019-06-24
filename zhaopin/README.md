## vue-zhaopin
vue-zhaopin项目是一款仿写的招聘类APP，使用vue-cli搭建的前端项目，后端使用express提供接口支持

## Project setup
```
npm install
```
### Compiles and hot-reloads for development
```
npm run serve
```
### Compiles and minifies for production
```
npm run build
```
### Lints and fixes files
```
npm run lint
```
### 重要文档结构说明
    public ---> 浏览器地址栏上面的ico字体的存放位置
    vue.config.js ---> 配置前端项目的启动端口和接口请求代理
    src ---> 项目源代码文件
        assets ---> 静态之源存放目录
            css ---> 样式初始化文件、部分组件修改的样式
            imgs ---> 全局使用的静态图片文件
            stylus ---> 初始化的样式函数、变量、公共嵌套样式组
        components ---> 公共组件
            mine-footer ---> 公共头组件
            mine-header ---> 公共脚组件
        router ---> 路由文件
        service ---> 后台接口服务(详细说明在其内部的README.md文件中)
        store ---> 状态管理文件(主要用于接口的集中处理)
        utils ---> 公共配置插件
            common.js ---> 对象、数组、字符串等的扩展函数
            flexible.js ---> 移动端rem布局，初始化 1rem = 100px
        views ---> 组件页面
            follow ---> 关注页面
            home ---> 首页
            login ---> 登陆页
            message ---> 消息页(即聊天页)
            register ---> 注册页
            user ---> 用户中心
            webview ---> 内部切换路由的壳
        App.vue ---> 项目页面切换的壳
        main.js ---> 项目启动文件
### 数据测试
genius(牛人)测试账号：
    账号：pxy
    密码：1234qwer
boss(招聘人)测试账号：
    账号：admin
    密码：1234qwer