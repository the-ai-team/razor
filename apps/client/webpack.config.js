// apps/my-app/webpack.config.js
const { composePlugins, withNx } = require('@nrwl/webpack');
const { withReact } = require('@nrwl/react/plugins/webpack');

// https://github.com/nrwl/nx/issues/14378#issuecomment-1405312953
module.exports = composePlugins(
  withNx(),
  withReact(),
  (config, { options, context }) => {
    config.module.rules = config.module.rules.map(rule => {
      if (/file-loader/.test(rule.loader)) {
        return {
          ...rule,
          test: /\.(eot|cur|jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/, 
          type: 'javascript/auto',
        };
      }

      return rule;
    });

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    });

    return config;
  },
);
