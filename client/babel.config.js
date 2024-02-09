/* eslint-disable no-undef */

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["react-native-reanimated/plugin",
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          /**
           * Regular expression is used to match all files inside `./src` directory and map each `.src/folder/[..]` to `~folder/[..]` path
           */
          '^@/(.+)': './\\1',
        },
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.jsx',
          '.json',
          '.tsx',
          '.ts',
          '.native.js',
        ],
      },
    ],],

    // plugins: [
    //   [
    //     "babel-plugin-root-import",
    //     {
    //       rootPathSuffix: "./",
    //       rootPathPrefix: "@/",
    //     },
    //   ],
    // ],
    // env: {
    //   production: {
    //     plugins: [
    //       "babel-plugin-root-import",
    //       {
    //         rootPathSuffix: "./",
    //         rootPathPrefix: "@/",
    //       },
    //     ],
    //   },
    // },
  };
};
