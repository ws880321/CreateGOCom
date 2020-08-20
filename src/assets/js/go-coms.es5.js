/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var VuexServer = /** @class */ (function () {
    function VuexServer() {
    }
    VuexServer.setAppStore = function (store) {
        VuexServer.store = store;
    };
    VuexServer.prototype.getState = function () {
        return VuexServer.store.state[VuexServer.storeModule];
    };
    /**
     * 得到当前服务下state
     * @param {Array[string]} ms state list
     */
    VuexServer.prototype.mapState = function (ms) {
        return mapState(VuexServer.storeModule, ms);
    };
    /**
     * 得到当前服务下getters
     * @param {Array[string]} ms getter list
     */
    VuexServer.prototype.mapGetters = function (ms) {
        return mapGetters(VuexServer.storeModule, ms);
    };
    /**
     * 得到当前服务下mutations
     * @param {Array[string]} ms mutation list
     */
    VuexServer.prototype.mapMutations = function (ms) {
        return mapMutations(VuexServer.storeModule, ms);
    };
    /**
     * 调用VuexServer state
     * @param {string} stateName VuexServer state Name
     */
    VuexServer.prototype.callState = function (stateName) {
        return VuexServer.store.state[VuexServer.storeModule][stateName];
    };
    /**
     * 调用VuexServer getter
     * @param {string} getterName VuexServer getter name
     * @param {*} v 可选,getter传入参数
     */
    VuexServer.prototype.callGetter = function (getterName, v) {
        // console.log(this.type+"/"+getterName)
        return VuexServer.store.getters[VuexServer.storeModule + '/' + getterName];
    };
    /**
     * 调用VuexServer mutation
     * @param {string} mutationName VuexServer mutation name
     * @param {*} v 可选, mutation传入参数
     */
    VuexServer.prototype.callMutation = function (mutationName, v) {
        // appStore._mutations['action/addAction'](v)
        VuexServer.store.commit(VuexServer.storeModule + '/' + mutationName, v);
    };
    VuexServer.prototype.callAction = function (actionName, v) {
        VuexServer.store.dispatch(VuexServer.storeModule + '/' + actionName, v);
    };
    VuexServer.storeModule = 'GoCom';
    return VuexServer;
}());
/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
    var res = {};
    normalizeMap(states).forEach(function (_a) {
        var key = _a.key, val = _a.val;
        res[key] = function mappedState() {
            var state = this.$store.state;
            var getters = this.$store.getters;
            if (namespace) {
                var module_1 = getModuleByNamespace(this.$store, 'mapState', namespace);
                if (!module_1) {
                    return;
                }
                state = module_1.context.state;
                getters = module_1.context.getters;
            }
            return typeof val === 'function' ? val.call(this, state, getters) : state[val];
        };
        // mark VuexServer getter for devtools
        res[key].VuexServer = true;
    });
    return res;
});
/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept anthor params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
    var res = {};
    normalizeMap(mutations).forEach(function (_a) {
        var key = _a.key, val = _a.val;
        res[key] = function mappedMutation() {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // Get the commit method from store
            var commit = this.$store.commit;
            if (namespace) {
                var module_2 = getModuleByNamespace(this.$store, 'mapMutations', namespace);
                if (!module_2) {
                    return;
                }
                commit = module_2.context.commit;
            }
            return typeof val === 'function'
                ? val.apply(this, [commit].concat(args))
                : commit.apply(this.$store, [val].concat(args));
        };
    });
    return res;
});
/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
    var res = {};
    normalizeMap(getters).forEach(function (_a) {
        var key = _a.key, val = _a.val;
        // The namespace has been mutated by normalizeNamespace
        val = namespace + val;
        res[key] = function mappedGetter() {
            if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
                return;
            }
            if (process.env.NODE_ENV !== 'production' && !(val in this.$store.getters)) {
                console.error("[VuexServer] unknown getter: " + val);
                return;
            }
            return this.$store.getters[val];
        };
        // mark VuexServer getter for devtools
        res[key].VuexServer = true;
    });
    return res;
});
/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap(map) {
    return Array.isArray(map)
        ? map.map(function (key) { return ({ key: key, val: key }); })
        : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); });
}
/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace(fn) {
    return function (namespace, map) {
        if (typeof namespace !== 'string') {
            map = namespace;
            namespace = '';
        }
        else if (namespace.charAt(namespace.length - 1) !== '/') {
            namespace += '/';
        }
        return fn(namespace, map);
    };
}
/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace(store, helper, namespace) {
    var module = store._modulesNamespaceMap[namespace];
    if (process.env.NODE_ENV !== 'production' && !module) {
        console.error("[VuexServer] module namespace not found in " + helper + "(): " + namespace);
    }
    return module;
}

var LoadComs = /** @class */ (function (_super) {
    __extends(LoadComs, _super);
    function LoadComs(type) {
        var _this_1 = _super.call(this) || this;
        _this_1.storeModule = 'GoCom';
        _this_1.type = type;
        return _this_1;
    }
    LoadComs.setBaseUrl = function (url) {
        LoadComs.baseUrl = url;
    };
    LoadComs.prototype._loadComponent = function (dev, callback) {
        var _this_1 = this;
        // 动态加载组件
        var path = this.getComponentPath();
        var _this = this;
        if (dev) {
            _this.com = window[_this.tagName];
            _this.tmp = window[_this.tagName + '-Tmp'];
            _this.callMutation('setSelect', _this.cid);
            _this.callMutation('addComs', _this);
            _this.callAction('addMenuItem', _this);
            _this.callMutation('addBaseComs', _this);
            return;
        }
        function load(callback) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, _this._loadScript(path[0])];
                        case 1:
                            _a.sent();
                            return [4 /*yield*/, _this._loadScript(path[1])];
                        case 2:
                            _a.sent();
                            _this.com = window[_this.tagName];
                            _this.tmp = window[_this.tagName + '-Tmp'];
                            _this.callMutation('setSelect', _this.cid);
                            _this.callMutation('addComs', _this);
                            _this.callAction('addMenuItem', _this);
                            _this.callMutation('addBaseComs', _this);
                            if (callback) {
                                callback();
                            }
                            return [2 /*return*/];
                    }
                });
            });
        }
        if (_this.callState('baseComs').filter(function (v) { return v.type === _this_1.type; }).length > 0) {
            _this.com = window[_this.tagName];
            _this.tmp = window[_this.tagName + '-Tmp'];
            _this.callMutation('setSelect', _this.cid);
            _this.callMutation('addComs', _this);
            _this.callAction('addMenuItem', _this);
        }
        else {
            load(callback);
        }
    };
    // 动态加载js 文件
    LoadComs.prototype._loadScript = function (src, attrs, parentNode) {
        return new Promise(function (resolve, reject) {
            var script = document.createElement('script');
            script.async = true;
            script.src = src;
            // for (const [k, v] of Object.entries(attrs || {})) {
            //   script.setAttribute(k, v);
            // }
            script.onload = function () {
                script.onerror = script.onload = null;
                resolve(script);
            };
            script.onerror = function () {
                script.onerror = script.onload = null;
                reject(new Error("Failed to load " + src));
            };
            var node = parentNode || document.head || document.getElementsByTagName('head')[0];
            node.appendChild(script);
        });
    };
    LoadComs.prototype.getComponentPath = function () {
        var basePath = this.type.replace(/\./g, '/');
        var name = this.type.replace(/\./g, '-');
        var path1 = LoadComs.baseUrl + basePath + '/' + name + '.js';
        var path2 = LoadComs.baseUrl + basePath + '/' + name + '-Tmp.js';
        this.tagName = name;
        return [path1, path2];
    };
    LoadComs.baseUrl = 'http://172.16.9.143:8090/subassembly/js/';
    return LoadComs;
}(VuexServer));

var appStore = {};
var Go = /** @class */ (function (_super) {
    __extends(Go, _super);
    function Go(type, op) {
        var _this = _super.call(this, type) || this;
        _this.eventNum = 0;
        _this.actionSource = 0;
        _this.dev = false;
        _this.isShow = true;
        _this.isLock = false;
        _this.baseData = {
            left: 0,
            top: 0,
            width: 300,
            height: 200
        };
        _this.actions = new Set();
        // : {
        //   source: {}
        //   implement: {}
        // }
        _this.optionData = {};
        _this.sourceData = {};
        op ? (_this.name = op.name) : (_this.name = _this.type);
        op && op.baseData && (_this.baseData = op.baseData);
        op && op.optionData && (_this.optionData = op.optionData);
        op && op.sourceData && (_this.sourceData = op.sourceData);
        op && op.dev && (_this.dev = op.dev);
        op && op.cid ? (_this.cid = op.cid) : (_this.cid = _this.genID());
        return _this;
    }
    Go.prototype.runder = function () {
        this._loadComponent(this.dev);
    };
    // 得到数据仓库
    Go.prototype.getAppStore = function () {
        return appStore;
    };
    // 运行时动态设置数据仓库
    Go._setAppStore = function (_appStore) {
        appStore = _appStore;
    };
    Go.prototype.genID = function () {
        return (Math.random()
            .toString()
            .substr(3, 10) + Date.now()).toString();
    };
    Object.defineProperty(Go.prototype, "zIndex", {
        // 获取当前层级
        get: function () {
            var _this = this;
            var index = this.callState('menuList').findIndex(function (v) { return v.cid === _this.cid; });
            return index;
        },
        // 获取当前层级
        set: function (val) {
            this.z = val;
            // this.callMutation("menuList").findIndex((v) => v.cid == this.cid);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Go.prototype, "isSelect", {
        // 获取当前层级
        // public set eventNum(val: number) {
        //   this.callMutation("menuList").findIndex((v) => v.cid == this.cid);
        // }
        // 获取是否是选中状态
        get: function () {
            return this.callState('selectd').includes(this.cid);
        },
        // public get functionData(): any[] {
        //   return this.callState('list').filter(v => v.cid === this.cid)[0].actionData
        // }
        // // 设置选中状态
        // public set functionData(val: any[]) {
        //   console.log(val)
        //   // this.callMutation("setSelect", this.cid);
        // }
        // 设置选中状态
        set: function (val) {
            // this.callMutation("setSelect", this.cid);
        },
        enumerable: false,
        configurable: true
    });
    return Go;
}(LoadComs));

// 创建图表
var createComponent = function (type, op) {
    if (!type) {
        console.log('!请传入正确的组件类型');
        return;
    }
    return new Go(type, op).runder();
};
var analysis = function (list) {
    list.forEach(function (item) {
        createComponent(item.type, item);
    });
};

var RuntimeServer = /** @class */ (function (_super) {
    __extends(RuntimeServer, _super);
    function RuntimeServer() {
        return _super.call(this) || this;
    }
    // 设置数据仓库
    RuntimeServer.prototype.setAppStore = function (appStore) {
        appStore && Go.setAppStore(appStore);
    };
    RuntimeServer.prototype.setBaseUrl = function (url) {
        url && Go.setBaseUrl(url);
    };
    return RuntimeServer;
}(Go));
var runtimeServer = new RuntimeServer();

function typeseting(list, type, op) {
    var _list = list.map(function (v) { return v; });
    var toplist = list.map(function (v) { return v; });
    var leftlist = list.map(function (v) { return v; });
    var bottomlist = list.map(function (v) { return v; });
    var rightlist = list.map(function (v) { return v; });
    var chlist = list.map(function (v) { return v; });
    var cwlist = list.map(function (v) { return v; });
    var wlist = list.map(function (v) { return v; });
    toplist.sort(function (a, b) { return a.baseData.top - b.baseData.top; });
    leftlist.sort(function (a, b) { return a.baseData.left - b.baseData.left; });
    bottomlist.sort(function (a, b) { return a.baseData.top + a.baseData.height - (b.baseData.top + b.baseData.height); });
    rightlist.sort(function (a, b) { return a.baseData.left + a.baseData.width - (b.baseData.left + b.baseData.width); });
    chlist.sort(function (a, b) { return (a.baseData.top + a.baseData.height) / 2 - (b.baseData.top + b.baseData.height) / 2; });
    cwlist.sort(function (a, b) { return (a.baseData.left + a.baseData.width) / 2 - (b.baseData.left + b.baseData.width) / 2; });
    wlist.sort(function (a, b) { return a.baseData.left - b.baseData.left; });
    var lBox = wlist[0];
    var rBox = _list.sort(function (a, b) {
        return b.baseData.left + b.baseData.width - a.baseData.left + a.baseData.width;
    })[0];
    var tBox = _list.sort(function (a, b) { return a.baseData.top - b.baseData.top; })[0];
    var bBox = _list.sort(function (a, b) { return b.baseData.top + b.baseData.height - (a.baseData.top + a.baseData.height); })[0];
    switch (type) {
        case 0: // 左对齐
            _list.forEach(function (item) {
                item.baseData.left = lBox.baseData.left;
            });
            break;
        case 1: // 右对齐
            var r_1 = rightlist[rightlist.length - 1].baseData.left + rightlist[0].baseData.width;
            _list.forEach(function (item) {
                item.baseData.left = r_1 - item.baseData.width;
            });
            break;
        case 2: // 水平剧中对齐
            var center_1 = (leftlist[0].baseData.left +
                leftlist[leftlist.length - 1].baseData.left +
                leftlist[leftlist.length - 1].baseData.width) /
                2;
            _list.forEach(function (item) {
                item.baseData.left = center_1 - item.baseData.width / 2;
            });
            break;
        case 3: // 顶对齐
            _list.forEach(function (item) {
                item.baseData.top = tBox.baseData.top;
            });
            break;
        case 4: // 底对齐
            _list.forEach(function (item) {
                item.baseData.top = bBox.baseData.top + bBox.baseData.height - item.baseData.height;
            });
            break;
        case 5: // 垂直剧中对齐
            var hcenter_1 = toplist[0].baseData.top +
                (toplist[0].baseData.top +
                    bottomlist[bottomlist.length - 1].baseData.top +
                    bottomlist[bottomlist.length - 1].baseData.height) /
                    2;
            var _center_1 = _list[0].baseData.top + list[0].baseData.height / 2;
            if (!_list.every(function (v) { return v.baseData.top + v.baseData.height / 2 === _center_1; })) {
                _list.forEach(function (item) {
                    // if (item.baseData.top !== hcenter) {
                    item.baseData.top = hcenter_1 - item.baseData.height / 2;
                    // }
                });
            }
            break;
        case 6: // 按顶分布
            var num = toplist.length - 1;
            var height = toplist[toplist.length - 1].baseData.top - toplist[0].baseData.top;
            var step_1 = height / num;
            toplist.map(function (item, index) {
                if (index > 0 && index < toplist.length - 1) {
                    item.baseData.top = toplist[0].baseData.top + step_1 * index;
                }
            });
            _list = toplist;
            break;
        case 7: // 按底分布
            var dnum = bottomlist.length - 1;
            var dheight = bottomlist[bottomlist.length - 1].baseData.top - bottomlist[0].baseData.top;
            var dstep_1 = dheight / dnum;
            bottomlist.map(function (item, index) {
                if (index > 0 && index < bottomlist.length - 1) {
                    item.baseData.top =
                        bottomlist[0].baseData.top +
                            bottomlist[0].baseData.height +
                            dstep_1 * index -
                            item.baseData.height;
                }
            });
            _list = bottomlist;
            break;
        case 8: // 按左分布
            var lnum = leftlist.length - 1;
            var lheight = leftlist[leftlist.length - 1].baseData.left - leftlist[0].baseData.left;
            var lstep_1 = lheight / lnum;
            leftlist.map(function (item, index) {
                if (index > 0 && index < leftlist.length - 1) {
                    item.baseData.left = leftlist[0].baseData.left + lstep_1 * index;
                }
            });
            _list = leftlist;
            break;
        case 9: // 垂直剧中分布
            var cnum = chlist.length - 1;
            var cheight = chlist[chlist.length - 1].baseData.top - chlist[0].baseData.top;
            var cstep_1 = cheight / cnum;
            chlist.map(function (item, index) {
                if (index > 0 && index < chlist.length - 1) {
                    item.baseData.top =
                        chlist[0].baseData.top +
                            chlist[0].baseData.height / 2 +
                            cstep_1 * index -
                            item.baseData.height / 2;
                }
            });
            _list = chlist;
            break;
        case 10: // 按右分布
            var rnum = rightlist.length - 1;
            var rheight = rightlist[rightlist.length - 1].baseData.left +
                rightlist[rightlist.length - 1].baseData.width -
                (rightlist[0].baseData.left + rightlist[0].baseData.width);
            var rstep_1 = rheight / rnum;
            rightlist.map(function (item, index) {
                if (index > 0 && index < rightlist.length - 1) {
                    item.baseData.left =
                        rightlist[0].baseData.left +
                            rightlist[0].baseData.width +
                            rstep_1 * index -
                            item.baseData.width;
                }
            });
            _list = rightlist;
            break;
        case 11: // 水平剧中分布
            var cwnum = chlist.length - 1;
            var cwheight = chlist[chlist.length - 1].baseData.top - chlist[0].baseData.top;
            var cwstep_1 = cwheight / cwnum;
            cwlist.map(function (item, index) {
                if (index > 0 && index < chlist.length - 1) {
                    item.baseData.left =
                        chlist[0].baseData.left +
                            chlist[0].baseData.width / 2 +
                            cwstep_1 * index -
                            item.baseData.width / 2;
                }
            });
            _list = cwlist;
            break;
        default:
            break;
    }
    return _list;
}

var _ = require('lodash');
const setAttr = (array, id, attr) => {
    let element;
    for (let index = 0; index < array.length; index++) {
        element = array[index];
        if (element.cid == id || element.id == id) {
            console.log(element);
            element[attr] = !element[attr];
        }
    }
};
const RecursiveList = (array, calback = () => { }) => {
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        element.index = index;
        if (element.children && element.children.length) {
            RecursiveList(element.children);
        } else {
            calback(element);
        }
    }
};
const genID = () => {
    return (
        Math.random()
            .toString()
            .substr(3, 10) + Date.now()
    ).toString()
};

const store = {
    namespaced: true,
    state: {
        selectd: [],// 当前选中组件
        baseComs: [],
        list: [],
        menuList: [],
        multiple: false,
        undos: [],
        redos: [],
        catch: {
            selectd: [],
            menuList: [],
            list: []
        }
    },
    getters: {
        // 获取自定义state
        getState: (state) => (name) => {
            return state[name]
        },
        // 获取自定义state
        getState2: (state) => (id, type) => {
            return state[id + '-' + type]
        }
    },
    actions: {
        //新增作i菜单
        addMenuItem({ commit, state }, reload) {
            if (reload.type != "Other.Plant.Normal") {
                state.menuList.push({
                    lv: 0,
                    id: reload.cid,
                    name: reload.name,
                    children: [],
                    isLock: reload.isLock,
                    isShow: reload.isShow
                });
            }
            commit('syncMenuInfo');
        },
        //修改左侧菜单
        eidtMenuItem({ commit, state }, reload) {
            state.menuList = reload;
            commit('syncMenuInfo');
        },
        menuListSplit({ commit, state }, reload) {
            let targetItemIndex = state.menuList.findIndex(v => v.id == reload);
            let targetItem = state.menuList[targetItemIndex];

            const sp = (array) => {
                for (let index = 0; index < array.length; index++) {
                    const element = array[index];
                    if (element.id === reload) {
                        let lv0 = element.lv;
                        element.lv = lv0 + 1;
                        element.index = 0;
                        array.splice(index, 1, {
                            id: genID(),
                            lv: lv0,
                            toggle: true,
                            name: '新建分组',
                            children: [element],

                        });

                    } else {

                        if (element.children && element.children.length) {
                            sp(element.children);
                        }

                    }

                }
            };
            sp(state.menuList);




            // state.menuList.splice(targetItemIndex, 1, {
            //     id: targetItem.pid,
            //     name: '新建分组',
            //     children: [targetItem]
            // });
            commit('syncMenuInfo');

        },
        //复制组件
        clone({ commit, state }, reload) {
            //暂时只支持一个组件的复制 == 后续增加组的复制
            if (!(reload instanceof Array)) {
                let item = { ...(state.list.filter(v => v.cid == reload)[0]) };
                let type = item.type;
                delete item.type;
                item.name = item.name + 'copy';
                createComponent(type, item);
            } else {
                console.log('待定!');
            }
            commit('syncMenuInfo');
        },


    },
    mutations: {
        // 清空数据
        reset(state) {
            state.selectd = [];
            state.baseComs = [];
            state.list = [];
            state.menuList = [];
            state.multiple = false;
            state.undos = [];
            state.redos = [];
            state.catch = {
                selectd: [],
                menuList: [],
                list: []
            };
        },
        // 清空数据
        setData(state, reload) {
            state.selectd = reload.selectd;
            state.menuList = reload.selectd;

        },
        //存储原始组件类型
        addBaseComs(state, reload) {
            if (state.baseComs.findIndex(v => v.cid == reload.cid) == -1) {
                state.baseComs.push(reload);
            }
        },
        setMultiple(state, reload) {
            state.multiple = reload;
        },
        //设置当激活的组件
        setSelect(state, reload) {
            if (reload instanceof Array) {
                state.selectd = reload;
            } else {
                state.selectd = [reload];
            }
        },
        // 删除元素
        delListItem(state, reload) {
            let index = state.list.findIndex(v => v.cid == reload);
            let selectdIndex = state.selectd.findIndex(v => v.cid == reload);
            if (selectdIndex > -1) {
                state.list.splice(selectdIndex, 1);
            }
            state.list.splice(index, 1);
            let index2 = state.menuList.findIndex(v => v == reload);
            state.menuList.splice(index2, 1);

        },
        // //新增左侧菜单
        // addMenuItem2(state, reload) {
        //     if (reload.type != "Other.Plant.Normal") {
        //         state.menuList.push({
        //             id: reload.cid,
        //             name: reload.name
        //         })
        //     }
        // },
        syncMenuInfo(state) {
            RecursiveList(state.menuList, (e) => {
                let zid = e.lv * 10 + e.index;
                state.list.filter(v => v.cid == e.id)[0].z = (10000 - zid);
            });
        },
        // //修改左侧菜单
        // eidtMenuItem(state, reload) {
        //     state.menuList = reload
        // },
        // 新增组件实例
        addComs(state, reload) {
            state.list.push(reload);
        },
        //复制组件
        // clone(state, reload) {
        //     if (!(reload instanceof Array)) {
        //         let item = { ...(state.list.filter(v => v.cid == reload)[0]) }
        //         delete item.type
        //         item.name = item.name + 'copy'
        //         createComponent(item.typeId, item)
        //     } else {
        //         console.log('待定!')
        //     }
        // },
        updataName(state, reload) {
            let element;
            let array = state.list;
            for (let index = 0; index < array.length; index++) {
                element = array[index];
                if (element.cid == reload.cid) {
                    element.name = reload.name;
                }
            }
        },
        //更新可见状态
        updataShow(state, reload) {
            if (reload instanceof Array) {
                for (let i = state.list.length; i--;) {
                    for (let index = 0; index < reload.length; index++) {
                        setAttr(state.list, reload[index], 'isShow');
                        setAttr(state.menuList, reload[index], 'isShow');
                    }
                }
            } else {
                setAttr(state.list, reload, 'isShow');
                setAttr(state.menuList, reload, 'isShow');
            }
        },
        //更新s锁定状态
        updataLock(state, reload) {
            if (reload instanceof Array) {
                for (let i = state.list.length; i--;) {
                    for (let index = 0; index < reload.length; index++) {
                        setAttr(state.list, reload[index], 'isLock');
                        setAttr(state.menuList, reload[index], 'isLock');
                    }

                }
            } else {
                setAttr(state.list, reload, 'isLock');
                setAttr(state.menuList, reload, 'isLock');

            }

        },
        //更新位置信息
        updataBaseData(state, reload) {
            state.list.map(v => {
                if (v.cid == reload.cid) {
                    let cData = JSON.parse(JSON.stringify(v.baseData));
                    v.baseData = Object.assign(cData, reload.baseData);
                }
            });

        },
        //更新配置信息
        updataOptionData(state, reload) {
            state.list.map(v => {
                if (v.cid == reload.cid) {
                    let cData = JSON.parse(JSON.stringify(v.optionData));
                    v.optionData = Object.assign(cData, reload.optionData);
                }
            });

        },
        //更新配置信息
        updataSourceData(state, reload) {
            state.list.map(v => {
                if (v.cid == reload.cid) {
                    let cData = JSON.parse(JSON.stringify(v.sourceData));
                    v.sourceData = Object.assign(cData, reload.sourceData);
                }
            });

        },

        //批量更新位置信息
        multipleUpdataBaseData(state, reload) {
            let list = state.list;
            let selectd = state.selectd;
            for (let i = list.length; i--;) {
                if (selectd.includes(list[i].cid)) {
                    let cData = JSON.parse(JSON.stringify(list[i].baseData));
                    cData.left = cData.left + reload.deltaX;
                    cData.top = cData.top + reload.deltaY;
                    list[i].baseData = cData;
                }
            }
        },

        //设置交互信息
        setActionData(state, reload) {
            let list = state.list;
            for (let i = list.length; i--;) {
                if (reload[0].bindKey == list[i].cid) {
                    list[i].functionData = reload[1];
                }
            }
            // state[reload[0].bindKey + '-' + reload[0].actiontype] = reload[0].bindVal
        },
        //设置交互信息
        setActionSource(state, reload) {
            let list = state.list;
            for (let i = list.length; i--;) {
                if (reload[1] == list[i].cid) {
                    list[i].actionSource.reload[0] = reload[2];
                }
            }
        },
        //设置交互信息
        setActions(state, reload) {
            let list = state.list;
            for (let i = list.length; i--;) {
                if (reload.implement.cid == list[i].cid) {
                    list[i].actions.add(reload);
                }
            }
        },
        //更新交互信息
        updataActionData(state, reload) {
            let list = state.list;
            for (let i = list.length; i--;) {
                let item = list[i];
                let _index = Array.from(item.actions).find(v => JSON.stringify(v.source) == JSON.stringify(reload));
                if (_index) {
                    item.actionSource = reload;
                }
            }
            state[reload[0]] = reload[1];
        },
        //排版-对齐-分布
        typeseting(state, reload) {
            let list = state.list;
            let selectd = state.selectd;
            let selectList = list.filter(v => selectd.includes(v.cid));
            state.list = typeseting(selectList, reload);
            // for (let i = list.length; i--;) {
            //     if (selectd.includes(list[i].cid)) {
            //         let cData = JSON.parse(JSON.stringify(list[i].baseData))
            //         cData.left = cData.left + reload.deltaX
            //         cData.top = cData.top + reload.deltaY
            //         list[i].baseData = cData
            //     }
            // }
        },
        createItem(state) {
            state.catch = {
                selectd: [...state.selectd],
                menuList: [...state.menuList],
                list: state.list.map(v => {
                    return _.cloneDeep(v)
                    let com = v.com;
                    let tmp = v.tmp;
                    let item = JSON.parse(JSON.stringify(v));
                    item.com = com;
                    item.tmp = tmp;
                    return item
                })
            };
        },
        resetData(state, data) {
            state.selected = data.selected;
            state.menuList = data.menuList;
            state.list = data.list;
        },
        execute(state) {
            this.commit('GoCom/createItem');
            if (state.undos.length < 200) {
                state.undos.push(state.catch);
            } else {
                state.undos.shift();
                state.undos.push(state.catch);
            }


        },
        undo(state) {
            if (state.undos.length > 0) {
                let item = state.undos.pop();
                state.redos.push(state.catch);
                state.catch = item;
                this.commit('GoCom/resetData', item);
            }

        },
        redo(state) {
            if (state.redos.length > 0) {
                let item = state.redos.pop();
                state.undos.push(state.catch);
                state.catch = item;
                this.commit('GoCom/resetData', item);
            }
        }
    }
};

export { createComponent, analysis, runtimeServer, store };
//# sourceMappingURL=go-coms.es5.js.map
