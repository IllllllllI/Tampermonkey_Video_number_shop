// ==UserScript==
// @name         Remove_Live
// @name:zh-CN   去除B站直播间播放器
// @namespace    https://blog.chrxw.com
// @version      1.1
// @description  去除B站多余的直播播放器（滑稽）
// @author       Chr_
// @match        https://channels.weixin.qq.com/shop/*
// @license      AGPL-3.0
// @icon         https://blog.chrxw.com/favicon.ico
// ==/UserScript==

(() => {
    "use strict";
    let open_url = open("https://channels.weixin.qq.com/shop/ssr/goods/list?token=2083904492");
    open_url.document.querySelectorAll("#app button.weui-desktop-btn.weui-desktop-btn_default")[0].click();
        
    
})();