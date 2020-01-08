/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 *
 */
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

// exports.onCreateBabelConfig = ({ actions: { setBabelPlugin } }) => {
exports.onCreateBabelConfig = args => {
  const {
    actions: { setBabelPlugin },
  } = args;
  setBabelPlugin({
    name: 'babel-plugin-tailwind-components',
    options: {
      config: './tailwind.config.js',
      format: 'auto',
    },
  });
};

// Fix sourcemap issue
// See: https://github.com/gatsbyjs/gatsby/issues/6278#issuecomment-402540404
exports.onCreateWebpackConfig = ({ stage, actions }) => {
  if (stage === 'develop') {
    actions.setWebpackConfig({
      devtool: 'cheap-module-source-map',
      resolve: {
        plugins: [new TsconfigPathsPlugin()],
        // alias: {
        //   // There should be only one instance of react in the project,
        //   // otherwise react hooks will not work.
        //   react: pathUtil.resolve('../../node_modules', 'react'),
        // },
      },
    });
  }
};
