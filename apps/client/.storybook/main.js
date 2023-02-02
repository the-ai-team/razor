const rootMain = require('../../../.storybook/main');

const config = {
  ...rootMain,
  core: { ...rootMain.core, builder: 'webpack5' },
  stories: [
    ...rootMain.stories,
    '../src/components/**/*.stories.mdx',
    '../src/components/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [...rootMain.addons, '@nrwl/react/plugins/storybook'],
  webpackFinal: async (config, { configType }) => {
    // apply any global webpack configs that might have been specified in .storybook/main.ts
    if (rootMain.webpackFinal) {
      config = await rootMain.webpackFinal(config, { configType });
    }

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
};

module.exports = config;
