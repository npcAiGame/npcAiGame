// --------------------------------------------------------------------------------------
// 
// ChatGPT_APIMZ.js v1.3
//
// Copyright (c) kotonoha*（https://aokikotori.com/）
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
// 2023/04/13 ver1.0β プラグイン公開
//
// --------------------------------------------------------------------------------------
/*:
 * @target MZ
 * @plugindesc 与ChatGPT API通信，并由AI创建对话的插件
 * @author kotonoha*
 * @url https://github.com/kotonoha0109/kotonoha_tkoolMZ_Plugins/blob/main/plugins/ChatGPT_APIMZ.js
 *
 * @param ChatGPT_Model
 * @type string
 * @default gpt-3.5-turbo
 * @desc ChatGPT的AI模型
 *
 * @param ChatGPT_URL
 * @type string
 * @default https://api.openai.com/v1/chat/completions
 * @desc ChatGPT的URL
 * 如果使用服务器端，请填写该文件的URL
 *
 * @param ChatGPT_APIkey
 * @type string
 * @default sk-
 * @desc ChatGPT的API密钥（如果是数字则为变量ID，如果是字符串则为API密钥）
 * ※可以将API密钥存储在变量中。
 *
 * @param UserMessageVarId
 * @type variable
 * @default 1
 * @desc 存储玩家提问的变量ID
 *
 * @param AnswerMessageVarId
 * @type variable
 * @default 2
 * @desc 存储AI回答的变量ID
 *
 * @param MemoryMessageVarId
 * @type variable
 * @default 3
 * @desc 存储回答历史的变量ID
 *
 * @param VisibleSwitchID
 * @type switch
 * @default 
 * @desc 隐藏回答的开关ID
 * 当您只想将回答存储在变量中，不想显示时使用。
 *
 * @param BrStr
 * @type boolean
 * @default true
 * @desc 自动换行
 * 当回答中输出换行代码时，执行换行处理。
 *
 * @param ReplaceStr
 * @type string
 * @default 
 * @desc NG字符
 * 每个字符单独判断。例如，如果写“”，则括号不会显示。
 *
 * @param SystemMessage
 * @type multiline_string
 * @default Please answer in Japanese.
 * @desc 对AI的通用指示（例如“请用日语回答”或“请在120个字符内总结”等）
 *
 * @param FontFileName
 * @desc 指定要使用的字体文件名。
 * 请包括扩展名。
 * @type string
 * @default 
 * 
 * @param Layouts
 * @type struct<Layout>[]
 * @desc 定义窗口设计。
 * 使用LayoutVariableId的值来切换显示的窗口。
 * 
 * @param LayoutVariableId
 * @type variable
 * @desc 用于切换窗口设计的变量ID
 * @default 0
 * 
 * @command chat
 * @text 发送聊天信息
 * @desc 查询API的命令
 *
 * @arg system
 * @type multiline_string
 * @default 
 * @desc 对此事件的指示
 *
 * @arg message
 * @type multiline_string
 * @default 
 * @desc 对此事件的问题 ※当CuatomQuestionMessageVarId为0或者
 * 变量为空时，将反映此问题。
 *
 * @arg message_before
 * @type multiline_string
 * @default 
 * @desc 在这个问题之前添加的内容
 * 输入补充事项时使用。
 * 
 * @arg message_after
 * @type multiline_string
 * @default
 * @desc 在这个问题之后添加的内容
 * 输入补充事项时使用。
 * 
 * @arg displayHeader
 * @type string
 * @default
 * @desc 在回答前显示的内容
 * 输入userMessage时将替换为问题(message)。
 * 
 * @arg temperature
 * @type Number
 * @default 1
 * @desc 采样温度（0～1）
 * 值越低，相关性越高，值越高，生成的单词越多样
 *
 * @arg top_p
 * @type Number
 * @default 0.9
 * @desc 文章的多样性（0～1）
 * 值越低，一致性提高，值越高，文章更多样
 *
 * @arg max_tokens
 * @type Number
 * @default 512
 * @desc AI回答的最大令牌数（gpt-3.5-turbo最高4096）
 * 日语1个字符约等于2～3个令牌
 *
 * @arg memory_talk
 * @type Number
 * @default 10
 * @desc 保存的对话历史量
 * AI记住的对话内容数量（将1次问题+回答视为1）
*
 * @arg CuatomQuestionMessageVarId
 * @type variable
 * @default
 * @desc 存储此事件的问题的变量ID
 * 如果为空，则使用插件参数的设置。
 *
 * @arg CustomAnswerMessageVarId
 * @type variable
 * @default
 * @desc 存储此事件的回答的变量ID
 * 如果为空，则使用插件参数的设置。
 *
 * @arg CustomMemoryMessageVarId
 * @type variable
 * @default
 * @desc 存储此事件的历史记录的变量ID
 *
 * @arg support_message
 * @type multiline_string
 * @default
 * @desc 支持问题
 * 创建针对此事件的问题示例。
 * 
 * @arg support_answer
 * @type multiline_string
 * @default
 * @desc 支持回答
 * 创建针对支持问题的回答示例。
 * 
 * @arg characterName
 * @type string
 * @default
 * @desc 角色名
 * 在消息窗口上显示。
 * 
 * @arg faceImage
 * @type file
 * @default
 * @desc 角色的面部图形
 * 如果不显示，请留空。
 * @dir img/faces/
 * 
 * @arg faceIndex
 * @type number
 * @default
 * @desc 面部图形的索引
 * 在ツクールMZ的规定中，左上角为0〜3，右下角为4〜7。
 *
 * @help 一个与ChatGPT API通信并由AI创建对话的插件。
 * 需要设置自己的API密钥。

 *
 * 【注意】;
 * 请确保游戏玩家使用自己的API密钥！
 * 如果在作品中注册后公开，将会导致作者的API密钥泄露！
 * API密钥泄露或使用费用相关的问题需自行负责！
 * 
 * 【基本用法】;
 * (1) 请将在OpenAI获取的API密钥设置在ChatGPT_APIkey中。
 *
 * (2) 需要至少3个空闲的变量ID。
 * ・将玩家的问题临时存储在变量中。
 * 　请将空闲的变量ID设置在参数UserMessageVarId中。
 * ・将AI的回答临时存储在变量中。
 * 　请将空闲的变量ID设置在参数AnswerMessageVarId中。
 * ・将回答历史临时存储在变量中。
 * 　请将空闲的变量ID设置在参数MemoryMessageVarId中。
 *
 * (3) 在您希望AI创作台词的事件中，通过插件命令
 * 选择「ChatGPT_APIMZ」并注册角色设置。
 * 
 * 【插件命令说明】;
 * # system
 * 这是对事件的指示。它会被添加到插件参数的SystemMessage中，
 * 所以您可以在这个事件中给出补充的指示。
 * 例如，如果参数设置为“请用日语回答”，
 * 在这个事件中可以添加如“但是，请用片假名回答”的补充指示。
 *
 * # message
 * 这是对事件的问题。输入您希望AI回答的问题。
 * 但是，如果使用变量CuatomQuestionMessageVarId输入问题，
 * 请将此项留空。
 * 
 * # message_before, message_after
 * 当使用变量进行事件询问时，message会被替换为变量的值。
 * 在system中写的内容对GPT-3模型来说不是很重要，
 * 所以如果不遵循指令，可以尝试在这里输入。
 * 设置在变量前后添加到message角色的字符串。
 * 例如，如果变量的值是“你好”，message_before是“你”（你是），
 * message_after是“是吗？”（吗？），那么AI会被问到“你好？”（你好吗？）。
 * 
 * # displayHeader
 * 在消息窗口中显示的标题。
 * 如果要显示变量ID1的值，请输入\V[1]。
 * 此外，输入userMessage将显示除message_before、message_after之外的问题。
 * 
 * # temperature, top_p
 * 这些分别是决定AI回答的多样性的数值。
 * 请设置0～1之间的数值。
 * 
 * # max_tokens
 * 设置最大令牌数（日语1个字符约等于2～3个令牌）。
 * 您可以决定字符数量的上限，但如果响应的字符数小于最大令牌数，
 * 文章将在中途被截断。
 *
 * # memory_talk
 * 历史保存的数量。保存的是数值次的交流。
 * 如果设置的数值是5，则保存最近5次的交流。
 * 越多越能进行符合话题的对话，但是由于API需要发送历史记录的每个令牌，
 * 因此可能会增加使用费用。
 * 如果不需要保存，则设置为0。
 *
 * # CuatomQuestionMessageVarId
 * 这是输入到事件中的问题所在的变量ID。
 * 在名称输入窗口或聊天窗口中输入问题时，
 * 如果问题已保存在变量中，请指定该变量ID。
 * ※当这个变量和message同时设置时，message优先。
 * ※与插件参数的UserMessageVarId不同。
 *
 * # CustomAnswerMessageVarId
 * 这是存储此事件回答的变量ID。
 * 虽然保存在插件参数的AnswerMessageVarId中，
 * 但如果想要单独记录每个事件的回答，请指定此变量ID。
 *
 * # CustomMemoryMessageVarId
 * 这是存储此事件历史的变量ID。
 * 它作为通信API的数组记录，因此不能直接调用。
 * 如果想手动删除历史，请将此变量ID的变量清空。
 * 
 * # support_message, support_answer
 * 创建对话示例文。
 * AI在回答时，会参考这些示例文。
 * 如果support_message中输入“自我介绍”，
 * support_answer中输入“我是暹罗猫！5岁喵！”，
 * 这样输入后，下一次对话开始，AI会参考support_answer的示例文，
 * 使用“我是”作为第一人称，并倾向于在句尾加上“喵！”。
 * 
 * # characterName, faceName, faceIndex
 * 设置角色的名称、面部图像及其显示索引。
 * 面部图像请输入img/faces/中的文件名。
 * 如果不显示面部图像，请留空。
 * 索引是指面部图像从左到右的第几个。
 * 第一行为0～3，第二行为4～7。
 * 
 * 【它在浏览器版本中的工作原理】;
 * 本插件生成的消息窗口使用了HTML。
 * 在Web浏览器中播放时，消息窗口可能会大大超出游戏区域显示，
 * 因此，在这种情况下，请另外准备一个包含iframe的HTML，
 * 并在其中加载由ツクール生成的index.html。
 * 
 * 【自定义消息窗口】;
 * 如果您想自定义消息窗口的宽度、高度、位置、背景色，
 * 请修改function createStreamingTextElement()的内容。
 * 请使用窗口调整工具。
 * ▼窗口调整工具
 * https://aokikotori.com/chatgpt_apimz_window/
 * 
 * 【服务器端集成】;
 * 在服务器上设置PHP或Python等文件，
 * 可以将ChatGPT的请求头（如API密钥）保密。
 * ▼PHP示例在这里
 * https://github.com/kotonoha0109/kotonoha_tkoolMZ_Plugins/blob/main/plugins/php/request.php
 * 
 * 在PHP文件中设置API密钥，并上传到服务器后，
 * 请将插件参数的ChatGPT_URL更改为PHP文件的URL。
 * 插件参数的ChatGPT_APIkey不需要，请务必删除。

 */

/*~struct~Layout:
 *
 * @param template
 * @text 模板
 * @desc 选择窗口的模板。
 * design1〜3为模板，custom由用户设置。
 * @type select
 * @option custom
 * @option design1
 * @option design2
 * @option design3
 * @default custom
 * 
 * @param color
 * @text 文本颜色
 * @desc 窗口内的文本颜色。
 * @default white
 * 
 * @param fontSize
 * @text 字体大小
 * @desc 窗口内的文本字体大小。
 * @default 22px
 *
 * @param padding
 * @text 填充
 * @desc 窗口内的文本填充。
 * @default 16px
 * 
 * @param background
 * @text 背景
 * @desc 窗口的背景。可以指定颜色或渐变。
 * @default linear-gradient(to bottom, rgba(15,28,69,0.8), rgba(8,59,112,0.8))
 *
 * @param boxShadow
 * @text 阴影
 * @desc 窗口的阴影。
 * @default 
 * 
 * @param margin
 * @text 边距
 * @desc 窗口的边距。
 * @default 0 8px
 * 
 * @param borderColor
 * @text 边框颜色
 * @desc 窗口边框的颜色。
 * @default white
 *
 * @param borderWidth
 * @text 边框宽度
 * @desc 窗口边框的宽度。
 * @default 2px
 * 
 * @param borderStyle
 * @text 边框样式
 * @desc 窗口边框的样式。
 * @default solid
 * 
 * @param borderRadius
 * @text 边框圆角
 * @desc 窗口边框的圆角。
 * @default 5px
 * 
 */

(() => {

	const pluginParameters = PluginManager.parameters('ChatGPT_APIMZ');
	const userMessageVarId = Number(pluginParameters['UserMessageVarId']) || 1;
	const answerMessageVarId = Number(pluginParameters['AnswerMessageVarId']) || 2;
	const memoryMessageVarId = Number(pluginParameters['MemoryMessageVarId']) || 3;
	const visibleSwitchID = Number(pluginParameters['VisibleSwitchID']) || null;
	const replacestr = String(pluginParameters['ReplaceStr']) || "";
	const brstr = pluginParameters['BrStr'] === 'true' || pluginParameters['BrStr'] === true;
	const systemMessage = String(pluginParameters['SystemMessage']) || "Please answer in Japanese.";
	const fontFileName = pluginParameters['FontFileName'] || '';
	const layouts = JSON.parse(pluginParameters['Layouts']).map(layout => JSON.parse(layout));
	const layoutVariableId = Number(pluginParameters['LayoutVariableId']);

	let previousMessage = null;
	let isDoneReceived = false;
	let isFontLoaded = false;

	// 设置自定义字体
	if (fontFileName && fontFileName.trim() !== '') {
		const _Scene_Boot_loadGameFonts = Scene_Boot.prototype.loadGameFonts;
		Scene_Boot.prototype.loadGameFonts = function () {
			_Scene_Boot_loadGameFonts.call(this);
			FontManager.load('customFont', fontFileName);
		};
		const font = new FontFace('customFont', 'url("./fonts/' + fontFileName + '")');
		document.fonts.add(font);
		font.load().then(() => {
			addCustomFontStyle();
		}).catch((error) => {
			console.error('无法加载字体：', error);
		});
	}

	PluginManager.registerCommand("ChatGPT_APIMZ", "chat", async (args) => {

		// 初始化窗口
		updateStreamingTextElement();
		isDoneReceived = false;

		const temperature = Number(args.temperature) || 1;
		const top_p = Number(args.top_p) || 0.9;
		const max_tokens = Number(args.max_tokens) || 512;
		const customQuestionMessageVarId = Number(args.CuatomQuestionMessageVarId) || null;
		const customAnswerMessageVarId = Number(args.CustomAnswerMessageVarId) || null;

		let targetVarId = customQuestionMessageVarId !== null ? customQuestionMessageVarId : 0;
		let variableValue = $gameVariables.value(targetVarId);
		let userMessage;
		let displayHeader;
		let support_message;
		let support_answer;
		let faceImage = args.faceImage !== undefined ? String(args.faceImage) : null;
		let faceIndex = Number(args.faceIndex) || 0;
		let characterName = String(args.characterName) || '';

		// 如果变量 ID 未定义，则反映问题中的消息
		if (targetVarId !== 0 && !variableValue) {
			if (!args.message || args.message === '') { return; }
			if (!args.message_before) { args.message_before = ''; }
			if (!args.message_after) { args.message_after = ''; }
			userMessage = args.message_before + args.message + args.message_after;
			userMessage_input = args.message;
		} else if (targetVarId === 0 && (!args.message || args.message === '')) {
			// 如果变量和消息都为空，则将从进程中删除它。
			return;
		} else {
			// 否则，变量 customQuestionMessageVarId 将反映在问题中
			if (!args.message_before) { args.message_before = ''; }
			if (!args.message_after) { args.message_after = ''; }
			userMessage = variableValue ? args.message_before + variableValue + args.message_after : args.message_before + args.message + args.message_after;
			userMessage_input = variableValue ? variableValue : args.message;
		}

		// 处理控制字符
		userMessage = processControlCharacters(userMessage);
		$gameVariables.setValue(targetVarId, userMessage);

		if (userMessageVarId !== null) {
			$gameVariables.setValue(userMessageVarId, userMessage);
		}

		const customMemoryMessageVarId = Number(args.CustomMemoryMessageVarId) || memoryMessageVarId;
		let customMemoryMessage = $gameVariables.value(customMemoryMessageVarId);

		// 与内存无关的操作
		if (Number(args.CustomMemoryMessageVarId) === 0 || !args.memory_talk) {
			$gameVariables.setValue(memoryMessageVarId, []);
			previousMessage = "";
			customMemoryMessage = [];
			customMemoryMessage.push({ role: 'system', content: processControlCharacters(systemMessage) });
			// 添加命令端系统角色
			if (args.system) {
				customMemoryMessage.push({ role: 'system', content: (processControlCharacters(args.system) || "") });
			}
			// 推送支持问题和支持答案
			if (args.support_message && args.support_answer) {
				customMemoryMessage.push({ role: 'user', content: (processControlCharacters(args.support_message) || "") });
				customMemoryMessage.push({ role: 'assistant', content: (processControlCharacters(args.support_answer) || "") });
			}
			customMemoryMessage.push({ role: 'user', content: userMessage });
			$gameVariables.setValue(memoryMessageVarId, customMemoryMessage);

		} else {
			customMemoryMessage = $gameVariables.value(customMemoryMessageVarId);

			if (!Array.isArray(customMemoryMessage)) {
				customMemoryMessage = [];
				previousMessage = "";
				customMemoryMessage.push({ role: 'system', content: processControlCharacters(systemMessage) });
				// 添加命令端系统角色
				if (args.system) {
					customMemoryMessage.push({ role: 'system', content: (processControlCharacters(args.system) || "") });
				}
				// 推送支持问题和支持答案
				if (args.support_message && args.support_answer) {
					customMemoryMessage.push({ role: 'user', content: (processControlCharacters(args.support_message) || "") });
					customMemoryMessage.push({ role: 'assistant', content: (processControlCharacters(args.support_answer) || "") });
				}
				customMemoryMessage.push({ role: 'user', content: userMessage });

			} else {

				// 执行记忆对话的过程
				const memoryTalk = Number(args.memory_talk) * 2 || 1;
				customMemoryMessage.push({ role: 'user', content: userMessage });

				while (true) {
					let userCount = customMemoryMessage.filter(item => item.role === 'user').length;
					let assistantCount = customMemoryMessage.filter(item => item.role === 'assistant').length;

					if (userCount + assistantCount > memoryTalk) {
						let userIndex = customMemoryMessage.findIndex(item => item.role === 'user');
						let assistantIndex = customMemoryMessage.findIndex(item => item.role === 'assistant');

						if (userIndex >= 0 && assistantIndex >= 0) {
							customMemoryMessage.splice(Math.min(userIndex, assistantIndex), 2);
						} else {
							break;
						}
					} else {
						break;
					}
				}

			}
			$gameVariables.setValue(customMemoryMessageVarId, customMemoryMessage);
		}

		const streamingTextElement = document.getElementById('streamingText');
		addCustomFontStyle();
		if ($gameSwitches.value(visibleSwitchID) !== true) {
			streamingTextElement.style.display = 'block';
		}

		streamingTextElement.innerHTML = '';
		//console.log(customMemoryMessage);

		(async () => {

			const ChatGPT_Model = String(pluginParameters['ChatGPT_Model']) || 'gpt-3.5-turbo';
			const ChatGPT_URL = String(pluginParameters['ChatGPT_URL']) || 'https://api.openai.com/v1/chat/completions';

			// 当非输出开关关闭时，事件停止。
			if ($gameSwitches.value(visibleSwitchID) !== true) {
				$gameMap._interpreter.setWaitMode('waitChatGPT');
				// 流式传输时停止事件的移动
				const event = $gameMap.event($gameMap._interpreter.eventId());
				if (event) {
					currentEvent = event;
					event._originalDirectionFix = event.isDirectionFixed();
					event.setDirectionFix(true);
					event._originalMoveType = event._moveType;
					event._moveType = 0;
				}
			}

			// 与 ChatGPT API 通信
			const url = ChatGPT_URL;

			try {

				const response = await fetch(url, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + getChatGPT_APIkey(),
					},
					body: JSON.stringify({
						model: ChatGPT_Model,
						temperature: temperature,
						top_p: top_p,
						max_tokens: max_tokens,
						stream: true,
						messages: customMemoryMessage,
					}),
				});
				//console.log(customMemoryMessage);

				if (!response.ok) {
					const errorText = await response.text();
					const errorJson = JSON.parse(errorText);
					let errorMessage = String(errorJson.error.message).slice(0, 30);
					// 从 API 输出消息
					console.error('Error:', errorMessage);
					errorMessage = await getJapaneseErrorMessage(errorMessage);
					$gameMessage.add(errorMessage);
					isDoneReceived = true;
					unlockControlsIfNeeded();
					return;
				}

				// 事件执行
				const reader = response.body.getReader();
				const textDecoder = new TextDecoder();
				let buffer = '';
				let streamBuffer = '';
				let textArray = [];

				if (!args.displayHeader) args.displayHeader = "";
				let preMessage = processControlCharacters(args.displayHeader);
				preMessage = preMessage.replace(/userMessage/g, userMessage_input);

				// 面部图形设置
				if (faceImage !== null && faceImage !== "") {
					if (!faceIndex) { faceIndex = 0; }
					const faceWidth = 144;
					const faceHeight = 144;
					const facesPerRow = 4;
					const facesPerCol = 2;
					const faceX = faceWidth * (faceIndex % facesPerRow);
					const faceY = faceHeight * Math.floor(faceIndex / facesPerRow);
					const faceImageUrl = '<img src="img/faces/' + faceImage + '.png" style="object-fit: none; object-position: -' + faceX + 'px -' + faceY + 'px; width: ' + faceWidth + 'px; height: ' + faceHeight + 'px; float: left; margin-right: 20px;">';
					textArray = [preMessage, faceImageUrl];
				} else {
					textArray = [preMessage];
				}

				// 设置角色名称
				if (args.characterName) {
					textArray.push(processControlCharacters(args.characterName) + "<br>");
				}

				// 与 ChatGPT 交流
				while (true) {

					const { value, done } = await reader.read();
					if (done) { break; }
					buffer += textDecoder.decode(value, { stream: true });

					let newlineIndex;

					do {

						newlineIndex = buffer.indexOf('\n');
						if (newlineIndex === -1) { break; }
						const line = buffer.slice(0, newlineIndex);
						buffer = buffer.slice(newlineIndex + 1);

						if (line.startsWith('data:')) {

							// 到达流文本末尾时的 Resume 事件
							if (line.includes('[DONE]')) {
								previousMessage = streamBuffer;
								// 将答案分配给变量 ID
								let targetAnswerVarId = customAnswerMessageVarId !== null ? customAnswerMessageVarId : answerMessageVarId;
								// 将答案分配给助理角色
								customMemoryMessage.push({ role: 'assistant', content: previousMessage });
								$gameVariables.setValue(targetAnswerVarId, previousMessage);
								// 活动恢复
								isDoneReceived = true;
								return;
							}

							const jsonData = JSON.parse(line.slice(5));

							// 显示流文本
							if (jsonData.choices && jsonData.choices[0].delta && jsonData.choices[0].delta.content) {

								let assistantMessage = jsonData.choices[0].delta.content;

								// 单独存储为助手角色的流缓冲区
								streamBuffer += assistantMessage;

								// <br>将换行符转换为
								if (brstr === true) { assistantMessage = assistantMessage.replace(/\n/g, "<br>"); }
								assistantMessage = removeChars(assistantMessage, replacestr);

								// 输出
								textArray.push(assistantMessage);
								const combinedText = textArray.join('');
								const processedText = processControlCharacters(combinedText);
								streamingTextElement.innerHTML = processedText;
								//console.log(textArray);

								// 滚动以适合输出
								setTimeout(() => {
									streamingTextElement.scrollTop = streamingTextElement.scrollHeight;
								}, 0);

							}
						}
					} while (newlineIndex !== -1);
				}

			} catch (error) {
				console.error('Error:', error);
				let errorMessage = error;
				errorMessage = await getJapaneseErrorMessage(errorMessage);
				$gameMessage.add(errorMessage);
				isDoneReceived = true;
				unlockControlsIfNeeded();
				return;
			}

		})();

	});

	// 替换 API 密钥
	function getChatGPT_APIkey() {
		const APIKey = String(pluginParameters['ChatGPT_APIkey']) || 'sk-';
		const apiKeyVarId = parseInt(APIKey, 10);
		if (Number.isInteger(apiKeyVarId) && $gameVariables && $gameVariables.value(apiKeyVarId)) {
			return $gameVariables.value(apiKeyVarId);
		} else {
			return APIKey;
		}
	}

	// 删除 NG 字符
	const removeChars = (str, chars) => {
		const escapeRegExp = (str) => {
			return str.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
		};
		const escapedChars = escapeRegExp(chars);
		const regex = new RegExp(`[${escapedChars}]`, 'g');
		return str.replace(regex, '');
	}

	// 处理控制字符
	function processControlCharacters(str) {
		return str.replace(/\\([VNPI])\[(\d+)\]|\\G/g, function (matchedString, type, id) {
			if (matchedString === '\\G') {
				return TextManager.currencyUnit;
			}
			const numId = Number(id);
			switch (type) {
				case 'V':
					return String($gameVariables.value(numId));
				case 'N':
					return String($gameActors.actor(numId).name());
				case 'P':
					return String($gameParty.members()[numId - 1].name());
				default:
					return '';
			}
		});
	}

	// 设置自定义字体
	function addCustomFontStyle() {
		if (!isFontLoaded) {
			const style = document.createElement('style');
			style.textContent = `#streamingText {font-family: 'customFont';}`;
			document.head.appendChild(style);
			isFontLoaded = true;
		}
	}

	// 实现等待模式
	const _Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
	Game_Interpreter.prototype.updateWaitMode = function () {
		if (this._waitMode === "waitChatGPT") {
			const streamingTextElement = document.getElementById("streamingText");

			if (!streamingTextElement) {
				$gameMap._interpreter.setWaitMode('');
				if (typeof currentEvent !== 'undefined' && currentEvent) {
					currentEvent.setDirectionFix(currentEvent._originalDirectionFix);
					currentEvent._moveType = currentEvent._originalMoveType;
					currentEvent = null;
				}
				isDoneReceived = true;
				return false;
			}
			return true;
		}
		return _Game_Interpreter_updateWaitMode.call(this);
	};

	// 控制窗口滚动以及打开和关闭
	const scrollSpeed = 30; // 用于调整滚动速度的常量
	const _Scene_Map_update = Scene_Map.prototype.update;
	Scene_Map.prototype.update = function () {
		_Scene_Map_update.call(this);
		if (streamingTextElement && streamingTextElement.style.display !== "none") {
			if (Input.isPressed("up")) {
				streamingTextElement.scrollTop -= scrollSpeed;
			} else if (Input.isPressed("down")) {
				streamingTextElement.scrollTop += scrollSpeed;
			}
			if ((Input.isTriggered("ok") || Input.isTriggered("cancel") || TouchInput.isCancelled()) && isScrollAtEnd(streamingTextElement)) {
				unlockControlsIfNeeded();
			} else {
				if (Input.isTriggered("ok") || Input.isTriggered("cancel") || TouchInput.isCancelled()) {
					streamingTextElement.scrollTop = streamingTextElement.scrollHeight;
				}
			}
		}
	};

	const _Game_Map_isEventRunning = Game_Map.prototype.isEventRunning;
	Game_Map.prototype.isEventRunning = function () {
		const isElementVisible = streamingTextElement && streamingTextElement.style.display !== "none";
		return _Game_Map_isEventRunning.call(this) || isElementVisible;
	};

	function isScrollAtEnd(element) {
		return element.scrollTop + element.clientHeight >= element.scrollHeight;
	}

	// 事件恢复处理
	function unlockControlsIfNeeded() {
		if (isDoneReceived && streamingTextElement.scrollHeight - streamingTextElement.clientHeight <= streamingTextElement.scrollTop + 1) {
			streamingTextElement.style.display = 'none';
			streamingTextElement.innerHTML = '';
			if (typeof currentEvent !== 'undefined' && currentEvent) {
				currentEvent.setDirectionFix(currentEvent._originalDirectionFix);
				currentEvent._moveType = currentEvent._originalMoveType;
				currentEvent = null;
			}
			$gameMap._interpreter.setWaitMode('');
			isDoneReceived = true;
		}
	}

	// 错误输出
	async function getJapaneseErrorMessage(errorMessage) {
		if (errorMessage.includes("That model is currently")) {
			return "服务器太忙，无法生成答案。";
		} else if (errorMessage.includes("You exceeded your current quota")) {
			return "超出 API 限制。";
		} else if (errorMessage.includes("Incorrect API key provided")) {
			return "API 密钥不同。 请输入正确的 API 密钥。";
		} else {
			return errorMessage;
		}
	}

	// 生成流式处理窗口
	function createStreamingTextElement() {
		const windowHeight = window.innerHeight;
		const streamingTextHeight = 200;
		streamingTextElement = document.createElement('div');
		streamingTextElement.id = 'streamingText';
		streamingTextElement.style.display = 'none';
		streamingTextElement.style.position = 'fixed';
		streamingTextElement.style.zIndex = 100;
		streamingTextElement.style.left = '0';
		streamingTextElement.style.width = '800px';
		streamingTextElement.style.top = `${windowHeight - streamingTextHeight - 16}px`;
		streamingTextElement.style.boxSizing = 'border-box';
		streamingTextElement.style.boxShadow = '';
		streamingTextElement.style.height = '200px';
		streamingTextElement.style.color = 'white';
		streamingTextElement.style.fontSize = '22px';
		streamingTextElement.style.padding = '16px';
		streamingTextElement.style.background = 'linear-gradient(to bottom, rgba(15,28,69,0.8), rgba(8,59,112,0.8))';
		streamingTextElement.style.margin = '0 8px';
		streamingTextElement.style.borderWidth = '2px';
		streamingTextElement.style.borderStyle = 'solid';
		streamingTextElement.style.borderColor = 'white';
		streamingTextElement.style.borderRadius = '5px';
		streamingTextElement.style.overflowY = 'auto';
		applyLayout();
		document.body.appendChild(streamingTextElement);

	}
	createStreamingTextElement();

	// 调整屏幕大小时调整消息窗口
	function updateStreamingTextElement() {

		// 获取 Maker 的当前屏幕尺寸和浏览器的屏幕尺寸
		const canvasWidth = Graphics.width;
		const canvasHeight = Graphics.height;
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;
		const scaleX = windowWidth / canvasWidth;
		const scaleY = windowHeight / canvasHeight;
		const scale = Math.min(scaleX, scaleY);
		const adjustedWidth = canvasWidth * scale;
		const adjustedHeight = canvasHeight * scale;

		// 调整消息窗口的宽度和高度以适合屏幕大小
		let streamingTextHeight = Math.min(200 * scale, 250);
		streamingTextElement.style.width = `${adjustedWidth - 16}px`;
		streamingTextElement.style.height = `${streamingTextHeight}px`;

		// 调整字体大小以适合屏幕大小
		let limitedFontSize = Math.min(Math.max(22 * scale, 16), 28);
		streamingTextElement.style.fontSize = `${limitedFontSize}px`;

		// 调整消息窗口的位置以适合屏幕大小
		const topPosition = (windowHeight - adjustedHeight) / 2 + adjustedHeight - streamingTextHeight - 16 * scaleY;
		streamingTextElement.style.top = `${topPosition}px`;
		streamingTextElement.style.left = `${(windowWidth - adjustedWidth) / 2}px`;
		applyLayout();

	}

	// 检查调整大小
	window.addEventListener('resize', () => {
		updateStreamingTextElement();
	});

	// 创建布局模板
	function applyLayout() {
		if (streamingTextElement && $gameVariables) {
			const layoutIndex = $gameVariables.value(layoutVariableId);
			if (layoutIndex >= 1 && layoutIndex <= layouts.length) {
				const layout = layouts[layoutIndex - 1];

				let template;
				switch (layout.template) {
					case 'design1':
						template = { color: '#FFF', background: 'rgba(0, 0, 0, 0.7)', boxShadow: '0 0 0 3px #6d83bf inset', borderColor: 'rgb(165, 207, 239)', borderWidth: '3px', borderStyle: 'solid', borderRadius: '5px' };
						break;
					case 'design2':
						template = { color: '#FFF', background: '#000', borderColor: '#FFF', borderWidth: '5px', borderStyle: 'solid', borderRadius: '12px' };
						break;
					case 'design3':
						template = {
							color: '#FFF',
							background: 'linear-gradient(180deg, #7b7bd6 0, #7b7bd6 5%,#7373ce 5%, #7373ce 10%,#6b6bc6 10%, #6b6bc6 15%,#6363bd 15%, #6363bd 20%,#5a5ab5 20%, #5a5ab5 25%,#5252ad 25%, #5252ad 30%,#4a4aa5 30%, #4a4aa5 35%,#42429c 35%, #42429c 40%,#393994 40%, #393994 45%,#31318c 45%, #31318c 50%,#292984 50%, #292984 55%,#21217b 55%, #21217b 60%,#181873 60%, #181873 65%,#10106b 65%, #10106b 70%,#080863 70%, #080863 75%,#00005a 75%, #00005a 80%,#000052 80%, #000052 85%,#00004a 85%, #00004a 90%,#000042 90%, #000042 95%,#000039 95%, #000039 100%)',
							borderColor: '#FFF', borderWidth: '6px', borderStyle: 'ridge', borderRadius: '12px'
						};
						break;
					default:
						template = layout;
						break;
				}

				streamingTextElement.style.color = template.color;
				streamingTextElement.style.fontSize = template.fontSize;
				streamingTextElement.style.padding = template.padding;
				streamingTextElement.style.background = template.background;
				streamingTextElement.style.boxShadow = template.boxShadow;
				streamingTextElement.style.margin = template.margin;
				streamingTextElement.style.borderColor = template.borderColor;
				streamingTextElement.style.borderWidth = template.borderWidth;
				streamingTextElement.style.borderStyle = template.borderStyle;
				streamingTextElement.style.borderRadius = template.borderRadius;
			}
		}
	}

})();
