// ==UserScript==
// @name         视频号小店
// @name:zh-CN   视频号小店
// @namespace    
// @version      1.4
// @description  快捷添加库存
// @author       僵尸先生
// @match        https://channels.weixin.qq.com/shop/*
// @license      AGPL-3.0
// @icon         
// @grant GM_setValue
// @grant GM_getValue
// @grant GM_getTab
// ==/UserScript==

(() => {
    "use strict";
    //模拟键盘输入
    var url_open
    function simulateKeyboardInput(element, text)
    {
        let event = new Event('input', { bubbles: true });
        element.value = text;
        element.dispatchEvent(event);
    }

    //let btn_write = null

    function modify_inventory(input_id, number)
    {
        let bo = true;
        let btn_t = setInterval(function() {
            if (url_open.document.readyState === 'complete' && input_id.value === url_open.document.querySelectorAll('.flex')[10].children[0].textContent)
            {
                if(bo)
                {
                    url_open.document.querySelector('.icon_img').click()
                    bo = false;
                }

                let input_inventory_all = url_open.document.querySelectorAll('.weui-desktop-form__input')
                if (url_open.document.readyState === 'complete')
                {
                    setTimeout(function() {
                        url_open.document.querySelectorAll('#app .weui-desktop-tooltip.weui-desktop-tooltip__up-left')[1].click()
                        simulateKeyboardInput(input_inventory_all[0], number)
                    }, 100);

                    setTimeout(function() {
                            url_open.document.querySelectorAll('#app .weui-desktop-btn.weui-desktop-btn_default')[1].click()
                        }, 400);
                }

                setTimeout(function() {
                    let btn_all = url_open.document.querySelectorAll('#app .weui-desktop-btn.weui-desktop-btn_primary')
                    btn_all[1].click();
                    btn_all[2].click();
                }, 500);
                clearInterval(btn_t)
            }
        })
    }


    function main_click(number)
    {
        
        let input_id = url_open.document.querySelector('.ignore_default_input')
        if (input_id)
        {
            input_id.select()
            if (!navigator.clipboard)
            {
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
        let btn_all = url_open.document.querySelectorAll('#app .weui-desktop-btn.weui-desktop-btn_default')
            // 定义一个定时器
        let input_timer = setInterval(function() {
            if (input_id.value.length === 14)
            {
                btn_all[0].click();
                // 停止定时器
                clearInterval(input_timer);
            }
        }, 200);
        modify_inventory(input_id, number)

        setTimeout(function() {
            btn_all[0].click()

            setTimeout(function() {
                let temp = url_open.document.querySelectorAll('.goods_price.WeChatSansStdRegular')[1].innerText
                if(number !== parseInt(temp))
                {
                    modify_inventory(input_id, number)
                }
            }, 800);
        }, 1300);

    }

    // 监听键盘按下事件
    document.addEventListener('keydown', function(event)
    {
        // 判断按下的是哪个键
        if (event.key === 'Home')
        {

            // 打开网页
            
            url_open = open(document.getElementsByName('goods')[0].appUrl)
            //open_url = open("https://channels.weixin.qq.com/shop/ssr/goods/list?token=2083904492");
            // let btn_weui = document.querySelector("#app .weui-desktop-btn_wrp")
            // btn_write = document.createElement("button")
            // btn_write.textContent = "写入"
            // btn_write.className = "weui-desktop-btn weui-desktop-btn_default"
            // btn_write.addEventListener('click', () => {
            //     // 在按钮被点击时执行的操作
            //     btn_write.style.backgroundColor = '#ff0000'; // 设置背景颜色为红色
            //     btn_write.style.boxShadow = '0 0 5px rgba(0, 0, 0, 0.5)'; // 添加阴影效果
            //     if(14 === document.querySelector('#app .ignore_default_input').value.length)
            //     {
            //         console.log('a')

            //     }
            //     //document.querySelector('#app .icon_img').click()
            //     // 移除按钮的背景颜色和阴影效果
            //     btn_write.removeAttribute('style');

            //   });
            // //btn_wrp_weui.insertBefore(btn_write, btn_wrp_weui.children[0])
            // btn_weui.insertBefore(btn_write, btn_weui.children[0])

        }
        else if((event.shiftKey && event.keyCode >= 96 && event.keyCode <= 105))
        {
            if(url_open === undefined)
            {
                alert('当前数据为空，请按Home键获取数据（打开的窗口不能关闭）')
            }
            let number = null
            number = event.keyCode - 96
            main_click(number)

        }
        else if(event.altKey && event.keyCode >= 96 && event.keyCode <= 105)
        {
            if(url_open === undefined)
            {
                alert('当前数据为空，请按Home键获取数据（打开的窗口不能关闭）')
            }
            let number = null
            if(96 === event.keyCode)
            {
                number = 100
            }
            else
            {
                number = (event.keyCode - 96) * 10
            }
            main_click(number)
        }
     })




})();