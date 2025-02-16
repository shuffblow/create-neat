import ProtocolGeneratorAPI from "./ProtocolGeneratorAPI";

/**
 * 插件对构建工具协议
 * @param protocols 协议内容
 */
class PluginToBuildToolAPI extends ProtocolGeneratorAPI {
  constructor(protocols = {}, props = {}, protocol = {}) {
    super(protocols, props, protocol);
  }
}

export default PluginToBuildToolAPI;
