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
   * @param params.config 配置
   * @param params.buildTool 构建工具选择
   */
  ADD_COMPILER_CONFIG(params) {
    const { config, buildTool } = params;
    console.log("协议里面", config, buildTool);
    const buildToolConfigAst = this.props.buildToolConfigAst;
    createConfigByParseAst(buildTool, config, buildToolConfigAst);
  }
}

export default PluginToBuildToolAPI;
