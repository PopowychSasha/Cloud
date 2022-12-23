import path from 'path'

export default {
  mode: 'development',
  watch: true,
  entry: {
    filename: path.resolve('src', 'index.js'),
  },
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.js',
  },
  devServer: {
    port: 3000,
    compress: true,
    hot: true,
    static: {
      directory: path.resolve('.'),
    },
    proxy: [
      {
        path: '/api/',
        target: 'http://localhost:5000',
      },
    ],
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              [
                '@babel/plugin-transform-react-jsx',
                {
                  pragma: 'jsx',
                  pragmaFrag: 'Fragment',
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}
