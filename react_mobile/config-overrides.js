const { override, fixBabelImports, addPostcssPlugins } = require('customize-cra')

module.exports = override(
  // 按需加载，UI组件
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: 'css'
  }),
  // 适配，把px转成rem
  addPostcssPlugins(
    /* 
      remUnit: 100 使用淘宝适配的方法，根标签的字体大小为 设备宽度的独立像素 * 100 / 设计稿的宽度
      remUnit: 37.5 使用唯品会适配的方法，根标签的字体大小为 设计稿的宽度 / 10
    */
    // [require('postcss-px2rem')({remUnit: 100})]
    [require('postcss-px2rem')({remUnit: 37.5})]
  )
)