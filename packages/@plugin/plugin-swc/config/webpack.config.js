module.exports = {
  rules: [
    {
      test: /\.(ts|tsx|js|jsx)$/,
      exclude: [/node_modules/, /public/, /(.|_)min\.js$/],
      include: [
        {
          __astType: "pathResolve",
          args: ["./src"],
        },
      ],
      use: [
        {
          loader: "swc-loader",
        },
      ],
    },
  ],
};
