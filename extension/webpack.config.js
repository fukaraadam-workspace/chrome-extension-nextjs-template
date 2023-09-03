const path = require('path');

module.exports = {
  entry: './src/index.ts',
  mode: 'production',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'content.js',
    path: path.resolve(__dirname, 'out'),
  },
};
