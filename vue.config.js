module.exports = {
  publicPath: './',
  // 是否使用eslint
  lintOnSave: true,
  productionSourceMap: false,

  devServer: {
    open: true,
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      });
  },
};
