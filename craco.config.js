// craco.config.js
const path = require('path');
const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Add the buffer polyfill
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        process: require.resolve('process/browser'),
        buffer: require.resolve('buffer/'),
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        
      };


      // Add ProvidePlugin to make Buffer available globally
      const webpack = require('webpack');
      webpackConfig.plugins = [
        ...webpackConfig.plugins,
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser',
        })
      ];

       // Ensure all `mjs` files are properly resolved
       webpackConfig.resolve.extensions = ['.js', '.jsx', '.mjs', '.json'];

      return webpackConfig;
    }
  }
};
