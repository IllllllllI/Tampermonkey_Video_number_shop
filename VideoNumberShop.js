// ==UserScript==
// @name         视频号小店
// @name:zh-CN   视频号小店
// @namespace    https://greasyfork.org/zh-CN/scripts
// @version      1.5.1
// @description  快捷添加库存
// @author       僵尸先生
// @match        https://channels.weixin.qq.com/*
// @license      AGPL-3.0
// @icon         
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_getTab
// ==/UserScript==

(() => {
    "use strict";
    //模拟键盘输入
    function simulateKeyboardInput(element, text) {
        let event = new Event('input', { bubbles: true });
        element.value = text;
        element.dispatchEvent(event);
    }
    var btn_all
    var input_id
    function main(number) {
        // 在这里选择你要操作的input元素
        input_id = document.querySelector('.ignore_default_input') // 请替换为你的input的ID
        // 检查input元素是否存在
        if (input_id) {
            input_id.select()
            if (!navigator.clipboard) {
                console.log('浏览器不支持Clipboard API');
                return;
            }
            // 获取剪贴板中的数据
            navigator.clipboard.readText()
                .then(text => {
                    simulateKeyboardInput(input_id, text);
                })
                .catch(err => {
                    console.error('从剪贴板中获取数据失败：', err);
                });
        }
        btn_all = document.querySelectorAll('#app .weui-desktop-btn.weui-desktop-btn_default')
        // 定义一个定时器
        let input_timer = setInterval(function () {
            if (input_id.value.length === 14) {
                btn_all[0].click();
                // 停止定时器
                clearInterval(input_timer);
            }
        }, 200);

        // 定义一个定时器
        let bo = true;
        let btn_t = setInterval(function () {
            if (document.readyState === 'complete' && input_id.value === document.querySelectorAll('.flex')[10].children[0].textContent) {
                if (bo) {
                    document.querySelector('.icon_img').click()
                    bo = false;
                }
                let temp_text = document.querySelector('.item-basic-spu').innerText
                if (temp_text.slice(temp_text.indexOf('-') - 14, temp_text.indexOf('-')) === input_id.value) {
                    let input_inventory_all = document.querySelectorAll('.weui-desktop-form__input')
                    setTimeout(function () {
                        document.querySelectorAll('#app .weui-desktop-tooltip.weui-desktop-tooltip__up-left')[1].click()
                        simulateKeyboardInput(input_inventory_all[0], number)
                        if (document.readyState === 'complete') {
                            setTimeout(function () {
                                document.querySelectorAll('#app .weui-desktop-btn.weui-desktop-btn_default')[1].click()
                            }, 300);
                            setTimeout(function () {
                                let btn_all_all = document.querySelectorAll('#app .weui-desktop-btn.weui-desktop-btn_primary')
                                btn_all_all[1].click();
                                btn_all_all[2].click();
                            }, 400);
                        }

                    }, 100);
                    //停止定时器
                    clearInterval(btn_t)
                }

            }
        }, 200);
    }


    // 监听键盘按下事件
    document.addEventListener('keydown', function (event) {
        // 判断按下的是哪个键
        if (event.key === 'Home') {
            // 打开数据
            open(document.getElementsByName('goods')[0].appUrl)

        }
        else if ((event.ctrlKey && event.keyCode >= 96 && event.keyCode <= 105) || (event.altKey && event.keyCode >= 96 && event.keyCode <= 105)) {
            let number = null
            if (event.ctrlKey) {
                number = event.keyCode - 96
            }
            else if (event.altKey && event.keyCode === 96) {
                number = 100
            }
            else {
                number = (event.keyCode - 96) * 10
            }

            main(number)

            let con = setInterval(function () {
                if (document.readyState === 'complete') {
                    btn_all[0].click()
                    setTimeout(function () {
                        if (document.readyState === 'complete') {
                            let temp = document.querySelectorAll('.goods_price.WeChatSansStdRegular')[1].innerText
                            if (number !== parseInt(temp)) {
                                main(number)
                            }
                        }
                    }, 500);
                    clearInterval(con);
                }

            }, 2500);

        }
    })



})();