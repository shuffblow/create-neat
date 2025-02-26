import { createConfigByParseAst } from "../../utils/ast/parseAst";

import ProtocolGeneratorAPI from "./ProtocolGeneratorAPI";

/**
 * 插件对构建工具协议
 * @param protocols 协议内容
 */
class PluginToBuildToolAPI extends ProtocolGeneratorAPI {
  constructor(protocols = {}, props = {}, protocol = {}) {
    super(protocols, props, protocol);
  }
  generator() {
    for (const protocol in this.protocols) {
      this[protocol](this.protocols[protocol]);
    }
  }

  /**
   * 编译器类插件协议
   * @param params
   */
  ADD_COMPILER_CONFIG(params) {
    const { config } = params;
    console.log("在这里", params);
    //这样就解决了普通插件和特殊插件的配置插入问题，比如如果是个特殊插件或者是框架独有的，可以用 content 插入，而普通的通用插件，则使用第二种方式插入。
    const { buildTool } = this.props.preset;
    const buildToolConfigAst = this.props.buildToolConfigAst;
    const options = {
      rules: [config],
      plugins: [],
    };
    createConfigByParseAst(buildTool, options, buildToolConfigAst);
    // for (const plugin in plugins) {
    //   if (Object.prototype.hasOwnProperty.call(plugins, plugin)) {
    //     // 确保只遍历对象自身的属性
    //     const entryPath = `@plugin/plugin-${plugin}/index.cjs`;
    //     // 执行 plugin或模板的入口文件，把 config 合并到构建工具原始配置中
    //     const baseEntry = await this.loadModule(
    //       entryPath,
    //       path.resolve(__dirname, relativePathToRoot),
    //     );
    //     // 处理构建工具配置
    //     if (typeof baseEntry === "function") {
    //       // 解析配置项成 ast 语法树,并且和原始配置的 ast 合并

    //     }
    //   }
    // }
  }
}

export default PluginToBuildToolAPI;
