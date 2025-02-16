// const path = require("path");
module.exports = {
  rules: [
    {
      test: /\.(ts|tsx|js|jsx)$/,
      include: [
        {
          __astType: "pathResolve",
          args: ["./src"],
        },
      ],
      exclude: [/node_modules/, /public/, /(.|_)min\.js$/],
      use: [
        {
          loader: "babel-loader",
        },
      ],
    },
  ],
  plugins: [],
};
