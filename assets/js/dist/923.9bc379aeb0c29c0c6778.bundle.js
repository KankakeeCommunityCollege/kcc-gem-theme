"use strict";(self.webpackChunkkcc_gem_theme=self.webpackChunkkcc_gem_theme||[]).push([[923],{923:function(e,t,s){const n=document.getElementById("syncAlert");function c(e){const t=n.querySelector(".svg__sync");Promise.resolve().then((()=>{n.classList.add("buttons--sync--visible"),t.classList.add("loader__sync--animate")})).then((()=>{window.setTimeout((()=>{s.e(706).then(s.bind(s,706)).then((e=>{let{default:t}=e;gapi.load("client",t)}))}),1e3)}))}t.default=function(){window.setTimeout((()=>{var e;(e=n).classList.add("buttons--sync--preview"),window.setTimeout((()=>{e.classList.remove("buttons--sync--preview")}),3e3)}),500),n.addEventListener("click",c)}}}]);