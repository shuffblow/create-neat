const protocol = require("../../../core/src/configs/protocol.ts");
const pluginToBuildToolProtocol = protocol.pluginToBuildToolProtocol;

module.exports = (generatorAPI, template, buildTool) => {
  const buildToolConfigGenerators = {
    webpack: ({ test }) => {
      const baseRule = {
        test,
        include: [
          {
            __astType: "pathResolve",
            args: ["./src"],
          },
        ],
        exclude: [/node_modules/, /public/, /(.|_)min\.js$/],
        use: [{ loader: "swc-loader" }],
      };

      return {
        rules: [baseRule],
        plugins: [],
      };
    },
    vite: () => ({
      plugins: [
        {
          name: "vite-plugin-swc",
          transform: (code, id) => {
            if (id.match(/\.(jsx?|tsx?)$/)) {
              return require("@swc/core").transformSync(code, {
                filename: id,
              }).code;
            }
          },
        },
      ],
    }),
    rollup: () => ({
      plugins: [require("@rollup/plugin-swc")],
    }),
  };

  let test;

  if (template === "react") {
    test = /\.(ts|tsx|js|jsx)$/;
  } else if (template === "vue") {
    test = /\.(ts|js)$/;
  }

  const buildToolConfig = buildToolConfigGenerators[buildTool]({ test });

  generatorAPI.extendPackage({
    // swc 的文件内容↓
    swc: {
      jsc: {
        parser: {
          syntax: "typescript",
          tsx: true,
          jsx: true,
        },
        transform: {
          react: {
            runtime: "automatic",
          },
        },
      },
    },
    devDependencies: {
      "@swc/core": "^1.5.6",
      "@swc/helpers": "^0.5.11",
      "swc-loader": "^0.2.6",
    },
  });

  generatorAPI.protocolGenerate({
    [pluginToBuildToolProtocol.ADD_COMPILER_CONFIG]: {
      config: buildToolConfig,
      buildTool,
    },
  });
};
