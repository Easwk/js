## 详细注释
 
> version: v-1.0.0
***

1. 结构
//=============================================================================
// 参考VUE KIT
//=============================================================================
```
.
├─ build/            # Webpack 配置目录
├─ dist/             # build 生成的生产环境下的项目
├─ src/              # 源码目录（开发都在这里进行）
│   ├─ assets/         # 放置需要经由 Webpack 处理的静态文件
│   ├─ components/     # 组件（COMPONENT）
│   ├─ redux/          # Redux 一箩筐
│   │   ├─ actions/      # （ACTION）
│   │   ├─ reducers/     # （REDUCER）
│   │   ├─ store/        # （STORE）
│   ├── routes/        # 路由（ROUTE）
│   ├── services/      # 服务（SERVICE，用于统一管理 XHR 请求，这是从 Vue Demo 中直接复制过来的）
│   ├── utils/         # 工具库（UTIL）
│   │   ├─ HoC/          # 高阶组件（HOC，全称 Higher Order Component）
│   │   ├─ mixins/       # 混合（MIXIN）
│   ├── views/         # 路由视图基页（VIEW）
│   │   ├─ layout/       # 全局布局
│   ├── app.js         # 启动文件
│   ├── index.html     # 静态基页
├── static/          # 放置无需经由 Webpack 处理的静态文件
├── .babelrc         # Babel 转码配置
├── .eslintignore    # （配置）ESLint 检查中需忽略的文件（夹）
├── .eslintrc        # ESLint 配置
├── .gitignore       # （配置）需被 Git 忽略的文件（夹）
├── package.json     # （这个就不用多解释了吧）
```

2. webpack.base.conf.js 超级详细解析

```
//=============================================================================
// 引入模块，第一个是node.js中内置的path模块
//      主要方法: 1. path.join([path1][, path2][, ...]) 
//                   连接路径，主要解决不同系统/还是\的问题
//                2. path.resolve([from ...], to)
//                   解析成绝对路径
//      参考资料: https://nodejs.org/docs/latest/api/path.html
// 第三个模块NyanProgressPlugin作用是进度条显示。
//      参考资料: https://www.npmjs.com/package/nyan-progress-webpack-plugin
//=============================================================================
var path = require('path'),
  webpack = require('webpack'),
  NyanProgressPlugin = require('nyan-progress-webpack-plugin');
//=============================================================================// 这一部分以及下边的alias看似麻烦，在实际开发中确实很有用的配置。
// 这样的配置使得我们在开发的时候引入文件不需要再去考虑路径是否正确的问题
// 1. __dirname : nodejs中的全局变量，指的是你当前文件的绝对路径。
//                后边的..类似于cmd中的cd ../,就是返回上一级，所以。
//                path.resolve(_dirname,'..')获取的是项目的根目录。
// 2. process.env.NODE_ENV.trim(),首先一定加trim()截取，为了避免一些bug,
//    然后前边的一串东西也是nodejs中的，主要作用是区分生产环境和开发环境。
//    本框架是有开发环境配置和生产环境配置的。
//=============================================================================
var rootPath = path.resolve(__dirname, '..'), // 项目根目录
  src = path.join(rootPath, 'src'), // 开发源码目录
  env = process.env.NODE_ENV.trim(); // 当前环境
var commonPath = {
  rootPath: rootPath,
  dist: path.join(rootPath, 'dist'), // build 后输出目录
  indexHTML: path.join(src, 'index.html'), // 入口基页
  staticDir: path.join(rootPath, 'static') // 无需处理的静态资源目录
};
//=============================================================================// webpack 核心配置区
//=============================================================================
module.exports = {
  //1. 引入我们上边配置的路径对象commonPath
  commonPath: commonPath,
  //===========================================================================
  //2. 入口文件配置，依然是根目录下的app.js
  // vendor是一个数组，我们可以将里面的组件单独打包，是本框架webpack优化点  
  // 实现单独打包需要用到webpack.optimize.CommonsChunkPlugin插件 
  //========================================================================== 
  entry: {
    app: path.join(src, 'app.js'),
    vendor: [
      'history',
      'lodash',
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-thunk'
    ]
  },
  //===========================================================================
  // 出口文件，就是我们打包到这个文件
  // path就是你存放打好的bundle.js的路径
  // publicPath 简单的说就是处理静态资源路径，比如图片引用时候才发挥出作用。
  // 参考: http://webpack.github.io/docs/configuration.html#output-path
  //===========================================================================
  output: {
    path: path.join(commonPath.dist, 'static'),
    publicPath: '/static/'
  },
  //==========================================================================
  // 这个很容易理解，第一个extensions表示require()的时候不用加这些后缀
  // 第二个是给这些路径设置别名，看起来麻烦,后边开发过程中引入模块就
  // 可以体现出其优势，这也是本框架优化点
  //==========================================================================
  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {
      ASSET: path.join(src, 'assets'),
      COMPONENT: path.join(src, 'components'),
      ACTION: path.join(src, 'redux/actions'),
      REDUCER: path.join(src, 'redux/reducers'),
      STORE: path.join(src, 'redux/store'),
      ROUTE: path.join(src, 'routes'),
      SERVICE: path.join(src, 'services'),
      UTIL: path.join(src, 'utils'),
      HOC: path.join(src, 'utils/HoC'),
      MIXIN: path.join(src, 'utils/mixins'),
      VIEW: path.join(src, 'views')
    }
  },
  // resolveLoader相当于是针对webpack Loader 的单独 resolve 
  // 配置，作用和resolve一样
  resolveLoader: {
    root: path.join(rootPath, 'node_modules')
  },
  //===========================================================================
  // 各种加载器配置
  // 先说最后一个eslint，其作用是检查代码规范
  // 其它的css,scss,less,html,json配置略过
  // babel的配置看起来很复杂，其实是通过一个IIFE返回一个字符串，跟研发部
  // 的babel表达的意思差不多，没采取他们那种格式是因为这样更灵活。
  // 比如，我们的babel配置是在开发环境使用热加载，生产环境不需要,而不是
  // 写死了的字符串，并且有些正则也做了优化
  //===========================================================================
  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      loaders: (function() {
        var _loaders = ['babel?' + JSON.stringify({
          cacheDirectory: true,
          plugins: [
            'transform-runtime',
            'transform-decorators-legacy'
          ],
          presets: ['es2015', 'react', 'stage-0'],
          env: {
            production: {
              presets: ['react-optimize']
            }
          }
        })];

        if (env === 'development') {
          _loaders.unshift('react-hot');
        }
        return _loaders;
      })(),
      include: src, //必须有的
      exclude: /node_modules/   //排除不管的
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.html$/,
      loader: 'html'
    }, {
      test: /\.(png|jpe?g|gif|svg)$/,
      loader: 'url',
      query: {
        limit: 10240, // 10KB 以下使用 base64
        name: 'img/[name]-[hash:6].[ext]'
      }
    }, {//这是font的loader
      test: /\.(woff2?|eot|ttf|otf)$/,
      loader: 'url-loader?limit=10240&name=fonts/[name]-[hash:6].[ext]'
    }]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  //===========================================================================
  // 插件配置
  // 第二个插件一般就是这样用的，用来设置process.env,也就是开发环境还是生产环境
  // 再下边的就是一些全局常量
  //===========================================================================
  plugins: [
    new NyanProgressPlugin(), // 进度条
    new webpack.DefinePlugin({
      'process.env': { // 这是给 React / Redux 打包用的
        NODE_ENV: JSON.stringify('production')
      },
      __DEV__: env === 'development',
      __PROD__: env === 'production',
      __COMPONENT_DEVTOOLS__: false, // 是否使用组件形式的 Redux DevTools
      __WHY_DID_YOU_UPDATE__: false // 是否检测不必要的组件重渲染
    })
  ]
};

```


3. webpack.dev.conf.js 开发环境配置解析

```
//=============================================================================
// HtmlWebpackPlugin--自动生产html插件
// ExtractTextPlugin--css分离打包插件
// BrowserSyncPlugin--自动打开浏览器插件
// 这里最重要的是source-map
// 这是webpack最容易混淆的地方。
// 参考阮一峰的文档: 
// http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html
// 以及: http://sanwen.net/a/ltjldpo.html
// 整个配置采取config.的方式来配置，更灵活和减少重复代码。
//=============================================================================
var webpack = require('webpack'),
  config = require('./webpack.base.conf'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
  SOURCE_MAP = false;
//============================================================================
// chunFilename,指的是没有在entry中定义，但是打包却需要打进去的文件
//============================================================================
config.output.filename = '[name].js';
config.output.chunkFilename = '[id].js';

config.devtool = SOURCE_MAP ? 'eval-source-map' : false;
//============================================================================
// 配置模块热切换，用的是中间件。webpack-hot-middleware
// 参考资料: https://www.npmjs.com/package/webpack-hot-middleware
//============================================================================
config.entry.app = [
  'eventsource-polyfill',
  'webpack-hot-middleware/client?reload=true',
  'webpack/hot/only-dev-server',
   config.entry.app
];

config.output.publicPath = '/';
//在这里配置css,scss,less,是为了可以方便热切换
config.module.loaders.push({
  test: /\.css$/,
  loader: 'style!css'
}, {
  test: /\.less$/,
  loader: 'style!css!less'
}, {
  test: /\.scss$/,
  loader: 'style!css!sass'
});
//=============================================================================
// 插件
//=============================================================================
config.plugins.push(
  new webpack.optimize.OccurenceOrderPlugin(),//优化插件，相当于给模块排序
  new webpack.HotModuleReplacementPlugin(),   //热切换插件
  new webpack.NoErrorsPlugin(),               //报错不会中断项目
  new ExtractTextPlugin('[name].css'),        //css分离
  new HtmlWebpackPlugin({                     //自动生成html
    filename: 'index.html',
    template: config.commonPath.indexHTML,
    chunksSortMode: 'none'
  }),
  //类似于研发部的代理设置，浏览器会在这个url自动打开页面
  new BrowserSyncPlugin({
    host: '127.0.0.1',
    port: 9090,
    proxy: 'http://127.0.0.1:9000/',
    logConnections: false,
    notify: false
  }, {
    reload: false
  })
);

module.exports = config;
```


3. webpack.prod.conf.js 生产环境配置
```
//=============================================================================// 生产环境配置不一样的主要是有大量的优化措施。
// 使得打包上线的时候可以有最好的性能，优化针对的主要是
// webpack
//============================================================================
var webpack = require('webpack'),
  config = require('./webpack.base.conf'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  CleanWebpackPlugin = require('clean-webpack-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  SOURCE_MAP = false;

config.output.filename = '[name].[chunkhash:6].js';
config.output.chunkFilename = '[id].[chunkhash:6].js'; //命名优化

config.devtool = SOURCE_MAP ? 'cheap-module-source-map' : false;

config.module.loaders.push({
  test: /\.css$/,
  loader: ExtractTextPlugin.extract('style', 'css')
}, {
  test: /\.less$/,
  loader: ExtractTextPlugin.extract('style', 'css!less')
}, {
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract('style', 'css!sass')
});
//==========================================================================
// 优化集中在插件
//==========================================================================
config.plugins.push(
  // 清楚一些多余的包
  new CleanWebpackPlugin('dist', {
    root: config.commonPath.rootPath,
    verbose: false
  }),
  // 拷贝静态资源
  new CopyWebpackPlugin([
    {
      context: config.commonPath.staticDir,
      from: '**/*',
      ignore: ['*.md','*.mdown']
    }
  ]),
  // 去重
  new webpack.optimize.DedupePlugin(),
  // 代码压缩
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  // 模块排序
  new webpack.optimize.OccurenceOrderPlugin(),
  // vendor分离打包
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor', 'mainifest']
  }),
  // 改善chunk运输
  new webpack.optimize.AggressiveMergingPlugin(),
  // 设置最小chunk
  new webpack.optimize.MinChunkSizePlugin({
    minChunkSize: 30000
  }),
  // css分离
  new ExtractTextPlugin('[name].[contenthash:6].css', {
    allChunks : true // 若要按需加载 CSS 则请注释掉该行
  }),
  new HtmlWebpackPlugin({
    filename: '../index.html',
    template: config.commonPath.indexHTML,
    chunksSortMode: 'none'
  })
);

module.exports = config;

```

4. dev.js 开发环境服务

```
//=============================================================================
// 用了nodejs的express框架
// app.use()... 指使用中间件
// 参考:https://segmentfault.com/a/1190000006851575
//=============================================================================
var express = require('express'),
  webpack = require('webpack'),
  // favicon = require('express-favicon'),
  config = require('./webpack.dev.conf'),
  app = express();

var compiler = webpack(config);

app.use('/static', express.static(config.commonPath.staticDir));

// app.use(favicon(path.join(__dirname, '../favicon.ico')));

app.use(require('connect-history-api-fallback')());

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));


app.use(require('webpack-hot-middleware')(compiler));

app.listen(9000, '127.0.0.1', function(err) {
  err && console.log(err);
});

```
5. prod.js 生产环境服务
```
//============================================================================
// 使用了nodejs的文件流模块fs
// 把打包信息写到对应的文件中
//============================================================================
var fs = require('fs'),
  path = require('path'),
  webpack = require('webpack'),
  config = require('./webpack.prod.conf');

webpack(config, function(err, stats) {
  console.log( stats.toString({ chunks: false, color: true }) );

  fs.writeFile(
    path.join(config.commonPath.dist, '__build_info__'),
    stats.toString({ color: false })
  );
});

```