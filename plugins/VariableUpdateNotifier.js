// --------------------------------------------------------------------------
// 
// VariableUpdateNotifier.js ver1.0
//
// Copyright (c) kotonoha*（https://aokikotori.com/）
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
// 2023/05/17 ver1.0 公開
// 
// --------------------------------------------------------------------------
/*:
 * @target MZ
* @plugindesc 当变量更新时，在屏幕上输出消息的插件
* @author kotonoha*

*
* @param XPosition
* @text X 坐标
* @desc 消息显示位置的 X 坐标
* @type number
* @default 16
*
* @param YPosition
* @text Y 坐标
* @desc 消息显示位置的 Y 坐标
* @type number
* @default 16
*
* @param Variables
* @text 目标变量
* @desc 要监视的变量ID列表（逗号分隔）
* @type string
* @default 1,2,3
*
* @help
* 当变量更新时，在屏幕上输出消息。

 * 
 */

(() => {

    const pluginName = "VariableUpdateNotifier";
    const parameters = PluginManager.parameters(pluginName);
    const xPosition = Number(parameters["XPosition"]);
    const yPosition = Number(parameters["YPosition"]);
    const targetVariables = parameters["Variables"]
      .split(",")
      .map((variableId) => Number(variableId));
  
    function VUN_createHtmlMessage(text) {
      const messageDiv = document.createElement("div");
      messageDiv.style.position = "absolute";
      messageDiv.style.left = `${xPosition}px`;
      messageDiv.style.top = `${yPosition}px`;
      messageDiv.style.fontSize = "16px";
      messageDiv.style.color = "#ffffff";
      messageDiv.style.textShadow = "1px 1px #000000";
      messageDiv.style.zIndex = 1000;
      messageDiv.innerHTML = text;
      document.body.appendChild(messageDiv);
  
      setTimeout(() => {
        messageDiv.remove();
      }, 3000);
    }
  
    const _Game_Variables_setValue = Game_Variables.prototype.setValue;
    Game_Variables.prototype.setValue = function (variableId, value) {
      const oldValue = this.value(variableId);
      _Game_Variables_setValue.call(this, variableId, value);
  
      if (oldValue !== value && targetVariables.includes(variableId)) {
        const text = `変数:${variableId}が更新されました`;
        VUN_createHtmlMessage(text);
        console.log(text);
      }
    };

})();
  
  
  
  