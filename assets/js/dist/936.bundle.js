(self.webpackChunkkcc_gem_theme=self.webpackChunkkcc_gem_theme||[]).push([[936],{7936:function(e,t,l){"use strict";l.r(t);var n=".hero-slider__slider",o="Pause";function s(){$(n).slick({dots:!0,slidesToShow:1,slidesToScroll:1,autoplay:!0,autoplaySpeed:4e3,prevArrow:'<button type="button" data-role="none" class="prev slick-prev" aria-label="Previous" role="button" style="display: block;">Previous</button>',nextArrow:'<button type="button" data-role="none" class="next slick-next" aria-label="Next" role="button" style="display: block;">Next</button>'})}function a(e,t,l){return e.setAttribute(t,l)}function r(e,t,l){var s=l===o;$(n).slick(t),a(e,"aria-label",l),e.classList.toggle("hero-slider__button--play"),e.innerHTML=l,s&&$(n).slick("slickNext")}t.default=function(){var e;document.querySelector(n)&&(e=s,$(n).on("init",(function(e,t){var l,s,i;s=document.querySelector(n),a(i=document.createElement("button"),"role","button"),a(i,"type","button"),a(i,"aria-label","Pause"),a(i,"style","display: block;"),i.innerHTML="Pause",i.classList.add("hero-slider__button--toggle"),s.appendChild(i),(l=i).addEventListener("click",(function(e){"Pause"===l.innerHTML?r(l,"slickPause","Play"):r(l,"slickPlay",o)}))})),e())}}}]);