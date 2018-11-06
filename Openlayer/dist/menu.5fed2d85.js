// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
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

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
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
  return newRequire;
})({"script/menu.js":[function(require,module,exports) {
jQuery(function ($) {
    'use strict';

    function parseiconenmenu(ul, menu) {
        for (var i = 0; i < menu.length; i++) {

            if (menu[i].link == cluster) {
                categorie_naam = menu[i].name;

                for (var j = 0; j < menu[i].sub.length - 1; j++) {

                    var subcategorietekst = categorie + "-" + subcategorie;
                    if (menu[i].sub[j].link == subcategorietekst) {
                        var li = $(ul).append('<li style=\'background-image:url("' + menu[i].sub[j].image + '"); background-color:' + menu[i].sub[j].color3 + ';\' title="' + menu[i].sub[j].name + '" iconurl="' + menu[i].sub[j].image + '" id="' + menu[i].sub[j].name + '" class="ulmenu selected" >&nbsp;</li>');

                        loadGeometry(jsonData, menu[i].sub[j].name, menu[i].sub[j].image, menu[i].sub[j].color3);
                    } else {
                        var li = $(ul).append('<li style=\'background-image:url("' + menu[i].sub[j].image + '"); background-color:' + menu[i].sub[j].color2 + ';\' title="' + menu[i].sub[j].name + '" iconurl="' + menu[i].sub[j].image + '" id="' + menu[i].sub[j].name + '" class=ulmenu >&nbsp;</li>');
                    }
                    menukleur2 = menu[i].sub[j].color2;
                    menukleur3 = menu[i].sub[j].color3;
                    icoon1 = menu[i].sub[j].image;
                }

                if (subcategorie == menu[i].sub.length - 1) {
                    $(".ulmenu").toggleClass("selected");
                    $(".ulmenu").css("background-color", menukleur3);
                    $("#Home").toggleClass("selected");
                    $("#Home").css("background-color", menukleur2);
                }

                $(".ulmenu").click(function () {

                    var icoon_naam = $(this).attr('title');
                    var icoon_url = $(this).attr('iconurl');
                    var icoon_kleur = $(this).attr('menukleur2');

                    $("#title").html(icoon_naam);

                    if ($(this).attr('title') == "Home") {
                        var url = "../index.html";
                        window.location.replace(url);
                    } else {
                        if ($(this).hasClass("selected")) {
                            $(this).toggleClass("selected");

                            if ($(this).attr('title') == "Edit") {
                                $("#venster").hide();
                                $(this).css("background-color", '#ff660e');
                            }

                            if ($(this).attr('title') == "Voorspelmodel") {
                                this_map.removeLayer(lagen.voorspelmodel);
                                $(this).css("background-color", menukleur2);
                            } /*
                              if ($(this).attr('title') == "Seinen") {
                                 this_map.removeLayer(lagen.seinen);
                                 $(this).css("background-color", menukleur2);
                              }*/

                            if ($(this).attr('title') == "Spooras") {
                                this_map.removeLayer(lagen.spooras);
                                $(this).css("background-color", menukleur2);
                            }

                            if ($(this).attr('title') == "Kunstwerken") {
                                this_map.removeLayer(lagen.kunstwerk);
                                $(this).css("background-color", menukleur2);
                            }

                            if ($(this).attr('title') == "Wissels") {
                                this_map.removeLayer(lagen.wissels);
                                $(this).css("background-color", menukleur2);
                            }

                            if ($(this).attr('title') == "Overwegen") {
                                this_map.removeLayer(lagen.overwegen);
                                $(this).css("background-color", menukleur2);
                            }

                            if ($(this).attr('title') == "ZKL-RC") {
                                this_map.removeLayer(lagen.zkl);
                                $(this).css("background-color", menukleur2);
                            }

                            if ($(this).attr('title') == "Kilometrering") {
                                this_map.removeLayer(lagen.kilometrering);
                                $(this).css("background-color", menukleur2);
                            }

                            if ($(this).attr('title') == "Luchtfoto") {
                                this_map.removeLayer(lagen.luchtfoto);
                                $(this).css("background-color", menukleur2);
                            }
                            /*zet_layer_aan_of_uit( icoon_naam );*/
                        } else if ($(this).attr('title') == "Edit") {
                            $(this).toggleClass("selected");

                            $(this).css("background-color", menukleur3);

                            $("#venster").show();
                        } else if ($(this).attr('title') == "Voorspelmodel") {
                            $(this).toggleClass("selected");

                            $(this).css("background-color", menukleur3);

                            lagen.voorspelmodel.addTo(this_map);
                        } else if ($(this).attr('title') == "Seinen") {
                            $(this).toggleClass("selected");

                            $(this).css("background-color", menukleur3);

                            lagen.seinen.addTo(this_map);
                        } else if ($(this).attr('title') == "Spooras") {
                            $(this).toggleClass("selected");

                            $(this).css("background-color", menukleur3);

                            lagen.spooras.addTo(this_map);
                        } else if ($(this).attr('title') == "Kunstwerken") {
                            $(this).toggleClass("selected");

                            $(this).css("background-color", menukleur3);

                            lagen.kunstwerk.addTo(this_map);
                        } else if ($(this).attr('title') == "Wissels") {
                            $(this).toggleClass("selected");

                            $(this).css("background-color", menukleur3);

                            lagen.wissels.addTo(this_map);
                        } else if ($(this).attr('title') == "Overwegen") {
                            $(this).toggleClass("selected");

                            $(this).css("background-color", menukleur3);

                            lagen.overwegen.addTo(this_map);
                        } else if ($(this).attr('title') == "ZKL-RC") {
                            $(this).toggleClass("selected");

                            $(this).css("background-color", menukleur3);

                            lagen.zkl.addTo(this_map);
                        } else if ($(this).attr('title') == "Kilometrering") {
                            $(this).toggleClass("selected");

                            $(this).css("background-color", menukleur3);

                            lagen.kilometrering.addTo(this_map);
                        } else if ($(this).attr('title') == "Luchtfoto") {
                            $(this).toggleClass("selected");

                            $(this).css("background-color", menukleur3);

                            lagen.luchtfoto.addTo(this_map);

                            /*loadGeometry(  jsonData , icoon_naam , icoon_url, icoon_kleur);*/
                        }
                    }
                });
            }
        }
    }

    //  var wfstbestand = "../kaart/services/wfst.php";

    /*$.ajax({
                type: "POST",
                url: wfstbestand,
                async: false,
                dataType: 'json',
                success: function (data) {
                    jsonData=data;
                    
                },
        error: function (data) {
            alert("error!");
            console.log(data);
        }
    });*/

    /**
    var filename = "../data/voorzieningen.json";
      $.ajax({
      type: 'GET',
      url: filename,
      //data: data,
      async: false,
      beforeSend: function (xhr) {
        if (xhr && xhr.overrideMimeType) {
          xhr.overrideMimeType('application/json;charset=utf-8');
        }
      },
      dataType: 'json',
      success: function (data) {
            jsonData=data;
       },
      error: function (data) {
            alert( "error!");
             console.log( data  );
        }
    });
    **/

    var jsonData;

    var iconenmenu = $('#iconenmenu');
    parseiconenmenu(iconenmenu, JSON_knoppen.menu);

    /*        var sheet = document.createElement('style')
            sheet.innerHTML = ".icooncirkel {border-radius: 50%; background-color:" + menukleur2 + "; border: 1px solid #FFFFFF;} .popupkleur {background-color:" + menukleur2 + ";} #venster {border-top: 10px solid " + menukleur2 + "; box-shadow: 0px 0px 3px 2px;} .tablestyle {border:0px;} .trstyle:nth-child(odd){background-color: #fff;} .trstyle:nth-child(even){background-color: #fff;} .tdstyle_l{border: 2px solid white; box-shadow: 0 5px 5px rgba(182, 182, 182, 0.75);} .tdstyle_r{border: 2px solid white; box-shadow: 0 5px 5px rgba(182, 182, 182, 0.75);} ";
            document.body.appendChild(sheet);*/

    $(".clearfix li").each(function (index) {

        if ($(this).attr('title')) {}
    });

    // -------------------------------------------------------------
    //   Basic Navigation
    // -------------------------------------------------------------
    (function () {
        var $frame = $('#basic');
        var $slidee = $frame.children('ul').eq(0);
        var $wrap = $frame.parent();

        // Call Sly on frame
        $frame.sly({
            horizontal: 1,
            itemNav: 'basic',
            smart: 1,
            activateOn: 'click',
            mouseDragging: 1,
            touchDragging: 1,
            releaseSwing: 1,
            startAt: 0,
            scrollBar: $wrap.find('.scrollbar'),
            scrollBy: 1,
            pagesBar: $wrap.find('.pages'),
            activatePageOn: 'click',
            speed: 500,
            elasticBounds: 1,
            easing: 'easeOutExpo',
            dragHandle: 1,
            dynamicHandle: 1,
            clickBar: 1,

            // Buttons
            forward: $wrap.find('.forward'),
            backward: $wrap.find('.backward'),
            prev: $wrap.find('.prev'),
            next: $wrap.find('.next'),
            prevPage: $wrap.find('.prevPage'),
            nextPage: $wrap.find('.nextPage')
        });
        setTimeout(function () {
            $frame.sly('toEnd');
        }, 1000);
        setTimeout(function () {
            $frame.sly('toStart');
        }, 2000);

        // To Start button
        $wrap.find('.toStart').on('click', function () {
            var item = $(this).data('item');
            // Animate a particular item to the start of the frame.
            // If no item is provided, the whole content will be animated.
            $frame.sly('toStart', item);
        });

        // To Center button
        $wrap.find('.toCenter').on('click', function () {
            var item = $(this).data('item');
            // Animate a particular item to the center of the frame.
            // If no item is provided, the whole content will be animated.
            $frame.sly('toCenter', item);
        });

        // To End button
        $wrap.find('.toEnd').on('click', function () {
            var item = $(this).data('item');
            // Animate a particular item to the end of the frame.
            // If no item is provided, the whole content will be animated.
            $frame.sly('toEnd', item);
        });

        // Add item
        $wrap.find('.add').on('click', function () {
            $frame.sly('add', '<li>' + $slidee.children().length + '</li>');
        });

        // Remove item
        $wrap.find('.remove').on('click', function () {
            $frame.sly('remove', -1);
        });
    })();
});
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '56169' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
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
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
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

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

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

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script/menu.js"], null)
//# sourceMappingURL=/menu.5fed2d85.map