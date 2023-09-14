  //由于修改了src文件夹名称，所以启动vue项目后，会因找不到入口（main.js）而会报错，所以需要重新指定启动入口
  module.exports = {
    //关闭语法检测
    lintOnSave: false,
    // 将 examples 目录添加为新的页面
    pages: {
      index: {
        // page 的入口
        entry: 'examples/main.js',
        // 模板来源
        template: 'public/index.html',
        // 输出文件名
        filename: 'index.html'
      }
    }
  }
