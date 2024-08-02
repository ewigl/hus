// ==UserScript==
// @name         HIFINI 音乐磁场 增强
// @namespace    https://github.com/ewigl/hus
// @version      0.1.0
// @description  一键自动回复
// @author       Licht
// @license      MIT
// @homepage     https://github.com/ewigl/hus
// @match        http*://www.hifini.com/thread-*.htm
// @icon         https://www.hifini.com/favicon.ico
// @grant        GM_addStyle
// ==/UserScript==

;(function () {
    'use strict'

    const styleCSS = `
    #hus_quick_reply_button {
        position: sticky;
        top: 16px;
    }
    `

    GM_addStyle(styleCSS)

    const constants = {
        ASIDE_CLASS: 'aside',
        QUICK_REPLY_BUTTON_ID: 'hus_quick_reply_button',
        QUICK_REPLY_FORM_ID: 'quick_reply_form',
        QUICK_REPLY_INPUT_ID: 'message',
        QUICK_REPLY_SUBMIT_ID: 'submit',
    }

    const config = {
        replies: ['666', 'Good.', 'Nice.', 'Thanks.', '给力', '谢谢', '谢谢分享', '谢谢大佬', '感谢', '感谢分享', '感谢大佬'],
    }

    const utils = {
        getRandomReply() {
            return config.replies[Math.floor(Math.random() * config.replies.length)]
        },
    }

    const operation = {
        quickReply() {
            $(`#${constants.QUICK_REPLY_FORM_ID} #${constants.QUICK_REPLY_INPUT_ID}`).focus()

            $(`#${constants.QUICK_REPLY_FORM_ID} #${constants.QUICK_REPLY_INPUT_ID}`).val(utils.getRandomReply())

            $(`#${constants.QUICK_REPLY_SUBMIT_ID}`).click()
            //   or
            //   $("#quick_reply_form").submit();
        },
    }

    const initAction = {
        addButtons() {
            const quickReplyButtonDom = `<a id="${constants.QUICK_REPLY_BUTTON_ID}" class="btn btn-light btn-block mb-3">自动回复</a>`
            $(`.${constants.ASIDE_CLASS}`).append(quickReplyButtonDom)
        },
        addListeners() {
            $(document).on('click', `#${constants.QUICK_REPLY_BUTTON_ID}`, operation.quickReply)
        },
    }

    // Main
    const main = {
        init() {
            initAction.addButtons()
            initAction.addListeners()
        },
    }

    main.init()
})()
