parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"dBQz":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e,t=new Date,r=0;function n(){r++;var n=new Date,a=n.getTime()-t.getTime();return a>=1e3&&(e=Math.round(1e3*r/a)+" fps",t=n,r=0),e}exports.getFPS=n;
},{}],"sDc1":[function(require,module,exports) {
"use strict";var e=this&&this.__awaiter||function(e,r,t,n){return new(t||(t=Promise))(function(o,a){function i(e){try{l(n.next(e))}catch(r){a(r)}}function c(e){try{l(n.throw(e))}catch(r){a(r)}}function l(e){e.done?o(e.value):new t(function(r){r(e.value)}).then(i,c)}l((n=n.apply(e,r||[])).next())})},r=this&&this.__generator||function(e,r){var t,n,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function c(a){return function(c){return function(a){if(t)throw new TypeError("Generator is already executing.");for(;i;)try{if(t=1,n&&(o=2&a[0]?n.return:a[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,a[1])).done)return o;switch(n=0,o&&(a=[2&a[0],o.value]),a[0]){case 0:case 1:o=a;break;case 4:return i.label++,{value:a[1],done:!1};case 5:i.label++,n=a[1],a=[0];continue;case 7:a=i.ops.pop(),i.trys.pop();continue;default:if(!(o=(o=i.trys).length>0&&o[o.length-1])&&(6===a[0]||2===a[0])){i=0;continue}if(3===a[0]&&(!o||a[1]>o[0]&&a[1]<o[3])){i.label=a[1];break}if(6===a[0]&&i.label<o[1]){i.label=o[1],o=a;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(a);break}o[2]&&i.ops.pop(),i.trys.pop();continue}a=r.call(e,i)}catch(c){a=[6,c],n=0}finally{t=o=0}if(5&a[0])throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}([a,c])}}};Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./index");function n(e,r){var n=t.gl.createShader(r);if(t.gl.shaderSource(n,e),t.gl.compileShader(n),!t.gl.getShaderParameter(n,t.gl.COMPILE_STATUS))throw t.gl.getShaderInfoLog(n);return n}function o(t,o){return e(this,void 0,void 0,function(){var e;return r(this,function(r){switch(r.label){case 0:return[4,fetch(t)];case 1:return[4,r.sent().text()];case 2:e=r.sent();try{return[2,n(e,o)]}catch(a){return console.error("compile error",t,a),[2,0]}return[2]}})})}function a(e,r){if(e&&r){var n=t.gl.createProgram();return t.gl.attachShader(n,e),t.gl.attachShader(n,r),t.gl.linkProgram(n),t.gl.getProgramParameter(n,t.gl.LINK_STATUS)||console.error("program failed to link:"+t.gl.getProgramInfoLog(n)),n}}function i(n){return e(this,void 0,void 0,function(){var e,i;return r(this,function(r){switch(r.label){case 0:return[4,o(n+".vert",t.gl.VERTEX_SHADER)];case 1:return e=r.sent(),[4,o(n+".frag",t.gl.FRAGMENT_SHADER)];case 2:return i=r.sent(),[2,a(e,i)]}})})}exports.createProgramFromScripts=i;
},{"./index":"QCba"}],"QCba":[function(require,module,exports) {
"use strict";var e=this&&this.__awaiter||function(e,t,r,o){return new(r||(r=Promise))(function(n,i){function s(e){try{l(o.next(e))}catch(t){i(t)}}function a(e){try{l(o.throw(e))}catch(t){i(t)}}function l(e){e.done?n(e.value):new r(function(t){t(e.value)}).then(s,a)}l((o=o.apply(e,t||[])).next())})},t=this&&this.__generator||function(e,t){var r,o,n,i,s={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;s;)try{if(r=1,o&&(n=2&i[0]?o.return:i[0]?o.throw||((n=o.return)&&n.call(o),0):o.next)&&!(n=n.call(o,i[1])).done)return n;switch(o=0,n&&(i=[2&i[0],n.value]),i[0]){case 0:case 1:n=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,o=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!(n=(n=s.trys).length>0&&n[n.length-1])&&(6===i[0]||2===i[0])){s=0;continue}if(3===i[0]&&(!n||i[1]>n[0]&&i[1]<n[3])){s.label=i[1];break}if(6===i[0]&&s.label<n[1]){s.label=n[1],n=i;break}if(n&&s.label<n[2]){s.label=n[2],s.ops.push(i);break}n[2]&&s.ops.pop(),s.trys.pop();continue}i=t.call(e,s)}catch(a){i=[6,a],o=0}finally{r=n=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}},r=this;Object.defineProperty(exports,"__esModule",{value:!0});var o=require("./fps"),n=require("./shaders"),i=!0,s=!1,a=32,l=0,u=16,c={};function p(){document.querySelector("#fps").textContent=o.getFPS(),document.querySelector("#size").textContent="Size: "+a,document.querySelector("#paused").checked=i;var e=document.querySelector("#glCanvas");x(e),exports.gl.clearColor(0,.3+0*(new Date).getMilliseconds()/1e3,0,1),exports.gl.clear(exports.gl.COLOR_BUFFER_BIT|exports.gl.DEPTH_BUFFER_BIT),exports.gl.enable(exports.gl.CULL_FACE),exports.gl.enable(exports.gl.DEPTH_TEST),exports.gl.enable(exports.gl.BLEND),exports.gl.blendFunc(exports.gl.SRC_ALPHA,exports.gl.ONE_MINUS_SRC_ALPHA),exports.gl.uniform1f(c.slices,a),exports.gl.uniform1i(c.torusDetail,u),exports.gl.uniform1f(c.rotation,.01*l),exports.gl.uniform1f(c.aspectRatio,e.width/e.height),exports.gl.drawArraysInstanced(s?exports.gl.LINE_STRIP:exports.gl.TRIANGLE_STRIP,0,u*u*6,a+1),i||window.requestAnimationFrame(p)}function g(e){switch(e.key){case" ":(i=!i)||window.requestAnimationFrame(p);break;case"w":s=!s;break;case"ArrowUp":a++;break;case"ArrowDown":a>0&&a--;break;case"ArrowLeft":l++;break;case"ArrowRight":l--}i&&window.requestAnimationFrame(p)}function x(e){var t=window.devicePixelRatio,r=e.getBoundingClientRect(),o=r.width,n=r.height,i=Math.round(o*t),s=Math.round(n*t),a=e.width!=i||e.height!=s;return a&&(e.width=i,e.height=s,exports.gl.viewport(0,0,i,s)),a}window.onload=function(){return e(r,void 0,void 0,function(){var e,r,o;return t(this,function(t){switch(t.label){case 0:return document.addEventListener("keydown",g),e=document.querySelector("#glCanvas"),exports.gl=e.getContext("webgl2"),null===exports.gl?(alert("Unable to initialize WebGL. Your browser or machine may not support it."),[2]):[4,n.createProgramFromScripts("shader")];case 1:return(r=t.sent())?(exports.gl.useProgram(r),c.slices=exports.gl.getUniformLocation(r,"slices"),c.torusDetail=exports.gl.getUniformLocation(r,"torusDetail"),c.rotation=exports.gl.getUniformLocation(r,"rotation"),c.aspectRatio=exports.gl.getUniformLocation(r,"aspectRatio"),(o=new Image).crossOrigin="anonymous",o.src="https://upload.wikimedia.org/wikipedia/commons/9/9a/512x512_Dissolve_Noise_Texture.png",o.addEventListener("load",function(){var e=exports.gl.createTexture();exports.gl.bindTexture(exports.gl.TEXTURE_2D,e),exports.gl.texImage2D(exports.gl.TEXTURE_2D,0,exports.gl.RGBA,exports.gl.RGBA,exports.gl.UNSIGNED_BYTE,o),exports.gl.texParameteri(exports.gl.TEXTURE_2D,exports.gl.TEXTURE_MIN_FILTER,exports.gl.NEAREST_MIPMAP_LINEAR),exports.gl.texParameteri(exports.gl.TEXTURE_2D,exports.gl.TEXTURE_MAG_FILTER,exports.gl.NEAREST),exports.gl.generateMipmap(exports.gl.TEXTURE_2D),window.requestAnimationFrame(p)}),[2]):[2]}})})};
},{"./fps":"dBQz","./shaders":"sDc1"}]},{},["QCba"], null)
//# sourceMappingURL=src.a2e099f2.js.map