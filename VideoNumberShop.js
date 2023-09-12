// ==UserScript==
// @name         Video number script
// @namespace    none
// @version      0.1
// @description  new script
// @author       You
// @match        *://*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @license AGPL-3.0
// @grant        none
// ==/UserScript==

(() =>{
    'use strict';
    let open_url = open('https://channels.weixin.qq.com/shop/ssr/goods/list?token=2083904492');
    console.log('list');
})();