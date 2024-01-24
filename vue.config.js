const webpack = require("webpack");
module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
      }),
    ],
  },
  transpileDependencies: [
    'axios',
  ],
  devServer: {
    allowedHosts: 'all',
    webSocketServer: false, // 이 부분을 수정했습니다
    client: {
      overlay: {
        // 개발환경에서만 빨간 경고창 표시. 배포환경에서는 안보임
        warnings: process.env.NODE_ENV === 'development',
        errors: process.env.NODE_ENV === 'development'
      }
    }
  },
};


// const webpack = require("webpack");
// module.exports = {
//   configureWebpack: {
//     plugins: [
//       new webpack.DefinePlugin({
//         __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
//       }),
//     ],
//   },
//   transpileDependencies: [
//     'axios',
//   ],
//   devServer: {
//     allowedHosts: 'all',
//     ws: false // 여기에 ws 설정을 false로 추가했습니다.
//   },
// };
