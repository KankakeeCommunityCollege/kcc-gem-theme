!function(){var e,t,r={},n={};function o(e){var t=n[e];if(void 0!==t)return t.exports;var i=n[e]={exports:{}};return r[e](i,i.exports,o),i.exports}o.m=r,o.f={},o.e=function(e){return Promise.all(Object.keys(o.f).reduce((function(t,r){return o.f[r](e,t),t}),[]))},o.u=function(e){return e+"."+o.h()+".bundle.js"},o.miniCssF=function(e){},o.h=function(){return"359b0582a78da79bafe7"},o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},e={},t="kcc-gem-theme:",o.l=function(r,n,i,a){if(e[r])e[r].push(n);else{var u,c;if(void 0!==i)for(var s=document.getElementsByTagName("script"),f=0;f<s.length;f++){var l=s[f];if(l.getAttribute("src")==r||l.getAttribute("data-webpack")==t+i){u=l;break}}u||(c=!0,(u=document.createElement("script")).charset="utf-8",u.timeout=120,o.nc&&u.setAttribute("nonce",o.nc),u.setAttribute("data-webpack",t+i),u.src=r),e[r]=[n];var d=function(t,n){u.onerror=u.onload=null,clearTimeout(p);var o=e[r];if(delete e[r],u.parentNode&&u.parentNode.removeChild(u),o&&o.forEach((function(e){return e(n)})),t)return t(n)},p=setTimeout(d.bind(null,void 0,{type:"timeout",target:u}),12e4);u.onerror=d.bind(null,u.onerror),u.onload=d.bind(null,u.onload),c&&document.head.appendChild(u)}},function(){var e;o.g.importScripts&&(e=o.g.location+"");var t=o.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");if(r.length)for(var n=r.length-1;n>-1&&(!e||!/^http(s?):/.test(e));)e=r[n--].src}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),o.p=e}(),function(){var e={490:0};o.f.j=function(t,r){var n=o.o(e,t)?e[t]:void 0;if(0!==n)if(n)r.push(n[2]);else{var i=new Promise((function(r,o){n=e[t]=[r,o]}));r.push(n[2]=i);var a=o.p+o.u(t),u=new Error;o.l(a,(function(r){if(o.o(e,t)&&(0!==(n=e[t])&&(e[t]=void 0),n)){var i=r&&("load"===r.type?"missing":r.type),a=r&&r.target&&r.target.src;u.message="Loading chunk "+t+" failed.\n("+i+": "+a+")",u.name="ChunkLoadError",u.type=i,u.request=a,n[1](u)}}),"chunk-"+t,t)}};var t=function(t,r){var n,i,a=r[0],u=r[1],c=r[2],s=0;if(a.some((function(t){return 0!==e[t]}))){for(n in u)o.o(u,n)&&(o.m[n]=u[n]);c&&c(o)}for(t&&t(r);s<a.length;s++)i=a[s],o.o(e,i)&&e[i]&&e[i][0](),e[i]=0},r=self.webpackChunkkcc_gem_theme=self.webpackChunkkcc_gem_theme||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))}(),window.addEventListener("load",(async()=>{if(document.querySelector('a[href="#page-top"]')){const{default:e}=await o.e(172).then(o.bind(o,172));e()}}))}();