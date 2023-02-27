// apps/my-app/webpack.config.js
const { composePlugins, withNx } = require('@nrwl/webpack');
const { withReact } = require('@nrwl/react/plugins/webpack');

module.exports = composePlugins(
  withNx(),
  withReact(),
  (config, { options, context }) => {
    config.module.rules = config.module.rules.map(rule => {
      if (/file-loader/.test(rule.loader)) {
        return {
          ...rule,
          type: 'javascript/auto',
        };
      }

      return rule;
    });
    return config;
  },
);
