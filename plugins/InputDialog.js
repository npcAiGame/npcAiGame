// --------------------------------------------------------------------------
// 
// InputDialog.js
//
// Copyright (c) kotonoha*
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
// 2023/04/12 ver1.0 プラグイン公開
// 
// --------------------------------------------------------------------------
/*:
* @target MZ
* @plugindesc 使用键盘输入文字，并将输入内容存储到变量中的插件
* @author kotonoha*

*
* @command openDialog
* @text 显示文本输入
* @desc 显示文本输入窗口。
*
* @arg varId
* @text 变量ID
* @desc 存储输入的文本的变量ID
* @type variable
* @default
*
* @arg defaultText
* @text 消息
* @desc 指定促使文本输入的消息。
* @default 请输入您的文本。
*
* @arg defaultValue
* @text 默认值
* @desc 指定在输入框中显示的初始值。
* @default
*
* @help
* 请在插件命令中选择“InputDialog”，并分别设置变量ID、消息和默认值。
* 您将能够在键盘上进行文本输入。输入的字符将存储在指定的变量ID中。
* 如果输入为空或取消，则输入 0。

 * 
 */

(() => {
  
  const pluginName = 'InputDialog';

  PluginManager.registerCommand(pluginName, 'openDialog', args => {
    const varId = Number(args.varId);
    const defaultText = args.defaultText;
    const defaultValue = args.defaultValue;
    const text = window.prompt(defaultText, defaultValue);
    $gameVariables.setValue(varId, text ? text : '');
  });

})();
