// ==UserScript==
// @name         视频号小店
// @name:zh-CN   视频号小店
// @namespace    https://blog.chrxw.com
// @version      1.2
// @description  快捷添加库存
// @author       僵尸先生
// @match        https://channels.weixin.qq.com/*
// @license      AGPL-3.0
// @icon         https://blog.chrxw.com/favicon.ico
// ==/UserScript==

(() => {
    "use strict";
    // 监听键盘按下事件
    let open_url = null
    document.addEventListener('keydown', function(event) {
        // 判断按下的是哪个键
        if (event.key === 'Home') {
            // 执行特定的操作或功能
            open_url = open("https://channels.weixin.qq.com/shop/ssr/goods/list?token=2083904492");
            console.log('按下了a键')
        } else if (event.key === 'b') {
            console.log('按下了b键')
    }
    // 可以根据需要添加更多的按键映射
  });

    let btn_weui = document.querySelector("#app button.weui-desktop-btn.weui-desktop-btn_default");
    let btn_write = document.createElement("button");
    btn_write.textContent = "写入"
    open_url.document.querySelectorAll("#app button.weui-desktop-btn.weui-desktop-btn_default")[0].click();

})();