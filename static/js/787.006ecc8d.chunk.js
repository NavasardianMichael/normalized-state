"use strict";(self.webpackChunktest=self.webpackChunktest||[]).push([[787],{787:function(e,l,T){T.r(l),T.d(l,{getCLS:function(){return j},getFCP:function(){return O},getFID:function(){return W},getLCP:function(){return Y},getTTFB:function(){return Z}});var y,b,C,k,D=function r(e,l){return{name:e,value:void 0===l?-1:l,delta:0,entries:[],id:"v2-".concat(Date.now(),"-").concat(Math.floor(8999999999999*Math.random())+1e12)}},B=function a(e,l){try{if(PerformanceObserver.supportedEntryTypes.includes(e)){if("first-input"===e&&!("PerformanceEventTiming"in self))return;var T=new PerformanceObserver((function(e){return e.getEntries().map(l)}));return T.observe({type:e,buffered:!0}),T}}catch(e){}},q=function o(e,l){var T=function n(T){"pagehide"!==T.type&&"hidden"!==document.visibilityState||(e(T),l&&(removeEventListener("visibilitychange",n,!0),removeEventListener("pagehide",n,!0)))};addEventListener("visibilitychange",T,!0),addEventListener("pagehide",T,!0)},A=function u(e){addEventListener("pageshow",(function(l){l.persisted&&e(l)}),!0)},H=function c(e,l,T){var y;return function(b){l.value>=0&&(b||T)&&(l.delta=l.value-(y||0),(l.delta||void 0===y)&&(y=l.value,e(l)))}},I=-1,R=function s(){return"hidden"===document.visibilityState?0:1/0},M=function m(){q((function(e){var l=e.timeStamp;I=l}),!0)},N=function v(){return I<0&&(I=R(),M(),A((function(){setTimeout((function(){I=R(),M()}),0)}))),{get firstHiddenTime(){return I}}},O=function d(e,l){var T,y=N(),b=D("FCP"),C=function f(e){"first-contentful-paint"===e.name&&(q&&q.disconnect(),e.startTime<y.firstHiddenTime&&(b.value=e.startTime,b.entries.push(e),T(!0)))},k=window.performance&&performance.getEntriesByName&&performance.getEntriesByName("first-contentful-paint")[0],q=k?null:B("paint",C);(k||q)&&(T=H(e,b,l),k&&C(k),A((function(y){b=D("FCP"),T=H(e,b,l),requestAnimationFrame((function(){requestAnimationFrame((function(){b.value=performance.now()-y.timeStamp,T(!0)}))}))})))},x=!1,J=-1,j=function h(e,l){x||(O((function(e){J=e.value})),x=!0);var T,y=function i(l){J>-1&&e(l)},b=D("CLS",0),C=0,k=[],I=function v(e){if(!e.hadRecentInput){var l=k[0],y=k[k.length-1];C&&e.startTime-y.startTime<1e3&&e.startTime-l.startTime<5e3?(C+=e.value,k.push(e)):(C=e.value,k=[e]),C>b.value&&(b.value=C,b.entries=k,T())}},h=B("layout-shift",I);h&&(T=H(y,b,l),q((function(){h.takeRecords().map(I),T(!0)})),A((function(){C=0,J=-1,b=D("CLS",0),T=H(y,b,l)})))},z={passive:!0,capture:!0},G=new Date,K=function g(e,l){y||(y=l,b=e,C=new Date,V(removeEventListener),Q())},Q=function E(){if(b>=0&&b<C-G){var e={entryType:"first-input",name:y.type,target:y.target,cancelable:y.cancelable,startTime:y.timeStamp,processingStart:y.timeStamp+b};k.forEach((function(l){l(e)})),k=[]}},U=function S(e){if(e.cancelable){var l=(e.timeStamp>1e12?new Date:performance.now())-e.timeStamp;"pointerdown"==e.type?function(e,l){var T=function n(){K(e,l),b()},y=function i(){b()},b=function r(){removeEventListener("pointerup",T,z),removeEventListener("pointercancel",y,z)};addEventListener("pointerup",T,z),addEventListener("pointercancel",y,z)}(l,e):K(l,e)}},V=function w(e){["mousedown","keydown","touchstart","pointerdown"].forEach((function(l){return e(l,U,z)}))},W=function L(e,l){var T,C=N(),I=D("FID"),R=function p(e){e.startTime<C.firstHiddenTime&&(I.value=e.processingStart-e.startTime,I.entries.push(e),T(!0))},M=B("first-input",R);T=H(e,I,l),M&&q((function(){M.takeRecords().map(R),M.disconnect()}),!0),M&&A((function(){var C;I=D("FID"),T=H(e,I,l),k=[],b=-1,y=null,V(addEventListener),C=R,k.push(C),Q()}))},X={},Y=function F(e,l){var T,y=N(),b=D("LCP"),C=function s(e){var l=e.startTime;l<y.firstHiddenTime&&(b.value=l,b.entries.push(e),T())},k=B("largest-contentful-paint",C);if(k){T=H(e,b,l);var I=function d(){X[b.id]||(k.takeRecords().map(C),k.disconnect(),X[b.id]=!0,T(!0))};["keydown","click"].forEach((function(e){addEventListener(e,I,{once:!0,capture:!0})})),q(I,!0),A((function(y){b=D("LCP"),T=H(e,b,l),requestAnimationFrame((function(){requestAnimationFrame((function(){b.value=performance.now()-y.timeStamp,X[b.id]=!0,T(!0)}))}))}))}},Z=function P(e){var l,T=D("TTFB");l=function t(){try{var t=performance.getEntriesByType("navigation")[0]||function(){var e=performance.timing,l={entryType:"navigation",startTime:0};for(var T in e)"navigationStart"!==T&&"toJSON"!==T&&(l[T]=Math.max(e[T]-e.navigationStart,0));return l}();if(T.value=T.delta=t.responseStart,T.value<0||T.value>performance.now())return;T.entries=[t],e(T)}catch(e){}},"complete"===document.readyState?setTimeout(l,0):addEventListener("load",(function(){return setTimeout(l,0)}))}}}]);
//# sourceMappingURL=787.006ecc8d.chunk.js.map