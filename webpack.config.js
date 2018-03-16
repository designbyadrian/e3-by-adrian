const HtmlWebPackPlugin = require("html-webpack-plugin");
const isDev = require('isdev');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const extractCSS = new ExtractTextPlugin({
  filename: 'app.css',
  allChunks: true,
  disable: isDev,
});

const copyPlugin = new CopyWebpackPlugin([
  {
    from: 'data.json',
    toType: 'file',
  },
  {
    from: 'src/assets',
    to: 'assets'
  }
]);

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(scss|sass)$/,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: !isDev,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [require('autoprefixer')]
              },
            },
            'sass-loader'
          ],
        }),
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      }
    ]
  },
  plugins: [
    extractCSS,
    copyPlugin,
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      filename: "./index.html"
    }),
  ]
};
