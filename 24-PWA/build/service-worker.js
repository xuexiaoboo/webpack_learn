if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return i[e]||(r=new Promise((async r=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=r}else importScripts(e),r()}))),r.then((()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]}))},r=(r,i)=>{Promise.all(r.map(e)).then((e=>i(1===e.length?e[0]:e)))},i={require:Promise.resolve(r)};self.define=(r,s,t)=>{i[r]||(i[r]=Promise.resolve().then((()=>{let i={};const n={uri:location.origin+r.slice(1)};return Promise.all(s.map((r=>{switch(r){case"exports":return i;case"module":return n;default:return e(r)}}))).then((e=>{const r=t(...e);return i.default||(i.default=r),i}))})))}}define("./service-worker.js",["./workbox-a8dfc45d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"index.html",revision:"ecd86ec27d99f659204ea05dc5a8c643"},{url:"js/built.d6414ff2f5.js",revision:null},{url:"media/1feff74faaf0efc6a044355c92cd15d9.bin",revision:null},{url:"style/built.32f3a025a4.css",revision:null}],{})}));
//# sourceMappingURL=service-worker.js.map
