// --------------------------------------------------------------------------
// 
// InputDialog_Custom.js ver1.04
//
// Copyright (c) kotonoha*（https://aokikotori.com/）
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
// 2023/04/27 ver1.0 公開
// --------------------------------------------------------------------------
/*:
 * @target MZ
* @plugindesc 在游戏内放置文本输入窗口的插件
* 您可以创建原始的输入窗口。
*
* @param fontFileName
* @text 字体文件名
* @desc 指定要使用的字体文件名。
* 请包括扩展名。
* @type string
* @default 
* 
* @param formWidth
* @text 表单宽度
* @desc 指定表单的宽度。
* @default 400px
* 
* @param formHeight
* @text 表单高度
* @desc 指定表单的高度。
* @default auto
*
* @param formBackgroundColor
* @text 表单背景色
* @desc 指定表单的背景色。
* @default rgba(0, 0, 0, 0.5)
*
* @param formBorder
* @text 表单边框信息
* @desc 指定表单的边框信息。
* @default 3px solid #fff
*
* @param formBorderRadius
* @text 表单边框半径
* @desc 指定表单的边框半径。
* @default 5px
*
* @param formPadding
* @text 表单内边距
* @desc 指定表单的内边距。
* @default 30px
*
* @param labelTextColor
* @text 显示文本的文字颜色
* @desc 指定显示文本的文字颜色。
* @default #FFFFFF
* 
* @param labelTextFontSize
* @text 显示文本的文字大小
* @desc 指定显示文本的文字大小。
* @default 18px
*
* @param labelTextMarginBottom
* @text 显示文本下方的间距
* @desc 指定显示文本下方的间距。
* @default 10px
*
* @param inputWidth
* @text 文本表单宽度
* @desc 指定文本表单的宽度。
* @default 100%
*
* @param inputHeight
* @text 文本表单高度
* @desc 指定文本表单的高度。
* @default 40px
* 
* @param inputFontSize
* @text 文本表单的文字大小
* @desc 指定文本表单的文字大小。
* @default 18px
* 
* @param inputColor
* @text 文本表单的文字颜色
* @desc 指定文本表单的文字颜色。
* @default #FFFFFF
*  
* @param inputBackgroundColor
* @text 文本表单的背景色
* @desc 指定文本表单的背景色。
* @default rgba(0, 0, 0, 0.5)
* 
* @param inputBorder
* @text 文本表单的边框信息
* @desc 指定文本表单的边框。
* @default 1px solid #fff
* 
* @param inputBorderRadius
* @text 文本表单的边框半径
* @desc 指定文本表单的边框半径。
* @default 5px
 *
 * @param inputPadding
* @text 文本表单的内边距
* @desc 指定文本表单的内边距。
* @default 5px
* 
* @param inputFontSize
* @text 文本表单的字体大小
* @desc 指定文本表单的字体大小。
* @default 18px
*
* @param buttonContainerWidth
* @text 按钮容器的宽度
* @desc 指定按钮容器的宽度。
* @default 100%
* 
* @param buttonContainerMargin
* @text 按钮容器的外边距
* @desc 指定按钮容器的外边距。
* @default 15px 0 0 0
* 
* @param okButtonWidth
* @text 确认按钮的宽度
* @desc 指定确认按钮的宽度。
* @default 120px
* 
* @param okButtonHeight
* @text 确认按钮的高度
* @desc 指定确认按钮的高度。
* @default 40px
* 
* @param okButtonFontSize
* @text 确认按钮的字体大小
* @desc 指定确认按钮的字体大小。
* @default 18px
* 
* @param okButtonColor
* @text 确认按钮的文字颜色
* @desc 指定确认按钮的文字颜色。
* @default #FFFFFF
* 
* @param okButtonBackgroundColor
* @text 确认按钮的背景色
* @desc 指定确认按钮的背景色。
* @default rgba(0, 0, 0, 0.5)
* 
* @param okButtonBorder
* @text 确认按钮的边框信息
* @desc 指定确认按钮的边框信息。
* @default 1px solid #fff
*
* @param okButtonBorderRadius
* @text 确认按钮的边框半径
* @desc 指定确认按钮的边框半径。
* @default 5px
*
* @param okButtonPadding
* @text 确认按钮的内边距
* @desc 指定确认按钮的内边距。
* @default 5px 10px
* 
* @param cancelButtonWidth
* @text 取消按钮的宽度
* @desc 指定取消按钮的宽度。
* @default 120px
* 
* @param cancelButtonHeight
* @text 取消按钮的高度
* @desc 指定取消按钮的高度。
* @default 40px
*
* @param cancelButtonFontSize
* @text 取消按钮的字体大小
* @desc 指定取消按钮的字体大小。
* @default 18px
* 
* @param cancelButtonColor
* @text 取消按钮的文字颜色
* @desc 指定取消按钮的文字颜色。
* @default #FFFFFF
* 
* @param cancelButtonBackgroundColor
* @text 取消按钮的背景色
* @desc 指定取消按钮的背景色。
* @default rgba(0, 0, 0, 0.5)
*
* @param cancelButtonBorder
* @text 取消按钮的边框信息
* @desc 指定取消按钮的边框信息。
* @default 1px solid #fff
*
* @param cancelButtonBorderRadius
* @text 取消按钮的边框半径
* @desc 指定取消按钮的边框半径。
* @default 5px
*
* @param cancelButtonPadding
* @text 取消按钮的内边距
* @desc 指定取消按钮的内边距。
* @default 5px 10px
*
* @param cancelButtonMarginLeft
* @text 取消按钮的左边距
* @desc 指定取消按钮的左边距。
* @default 10px
*
* @command openDialog
* @text 显示文本输入
* @desc 显示文本输入窗口。
*
* @arg varId
* @text 变量ID
* @desc 存储输入文本的变量ID
* @type variable
* @default
*
* @arg defaultText
* @text 提示消息
* @desc 指定提示输入文本的消息。
* @default 请输入您的文本。
*
* @arg defaultValue
* @text 默认值
* @desc 指定输入字段的初始值。
* @default
*
* @arg okButtonLavel
* @text 确认按钮文字
* @desc 指定确认按钮的文字。
* @default OK
* 
* @arg cancelButtonLavel
* @text 取消按钮文字
* @desc 指定取消按钮的文字。
* @default 取消
*
* @arg maxLength
* @text 最大字符数
* @desc 指定可输入的最大字符数。
* @default 64
* 
* @help
* 在插件命令中选择“InputDialog_Custom”，
* 分别设置变量ID、消息和默认值。
* 游戏屏幕上将显示文本输入窗口，
* 可以使用键盘进行文字输入。
* 
* 如果要在键盘上确认输入，请使用Shift键+Enter键，而不是单独的Enter键。
* 在某处显示此信息会很方便。
* 输入的文本将存储在指定的变量ID中。
* 空输入或取消将输入0。
* 
* 【注意！】
* 如果在插件命令之后立即执行其他插件或脚本，
* 可能会同时执行。如果想按顺序执行，
* 请在此插件命令和下一个事件之间插入几帧的等待时间。
 * 
 */

(() => {

  const pluginName = 'InputDialog_Custom';
  const parameters = PluginManager.parameters("InputDialog_Custom");
  const fontFileName = parameters['fontFileName'] || '';

  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  const style = document.createElement('style');

  if (fontFileName && fontFileName.trim() !== '') {

    const _Scene_Boot_loadGameFonts = Scene_Boot.prototype.loadGameFonts;
    Scene_Boot.prototype.loadGameFonts = function () {
      _Scene_Boot_loadGameFonts.call(this);
      FontManager.load('customFont', fontFileName);
    };

    const font = new FontFace('customFont', 'url("./fonts/' + fontFileName + '")');
    document.fonts.add(font);
    //font.load().then(() => { // 表示にタイムラグが発生する場合はここのコメントアウト除去
    style.textContent = `form, input, button {font-family: 'customFont';}`;
    document.head.appendChild(style);
    //}); // 如果显示时出现延迟，请取消这里的注释

  }

  const _Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
  Game_Interpreter.prototype.updateWaitMode = function() {
    if (this._waitMode === "waitInputForm") {
      const form = document.getElementById("inputForm");
      if (!form) {
        this.setWaitMode("");
        return false;
      }
      return true;
    }
    return _Game_Interpreter_updateWaitMode.call(this);
  };
  
  PluginManager.registerCommand(pluginName, 'openDialog', function (args) {

    $gameMap._interpreter.setWaitMode('waitInputForm');

    const varId = Number(args.varId);
    const defaultText = args.defaultText;
    const defaultValue = args.defaultValue;
    const okButtonLavel = args.okButtonLavel;
    const cancelButtonLavel = args.cancelButtonLavel;
    const maxLength = args.maxLength;

    // キャンバスの配置
    const form = createHtmlForm(varId, defaultValue, defaultText, okButtonLavel, cancelButtonLavel, maxLength);

   // 布置画布
    form.addEventListener('touchstart', stopPropagation);

    const canvas = document.getElementById("gameCanvas");
    const rect = canvas.getBoundingClientRect();
    form.style.left = "50%";
    form.style.top = "50%";
    form.style.transform = "translate(-50%, -50%)";

    document.body.appendChild(form);

    // テキスト入力欄にフォーカス
    form.elements["textInput"].focus();

    // ウィンドウリサイズ時にウィンドウを中央に配置
    const onResize = () => {
      form.style.left = "50%";
      form.style.top = "50%";
      form.style.transform = "translate(-50%, -50%)";
    };

    window.addEventListener("resize", onResize);

    // ウィンドウを閉じた時の処理
    form.addEventListener("close", () => {
      document.body.removeChild(form);
      document.head.removeChild(style);
    });

  });

  // キャンバスの作成
  function createHtmlForm(varId, defaultValue, defaultText, okButtonLavel, cancelButtonLavel, maxLength) {

    const form = document.createElement("form");
    const labelText = document.createElement("div");
    const input = document.createElement("input");
    const style = document.createElement("style");
    const buttonContainer = document.createElement("div");
    const okButton = document.createElement("button");
    const cancelButton = document.createElement("button");

    form.id = "inputForm";
    form.autocomplete = "off";
    input.id = "textInput";
    input.type = "text";
    input.inputmode = "text";
    input.maxLength = maxLength;
    okButton.type = "button";
    cancelButton.type = "button";

    // フォームのスタイル作成 
    form.style.position = "absolute";
    form.style.width = parameters["formWidth"];
    form.style.height = parameters["formHeight"];
    form.style.backgroundColor = parameters["formBackgroundColor"];
    form.style.border = parameters["formBorder"];
    form.style.borderRadius = parameters["formBorderRadius"];
    form.style.padding = parameters["formPadding"];
    form.style.display = "flex";
    form.style.flexDirection = "column";
    form.style.justifyContent = "space-between";
    form.style.alignItems = "center";
    form.style.zIndex = "1000";
    form.style.boxSizing = "border-box";

    // テキスト要素のスタイル作成
    labelText.innerText = defaultText;
    labelText.style.color = parameters["labelTextColor"];
    labelText.style.fontSize = parameters["labelTextFontSize"];
    labelText.style.marginBottom = parameters["labelTextMarginBottom"];

    // テキストフォームのスタイル作成
    input.value = defaultValue;
    input.style.width = parameters["inputWidth"];
    input.style.color = parameters["inputColor"];
    input.style.backgroundColor = parameters["inputBackgroundColor"];
    input.style.height = parameters["inputHeight"];
    input.style.border = parameters["inputBorder"];
    input.style.fontSize = parameters["inputFontSize"];
    input.style.padding = parameters["inputPadding"];
    input.style.borderRadius = parameters["inputBorderRadius"];
    input.style.boxSizing = "border-box";

    // ボタンコーナーのスタイル作成
    buttonContainer.style.display = "flex";
    buttonContainer.style.justifyContent = "space-around";
    buttonContainer.style.width = parameters["buttonContainerWidth"];
    buttonContainer.style.margin = parameters["buttonContainerMargin"];

    // OKボタンのスタイル作成
    okButton.innerText = okButtonLavel;
    okButton.style.backgroundColor = parameters["okButtonBackgroundColor"];
    okButton.style.color = parameters["okButtonColor"];
    okButton.style.width = parameters["okButtonWidth"];
    okButton.style.height = parameters["okButtonHeight"]
    okButton.style.border = parameters["okButtonBorder"];
    okButton.style.fontSize = parameters["okButtonFontSize"];
    okButton.style.borderRadius = parameters["okButtonBorderRadius"];
    okButton.style.padding = parameters["okButtonPadding"];
    okButton.style.cursor = parameters["cursorStyle"];
    okButton.style.cursor = "pointer";

    // キャンセルボタンのスタイル作成
    cancelButton.innerText = cancelButtonLavel;
    cancelButton.style.backgroundColor = parameters["cancelButtonBackgroundColor"];
    cancelButton.style.color = parameters["cancelButtonColor"];
    cancelButton.style.width = parameters["cancelButtonWidth"];
    cancelButton.style.height = parameters["cancelButtonHeight"]
    cancelButton.style.border = parameters["cancelButtonBorder"];
    cancelButton.style.fontSize = parameters["cancelButtonFontSize"];
    cancelButton.style.borderRadius = parameters["cancelButtonBorderRadius"];
    cancelButton.style.padding = parameters["cancelButtonPadding"];
    cancelButton.style.marginLeft = parameters["cancelButtonMarginLeft"];
    cancelButton.style.cursor = "pointer";

    // 入力欄のフォーカス
    style.innerHTML = `input:focus {outline: 0px solid #fff !important;}`;
    document.head.appendChild(style);

    // 送信処理のキャンセル
    form.addEventListener("contextmenu", (event) => {
      event.preventDefault();
    });
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    // 変換中かどうかをチェック
    let isComposing = false;
    input.addEventListener("compositionstart", () => {
      isComposing = true;
    });
    input.addEventListener("compositionend", () => {
      isComposing = false;
    });

    // キー入力時の処理
    input.addEventListener("keydown", (event) => {

      // Backspaceキーを機能させる
      if (event.key === "Backspace" && !isComposing) {
        event.preventDefault();
        const startPos = input.selectionStart;
        const endPos = input.selectionEnd;
        if (startPos !== null && endPos !== null && startPos !== endPos) {
          const value = input.value;
          input.value = value.slice(0, startPos) + value.slice(endPos);
          input.selectionStart = input.selectionEnd = startPos;
        } else if (startPos !== null && startPos > 0) {
          const value = input.value;
          input.value = value.slice(0, startPos - 1) + value.slice(startPos);
          input.selectionStart = input.selectionEnd = startPos - 1;
        }
      } else if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
        // カーソルキーを機能させる
        event.preventDefault();
        const direction = event.key === "ArrowRight" ? 1 : -1;
        const startPos = input.selectionStart;
        const endPos = input.selectionEnd;
        if (startPos !== null && endPos !== null) {
          const newPosition = Math.max(Math.min(startPos + direction, input.value.length), 0);
          input.selectionStart = input.selectionEnd = newPosition;
        }
      } else if (event.key === "Enter") {
        if (event.shiftKey) {
          // Enter+Shiftで決定動作
          event.preventDefault();
          form.dispatchEvent(new Event("submit"));
          okButton.onclick();
        } else {
          // Enterキー単体で押された場合、イベントをキャンセル
          event.preventDefault();
        }
      }
    });

    // BackSpaceキーの無効化
    const _Input_onKeyDown = Input._onKeyDown;
    Input._onKeyDown = function (event) {
      if (event.key === "Backspace") {
        return;
      }
      _Input_onKeyDown.call(this, event);
    };

    // OKボタンの処理
    okButton.onclick = async () => {
      const inputValue = document.getElementById("textInput").value;
      $gameVariables.setValue(varId, inputValue ? inputValue : '');
      removeHtmlForm();
    };

    // キャンセルボタンの処理
    cancelButton.onclick = () => {
      removeHtmlForm();
    };

    buttonContainer.appendChild(okButton);
    buttonContainer.appendChild(cancelButton);
    form.appendChild(labelText);
    form.appendChild(input);
    form.appendChild(buttonContainer);
    return form;

  }

  // 入力フォームの除去
  function removeHtmlForm() {
    const form = document.getElementById("inputForm");
    if (form) {
      form.removeEventListener('touchstart', stopPropagation);
      document.body.removeChild(form);
      $gameMap._interpreter.setWaitMode("");
    }
  }

})();
