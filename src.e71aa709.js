parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"dBQz":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e,t=new Date,r=0;function n(){r++;var n=new Date,a=n.getTime()-t.getTime();return a>=1e3&&(e=Math.round(1e3*r/a)+" fps",t=n,r=0),e}exports.getFPS=n;
},{}],"sDc1":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./index");function r(r,t){var o=e.gl.createShader(t);if(e.gl.shaderSource(o,r),e.gl.compileShader(o),!e.gl.getShaderParameter(o,e.gl.COMPILE_STATUS))throw"could not compile shader:"+e.gl.getShaderInfoLog(o);return o}function t(r,t){var o=e.gl.createProgram();if(e.gl.attachShader(o,r),e.gl.attachShader(o,t),e.gl.linkProgram(o),!e.gl.getProgramParameter(o,e.gl.LINK_STATUS))throw"program failed to link:"+e.gl.getProgramInfoLog(o);return o}function o(t,o){var n=document.getElementById(t);if(!n)throw"*** Error: unknown script element"+t;var a=n.text;if(fetch("shader.vert").then(function(e){return e.text()}).then(function(e){console.log(e.length,e)}),console.log(a.length,a),a="#version 300 es\n"+a,!o)if("x-shader/x-vertex"==n.type)o=e.gl.VERTEX_SHADER;else if("x-shader/x-fragment"==n.type)o=e.gl.FRAGMENT_SHADER;else if(!o)throw"*** Error: shader type not set";return r(a,o)}function n(r){return t(o(r[0],e.gl.VERTEX_SHADER),o(r[1],e.gl.FRAGMENT_SHADER))}exports.createProgramFromScripts=n;
},{"./index":"QCba"}],"QCba":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./fps"),t=require("./shaders"),r=!0,o=2,n={};function i(){document.querySelector("#fps").textContent=e.getFPS(),document.querySelector("#size").textContent="Size: "+o,a(document.querySelector("#glCanvas")),exports.gl.clearColor(0,.3+0*(new Date).getMilliseconds()/1e3,0,1),exports.gl.clear(exports.gl.COLOR_BUFFER_BIT),exports.gl.enable(exports.gl.BLEND),exports.gl.blendFunc(exports.gl.SRC_ALPHA,exports.gl.ONE_MINUS_SRC_ALPHA),exports.gl.uniform1f(n.slices,o),exports.gl.drawArraysInstanced(exports.gl.TRIANGLE_STRIP,0,4,o),r||window.requestAnimationFrame(i)}function s(e){switch(e.key){case" ":return r=!r,document.querySelector("#paused").checked=r,void(r||window.requestAnimationFrame(i));case"ArrowUp":o++;break;case"ArrowDown":o>1&&o--}r&&window.requestAnimationFrame(i)}function a(e){var t=window.devicePixelRatio,r=e.getBoundingClientRect(),o=r.width,n=r.height,i=Math.round(o*t),s=Math.round(n*t),a=e.width!=i||e.height!=s;return a&&(e.width=i,e.height=s,exports.gl.viewport(0,0,i,s)),a}window.onload=function(){document.addEventListener("keydown",s);var e=document.querySelector("#glCanvas");if(exports.gl=e.getContext("webgl2"),null!==exports.gl){var r=t.createProgramFromScripts(["my_vertex_shader","my_fragment_shader"]);exports.gl.useProgram(r),n.slices=exports.gl.getUniformLocation(r,"slices"),window.requestAnimationFrame(i)}else alert("Unable to initialize WebGL. Your browser or machine may not support it.")};
},{"./fps":"dBQz","./shaders":"sDc1"}]},{},["QCba"], null)
//# sourceMappingURL=src.e71aa709.js.map