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

var open_url = null;    
(() => {
    "use strict";
    //let open_url = null;
    if(!open_url)
    {
        open_url = open("https://channels.weixin.qq.com/shop/ssr/goods/list?token=2083904492");
    }
    let btn_weui = document.querySelector("#app button.weui-desktop-btn.weui-desktop-btn_default");
    let btn_write = document.createElement("button");
    btn_write.textContent = "写入";
    open_url.document.querySelectorAll("#app button.weui-desktop-btn.weui-desktop-btn_default")[0].click();
        
})();