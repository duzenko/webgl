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

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

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
    throw index_1.gl.getShaderInfoLog(shader);
  }

  return shader;
}

function createShaderFromScript(scriptId, opt_shaderType) {
  return __awaiter(this, void 0, void 0, function () {
    var x, shaderSource;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4
          /*yield*/
          , fetch(scriptId)];

        case 1:
          x = _a.sent();
          return [4
          /*yield*/
          , x.text()];

        case 2:
          shaderSource = _a.sent();

          try {
            return [2
            /*return*/
            , compileShader(shaderSource, opt_shaderType)];
          } catch (e) {
            console.error('compile error', scriptId, e);
            return [2
            /*return*/
            , 0];
          }

          return [2
          /*return*/
          ];
      }
    });
  });
}

;

function createProgram(vertexShader, fragmentShader) {
  if (!vertexShader || !fragmentShader) return; // create a program.

  var program = index_1.gl.createProgram(); // attach the shaders.

  index_1.gl.attachShader(program, vertexShader);
  index_1.gl.attachShader(program, fragmentShader); // link the program.

  index_1.gl.linkProgram(program); // Check if it linked.

  var success = index_1.gl.getProgramParameter(program, index_1.gl.LINK_STATUS);

  if (!success) {
    // something went wrong with the link
    console.error("program failed to link:" + index_1.gl.getProgramInfoLog(program));
  }

  return program;
}

;

function createProgramFromScripts(shaderScriptId) {
  return __awaiter(this, void 0, void 0, function () {
    var vertexShader, fragmentShader;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4
          /*yield*/
          , createShaderFromScript(shaderScriptId + '.vert', index_1.gl.VERTEX_SHADER)];

        case 1:
          vertexShader = _a.sent();
          return [4
          /*yield*/
          , createShaderFromScript(shaderScriptId + '.frag', index_1.gl.FRAGMENT_SHADER)];

        case 2:
          fragmentShader = _a.sent();
          return [2
          /*return*/
          , createProgram(vertexShader, fragmentShader)];
      }
    });
  });
}

exports.createProgramFromScripts = createProgramFromScripts;
},{"./index":"index.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var _this = this;

Object.defineProperty(exports, "__esModule", {
  value: true
});

var fps_1 = require("./fps");

var shaders_1 = require("./shaders");

var paused = true;
var wireframe = false;
var size = 32;
var rotation = 0;
var torusDetail = 16;
var uniforms = {};

window.onload = function () {
  return __awaiter(_this, void 0, void 0, function () {
    var canvas, prog, image;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          document.addEventListener('keydown', onKeyDown);
          canvas = document.querySelector("#glCanvas");
          exports.gl = canvas.getContext("webgl2");

          if (exports.gl === null) {
            alert("Unable to initialize WebGL. Your browser or machine may not support it.");
            return [2
            /*return*/
            ];
          }

          return [4
          /*yield*/
          , shaders_1.createProgramFromScripts('shader')];

        case 1:
          prog = _a.sent();
          if (!prog) return [2
          /*return*/
          ];
          exports.gl.useProgram(prog);
          uniforms.slices = exports.gl.getUniformLocation(prog, 'slices');
          uniforms.torusDetail = exports.gl.getUniformLocation(prog, 'torusDetail');
          uniforms.rotation = exports.gl.getUniformLocation(prog, 'rotation');
          uniforms.aspectRatio = exports.gl.getUniformLocation(prog, 'aspectRatio');
          image = new Image();
          image.crossOrigin = 'anonymous';
          image.src = "https://upload.wikimedia.org/wikipedia/commons/9/9a/512x512_Dissolve_Noise_Texture.png";
          image.addEventListener('load', function () {
            var texture = exports.gl.createTexture();
            exports.gl.bindTexture(exports.gl.TEXTURE_2D, texture);
            exports.gl.texImage2D(exports.gl.TEXTURE_2D, 0, exports.gl.RGBA, exports.gl.RGBA, exports.gl.UNSIGNED_BYTE, image);
            exports.gl.texParameteri(exports.gl.TEXTURE_2D, exports.gl.TEXTURE_MIN_FILTER, exports.gl.NEAREST_MIPMAP_LINEAR);
            exports.gl.texParameteri(exports.gl.TEXTURE_2D, exports.gl.TEXTURE_MAG_FILTER, exports.gl.NEAREST);
            exports.gl.generateMipmap(exports.gl.TEXTURE_2D);
            window.requestAnimationFrame(step);
          });
          return [2
          /*return*/
          ];
      }
    });
  });
};

function step() {
  var fps = document.querySelector("#fps");
  fps.textContent = fps_1.getFPS();
  var sizeSpan = document.querySelector("#size");
  sizeSpan.textContent = 'Size: ' + size;
  var checkbox = document.querySelector("#paused");
  checkbox.checked = paused;
  var canvas = document.querySelector("#glCanvas");
  resizeCanvasToDisplaySize(canvas);
  exports.gl.clearColor(0.0, 0.3 + 0 * new Date().getMilliseconds() / 1000, 0.0, 1.0);
  exports.gl.clear(exports.gl.COLOR_BUFFER_BIT | exports.gl.DEPTH_BUFFER_BIT);
  exports.gl.enable(exports.gl.CULL_FACE);
  exports.gl.enable(exports.gl.DEPTH_TEST);
  exports.gl.enable(exports.gl.BLEND);
  exports.gl.blendFunc(exports.gl.SRC_ALPHA, exports.gl.ONE_MINUS_SRC_ALPHA);
  exports.gl.uniform1f(uniforms.slices, size);
  exports.gl.uniform1i(uniforms.torusDetail, torusDetail);
  exports.gl.uniform1f(uniforms.rotation, rotation * 1e-2);
  exports.gl.uniform1f(uniforms.aspectRatio, canvas.width / canvas.height);
  exports.gl.drawArraysInstanced(wireframe ? exports.gl.LINE_STRIP : exports.gl.TRIANGLE_STRIP, 0, torusDetail * torusDetail * 6, size + 1);
  if (paused) return;
  window.requestAnimationFrame(step);
}

function onKeyDown(e) {
  switch (e.key) {
    case ' ':
      paused = !paused;
      if (!paused) window.requestAnimationFrame(step);
      break;

    case 'w':
      wireframe = !wireframe;
      break;

    case 'ArrowUp':
      //size *= 2
      size++;
      break;

    case 'ArrowDown':
      //if (size>1) size /= 2
      if (size > 0) size--;
      break;

    case 'ArrowLeft':
      rotation++;
      break;

    case 'ArrowRight':
      rotation--;
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58115" + '/');

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