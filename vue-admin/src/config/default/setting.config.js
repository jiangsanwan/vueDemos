/**
 * @description 导出默认通用配置
 */
const setting = {
  //生产环境构建文件的目录名
  outputDir: 'dist',
  //开发环境每次保存时是否输出为eslint编译警告
  lintOnSave: true,
  //进行编译的依赖
  transpileDependencies: ['vue-echarts', 'resize-detector'],
  //默认的接口地址 配置成需要的接口地址
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:1413/' : 'http://localhost:1413/',
  //标题 （包括初次加载雪花屏的标题 页面的标题 浏览器的标题）
  title: 'vue-admin',
  //标题分隔符
  titleSeparator: ' - ',
  //标题是否反转 如果为false:"page - title"，如果为ture:"title - page"
  titleReverse: false,
  //简写
  abbreviation: '',
  //开发环境端口号
  devPort: '1314',
  //版本号
  version: process.env.VUE_APP_VERSION,
  //pro版本copyright可随意修改
  copyright: 'fremember 18769567910@163.com',
  //缓存路由的最大数量
  keepAliveMaxNum: 99,
  //不经过token校验的路由
  routesWhiteList: ['/login', '/register', '/404', '/403'],
  //加载时显示文字
  loadingText: '正在加载中...',
  //token名称
  tokenName: 'accessToken',
  // 角色名称
  roleName: 'roleName',
  //token在localStorage、sessionStorage、cookie存储的key的名称
  tokenTableName: 'accessToken',
  //token存储位置localStorage sessionStorage cookie
  storage: 'localStorage',
  //token失效回退到登录页时是否记录本次的路由
  recordRoute: true,
  //是否显示logo，不显示时设置false，显示时请填写remixIcon图标名称，暂时只支持设置remixIcon
  logo: 'vuejs-fill',
  //是否开启登录拦截
  loginInterception: true,
  //需要加loading层的请求，防止重复提交
  debounce: ['doEdit'],
  //画廊布局和综合布局时，是否点击一级菜单默认开启第一个二级菜单
  openFirstMenu: true,
}
module.exports = setting
