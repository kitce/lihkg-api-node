import path from 'path';
import type webpack from 'webpack';

const config: webpack.Configuration = {
  mode: 'production',
  entry: path.join(process.cwd(), './src/lib/main.ts'),
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader'
      }
    ]
  },
  output: {
    filename: 'main.js',
    path: path.join(process.cwd(), './dist/lib')
  }
};

export default config;
