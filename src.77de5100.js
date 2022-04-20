// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"fps.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var lastTime = new Date();
var lastFps;
var frames = 0;

function getFPS() {
  frames++;
  var thisTime = new Date();
  var msec = thisTime.getTime() - lastTime.getTime();

  if (msec >= 1000) {
    lastFps = Math.round(frames * 1000 / msec) + ' fps';
    lastTime = thisTime;
    frames = 0;
  }

  return lastFps;
}

exports.getFPS = getFPS;
},{}],"shaders.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var index_1 = require("./index");

function compileShader(shaderSource, shaderType) {
  // Create the shader object
  var shader = index_1.gl.createShader(shaderType); // Set the shader source code.

  index_1.gl.shaderSource(shader, shaderSource); // Compile the shader

  index_1.gl.compileShader(shader); // Check if it compiled

  var success = index_1.gl.getShaderParameter(shader, index_1.gl.COMPILE_STATUS);

  if (!success) {
    // Something went wrong during compilation; get the error
    throw "could not compile shader:" + index_1.gl.getShaderInfoLog(shader);
  }

  return shader;
}

function createProgram(vertexShader, fragmentShader) {
  // create a program.
  var program = index_1.gl.createProgram(); // attach the shaders.

  index_1.gl.attachShader(program, vertexShader);
  index_1.gl.attachShader(program, fragmentShader); // link the program.

  index_1.gl.linkProgram(program); // Check if it linked.

  var success = index_1.gl.getProgramParameter(program, index_1.gl.LINK_STATUS);

  if (!success) {
    // something went wrong with the link
    throw "program failed to link:" + index_1.gl.getProgramInfoLog(program);
  }

  return program;
}

;

function createShaderFromScript(scriptId, opt_shaderType) {
  // look up the script tag by id.
  var shaderScript = document.getElementById(scriptId);

  if (!shaderScript) {
    throw "*** Error: unknown script element" + scriptId;
  } // extract the contents of the script tag.


  var shaderSource = shaderScript.text; // If we didn't pass in a type, use the 'type' from
  // the script tag.

  if (!opt_shaderType) {
    if (shaderScript.type == "x-shader/x-vertex") {
      opt_shaderType = index_1.gl.VERTEX_SHADER;
    } else if (shaderScript.type == "x-shader/x-fragment") {
      opt_shaderType = index_1.gl.FRAGMENT_SHADER;
    } else if (!opt_shaderType) {
      throw "*** Error: shader type not set";
    }
  }

  return compileShader(shaderSource, opt_shaderType);
}

;

function createProgramFromScripts(shaderScriptIds) {
  var vertexShader = createShaderFromScript(shaderScriptIds[0], index_1.gl.VERTEX_SHADER);
  var fragmentShader = createShaderFromScript(shaderScriptIds[1], index_1.gl.FRAGMENT_SHADER);
  return createProgram(vertexShader, fragmentShader);
}

exports.createProgramFromScripts = createProgramFromScripts;
},{"./index":"index.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var fps_1 = require("./fps");

var shaders_1 = require("./shaders");

var paused = true;
var size = 1;
var uniforms = {};

window.onload = function () {
  document.addEventListener('keydown', onKeyDown);
  var canvas = document.querySelector("#glCanvas");
  exports.gl = canvas.getContext("webgl");

  if (exports.gl === null) {
    alert("Unable to initialize WebGL. Your browser or machine may not support it.");
    return;
  }

  var prog = shaders_1.createProgramFromScripts(['my_vertex_shader', 'my_fragment_shader']);
  exports.gl.useProgram(prog);
  uniforms.position = exports.gl.getUniformLocation(prog, 'position');
  window.requestAnimationFrame(step);
};

function step() {
  var fps = document.querySelector("#fps");
  fps.textContent = fps_1.getFPS();
  var sizeSpan = document.querySelector("#size");
  sizeSpan.textContent = 'Size: ' + size;
  var canvas = document.querySelector("#glCanvas");
  resizeCanvasToDisplaySize(canvas);
  exports.gl.clearColor(0.0, 0 * new Date().getMilliseconds() / 1000, 0.0, 1.0);
  exports.gl.clear(exports.gl.COLOR_BUFFER_BIT);

  for (var i = 0; i < size; i++) {
    exports.gl.uniform2f(uniforms.position, Math.random(), Math.random());
    exports.gl.drawArrays(exports.gl.POINTS, 0, 1);
  }

  if (paused) return;
  window.requestAnimationFrame(step);
}

function onKeyDown(e) {
  switch (e.key) {
    case ' ':
      paused = !paused;
      var checkbox = document.querySelector("#paused");
      checkbox.checked = paused;
      if (!paused) window.requestAnimationFrame(step);
      return;

    case 'ArrowUp':
      size *= 2;
      break;

    case 'ArrowDown':
      if (size > 1) size /= 2;
      break;

    default: //console.log(e)

  }

  if (paused) window.requestAnimationFrame(step);
}

function resizeCanvasToDisplaySize(canvas) {
  var dpr = window.devicePixelRatio;

  var _a = canvas.getBoundingClientRect(),
      width = _a.width,
      height = _a.height;

  var displayWidth = Math.round(width * dpr);
  var displayHeight = Math.round(height * dpr); // Check if the canvas is not the same size.

  var needResize = canvas.width != displayWidth || canvas.height != displayHeight;

  if (needResize) {
    // Make the canvas the same size
    canvas.width = displayWidth;
    canvas.height = displayHeight;
    exports.gl.viewport(0, 0, displayWidth, displayHeight);
  }

  return needResize;
}
},{"./fps":"fps.ts","./shaders":"shaders.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51861" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/src.77de5100.js.map