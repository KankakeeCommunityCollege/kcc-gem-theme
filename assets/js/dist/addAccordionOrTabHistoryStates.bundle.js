(self.webpackChunkkcc_gem_theme=self.webpackChunkkcc_gem_theme||[]).push([[700],{8814:function(t,e,n){"use strict";function a(t,e){var n=new URL(window.location),a={page:document.title,accordion:t.innerText.trim()};n.search="",n.hash=e,window.history.pushState(a,"",n)}function c(t){t.target.matches(".accordion__button")&&!Boolean(JSON.parse(t.target.getAttribute("aria-expanded")))&&a(t.target,t.target.dataset.target)}function o(t){var e=t.target.hash;a(t.target,e)}function r(t,e,n){t.addEventListener(e,n)}n.r(e),n(6992),n(1539),n(8783),n(3948),n(285),n(3210),n(4916),n(4765),e.default=function(){document.getElementById("accordion")&&r(document.getElementById("accordion"),"click",c),document.querySelector(".navTabs")&&r(document.querySelector(".navTabs"),"click",o)}}}]);