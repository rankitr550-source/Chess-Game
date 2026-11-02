// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (
  modules,
  entry,
  mainEntry,
  parcelRequireName,
  externals,
  distDir,
  publicUrl,
  devServer
) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var importMap = previousRequire.i || {};
  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        if (externals[name]) {
          return externals[name];
        }
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
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

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      if (res === false) {
        return {};
      }
      // Synthesize a module to follow re-exports.
      if (Array.isArray(res)) {
        var m = {__esModule: true};
        res.forEach(function (v) {
          var key = v[0];
          var id = v[1];
          var exp = v[2] || v[0];
          var x = newRequire(id);
          if (key === '*') {
            Object.keys(x).forEach(function (key) {
              if (
                key === 'default' ||
                key === '__esModule' ||
                Object.prototype.hasOwnProperty.call(m, key)
              ) {
                return;
              }

              Object.defineProperty(m, key, {
                enumerable: true,
                get: function () {
                  return x[key];
                },
              });
            });
          } else if (exp === '*') {
            Object.defineProperty(m, key, {
              enumerable: true,
              value: x,
            });
          } else {
            Object.defineProperty(m, key, {
              enumerable: true,
              get: function () {
                if (exp === 'default') {
                  return x.__esModule ? x.default : x;
                }
                return x[exp];
              },
            });
          }
        });
        return m;
      }
      return newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.require = nodeRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.distDir = distDir;
  newRequire.publicUrl = publicUrl;
  newRequire.devServer = devServer;
  newRequire.i = importMap;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  // Only insert newRequire.load when it is actually used.
  // The code in this file is linted against ES5, so dynamic import is not allowed.
  // INSERT_LOAD_HERE

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });
    }
  }
})({"df32I":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SERVER_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "439701173a9199ea";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "dfb0f2db0d41f1f4";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_SERVER_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_SERVER_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ , bundleNotFound = false;
function getHostname() {
    return HMR_HOST || (typeof location !== 'undefined' && location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || (typeof location !== 'undefined' ? location.port : HMR_SERVER_PORT);
}
// eslint-disable-next-line no-redeclare
let WebSocket = globalThis.WebSocket;
if (!WebSocket && typeof module.bundle.root === 'function') try {
    // eslint-disable-next-line no-global-assign
    WebSocket = module.bundle.root('ws');
} catch  {
// ignore.
}
var hostname = getHostname();
var port = getPort();
var protocol = HMR_SECURE || typeof location !== 'undefined' && location.protocol === 'https:' && ![
    'localhost',
    '127.0.0.1',
    '0.0.0.0'
].includes(hostname) ? 'wss' : 'ws';
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if (!parent || !parent.isParcelRequire) {
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        // If we're running in the dev server's node runner, listen for messages on the parent port.
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) {
            parentPort.on('message', async (message)=>{
                try {
                    await handleMessage(message);
                    parentPort.postMessage('updated');
                } catch  {
                    parentPort.postMessage('restart');
                }
            });
            // After the bundle has finished running, notify the dev server that the HMR update is complete.
            queueMicrotask(()=>parentPort.postMessage('ready'));
        }
    } catch  {
        if (typeof WebSocket !== 'undefined') try {
            ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
        } catch (err) {
            // Ignore cloudflare workers error.
            if (err.message && !err.message.includes('Disallowed operation called within global scope')) console.error(err.message);
        }
    }
    if (ws) {
        // $FlowFixMe
        ws.onmessage = async function(event /*: {data: string, ...} */ ) {
            var data /*: HMRMessage */  = JSON.parse(event.data);
            await handleMessage(data);
        };
        if (ws instanceof WebSocket) {
            ws.onerror = function(e) {
                if (e.message) console.error(e.message);
            };
            ws.onclose = function() {
                console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
            };
        }
    }
}
async function handleMessage(data /*: HMRMessage */ ) {
    checkedAssets = {} /*: {|[string]: boolean|} */ ;
    disposedAssets = {} /*: {|[string]: boolean|} */ ;
    assetsToAccept = [];
    assetsToDispose = [];
    bundleNotFound = false;
    if (data.type === 'reload') fullReload();
    else if (data.type === 'update') {
        // Remove error overlay if there is one
        if (typeof document !== 'undefined') removeErrorOverlay();
        let assets = data.assets;
        // Handle HMR Update
        let handled = assets.every((asset)=>{
            return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        });
        // Dispatch a custom event in case a bundle was not found. This might mean
        // an asset on the server changed and we should reload the page. This event
        // gives the client an opportunity to refresh without losing state
        // (e.g. via React Server Components). If e.preventDefault() is not called,
        // we will trigger a full page reload.
        if (handled && bundleNotFound && assets.some((a)=>a.envHash !== HMR_ENV_HASH) && typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') handled = !window.dispatchEvent(new CustomEvent('parcelhmrreload', {
            cancelable: true
        }));
        if (handled) {
            console.clear();
            // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
            if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
            await hmrApplyUpdates(assets);
            hmrDisposeQueue();
            // Run accept callbacks. This will also re-execute other disposed assets in topological order.
            let processedAssets = {};
            for(let i = 0; i < assetsToAccept.length; i++){
                let id = assetsToAccept[i][1];
                if (!processedAssets[id]) {
                    hmrAccept(assetsToAccept[i][0], id);
                    processedAssets[id] = true;
                }
            }
        } else fullReload();
    }
    if (data.type === 'error') {
        // Log parcel errors to console
        for (let ansiDiagnostic of data.diagnostics.ansi){
            let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
            console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
        }
        if (typeof document !== 'undefined') {
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="${protocol === 'wss' ? 'https' : 'http'}://${hostname}:${port}/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if (typeof location !== 'undefined' && 'reload' in location) location.reload();
    else if (typeof extCtx !== 'undefined' && extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
    else try {
        let { workerData, parentPort } = module.bundle.root('node:worker_threads') /*: any*/ ;
        if (workerData !== null && workerData !== void 0 && workerData.__parcel) parentPort.postMessage('restart');
    } catch (err) {
        console.error("[parcel] \u26A0\uFE0F An HMR update was not accepted. Please restart the process.");
    }
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout || typeof document === 'undefined') return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    checkedAssets = {};
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else if (a !== null) {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) {
            bundleNotFound = true;
            return true;
        }
        return hmrAcceptCheckOne(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return null;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    if (!cached) return true;
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
    return false;
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"gKpHM":[function(require,module,exports,__globalThis) {
/* ROYAL CHESSmPremium JavaScript Chess Game*/ /* PIECES*/ const symbols = {
    w: {
        k: "\u2654",
        q: "\u2655",
        r: "\u2656",
        b: "\u2657",
        n: "\u2658",
        p: "\u2659"
    },
    b: {
        k: "\u265A",
        q: "\u265B",
        r: "\u265C",
        b: "\u265D",
        n: "\u265E",
        p: "\u265F"
    }
};
/*INITIAL BOARD*/ const initialBoard = [
    [
        "br",
        "bn",
        "bb",
        "bq",
        "bk",
        "bb",
        "bn",
        "br"
    ],
    [
        "bp",
        "bp",
        "bp",
        "bp",
        "bp",
        "bp",
        "bp",
        "bp"
    ],
    [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
    ],
    [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
    ],
    [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
    ],
    [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
    ],
    [
        "wp",
        "wp",
        "wp",
        "wp",
        "wp",
        "wp",
        "wp",
        "wp"
    ],
    [
        "wr",
        "wn",
        "wb",
        "wq",
        "wk",
        "wb",
        "wn",
        "wr"
    ]
];
/*GAME VARIABLES*/ let board = copyBoard(initialBoard);
let turn = "w";
let selected = null;
let validMoves = [];
let history = [];
let moveNumber = 0;
let gameOver = false;
let soundOn = true;
let pendingPromotion = null;
/* CASTLING */ let castling = {
    wk: true,
    wq: true,
    bk: true,
    bq: true
};
/* EN PASSANT */ let enPassant = null;
/* TIMERS */ let time = {
    w: 600,
    b: 600
};
let timerInterval;
/*DOM*/ const boardElement = document.getElementById("board");
const turnText = document.getElementById("turnText");
const whiteTimer = document.getElementById("whiteTimer");
const blackTimer = document.getElementById("blackTimer");
const whiteCard = document.getElementById("whiteCard");
const blackCard = document.getElementById("blackCard");
const moveHistory = document.getElementById("moveHistory");
const moveCount = document.getElementById("moveCount");
const whiteCaptured = document.getElementById("whiteCaptured");
const blackCaptured = document.getElementById("blackCaptured");
const soundBtn = document.getElementById("soundBtn");
const newGameBtn = document.getElementById("newGameBtn");
const undoBtn = document.getElementById("undoBtn");
const promotionModal = document.getElementById("promotionModal");
const gameOverModal = document.getElementById("gameOverModal");
const winnerTitle = document.getElementById("winnerTitle");
const winnerMessage = document.getElementById("winnerMessage");
const playAgainBtn = document.getElementById("playAgainBtn");
/* COPY BOARD*/ function copyBoard(b) {
    return b.map((row)=>[
            ...row
        ]);
}
/*DRAW BOARD*/ function renderBoard() {
    boardElement.innerHTML = "";
    for(let r = 0; r < 8; r++)for(let c = 0; c < 8; c++){
        const square = document.createElement("div");
        square.className = "square " + ((r + c) % 2 === 0 ? "light" : "dark");
        square.dataset.row = r;
        square.dataset.col = c;
        const piece = board[r][c];
        if (piece) {
            const pieceElement = document.createElement("span");
            pieceElement.className = "piece " + (piece[0] === "w" ? "white" : "black");
            pieceElement.textContent = symbols[piece[0]][piece[1]];
            square.appendChild(pieceElement);
        }
        /* SELECTED */ if (selected && selected.r === r && selected.c === c) square.classList.add("selected");
        /* VALID MOVES */ const move = validMoves.find((m)=>m.r === r && m.c === c);
        if (move) {
            if (board[r][c]) square.classList.add("capture");
            else square.classList.add("valid");
        }
        /* CHECK */ const king = board[r][c];
        if (king && king[1] === "k" && isInCheck(king[0], board)) square.classList.add("check");
        square.addEventListener("click", ()=>handleSquareClick(r, c));
        boardElement.appendChild(square);
    }
}
/* -----------------------------
   CLICK HANDLER
----------------------------- */ function handleSquareClick(r, c) {
    if (gameOver) return;
    const piece = board[r][c];
    /* MOVE SELECTED PIECE */ const chosenMove = validMoves.find((m)=>m.r === r && m.c === c);
    if (selected && chosenMove) {
        makeMove(selected.r, selected.c, r, c);
        return;
    }
    /* SELECT PIECE */ if (piece && piece[0] === turn) {
        selected = {
            r,
            c
        };
        validMoves = getLegalMoves(r, c);
        playSound("select");
        renderBoard();
        return;
    }
    /* CLEAR */ selected = null;
    validMoves = [];
    renderBoard();
}
/* -----------------------------
   GET LEGAL MOVES
----------------------------- */ function getLegalMoves(r, c) {
    const piece = board[r][c];
    if (!piece) return [];
    const moves = getPseudoMoves(r, c, board, true);
    return moves.filter((move)=>{
        const testBoard = copyBoard(board);
        applyMoveToBoard(testBoard, r, c, move.r, move.c);
        return !isInCheck(piece[0], testBoard);
    });
}
/* -----------------------------
   PSEUDO MOVES
----------------------------- */ function getPseudoMoves(r, c, state, includeCastling = false) {
    const piece = state[r][c];
    if (!piece) return [];
    const color = piece[0];
    const type = piece[1];
    const moves = [];
    function add(nr, nc) {
        if (nr < 0 || nr > 7 || nc < 0 || nc > 7) return;
        const target = state[nr][nc];
        if (!target) moves.push({
            r: nr,
            c: nc
        });
        else if (target[0] !== color) moves.push({
            r: nr,
            c: nc
        });
    }
    /* PAWN */ if (type === "p") {
        const dir = color === "w" ? -1 : 1;
        const startRow = color === "w" ? 6 : 1;
        const one = r + dir;
        if (one >= 0 && one <= 7 && !state[one][c]) {
            moves.push({
                r: one,
                c
            });
            const two = r + dir * 2;
            if (r === startRow && !state[two][c]) moves.push({
                r: two,
                c
            });
        }
        /* CAPTURE */ for (const dc of [
            -1,
            1
        ]){
            const nr = r + dir;
            const nc = c + dc;
            if (nr >= 0 && nr <= 7 && nc >= 0 && nc <= 7) {
                const target = state[nr][nc];
                if (target && target[0] !== color) moves.push({
                    r: nr,
                    c: nc
                });
                /* EN PASSANT */ if (enPassant && enPassant.r === nr && enPassant.c === nc) moves.push({
                    r: nr,
                    c: nc,
                    enPassant: true
                });
            }
        }
    }
    /* KNIGHT */ if (type === "n") {
        const jumps = [
            [
                -2,
                -1
            ],
            [
                -2,
                1
            ],
            [
                -1,
                -2
            ],
            [
                -1,
                2
            ],
            [
                1,
                -2
            ],
            [
                1,
                2
            ],
            [
                2,
                -1
            ],
            [
                2,
                1
            ]
        ];
        jumps.forEach(([dr, dc])=>{
            add(r + dr, c + dc);
        });
    }
    /* BISHOP */ if (type === "b") slide(r, c, state, color, [
        [
            -1,
            -1
        ],
        [
            -1,
            1
        ],
        [
            1,
            -1
        ],
        [
            1,
            1
        ]
    ], moves);
    /* ROOK */ if (type === "r") slide(r, c, state, color, [
        [
            -1,
            0
        ],
        [
            1,
            0
        ],
        [
            0,
            -1
        ],
        [
            0,
            1
        ]
    ], moves);
    /* QUEEN */ if (type === "q") slide(r, c, state, color, [
        [
            -1,
            -1
        ],
        [
            -1,
            1
        ],
        [
            1,
            -1
        ],
        [
            1,
            1
        ],
        [
            -1,
            0
        ],
        [
            1,
            0
        ],
        [
            0,
            -1
        ],
        [
            0,
            1
        ]
    ], moves);
    /* KING */ if (type === "k") {
        for(let dr = -1; dr <= 1; dr++){
            for(let dc = -1; dc <= 1; dc++)if (dr !== 0 || dc !== 0) add(r + dr, c + dc);
        }
        /* CASTLING */ if (includeCastling) addCastlingMoves(r, c, state, moves);
    }
    return moves;
}
/* -----------------------------
   SLIDING PIECES
----------------------------- */ function slide(r, c, state, color, directions, moves) {
    directions.forEach(([dr, dc])=>{
        let nr = r + dr;
        let nc = c + dc;
        while(nr >= 0 && nr <= 7 && nc >= 0 && nc <= 7){
            const target = state[nr][nc];
            if (!target) moves.push({
                r: nr,
                c: nc
            });
            else {
                if (target[0] !== color) moves.push({
                    r: nr,
                    c: nc
                });
                break;
            }
            nr += dr;
            nc += dc;
        }
    });
}
/* -----------------------------
   CASTLING
----------------------------- */ function addCastlingMoves(r, c, state, moves) {
    const color = state[r][c][0];
    if (isInCheck(color, state)) return;
    /* WHITE */ if (color === "w" && r === 7 && c === 4) {
        /* KING SIDE */ if (castling.wk && state[7][5] === null && state[7][6] === null && state[7][7] === "wr" && !squareAttacked(7, 5, "b", state) && !squareAttacked(7, 6, "b", state)) moves.push({
            r: 7,
            c: 6,
            castle: "wk"
        });
        /* QUEEN SIDE */ if (castling.wq && state[7][1] === null && state[7][2] === null && state[7][3] === null && state[7][0] === "wr" && !squareAttacked(7, 3, "b", state) && !squareAttacked(7, 2, "b", state)) moves.push({
            r: 7,
            c: 2,
            castle: "wq"
        });
    }
    /* BLACK */ if (color === "b" && r === 0 && c === 4) {
        /* KING SIDE */ if (castling.bk && state[0][5] === null && state[0][6] === null && state[0][7] === "br" && !squareAttacked(0, 5, "w", state) && !squareAttacked(0, 6, "w", state)) moves.push({
            r: 0,
            c: 6,
            castle: "bk"
        });
        /* QUEEN SIDE */ if (castling.bq && state[0][1] === null && state[0][2] === null && state[0][3] === null && state[0][0] === "br" && !squareAttacked(0, 3, "w", state) && !squareAttacked(0, 2, "w", state)) moves.push({
            r: 0,
            c: 2,
            castle: "bq"
        });
    }
}
/* -----------------------------
   APPLY MOVE TO TEST BOARD
----------------------------- */ function applyMoveToBoard(state, fr, fc, tr, tc) {
    const piece = state[fr][fc];
    state[tr][tc] = state[fr][fc];
    state[fr][fc] = null;
    /* EN PASSANT */ if (piece && piece[1] === "p" && Math.abs(tc - fc) === 1 && !state[tr][tc]) state[fr][tc] = null;
}
/* -----------------------------
   MAKE REAL MOVE
----------------------------- */ function makeMove(fr, fc, tr, tc) {
    const piece = board[fr][fc];
    const target = board[tr][tc];
    const chosen = validMoves.find((m)=>m.r === tr && m.c === tc);
    /* SAVE HISTORY */ history.push({
        board: copyBoard(board),
        turn,
        castling: {
            ...castling
        },
        enPassant,
        time: {
            ...time
        },
        moveNumber,
        whiteCaptured: whiteCaptured.innerHTML,
        blackCaptured: blackCaptured.innerHTML,
        moveHistory: moveHistory.innerHTML
    });
    /* CAPTURE */ if (target) {
        addCaptured(target);
        playSound("capture");
    } else playSound("move");
    /* EN PASSANT CAPTURE */ if (chosen && chosen.enPassant) {
        const capturedPawn = board[fr][tc];
        addCaptured(capturedPawn);
        board[fr][tc] = null;
        playSound("capture");
    }
    /* MOVE */ board[tr][tc] = piece;
    board[fr][fc] = null;
    /* CASTLING */ if (chosen && chosen.castle) {
        if (chosen.castle === "wk") {
            board[7][5] = "wr";
            board[7][7] = null;
        }
        if (chosen.castle === "wq") {
            board[7][3] = "wr";
            board[7][0] = null;
        }
        if (chosen.castle === "bk") {
            board[0][5] = "br";
            board[0][7] = null;
        }
        if (chosen.castle === "bq") {
            board[0][3] = "br";
            board[0][0] = null;
        }
    }
    /* CASTLING RIGHTS */ updateCastlingRights(piece, fr, fc, target, tr, tc);
    /* EN PASSANT TARGET */ enPassant = null;
    if (piece[1] === "p" && Math.abs(tr - fr) === 2) enPassant = {
        r: (tr + fr) / 2,
        c: fc
    };
    /* PROMOTION */ if (piece[1] === "p" && (tr === 0 || tr === 7)) {
        pendingPromotion = {
            r: tr,
            c: tc,
            color: piece[0]
        };
        showPromotion();
        return;
    }
    finishMove(piece, fr, fc, tr, tc);
}
/* -----------------------------
   FINISH MOVE
----------------------------- */ function finishMove(piece, fr, fc, tr, tc) {
    const notation = createNotation(piece, fr, fc, tr, tc);
    addMoveHistory(notation, piece[0]);
    moveNumber++;
    turn = turn === "w" ? "b" : "w";
    selected = null;
    validMoves = [];
    updateUI();
    checkGameStatus();
}
/* -----------------------------
   PROMOTION
----------------------------- */ function showPromotion() {
    promotionModal.classList.remove("hidden");
}
/* PROMOTION BUTTONS */ document.querySelectorAll(".promotion-options button").forEach((button)=>{
    button.addEventListener("click", ()=>{
        const type = button.dataset.piece;
        board[pendingPromotion.r][pendingPromotion.c] = pendingPromotion.color + type;
        promotionModal.classList.add("hidden");
        const notation = "Pawn \u2192 " + type.toUpperCase();
        addMoveHistory(notation, pendingPromotion.color);
        moveNumber++;
        turn = turn === "w" ? "b" : "w";
        pendingPromotion = null;
        selected = null;
        validMoves = [];
        playSound("move");
        updateUI();
        checkGameStatus();
    });
});
/* -----------------------------
   CASTLING RIGHTS
----------------------------- */ function updateCastlingRights(piece, fr, fc, target, tr, tc) {
    if (piece === "wk") {
        castling.wk = false;
        castling.wq = false;
    }
    if (piece === "bk") {
        castling.bk = false;
        castling.bq = false;
    }
    if (piece === "wr" && fr === 7 && fc === 0) castling.wq = false;
    if (piece === "wr" && fr === 7 && fc === 7) castling.wk = false;
    if (piece === "br" && fr === 0 && fc === 0) castling.bq = false;
    if (piece === "br" && fr === 0 && fc === 7) castling.bk = false;
    /* ROOK CAPTURE */ if (target === "wr" && tr === 7 && tc === 0) castling.wq = false;
    if (target === "wr" && tr === 7 && tc === 7) castling.wk = false;
    if (target === "br" && tr === 0 && tc === 0) castling.bq = false;
    if (target === "br" && tr === 0 && tc === 7) castling.bk = false;
}
/* -----------------------------
   FIND KING
----------------------------- */ function findKing(color, state) {
    for(let r = 0; r < 8; r++)for(let c = 0; c < 8; c++){
        if (state[r][c] === color + "k") return {
            r,
            c
        };
    }
    return null;
}
/* -----------------------------
   CHECK
----------------------------- */ function isInCheck(color, state) {
    const king = findKing(color, state);
    if (!king) return true;
    const enemy = color === "w" ? "b" : "w";
    return squareAttacked(king.r, king.c, enemy, state);
}
/* -----------------------------
   SQUARE ATTACKED
----------------------------- */ function squareAttacked(r, c, attacker, state) {
    for(let pr = 0; pr < 8; pr++)for(let pc = 0; pc < 8; pc++){
        const piece = state[pr][pc];
        if (!piece || piece[0] !== attacker) continue;
        const type = piece[1];
        /* PAWN */ if (type === "p") {
            const dir = attacker === "w" ? -1 : 1;
            if (pr + dir === r && Math.abs(pc - c) === 1) return true;
        }
        /* KING */ if (type === "k") {
            if (Math.abs(pr - r) <= 1 && Math.abs(pc - c) <= 1) return true;
        }
        /* KNIGHT */ if (type === "n") {
            const dr = Math.abs(pr - r);
            const dc = Math.abs(pc - c);
            if (dr === 2 && dc === 1 || dr === 1 && dc === 2) return true;
        }
        /* SLIDERS */ if (type === "b" || type === "r" || type === "q") {
            const directions = [];
            if (type === "b" || type === "q") directions.push([
                -1,
                -1
            ], [
                -1,
                1
            ], [
                1,
                -1
            ], [
                1,
                1
            ]);
            if (type === "r" || type === "q") directions.push([
                -1,
                0
            ], [
                1,
                0
            ], [
                0,
                -1
            ], [
                0,
                1
            ]);
            for (const [dr, dc] of directions){
                let nr = pr + dr;
                let nc = pc + dc;
                while(nr >= 0 && nr < 8 && nc >= 0 && nc < 8){
                    if (nr === r && nc === c) return true;
                    if (state[nr][nc]) break;
                    nr += dr;
                    nc += dc;
                }
            }
        }
    }
    return false;
}
/* -----------------------------
   GAME STATUS
----------------------------- */ function checkGameStatus() {
    const inCheck = isInCheck(turn, board);
    const moves = getAllLegalMoves(turn);
    if (moves.length === 0) {
        gameOver = true;
        stopTimer();
        if (inCheck) {
            const winner = turn === "w" ? "Black" : "White";
            playSound("win");
            showGameOver(winner, "Checkmate! Excellent game.");
        } else showGameOver("Draw", "The game ended in a stalemate.");
        return;
    }
    updateTurnUI();
}
/* -----------------------------
   ALL LEGAL MOVES
----------------------------- */ function getAllLegalMoves(color) {
    const all = [];
    for(let r = 0; r < 8; r++)for(let c = 0; c < 8; c++){
        const piece = board[r][c];
        if (piece && piece[0] === color) {
            const moves = getLegalMoves(r, c);
            all.push(...moves);
        }
    }
    return all;
}
/* -----------------------------
   CAPTURE DISPLAY
----------------------------- */ function addCaptured(piece) {
    if (!piece) return;
    const element = piece[0] === "w" ? blackCaptured : whiteCaptured;
    if (element.textContent.trim() === "None") element.textContent = "";
    element.textContent += symbols[piece[0]][piece[1]];
}
/* MOVE HISTORY*/ function addMoveHistory(notation, color) {
    if (color === "w") {
        const row = document.createElement("div");
        row.className = "move-row";
        row.innerHTML = `
            <span class="move-number">
                ${Math.floor(moveNumber / 2) + 1}.
            </span>

            <span>
                ${notation}
            </span>

            <span class="black-move">
            </span>
        `;
        moveHistory.querySelector(".empty-history")?.remove();
        moveHistory.appendChild(row);
    } else {
        const rows = moveHistory.querySelectorAll(".move-row");
        if (rows.length) rows[rows.length - 1].children[2].textContent = notation;
    }
    moveHistory.scrollTop = moveHistory.scrollHeight;
}
/* NOTATION*/ function createNotation(piece, fr, fc, tr, tc) {
    const files = "abcdefgh";
    const pieceNames = {
        k: "K",
        q: "Q",
        r: "R",
        b: "B",
        n: "N",
        p: ""
    };
    const from = files[fc] + (8 - fr);
    const to = files[tc] + (8 - tr);
    const capture = board[tr][tc] ? "x" : "";
    if (piece[1] === "p") return (capture ? files[fc] + "x" : "") + to;
    return pieceNames[piece[1]] + capture + to;
}
/* -----------------------------
   TURN UI
----------------------------- */ function updateTurnUI() {
    turnText.textContent = turn === "w" ? "White's Turn" : "Black's Turn";
    whiteCard.classList.toggle("active", turn === "w");
    blackCard.classList.toggle("active", turn === "b");
}
/* -----------------------------
   UPDATE UI
----------------------------- */ function updateUI() {
    renderBoard();
    updateTurnUI();
    moveCount.textContent = `${moveNumber} ${moveNumber === 1 ? "move" : "moves"}`;
    updateTimers();
}
/* -----------------------------
   TIMER
----------------------------- */ function startTimer() {
    stopTimer();
    timerInterval = setInterval(()=>{
        if (gameOver) return;
        time[turn]--;
        updateTimers();
        if (time[turn] <= 0) {
            time[turn] = 0;
            gameOver = true;
            stopTimer();
            const winner = turn === "w" ? "Black" : "White";
            showGameOver(winner, "Time's up!");
        }
    }, 1000);
}
function stopTimer() {
    clearInterval(timerInterval);
}
function updateTimers() {
    whiteTimer.textContent = formatTime(time.w);
    blackTimer.textContent = formatTime(time.b);
}
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return String(min).padStart(2, "0") + ":" + String(sec).padStart(2, "0");
}
/*UNDO*/ undoBtn.addEventListener("click", ()=>{
    if (history.length === 0 || gameOver) return;
    const previous = history.pop();
    board = copyBoard(previous.board);
    turn = previous.turn;
    castling = {
        ...previous.castling
    };
    enPassant = previous.enPassant;
    time = {
        ...previous.time
    };
    moveNumber = previous.moveNumber;
    whiteCaptured.innerHTML = previous.whiteCaptured;
    blackCaptured.innerHTML = previous.blackCaptured;
    moveHistory.innerHTML = previous.moveHistory;
    selected = null;
    validMoves = [];
    updateUI();
    startTimer();
    playSound("click");
});
/*NEW GAME*/ newGameBtn.addEventListener("click", resetGame);
playAgainBtn.addEventListener("click", resetGame);
function resetGame() {
    board = copyBoard(initialBoard);
    turn = "w";
    selected = null;
    validMoves = [];
    history = [];
    moveNumber = 0;
    gameOver = false;
    castling = {
        wk: true,
        wq: true,
        bk: true,
        bq: true
    };
    enPassant = null;
    pendingPromotion = null;
    time = {
        w: 600,
        b: 600
    };
    whiteCaptured.textContent = "None";
    blackCaptured.textContent = "None";
    moveHistory.innerHTML = `
        <div class="empty-history">
            Make your first move
        </div>
    `;
    gameOverModal.classList.add("hidden");
    updateUI();
    startTimer();
    playSound("click");
}
/* GAME OVER MODAL*/ function showGameOver(winner, message) {
    winnerTitle.textContent = winner === "Draw" ? "Game Draw!" : `${winner} Wins!`;
    winnerMessage.textContent = message;
    gameOverModal.classList.remove("hidden");
}
/* -----------------------------
   SOUND ENGINE
----------------------------- */ let audioContext = null;
function playSound(type) {
    if (!soundOn) return;
    try {
        if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        oscillator.connect(gain);
        gain.connect(audioContext.destination);
        let frequency = 300;
        let duration = .08;
        if (type === "select") frequency = 520;
        if (type === "move") frequency = 380;
        if (type === "capture") {
            frequency = 180;
            duration = .13;
        }
        if (type === "win") {
            frequency = 700;
            duration = .35;
        }
        if (type === "click") frequency = 250;
        oscillator.frequency.value = frequency;
        oscillator.type = "sine";
        gain.gain.setValueAtTime(.001, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(.18, audioContext.currentTime + .01);
        gain.gain.exponentialRampToValueAtTime(.001, audioContext.currentTime + duration);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
        console.log("Audio unavailable");
    }
}
/* -SOUND BUTTON*/ soundBtn.addEventListener("click", ()=>{
    soundOn = !soundOn;
    soundBtn.innerHTML = soundOn ? "\uD83D\uDD0A Sound On" : "\uD83D\uDD07 Sound Off";
    if (soundOn) playSound("click");
});
/*START GAME*/ updateUI();
startTimer();

},{}]},["df32I","gKpHM"], "gKpHM", "parcelRequire07ae", {})

//# sourceMappingURL=CHESS.0d41f1f4.js.map
