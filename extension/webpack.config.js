const path = require('path');

module.exports = {
  entry: {
    content: './src/content.ts',
    background: './src/background.ts',
  },
  mode: 'production',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'out'),
  },
};
