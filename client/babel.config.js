/* eslint-disable no-undef */

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "babel-plugin-root-import",
        {
          rootPathSuffix: "./",
          rootPathPrefix: "@/",
        },
      ],
    ],
    env: {
      production: {
        plugins: [
          "babel-plugin-root-import",
          {
            rootPathSuffix: "./",
            rootPathPrefix: "@/",
          },
        ],
      },
    },
  };
};
