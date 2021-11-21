var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __commonJS = (callback, module) => () => {
  if (!module) {
    module = {exports: {}};
    callback(module.exports, module);
  }
  return module.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {get: all[name], enumerable: true});
};
var __exportStar = (target, module, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module) => {
  return __exportStar(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? {get: () => module.default, enumerable: true} : {value: module, enumerable: true})), module);
};

// docs/snowpack/pkg/common/formik.esm-c35373e0.js
var require_formik_esm_c35373e0 = __commonJS((exports, module) => {
  __markAsModule(exports);
  __export(exports, {
    E: () => ErrorMessage,
    F: () => Formik,
    a: () => Form,
    b: () => Field,
    c: () => FieldArray,
    g: () => getIn3,
    u: () => useFormikContext
  });
  var isArray2 = Array.isArray;
  var keyList = Object.keys;
  var hasProp = Object.prototype.hasOwnProperty;
  var hasElementType = typeof Element !== "undefined";
  function equal(a3, b5) {
    if (a3 === b5)
      return true;
    if (a3 && b5 && typeof a3 == "object" && typeof b5 == "object") {
      var arrA = isArray2(a3), arrB = isArray2(b5), i2, length, key;
      if (arrA && arrB) {
        length = a3.length;
        if (length != b5.length)
          return false;
        for (i2 = length; i2-- !== 0; )
          if (!equal(a3[i2], b5[i2]))
            return false;
        return true;
      }
      if (arrA != arrB)
        return false;
      var dateA = a3 instanceof Date, dateB = b5 instanceof Date;
      if (dateA != dateB)
        return false;
      if (dateA && dateB)
        return a3.getTime() == b5.getTime();
      var regexpA = a3 instanceof RegExp, regexpB = b5 instanceof RegExp;
      if (regexpA != regexpB)
        return false;
      if (regexpA && regexpB)
        return a3.toString() == b5.toString();
      var keys3 = keyList(a3);
      length = keys3.length;
      if (length !== keyList(b5).length)
        return false;
      for (i2 = length; i2-- !== 0; )
        if (!hasProp.call(b5, keys3[i2]))
          return false;
      if (hasElementType && a3 instanceof Element && b5 instanceof Element)
        return a3 === b5;
      for (i2 = length; i2-- !== 0; ) {
        key = keys3[i2];
        if (key === "_owner" && a3.$$typeof) {
          continue;
        } else {
          if (!equal(a3[key], b5[key]))
            return false;
        }
      }
      return true;
    }
    return a3 !== a3 && b5 !== b5;
  }
  var reactFastCompare = function exportedEqual(a3, b5) {
    try {
      return equal(a3, b5);
    } catch (error) {
      if (error.message && error.message.match(/stack|recursion/i) || error.number === -2146828260) {
        console.warn("Warning: react-fast-compare does not handle circular references.", error.name, error.message);
        return false;
      }
      throw error;
    }
  };
  var isMergeableObject = function isMergeableObject2(value) {
    return isNonNullObject(value) && !isSpecial(value);
  };
  function isNonNullObject(value) {
    return !!value && typeof value === "object";
  }
  function isSpecial(value) {
    var stringValue = Object.prototype.toString.call(value);
    return stringValue === "[object RegExp]" || stringValue === "[object Date]" || isReactElement(value);
  }
  var canUseSymbol = typeof Symbol === "function" && Symbol.for;
  var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for("react.element") : 60103;
  function isReactElement(value) {
    return value.$$typeof === REACT_ELEMENT_TYPE;
  }
  function emptyTarget(val) {
    return Array.isArray(val) ? [] : {};
  }
  function cloneUnlessOtherwiseSpecified(value, options) {
    return options.clone !== false && options.isMergeableObject(value) ? deepmerge2(emptyTarget(value), value, options) : value;
  }
  function defaultArrayMerge(target, source, options) {
    return target.concat(source).map(function(element) {
      return cloneUnlessOtherwiseSpecified(element, options);
    });
  }
  function mergeObject(target, source, options) {
    var destination = {};
    if (options.isMergeableObject(target)) {
      Object.keys(target).forEach(function(key) {
        destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
      });
    }
    Object.keys(source).forEach(function(key) {
      if (!options.isMergeableObject(source[key]) || !target[key]) {
        destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
      } else {
        destination[key] = deepmerge2(target[key], source[key], options);
      }
    });
    return destination;
  }
  function deepmerge2(target, source, options) {
    options = options || {};
    options.arrayMerge = options.arrayMerge || defaultArrayMerge;
    options.isMergeableObject = options.isMergeableObject || isMergeableObject;
    var sourceIsArray = Array.isArray(source);
    var targetIsArray = Array.isArray(target);
    var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;
    if (!sourceAndTargetTypesMatch) {
      return cloneUnlessOtherwiseSpecified(source, options);
    } else if (sourceIsArray) {
      return options.arrayMerge(target, source, options);
    } else {
      return mergeObject(target, source, options);
    }
  }
  deepmerge2.all = function deepmergeAll(array2, options) {
    if (!Array.isArray(array2)) {
      throw new Error("first argument should be an array");
    }
    return array2.reduce(function(prev, next) {
      return deepmerge2(prev, next, options);
    }, {});
  };
  var deepmerge_1 = deepmerge2;
  var freeGlobal2 = typeof global == "object" && global && global.Object === Object && global;
  var freeSelf2 = typeof self == "object" && self && self.Object === Object && self;
  var root2 = freeGlobal2 || freeSelf2 || Function("return this")();
  var Symbol$12 = root2.Symbol;
  var objectProto2 = Object.prototype;
  var hasOwnProperty3 = objectProto2.hasOwnProperty;
  var nativeObjectToString2 = objectProto2.toString;
  var symToStringTag2 = Symbol$12 ? Symbol$12.toStringTag : void 0;
  function getRawTag2(value) {
    var isOwn = hasOwnProperty3.call(value, symToStringTag2), tag = value[symToStringTag2];
    try {
      value[symToStringTag2] = void 0;
      var unmasked = true;
    } catch (e5) {
    }
    var result = nativeObjectToString2.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag2] = tag;
      } else {
        delete value[symToStringTag2];
      }
    }
    return result;
  }
  var objectProto$12 = Object.prototype;
  var nativeObjectToString$12 = objectProto$12.toString;
  function objectToString2(value) {
    return nativeObjectToString$12.call(value);
  }
  var nullTag2 = "[object Null]";
  var undefinedTag2 = "[object Undefined]";
  var symToStringTag$12 = Symbol$12 ? Symbol$12.toStringTag : void 0;
  function baseGetTag2(value) {
    if (value == null) {
      return value === void 0 ? undefinedTag2 : nullTag2;
    }
    return symToStringTag$12 && symToStringTag$12 in Object(value) ? getRawTag2(value) : objectToString2(value);
  }
  function overArg2(func, transform2) {
    return function(arg) {
      return func(transform2(arg));
    };
  }
  var getPrototype = overArg2(Object.getPrototypeOf, Object);
  function isObjectLike2(value) {
    return value != null && typeof value == "object";
  }
  var objectTag2 = "[object Object]";
  var funcProto2 = Function.prototype;
  var objectProto$22 = Object.prototype;
  var funcToString2 = funcProto2.toString;
  var hasOwnProperty$12 = objectProto$22.hasOwnProperty;
  var objectCtorString = funcToString2.call(Object);
  function isPlainObject2(value) {
    if (!isObjectLike2(value) || baseGetTag2(value) != objectTag2) {
      return false;
    }
    var proto = getPrototype(value);
    if (proto === null) {
      return true;
    }
    var Ctor = hasOwnProperty$12.call(proto, "constructor") && proto.constructor;
    return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString2.call(Ctor) == objectCtorString;
  }
  function listCacheClear2() {
    this.__data__ = [];
    this.size = 0;
  }
  function eq2(value, other) {
    return value === other || value !== value && other !== other;
  }
  function assocIndexOf2(array2, key) {
    var length = array2.length;
    while (length--) {
      if (eq2(array2[length][0], key)) {
        return length;
      }
    }
    return -1;
  }
  var arrayProto2 = Array.prototype;
  var splice2 = arrayProto2.splice;
  function listCacheDelete2(key) {
    var data = this.__data__, index = assocIndexOf2(data, key);
    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice2.call(data, index, 1);
    }
    --this.size;
    return true;
  }
  function listCacheGet2(key) {
    var data = this.__data__, index = assocIndexOf2(data, key);
    return index < 0 ? void 0 : data[index][1];
  }
  function listCacheHas2(key) {
    return assocIndexOf2(this.__data__, key) > -1;
  }
  function listCacheSet2(key, value) {
    var data = this.__data__, index = assocIndexOf2(data, key);
    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }
  function ListCache2(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  ListCache2.prototype.clear = listCacheClear2;
  ListCache2.prototype["delete"] = listCacheDelete2;
  ListCache2.prototype.get = listCacheGet2;
  ListCache2.prototype.has = listCacheHas2;
  ListCache2.prototype.set = listCacheSet2;
  function stackClear2() {
    this.__data__ = new ListCache2();
    this.size = 0;
  }
  function stackDelete2(key) {
    var data = this.__data__, result = data["delete"](key);
    this.size = data.size;
    return result;
  }
  function stackGet2(key) {
    return this.__data__.get(key);
  }
  function stackHas2(key) {
    return this.__data__.has(key);
  }
  function isObject2(value) {
    var type = typeof value;
    return value != null && (type == "object" || type == "function");
  }
  var asyncTag2 = "[object AsyncFunction]";
  var funcTag2 = "[object Function]";
  var genTag2 = "[object GeneratorFunction]";
  var proxyTag2 = "[object Proxy]";
  function isFunction2(value) {
    if (!isObject2(value)) {
      return false;
    }
    var tag = baseGetTag2(value);
    return tag == funcTag2 || tag == genTag2 || tag == asyncTag2 || tag == proxyTag2;
  }
  var coreJsData2 = root2["__core-js_shared__"];
  var maskSrcKey2 = function() {
    var uid = /[^.]+$/.exec(coreJsData2 && coreJsData2.keys && coreJsData2.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
  }();
  function isMasked2(func) {
    return !!maskSrcKey2 && maskSrcKey2 in func;
  }
  var funcProto$12 = Function.prototype;
  var funcToString$12 = funcProto$12.toString;
  function toSource2(func) {
    if (func != null) {
      try {
        return funcToString$12.call(func);
      } catch (e5) {
      }
      try {
        return func + "";
      } catch (e5) {
      }
    }
    return "";
  }
  var reRegExpChar2 = /[\\^$.*+?()[\]{}|]/g;
  var reIsHostCtor2 = /^\[object .+?Constructor\]$/;
  var funcProto$2 = Function.prototype;
  var objectProto$32 = Object.prototype;
  var funcToString$2 = funcProto$2.toString;
  var hasOwnProperty$22 = objectProto$32.hasOwnProperty;
  var reIsNative2 = RegExp("^" + funcToString$2.call(hasOwnProperty$22).replace(reRegExpChar2, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
  function baseIsNative2(value) {
    if (!isObject2(value) || isMasked2(value)) {
      return false;
    }
    var pattern = isFunction2(value) ? reIsNative2 : reIsHostCtor2;
    return pattern.test(toSource2(value));
  }
  function getValue3(object2, key) {
    return object2 == null ? void 0 : object2[key];
  }
  function getNative2(object2, key) {
    var value = getValue3(object2, key);
    return baseIsNative2(value) ? value : void 0;
  }
  var Map2 = getNative2(root2, "Map");
  var nativeCreate2 = getNative2(Object, "create");
  function hashClear2() {
    this.__data__ = nativeCreate2 ? nativeCreate2(null) : {};
    this.size = 0;
  }
  function hashDelete2(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }
  var HASH_UNDEFINED2 = "__lodash_hash_undefined__";
  var objectProto$42 = Object.prototype;
  var hasOwnProperty$32 = objectProto$42.hasOwnProperty;
  function hashGet2(key) {
    var data = this.__data__;
    if (nativeCreate2) {
      var result = data[key];
      return result === HASH_UNDEFINED2 ? void 0 : result;
    }
    return hasOwnProperty$32.call(data, key) ? data[key] : void 0;
  }
  var objectProto$52 = Object.prototype;
  var hasOwnProperty$42 = objectProto$52.hasOwnProperty;
  function hashHas2(key) {
    var data = this.__data__;
    return nativeCreate2 ? data[key] !== void 0 : hasOwnProperty$42.call(data, key);
  }
  var HASH_UNDEFINED$12 = "__lodash_hash_undefined__";
  function hashSet2(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = nativeCreate2 && value === void 0 ? HASH_UNDEFINED$12 : value;
    return this;
  }
  function Hash2(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  Hash2.prototype.clear = hashClear2;
  Hash2.prototype["delete"] = hashDelete2;
  Hash2.prototype.get = hashGet2;
  Hash2.prototype.has = hashHas2;
  Hash2.prototype.set = hashSet2;
  function mapCacheClear2() {
    this.size = 0;
    this.__data__ = {
      hash: new Hash2(),
      map: new (Map2 || ListCache2)(),
      string: new Hash2()
    };
  }
  function isKeyable2(value) {
    var type = typeof value;
    return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
  }
  function getMapData2(map2, key) {
    var data = map2.__data__;
    return isKeyable2(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
  }
  function mapCacheDelete2(key) {
    var result = getMapData2(this, key)["delete"](key);
    this.size -= result ? 1 : 0;
    return result;
  }
  function mapCacheGet2(key) {
    return getMapData2(this, key).get(key);
  }
  function mapCacheHas2(key) {
    return getMapData2(this, key).has(key);
  }
  function mapCacheSet2(key, value) {
    var data = getMapData2(this, key), size = data.size;
    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }
  function MapCache2(entries) {
    var index = -1, length = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  MapCache2.prototype.clear = mapCacheClear2;
  MapCache2.prototype["delete"] = mapCacheDelete2;
  MapCache2.prototype.get = mapCacheGet2;
  MapCache2.prototype.has = mapCacheHas2;
  MapCache2.prototype.set = mapCacheSet2;
  var LARGE_ARRAY_SIZE2 = 200;
  function stackSet2(key, value) {
    var data = this.__data__;
    if (data instanceof ListCache2) {
      var pairs = data.__data__;
      if (!Map2 || pairs.length < LARGE_ARRAY_SIZE2 - 1) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new MapCache2(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }
  function Stack3(entries) {
    var data = this.__data__ = new ListCache2(entries);
    this.size = data.size;
  }
  Stack3.prototype.clear = stackClear2;
  Stack3.prototype["delete"] = stackDelete2;
  Stack3.prototype.get = stackGet2;
  Stack3.prototype.has = stackHas2;
  Stack3.prototype.set = stackSet2;
  function arrayEach(array2, iteratee) {
    var index = -1, length = array2 == null ? 0 : array2.length;
    while (++index < length) {
      if (iteratee(array2[index], index, array2) === false) {
        break;
      }
    }
    return array2;
  }
  var defineProperty3 = function() {
    try {
      var func = getNative2(Object, "defineProperty");
      func({}, "", {});
      return func;
    } catch (e5) {
    }
  }();
  function baseAssignValue2(object2, key, value) {
    if (key == "__proto__" && defineProperty3) {
      defineProperty3(object2, key, {
        configurable: true,
        enumerable: true,
        value,
        writable: true
      });
    } else {
      object2[key] = value;
    }
  }
  var objectProto$62 = Object.prototype;
  var hasOwnProperty$52 = objectProto$62.hasOwnProperty;
  function assignValue(object2, key, value) {
    var objValue = object2[key];
    if (!(hasOwnProperty$52.call(object2, key) && eq2(objValue, value)) || value === void 0 && !(key in object2)) {
      baseAssignValue2(object2, key, value);
    }
  }
  function copyObject(source, props, object2, customizer) {
    var isNew = !object2;
    object2 || (object2 = {});
    var index = -1, length = props.length;
    while (++index < length) {
      var key = props[index];
      var newValue = customizer ? customizer(object2[key], source[key], key, object2, source) : void 0;
      if (newValue === void 0) {
        newValue = source[key];
      }
      if (isNew) {
        baseAssignValue2(object2, key, newValue);
      } else {
        assignValue(object2, key, newValue);
      }
    }
    return object2;
  }
  function baseTimes2(n5, iteratee) {
    var index = -1, result = Array(n5);
    while (++index < n5) {
      result[index] = iteratee(index);
    }
    return result;
  }
  var argsTag2 = "[object Arguments]";
  function baseIsArguments2(value) {
    return isObjectLike2(value) && baseGetTag2(value) == argsTag2;
  }
  var objectProto$72 = Object.prototype;
  var hasOwnProperty$62 = objectProto$72.hasOwnProperty;
  var propertyIsEnumerable2 = objectProto$72.propertyIsEnumerable;
  var isArguments2 = baseIsArguments2(function() {
    return arguments;
  }()) ? baseIsArguments2 : function(value) {
    return isObjectLike2(value) && hasOwnProperty$62.call(value, "callee") && !propertyIsEnumerable2.call(value, "callee");
  };
  var isArray$1 = Array.isArray;
  function stubFalse2() {
    return false;
  }
  var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
  var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var Buffer2 = moduleExports ? root2.Buffer : void 0;
  var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
  var isBuffer = nativeIsBuffer || stubFalse2;
  var MAX_SAFE_INTEGER2 = 9007199254740991;
  var reIsUint2 = /^(?:0|[1-9]\d*)$/;
  function isIndex2(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER2 : length;
    return !!length && (type == "number" || type != "symbol" && reIsUint2.test(value)) && (value > -1 && value % 1 == 0 && value < length);
  }
  var MAX_SAFE_INTEGER$12 = 9007199254740991;
  function isLength2(value) {
    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$12;
  }
  var argsTag$12 = "[object Arguments]";
  var arrayTag2 = "[object Array]";
  var boolTag2 = "[object Boolean]";
  var dateTag2 = "[object Date]";
  var errorTag2 = "[object Error]";
  var funcTag$12 = "[object Function]";
  var mapTag2 = "[object Map]";
  var numberTag2 = "[object Number]";
  var objectTag$12 = "[object Object]";
  var regexpTag2 = "[object RegExp]";
  var setTag2 = "[object Set]";
  var stringTag2 = "[object String]";
  var weakMapTag2 = "[object WeakMap]";
  var arrayBufferTag2 = "[object ArrayBuffer]";
  var dataViewTag2 = "[object DataView]";
  var float32Tag2 = "[object Float32Array]";
  var float64Tag2 = "[object Float64Array]";
  var int8Tag2 = "[object Int8Array]";
  var int16Tag2 = "[object Int16Array]";
  var int32Tag2 = "[object Int32Array]";
  var uint8Tag2 = "[object Uint8Array]";
  var uint8ClampedTag2 = "[object Uint8ClampedArray]";
  var uint16Tag2 = "[object Uint16Array]";
  var uint32Tag2 = "[object Uint32Array]";
  var typedArrayTags2 = {};
  typedArrayTags2[float32Tag2] = typedArrayTags2[float64Tag2] = typedArrayTags2[int8Tag2] = typedArrayTags2[int16Tag2] = typedArrayTags2[int32Tag2] = typedArrayTags2[uint8Tag2] = typedArrayTags2[uint8ClampedTag2] = typedArrayTags2[uint16Tag2] = typedArrayTags2[uint32Tag2] = true;
  typedArrayTags2[argsTag$12] = typedArrayTags2[arrayTag2] = typedArrayTags2[arrayBufferTag2] = typedArrayTags2[boolTag2] = typedArrayTags2[dataViewTag2] = typedArrayTags2[dateTag2] = typedArrayTags2[errorTag2] = typedArrayTags2[funcTag$12] = typedArrayTags2[mapTag2] = typedArrayTags2[numberTag2] = typedArrayTags2[objectTag$12] = typedArrayTags2[regexpTag2] = typedArrayTags2[setTag2] = typedArrayTags2[stringTag2] = typedArrayTags2[weakMapTag2] = false;
  function baseIsTypedArray2(value) {
    return isObjectLike2(value) && isLength2(value.length) && !!typedArrayTags2[baseGetTag2(value)];
  }
  function baseUnary2(func) {
    return function(value) {
      return func(value);
    };
  }
  var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
  var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
  var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
  var freeProcess = moduleExports$1 && freeGlobal2.process;
  var nodeUtil = function() {
    try {
      var types = freeModule$1 && freeModule$1.require && freeModule$1.require("util").types;
      if (types) {
        return types;
      }
      return freeProcess && freeProcess.binding && freeProcess.binding("util");
    } catch (e5) {
    }
  }();
  var nodeIsTypedArray2 = nodeUtil && nodeUtil.isTypedArray;
  var isTypedArray2 = nodeIsTypedArray2 ? baseUnary2(nodeIsTypedArray2) : baseIsTypedArray2;
  var objectProto$82 = Object.prototype;
  var hasOwnProperty$72 = objectProto$82.hasOwnProperty;
  function arrayLikeKeys2(value, inherited) {
    var isArr = isArray$1(value), isArg = !isArr && isArguments2(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray2(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes2(value.length, String) : [], length = result.length;
    for (var key in value) {
      if ((inherited || hasOwnProperty$72.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex2(key, length)))) {
        result.push(key);
      }
    }
    return result;
  }
  var objectProto$92 = Object.prototype;
  function isPrototype2(value) {
    var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$92;
    return value === proto;
  }
  var nativeKeys2 = overArg2(Object.keys, Object);
  var objectProto$a2 = Object.prototype;
  var hasOwnProperty$82 = objectProto$a2.hasOwnProperty;
  function baseKeys2(object2) {
    if (!isPrototype2(object2)) {
      return nativeKeys2(object2);
    }
    var result = [];
    for (var key in Object(object2)) {
      if (hasOwnProperty$82.call(object2, key) && key != "constructor") {
        result.push(key);
      }
    }
    return result;
  }
  function isArrayLike2(value) {
    return value != null && isLength2(value.length) && !isFunction2(value);
  }
  function keys2(object2) {
    return isArrayLike2(object2) ? arrayLikeKeys2(object2) : baseKeys2(object2);
  }
  function baseAssign(object2, source) {
    return object2 && copyObject(source, keys2(source), object2);
  }
  function nativeKeysIn(object2) {
    var result = [];
    if (object2 != null) {
      for (var key in Object(object2)) {
        result.push(key);
      }
    }
    return result;
  }
  var objectProto$b2 = Object.prototype;
  var hasOwnProperty$92 = objectProto$b2.hasOwnProperty;
  function baseKeysIn(object2) {
    if (!isObject2(object2)) {
      return nativeKeysIn(object2);
    }
    var isProto = isPrototype2(object2), result = [];
    for (var key in object2) {
      if (!(key == "constructor" && (isProto || !hasOwnProperty$92.call(object2, key)))) {
        result.push(key);
      }
    }
    return result;
  }
  function keysIn(object2) {
    return isArrayLike2(object2) ? arrayLikeKeys2(object2, true) : baseKeysIn(object2);
  }
  function baseAssignIn(object2, source) {
    return object2 && copyObject(source, keysIn(source), object2);
  }
  var freeExports$2 = typeof exports == "object" && exports && !exports.nodeType && exports;
  var freeModule$2 = freeExports$2 && typeof module == "object" && module && !module.nodeType && module;
  var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;
  var Buffer$1 = moduleExports$2 ? root2.Buffer : void 0;
  var allocUnsafe = Buffer$1 ? Buffer$1.allocUnsafe : void 0;
  function cloneBuffer(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
    buffer.copy(result);
    return result;
  }
  function copyArray(source, array2) {
    var index = -1, length = source.length;
    array2 || (array2 = Array(length));
    while (++index < length) {
      array2[index] = source[index];
    }
    return array2;
  }
  function arrayFilter2(array2, predicate) {
    var index = -1, length = array2 == null ? 0 : array2.length, resIndex = 0, result = [];
    while (++index < length) {
      var value = array2[index];
      if (predicate(value, index, array2)) {
        result[resIndex++] = value;
      }
    }
    return result;
  }
  function stubArray2() {
    return [];
  }
  var objectProto$c2 = Object.prototype;
  var propertyIsEnumerable$12 = objectProto$c2.propertyIsEnumerable;
  var nativeGetSymbols2 = Object.getOwnPropertySymbols;
  var getSymbols2 = !nativeGetSymbols2 ? stubArray2 : function(object2) {
    if (object2 == null) {
      return [];
    }
    object2 = Object(object2);
    return arrayFilter2(nativeGetSymbols2(object2), function(symbol) {
      return propertyIsEnumerable$12.call(object2, symbol);
    });
  };
  function copySymbols(source, object2) {
    return copyObject(source, getSymbols2(source), object2);
  }
  function arrayPush2(array2, values3) {
    var index = -1, length = values3.length, offset2 = array2.length;
    while (++index < length) {
      array2[offset2 + index] = values3[index];
    }
    return array2;
  }
  var nativeGetSymbols$1 = Object.getOwnPropertySymbols;
  var getSymbolsIn = !nativeGetSymbols$1 ? stubArray2 : function(object2) {
    var result = [];
    while (object2) {
      arrayPush2(result, getSymbols2(object2));
      object2 = getPrototype(object2);
    }
    return result;
  };
  function copySymbolsIn(source, object2) {
    return copyObject(source, getSymbolsIn(source), object2);
  }
  function baseGetAllKeys2(object2, keysFunc, symbolsFunc) {
    var result = keysFunc(object2);
    return isArray$1(object2) ? result : arrayPush2(result, symbolsFunc(object2));
  }
  function getAllKeys2(object2) {
    return baseGetAllKeys2(object2, keys2, getSymbols2);
  }
  function getAllKeysIn(object2) {
    return baseGetAllKeys2(object2, keysIn, getSymbolsIn);
  }
  var DataView2 = getNative2(root2, "DataView");
  var Promise$12 = getNative2(root2, "Promise");
  var Set2 = getNative2(root2, "Set");
  var WeakMap$1 = getNative2(root2, "WeakMap");
  var mapTag$12 = "[object Map]";
  var objectTag$22 = "[object Object]";
  var promiseTag2 = "[object Promise]";
  var setTag$12 = "[object Set]";
  var weakMapTag$12 = "[object WeakMap]";
  var dataViewTag$12 = "[object DataView]";
  var dataViewCtorString2 = toSource2(DataView2);
  var mapCtorString2 = toSource2(Map2);
  var promiseCtorString2 = toSource2(Promise$12);
  var setCtorString2 = toSource2(Set2);
  var weakMapCtorString2 = toSource2(WeakMap$1);
  var getTag2 = baseGetTag2;
  if (DataView2 && getTag2(new DataView2(new ArrayBuffer(1))) != dataViewTag$12 || Map2 && getTag2(new Map2()) != mapTag$12 || Promise$12 && getTag2(Promise$12.resolve()) != promiseTag2 || Set2 && getTag2(new Set2()) != setTag$12 || WeakMap$1 && getTag2(new WeakMap$1()) != weakMapTag$12) {
    getTag2 = function(value) {
      var result = baseGetTag2(value), Ctor = result == objectTag$22 ? value.constructor : void 0, ctorString = Ctor ? toSource2(Ctor) : "";
      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString2:
            return dataViewTag$12;
          case mapCtorString2:
            return mapTag$12;
          case promiseCtorString2:
            return promiseTag2;
          case setCtorString2:
            return setTag$12;
          case weakMapCtorString2:
            return weakMapTag$12;
        }
      }
      return result;
    };
  }
  var getTag$1 = getTag2;
  var objectProto$d = Object.prototype;
  var hasOwnProperty$a = objectProto$d.hasOwnProperty;
  function initCloneArray(array2) {
    var length = array2.length, result = new array2.constructor(length);
    if (length && typeof array2[0] == "string" && hasOwnProperty$a.call(array2, "index")) {
      result.index = array2.index;
      result.input = array2.input;
    }
    return result;
  }
  var Uint8Array3 = root2.Uint8Array;
  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array3(result).set(new Uint8Array3(arrayBuffer));
    return result;
  }
  function cloneDataView(dataView, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
    return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
  }
  var reFlags = /\w*$/;
  function cloneRegExp(regexp) {
    var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
    result.lastIndex = regexp.lastIndex;
    return result;
  }
  var symbolProto2 = Symbol$12 ? Symbol$12.prototype : void 0;
  var symbolValueOf2 = symbolProto2 ? symbolProto2.valueOf : void 0;
  function cloneSymbol(symbol) {
    return symbolValueOf2 ? Object(symbolValueOf2.call(symbol)) : {};
  }
  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }
  var boolTag$12 = "[object Boolean]";
  var dateTag$12 = "[object Date]";
  var mapTag$22 = "[object Map]";
  var numberTag$12 = "[object Number]";
  var regexpTag$12 = "[object RegExp]";
  var setTag$22 = "[object Set]";
  var stringTag$12 = "[object String]";
  var symbolTag2 = "[object Symbol]";
  var arrayBufferTag$12 = "[object ArrayBuffer]";
  var dataViewTag$22 = "[object DataView]";
  var float32Tag$1 = "[object Float32Array]";
  var float64Tag$1 = "[object Float64Array]";
  var int8Tag$1 = "[object Int8Array]";
  var int16Tag$1 = "[object Int16Array]";
  var int32Tag$1 = "[object Int32Array]";
  var uint8Tag$1 = "[object Uint8Array]";
  var uint8ClampedTag$1 = "[object Uint8ClampedArray]";
  var uint16Tag$1 = "[object Uint16Array]";
  var uint32Tag$1 = "[object Uint32Array]";
  function initCloneByTag(object2, tag, isDeep) {
    var Ctor = object2.constructor;
    switch (tag) {
      case arrayBufferTag$12:
        return cloneArrayBuffer(object2);
      case boolTag$12:
      case dateTag$12:
        return new Ctor(+object2);
      case dataViewTag$22:
        return cloneDataView(object2, isDeep);
      case float32Tag$1:
      case float64Tag$1:
      case int8Tag$1:
      case int16Tag$1:
      case int32Tag$1:
      case uint8Tag$1:
      case uint8ClampedTag$1:
      case uint16Tag$1:
      case uint32Tag$1:
        return cloneTypedArray(object2, isDeep);
      case mapTag$22:
        return new Ctor();
      case numberTag$12:
      case stringTag$12:
        return new Ctor(object2);
      case regexpTag$12:
        return cloneRegExp(object2);
      case setTag$22:
        return new Ctor();
      case symbolTag2:
        return cloneSymbol(object2);
    }
  }
  var objectCreate = Object.create;
  var baseCreate = function() {
    function object2() {
    }
    return function(proto) {
      if (!isObject2(proto)) {
        return {};
      }
      if (objectCreate) {
        return objectCreate(proto);
      }
      object2.prototype = proto;
      var result = new object2();
      object2.prototype = void 0;
      return result;
    };
  }();
  function initCloneObject(object2) {
    return typeof object2.constructor == "function" && !isPrototype2(object2) ? baseCreate(getPrototype(object2)) : {};
  }
  var mapTag$3 = "[object Map]";
  function baseIsMap(value) {
    return isObjectLike2(value) && getTag$1(value) == mapTag$3;
  }
  var nodeIsMap = nodeUtil && nodeUtil.isMap;
  var isMap = nodeIsMap ? baseUnary2(nodeIsMap) : baseIsMap;
  var setTag$3 = "[object Set]";
  function baseIsSet(value) {
    return isObjectLike2(value) && getTag$1(value) == setTag$3;
  }
  var nodeIsSet = nodeUtil && nodeUtil.isSet;
  var isSet = nodeIsSet ? baseUnary2(nodeIsSet) : baseIsSet;
  var CLONE_DEEP_FLAG = 1;
  var CLONE_FLAT_FLAG = 2;
  var CLONE_SYMBOLS_FLAG = 4;
  var argsTag$22 = "[object Arguments]";
  var arrayTag$12 = "[object Array]";
  var boolTag$2 = "[object Boolean]";
  var dateTag$2 = "[object Date]";
  var errorTag$12 = "[object Error]";
  var funcTag$2 = "[object Function]";
  var genTag$1 = "[object GeneratorFunction]";
  var mapTag$4 = "[object Map]";
  var numberTag$2 = "[object Number]";
  var objectTag$3 = "[object Object]";
  var regexpTag$2 = "[object RegExp]";
  var setTag$4 = "[object Set]";
  var stringTag$2 = "[object String]";
  var symbolTag$12 = "[object Symbol]";
  var weakMapTag$2 = "[object WeakMap]";
  var arrayBufferTag$2 = "[object ArrayBuffer]";
  var dataViewTag$3 = "[object DataView]";
  var float32Tag$2 = "[object Float32Array]";
  var float64Tag$2 = "[object Float64Array]";
  var int8Tag$2 = "[object Int8Array]";
  var int16Tag$2 = "[object Int16Array]";
  var int32Tag$2 = "[object Int32Array]";
  var uint8Tag$2 = "[object Uint8Array]";
  var uint8ClampedTag$2 = "[object Uint8ClampedArray]";
  var uint16Tag$2 = "[object Uint16Array]";
  var uint32Tag$2 = "[object Uint32Array]";
  var cloneableTags = {};
  cloneableTags[argsTag$22] = cloneableTags[arrayTag$12] = cloneableTags[arrayBufferTag$2] = cloneableTags[dataViewTag$3] = cloneableTags[boolTag$2] = cloneableTags[dateTag$2] = cloneableTags[float32Tag$2] = cloneableTags[float64Tag$2] = cloneableTags[int8Tag$2] = cloneableTags[int16Tag$2] = cloneableTags[int32Tag$2] = cloneableTags[mapTag$4] = cloneableTags[numberTag$2] = cloneableTags[objectTag$3] = cloneableTags[regexpTag$2] = cloneableTags[setTag$4] = cloneableTags[stringTag$2] = cloneableTags[symbolTag$12] = cloneableTags[uint8Tag$2] = cloneableTags[uint8ClampedTag$2] = cloneableTags[uint16Tag$2] = cloneableTags[uint32Tag$2] = true;
  cloneableTags[errorTag$12] = cloneableTags[funcTag$2] = cloneableTags[weakMapTag$2] = false;
  function baseClone2(value, bitmask, customizer, key, object2, stack) {
    var result, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
    if (customizer) {
      result = object2 ? customizer(value, key, object2, stack) : customizer(value);
    }
    if (result !== void 0) {
      return result;
    }
    if (!isObject2(value)) {
      return value;
    }
    var isArr = isArray$1(value);
    if (isArr) {
      result = initCloneArray(value);
      if (!isDeep) {
        return copyArray(value, result);
      }
    } else {
      var tag = getTag$1(value), isFunc = tag == funcTag$2 || tag == genTag$1;
      if (isBuffer(value)) {
        return cloneBuffer(value, isDeep);
      }
      if (tag == objectTag$3 || tag == argsTag$22 || isFunc && !object2) {
        result = isFlat || isFunc ? {} : initCloneObject(value);
        if (!isDeep) {
          return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
        }
      } else {
        if (!cloneableTags[tag]) {
          return object2 ? value : {};
        }
        result = initCloneByTag(value, tag, isDeep);
      }
    }
    stack || (stack = new Stack3());
    var stacked = stack.get(value);
    if (stacked) {
      return stacked;
    }
    stack.set(value, result);
    if (isSet(value)) {
      value.forEach(function(subValue) {
        result.add(baseClone2(subValue, bitmask, customizer, subValue, value, stack));
      });
    } else if (isMap(value)) {
      value.forEach(function(subValue, key2) {
        result.set(key2, baseClone2(subValue, bitmask, customizer, key2, value, stack));
      });
    }
    var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys2 : isFlat ? keysIn : keys2;
    var props = isArr ? void 0 : keysFunc(value);
    arrayEach(props || value, function(subValue, key2) {
      if (props) {
        key2 = subValue;
        subValue = value[key2];
      }
      assignValue(result, key2, baseClone2(subValue, bitmask, customizer, key2, value, stack));
    });
    return result;
  }
  var CLONE_SYMBOLS_FLAG$1 = 4;
  function clone2(value) {
    return baseClone2(value, CLONE_SYMBOLS_FLAG$1);
  }
  function arrayMap2(array2, iteratee) {
    var index = -1, length = array2 == null ? 0 : array2.length, result = Array(length);
    while (++index < length) {
      result[index] = iteratee(array2[index], index, array2);
    }
    return result;
  }
  var symbolTag$2 = "[object Symbol]";
  function isSymbol2(value) {
    return typeof value == "symbol" || isObjectLike2(value) && baseGetTag2(value) == symbolTag$2;
  }
  var FUNC_ERROR_TEXT2 = "Expected a function";
  function memoize3(func, resolver) {
    if (typeof func != "function" || resolver != null && typeof resolver != "function") {
      throw new TypeError(FUNC_ERROR_TEXT2);
    }
    var memoized = function() {
      var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache2 = memoized.cache;
      if (cache2.has(key)) {
        return cache2.get(key);
      }
      var result = func.apply(this, args);
      memoized.cache = cache2.set(key, result) || cache2;
      return result;
    };
    memoized.cache = new (memoize3.Cache || MapCache2)();
    return memoized;
  }
  memoize3.Cache = MapCache2;
  var MAX_MEMOIZE_SIZE2 = 500;
  function memoizeCapped2(func) {
    var result = memoize3(func, function(key) {
      if (cache2.size === MAX_MEMOIZE_SIZE2) {
        cache2.clear();
      }
      return key;
    });
    var cache2 = result.cache;
    return result;
  }
  var rePropName2 = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
  var reEscapeChar2 = /\\(\\)?/g;
  var stringToPath2 = memoizeCapped2(function(string2) {
    var result = [];
    if (string2.charCodeAt(0) === 46) {
      result.push("");
    }
    string2.replace(rePropName2, function(match, number2, quote, subString) {
      result.push(quote ? subString.replace(reEscapeChar2, "$1") : number2 || match);
    });
    return result;
  });
  var INFINITY2 = 1 / 0;
  function toKey2(value) {
    if (typeof value == "string" || isSymbol2(value)) {
      return value;
    }
    var result = value + "";
    return result == "0" && 1 / value == -INFINITY2 ? "-0" : result;
  }
  var INFINITY$12 = 1 / 0;
  var symbolProto$12 = Symbol$12 ? Symbol$12.prototype : void 0;
  var symbolToString2 = symbolProto$12 ? symbolProto$12.toString : void 0;
  function baseToString2(value) {
    if (typeof value == "string") {
      return value;
    }
    if (isArray$1(value)) {
      return arrayMap2(value, baseToString2) + "";
    }
    if (isSymbol2(value)) {
      return symbolToString2 ? symbolToString2.call(value) : "";
    }
    var result = value + "";
    return result == "0" && 1 / value == -INFINITY$12 ? "-0" : result;
  }
  function toString2(value) {
    return value == null ? "" : baseToString2(value);
  }
  function toPath(value) {
    if (isArray$1(value)) {
      return arrayMap2(value, toKey2);
    }
    return isSymbol2(value) ? [value] : copyArray(stringToPath2(toString2(value)));
  }
  var CLONE_DEEP_FLAG$1 = 1;
  var CLONE_SYMBOLS_FLAG$2 = 4;
  function cloneDeep(value) {
    return baseClone2(value, CLONE_DEEP_FLAG$1 | CLONE_SYMBOLS_FLAG$2);
  }
  function _extends3() {
    _extends3 = Object.assign || function(target) {
      for (var i2 = 1; i2 < arguments.length; i2++) {
        var source = arguments[i2];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends3.apply(this, arguments);
  }
  function _inheritsLoose2(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }
  function _objectWithoutPropertiesLoose3(source, excluded) {
    if (source == null)
      return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i2;
    for (i2 = 0; i2 < sourceKeys.length; i2++) {
      key = sourceKeys[i2];
      if (excluded.indexOf(key) >= 0)
        continue;
      target[key] = source[key];
    }
    return target;
  }
  function _assertThisInitialized2(self2) {
    if (self2 === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self2;
  }
  var isEmptyArray = function isEmptyArray2(value) {
    return Array.isArray(value) && value.length === 0;
  };
  var isFunction$1 = function isFunction3(obj) {
    return typeof obj === "function";
  };
  var isObject$12 = function isObject3(obj) {
    return obj !== null && typeof obj === "object";
  };
  var isInteger = function isInteger2(obj) {
    return String(Math.floor(Number(obj))) === obj;
  };
  var isString = function isString2(obj) {
    return Object.prototype.toString.call(obj) === "[object String]";
  };
  var isEmptyChildren = function isEmptyChildren2(children) {
    return react.Children.count(children) === 0;
  };
  var isPromise = function isPromise2(value) {
    return isObject$12(value) && isFunction$1(value.then);
  };
  function getIn3(obj, key, def, p5) {
    if (p5 === void 0) {
      p5 = 0;
    }
    var path = toPath(key);
    while (obj && p5 < path.length) {
      obj = obj[path[p5++]];
    }
    return obj === void 0 ? def : obj;
  }
  function setIn(obj, path, value) {
    var res = clone2(obj);
    var resVal = res;
    var i2 = 0;
    var pathArray = toPath(path);
    for (; i2 < pathArray.length - 1; i2++) {
      var currentPath = pathArray[i2];
      var currentObj = getIn3(obj, pathArray.slice(0, i2 + 1));
      if (currentObj && (isObject$12(currentObj) || Array.isArray(currentObj))) {
        resVal = resVal[currentPath] = clone2(currentObj);
      } else {
        var nextPath = pathArray[i2 + 1];
        resVal = resVal[currentPath] = isInteger(nextPath) && Number(nextPath) >= 0 ? [] : {};
      }
    }
    if ((i2 === 0 ? obj : resVal)[pathArray[i2]] === value) {
      return obj;
    }
    if (value === void 0) {
      delete resVal[pathArray[i2]];
    } else {
      resVal[pathArray[i2]] = value;
    }
    if (i2 === 0 && value === void 0) {
      delete res[pathArray[i2]];
    }
    return res;
  }
  function setNestedObjectValues(object2, value, visited, response) {
    if (visited === void 0) {
      visited = new WeakMap();
    }
    if (response === void 0) {
      response = {};
    }
    for (var _i = 0, _Object$keys = Object.keys(object2); _i < _Object$keys.length; _i++) {
      var k5 = _Object$keys[_i];
      var val = object2[k5];
      if (isObject$12(val)) {
        if (!visited.get(val)) {
          visited.set(val, true);
          response[k5] = Array.isArray(val) ? [] : {};
          setNestedObjectValues(val, value, visited, response[k5]);
        }
      } else {
        response[k5] = value;
      }
    }
    return response;
  }
  var FormikContext = /* @__PURE__ */ react.createContext(void 0);
  FormikContext.displayName = "FormikContext";
  var FormikProvider = FormikContext.Provider;
  var FormikConsumer = FormikContext.Consumer;
  function useFormikContext() {
    var formik = react.useContext(FormikContext);
    return formik;
  }
  function formikReducer(state, msg) {
    switch (msg.type) {
      case "SET_VALUES":
        return _extends3({}, state, {
          values: msg.payload
        });
      case "SET_TOUCHED":
        return _extends3({}, state, {
          touched: msg.payload
        });
      case "SET_ERRORS":
        if (reactFastCompare(state.errors, msg.payload)) {
          return state;
        }
        return _extends3({}, state, {
          errors: msg.payload
        });
      case "SET_STATUS":
        return _extends3({}, state, {
          status: msg.payload
        });
      case "SET_ISSUBMITTING":
        return _extends3({}, state, {
          isSubmitting: msg.payload
        });
      case "SET_ISVALIDATING":
        return _extends3({}, state, {
          isValidating: msg.payload
        });
      case "SET_FIELD_VALUE":
        return _extends3({}, state, {
          values: setIn(state.values, msg.payload.field, msg.payload.value)
        });
      case "SET_FIELD_TOUCHED":
        return _extends3({}, state, {
          touched: setIn(state.touched, msg.payload.field, msg.payload.value)
        });
      case "SET_FIELD_ERROR":
        return _extends3({}, state, {
          errors: setIn(state.errors, msg.payload.field, msg.payload.value)
        });
      case "RESET_FORM":
        return _extends3({}, state, msg.payload);
      case "SET_FORMIK_STATE":
        return msg.payload(state);
      case "SUBMIT_ATTEMPT":
        return _extends3({}, state, {
          touched: setNestedObjectValues(state.values, true),
          isSubmitting: true,
          submitCount: state.submitCount + 1
        });
      case "SUBMIT_FAILURE":
        return _extends3({}, state, {
          isSubmitting: false
        });
      case "SUBMIT_SUCCESS":
        return _extends3({}, state, {
          isSubmitting: false
        });
      default:
        return state;
    }
  }
  var emptyErrors = {};
  var emptyTouched = {};
  function useFormik(_ref) {
    var _ref$validateOnChange = _ref.validateOnChange, validateOnChange = _ref$validateOnChange === void 0 ? true : _ref$validateOnChange, _ref$validateOnBlur = _ref.validateOnBlur, validateOnBlur = _ref$validateOnBlur === void 0 ? true : _ref$validateOnBlur, _ref$validateOnMount = _ref.validateOnMount, validateOnMount = _ref$validateOnMount === void 0 ? false : _ref$validateOnMount, isInitialValid = _ref.isInitialValid, _ref$enableReinitiali = _ref.enableReinitialize, enableReinitialize = _ref$enableReinitiali === void 0 ? false : _ref$enableReinitiali, onSubmit = _ref.onSubmit, rest = _objectWithoutPropertiesLoose3(_ref, ["validateOnChange", "validateOnBlur", "validateOnMount", "isInitialValid", "enableReinitialize", "onSubmit"]);
    var props = _extends3({
      validateOnChange,
      validateOnBlur,
      validateOnMount,
      onSubmit
    }, rest);
    var initialValues2 = react.useRef(props.initialValues);
    var initialErrors = react.useRef(props.initialErrors || emptyErrors);
    var initialTouched = react.useRef(props.initialTouched || emptyTouched);
    var initialStatus = react.useRef(props.initialStatus);
    var isMounted = react.useRef(false);
    var fieldRegistry = react.useRef({});
    react.useEffect(function() {
      isMounted.current = true;
      return function() {
        isMounted.current = false;
      };
    }, []);
    var _React$useReducer = react.useReducer(formikReducer, {
      values: props.initialValues,
      errors: props.initialErrors || emptyErrors,
      touched: props.initialTouched || emptyTouched,
      status: props.initialStatus,
      isSubmitting: false,
      isValidating: false,
      submitCount: 0
    }), state = _React$useReducer[0], dispatch = _React$useReducer[1];
    var runValidateHandler = react.useCallback(function(values3, field) {
      return new Promise(function(resolve, reject) {
        var maybePromisedErrors = props.validate(values3, field);
        if (maybePromisedErrors == null) {
          resolve(emptyErrors);
        } else if (isPromise(maybePromisedErrors)) {
          maybePromisedErrors.then(function(errors) {
            resolve(errors || emptyErrors);
          }, function(actualException) {
            reject(actualException);
          });
        } else {
          resolve(maybePromisedErrors);
        }
      });
    }, [props.validate]);
    var runValidationSchema = react.useCallback(function(values3, field) {
      var validationSchema2 = props.validationSchema;
      var schema = isFunction$1(validationSchema2) ? validationSchema2(field) : validationSchema2;
      var promise = field && schema.validateAt ? schema.validateAt(field, values3) : validateYupSchema(values3, schema);
      return new Promise(function(resolve, reject) {
        promise.then(function() {
          resolve(emptyErrors);
        }, function(err) {
          if (err.name === "ValidationError") {
            resolve(yupToFormErrors(err));
          } else {
            reject(err);
          }
        });
      });
    }, [props.validationSchema]);
    var runSingleFieldLevelValidation = react.useCallback(function(field, value) {
      return new Promise(function(resolve) {
        return resolve(fieldRegistry.current[field].validate(value));
      });
    }, []);
    var runFieldLevelValidations = react.useCallback(function(values3) {
      var fieldKeysWithValidation = Object.keys(fieldRegistry.current).filter(function(f4) {
        return isFunction$1(fieldRegistry.current[f4].validate);
      });
      var fieldValidations = fieldKeysWithValidation.length > 0 ? fieldKeysWithValidation.map(function(f4) {
        return runSingleFieldLevelValidation(f4, getIn3(values3, f4));
      }) : [Promise.resolve("DO_NOT_DELETE_YOU_WILL_BE_FIRED")];
      return Promise.all(fieldValidations).then(function(fieldErrorsList) {
        return fieldErrorsList.reduce(function(prev, curr, index) {
          if (curr === "DO_NOT_DELETE_YOU_WILL_BE_FIRED") {
            return prev;
          }
          if (curr) {
            prev = setIn(prev, fieldKeysWithValidation[index], curr);
          }
          return prev;
        }, {});
      });
    }, [runSingleFieldLevelValidation]);
    var runAllValidations = react.useCallback(function(values3) {
      return Promise.all([runFieldLevelValidations(values3), props.validationSchema ? runValidationSchema(values3) : {}, props.validate ? runValidateHandler(values3) : {}]).then(function(_ref2) {
        var fieldErrors = _ref2[0], schemaErrors = _ref2[1], validateErrors = _ref2[2];
        var combinedErrors = deepmerge_1.all([fieldErrors, schemaErrors, validateErrors], {
          arrayMerge
        });
        return combinedErrors;
      });
    }, [props.validate, props.validationSchema, runFieldLevelValidations, runValidateHandler, runValidationSchema]);
    var validateFormWithHighPriority = useEventCallback3(function(values3) {
      if (values3 === void 0) {
        values3 = state.values;
      }
      dispatch({
        type: "SET_ISVALIDATING",
        payload: true
      });
      return runAllValidations(values3).then(function(combinedErrors) {
        if (!!isMounted.current) {
          dispatch({
            type: "SET_ISVALIDATING",
            payload: false
          });
          dispatch({
            type: "SET_ERRORS",
            payload: combinedErrors
          });
        }
        return combinedErrors;
      });
    });
    react.useEffect(function() {
      if (validateOnMount && isMounted.current === true && reactFastCompare(initialValues2.current, props.initialValues)) {
        validateFormWithHighPriority(initialValues2.current);
      }
    }, [validateOnMount, validateFormWithHighPriority]);
    var resetForm = react.useCallback(function(nextState) {
      var values3 = nextState && nextState.values ? nextState.values : initialValues2.current;
      var errors = nextState && nextState.errors ? nextState.errors : initialErrors.current ? initialErrors.current : props.initialErrors || {};
      var touched = nextState && nextState.touched ? nextState.touched : initialTouched.current ? initialTouched.current : props.initialTouched || {};
      var status = nextState && nextState.status ? nextState.status : initialStatus.current ? initialStatus.current : props.initialStatus;
      initialValues2.current = values3;
      initialErrors.current = errors;
      initialTouched.current = touched;
      initialStatus.current = status;
      var dispatchFn = function dispatchFn2() {
        dispatch({
          type: "RESET_FORM",
          payload: {
            isSubmitting: !!nextState && !!nextState.isSubmitting,
            errors,
            touched,
            status,
            values: values3,
            isValidating: !!nextState && !!nextState.isValidating,
            submitCount: !!nextState && !!nextState.submitCount && typeof nextState.submitCount === "number" ? nextState.submitCount : 0
          }
        });
      };
      if (props.onReset) {
        var maybePromisedOnReset = props.onReset(state.values, imperativeMethods);
        if (isPromise(maybePromisedOnReset)) {
          maybePromisedOnReset.then(dispatchFn);
        } else {
          dispatchFn();
        }
      } else {
        dispatchFn();
      }
    }, [props.initialErrors, props.initialStatus, props.initialTouched]);
    react.useEffect(function() {
      if (isMounted.current === true && !reactFastCompare(initialValues2.current, props.initialValues)) {
        if (enableReinitialize) {
          initialValues2.current = props.initialValues;
          resetForm();
        }
        if (validateOnMount) {
          validateFormWithHighPriority(initialValues2.current);
        }
      }
    }, [enableReinitialize, props.initialValues, resetForm, validateOnMount, validateFormWithHighPriority]);
    react.useEffect(function() {
      if (enableReinitialize && isMounted.current === true && !reactFastCompare(initialErrors.current, props.initialErrors)) {
        initialErrors.current = props.initialErrors || emptyErrors;
        dispatch({
          type: "SET_ERRORS",
          payload: props.initialErrors || emptyErrors
        });
      }
    }, [enableReinitialize, props.initialErrors]);
    react.useEffect(function() {
      if (enableReinitialize && isMounted.current === true && !reactFastCompare(initialTouched.current, props.initialTouched)) {
        initialTouched.current = props.initialTouched || emptyTouched;
        dispatch({
          type: "SET_TOUCHED",
          payload: props.initialTouched || emptyTouched
        });
      }
    }, [enableReinitialize, props.initialTouched]);
    react.useEffect(function() {
      if (enableReinitialize && isMounted.current === true && !reactFastCompare(initialStatus.current, props.initialStatus)) {
        initialStatus.current = props.initialStatus;
        dispatch({
          type: "SET_STATUS",
          payload: props.initialStatus
        });
      }
    }, [enableReinitialize, props.initialStatus, props.initialTouched]);
    var validateField = useEventCallback3(function(name) {
      if (fieldRegistry.current[name] && isFunction$1(fieldRegistry.current[name].validate)) {
        var value = getIn3(state.values, name);
        var maybePromise = fieldRegistry.current[name].validate(value);
        if (isPromise(maybePromise)) {
          dispatch({
            type: "SET_ISVALIDATING",
            payload: true
          });
          return maybePromise.then(function(x3) {
            return x3;
          }).then(function(error) {
            dispatch({
              type: "SET_FIELD_ERROR",
              payload: {
                field: name,
                value: error
              }
            });
            dispatch({
              type: "SET_ISVALIDATING",
              payload: false
            });
          });
        } else {
          dispatch({
            type: "SET_FIELD_ERROR",
            payload: {
              field: name,
              value: maybePromise
            }
          });
          return Promise.resolve(maybePromise);
        }
      } else if (props.validationSchema) {
        dispatch({
          type: "SET_ISVALIDATING",
          payload: true
        });
        return runValidationSchema(state.values, name).then(function(x3) {
          return x3;
        }).then(function(error) {
          dispatch({
            type: "SET_FIELD_ERROR",
            payload: {
              field: name,
              value: error[name]
            }
          });
          dispatch({
            type: "SET_ISVALIDATING",
            payload: false
          });
        });
      }
      return Promise.resolve();
    });
    var registerField = react.useCallback(function(name, _ref3) {
      var validate = _ref3.validate;
      fieldRegistry.current[name] = {
        validate
      };
    }, []);
    var unregisterField = react.useCallback(function(name) {
      delete fieldRegistry.current[name];
    }, []);
    var setTouched = useEventCallback3(function(touched, shouldValidate) {
      dispatch({
        type: "SET_TOUCHED",
        payload: touched
      });
      var willValidate = shouldValidate === void 0 ? validateOnBlur : shouldValidate;
      return willValidate ? validateFormWithHighPriority(state.values) : Promise.resolve();
    });
    var setErrors = react.useCallback(function(errors) {
      dispatch({
        type: "SET_ERRORS",
        payload: errors
      });
    }, []);
    var setValues = useEventCallback3(function(values3, shouldValidate) {
      var resolvedValues = isFunction$1(values3) ? values3(state.values) : values3;
      dispatch({
        type: "SET_VALUES",
        payload: resolvedValues
      });
      var willValidate = shouldValidate === void 0 ? validateOnChange : shouldValidate;
      return willValidate ? validateFormWithHighPriority(resolvedValues) : Promise.resolve();
    });
    var setFieldError = react.useCallback(function(field, value) {
      dispatch({
        type: "SET_FIELD_ERROR",
        payload: {
          field,
          value
        }
      });
    }, []);
    var setFieldValue = useEventCallback3(function(field, value, shouldValidate) {
      dispatch({
        type: "SET_FIELD_VALUE",
        payload: {
          field,
          value
        }
      });
      var willValidate = shouldValidate === void 0 ? validateOnChange : shouldValidate;
      return willValidate ? validateFormWithHighPriority(setIn(state.values, field, value)) : Promise.resolve();
    });
    var executeChange = react.useCallback(function(eventOrTextValue, maybePath) {
      var field = maybePath;
      var val = eventOrTextValue;
      var parsed;
      if (!isString(eventOrTextValue)) {
        if (eventOrTextValue.persist) {
          eventOrTextValue.persist();
        }
        var target = eventOrTextValue.target ? eventOrTextValue.target : eventOrTextValue.currentTarget;
        var type = target.type, name = target.name, id2 = target.id, value = target.value, checked = target.checked, outerHTML = target.outerHTML, options = target.options, multiple = target.multiple;
        field = maybePath ? maybePath : name ? name : id2;
        if (!field && false) {
          warnAboutMissingIdentifier({
            htmlContent: outerHTML,
            documentationAnchorLink: "handlechange-e-reactchangeeventany--void",
            handlerName: "handleChange"
          });
        }
        val = /number|range/.test(type) ? (parsed = parseFloat(value), isNaN(parsed) ? "" : parsed) : /checkbox/.test(type) ? getValueForCheckbox(getIn3(state.values, field), checked, value) : options && multiple ? getSelectedValues(options) : value;
      }
      if (field) {
        setFieldValue(field, val);
      }
    }, [setFieldValue, state.values]);
    var handleChange = useEventCallback3(function(eventOrPath) {
      if (isString(eventOrPath)) {
        return function(event) {
          return executeChange(event, eventOrPath);
        };
      } else {
        executeChange(eventOrPath);
      }
    });
    var setFieldTouched = useEventCallback3(function(field, touched, shouldValidate) {
      if (touched === void 0) {
        touched = true;
      }
      dispatch({
        type: "SET_FIELD_TOUCHED",
        payload: {
          field,
          value: touched
        }
      });
      var willValidate = shouldValidate === void 0 ? validateOnBlur : shouldValidate;
      return willValidate ? validateFormWithHighPriority(state.values) : Promise.resolve();
    });
    var executeBlur = react.useCallback(function(e5, path) {
      if (e5.persist) {
        e5.persist();
      }
      var _e$target = e5.target, name = _e$target.name, id2 = _e$target.id, outerHTML = _e$target.outerHTML;
      var field = path ? path : name ? name : id2;
      if (!field && false) {
        warnAboutMissingIdentifier({
          htmlContent: outerHTML,
          documentationAnchorLink: "handleblur-e-any--void",
          handlerName: "handleBlur"
        });
      }
      setFieldTouched(field, true);
    }, [setFieldTouched]);
    var handleBlur = useEventCallback3(function(eventOrString) {
      if (isString(eventOrString)) {
        return function(event) {
          return executeBlur(event, eventOrString);
        };
      } else {
        executeBlur(eventOrString);
      }
    });
    var setFormikState = react.useCallback(function(stateOrCb) {
      if (isFunction$1(stateOrCb)) {
        dispatch({
          type: "SET_FORMIK_STATE",
          payload: stateOrCb
        });
      } else {
        dispatch({
          type: "SET_FORMIK_STATE",
          payload: function payload() {
            return stateOrCb;
          }
        });
      }
    }, []);
    var setStatus = react.useCallback(function(status) {
      dispatch({
        type: "SET_STATUS",
        payload: status
      });
    }, []);
    var setSubmitting = react.useCallback(function(isSubmitting) {
      dispatch({
        type: "SET_ISSUBMITTING",
        payload: isSubmitting
      });
    }, []);
    var submitForm = useEventCallback3(function() {
      dispatch({
        type: "SUBMIT_ATTEMPT"
      });
      return validateFormWithHighPriority().then(function(combinedErrors) {
        var isInstanceOfError = combinedErrors instanceof Error;
        var isActuallyValid = !isInstanceOfError && Object.keys(combinedErrors).length === 0;
        if (isActuallyValid) {
          var promiseOrUndefined;
          try {
            promiseOrUndefined = executeSubmit();
            if (promiseOrUndefined === void 0) {
              return;
            }
          } catch (error) {
            throw error;
          }
          return Promise.resolve(promiseOrUndefined).then(function(result) {
            if (!!isMounted.current) {
              dispatch({
                type: "SUBMIT_SUCCESS"
              });
            }
            return result;
          })["catch"](function(_errors) {
            if (!!isMounted.current) {
              dispatch({
                type: "SUBMIT_FAILURE"
              });
              throw _errors;
            }
          });
        } else if (!!isMounted.current) {
          dispatch({
            type: "SUBMIT_FAILURE"
          });
          if (isInstanceOfError) {
            throw combinedErrors;
          }
        }
        return;
      });
    });
    var handleSubmit = useEventCallback3(function(e5) {
      if (e5 && e5.preventDefault && isFunction$1(e5.preventDefault)) {
        e5.preventDefault();
      }
      if (e5 && e5.stopPropagation && isFunction$1(e5.stopPropagation)) {
        e5.stopPropagation();
      }
      submitForm()["catch"](function(reason) {
        console.warn("Warning: An unhandled error was caught from submitForm()", reason);
      });
    });
    var imperativeMethods = {
      resetForm,
      validateForm: validateFormWithHighPriority,
      validateField,
      setErrors,
      setFieldError,
      setFieldTouched,
      setFieldValue,
      setStatus,
      setSubmitting,
      setTouched,
      setValues,
      setFormikState,
      submitForm
    };
    var executeSubmit = useEventCallback3(function() {
      return onSubmit(state.values, imperativeMethods);
    });
    var handleReset = useEventCallback3(function(e5) {
      if (e5 && e5.preventDefault && isFunction$1(e5.preventDefault)) {
        e5.preventDefault();
      }
      if (e5 && e5.stopPropagation && isFunction$1(e5.stopPropagation)) {
        e5.stopPropagation();
      }
      resetForm();
    });
    var getFieldMeta = react.useCallback(function(name) {
      return {
        value: getIn3(state.values, name),
        error: getIn3(state.errors, name),
        touched: !!getIn3(state.touched, name),
        initialValue: getIn3(initialValues2.current, name),
        initialTouched: !!getIn3(initialTouched.current, name),
        initialError: getIn3(initialErrors.current, name)
      };
    }, [state.errors, state.touched, state.values]);
    var getFieldHelpers = react.useCallback(function(name) {
      return {
        setValue: function setValue(value, shouldValidate) {
          return setFieldValue(name, value, shouldValidate);
        },
        setTouched: function setTouched2(value, shouldValidate) {
          return setFieldTouched(name, value, shouldValidate);
        },
        setError: function setError(value) {
          return setFieldError(name, value);
        }
      };
    }, [setFieldValue, setFieldTouched, setFieldError]);
    var getFieldProps = react.useCallback(function(nameOrOptions) {
      var isAnObject = isObject$12(nameOrOptions);
      var name = isAnObject ? nameOrOptions.name : nameOrOptions;
      var valueState = getIn3(state.values, name);
      var field = {
        name,
        value: valueState,
        onChange: handleChange,
        onBlur: handleBlur
      };
      if (isAnObject) {
        var type = nameOrOptions.type, valueProp = nameOrOptions.value, is = nameOrOptions.as, multiple = nameOrOptions.multiple;
        if (type === "checkbox") {
          if (valueProp === void 0) {
            field.checked = !!valueState;
          } else {
            field.checked = !!(Array.isArray(valueState) && ~valueState.indexOf(valueProp));
            field.value = valueProp;
          }
        } else if (type === "radio") {
          field.checked = valueState === valueProp;
          field.value = valueProp;
        } else if (is === "select" && multiple) {
          field.value = field.value || [];
          field.multiple = true;
        }
      }
      return field;
    }, [handleBlur, handleChange, state.values]);
    var dirty = react.useMemo(function() {
      return !reactFastCompare(initialValues2.current, state.values);
    }, [initialValues2.current, state.values]);
    var isValid = react.useMemo(function() {
      return typeof isInitialValid !== "undefined" ? dirty ? state.errors && Object.keys(state.errors).length === 0 : isInitialValid !== false && isFunction$1(isInitialValid) ? isInitialValid(props) : isInitialValid : state.errors && Object.keys(state.errors).length === 0;
    }, [isInitialValid, dirty, state.errors, props]);
    var ctx = _extends3({}, state, {
      initialValues: initialValues2.current,
      initialErrors: initialErrors.current,
      initialTouched: initialTouched.current,
      initialStatus: initialStatus.current,
      handleBlur,
      handleChange,
      handleReset,
      handleSubmit,
      resetForm,
      setErrors,
      setFormikState,
      setFieldTouched,
      setFieldValue,
      setFieldError,
      setStatus,
      setSubmitting,
      setTouched,
      setValues,
      submitForm,
      validateForm: validateFormWithHighPriority,
      validateField,
      isValid,
      dirty,
      unregisterField,
      registerField,
      getFieldProps,
      getFieldMeta,
      getFieldHelpers,
      validateOnBlur,
      validateOnChange,
      validateOnMount
    });
    return ctx;
  }
  function Formik(props) {
    var formikbag = useFormik(props);
    var component = props.component, children = props.children, render2 = props.render, innerRef = props.innerRef;
    react.useImperativeHandle(innerRef, function() {
      return formikbag;
    });
    return react.createElement(FormikProvider, {
      value: formikbag
    }, component ? react.createElement(component, formikbag) : render2 ? render2(formikbag) : children ? isFunction$1(children) ? children(formikbag) : !isEmptyChildren(children) ? react.Children.only(children) : null : null);
  }
  function yupToFormErrors(yupError) {
    var errors = {};
    if (yupError.inner) {
      if (yupError.inner.length === 0) {
        return setIn(errors, yupError.path, yupError.message);
      }
      for (var _iterator = yupError.inner, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator](); ; ) {
        var _ref5;
        if (_isArray) {
          if (_i >= _iterator.length)
            break;
          _ref5 = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done)
            break;
          _ref5 = _i.value;
        }
        var err = _ref5;
        if (!getIn3(errors, err.path)) {
          errors = setIn(errors, err.path, err.message);
        }
      }
    }
    return errors;
  }
  function validateYupSchema(values3, schema, sync, context) {
    if (sync === void 0) {
      sync = false;
    }
    if (context === void 0) {
      context = {};
    }
    var validateData = prepareDataForValidation(values3);
    return schema[sync ? "validateSync" : "validate"](validateData, {
      abortEarly: false,
      context
    });
  }
  function prepareDataForValidation(values3) {
    var data = Array.isArray(values3) ? [] : {};
    for (var k5 in values3) {
      if (Object.prototype.hasOwnProperty.call(values3, k5)) {
        var key = String(k5);
        if (Array.isArray(values3[key]) === true) {
          data[key] = values3[key].map(function(value) {
            if (Array.isArray(value) === true || isPlainObject2(value)) {
              return prepareDataForValidation(value);
            } else {
              return value !== "" ? value : void 0;
            }
          });
        } else if (isPlainObject2(values3[key])) {
          data[key] = prepareDataForValidation(values3[key]);
        } else {
          data[key] = values3[key] !== "" ? values3[key] : void 0;
        }
      }
    }
    return data;
  }
  function arrayMerge(target, source, options) {
    var destination = target.slice();
    source.forEach(function merge2(e5, i2) {
      if (typeof destination[i2] === "undefined") {
        var cloneRequested = options.clone !== false;
        var shouldClone = cloneRequested && options.isMergeableObject(e5);
        destination[i2] = shouldClone ? deepmerge_1(Array.isArray(e5) ? [] : {}, e5, options) : e5;
      } else if (options.isMergeableObject(e5)) {
        destination[i2] = deepmerge_1(target[i2], e5, options);
      } else if (target.indexOf(e5) === -1) {
        destination.push(e5);
      }
    });
    return destination;
  }
  function getSelectedValues(options) {
    return Array.from(options).filter(function(el) {
      return el.selected;
    }).map(function(el) {
      return el.value;
    });
  }
  function getValueForCheckbox(currentValue, checked, valueProp) {
    if (typeof currentValue === "boolean") {
      return Boolean(checked);
    }
    var currentArrayOfValues = [];
    var isValueInArray = false;
    var index = -1;
    if (!Array.isArray(currentValue)) {
      if (!valueProp || valueProp == "true" || valueProp == "false") {
        return Boolean(checked);
      }
    } else {
      currentArrayOfValues = currentValue;
      index = currentValue.indexOf(valueProp);
      isValueInArray = index >= 0;
    }
    if (checked && valueProp && !isValueInArray) {
      return currentArrayOfValues.concat(valueProp);
    }
    if (!isValueInArray) {
      return currentArrayOfValues;
    }
    return currentArrayOfValues.slice(0, index).concat(currentArrayOfValues.slice(index + 1));
  }
  var useIsomorphicLayoutEffect = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined" ? react.useLayoutEffect : react.useEffect;
  function useEventCallback3(fn2) {
    var ref = react.useRef(fn2);
    useIsomorphicLayoutEffect(function() {
      ref.current = fn2;
    });
    return react.useCallback(function() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return ref.current.apply(void 0, args);
    }, []);
  }
  function Field(_ref) {
    var validate = _ref.validate, name = _ref.name, render2 = _ref.render, children = _ref.children, is = _ref.as, component = _ref.component, props = _objectWithoutPropertiesLoose3(_ref, ["validate", "name", "render", "children", "as", "component"]);
    var _useFormikContext = useFormikContext(), formik = _objectWithoutPropertiesLoose3(_useFormikContext, ["validate", "validationSchema"]);
    var registerField = formik.registerField, unregisterField = formik.unregisterField;
    react.useEffect(function() {
      registerField(name, {
        validate
      });
      return function() {
        unregisterField(name);
      };
    }, [registerField, unregisterField, name, validate]);
    var field = formik.getFieldProps(_extends3({
      name
    }, props));
    var meta = formik.getFieldMeta(name);
    var legacyBag = {
      field,
      form: formik
    };
    if (render2) {
      return render2(_extends3({}, legacyBag, {
        meta
      }));
    }
    if (isFunction$1(children)) {
      return children(_extends3({}, legacyBag, {
        meta
      }));
    }
    if (component) {
      if (typeof component === "string") {
        var innerRef = props.innerRef, rest = _objectWithoutPropertiesLoose3(props, ["innerRef"]);
        return react.createElement(component, _extends3({
          ref: innerRef
        }, field, rest), children);
      }
      return react.createElement(component, _extends3({
        field,
        form: formik
      }, props), children);
    }
    var asElement = is || "input";
    if (typeof asElement === "string") {
      var _innerRef = props.innerRef, _rest = _objectWithoutPropertiesLoose3(props, ["innerRef"]);
      return react.createElement(asElement, _extends3({
        ref: _innerRef
      }, field, _rest), children);
    }
    return react.createElement(asElement, _extends3({}, field, props), children);
  }
  var Form = /* @__PURE__ */ react.forwardRef(function(props, ref) {
    var action = props.action, rest = _objectWithoutPropertiesLoose3(props, ["action"]);
    var _action = action != null ? action : "#";
    var _useFormikContext = useFormikContext(), handleReset = _useFormikContext.handleReset, handleSubmit = _useFormikContext.handleSubmit;
    return react.createElement("form", Object.assign({
      onSubmit: handleSubmit,
      ref,
      onReset: handleReset,
      action: _action
    }, rest));
  });
  Form.displayName = "Form";
  function connect(Comp) {
    var C4 = function C5(props) {
      return react.createElement(FormikConsumer, null, function(formik) {
        return react.createElement(Comp, Object.assign({}, props, {
          formik
        }));
      });
    };
    var componentDisplayName = Comp.displayName || Comp.name || Comp.constructor && Comp.constructor.name || "Component";
    C4.WrappedComponent = Comp;
    C4.displayName = "FormikConnect(" + componentDisplayName + ")";
    return hoistNonReactStatics_cjs(C4, Comp);
  }
  var move = function move2(array2, from, to) {
    var copy = copyArrayLike(array2);
    var value = copy[from];
    copy.splice(from, 1);
    copy.splice(to, 0, value);
    return copy;
  };
  var swap = function swap2(arrayLike, indexA, indexB) {
    var copy = copyArrayLike(arrayLike);
    var a3 = copy[indexA];
    copy[indexA] = copy[indexB];
    copy[indexB] = a3;
    return copy;
  };
  var insert = function insert2(arrayLike, index, value) {
    var copy = copyArrayLike(arrayLike);
    copy.splice(index, 0, value);
    return copy;
  };
  var replace = function replace2(arrayLike, index, value) {
    var copy = copyArrayLike(arrayLike);
    copy[index] = value;
    return copy;
  };
  var copyArrayLike = function copyArrayLike2(arrayLike) {
    if (!arrayLike) {
      return [];
    } else if (Array.isArray(arrayLike)) {
      return [].concat(arrayLike);
    } else {
      var maxIndex = Object.keys(arrayLike).map(function(key) {
        return parseInt(key);
      }).reduce(function(max2, el) {
        return el > max2 ? el : max2;
      }, 0);
      return Array.from(_extends3({}, arrayLike, {
        length: maxIndex + 1
      }));
    }
  };
  var FieldArrayInner = /* @__PURE__ */ function(_React$Component) {
    _inheritsLoose2(FieldArrayInner2, _React$Component);
    function FieldArrayInner2(props) {
      var _this;
      _this = _React$Component.call(this, props) || this;
      _this.updateArrayField = function(fn2, alterTouched, alterErrors) {
        var _this$props = _this.props, name = _this$props.name, setFormikState = _this$props.formik.setFormikState;
        setFormikState(function(prevState) {
          var updateErrors = typeof alterErrors === "function" ? alterErrors : fn2;
          var updateTouched = typeof alterTouched === "function" ? alterTouched : fn2;
          var values3 = setIn(prevState.values, name, fn2(getIn3(prevState.values, name)));
          var fieldError = alterErrors ? updateErrors(getIn3(prevState.errors, name)) : void 0;
          var fieldTouched = alterTouched ? updateTouched(getIn3(prevState.touched, name)) : void 0;
          if (isEmptyArray(fieldError)) {
            fieldError = void 0;
          }
          if (isEmptyArray(fieldTouched)) {
            fieldTouched = void 0;
          }
          return _extends3({}, prevState, {
            values: values3,
            errors: alterErrors ? setIn(prevState.errors, name, fieldError) : prevState.errors,
            touched: alterTouched ? setIn(prevState.touched, name, fieldTouched) : prevState.touched
          });
        });
      };
      _this.push = function(value) {
        return _this.updateArrayField(function(arrayLike) {
          return [].concat(copyArrayLike(arrayLike), [cloneDeep(value)]);
        }, false, false);
      };
      _this.handlePush = function(value) {
        return function() {
          return _this.push(value);
        };
      };
      _this.swap = function(indexA, indexB) {
        return _this.updateArrayField(function(array2) {
          return swap(array2, indexA, indexB);
        }, true, true);
      };
      _this.handleSwap = function(indexA, indexB) {
        return function() {
          return _this.swap(indexA, indexB);
        };
      };
      _this.move = function(from, to) {
        return _this.updateArrayField(function(array2) {
          return move(array2, from, to);
        }, true, true);
      };
      _this.handleMove = function(from, to) {
        return function() {
          return _this.move(from, to);
        };
      };
      _this.insert = function(index, value) {
        return _this.updateArrayField(function(array2) {
          return insert(array2, index, value);
        }, function(array2) {
          return insert(array2, index, null);
        }, function(array2) {
          return insert(array2, index, null);
        });
      };
      _this.handleInsert = function(index, value) {
        return function() {
          return _this.insert(index, value);
        };
      };
      _this.replace = function(index, value) {
        return _this.updateArrayField(function(array2) {
          return replace(array2, index, value);
        }, false, false);
      };
      _this.handleReplace = function(index, value) {
        return function() {
          return _this.replace(index, value);
        };
      };
      _this.unshift = function(value) {
        var length = -1;
        _this.updateArrayField(function(array2) {
          var arr = array2 ? [value].concat(array2) : [value];
          if (length < 0) {
            length = arr.length;
          }
          return arr;
        }, function(array2) {
          var arr = array2 ? [null].concat(array2) : [null];
          if (length < 0) {
            length = arr.length;
          }
          return arr;
        }, function(array2) {
          var arr = array2 ? [null].concat(array2) : [null];
          if (length < 0) {
            length = arr.length;
          }
          return arr;
        });
        return length;
      };
      _this.handleUnshift = function(value) {
        return function() {
          return _this.unshift(value);
        };
      };
      _this.handleRemove = function(index) {
        return function() {
          return _this.remove(index);
        };
      };
      _this.handlePop = function() {
        return function() {
          return _this.pop();
        };
      };
      _this.remove = _this.remove.bind(_assertThisInitialized2(_this));
      _this.pop = _this.pop.bind(_assertThisInitialized2(_this));
      return _this;
    }
    var _proto = FieldArrayInner2.prototype;
    _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
      if (this.props.validateOnChange && this.props.formik.validateOnChange && !reactFastCompare(getIn3(prevProps.formik.values, prevProps.name), getIn3(this.props.formik.values, this.props.name))) {
        this.props.formik.validateForm(this.props.formik.values);
      }
    };
    _proto.remove = function remove(index) {
      var result;
      this.updateArrayField(function(array2) {
        var copy = array2 ? copyArrayLike(array2) : [];
        if (!result) {
          result = copy[index];
        }
        if (isFunction$1(copy.splice)) {
          copy.splice(index, 1);
        }
        return copy;
      }, true, true);
      return result;
    };
    _proto.pop = function pop() {
      var result;
      this.updateArrayField(function(array2) {
        var tmp = array2;
        if (!result) {
          result = tmp && tmp.pop && tmp.pop();
        }
        return tmp;
      }, true, true);
      return result;
    };
    _proto.render = function render2() {
      var arrayHelpers = {
        push: this.push,
        pop: this.pop,
        swap: this.swap,
        move: this.move,
        insert: this.insert,
        replace: this.replace,
        unshift: this.unshift,
        remove: this.remove,
        handlePush: this.handlePush,
        handlePop: this.handlePop,
        handleSwap: this.handleSwap,
        handleMove: this.handleMove,
        handleInsert: this.handleInsert,
        handleReplace: this.handleReplace,
        handleUnshift: this.handleUnshift,
        handleRemove: this.handleRemove
      };
      var _this$props2 = this.props, component = _this$props2.component, render3 = _this$props2.render, children = _this$props2.children, name = _this$props2.name, _this$props2$formik = _this$props2.formik, restOfFormik = _objectWithoutPropertiesLoose3(_this$props2$formik, ["validate", "validationSchema"]);
      var props = _extends3({}, arrayHelpers, {
        form: restOfFormik,
        name
      });
      return component ? react.createElement(component, props) : render3 ? render3(props) : children ? typeof children === "function" ? children(props) : !isEmptyChildren(children) ? react.Children.only(children) : null : null;
    };
    return FieldArrayInner2;
  }(react.Component);
  FieldArrayInner.defaultProps = {
    validateOnChange: true
  };
  var FieldArray = /* @__PURE__ */ connect(FieldArrayInner);
  var ErrorMessageImpl = /* @__PURE__ */ function(_React$Component) {
    _inheritsLoose2(ErrorMessageImpl2, _React$Component);
    function ErrorMessageImpl2() {
      return _React$Component.apply(this, arguments) || this;
    }
    var _proto = ErrorMessageImpl2.prototype;
    _proto.shouldComponentUpdate = function shouldComponentUpdate(props) {
      if (getIn3(this.props.formik.errors, this.props.name) !== getIn3(props.formik.errors, this.props.name) || getIn3(this.props.formik.touched, this.props.name) !== getIn3(props.formik.touched, this.props.name) || Object.keys(this.props).length !== Object.keys(props).length) {
        return true;
      } else {
        return false;
      }
    };
    _proto.render = function render2() {
      var _this$props = this.props, component = _this$props.component, formik = _this$props.formik, render3 = _this$props.render, children = _this$props.children, name = _this$props.name, rest = _objectWithoutPropertiesLoose3(_this$props, ["component", "formik", "render", "children", "name"]);
      var touch = getIn3(formik.touched, name);
      var error = getIn3(formik.errors, name);
      return !!touch && !!error ? render3 ? isFunction$1(render3) ? render3(error) : null : children ? isFunction$1(children) ? children(error) : null : component ? react.createElement(component, rest, error) : error : null;
    };
    return ErrorMessageImpl2;
  }(react.Component);
  var ErrorMessage = /* @__PURE__ */ connect(ErrorMessageImpl);
});

// docs/snowpack/env.js
var env_exports = {};
__export(env_exports, {
  MODE: () => MODE,
  NODE_ENV: () => NODE_ENV,
  SSR: () => SSR
});
var MODE = "production";
var NODE_ENV = "production";
var SSR = false;

// docs/snowpack/pkg/common/_commonjsHelpers-8c19dec8.js
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x3) {
  return x3 && x3.__esModule && Object.prototype.hasOwnProperty.call(x3, "default") ? x3["default"] : x3;
}
function createCommonjsModule(fn2, basedir, module) {
  return module = {
    path: basedir,
    exports: {},
    require: function(path, base) {
      return commonjsRequire(path, base === void 0 || base === null ? module.path : base);
    }
  }, fn2(module, module.exports), module.exports;
}
function commonjsRequire() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}

// docs/snowpack/pkg/common/index-04edb6a1.js
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;
function toObject(val) {
  if (val === null || val === void 0) {
    throw new TypeError("Object.assign cannot be called with null or undefined");
  }
  return Object(val);
}
function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    }
    var test1 = new String("abc");
    test1[5] = "de";
    if (Object.getOwnPropertyNames(test1)[0] === "5") {
      return false;
    }
    var test2 = {};
    for (var i2 = 0; i2 < 10; i2++) {
      test2["_" + String.fromCharCode(i2)] = i2;
    }
    var order22 = Object.getOwnPropertyNames(test2).map(function(n5) {
      return test2[n5];
    });
    if (order22.join("") !== "0123456789") {
      return false;
    }
    var test3 = {};
    "abcdefghijklmnopqrst".split("").forEach(function(letter) {
      test3[letter] = letter;
    });
    if (Object.keys(Object.assign({}, test3)).join("") !== "abcdefghijklmnopqrst") {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
}
var objectAssign = shouldUseNative() ? Object.assign : function(target, source) {
  var from;
  var to = toObject(target);
  var symbols;
  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);
    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }
    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);
      for (var i2 = 0; i2 < symbols.length; i2++) {
        if (propIsEnumerable.call(from, symbols[i2])) {
          to[symbols[i2]] = from[symbols[i2]];
        }
      }
    }
  }
  return to;
};
var react_production_min = createCommonjsModule(function(module, exports) {
  var n5 = 60103, p5 = 60106;
  exports.Fragment = 60107;
  exports.StrictMode = 60108;
  exports.Profiler = 60114;
  var q5 = 60109, r5 = 60110, t3 = 60112;
  exports.Suspense = 60113;
  var u4 = 60115, v4 = 60116;
  if (typeof Symbol === "function" && Symbol.for) {
    var w4 = Symbol.for;
    n5 = w4("react.element");
    p5 = w4("react.portal");
    exports.Fragment = w4("react.fragment");
    exports.StrictMode = w4("react.strict_mode");
    exports.Profiler = w4("react.profiler");
    q5 = w4("react.provider");
    r5 = w4("react.context");
    t3 = w4("react.forward_ref");
    exports.Suspense = w4("react.suspense");
    u4 = w4("react.memo");
    v4 = w4("react.lazy");
  }
  var x3 = typeof Symbol === "function" && Symbol.iterator;
  function y6(a3) {
    if (a3 === null || typeof a3 !== "object")
      return null;
    a3 = x3 && a3[x3] || a3["@@iterator"];
    return typeof a3 === "function" ? a3 : null;
  }
  function z5(a3) {
    for (var b5 = "https://reactjs.org/docs/error-decoder.html?invariant=" + a3, c6 = 1; c6 < arguments.length; c6++)
      b5 += "&args[]=" + encodeURIComponent(arguments[c6]);
    return "Minified React error #" + a3 + "; visit " + b5 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var A5 = {isMounted: function() {
    return false;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  }}, B5 = {};
  function C4(a3, b5, c6) {
    this.props = a3;
    this.context = b5;
    this.refs = B5;
    this.updater = c6 || A5;
  }
  C4.prototype.isReactComponent = {};
  C4.prototype.setState = function(a3, b5) {
    if (typeof a3 !== "object" && typeof a3 !== "function" && a3 != null)
      throw Error(z5(85));
    this.updater.enqueueSetState(this, a3, b5, "setState");
  };
  C4.prototype.forceUpdate = function(a3) {
    this.updater.enqueueForceUpdate(this, a3, "forceUpdate");
  };
  function D5() {
  }
  D5.prototype = C4.prototype;
  function E5(a3, b5, c6) {
    this.props = a3;
    this.context = b5;
    this.refs = B5;
    this.updater = c6 || A5;
  }
  var F6 = E5.prototype = new D5();
  F6.constructor = E5;
  objectAssign(F6, C4.prototype);
  F6.isPureReactComponent = true;
  var G5 = {current: null}, H5 = Object.prototype.hasOwnProperty, I5 = {key: true, ref: true, __self: true, __source: true};
  function J2(a3, b5, c6) {
    var e5, d5 = {}, k5 = null, h4 = null;
    if (b5 != null)
      for (e5 in b5.ref !== void 0 && (h4 = b5.ref), b5.key !== void 0 && (k5 = "" + b5.key), b5)
        H5.call(b5, e5) && !I5.hasOwnProperty(e5) && (d5[e5] = b5[e5]);
    var g5 = arguments.length - 2;
    if (g5 === 1)
      d5.children = c6;
    else if (1 < g5) {
      for (var f4 = Array(g5), m5 = 0; m5 < g5; m5++)
        f4[m5] = arguments[m5 + 2];
      d5.children = f4;
    }
    if (a3 && a3.defaultProps)
      for (e5 in g5 = a3.defaultProps, g5)
        d5[e5] === void 0 && (d5[e5] = g5[e5]);
    return {$$typeof: n5, type: a3, key: k5, ref: h4, props: d5, _owner: G5.current};
  }
  function K2(a3, b5) {
    return {$$typeof: n5, type: a3.type, key: b5, ref: a3.ref, props: a3.props, _owner: a3._owner};
  }
  function L2(a3) {
    return typeof a3 === "object" && a3 !== null && a3.$$typeof === n5;
  }
  function escape(a3) {
    var b5 = {"=": "=0", ":": "=2"};
    return "$" + a3.replace(/[=:]/g, function(a4) {
      return b5[a4];
    });
  }
  var M3 = /\/+/g;
  function N3(a3, b5) {
    return typeof a3 === "object" && a3 !== null && a3.key != null ? escape("" + a3.key) : b5.toString(36);
  }
  function O3(a3, b5, c6, e5, d5) {
    var k5 = typeof a3;
    if (k5 === "undefined" || k5 === "boolean")
      a3 = null;
    var h4 = false;
    if (a3 === null)
      h4 = true;
    else
      switch (k5) {
        case "string":
        case "number":
          h4 = true;
          break;
        case "object":
          switch (a3.$$typeof) {
            case n5:
            case p5:
              h4 = true;
          }
      }
    if (h4)
      return h4 = a3, d5 = d5(h4), a3 = e5 === "" ? "." + N3(h4, 0) : e5, Array.isArray(d5) ? (c6 = "", a3 != null && (c6 = a3.replace(M3, "$&/") + "/"), O3(d5, b5, c6, "", function(a4) {
        return a4;
      })) : d5 != null && (L2(d5) && (d5 = K2(d5, c6 + (!d5.key || h4 && h4.key === d5.key ? "" : ("" + d5.key).replace(M3, "$&/") + "/") + a3)), b5.push(d5)), 1;
    h4 = 0;
    e5 = e5 === "" ? "." : e5 + ":";
    if (Array.isArray(a3))
      for (var g5 = 0; g5 < a3.length; g5++) {
        k5 = a3[g5];
        var f4 = e5 + N3(k5, g5);
        h4 += O3(k5, b5, c6, f4, d5);
      }
    else if (f4 = y6(a3), typeof f4 === "function")
      for (a3 = f4.call(a3), g5 = 0; !(k5 = a3.next()).done; )
        k5 = k5.value, f4 = e5 + N3(k5, g5++), h4 += O3(k5, b5, c6, f4, d5);
    else if (k5 === "object")
      throw b5 = "" + a3, Error(z5(31, b5 === "[object Object]" ? "object with keys {" + Object.keys(a3).join(", ") + "}" : b5));
    return h4;
  }
  function P3(a3, b5, c6) {
    if (a3 == null)
      return a3;
    var e5 = [], d5 = 0;
    O3(a3, e5, "", "", function(a4) {
      return b5.call(c6, a4, d5++);
    });
    return e5;
  }
  function Q2(a3) {
    if (a3._status === -1) {
      var b5 = a3._result;
      b5 = b5();
      a3._status = 0;
      a3._result = b5;
      b5.then(function(b6) {
        a3._status === 0 && (b6 = b6.default, a3._status = 1, a3._result = b6);
      }, function(b6) {
        a3._status === 0 && (a3._status = 2, a3._result = b6);
      });
    }
    if (a3._status === 1)
      return a3._result;
    throw a3._result;
  }
  var R3 = {current: null};
  function S3() {
    var a3 = R3.current;
    if (a3 === null)
      throw Error(z5(321));
    return a3;
  }
  var T3 = {ReactCurrentDispatcher: R3, ReactCurrentBatchConfig: {transition: 0}, ReactCurrentOwner: G5, IsSomeRendererActing: {current: false}, assign: objectAssign};
  exports.Children = {map: P3, forEach: function(a3, b5, c6) {
    P3(a3, function() {
      b5.apply(this, arguments);
    }, c6);
  }, count: function(a3) {
    var b5 = 0;
    P3(a3, function() {
      b5++;
    });
    return b5;
  }, toArray: function(a3) {
    return P3(a3, function(a4) {
      return a4;
    }) || [];
  }, only: function(a3) {
    if (!L2(a3))
      throw Error(z5(143));
    return a3;
  }};
  exports.Component = C4;
  exports.PureComponent = E5;
  exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = T3;
  exports.cloneElement = function(a3, b5, c6) {
    if (a3 === null || a3 === void 0)
      throw Error(z5(267, a3));
    var e5 = objectAssign({}, a3.props), d5 = a3.key, k5 = a3.ref, h4 = a3._owner;
    if (b5 != null) {
      b5.ref !== void 0 && (k5 = b5.ref, h4 = G5.current);
      b5.key !== void 0 && (d5 = "" + b5.key);
      if (a3.type && a3.type.defaultProps)
        var g5 = a3.type.defaultProps;
      for (f4 in b5)
        H5.call(b5, f4) && !I5.hasOwnProperty(f4) && (e5[f4] = b5[f4] === void 0 && g5 !== void 0 ? g5[f4] : b5[f4]);
    }
    var f4 = arguments.length - 2;
    if (f4 === 1)
      e5.children = c6;
    else if (1 < f4) {
      g5 = Array(f4);
      for (var m5 = 0; m5 < f4; m5++)
        g5[m5] = arguments[m5 + 2];
      e5.children = g5;
    }
    return {
      $$typeof: n5,
      type: a3.type,
      key: d5,
      ref: k5,
      props: e5,
      _owner: h4
    };
  };
  exports.createContext = function(a3, b5) {
    b5 === void 0 && (b5 = null);
    a3 = {$$typeof: r5, _calculateChangedBits: b5, _currentValue: a3, _currentValue2: a3, _threadCount: 0, Provider: null, Consumer: null};
    a3.Provider = {$$typeof: q5, _context: a3};
    return a3.Consumer = a3;
  };
  exports.createElement = J2;
  exports.createFactory = function(a3) {
    var b5 = J2.bind(null, a3);
    b5.type = a3;
    return b5;
  };
  exports.createRef = function() {
    return {current: null};
  };
  exports.forwardRef = function(a3) {
    return {$$typeof: t3, render: a3};
  };
  exports.isValidElement = L2;
  exports.lazy = function(a3) {
    return {$$typeof: v4, _payload: {_status: -1, _result: a3}, _init: Q2};
  };
  exports.memo = function(a3, b5) {
    return {$$typeof: u4, type: a3, compare: b5 === void 0 ? null : b5};
  };
  exports.useCallback = function(a3, b5) {
    return S3().useCallback(a3, b5);
  };
  exports.useContext = function(a3, b5) {
    return S3().useContext(a3, b5);
  };
  exports.useDebugValue = function() {
  };
  exports.useEffect = function(a3, b5) {
    return S3().useEffect(a3, b5);
  };
  exports.useImperativeHandle = function(a3, b5, c6) {
    return S3().useImperativeHandle(a3, b5, c6);
  };
  exports.useLayoutEffect = function(a3, b5) {
    return S3().useLayoutEffect(a3, b5);
  };
  exports.useMemo = function(a3, b5) {
    return S3().useMemo(a3, b5);
  };
  exports.useReducer = function(a3, b5, c6) {
    return S3().useReducer(a3, b5, c6);
  };
  exports.useRef = function(a3) {
    return S3().useRef(a3);
  };
  exports.useState = function(a3) {
    return S3().useState(a3);
  };
  exports.version = "17.0.2";
});
var react = createCommonjsModule(function(module) {
  {
    module.exports = react_production_min;
  }
});

// docs/snowpack/pkg/react.js
var Children = react.Children;
var Component = react.Component;
var Fragment = react.Fragment;
var Profiler = react.Profiler;
var PureComponent = react.PureComponent;
var StrictMode = react.StrictMode;
var Suspense = react.Suspense;
var __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = react.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
var cloneElement = react.cloneElement;
var createContext = react.createContext;
var createElement = react.createElement;
var createFactory = react.createFactory;
var createRef = react.createRef;
var forwardRef = react.forwardRef;
var isValidElement = react.isValidElement;
var lazy = react.lazy;
var memo = react.memo;
var useCallback = react.useCallback;
var useContext = react.useContext;
var useDebugValue = react.useDebugValue;
var useEffect = react.useEffect;
var useImperativeHandle = react.useImperativeHandle;
var useLayoutEffect = react.useLayoutEffect;
var useMemo = react.useMemo;
var useReducer = react.useReducer;
var useRef = react.useRef;
var useState = react.useState;
var version = react.version;

// docs/snowpack/pkg/common/index-3eae4d6e.js
var scheduler_production_min = createCommonjsModule(function(module, exports) {
  var f4, g5, h4, k5;
  if (typeof performance === "object" && typeof performance.now === "function") {
    var l4 = performance;
    exports.unstable_now = function() {
      return l4.now();
    };
  } else {
    var p5 = Date, q5 = p5.now();
    exports.unstable_now = function() {
      return p5.now() - q5;
    };
  }
  if (typeof window === "undefined" || typeof MessageChannel !== "function") {
    var t3 = null, u4 = null, w4 = function() {
      if (t3 !== null)
        try {
          var a3 = exports.unstable_now();
          t3(true, a3);
          t3 = null;
        } catch (b5) {
          throw setTimeout(w4, 0), b5;
        }
    };
    f4 = function(a3) {
      t3 !== null ? setTimeout(f4, 0, a3) : (t3 = a3, setTimeout(w4, 0));
    };
    g5 = function(a3, b5) {
      u4 = setTimeout(a3, b5);
    };
    h4 = function() {
      clearTimeout(u4);
    };
    exports.unstable_shouldYield = function() {
      return false;
    };
    k5 = exports.unstable_forceFrameRate = function() {
    };
  } else {
    var x3 = window.setTimeout, y6 = window.clearTimeout;
    if (typeof console !== "undefined") {
      var z5 = window.cancelAnimationFrame;
      typeof window.requestAnimationFrame !== "function" && console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");
      typeof z5 !== "function" && console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills");
    }
    var A5 = false, B5 = null, C4 = -1, D5 = 5, E5 = 0;
    exports.unstable_shouldYield = function() {
      return exports.unstable_now() >= E5;
    };
    k5 = function() {
    };
    exports.unstable_forceFrameRate = function(a3) {
      0 > a3 || 125 < a3 ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : D5 = 0 < a3 ? Math.floor(1e3 / a3) : 5;
    };
    var F6 = new MessageChannel(), G5 = F6.port2;
    F6.port1.onmessage = function() {
      if (B5 !== null) {
        var a3 = exports.unstable_now();
        E5 = a3 + D5;
        try {
          B5(true, a3) ? G5.postMessage(null) : (A5 = false, B5 = null);
        } catch (b5) {
          throw G5.postMessage(null), b5;
        }
      } else
        A5 = false;
    };
    f4 = function(a3) {
      B5 = a3;
      A5 || (A5 = true, G5.postMessage(null));
    };
    g5 = function(a3, b5) {
      C4 = x3(function() {
        a3(exports.unstable_now());
      }, b5);
    };
    h4 = function() {
      y6(C4);
      C4 = -1;
    };
  }
  function H5(a3, b5) {
    var c6 = a3.length;
    a3.push(b5);
    a:
      for (; ; ) {
        var d5 = c6 - 1 >>> 1, e5 = a3[d5];
        if (e5 !== void 0 && 0 < I5(e5, b5))
          a3[d5] = b5, a3[c6] = e5, c6 = d5;
        else
          break a;
      }
  }
  function J2(a3) {
    a3 = a3[0];
    return a3 === void 0 ? null : a3;
  }
  function K2(a3) {
    var b5 = a3[0];
    if (b5 !== void 0) {
      var c6 = a3.pop();
      if (c6 !== b5) {
        a3[0] = c6;
        a:
          for (var d5 = 0, e5 = a3.length; d5 < e5; ) {
            var m5 = 2 * (d5 + 1) - 1, n5 = a3[m5], v4 = m5 + 1, r5 = a3[v4];
            if (n5 !== void 0 && 0 > I5(n5, c6))
              r5 !== void 0 && 0 > I5(r5, n5) ? (a3[d5] = r5, a3[v4] = c6, d5 = v4) : (a3[d5] = n5, a3[m5] = c6, d5 = m5);
            else if (r5 !== void 0 && 0 > I5(r5, c6))
              a3[d5] = r5, a3[v4] = c6, d5 = v4;
            else
              break a;
          }
      }
      return b5;
    }
    return null;
  }
  function I5(a3, b5) {
    var c6 = a3.sortIndex - b5.sortIndex;
    return c6 !== 0 ? c6 : a3.id - b5.id;
  }
  var L2 = [], M3 = [], N3 = 1, O3 = null, P3 = 3, Q2 = false, R3 = false, S3 = false;
  function T3(a3) {
    for (var b5 = J2(M3); b5 !== null; ) {
      if (b5.callback === null)
        K2(M3);
      else if (b5.startTime <= a3)
        K2(M3), b5.sortIndex = b5.expirationTime, H5(L2, b5);
      else
        break;
      b5 = J2(M3);
    }
  }
  function U3(a3) {
    S3 = false;
    T3(a3);
    if (!R3)
      if (J2(L2) !== null)
        R3 = true, f4(V3);
      else {
        var b5 = J2(M3);
        b5 !== null && g5(U3, b5.startTime - a3);
      }
  }
  function V3(a3, b5) {
    R3 = false;
    S3 && (S3 = false, h4());
    Q2 = true;
    var c6 = P3;
    try {
      T3(b5);
      for (O3 = J2(L2); O3 !== null && (!(O3.expirationTime > b5) || a3 && !exports.unstable_shouldYield()); ) {
        var d5 = O3.callback;
        if (typeof d5 === "function") {
          O3.callback = null;
          P3 = O3.priorityLevel;
          var e5 = d5(O3.expirationTime <= b5);
          b5 = exports.unstable_now();
          typeof e5 === "function" ? O3.callback = e5 : O3 === J2(L2) && K2(L2);
          T3(b5);
        } else
          K2(L2);
        O3 = J2(L2);
      }
      if (O3 !== null)
        var m5 = true;
      else {
        var n5 = J2(M3);
        n5 !== null && g5(U3, n5.startTime - b5);
        m5 = false;
      }
      return m5;
    } finally {
      O3 = null, P3 = c6, Q2 = false;
    }
  }
  var W2 = k5;
  exports.unstable_IdlePriority = 5;
  exports.unstable_ImmediatePriority = 1;
  exports.unstable_LowPriority = 4;
  exports.unstable_NormalPriority = 3;
  exports.unstable_Profiling = null;
  exports.unstable_UserBlockingPriority = 2;
  exports.unstable_cancelCallback = function(a3) {
    a3.callback = null;
  };
  exports.unstable_continueExecution = function() {
    R3 || Q2 || (R3 = true, f4(V3));
  };
  exports.unstable_getCurrentPriorityLevel = function() {
    return P3;
  };
  exports.unstable_getFirstCallbackNode = function() {
    return J2(L2);
  };
  exports.unstable_next = function(a3) {
    switch (P3) {
      case 1:
      case 2:
      case 3:
        var b5 = 3;
        break;
      default:
        b5 = P3;
    }
    var c6 = P3;
    P3 = b5;
    try {
      return a3();
    } finally {
      P3 = c6;
    }
  };
  exports.unstable_pauseExecution = function() {
  };
  exports.unstable_requestPaint = W2;
  exports.unstable_runWithPriority = function(a3, b5) {
    switch (a3) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        a3 = 3;
    }
    var c6 = P3;
    P3 = a3;
    try {
      return b5();
    } finally {
      P3 = c6;
    }
  };
  exports.unstable_scheduleCallback = function(a3, b5, c6) {
    var d5 = exports.unstable_now();
    typeof c6 === "object" && c6 !== null ? (c6 = c6.delay, c6 = typeof c6 === "number" && 0 < c6 ? d5 + c6 : d5) : c6 = d5;
    switch (a3) {
      case 1:
        var e5 = -1;
        break;
      case 2:
        e5 = 250;
        break;
      case 5:
        e5 = 1073741823;
        break;
      case 4:
        e5 = 1e4;
        break;
      default:
        e5 = 5e3;
    }
    e5 = c6 + e5;
    a3 = {id: N3++, callback: b5, priorityLevel: a3, startTime: c6, expirationTime: e5, sortIndex: -1};
    c6 > d5 ? (a3.sortIndex = c6, H5(M3, a3), J2(L2) === null && a3 === J2(M3) && (S3 ? h4() : S3 = true, g5(U3, c6 - d5))) : (a3.sortIndex = e5, H5(L2, a3), R3 || Q2 || (R3 = true, f4(V3)));
    return a3;
  };
  exports.unstable_wrapCallback = function(a3) {
    var b5 = P3;
    return function() {
      var c6 = P3;
      P3 = b5;
      try {
        return a3.apply(this, arguments);
      } finally {
        P3 = c6;
      }
    };
  };
});
var scheduler = createCommonjsModule(function(module) {
  {
    module.exports = scheduler_production_min;
  }
});
function y(a3) {
  for (var b5 = "https://reactjs.org/docs/error-decoder.html?invariant=" + a3, c6 = 1; c6 < arguments.length; c6++)
    b5 += "&args[]=" + encodeURIComponent(arguments[c6]);
  return "Minified React error #" + a3 + "; visit " + b5 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
if (!react)
  throw Error(y(227));
var ba = new Set();
var ca = {};
function da(a3, b5) {
  ea(a3, b5);
  ea(a3 + "Capture", b5);
}
function ea(a3, b5) {
  ca[a3] = b5;
  for (a3 = 0; a3 < b5.length; a3++)
    ba.add(b5[a3]);
}
var fa = !(typeof window === "undefined" || typeof window.document === "undefined" || typeof window.document.createElement === "undefined");
var ha = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/;
var ia = Object.prototype.hasOwnProperty;
var ja = {};
var ka = {};
function la(a3) {
  if (ia.call(ka, a3))
    return true;
  if (ia.call(ja, a3))
    return false;
  if (ha.test(a3))
    return ka[a3] = true;
  ja[a3] = true;
  return false;
}
function ma(a3, b5, c6, d5) {
  if (c6 !== null && c6.type === 0)
    return false;
  switch (typeof b5) {
    case "function":
    case "symbol":
      return true;
    case "boolean":
      if (d5)
        return false;
      if (c6 !== null)
        return !c6.acceptsBooleans;
      a3 = a3.toLowerCase().slice(0, 5);
      return a3 !== "data-" && a3 !== "aria-";
    default:
      return false;
  }
}
function na(a3, b5, c6, d5) {
  if (b5 === null || typeof b5 === "undefined" || ma(a3, b5, c6, d5))
    return true;
  if (d5)
    return false;
  if (c6 !== null)
    switch (c6.type) {
      case 3:
        return !b5;
      case 4:
        return b5 === false;
      case 5:
        return isNaN(b5);
      case 6:
        return isNaN(b5) || 1 > b5;
    }
  return false;
}
function B(a3, b5, c6, d5, e5, f4, g5) {
  this.acceptsBooleans = b5 === 2 || b5 === 3 || b5 === 4;
  this.attributeName = d5;
  this.attributeNamespace = e5;
  this.mustUseProperty = c6;
  this.propertyName = a3;
  this.type = b5;
  this.sanitizeURL = f4;
  this.removeEmptyString = g5;
}
var D = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a3) {
  D[a3] = new B(a3, 0, false, a3, null, false, false);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a3) {
  var b5 = a3[0];
  D[b5] = new B(b5, 1, false, a3[1], null, false, false);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a3) {
  D[a3] = new B(a3, 2, false, a3.toLowerCase(), null, false, false);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a3) {
  D[a3] = new B(a3, 2, false, a3, null, false, false);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a3) {
  D[a3] = new B(a3, 3, false, a3.toLowerCase(), null, false, false);
});
["checked", "multiple", "muted", "selected"].forEach(function(a3) {
  D[a3] = new B(a3, 3, true, a3, null, false, false);
});
["capture", "download"].forEach(function(a3) {
  D[a3] = new B(a3, 4, false, a3, null, false, false);
});
["cols", "rows", "size", "span"].forEach(function(a3) {
  D[a3] = new B(a3, 6, false, a3, null, false, false);
});
["rowSpan", "start"].forEach(function(a3) {
  D[a3] = new B(a3, 5, false, a3.toLowerCase(), null, false, false);
});
var oa = /[\-:]([a-z])/g;
function pa(a3) {
  return a3[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a3) {
  var b5 = a3.replace(oa, pa);
  D[b5] = new B(b5, 1, false, a3, null, false, false);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a3) {
  var b5 = a3.replace(oa, pa);
  D[b5] = new B(b5, 1, false, a3, "http://www.w3.org/1999/xlink", false, false);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(a3) {
  var b5 = a3.replace(oa, pa);
  D[b5] = new B(b5, 1, false, a3, "http://www.w3.org/XML/1998/namespace", false, false);
});
["tabIndex", "crossOrigin"].forEach(function(a3) {
  D[a3] = new B(a3, 1, false, a3.toLowerCase(), null, false, false);
});
D.xlinkHref = new B("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
["src", "href", "action", "formAction"].forEach(function(a3) {
  D[a3] = new B(a3, 1, false, a3.toLowerCase(), null, true, true);
});
function qa(a3, b5, c6, d5) {
  var e5 = D.hasOwnProperty(b5) ? D[b5] : null;
  var f4 = e5 !== null ? e5.type === 0 : d5 ? false : !(2 < b5.length) || b5[0] !== "o" && b5[0] !== "O" || b5[1] !== "n" && b5[1] !== "N" ? false : true;
  f4 || (na(b5, c6, e5, d5) && (c6 = null), d5 || e5 === null ? la(b5) && (c6 === null ? a3.removeAttribute(b5) : a3.setAttribute(b5, "" + c6)) : e5.mustUseProperty ? a3[e5.propertyName] = c6 === null ? e5.type === 3 ? false : "" : c6 : (b5 = e5.attributeName, d5 = e5.attributeNamespace, c6 === null ? a3.removeAttribute(b5) : (e5 = e5.type, c6 = e5 === 3 || e5 === 4 && c6 === true ? "" : "" + c6, d5 ? a3.setAttributeNS(d5, b5, c6) : a3.setAttribute(b5, c6))));
}
var ra = react.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
var sa = 60103;
var ta = 60106;
var ua = 60107;
var wa = 60108;
var xa = 60114;
var ya = 60109;
var za = 60110;
var Aa = 60112;
var Ba = 60113;
var Ca = 60120;
var Da = 60115;
var Ea = 60116;
var Fa = 60121;
var Ga = 60128;
var Ha = 60129;
var Ia = 60130;
var Ja = 60131;
if (typeof Symbol === "function" && Symbol.for) {
  E5 = Symbol.for;
  sa = E5("react.element");
  ta = E5("react.portal");
  ua = E5("react.fragment");
  wa = E5("react.strict_mode");
  xa = E5("react.profiler");
  ya = E5("react.provider");
  za = E5("react.context");
  Aa = E5("react.forward_ref");
  Ba = E5("react.suspense");
  Ca = E5("react.suspense_list");
  Da = E5("react.memo");
  Ea = E5("react.lazy");
  Fa = E5("react.block");
  E5("react.scope");
  Ga = E5("react.opaque.id");
  Ha = E5("react.debug_trace_mode");
  Ia = E5("react.offscreen");
  Ja = E5("react.legacy_hidden");
}
var E5;
var Ka = typeof Symbol === "function" && Symbol.iterator;
function La(a3) {
  if (a3 === null || typeof a3 !== "object")
    return null;
  a3 = Ka && a3[Ka] || a3["@@iterator"];
  return typeof a3 === "function" ? a3 : null;
}
var Ma;
function Na(a3) {
  if (Ma === void 0)
    try {
      throw Error();
    } catch (c6) {
      var b5 = c6.stack.trim().match(/\n( *(at )?)/);
      Ma = b5 && b5[1] || "";
    }
  return "\n" + Ma + a3;
}
var Oa = false;
function Pa(a3, b5) {
  if (!a3 || Oa)
    return "";
  Oa = true;
  var c6 = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (b5)
      if (b5 = function() {
        throw Error();
      }, Object.defineProperty(b5.prototype, "props", {set: function() {
        throw Error();
      }}), typeof Reflect === "object" && Reflect.construct) {
        try {
          Reflect.construct(b5, []);
        } catch (k5) {
          var d5 = k5;
        }
        Reflect.construct(a3, [], b5);
      } else {
        try {
          b5.call();
        } catch (k5) {
          d5 = k5;
        }
        a3.call(b5.prototype);
      }
    else {
      try {
        throw Error();
      } catch (k5) {
        d5 = k5;
      }
      a3();
    }
  } catch (k5) {
    if (k5 && d5 && typeof k5.stack === "string") {
      for (var e5 = k5.stack.split("\n"), f4 = d5.stack.split("\n"), g5 = e5.length - 1, h4 = f4.length - 1; 1 <= g5 && 0 <= h4 && e5[g5] !== f4[h4]; )
        h4--;
      for (; 1 <= g5 && 0 <= h4; g5--, h4--)
        if (e5[g5] !== f4[h4]) {
          if (g5 !== 1 || h4 !== 1) {
            do
              if (g5--, h4--, 0 > h4 || e5[g5] !== f4[h4])
                return "\n" + e5[g5].replace(" at new ", " at ");
            while (1 <= g5 && 0 <= h4);
          }
          break;
        }
    }
  } finally {
    Oa = false, Error.prepareStackTrace = c6;
  }
  return (a3 = a3 ? a3.displayName || a3.name : "") ? Na(a3) : "";
}
function Qa(a3) {
  switch (a3.tag) {
    case 5:
      return Na(a3.type);
    case 16:
      return Na("Lazy");
    case 13:
      return Na("Suspense");
    case 19:
      return Na("SuspenseList");
    case 0:
    case 2:
    case 15:
      return a3 = Pa(a3.type, false), a3;
    case 11:
      return a3 = Pa(a3.type.render, false), a3;
    case 22:
      return a3 = Pa(a3.type._render, false), a3;
    case 1:
      return a3 = Pa(a3.type, true), a3;
    default:
      return "";
  }
}
function Ra(a3) {
  if (a3 == null)
    return null;
  if (typeof a3 === "function")
    return a3.displayName || a3.name || null;
  if (typeof a3 === "string")
    return a3;
  switch (a3) {
    case ua:
      return "Fragment";
    case ta:
      return "Portal";
    case xa:
      return "Profiler";
    case wa:
      return "StrictMode";
    case Ba:
      return "Suspense";
    case Ca:
      return "SuspenseList";
  }
  if (typeof a3 === "object")
    switch (a3.$$typeof) {
      case za:
        return (a3.displayName || "Context") + ".Consumer";
      case ya:
        return (a3._context.displayName || "Context") + ".Provider";
      case Aa:
        var b5 = a3.render;
        b5 = b5.displayName || b5.name || "";
        return a3.displayName || (b5 !== "" ? "ForwardRef(" + b5 + ")" : "ForwardRef");
      case Da:
        return Ra(a3.type);
      case Fa:
        return Ra(a3._render);
      case Ea:
        b5 = a3._payload;
        a3 = a3._init;
        try {
          return Ra(a3(b5));
        } catch (c6) {
        }
    }
  return null;
}
function Sa(a3) {
  switch (typeof a3) {
    case "boolean":
    case "number":
    case "object":
    case "string":
    case "undefined":
      return a3;
    default:
      return "";
  }
}
function Ta(a3) {
  var b5 = a3.type;
  return (a3 = a3.nodeName) && a3.toLowerCase() === "input" && (b5 === "checkbox" || b5 === "radio");
}
function Ua(a3) {
  var b5 = Ta(a3) ? "checked" : "value", c6 = Object.getOwnPropertyDescriptor(a3.constructor.prototype, b5), d5 = "" + a3[b5];
  if (!a3.hasOwnProperty(b5) && typeof c6 !== "undefined" && typeof c6.get === "function" && typeof c6.set === "function") {
    var e5 = c6.get, f4 = c6.set;
    Object.defineProperty(a3, b5, {configurable: true, get: function() {
      return e5.call(this);
    }, set: function(a4) {
      d5 = "" + a4;
      f4.call(this, a4);
    }});
    Object.defineProperty(a3, b5, {enumerable: c6.enumerable});
    return {getValue: function() {
      return d5;
    }, setValue: function(a4) {
      d5 = "" + a4;
    }, stopTracking: function() {
      a3._valueTracker = null;
      delete a3[b5];
    }};
  }
}
function Va(a3) {
  a3._valueTracker || (a3._valueTracker = Ua(a3));
}
function Wa(a3) {
  if (!a3)
    return false;
  var b5 = a3._valueTracker;
  if (!b5)
    return true;
  var c6 = b5.getValue();
  var d5 = "";
  a3 && (d5 = Ta(a3) ? a3.checked ? "true" : "false" : a3.value);
  a3 = d5;
  return a3 !== c6 ? (b5.setValue(a3), true) : false;
}
function Xa(a3) {
  a3 = a3 || (typeof document !== "undefined" ? document : void 0);
  if (typeof a3 === "undefined")
    return null;
  try {
    return a3.activeElement || a3.body;
  } catch (b5) {
    return a3.body;
  }
}
function Ya(a3, b5) {
  var c6 = b5.checked;
  return objectAssign({}, b5, {defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: c6 != null ? c6 : a3._wrapperState.initialChecked});
}
function Za(a3, b5) {
  var c6 = b5.defaultValue == null ? "" : b5.defaultValue, d5 = b5.checked != null ? b5.checked : b5.defaultChecked;
  c6 = Sa(b5.value != null ? b5.value : c6);
  a3._wrapperState = {initialChecked: d5, initialValue: c6, controlled: b5.type === "checkbox" || b5.type === "radio" ? b5.checked != null : b5.value != null};
}
function $a(a3, b5) {
  b5 = b5.checked;
  b5 != null && qa(a3, "checked", b5, false);
}
function ab(a3, b5) {
  $a(a3, b5);
  var c6 = Sa(b5.value), d5 = b5.type;
  if (c6 != null)
    if (d5 === "number") {
      if (c6 === 0 && a3.value === "" || a3.value != c6)
        a3.value = "" + c6;
    } else
      a3.value !== "" + c6 && (a3.value = "" + c6);
  else if (d5 === "submit" || d5 === "reset") {
    a3.removeAttribute("value");
    return;
  }
  b5.hasOwnProperty("value") ? bb(a3, b5.type, c6) : b5.hasOwnProperty("defaultValue") && bb(a3, b5.type, Sa(b5.defaultValue));
  b5.checked == null && b5.defaultChecked != null && (a3.defaultChecked = !!b5.defaultChecked);
}
function cb(a3, b5, c6) {
  if (b5.hasOwnProperty("value") || b5.hasOwnProperty("defaultValue")) {
    var d5 = b5.type;
    if (!(d5 !== "submit" && d5 !== "reset" || b5.value !== void 0 && b5.value !== null))
      return;
    b5 = "" + a3._wrapperState.initialValue;
    c6 || b5 === a3.value || (a3.value = b5);
    a3.defaultValue = b5;
  }
  c6 = a3.name;
  c6 !== "" && (a3.name = "");
  a3.defaultChecked = !!a3._wrapperState.initialChecked;
  c6 !== "" && (a3.name = c6);
}
function bb(a3, b5, c6) {
  if (b5 !== "number" || Xa(a3.ownerDocument) !== a3)
    c6 == null ? a3.defaultValue = "" + a3._wrapperState.initialValue : a3.defaultValue !== "" + c6 && (a3.defaultValue = "" + c6);
}
function db(a3) {
  var b5 = "";
  react.Children.forEach(a3, function(a4) {
    a4 != null && (b5 += a4);
  });
  return b5;
}
function eb(a3, b5) {
  a3 = objectAssign({children: void 0}, b5);
  if (b5 = db(b5.children))
    a3.children = b5;
  return a3;
}
function fb(a3, b5, c6, d5) {
  a3 = a3.options;
  if (b5) {
    b5 = {};
    for (var e5 = 0; e5 < c6.length; e5++)
      b5["$" + c6[e5]] = true;
    for (c6 = 0; c6 < a3.length; c6++)
      e5 = b5.hasOwnProperty("$" + a3[c6].value), a3[c6].selected !== e5 && (a3[c6].selected = e5), e5 && d5 && (a3[c6].defaultSelected = true);
  } else {
    c6 = "" + Sa(c6);
    b5 = null;
    for (e5 = 0; e5 < a3.length; e5++) {
      if (a3[e5].value === c6) {
        a3[e5].selected = true;
        d5 && (a3[e5].defaultSelected = true);
        return;
      }
      b5 !== null || a3[e5].disabled || (b5 = a3[e5]);
    }
    b5 !== null && (b5.selected = true);
  }
}
function gb(a3, b5) {
  if (b5.dangerouslySetInnerHTML != null)
    throw Error(y(91));
  return objectAssign({}, b5, {value: void 0, defaultValue: void 0, children: "" + a3._wrapperState.initialValue});
}
function hb(a3, b5) {
  var c6 = b5.value;
  if (c6 == null) {
    c6 = b5.children;
    b5 = b5.defaultValue;
    if (c6 != null) {
      if (b5 != null)
        throw Error(y(92));
      if (Array.isArray(c6)) {
        if (!(1 >= c6.length))
          throw Error(y(93));
        c6 = c6[0];
      }
      b5 = c6;
    }
    b5 == null && (b5 = "");
    c6 = b5;
  }
  a3._wrapperState = {initialValue: Sa(c6)};
}
function ib(a3, b5) {
  var c6 = Sa(b5.value), d5 = Sa(b5.defaultValue);
  c6 != null && (c6 = "" + c6, c6 !== a3.value && (a3.value = c6), b5.defaultValue == null && a3.defaultValue !== c6 && (a3.defaultValue = c6));
  d5 != null && (a3.defaultValue = "" + d5);
}
function jb(a3) {
  var b5 = a3.textContent;
  b5 === a3._wrapperState.initialValue && b5 !== "" && b5 !== null && (a3.value = b5);
}
var kb = {html: "http://www.w3.org/1999/xhtml", mathml: "http://www.w3.org/1998/Math/MathML", svg: "http://www.w3.org/2000/svg"};
function lb(a3) {
  switch (a3) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function mb(a3, b5) {
  return a3 == null || a3 === "http://www.w3.org/1999/xhtml" ? lb(b5) : a3 === "http://www.w3.org/2000/svg" && b5 === "foreignObject" ? "http://www.w3.org/1999/xhtml" : a3;
}
var nb;
var ob = function(a3) {
  return typeof MSApp !== "undefined" && MSApp.execUnsafeLocalFunction ? function(b5, c6, d5, e5) {
    MSApp.execUnsafeLocalFunction(function() {
      return a3(b5, c6, d5, e5);
    });
  } : a3;
}(function(a3, b5) {
  if (a3.namespaceURI !== kb.svg || "innerHTML" in a3)
    a3.innerHTML = b5;
  else {
    nb = nb || document.createElement("div");
    nb.innerHTML = "<svg>" + b5.valueOf().toString() + "</svg>";
    for (b5 = nb.firstChild; a3.firstChild; )
      a3.removeChild(a3.firstChild);
    for (; b5.firstChild; )
      a3.appendChild(b5.firstChild);
  }
});
function pb(a3, b5) {
  if (b5) {
    var c6 = a3.firstChild;
    if (c6 && c6 === a3.lastChild && c6.nodeType === 3) {
      c6.nodeValue = b5;
      return;
    }
  }
  a3.textContent = b5;
}
var qb = {
  animationIterationCount: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
};
var rb = ["Webkit", "ms", "Moz", "O"];
Object.keys(qb).forEach(function(a3) {
  rb.forEach(function(b5) {
    b5 = b5 + a3.charAt(0).toUpperCase() + a3.substring(1);
    qb[b5] = qb[a3];
  });
});
function sb(a3, b5, c6) {
  return b5 == null || typeof b5 === "boolean" || b5 === "" ? "" : c6 || typeof b5 !== "number" || b5 === 0 || qb.hasOwnProperty(a3) && qb[a3] ? ("" + b5).trim() : b5 + "px";
}
function tb(a3, b5) {
  a3 = a3.style;
  for (var c6 in b5)
    if (b5.hasOwnProperty(c6)) {
      var d5 = c6.indexOf("--") === 0, e5 = sb(c6, b5[c6], d5);
      c6 === "float" && (c6 = "cssFloat");
      d5 ? a3.setProperty(c6, e5) : a3[c6] = e5;
    }
}
var ub = objectAssign({menuitem: true}, {area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true});
function vb(a3, b5) {
  if (b5) {
    if (ub[a3] && (b5.children != null || b5.dangerouslySetInnerHTML != null))
      throw Error(y(137, a3));
    if (b5.dangerouslySetInnerHTML != null) {
      if (b5.children != null)
        throw Error(y(60));
      if (!(typeof b5.dangerouslySetInnerHTML === "object" && "__html" in b5.dangerouslySetInnerHTML))
        throw Error(y(61));
    }
    if (b5.style != null && typeof b5.style !== "object")
      throw Error(y(62));
  }
}
function wb(a3, b5) {
  if (a3.indexOf("-") === -1)
    return typeof b5.is === "string";
  switch (a3) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return false;
    default:
      return true;
  }
}
function xb(a3) {
  a3 = a3.target || a3.srcElement || window;
  a3.correspondingUseElement && (a3 = a3.correspondingUseElement);
  return a3.nodeType === 3 ? a3.parentNode : a3;
}
var yb = null;
var zb = null;
var Ab = null;
function Bb(a3) {
  if (a3 = Cb(a3)) {
    if (typeof yb !== "function")
      throw Error(y(280));
    var b5 = a3.stateNode;
    b5 && (b5 = Db(b5), yb(a3.stateNode, a3.type, b5));
  }
}
function Eb(a3) {
  zb ? Ab ? Ab.push(a3) : Ab = [a3] : zb = a3;
}
function Fb() {
  if (zb) {
    var a3 = zb, b5 = Ab;
    Ab = zb = null;
    Bb(a3);
    if (b5)
      for (a3 = 0; a3 < b5.length; a3++)
        Bb(b5[a3]);
  }
}
function Gb(a3, b5) {
  return a3(b5);
}
function Hb(a3, b5, c6, d5, e5) {
  return a3(b5, c6, d5, e5);
}
function Ib() {
}
var Jb = Gb;
var Kb = false;
var Lb = false;
function Mb() {
  if (zb !== null || Ab !== null)
    Ib(), Fb();
}
function Nb(a3, b5, c6) {
  if (Lb)
    return a3(b5, c6);
  Lb = true;
  try {
    return Jb(a3, b5, c6);
  } finally {
    Lb = false, Mb();
  }
}
function Ob(a3, b5) {
  var c6 = a3.stateNode;
  if (c6 === null)
    return null;
  var d5 = Db(c6);
  if (d5 === null)
    return null;
  c6 = d5[b5];
  a:
    switch (b5) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (d5 = !d5.disabled) || (a3 = a3.type, d5 = !(a3 === "button" || a3 === "input" || a3 === "select" || a3 === "textarea"));
        a3 = !d5;
        break a;
      default:
        a3 = false;
    }
  if (a3)
    return null;
  if (c6 && typeof c6 !== "function")
    throw Error(y(231, b5, typeof c6));
  return c6;
}
var Pb = false;
if (fa)
  try {
    Qb = {};
    Object.defineProperty(Qb, "passive", {get: function() {
      Pb = true;
    }});
    window.addEventListener("test", Qb, Qb);
    window.removeEventListener("test", Qb, Qb);
  } catch (a3) {
    Pb = false;
  }
var Qb;
function Rb(a3, b5, c6, d5, e5, f4, g5, h4, k5) {
  var l4 = Array.prototype.slice.call(arguments, 3);
  try {
    b5.apply(c6, l4);
  } catch (n5) {
    this.onError(n5);
  }
}
var Sb = false;
var Tb = null;
var Ub = false;
var Vb = null;
var Wb = {onError: function(a3) {
  Sb = true;
  Tb = a3;
}};
function Xb(a3, b5, c6, d5, e5, f4, g5, h4, k5) {
  Sb = false;
  Tb = null;
  Rb.apply(Wb, arguments);
}
function Yb(a3, b5, c6, d5, e5, f4, g5, h4, k5) {
  Xb.apply(this, arguments);
  if (Sb) {
    if (Sb) {
      var l4 = Tb;
      Sb = false;
      Tb = null;
    } else
      throw Error(y(198));
    Ub || (Ub = true, Vb = l4);
  }
}
function Zb(a3) {
  var b5 = a3, c6 = a3;
  if (a3.alternate)
    for (; b5.return; )
      b5 = b5.return;
  else {
    a3 = b5;
    do
      b5 = a3, (b5.flags & 1026) !== 0 && (c6 = b5.return), a3 = b5.return;
    while (a3);
  }
  return b5.tag === 3 ? c6 : null;
}
function $b(a3) {
  if (a3.tag === 13) {
    var b5 = a3.memoizedState;
    b5 === null && (a3 = a3.alternate, a3 !== null && (b5 = a3.memoizedState));
    if (b5 !== null)
      return b5.dehydrated;
  }
  return null;
}
function ac(a3) {
  if (Zb(a3) !== a3)
    throw Error(y(188));
}
function bc(a3) {
  var b5 = a3.alternate;
  if (!b5) {
    b5 = Zb(a3);
    if (b5 === null)
      throw Error(y(188));
    return b5 !== a3 ? null : a3;
  }
  for (var c6 = a3, d5 = b5; ; ) {
    var e5 = c6.return;
    if (e5 === null)
      break;
    var f4 = e5.alternate;
    if (f4 === null) {
      d5 = e5.return;
      if (d5 !== null) {
        c6 = d5;
        continue;
      }
      break;
    }
    if (e5.child === f4.child) {
      for (f4 = e5.child; f4; ) {
        if (f4 === c6)
          return ac(e5), a3;
        if (f4 === d5)
          return ac(e5), b5;
        f4 = f4.sibling;
      }
      throw Error(y(188));
    }
    if (c6.return !== d5.return)
      c6 = e5, d5 = f4;
    else {
      for (var g5 = false, h4 = e5.child; h4; ) {
        if (h4 === c6) {
          g5 = true;
          c6 = e5;
          d5 = f4;
          break;
        }
        if (h4 === d5) {
          g5 = true;
          d5 = e5;
          c6 = f4;
          break;
        }
        h4 = h4.sibling;
      }
      if (!g5) {
        for (h4 = f4.child; h4; ) {
          if (h4 === c6) {
            g5 = true;
            c6 = f4;
            d5 = e5;
            break;
          }
          if (h4 === d5) {
            g5 = true;
            d5 = f4;
            c6 = e5;
            break;
          }
          h4 = h4.sibling;
        }
        if (!g5)
          throw Error(y(189));
      }
    }
    if (c6.alternate !== d5)
      throw Error(y(190));
  }
  if (c6.tag !== 3)
    throw Error(y(188));
  return c6.stateNode.current === c6 ? a3 : b5;
}
function cc(a3) {
  a3 = bc(a3);
  if (!a3)
    return null;
  for (var b5 = a3; ; ) {
    if (b5.tag === 5 || b5.tag === 6)
      return b5;
    if (b5.child)
      b5.child.return = b5, b5 = b5.child;
    else {
      if (b5 === a3)
        break;
      for (; !b5.sibling; ) {
        if (!b5.return || b5.return === a3)
          return null;
        b5 = b5.return;
      }
      b5.sibling.return = b5.return;
      b5 = b5.sibling;
    }
  }
  return null;
}
function dc(a3, b5) {
  for (var c6 = a3.alternate; b5 !== null; ) {
    if (b5 === a3 || b5 === c6)
      return true;
    b5 = b5.return;
  }
  return false;
}
var ec;
var fc;
var gc;
var hc;
var ic = false;
var jc = [];
var kc = null;
var lc = null;
var mc = null;
var nc = new Map();
var oc = new Map();
var pc = [];
var qc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function rc(a3, b5, c6, d5, e5) {
  return {blockedOn: a3, domEventName: b5, eventSystemFlags: c6 | 16, nativeEvent: e5, targetContainers: [d5]};
}
function sc(a3, b5) {
  switch (a3) {
    case "focusin":
    case "focusout":
      kc = null;
      break;
    case "dragenter":
    case "dragleave":
      lc = null;
      break;
    case "mouseover":
    case "mouseout":
      mc = null;
      break;
    case "pointerover":
    case "pointerout":
      nc.delete(b5.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      oc.delete(b5.pointerId);
  }
}
function tc(a3, b5, c6, d5, e5, f4) {
  if (a3 === null || a3.nativeEvent !== f4)
    return a3 = rc(b5, c6, d5, e5, f4), b5 !== null && (b5 = Cb(b5), b5 !== null && fc(b5)), a3;
  a3.eventSystemFlags |= d5;
  b5 = a3.targetContainers;
  e5 !== null && b5.indexOf(e5) === -1 && b5.push(e5);
  return a3;
}
function uc(a3, b5, c6, d5, e5) {
  switch (b5) {
    case "focusin":
      return kc = tc(kc, a3, b5, c6, d5, e5), true;
    case "dragenter":
      return lc = tc(lc, a3, b5, c6, d5, e5), true;
    case "mouseover":
      return mc = tc(mc, a3, b5, c6, d5, e5), true;
    case "pointerover":
      var f4 = e5.pointerId;
      nc.set(f4, tc(nc.get(f4) || null, a3, b5, c6, d5, e5));
      return true;
    case "gotpointercapture":
      return f4 = e5.pointerId, oc.set(f4, tc(oc.get(f4) || null, a3, b5, c6, d5, e5)), true;
  }
  return false;
}
function vc(a3) {
  var b5 = wc(a3.target);
  if (b5 !== null) {
    var c6 = Zb(b5);
    if (c6 !== null) {
      if (b5 = c6.tag, b5 === 13) {
        if (b5 = $b(c6), b5 !== null) {
          a3.blockedOn = b5;
          hc(a3.lanePriority, function() {
            scheduler.unstable_runWithPriority(a3.priority, function() {
              gc(c6);
            });
          });
          return;
        }
      } else if (b5 === 3 && c6.stateNode.hydrate) {
        a3.blockedOn = c6.tag === 3 ? c6.stateNode.containerInfo : null;
        return;
      }
    }
  }
  a3.blockedOn = null;
}
function xc(a3) {
  if (a3.blockedOn !== null)
    return false;
  for (var b5 = a3.targetContainers; 0 < b5.length; ) {
    var c6 = yc(a3.domEventName, a3.eventSystemFlags, b5[0], a3.nativeEvent);
    if (c6 !== null)
      return b5 = Cb(c6), b5 !== null && fc(b5), a3.blockedOn = c6, false;
    b5.shift();
  }
  return true;
}
function zc(a3, b5, c6) {
  xc(a3) && c6.delete(b5);
}
function Ac() {
  for (ic = false; 0 < jc.length; ) {
    var a3 = jc[0];
    if (a3.blockedOn !== null) {
      a3 = Cb(a3.blockedOn);
      a3 !== null && ec(a3);
      break;
    }
    for (var b5 = a3.targetContainers; 0 < b5.length; ) {
      var c6 = yc(a3.domEventName, a3.eventSystemFlags, b5[0], a3.nativeEvent);
      if (c6 !== null) {
        a3.blockedOn = c6;
        break;
      }
      b5.shift();
    }
    a3.blockedOn === null && jc.shift();
  }
  kc !== null && xc(kc) && (kc = null);
  lc !== null && xc(lc) && (lc = null);
  mc !== null && xc(mc) && (mc = null);
  nc.forEach(zc);
  oc.forEach(zc);
}
function Bc(a3, b5) {
  a3.blockedOn === b5 && (a3.blockedOn = null, ic || (ic = true, scheduler.unstable_scheduleCallback(scheduler.unstable_NormalPriority, Ac)));
}
function Cc(a3) {
  function b5(b6) {
    return Bc(b6, a3);
  }
  if (0 < jc.length) {
    Bc(jc[0], a3);
    for (var c6 = 1; c6 < jc.length; c6++) {
      var d5 = jc[c6];
      d5.blockedOn === a3 && (d5.blockedOn = null);
    }
  }
  kc !== null && Bc(kc, a3);
  lc !== null && Bc(lc, a3);
  mc !== null && Bc(mc, a3);
  nc.forEach(b5);
  oc.forEach(b5);
  for (c6 = 0; c6 < pc.length; c6++)
    d5 = pc[c6], d5.blockedOn === a3 && (d5.blockedOn = null);
  for (; 0 < pc.length && (c6 = pc[0], c6.blockedOn === null); )
    vc(c6), c6.blockedOn === null && pc.shift();
}
function Dc(a3, b5) {
  var c6 = {};
  c6[a3.toLowerCase()] = b5.toLowerCase();
  c6["Webkit" + a3] = "webkit" + b5;
  c6["Moz" + a3] = "moz" + b5;
  return c6;
}
var Ec = {animationend: Dc("Animation", "AnimationEnd"), animationiteration: Dc("Animation", "AnimationIteration"), animationstart: Dc("Animation", "AnimationStart"), transitionend: Dc("Transition", "TransitionEnd")};
var Fc = {};
var Gc = {};
fa && (Gc = document.createElement("div").style, "AnimationEvent" in window || (delete Ec.animationend.animation, delete Ec.animationiteration.animation, delete Ec.animationstart.animation), "TransitionEvent" in window || delete Ec.transitionend.transition);
function Hc(a3) {
  if (Fc[a3])
    return Fc[a3];
  if (!Ec[a3])
    return a3;
  var b5 = Ec[a3], c6;
  for (c6 in b5)
    if (b5.hasOwnProperty(c6) && c6 in Gc)
      return Fc[a3] = b5[c6];
  return a3;
}
var Ic = Hc("animationend");
var Jc = Hc("animationiteration");
var Kc = Hc("animationstart");
var Lc = Hc("transitionend");
var Mc = new Map();
var Nc = new Map();
var Oc = [
  "abort",
  "abort",
  Ic,
  "animationEnd",
  Jc,
  "animationIteration",
  Kc,
  "animationStart",
  "canplay",
  "canPlay",
  "canplaythrough",
  "canPlayThrough",
  "durationchange",
  "durationChange",
  "emptied",
  "emptied",
  "encrypted",
  "encrypted",
  "ended",
  "ended",
  "error",
  "error",
  "gotpointercapture",
  "gotPointerCapture",
  "load",
  "load",
  "loadeddata",
  "loadedData",
  "loadedmetadata",
  "loadedMetadata",
  "loadstart",
  "loadStart",
  "lostpointercapture",
  "lostPointerCapture",
  "playing",
  "playing",
  "progress",
  "progress",
  "seeking",
  "seeking",
  "stalled",
  "stalled",
  "suspend",
  "suspend",
  "timeupdate",
  "timeUpdate",
  Lc,
  "transitionEnd",
  "waiting",
  "waiting"
];
function Pc(a3, b5) {
  for (var c6 = 0; c6 < a3.length; c6 += 2) {
    var d5 = a3[c6], e5 = a3[c6 + 1];
    e5 = "on" + (e5[0].toUpperCase() + e5.slice(1));
    Nc.set(d5, b5);
    Mc.set(d5, e5);
    da(e5, [d5]);
  }
}
var Qc = scheduler.unstable_now;
Qc();
var F = 8;
function Rc(a3) {
  if ((1 & a3) !== 0)
    return F = 15, 1;
  if ((2 & a3) !== 0)
    return F = 14, 2;
  if ((4 & a3) !== 0)
    return F = 13, 4;
  var b5 = 24 & a3;
  if (b5 !== 0)
    return F = 12, b5;
  if ((a3 & 32) !== 0)
    return F = 11, 32;
  b5 = 192 & a3;
  if (b5 !== 0)
    return F = 10, b5;
  if ((a3 & 256) !== 0)
    return F = 9, 256;
  b5 = 3584 & a3;
  if (b5 !== 0)
    return F = 8, b5;
  if ((a3 & 4096) !== 0)
    return F = 7, 4096;
  b5 = 4186112 & a3;
  if (b5 !== 0)
    return F = 6, b5;
  b5 = 62914560 & a3;
  if (b5 !== 0)
    return F = 5, b5;
  if (a3 & 67108864)
    return F = 4, 67108864;
  if ((a3 & 134217728) !== 0)
    return F = 3, 134217728;
  b5 = 805306368 & a3;
  if (b5 !== 0)
    return F = 2, b5;
  if ((1073741824 & a3) !== 0)
    return F = 1, 1073741824;
  F = 8;
  return a3;
}
function Sc(a3) {
  switch (a3) {
    case 99:
      return 15;
    case 98:
      return 10;
    case 97:
    case 96:
      return 8;
    case 95:
      return 2;
    default:
      return 0;
  }
}
function Tc(a3) {
  switch (a3) {
    case 15:
    case 14:
      return 99;
    case 13:
    case 12:
    case 11:
    case 10:
      return 98;
    case 9:
    case 8:
    case 7:
    case 6:
    case 4:
    case 5:
      return 97;
    case 3:
    case 2:
    case 1:
      return 95;
    case 0:
      return 90;
    default:
      throw Error(y(358, a3));
  }
}
function Uc(a3, b5) {
  var c6 = a3.pendingLanes;
  if (c6 === 0)
    return F = 0;
  var d5 = 0, e5 = 0, f4 = a3.expiredLanes, g5 = a3.suspendedLanes, h4 = a3.pingedLanes;
  if (f4 !== 0)
    d5 = f4, e5 = F = 15;
  else if (f4 = c6 & 134217727, f4 !== 0) {
    var k5 = f4 & ~g5;
    k5 !== 0 ? (d5 = Rc(k5), e5 = F) : (h4 &= f4, h4 !== 0 && (d5 = Rc(h4), e5 = F));
  } else
    f4 = c6 & ~g5, f4 !== 0 ? (d5 = Rc(f4), e5 = F) : h4 !== 0 && (d5 = Rc(h4), e5 = F);
  if (d5 === 0)
    return 0;
  d5 = 31 - Vc(d5);
  d5 = c6 & ((0 > d5 ? 0 : 1 << d5) << 1) - 1;
  if (b5 !== 0 && b5 !== d5 && (b5 & g5) === 0) {
    Rc(b5);
    if (e5 <= F)
      return b5;
    F = e5;
  }
  b5 = a3.entangledLanes;
  if (b5 !== 0)
    for (a3 = a3.entanglements, b5 &= d5; 0 < b5; )
      c6 = 31 - Vc(b5), e5 = 1 << c6, d5 |= a3[c6], b5 &= ~e5;
  return d5;
}
function Wc(a3) {
  a3 = a3.pendingLanes & -1073741825;
  return a3 !== 0 ? a3 : a3 & 1073741824 ? 1073741824 : 0;
}
function Xc(a3, b5) {
  switch (a3) {
    case 15:
      return 1;
    case 14:
      return 2;
    case 12:
      return a3 = Yc(24 & ~b5), a3 === 0 ? Xc(10, b5) : a3;
    case 10:
      return a3 = Yc(192 & ~b5), a3 === 0 ? Xc(8, b5) : a3;
    case 8:
      return a3 = Yc(3584 & ~b5), a3 === 0 && (a3 = Yc(4186112 & ~b5), a3 === 0 && (a3 = 512)), a3;
    case 2:
      return b5 = Yc(805306368 & ~b5), b5 === 0 && (b5 = 268435456), b5;
  }
  throw Error(y(358, a3));
}
function Yc(a3) {
  return a3 & -a3;
}
function Zc(a3) {
  for (var b5 = [], c6 = 0; 31 > c6; c6++)
    b5.push(a3);
  return b5;
}
function $c(a3, b5, c6) {
  a3.pendingLanes |= b5;
  var d5 = b5 - 1;
  a3.suspendedLanes &= d5;
  a3.pingedLanes &= d5;
  a3 = a3.eventTimes;
  b5 = 31 - Vc(b5);
  a3[b5] = c6;
}
var Vc = Math.clz32 ? Math.clz32 : ad;
var bd = Math.log;
var cd = Math.LN2;
function ad(a3) {
  return a3 === 0 ? 32 : 31 - (bd(a3) / cd | 0) | 0;
}
var dd = scheduler.unstable_UserBlockingPriority;
var ed = scheduler.unstable_runWithPriority;
var fd = true;
function gd(a3, b5, c6, d5) {
  Kb || Ib();
  var e5 = hd, f4 = Kb;
  Kb = true;
  try {
    Hb(e5, a3, b5, c6, d5);
  } finally {
    (Kb = f4) || Mb();
  }
}
function id(a3, b5, c6, d5) {
  ed(dd, hd.bind(null, a3, b5, c6, d5));
}
function hd(a3, b5, c6, d5) {
  if (fd) {
    var e5;
    if ((e5 = (b5 & 4) === 0) && 0 < jc.length && -1 < qc.indexOf(a3))
      a3 = rc(null, a3, b5, c6, d5), jc.push(a3);
    else {
      var f4 = yc(a3, b5, c6, d5);
      if (f4 === null)
        e5 && sc(a3, d5);
      else {
        if (e5) {
          if (-1 < qc.indexOf(a3)) {
            a3 = rc(f4, a3, b5, c6, d5);
            jc.push(a3);
            return;
          }
          if (uc(f4, a3, b5, c6, d5))
            return;
          sc(a3, d5);
        }
        jd(a3, b5, d5, null, c6);
      }
    }
  }
}
function yc(a3, b5, c6, d5) {
  var e5 = xb(d5);
  e5 = wc(e5);
  if (e5 !== null) {
    var f4 = Zb(e5);
    if (f4 === null)
      e5 = null;
    else {
      var g5 = f4.tag;
      if (g5 === 13) {
        e5 = $b(f4);
        if (e5 !== null)
          return e5;
        e5 = null;
      } else if (g5 === 3) {
        if (f4.stateNode.hydrate)
          return f4.tag === 3 ? f4.stateNode.containerInfo : null;
        e5 = null;
      } else
        f4 !== e5 && (e5 = null);
    }
  }
  jd(a3, b5, d5, e5, c6);
  return null;
}
var kd = null;
var ld = null;
var md = null;
function nd() {
  if (md)
    return md;
  var a3, b5 = ld, c6 = b5.length, d5, e5 = "value" in kd ? kd.value : kd.textContent, f4 = e5.length;
  for (a3 = 0; a3 < c6 && b5[a3] === e5[a3]; a3++)
    ;
  var g5 = c6 - a3;
  for (d5 = 1; d5 <= g5 && b5[c6 - d5] === e5[f4 - d5]; d5++)
    ;
  return md = e5.slice(a3, 1 < d5 ? 1 - d5 : void 0);
}
function od(a3) {
  var b5 = a3.keyCode;
  "charCode" in a3 ? (a3 = a3.charCode, a3 === 0 && b5 === 13 && (a3 = 13)) : a3 = b5;
  a3 === 10 && (a3 = 13);
  return 32 <= a3 || a3 === 13 ? a3 : 0;
}
function pd() {
  return true;
}
function qd() {
  return false;
}
function rd(a3) {
  function b5(b6, d5, e5, f4, g5) {
    this._reactName = b6;
    this._targetInst = e5;
    this.type = d5;
    this.nativeEvent = f4;
    this.target = g5;
    this.currentTarget = null;
    for (var c6 in a3)
      a3.hasOwnProperty(c6) && (b6 = a3[c6], this[c6] = b6 ? b6(f4) : f4[c6]);
    this.isDefaultPrevented = (f4.defaultPrevented != null ? f4.defaultPrevented : f4.returnValue === false) ? pd : qd;
    this.isPropagationStopped = qd;
    return this;
  }
  objectAssign(b5.prototype, {preventDefault: function() {
    this.defaultPrevented = true;
    var a4 = this.nativeEvent;
    a4 && (a4.preventDefault ? a4.preventDefault() : typeof a4.returnValue !== "unknown" && (a4.returnValue = false), this.isDefaultPrevented = pd);
  }, stopPropagation: function() {
    var a4 = this.nativeEvent;
    a4 && (a4.stopPropagation ? a4.stopPropagation() : typeof a4.cancelBubble !== "unknown" && (a4.cancelBubble = true), this.isPropagationStopped = pd);
  }, persist: function() {
  }, isPersistent: pd});
  return b5;
}
var sd = {eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a3) {
  return a3.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0};
var td = rd(sd);
var ud = objectAssign({}, sd, {view: 0, detail: 0});
var vd = rd(ud);
var wd;
var xd;
var yd;
var Ad = objectAssign({}, ud, {screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a3) {
  return a3.relatedTarget === void 0 ? a3.fromElement === a3.srcElement ? a3.toElement : a3.fromElement : a3.relatedTarget;
}, movementX: function(a3) {
  if ("movementX" in a3)
    return a3.movementX;
  a3 !== yd && (yd && a3.type === "mousemove" ? (wd = a3.screenX - yd.screenX, xd = a3.screenY - yd.screenY) : xd = wd = 0, yd = a3);
  return wd;
}, movementY: function(a3) {
  return "movementY" in a3 ? a3.movementY : xd;
}});
var Bd = rd(Ad);
var Cd = objectAssign({}, Ad, {dataTransfer: 0});
var Dd = rd(Cd);
var Ed = objectAssign({}, ud, {relatedTarget: 0});
var Fd = rd(Ed);
var Gd = objectAssign({}, sd, {animationName: 0, elapsedTime: 0, pseudoElement: 0});
var Hd = rd(Gd);
var Id = objectAssign({}, sd, {clipboardData: function(a3) {
  return "clipboardData" in a3 ? a3.clipboardData : window.clipboardData;
}});
var Jd = rd(Id);
var Kd = objectAssign({}, sd, {data: 0});
var Ld = rd(Kd);
var Md = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
};
var Nd = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
};
var Od = {Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey"};
function Pd(a3) {
  var b5 = this.nativeEvent;
  return b5.getModifierState ? b5.getModifierState(a3) : (a3 = Od[a3]) ? !!b5[a3] : false;
}
function zd() {
  return Pd;
}
var Qd = objectAssign({}, ud, {key: function(a3) {
  if (a3.key) {
    var b5 = Md[a3.key] || a3.key;
    if (b5 !== "Unidentified")
      return b5;
  }
  return a3.type === "keypress" ? (a3 = od(a3), a3 === 13 ? "Enter" : String.fromCharCode(a3)) : a3.type === "keydown" || a3.type === "keyup" ? Nd[a3.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a3) {
  return a3.type === "keypress" ? od(a3) : 0;
}, keyCode: function(a3) {
  return a3.type === "keydown" || a3.type === "keyup" ? a3.keyCode : 0;
}, which: function(a3) {
  return a3.type === "keypress" ? od(a3) : a3.type === "keydown" || a3.type === "keyup" ? a3.keyCode : 0;
}});
var Rd = rd(Qd);
var Sd = objectAssign({}, Ad, {pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0});
var Td = rd(Sd);
var Ud = objectAssign({}, ud, {touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd});
var Vd = rd(Ud);
var Wd = objectAssign({}, sd, {propertyName: 0, elapsedTime: 0, pseudoElement: 0});
var Xd = rd(Wd);
var Yd = objectAssign({}, Ad, {
  deltaX: function(a3) {
    return "deltaX" in a3 ? a3.deltaX : "wheelDeltaX" in a3 ? -a3.wheelDeltaX : 0;
  },
  deltaY: function(a3) {
    return "deltaY" in a3 ? a3.deltaY : "wheelDeltaY" in a3 ? -a3.wheelDeltaY : "wheelDelta" in a3 ? -a3.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
});
var Zd = rd(Yd);
var $d = [9, 13, 27, 32];
var ae = fa && "CompositionEvent" in window;
var be = null;
fa && "documentMode" in document && (be = document.documentMode);
var ce = fa && "TextEvent" in window && !be;
var de = fa && (!ae || be && 8 < be && 11 >= be);
var ee = String.fromCharCode(32);
var fe = false;
function ge(a3, b5) {
  switch (a3) {
    case "keyup":
      return $d.indexOf(b5.keyCode) !== -1;
    case "keydown":
      return b5.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return true;
    default:
      return false;
  }
}
function he(a3) {
  a3 = a3.detail;
  return typeof a3 === "object" && "data" in a3 ? a3.data : null;
}
var ie = false;
function je(a3, b5) {
  switch (a3) {
    case "compositionend":
      return he(b5);
    case "keypress":
      if (b5.which !== 32)
        return null;
      fe = true;
      return ee;
    case "textInput":
      return a3 = b5.data, a3 === ee && fe ? null : a3;
    default:
      return null;
  }
}
function ke(a3, b5) {
  if (ie)
    return a3 === "compositionend" || !ae && ge(a3, b5) ? (a3 = nd(), md = ld = kd = null, ie = false, a3) : null;
  switch (a3) {
    case "paste":
      return null;
    case "keypress":
      if (!(b5.ctrlKey || b5.altKey || b5.metaKey) || b5.ctrlKey && b5.altKey) {
        if (b5.char && 1 < b5.char.length)
          return b5.char;
        if (b5.which)
          return String.fromCharCode(b5.which);
      }
      return null;
    case "compositionend":
      return de && b5.locale !== "ko" ? null : b5.data;
    default:
      return null;
  }
}
var le = {color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true};
function me(a3) {
  var b5 = a3 && a3.nodeName && a3.nodeName.toLowerCase();
  return b5 === "input" ? !!le[a3.type] : b5 === "textarea" ? true : false;
}
function ne(a3, b5, c6, d5) {
  Eb(d5);
  b5 = oe(b5, "onChange");
  0 < b5.length && (c6 = new td("onChange", "change", null, c6, d5), a3.push({event: c6, listeners: b5}));
}
var pe = null;
var qe = null;
function re(a3) {
  se(a3, 0);
}
function te(a3) {
  var b5 = ue(a3);
  if (Wa(b5))
    return a3;
}
function ve(a3, b5) {
  if (a3 === "change")
    return b5;
}
var we = false;
if (fa) {
  if (fa) {
    ye = "oninput" in document;
    if (!ye) {
      ze = document.createElement("div");
      ze.setAttribute("oninput", "return;");
      ye = typeof ze.oninput === "function";
    }
    xe = ye;
  } else
    xe = false;
  we = xe && (!document.documentMode || 9 < document.documentMode);
}
var xe;
var ye;
var ze;
function Ae() {
  pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
}
function Be(a3) {
  if (a3.propertyName === "value" && te(qe)) {
    var b5 = [];
    ne(b5, qe, a3, xb(a3));
    a3 = re;
    if (Kb)
      a3(b5);
    else {
      Kb = true;
      try {
        Gb(a3, b5);
      } finally {
        Kb = false, Mb();
      }
    }
  }
}
function Ce(a3, b5, c6) {
  a3 === "focusin" ? (Ae(), pe = b5, qe = c6, pe.attachEvent("onpropertychange", Be)) : a3 === "focusout" && Ae();
}
function De(a3) {
  if (a3 === "selectionchange" || a3 === "keyup" || a3 === "keydown")
    return te(qe);
}
function Ee(a3, b5) {
  if (a3 === "click")
    return te(b5);
}
function Fe(a3, b5) {
  if (a3 === "input" || a3 === "change")
    return te(b5);
}
function Ge(a3, b5) {
  return a3 === b5 && (a3 !== 0 || 1 / a3 === 1 / b5) || a3 !== a3 && b5 !== b5;
}
var He = typeof Object.is === "function" ? Object.is : Ge;
var Ie = Object.prototype.hasOwnProperty;
function Je(a3, b5) {
  if (He(a3, b5))
    return true;
  if (typeof a3 !== "object" || a3 === null || typeof b5 !== "object" || b5 === null)
    return false;
  var c6 = Object.keys(a3), d5 = Object.keys(b5);
  if (c6.length !== d5.length)
    return false;
  for (d5 = 0; d5 < c6.length; d5++)
    if (!Ie.call(b5, c6[d5]) || !He(a3[c6[d5]], b5[c6[d5]]))
      return false;
  return true;
}
function Ke(a3) {
  for (; a3 && a3.firstChild; )
    a3 = a3.firstChild;
  return a3;
}
function Le(a3, b5) {
  var c6 = Ke(a3);
  a3 = 0;
  for (var d5; c6; ) {
    if (c6.nodeType === 3) {
      d5 = a3 + c6.textContent.length;
      if (a3 <= b5 && d5 >= b5)
        return {node: c6, offset: b5 - a3};
      a3 = d5;
    }
    a: {
      for (; c6; ) {
        if (c6.nextSibling) {
          c6 = c6.nextSibling;
          break a;
        }
        c6 = c6.parentNode;
      }
      c6 = void 0;
    }
    c6 = Ke(c6);
  }
}
function Me(a3, b5) {
  return a3 && b5 ? a3 === b5 ? true : a3 && a3.nodeType === 3 ? false : b5 && b5.nodeType === 3 ? Me(a3, b5.parentNode) : "contains" in a3 ? a3.contains(b5) : a3.compareDocumentPosition ? !!(a3.compareDocumentPosition(b5) & 16) : false : false;
}
function Ne() {
  for (var a3 = window, b5 = Xa(); b5 instanceof a3.HTMLIFrameElement; ) {
    try {
      var c6 = typeof b5.contentWindow.location.href === "string";
    } catch (d5) {
      c6 = false;
    }
    if (c6)
      a3 = b5.contentWindow;
    else
      break;
    b5 = Xa(a3.document);
  }
  return b5;
}
function Oe(a3) {
  var b5 = a3 && a3.nodeName && a3.nodeName.toLowerCase();
  return b5 && (b5 === "input" && (a3.type === "text" || a3.type === "search" || a3.type === "tel" || a3.type === "url" || a3.type === "password") || b5 === "textarea" || a3.contentEditable === "true");
}
var Pe = fa && "documentMode" in document && 11 >= document.documentMode;
var Qe = null;
var Re = null;
var Se = null;
var Te = false;
function Ue(a3, b5, c6) {
  var d5 = c6.window === c6 ? c6.document : c6.nodeType === 9 ? c6 : c6.ownerDocument;
  Te || Qe == null || Qe !== Xa(d5) || (d5 = Qe, "selectionStart" in d5 && Oe(d5) ? d5 = {start: d5.selectionStart, end: d5.selectionEnd} : (d5 = (d5.ownerDocument && d5.ownerDocument.defaultView || window).getSelection(), d5 = {anchorNode: d5.anchorNode, anchorOffset: d5.anchorOffset, focusNode: d5.focusNode, focusOffset: d5.focusOffset}), Se && Je(Se, d5) || (Se = d5, d5 = oe(Re, "onSelect"), 0 < d5.length && (b5 = new td("onSelect", "select", null, b5, c6), a3.push({event: b5, listeners: d5}), b5.target = Qe)));
}
Pc("cancel cancel click click close close contextmenu contextMenu copy copy cut cut auxclick auxClick dblclick doubleClick dragend dragEnd dragstart dragStart drop drop focusin focus focusout blur input input invalid invalid keydown keyDown keypress keyPress keyup keyUp mousedown mouseDown mouseup mouseUp paste paste pause pause play play pointercancel pointerCancel pointerdown pointerDown pointerup pointerUp ratechange rateChange reset reset seeked seeked submit submit touchcancel touchCancel touchend touchEnd touchstart touchStart volumechange volumeChange".split(" "), 0);
Pc("drag drag dragenter dragEnter dragexit dragExit dragleave dragLeave dragover dragOver mousemove mouseMove mouseout mouseOut mouseover mouseOver pointermove pointerMove pointerout pointerOut pointerover pointerOver scroll scroll toggle toggle touchmove touchMove wheel wheel".split(" "), 1);
Pc(Oc, 2);
for (var Ve = "change selectionchange textInput compositionstart compositionend compositionupdate".split(" "), We = 0; We < Ve.length; We++)
  Nc.set(Ve[We], 0);
ea("onMouseEnter", ["mouseout", "mouseover"]);
ea("onMouseLeave", ["mouseout", "mouseover"]);
ea("onPointerEnter", ["pointerout", "pointerover"]);
ea("onPointerLeave", ["pointerout", "pointerover"]);
da("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
da("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
da("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
da("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
da("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
da("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Xe = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" ");
var Ye = new Set("cancel close invalid load scroll toggle".split(" ").concat(Xe));
function Ze(a3, b5, c6) {
  var d5 = a3.type || "unknown-event";
  a3.currentTarget = c6;
  Yb(d5, b5, void 0, a3);
  a3.currentTarget = null;
}
function se(a3, b5) {
  b5 = (b5 & 4) !== 0;
  for (var c6 = 0; c6 < a3.length; c6++) {
    var d5 = a3[c6], e5 = d5.event;
    d5 = d5.listeners;
    a: {
      var f4 = void 0;
      if (b5)
        for (var g5 = d5.length - 1; 0 <= g5; g5--) {
          var h4 = d5[g5], k5 = h4.instance, l4 = h4.currentTarget;
          h4 = h4.listener;
          if (k5 !== f4 && e5.isPropagationStopped())
            break a;
          Ze(e5, h4, l4);
          f4 = k5;
        }
      else
        for (g5 = 0; g5 < d5.length; g5++) {
          h4 = d5[g5];
          k5 = h4.instance;
          l4 = h4.currentTarget;
          h4 = h4.listener;
          if (k5 !== f4 && e5.isPropagationStopped())
            break a;
          Ze(e5, h4, l4);
          f4 = k5;
        }
    }
  }
  if (Ub)
    throw a3 = Vb, Ub = false, Vb = null, a3;
}
function G(a3, b5) {
  var c6 = $e(b5), d5 = a3 + "__bubble";
  c6.has(d5) || (af(b5, a3, 2, false), c6.add(d5));
}
var bf = "_reactListening" + Math.random().toString(36).slice(2);
function cf(a3) {
  a3[bf] || (a3[bf] = true, ba.forEach(function(b5) {
    Ye.has(b5) || df(b5, false, a3, null);
    df(b5, true, a3, null);
  }));
}
function df(a3, b5, c6, d5) {
  var e5 = 4 < arguments.length && arguments[4] !== void 0 ? arguments[4] : 0, f4 = c6;
  a3 === "selectionchange" && c6.nodeType !== 9 && (f4 = c6.ownerDocument);
  if (d5 !== null && !b5 && Ye.has(a3)) {
    if (a3 !== "scroll")
      return;
    e5 |= 2;
    f4 = d5;
  }
  var g5 = $e(f4), h4 = a3 + "__" + (b5 ? "capture" : "bubble");
  g5.has(h4) || (b5 && (e5 |= 4), af(f4, a3, e5, b5), g5.add(h4));
}
function af(a3, b5, c6, d5) {
  var e5 = Nc.get(b5);
  switch (e5 === void 0 ? 2 : e5) {
    case 0:
      e5 = gd;
      break;
    case 1:
      e5 = id;
      break;
    default:
      e5 = hd;
  }
  c6 = e5.bind(null, b5, c6, a3);
  e5 = void 0;
  !Pb || b5 !== "touchstart" && b5 !== "touchmove" && b5 !== "wheel" || (e5 = true);
  d5 ? e5 !== void 0 ? a3.addEventListener(b5, c6, {capture: true, passive: e5}) : a3.addEventListener(b5, c6, true) : e5 !== void 0 ? a3.addEventListener(b5, c6, {passive: e5}) : a3.addEventListener(b5, c6, false);
}
function jd(a3, b5, c6, d5, e5) {
  var f4 = d5;
  if ((b5 & 1) === 0 && (b5 & 2) === 0 && d5 !== null)
    a:
      for (; ; ) {
        if (d5 === null)
          return;
        var g5 = d5.tag;
        if (g5 === 3 || g5 === 4) {
          var h4 = d5.stateNode.containerInfo;
          if (h4 === e5 || h4.nodeType === 8 && h4.parentNode === e5)
            break;
          if (g5 === 4)
            for (g5 = d5.return; g5 !== null; ) {
              var k5 = g5.tag;
              if (k5 === 3 || k5 === 4) {
                if (k5 = g5.stateNode.containerInfo, k5 === e5 || k5.nodeType === 8 && k5.parentNode === e5)
                  return;
              }
              g5 = g5.return;
            }
          for (; h4 !== null; ) {
            g5 = wc(h4);
            if (g5 === null)
              return;
            k5 = g5.tag;
            if (k5 === 5 || k5 === 6) {
              d5 = f4 = g5;
              continue a;
            }
            h4 = h4.parentNode;
          }
        }
        d5 = d5.return;
      }
  Nb(function() {
    var d6 = f4, e6 = xb(c6), g6 = [];
    a: {
      var h5 = Mc.get(a3);
      if (h5 !== void 0) {
        var k6 = td, x3 = a3;
        switch (a3) {
          case "keypress":
            if (od(c6) === 0)
              break a;
          case "keydown":
          case "keyup":
            k6 = Rd;
            break;
          case "focusin":
            x3 = "focus";
            k6 = Fd;
            break;
          case "focusout":
            x3 = "blur";
            k6 = Fd;
            break;
          case "beforeblur":
          case "afterblur":
            k6 = Fd;
            break;
          case "click":
            if (c6.button === 2)
              break a;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            k6 = Bd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            k6 = Dd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            k6 = Vd;
            break;
          case Ic:
          case Jc:
          case Kc:
            k6 = Hd;
            break;
          case Lc:
            k6 = Xd;
            break;
          case "scroll":
            k6 = vd;
            break;
          case "wheel":
            k6 = Zd;
            break;
          case "copy":
          case "cut":
          case "paste":
            k6 = Jd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            k6 = Td;
        }
        var w4 = (b5 & 4) !== 0, z5 = !w4 && a3 === "scroll", u4 = w4 ? h5 !== null ? h5 + "Capture" : null : h5;
        w4 = [];
        for (var t3 = d6, q5; t3 !== null; ) {
          q5 = t3;
          var v4 = q5.stateNode;
          q5.tag === 5 && v4 !== null && (q5 = v4, u4 !== null && (v4 = Ob(t3, u4), v4 != null && w4.push(ef(t3, v4, q5))));
          if (z5)
            break;
          t3 = t3.return;
        }
        0 < w4.length && (h5 = new k6(h5, x3, null, c6, e6), g6.push({event: h5, listeners: w4}));
      }
    }
    if ((b5 & 7) === 0) {
      a: {
        h5 = a3 === "mouseover" || a3 === "pointerover";
        k6 = a3 === "mouseout" || a3 === "pointerout";
        if (h5 && (b5 & 16) === 0 && (x3 = c6.relatedTarget || c6.fromElement) && (wc(x3) || x3[ff]))
          break a;
        if (k6 || h5) {
          h5 = e6.window === e6 ? e6 : (h5 = e6.ownerDocument) ? h5.defaultView || h5.parentWindow : window;
          if (k6) {
            if (x3 = c6.relatedTarget || c6.toElement, k6 = d6, x3 = x3 ? wc(x3) : null, x3 !== null && (z5 = Zb(x3), x3 !== z5 || x3.tag !== 5 && x3.tag !== 6))
              x3 = null;
          } else
            k6 = null, x3 = d6;
          if (k6 !== x3) {
            w4 = Bd;
            v4 = "onMouseLeave";
            u4 = "onMouseEnter";
            t3 = "mouse";
            if (a3 === "pointerout" || a3 === "pointerover")
              w4 = Td, v4 = "onPointerLeave", u4 = "onPointerEnter", t3 = "pointer";
            z5 = k6 == null ? h5 : ue(k6);
            q5 = x3 == null ? h5 : ue(x3);
            h5 = new w4(v4, t3 + "leave", k6, c6, e6);
            h5.target = z5;
            h5.relatedTarget = q5;
            v4 = null;
            wc(e6) === d6 && (w4 = new w4(u4, t3 + "enter", x3, c6, e6), w4.target = q5, w4.relatedTarget = z5, v4 = w4);
            z5 = v4;
            if (k6 && x3)
              b: {
                w4 = k6;
                u4 = x3;
                t3 = 0;
                for (q5 = w4; q5; q5 = gf(q5))
                  t3++;
                q5 = 0;
                for (v4 = u4; v4; v4 = gf(v4))
                  q5++;
                for (; 0 < t3 - q5; )
                  w4 = gf(w4), t3--;
                for (; 0 < q5 - t3; )
                  u4 = gf(u4), q5--;
                for (; t3--; ) {
                  if (w4 === u4 || u4 !== null && w4 === u4.alternate)
                    break b;
                  w4 = gf(w4);
                  u4 = gf(u4);
                }
                w4 = null;
              }
            else
              w4 = null;
            k6 !== null && hf(g6, h5, k6, w4, false);
            x3 !== null && z5 !== null && hf(g6, z5, x3, w4, true);
          }
        }
      }
      a: {
        h5 = d6 ? ue(d6) : window;
        k6 = h5.nodeName && h5.nodeName.toLowerCase();
        if (k6 === "select" || k6 === "input" && h5.type === "file")
          var J2 = ve;
        else if (me(h5))
          if (we)
            J2 = Fe;
          else {
            J2 = De;
            var K2 = Ce;
          }
        else
          (k6 = h5.nodeName) && k6.toLowerCase() === "input" && (h5.type === "checkbox" || h5.type === "radio") && (J2 = Ee);
        if (J2 && (J2 = J2(a3, d6))) {
          ne(g6, J2, c6, e6);
          break a;
        }
        K2 && K2(a3, h5, d6);
        a3 === "focusout" && (K2 = h5._wrapperState) && K2.controlled && h5.type === "number" && bb(h5, "number", h5.value);
      }
      K2 = d6 ? ue(d6) : window;
      switch (a3) {
        case "focusin":
          if (me(K2) || K2.contentEditable === "true")
            Qe = K2, Re = d6, Se = null;
          break;
        case "focusout":
          Se = Re = Qe = null;
          break;
        case "mousedown":
          Te = true;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Te = false;
          Ue(g6, c6, e6);
          break;
        case "selectionchange":
          if (Pe)
            break;
        case "keydown":
        case "keyup":
          Ue(g6, c6, e6);
      }
      var Q2;
      if (ae)
        b: {
          switch (a3) {
            case "compositionstart":
              var L2 = "onCompositionStart";
              break b;
            case "compositionend":
              L2 = "onCompositionEnd";
              break b;
            case "compositionupdate":
              L2 = "onCompositionUpdate";
              break b;
          }
          L2 = void 0;
        }
      else
        ie ? ge(a3, c6) && (L2 = "onCompositionEnd") : a3 === "keydown" && c6.keyCode === 229 && (L2 = "onCompositionStart");
      L2 && (de && c6.locale !== "ko" && (ie || L2 !== "onCompositionStart" ? L2 === "onCompositionEnd" && ie && (Q2 = nd()) : (kd = e6, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), K2 = oe(d6, L2), 0 < K2.length && (L2 = new Ld(L2, a3, null, c6, e6), g6.push({event: L2, listeners: K2}), Q2 ? L2.data = Q2 : (Q2 = he(c6), Q2 !== null && (L2.data = Q2))));
      if (Q2 = ce ? je(a3, c6) : ke(a3, c6))
        d6 = oe(d6, "onBeforeInput"), 0 < d6.length && (e6 = new Ld("onBeforeInput", "beforeinput", null, c6, e6), g6.push({event: e6, listeners: d6}), e6.data = Q2);
    }
    se(g6, b5);
  });
}
function ef(a3, b5, c6) {
  return {instance: a3, listener: b5, currentTarget: c6};
}
function oe(a3, b5) {
  for (var c6 = b5 + "Capture", d5 = []; a3 !== null; ) {
    var e5 = a3, f4 = e5.stateNode;
    e5.tag === 5 && f4 !== null && (e5 = f4, f4 = Ob(a3, c6), f4 != null && d5.unshift(ef(a3, f4, e5)), f4 = Ob(a3, b5), f4 != null && d5.push(ef(a3, f4, e5)));
    a3 = a3.return;
  }
  return d5;
}
function gf(a3) {
  if (a3 === null)
    return null;
  do
    a3 = a3.return;
  while (a3 && a3.tag !== 5);
  return a3 ? a3 : null;
}
function hf(a3, b5, c6, d5, e5) {
  for (var f4 = b5._reactName, g5 = []; c6 !== null && c6 !== d5; ) {
    var h4 = c6, k5 = h4.alternate, l4 = h4.stateNode;
    if (k5 !== null && k5 === d5)
      break;
    h4.tag === 5 && l4 !== null && (h4 = l4, e5 ? (k5 = Ob(c6, f4), k5 != null && g5.unshift(ef(c6, k5, h4))) : e5 || (k5 = Ob(c6, f4), k5 != null && g5.push(ef(c6, k5, h4))));
    c6 = c6.return;
  }
  g5.length !== 0 && a3.push({event: b5, listeners: g5});
}
function jf() {
}
var kf = null;
var lf = null;
function mf(a3, b5) {
  switch (a3) {
    case "button":
    case "input":
    case "select":
    case "textarea":
      return !!b5.autoFocus;
  }
  return false;
}
function nf(a3, b5) {
  return a3 === "textarea" || a3 === "option" || a3 === "noscript" || typeof b5.children === "string" || typeof b5.children === "number" || typeof b5.dangerouslySetInnerHTML === "object" && b5.dangerouslySetInnerHTML !== null && b5.dangerouslySetInnerHTML.__html != null;
}
var of = typeof setTimeout === "function" ? setTimeout : void 0;
var pf = typeof clearTimeout === "function" ? clearTimeout : void 0;
function qf(a3) {
  a3.nodeType === 1 ? a3.textContent = "" : a3.nodeType === 9 && (a3 = a3.body, a3 != null && (a3.textContent = ""));
}
function rf(a3) {
  for (; a3 != null; a3 = a3.nextSibling) {
    var b5 = a3.nodeType;
    if (b5 === 1 || b5 === 3)
      break;
  }
  return a3;
}
function sf(a3) {
  a3 = a3.previousSibling;
  for (var b5 = 0; a3; ) {
    if (a3.nodeType === 8) {
      var c6 = a3.data;
      if (c6 === "$" || c6 === "$!" || c6 === "$?") {
        if (b5 === 0)
          return a3;
        b5--;
      } else
        c6 === "/$" && b5++;
    }
    a3 = a3.previousSibling;
  }
  return null;
}
var tf = 0;
function uf(a3) {
  return {$$typeof: Ga, toString: a3, valueOf: a3};
}
var vf = Math.random().toString(36).slice(2);
var wf = "__reactFiber$" + vf;
var xf = "__reactProps$" + vf;
var ff = "__reactContainer$" + vf;
var yf = "__reactEvents$" + vf;
function wc(a3) {
  var b5 = a3[wf];
  if (b5)
    return b5;
  for (var c6 = a3.parentNode; c6; ) {
    if (b5 = c6[ff] || c6[wf]) {
      c6 = b5.alternate;
      if (b5.child !== null || c6 !== null && c6.child !== null)
        for (a3 = sf(a3); a3 !== null; ) {
          if (c6 = a3[wf])
            return c6;
          a3 = sf(a3);
        }
      return b5;
    }
    a3 = c6;
    c6 = a3.parentNode;
  }
  return null;
}
function Cb(a3) {
  a3 = a3[wf] || a3[ff];
  return !a3 || a3.tag !== 5 && a3.tag !== 6 && a3.tag !== 13 && a3.tag !== 3 ? null : a3;
}
function ue(a3) {
  if (a3.tag === 5 || a3.tag === 6)
    return a3.stateNode;
  throw Error(y(33));
}
function Db(a3) {
  return a3[xf] || null;
}
function $e(a3) {
  var b5 = a3[yf];
  b5 === void 0 && (b5 = a3[yf] = new Set());
  return b5;
}
var zf = [];
var Af = -1;
function Bf(a3) {
  return {current: a3};
}
function H(a3) {
  0 > Af || (a3.current = zf[Af], zf[Af] = null, Af--);
}
function I(a3, b5) {
  Af++;
  zf[Af] = a3.current;
  a3.current = b5;
}
var Cf = {};
var M = Bf(Cf);
var N = Bf(false);
var Df = Cf;
function Ef(a3, b5) {
  var c6 = a3.type.contextTypes;
  if (!c6)
    return Cf;
  var d5 = a3.stateNode;
  if (d5 && d5.__reactInternalMemoizedUnmaskedChildContext === b5)
    return d5.__reactInternalMemoizedMaskedChildContext;
  var e5 = {}, f4;
  for (f4 in c6)
    e5[f4] = b5[f4];
  d5 && (a3 = a3.stateNode, a3.__reactInternalMemoizedUnmaskedChildContext = b5, a3.__reactInternalMemoizedMaskedChildContext = e5);
  return e5;
}
function Ff(a3) {
  a3 = a3.childContextTypes;
  return a3 !== null && a3 !== void 0;
}
function Gf() {
  H(N);
  H(M);
}
function Hf(a3, b5, c6) {
  if (M.current !== Cf)
    throw Error(y(168));
  I(M, b5);
  I(N, c6);
}
function If(a3, b5, c6) {
  var d5 = a3.stateNode;
  a3 = b5.childContextTypes;
  if (typeof d5.getChildContext !== "function")
    return c6;
  d5 = d5.getChildContext();
  for (var e5 in d5)
    if (!(e5 in a3))
      throw Error(y(108, Ra(b5) || "Unknown", e5));
  return objectAssign({}, c6, d5);
}
function Jf(a3) {
  a3 = (a3 = a3.stateNode) && a3.__reactInternalMemoizedMergedChildContext || Cf;
  Df = M.current;
  I(M, a3);
  I(N, N.current);
  return true;
}
function Kf(a3, b5, c6) {
  var d5 = a3.stateNode;
  if (!d5)
    throw Error(y(169));
  c6 ? (a3 = If(a3, b5, Df), d5.__reactInternalMemoizedMergedChildContext = a3, H(N), H(M), I(M, a3)) : H(N);
  I(N, c6);
}
var Lf = null;
var Mf = null;
var Nf = scheduler.unstable_runWithPriority;
var Of = scheduler.unstable_scheduleCallback;
var Pf = scheduler.unstable_cancelCallback;
var Qf = scheduler.unstable_shouldYield;
var Rf = scheduler.unstable_requestPaint;
var Sf = scheduler.unstable_now;
var Tf = scheduler.unstable_getCurrentPriorityLevel;
var Uf = scheduler.unstable_ImmediatePriority;
var Vf = scheduler.unstable_UserBlockingPriority;
var Wf = scheduler.unstable_NormalPriority;
var Xf = scheduler.unstable_LowPriority;
var Yf = scheduler.unstable_IdlePriority;
var Zf = {};
var $f = Rf !== void 0 ? Rf : function() {
};
var ag = null;
var bg = null;
var cg = false;
var dg = Sf();
var O = 1e4 > dg ? Sf : function() {
  return Sf() - dg;
};
function eg() {
  switch (Tf()) {
    case Uf:
      return 99;
    case Vf:
      return 98;
    case Wf:
      return 97;
    case Xf:
      return 96;
    case Yf:
      return 95;
    default:
      throw Error(y(332));
  }
}
function fg(a3) {
  switch (a3) {
    case 99:
      return Uf;
    case 98:
      return Vf;
    case 97:
      return Wf;
    case 96:
      return Xf;
    case 95:
      return Yf;
    default:
      throw Error(y(332));
  }
}
function gg(a3, b5) {
  a3 = fg(a3);
  return Nf(a3, b5);
}
function hg(a3, b5, c6) {
  a3 = fg(a3);
  return Of(a3, b5, c6);
}
function ig() {
  if (bg !== null) {
    var a3 = bg;
    bg = null;
    Pf(a3);
  }
  jg();
}
function jg() {
  if (!cg && ag !== null) {
    cg = true;
    var a3 = 0;
    try {
      var b5 = ag;
      gg(99, function() {
        for (; a3 < b5.length; a3++) {
          var c6 = b5[a3];
          do
            c6 = c6(true);
          while (c6 !== null);
        }
      });
      ag = null;
    } catch (c6) {
      throw ag !== null && (ag = ag.slice(a3 + 1)), Of(Uf, ig), c6;
    } finally {
      cg = false;
    }
  }
}
var kg = ra.ReactCurrentBatchConfig;
function lg(a3, b5) {
  if (a3 && a3.defaultProps) {
    b5 = objectAssign({}, b5);
    a3 = a3.defaultProps;
    for (var c6 in a3)
      b5[c6] === void 0 && (b5[c6] = a3[c6]);
    return b5;
  }
  return b5;
}
var mg = Bf(null);
var ng = null;
var og = null;
var pg = null;
function qg() {
  pg = og = ng = null;
}
function rg(a3) {
  var b5 = mg.current;
  H(mg);
  a3.type._context._currentValue = b5;
}
function sg(a3, b5) {
  for (; a3 !== null; ) {
    var c6 = a3.alternate;
    if ((a3.childLanes & b5) === b5)
      if (c6 === null || (c6.childLanes & b5) === b5)
        break;
      else
        c6.childLanes |= b5;
    else
      a3.childLanes |= b5, c6 !== null && (c6.childLanes |= b5);
    a3 = a3.return;
  }
}
function tg(a3, b5) {
  ng = a3;
  pg = og = null;
  a3 = a3.dependencies;
  a3 !== null && a3.firstContext !== null && ((a3.lanes & b5) !== 0 && (ug = true), a3.firstContext = null);
}
function vg(a3, b5) {
  if (pg !== a3 && b5 !== false && b5 !== 0) {
    if (typeof b5 !== "number" || b5 === 1073741823)
      pg = a3, b5 = 1073741823;
    b5 = {context: a3, observedBits: b5, next: null};
    if (og === null) {
      if (ng === null)
        throw Error(y(308));
      og = b5;
      ng.dependencies = {lanes: 0, firstContext: b5, responders: null};
    } else
      og = og.next = b5;
  }
  return a3._currentValue;
}
var wg = false;
function xg(a3) {
  a3.updateQueue = {baseState: a3.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: {pending: null}, effects: null};
}
function yg(a3, b5) {
  a3 = a3.updateQueue;
  b5.updateQueue === a3 && (b5.updateQueue = {baseState: a3.baseState, firstBaseUpdate: a3.firstBaseUpdate, lastBaseUpdate: a3.lastBaseUpdate, shared: a3.shared, effects: a3.effects});
}
function zg(a3, b5) {
  return {eventTime: a3, lane: b5, tag: 0, payload: null, callback: null, next: null};
}
function Ag(a3, b5) {
  a3 = a3.updateQueue;
  if (a3 !== null) {
    a3 = a3.shared;
    var c6 = a3.pending;
    c6 === null ? b5.next = b5 : (b5.next = c6.next, c6.next = b5);
    a3.pending = b5;
  }
}
function Bg(a3, b5) {
  var c6 = a3.updateQueue, d5 = a3.alternate;
  if (d5 !== null && (d5 = d5.updateQueue, c6 === d5)) {
    var e5 = null, f4 = null;
    c6 = c6.firstBaseUpdate;
    if (c6 !== null) {
      do {
        var g5 = {eventTime: c6.eventTime, lane: c6.lane, tag: c6.tag, payload: c6.payload, callback: c6.callback, next: null};
        f4 === null ? e5 = f4 = g5 : f4 = f4.next = g5;
        c6 = c6.next;
      } while (c6 !== null);
      f4 === null ? e5 = f4 = b5 : f4 = f4.next = b5;
    } else
      e5 = f4 = b5;
    c6 = {baseState: d5.baseState, firstBaseUpdate: e5, lastBaseUpdate: f4, shared: d5.shared, effects: d5.effects};
    a3.updateQueue = c6;
    return;
  }
  a3 = c6.lastBaseUpdate;
  a3 === null ? c6.firstBaseUpdate = b5 : a3.next = b5;
  c6.lastBaseUpdate = b5;
}
function Cg(a3, b5, c6, d5) {
  var e5 = a3.updateQueue;
  wg = false;
  var f4 = e5.firstBaseUpdate, g5 = e5.lastBaseUpdate, h4 = e5.shared.pending;
  if (h4 !== null) {
    e5.shared.pending = null;
    var k5 = h4, l4 = k5.next;
    k5.next = null;
    g5 === null ? f4 = l4 : g5.next = l4;
    g5 = k5;
    var n5 = a3.alternate;
    if (n5 !== null) {
      n5 = n5.updateQueue;
      var A5 = n5.lastBaseUpdate;
      A5 !== g5 && (A5 === null ? n5.firstBaseUpdate = l4 : A5.next = l4, n5.lastBaseUpdate = k5);
    }
  }
  if (f4 !== null) {
    A5 = e5.baseState;
    g5 = 0;
    n5 = l4 = k5 = null;
    do {
      h4 = f4.lane;
      var p5 = f4.eventTime;
      if ((d5 & h4) === h4) {
        n5 !== null && (n5 = n5.next = {
          eventTime: p5,
          lane: 0,
          tag: f4.tag,
          payload: f4.payload,
          callback: f4.callback,
          next: null
        });
        a: {
          var C4 = a3, x3 = f4;
          h4 = b5;
          p5 = c6;
          switch (x3.tag) {
            case 1:
              C4 = x3.payload;
              if (typeof C4 === "function") {
                A5 = C4.call(p5, A5, h4);
                break a;
              }
              A5 = C4;
              break a;
            case 3:
              C4.flags = C4.flags & -4097 | 64;
            case 0:
              C4 = x3.payload;
              h4 = typeof C4 === "function" ? C4.call(p5, A5, h4) : C4;
              if (h4 === null || h4 === void 0)
                break a;
              A5 = objectAssign({}, A5, h4);
              break a;
            case 2:
              wg = true;
          }
        }
        f4.callback !== null && (a3.flags |= 32, h4 = e5.effects, h4 === null ? e5.effects = [f4] : h4.push(f4));
      } else
        p5 = {eventTime: p5, lane: h4, tag: f4.tag, payload: f4.payload, callback: f4.callback, next: null}, n5 === null ? (l4 = n5 = p5, k5 = A5) : n5 = n5.next = p5, g5 |= h4;
      f4 = f4.next;
      if (f4 === null)
        if (h4 = e5.shared.pending, h4 === null)
          break;
        else
          f4 = h4.next, h4.next = null, e5.lastBaseUpdate = h4, e5.shared.pending = null;
    } while (1);
    n5 === null && (k5 = A5);
    e5.baseState = k5;
    e5.firstBaseUpdate = l4;
    e5.lastBaseUpdate = n5;
    Dg |= g5;
    a3.lanes = g5;
    a3.memoizedState = A5;
  }
}
function Eg(a3, b5, c6) {
  a3 = b5.effects;
  b5.effects = null;
  if (a3 !== null)
    for (b5 = 0; b5 < a3.length; b5++) {
      var d5 = a3[b5], e5 = d5.callback;
      if (e5 !== null) {
        d5.callback = null;
        d5 = c6;
        if (typeof e5 !== "function")
          throw Error(y(191, e5));
        e5.call(d5);
      }
    }
}
var Fg = new react.Component().refs;
function Gg(a3, b5, c6, d5) {
  b5 = a3.memoizedState;
  c6 = c6(d5, b5);
  c6 = c6 === null || c6 === void 0 ? b5 : objectAssign({}, b5, c6);
  a3.memoizedState = c6;
  a3.lanes === 0 && (a3.updateQueue.baseState = c6);
}
var Kg = {isMounted: function(a3) {
  return (a3 = a3._reactInternals) ? Zb(a3) === a3 : false;
}, enqueueSetState: function(a3, b5, c6) {
  a3 = a3._reactInternals;
  var d5 = Hg(), e5 = Ig(a3), f4 = zg(d5, e5);
  f4.payload = b5;
  c6 !== void 0 && c6 !== null && (f4.callback = c6);
  Ag(a3, f4);
  Jg(a3, e5, d5);
}, enqueueReplaceState: function(a3, b5, c6) {
  a3 = a3._reactInternals;
  var d5 = Hg(), e5 = Ig(a3), f4 = zg(d5, e5);
  f4.tag = 1;
  f4.payload = b5;
  c6 !== void 0 && c6 !== null && (f4.callback = c6);
  Ag(a3, f4);
  Jg(a3, e5, d5);
}, enqueueForceUpdate: function(a3, b5) {
  a3 = a3._reactInternals;
  var c6 = Hg(), d5 = Ig(a3), e5 = zg(c6, d5);
  e5.tag = 2;
  b5 !== void 0 && b5 !== null && (e5.callback = b5);
  Ag(a3, e5);
  Jg(a3, d5, c6);
}};
function Lg(a3, b5, c6, d5, e5, f4, g5) {
  a3 = a3.stateNode;
  return typeof a3.shouldComponentUpdate === "function" ? a3.shouldComponentUpdate(d5, f4, g5) : b5.prototype && b5.prototype.isPureReactComponent ? !Je(c6, d5) || !Je(e5, f4) : true;
}
function Mg(a3, b5, c6) {
  var d5 = false, e5 = Cf;
  var f4 = b5.contextType;
  typeof f4 === "object" && f4 !== null ? f4 = vg(f4) : (e5 = Ff(b5) ? Df : M.current, d5 = b5.contextTypes, f4 = (d5 = d5 !== null && d5 !== void 0) ? Ef(a3, e5) : Cf);
  b5 = new b5(c6, f4);
  a3.memoizedState = b5.state !== null && b5.state !== void 0 ? b5.state : null;
  b5.updater = Kg;
  a3.stateNode = b5;
  b5._reactInternals = a3;
  d5 && (a3 = a3.stateNode, a3.__reactInternalMemoizedUnmaskedChildContext = e5, a3.__reactInternalMemoizedMaskedChildContext = f4);
  return b5;
}
function Ng(a3, b5, c6, d5) {
  a3 = b5.state;
  typeof b5.componentWillReceiveProps === "function" && b5.componentWillReceiveProps(c6, d5);
  typeof b5.UNSAFE_componentWillReceiveProps === "function" && b5.UNSAFE_componentWillReceiveProps(c6, d5);
  b5.state !== a3 && Kg.enqueueReplaceState(b5, b5.state, null);
}
function Og(a3, b5, c6, d5) {
  var e5 = a3.stateNode;
  e5.props = c6;
  e5.state = a3.memoizedState;
  e5.refs = Fg;
  xg(a3);
  var f4 = b5.contextType;
  typeof f4 === "object" && f4 !== null ? e5.context = vg(f4) : (f4 = Ff(b5) ? Df : M.current, e5.context = Ef(a3, f4));
  Cg(a3, c6, e5, d5);
  e5.state = a3.memoizedState;
  f4 = b5.getDerivedStateFromProps;
  typeof f4 === "function" && (Gg(a3, b5, f4, c6), e5.state = a3.memoizedState);
  typeof b5.getDerivedStateFromProps === "function" || typeof e5.getSnapshotBeforeUpdate === "function" || typeof e5.UNSAFE_componentWillMount !== "function" && typeof e5.componentWillMount !== "function" || (b5 = e5.state, typeof e5.componentWillMount === "function" && e5.componentWillMount(), typeof e5.UNSAFE_componentWillMount === "function" && e5.UNSAFE_componentWillMount(), b5 !== e5.state && Kg.enqueueReplaceState(e5, e5.state, null), Cg(a3, c6, e5, d5), e5.state = a3.memoizedState);
  typeof e5.componentDidMount === "function" && (a3.flags |= 4);
}
var Pg = Array.isArray;
function Qg(a3, b5, c6) {
  a3 = c6.ref;
  if (a3 !== null && typeof a3 !== "function" && typeof a3 !== "object") {
    if (c6._owner) {
      c6 = c6._owner;
      if (c6) {
        if (c6.tag !== 1)
          throw Error(y(309));
        var d5 = c6.stateNode;
      }
      if (!d5)
        throw Error(y(147, a3));
      var e5 = "" + a3;
      if (b5 !== null && b5.ref !== null && typeof b5.ref === "function" && b5.ref._stringRef === e5)
        return b5.ref;
      b5 = function(a4) {
        var b6 = d5.refs;
        b6 === Fg && (b6 = d5.refs = {});
        a4 === null ? delete b6[e5] : b6[e5] = a4;
      };
      b5._stringRef = e5;
      return b5;
    }
    if (typeof a3 !== "string")
      throw Error(y(284));
    if (!c6._owner)
      throw Error(y(290, a3));
  }
  return a3;
}
function Rg(a3, b5) {
  if (a3.type !== "textarea")
    throw Error(y(31, Object.prototype.toString.call(b5) === "[object Object]" ? "object with keys {" + Object.keys(b5).join(", ") + "}" : b5));
}
function Sg(a3) {
  function b5(b6, c7) {
    if (a3) {
      var d6 = b6.lastEffect;
      d6 !== null ? (d6.nextEffect = c7, b6.lastEffect = c7) : b6.firstEffect = b6.lastEffect = c7;
      c7.nextEffect = null;
      c7.flags = 8;
    }
  }
  function c6(c7, d6) {
    if (!a3)
      return null;
    for (; d6 !== null; )
      b5(c7, d6), d6 = d6.sibling;
    return null;
  }
  function d5(a4, b6) {
    for (a4 = new Map(); b6 !== null; )
      b6.key !== null ? a4.set(b6.key, b6) : a4.set(b6.index, b6), b6 = b6.sibling;
    return a4;
  }
  function e5(a4, b6) {
    a4 = Tg(a4, b6);
    a4.index = 0;
    a4.sibling = null;
    return a4;
  }
  function f4(b6, c7, d6) {
    b6.index = d6;
    if (!a3)
      return c7;
    d6 = b6.alternate;
    if (d6 !== null)
      return d6 = d6.index, d6 < c7 ? (b6.flags = 2, c7) : d6;
    b6.flags = 2;
    return c7;
  }
  function g5(b6) {
    a3 && b6.alternate === null && (b6.flags = 2);
    return b6;
  }
  function h4(a4, b6, c7, d6) {
    if (b6 === null || b6.tag !== 6)
      return b6 = Ug(c7, a4.mode, d6), b6.return = a4, b6;
    b6 = e5(b6, c7);
    b6.return = a4;
    return b6;
  }
  function k5(a4, b6, c7, d6) {
    if (b6 !== null && b6.elementType === c7.type)
      return d6 = e5(b6, c7.props), d6.ref = Qg(a4, b6, c7), d6.return = a4, d6;
    d6 = Vg(c7.type, c7.key, c7.props, null, a4.mode, d6);
    d6.ref = Qg(a4, b6, c7);
    d6.return = a4;
    return d6;
  }
  function l4(a4, b6, c7, d6) {
    if (b6 === null || b6.tag !== 4 || b6.stateNode.containerInfo !== c7.containerInfo || b6.stateNode.implementation !== c7.implementation)
      return b6 = Wg(c7, a4.mode, d6), b6.return = a4, b6;
    b6 = e5(b6, c7.children || []);
    b6.return = a4;
    return b6;
  }
  function n5(a4, b6, c7, d6, f5) {
    if (b6 === null || b6.tag !== 7)
      return b6 = Xg(c7, a4.mode, d6, f5), b6.return = a4, b6;
    b6 = e5(b6, c7);
    b6.return = a4;
    return b6;
  }
  function A5(a4, b6, c7) {
    if (typeof b6 === "string" || typeof b6 === "number")
      return b6 = Ug("" + b6, a4.mode, c7), b6.return = a4, b6;
    if (typeof b6 === "object" && b6 !== null) {
      switch (b6.$$typeof) {
        case sa:
          return c7 = Vg(b6.type, b6.key, b6.props, null, a4.mode, c7), c7.ref = Qg(a4, null, b6), c7.return = a4, c7;
        case ta:
          return b6 = Wg(b6, a4.mode, c7), b6.return = a4, b6;
      }
      if (Pg(b6) || La(b6))
        return b6 = Xg(b6, a4.mode, c7, null), b6.return = a4, b6;
      Rg(a4, b6);
    }
    return null;
  }
  function p5(a4, b6, c7, d6) {
    var e6 = b6 !== null ? b6.key : null;
    if (typeof c7 === "string" || typeof c7 === "number")
      return e6 !== null ? null : h4(a4, b6, "" + c7, d6);
    if (typeof c7 === "object" && c7 !== null) {
      switch (c7.$$typeof) {
        case sa:
          return c7.key === e6 ? c7.type === ua ? n5(a4, b6, c7.props.children, d6, e6) : k5(a4, b6, c7, d6) : null;
        case ta:
          return c7.key === e6 ? l4(a4, b6, c7, d6) : null;
      }
      if (Pg(c7) || La(c7))
        return e6 !== null ? null : n5(a4, b6, c7, d6, null);
      Rg(a4, c7);
    }
    return null;
  }
  function C4(a4, b6, c7, d6, e6) {
    if (typeof d6 === "string" || typeof d6 === "number")
      return a4 = a4.get(c7) || null, h4(b6, a4, "" + d6, e6);
    if (typeof d6 === "object" && d6 !== null) {
      switch (d6.$$typeof) {
        case sa:
          return a4 = a4.get(d6.key === null ? c7 : d6.key) || null, d6.type === ua ? n5(b6, a4, d6.props.children, e6, d6.key) : k5(b6, a4, d6, e6);
        case ta:
          return a4 = a4.get(d6.key === null ? c7 : d6.key) || null, l4(b6, a4, d6, e6);
      }
      if (Pg(d6) || La(d6))
        return a4 = a4.get(c7) || null, n5(b6, a4, d6, e6, null);
      Rg(b6, d6);
    }
    return null;
  }
  function x3(e6, g6, h5, k6) {
    for (var l5 = null, t3 = null, u4 = g6, z5 = g6 = 0, q5 = null; u4 !== null && z5 < h5.length; z5++) {
      u4.index > z5 ? (q5 = u4, u4 = null) : q5 = u4.sibling;
      var n6 = p5(e6, u4, h5[z5], k6);
      if (n6 === null) {
        u4 === null && (u4 = q5);
        break;
      }
      a3 && u4 && n6.alternate === null && b5(e6, u4);
      g6 = f4(n6, g6, z5);
      t3 === null ? l5 = n6 : t3.sibling = n6;
      t3 = n6;
      u4 = q5;
    }
    if (z5 === h5.length)
      return c6(e6, u4), l5;
    if (u4 === null) {
      for (; z5 < h5.length; z5++)
        u4 = A5(e6, h5[z5], k6), u4 !== null && (g6 = f4(u4, g6, z5), t3 === null ? l5 = u4 : t3.sibling = u4, t3 = u4);
      return l5;
    }
    for (u4 = d5(e6, u4); z5 < h5.length; z5++)
      q5 = C4(u4, e6, z5, h5[z5], k6), q5 !== null && (a3 && q5.alternate !== null && u4.delete(q5.key === null ? z5 : q5.key), g6 = f4(q5, g6, z5), t3 === null ? l5 = q5 : t3.sibling = q5, t3 = q5);
    a3 && u4.forEach(function(a4) {
      return b5(e6, a4);
    });
    return l5;
  }
  function w4(e6, g6, h5, k6) {
    var l5 = La(h5);
    if (typeof l5 !== "function")
      throw Error(y(150));
    h5 = l5.call(h5);
    if (h5 == null)
      throw Error(y(151));
    for (var t3 = l5 = null, u4 = g6, z5 = g6 = 0, q5 = null, n6 = h5.next(); u4 !== null && !n6.done; z5++, n6 = h5.next()) {
      u4.index > z5 ? (q5 = u4, u4 = null) : q5 = u4.sibling;
      var w5 = p5(e6, u4, n6.value, k6);
      if (w5 === null) {
        u4 === null && (u4 = q5);
        break;
      }
      a3 && u4 && w5.alternate === null && b5(e6, u4);
      g6 = f4(w5, g6, z5);
      t3 === null ? l5 = w5 : t3.sibling = w5;
      t3 = w5;
      u4 = q5;
    }
    if (n6.done)
      return c6(e6, u4), l5;
    if (u4 === null) {
      for (; !n6.done; z5++, n6 = h5.next())
        n6 = A5(e6, n6.value, k6), n6 !== null && (g6 = f4(n6, g6, z5), t3 === null ? l5 = n6 : t3.sibling = n6, t3 = n6);
      return l5;
    }
    for (u4 = d5(e6, u4); !n6.done; z5++, n6 = h5.next())
      n6 = C4(u4, e6, z5, n6.value, k6), n6 !== null && (a3 && n6.alternate !== null && u4.delete(n6.key === null ? z5 : n6.key), g6 = f4(n6, g6, z5), t3 === null ? l5 = n6 : t3.sibling = n6, t3 = n6);
    a3 && u4.forEach(function(a4) {
      return b5(e6, a4);
    });
    return l5;
  }
  return function(a4, d6, f5, h5) {
    var k6 = typeof f5 === "object" && f5 !== null && f5.type === ua && f5.key === null;
    k6 && (f5 = f5.props.children);
    var l5 = typeof f5 === "object" && f5 !== null;
    if (l5)
      switch (f5.$$typeof) {
        case sa:
          a: {
            l5 = f5.key;
            for (k6 = d6; k6 !== null; ) {
              if (k6.key === l5) {
                switch (k6.tag) {
                  case 7:
                    if (f5.type === ua) {
                      c6(a4, k6.sibling);
                      d6 = e5(k6, f5.props.children);
                      d6.return = a4;
                      a4 = d6;
                      break a;
                    }
                    break;
                  default:
                    if (k6.elementType === f5.type) {
                      c6(a4, k6.sibling);
                      d6 = e5(k6, f5.props);
                      d6.ref = Qg(a4, k6, f5);
                      d6.return = a4;
                      a4 = d6;
                      break a;
                    }
                }
                c6(a4, k6);
                break;
              } else
                b5(a4, k6);
              k6 = k6.sibling;
            }
            f5.type === ua ? (d6 = Xg(f5.props.children, a4.mode, h5, f5.key), d6.return = a4, a4 = d6) : (h5 = Vg(f5.type, f5.key, f5.props, null, a4.mode, h5), h5.ref = Qg(a4, d6, f5), h5.return = a4, a4 = h5);
          }
          return g5(a4);
        case ta:
          a: {
            for (k6 = f5.key; d6 !== null; ) {
              if (d6.key === k6)
                if (d6.tag === 4 && d6.stateNode.containerInfo === f5.containerInfo && d6.stateNode.implementation === f5.implementation) {
                  c6(a4, d6.sibling);
                  d6 = e5(d6, f5.children || []);
                  d6.return = a4;
                  a4 = d6;
                  break a;
                } else {
                  c6(a4, d6);
                  break;
                }
              else
                b5(a4, d6);
              d6 = d6.sibling;
            }
            d6 = Wg(f5, a4.mode, h5);
            d6.return = a4;
            a4 = d6;
          }
          return g5(a4);
      }
    if (typeof f5 === "string" || typeof f5 === "number")
      return f5 = "" + f5, d6 !== null && d6.tag === 6 ? (c6(a4, d6.sibling), d6 = e5(d6, f5), d6.return = a4, a4 = d6) : (c6(a4, d6), d6 = Ug(f5, a4.mode, h5), d6.return = a4, a4 = d6), g5(a4);
    if (Pg(f5))
      return x3(a4, d6, f5, h5);
    if (La(f5))
      return w4(a4, d6, f5, h5);
    l5 && Rg(a4, f5);
    if (typeof f5 === "undefined" && !k6)
      switch (a4.tag) {
        case 1:
        case 22:
        case 0:
        case 11:
        case 15:
          throw Error(y(152, Ra(a4.type) || "Component"));
      }
    return c6(a4, d6);
  };
}
var Yg = Sg(true);
var Zg = Sg(false);
var $g = {};
var ah = Bf($g);
var bh = Bf($g);
var ch = Bf($g);
function dh(a3) {
  if (a3 === $g)
    throw Error(y(174));
  return a3;
}
function eh(a3, b5) {
  I(ch, b5);
  I(bh, a3);
  I(ah, $g);
  a3 = b5.nodeType;
  switch (a3) {
    case 9:
    case 11:
      b5 = (b5 = b5.documentElement) ? b5.namespaceURI : mb(null, "");
      break;
    default:
      a3 = a3 === 8 ? b5.parentNode : b5, b5 = a3.namespaceURI || null, a3 = a3.tagName, b5 = mb(b5, a3);
  }
  H(ah);
  I(ah, b5);
}
function fh() {
  H(ah);
  H(bh);
  H(ch);
}
function gh(a3) {
  dh(ch.current);
  var b5 = dh(ah.current);
  var c6 = mb(b5, a3.type);
  b5 !== c6 && (I(bh, a3), I(ah, c6));
}
function hh(a3) {
  bh.current === a3 && (H(ah), H(bh));
}
var P = Bf(0);
function ih(a3) {
  for (var b5 = a3; b5 !== null; ) {
    if (b5.tag === 13) {
      var c6 = b5.memoizedState;
      if (c6 !== null && (c6 = c6.dehydrated, c6 === null || c6.data === "$?" || c6.data === "$!"))
        return b5;
    } else if (b5.tag === 19 && b5.memoizedProps.revealOrder !== void 0) {
      if ((b5.flags & 64) !== 0)
        return b5;
    } else if (b5.child !== null) {
      b5.child.return = b5;
      b5 = b5.child;
      continue;
    }
    if (b5 === a3)
      break;
    for (; b5.sibling === null; ) {
      if (b5.return === null || b5.return === a3)
        return null;
      b5 = b5.return;
    }
    b5.sibling.return = b5.return;
    b5 = b5.sibling;
  }
  return null;
}
var jh = null;
var kh = null;
var lh = false;
function mh(a3, b5) {
  var c6 = nh(5, null, null, 0);
  c6.elementType = "DELETED";
  c6.type = "DELETED";
  c6.stateNode = b5;
  c6.return = a3;
  c6.flags = 8;
  a3.lastEffect !== null ? (a3.lastEffect.nextEffect = c6, a3.lastEffect = c6) : a3.firstEffect = a3.lastEffect = c6;
}
function oh(a3, b5) {
  switch (a3.tag) {
    case 5:
      var c6 = a3.type;
      b5 = b5.nodeType !== 1 || c6.toLowerCase() !== b5.nodeName.toLowerCase() ? null : b5;
      return b5 !== null ? (a3.stateNode = b5, true) : false;
    case 6:
      return b5 = a3.pendingProps === "" || b5.nodeType !== 3 ? null : b5, b5 !== null ? (a3.stateNode = b5, true) : false;
    case 13:
      return false;
    default:
      return false;
  }
}
function ph(a3) {
  if (lh) {
    var b5 = kh;
    if (b5) {
      var c6 = b5;
      if (!oh(a3, b5)) {
        b5 = rf(c6.nextSibling);
        if (!b5 || !oh(a3, b5)) {
          a3.flags = a3.flags & -1025 | 2;
          lh = false;
          jh = a3;
          return;
        }
        mh(jh, c6);
      }
      jh = a3;
      kh = rf(b5.firstChild);
    } else
      a3.flags = a3.flags & -1025 | 2, lh = false, jh = a3;
  }
}
function qh(a3) {
  for (a3 = a3.return; a3 !== null && a3.tag !== 5 && a3.tag !== 3 && a3.tag !== 13; )
    a3 = a3.return;
  jh = a3;
}
function rh(a3) {
  if (a3 !== jh)
    return false;
  if (!lh)
    return qh(a3), lh = true, false;
  var b5 = a3.type;
  if (a3.tag !== 5 || b5 !== "head" && b5 !== "body" && !nf(b5, a3.memoizedProps))
    for (b5 = kh; b5; )
      mh(a3, b5), b5 = rf(b5.nextSibling);
  qh(a3);
  if (a3.tag === 13) {
    a3 = a3.memoizedState;
    a3 = a3 !== null ? a3.dehydrated : null;
    if (!a3)
      throw Error(y(317));
    a: {
      a3 = a3.nextSibling;
      for (b5 = 0; a3; ) {
        if (a3.nodeType === 8) {
          var c6 = a3.data;
          if (c6 === "/$") {
            if (b5 === 0) {
              kh = rf(a3.nextSibling);
              break a;
            }
            b5--;
          } else
            c6 !== "$" && c6 !== "$!" && c6 !== "$?" || b5++;
        }
        a3 = a3.nextSibling;
      }
      kh = null;
    }
  } else
    kh = jh ? rf(a3.stateNode.nextSibling) : null;
  return true;
}
function sh() {
  kh = jh = null;
  lh = false;
}
var th = [];
function uh() {
  for (var a3 = 0; a3 < th.length; a3++)
    th[a3]._workInProgressVersionPrimary = null;
  th.length = 0;
}
var vh = ra.ReactCurrentDispatcher;
var wh = ra.ReactCurrentBatchConfig;
var xh = 0;
var R = null;
var S = null;
var T = null;
var yh = false;
var zh = false;
function Ah() {
  throw Error(y(321));
}
function Bh(a3, b5) {
  if (b5 === null)
    return false;
  for (var c6 = 0; c6 < b5.length && c6 < a3.length; c6++)
    if (!He(a3[c6], b5[c6]))
      return false;
  return true;
}
function Ch(a3, b5, c6, d5, e5, f4) {
  xh = f4;
  R = b5;
  b5.memoizedState = null;
  b5.updateQueue = null;
  b5.lanes = 0;
  vh.current = a3 === null || a3.memoizedState === null ? Dh : Eh;
  a3 = c6(d5, e5);
  if (zh) {
    f4 = 0;
    do {
      zh = false;
      if (!(25 > f4))
        throw Error(y(301));
      f4 += 1;
      T = S = null;
      b5.updateQueue = null;
      vh.current = Fh;
      a3 = c6(d5, e5);
    } while (zh);
  }
  vh.current = Gh;
  b5 = S !== null && S.next !== null;
  xh = 0;
  T = S = R = null;
  yh = false;
  if (b5)
    throw Error(y(300));
  return a3;
}
function Hh() {
  var a3 = {memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null};
  T === null ? R.memoizedState = T = a3 : T = T.next = a3;
  return T;
}
function Ih() {
  if (S === null) {
    var a3 = R.alternate;
    a3 = a3 !== null ? a3.memoizedState : null;
  } else
    a3 = S.next;
  var b5 = T === null ? R.memoizedState : T.next;
  if (b5 !== null)
    T = b5, S = a3;
  else {
    if (a3 === null)
      throw Error(y(310));
    S = a3;
    a3 = {memoizedState: S.memoizedState, baseState: S.baseState, baseQueue: S.baseQueue, queue: S.queue, next: null};
    T === null ? R.memoizedState = T = a3 : T = T.next = a3;
  }
  return T;
}
function Jh(a3, b5) {
  return typeof b5 === "function" ? b5(a3) : b5;
}
function Kh(a3) {
  var b5 = Ih(), c6 = b5.queue;
  if (c6 === null)
    throw Error(y(311));
  c6.lastRenderedReducer = a3;
  var d5 = S, e5 = d5.baseQueue, f4 = c6.pending;
  if (f4 !== null) {
    if (e5 !== null) {
      var g5 = e5.next;
      e5.next = f4.next;
      f4.next = g5;
    }
    d5.baseQueue = e5 = f4;
    c6.pending = null;
  }
  if (e5 !== null) {
    e5 = e5.next;
    d5 = d5.baseState;
    var h4 = g5 = f4 = null, k5 = e5;
    do {
      var l4 = k5.lane;
      if ((xh & l4) === l4)
        h4 !== null && (h4 = h4.next = {lane: 0, action: k5.action, eagerReducer: k5.eagerReducer, eagerState: k5.eagerState, next: null}), d5 = k5.eagerReducer === a3 ? k5.eagerState : a3(d5, k5.action);
      else {
        var n5 = {
          lane: l4,
          action: k5.action,
          eagerReducer: k5.eagerReducer,
          eagerState: k5.eagerState,
          next: null
        };
        h4 === null ? (g5 = h4 = n5, f4 = d5) : h4 = h4.next = n5;
        R.lanes |= l4;
        Dg |= l4;
      }
      k5 = k5.next;
    } while (k5 !== null && k5 !== e5);
    h4 === null ? f4 = d5 : h4.next = g5;
    He(d5, b5.memoizedState) || (ug = true);
    b5.memoizedState = d5;
    b5.baseState = f4;
    b5.baseQueue = h4;
    c6.lastRenderedState = d5;
  }
  return [b5.memoizedState, c6.dispatch];
}
function Lh(a3) {
  var b5 = Ih(), c6 = b5.queue;
  if (c6 === null)
    throw Error(y(311));
  c6.lastRenderedReducer = a3;
  var d5 = c6.dispatch, e5 = c6.pending, f4 = b5.memoizedState;
  if (e5 !== null) {
    c6.pending = null;
    var g5 = e5 = e5.next;
    do
      f4 = a3(f4, g5.action), g5 = g5.next;
    while (g5 !== e5);
    He(f4, b5.memoizedState) || (ug = true);
    b5.memoizedState = f4;
    b5.baseQueue === null && (b5.baseState = f4);
    c6.lastRenderedState = f4;
  }
  return [f4, d5];
}
function Mh(a3, b5, c6) {
  var d5 = b5._getVersion;
  d5 = d5(b5._source);
  var e5 = b5._workInProgressVersionPrimary;
  if (e5 !== null)
    a3 = e5 === d5;
  else if (a3 = a3.mutableReadLanes, a3 = (xh & a3) === a3)
    b5._workInProgressVersionPrimary = d5, th.push(b5);
  if (a3)
    return c6(b5._source);
  th.push(b5);
  throw Error(y(350));
}
function Nh(a3, b5, c6, d5) {
  var e5 = U;
  if (e5 === null)
    throw Error(y(349));
  var f4 = b5._getVersion, g5 = f4(b5._source), h4 = vh.current, k5 = h4.useState(function() {
    return Mh(e5, b5, c6);
  }), l4 = k5[1], n5 = k5[0];
  k5 = T;
  var A5 = a3.memoizedState, p5 = A5.refs, C4 = p5.getSnapshot, x3 = A5.source;
  A5 = A5.subscribe;
  var w4 = R;
  a3.memoizedState = {refs: p5, source: b5, subscribe: d5};
  h4.useEffect(function() {
    p5.getSnapshot = c6;
    p5.setSnapshot = l4;
    var a4 = f4(b5._source);
    if (!He(g5, a4)) {
      a4 = c6(b5._source);
      He(n5, a4) || (l4(a4), a4 = Ig(w4), e5.mutableReadLanes |= a4 & e5.pendingLanes);
      a4 = e5.mutableReadLanes;
      e5.entangledLanes |= a4;
      for (var d6 = e5.entanglements, h5 = a4; 0 < h5; ) {
        var k6 = 31 - Vc(h5), v4 = 1 << k6;
        d6[k6] |= a4;
        h5 &= ~v4;
      }
    }
  }, [c6, b5, d5]);
  h4.useEffect(function() {
    return d5(b5._source, function() {
      var a4 = p5.getSnapshot, c7 = p5.setSnapshot;
      try {
        c7(a4(b5._source));
        var d6 = Ig(w4);
        e5.mutableReadLanes |= d6 & e5.pendingLanes;
      } catch (q5) {
        c7(function() {
          throw q5;
        });
      }
    });
  }, [b5, d5]);
  He(C4, c6) && He(x3, b5) && He(A5, d5) || (a3 = {pending: null, dispatch: null, lastRenderedReducer: Jh, lastRenderedState: n5}, a3.dispatch = l4 = Oh.bind(null, R, a3), k5.queue = a3, k5.baseQueue = null, n5 = Mh(e5, b5, c6), k5.memoizedState = k5.baseState = n5);
  return n5;
}
function Ph(a3, b5, c6) {
  var d5 = Ih();
  return Nh(d5, a3, b5, c6);
}
function Qh(a3) {
  var b5 = Hh();
  typeof a3 === "function" && (a3 = a3());
  b5.memoizedState = b5.baseState = a3;
  a3 = b5.queue = {pending: null, dispatch: null, lastRenderedReducer: Jh, lastRenderedState: a3};
  a3 = a3.dispatch = Oh.bind(null, R, a3);
  return [b5.memoizedState, a3];
}
function Rh(a3, b5, c6, d5) {
  a3 = {tag: a3, create: b5, destroy: c6, deps: d5, next: null};
  b5 = R.updateQueue;
  b5 === null ? (b5 = {lastEffect: null}, R.updateQueue = b5, b5.lastEffect = a3.next = a3) : (c6 = b5.lastEffect, c6 === null ? b5.lastEffect = a3.next = a3 : (d5 = c6.next, c6.next = a3, a3.next = d5, b5.lastEffect = a3));
  return a3;
}
function Sh(a3) {
  var b5 = Hh();
  a3 = {current: a3};
  return b5.memoizedState = a3;
}
function Th() {
  return Ih().memoizedState;
}
function Uh(a3, b5, c6, d5) {
  var e5 = Hh();
  R.flags |= a3;
  e5.memoizedState = Rh(1 | b5, c6, void 0, d5 === void 0 ? null : d5);
}
function Vh(a3, b5, c6, d5) {
  var e5 = Ih();
  d5 = d5 === void 0 ? null : d5;
  var f4 = void 0;
  if (S !== null) {
    var g5 = S.memoizedState;
    f4 = g5.destroy;
    if (d5 !== null && Bh(d5, g5.deps)) {
      Rh(b5, c6, f4, d5);
      return;
    }
  }
  R.flags |= a3;
  e5.memoizedState = Rh(1 | b5, c6, f4, d5);
}
function Wh(a3, b5) {
  return Uh(516, 4, a3, b5);
}
function Xh(a3, b5) {
  return Vh(516, 4, a3, b5);
}
function Yh(a3, b5) {
  return Vh(4, 2, a3, b5);
}
function Zh(a3, b5) {
  if (typeof b5 === "function")
    return a3 = a3(), b5(a3), function() {
      b5(null);
    };
  if (b5 !== null && b5 !== void 0)
    return a3 = a3(), b5.current = a3, function() {
      b5.current = null;
    };
}
function $h(a3, b5, c6) {
  c6 = c6 !== null && c6 !== void 0 ? c6.concat([a3]) : null;
  return Vh(4, 2, Zh.bind(null, b5, a3), c6);
}
function ai() {
}
function bi(a3, b5) {
  var c6 = Ih();
  b5 = b5 === void 0 ? null : b5;
  var d5 = c6.memoizedState;
  if (d5 !== null && b5 !== null && Bh(b5, d5[1]))
    return d5[0];
  c6.memoizedState = [a3, b5];
  return a3;
}
function ci(a3, b5) {
  var c6 = Ih();
  b5 = b5 === void 0 ? null : b5;
  var d5 = c6.memoizedState;
  if (d5 !== null && b5 !== null && Bh(b5, d5[1]))
    return d5[0];
  a3 = a3();
  c6.memoizedState = [a3, b5];
  return a3;
}
function di(a3, b5) {
  var c6 = eg();
  gg(98 > c6 ? 98 : c6, function() {
    a3(true);
  });
  gg(97 < c6 ? 97 : c6, function() {
    var c7 = wh.transition;
    wh.transition = 1;
    try {
      a3(false), b5();
    } finally {
      wh.transition = c7;
    }
  });
}
function Oh(a3, b5, c6) {
  var d5 = Hg(), e5 = Ig(a3), f4 = {lane: e5, action: c6, eagerReducer: null, eagerState: null, next: null}, g5 = b5.pending;
  g5 === null ? f4.next = f4 : (f4.next = g5.next, g5.next = f4);
  b5.pending = f4;
  g5 = a3.alternate;
  if (a3 === R || g5 !== null && g5 === R)
    zh = yh = true;
  else {
    if (a3.lanes === 0 && (g5 === null || g5.lanes === 0) && (g5 = b5.lastRenderedReducer, g5 !== null))
      try {
        var h4 = b5.lastRenderedState, k5 = g5(h4, c6);
        f4.eagerReducer = g5;
        f4.eagerState = k5;
        if (He(k5, h4))
          return;
      } catch (l4) {
      } finally {
      }
    Jg(a3, e5, d5);
  }
}
var Gh = {readContext: vg, useCallback: Ah, useContext: Ah, useEffect: Ah, useImperativeHandle: Ah, useLayoutEffect: Ah, useMemo: Ah, useReducer: Ah, useRef: Ah, useState: Ah, useDebugValue: Ah, useDeferredValue: Ah, useTransition: Ah, useMutableSource: Ah, useOpaqueIdentifier: Ah, unstable_isNewReconciler: false};
var Dh = {readContext: vg, useCallback: function(a3, b5) {
  Hh().memoizedState = [a3, b5 === void 0 ? null : b5];
  return a3;
}, useContext: vg, useEffect: Wh, useImperativeHandle: function(a3, b5, c6) {
  c6 = c6 !== null && c6 !== void 0 ? c6.concat([a3]) : null;
  return Uh(4, 2, Zh.bind(null, b5, a3), c6);
}, useLayoutEffect: function(a3, b5) {
  return Uh(4, 2, a3, b5);
}, useMemo: function(a3, b5) {
  var c6 = Hh();
  b5 = b5 === void 0 ? null : b5;
  a3 = a3();
  c6.memoizedState = [a3, b5];
  return a3;
}, useReducer: function(a3, b5, c6) {
  var d5 = Hh();
  b5 = c6 !== void 0 ? c6(b5) : b5;
  d5.memoizedState = d5.baseState = b5;
  a3 = d5.queue = {pending: null, dispatch: null, lastRenderedReducer: a3, lastRenderedState: b5};
  a3 = a3.dispatch = Oh.bind(null, R, a3);
  return [d5.memoizedState, a3];
}, useRef: Sh, useState: Qh, useDebugValue: ai, useDeferredValue: function(a3) {
  var b5 = Qh(a3), c6 = b5[0], d5 = b5[1];
  Wh(function() {
    var b6 = wh.transition;
    wh.transition = 1;
    try {
      d5(a3);
    } finally {
      wh.transition = b6;
    }
  }, [a3]);
  return c6;
}, useTransition: function() {
  var a3 = Qh(false), b5 = a3[0];
  a3 = di.bind(null, a3[1]);
  Sh(a3);
  return [a3, b5];
}, useMutableSource: function(a3, b5, c6) {
  var d5 = Hh();
  d5.memoizedState = {refs: {getSnapshot: b5, setSnapshot: null}, source: a3, subscribe: c6};
  return Nh(d5, a3, b5, c6);
}, useOpaqueIdentifier: function() {
  if (lh) {
    var a3 = false, b5 = uf(function() {
      a3 || (a3 = true, c6("r:" + (tf++).toString(36)));
      throw Error(y(355));
    }), c6 = Qh(b5)[1];
    (R.mode & 2) === 0 && (R.flags |= 516, Rh(5, function() {
      c6("r:" + (tf++).toString(36));
    }, void 0, null));
    return b5;
  }
  b5 = "r:" + (tf++).toString(36);
  Qh(b5);
  return b5;
}, unstable_isNewReconciler: false};
var Eh = {readContext: vg, useCallback: bi, useContext: vg, useEffect: Xh, useImperativeHandle: $h, useLayoutEffect: Yh, useMemo: ci, useReducer: Kh, useRef: Th, useState: function() {
  return Kh(Jh);
}, useDebugValue: ai, useDeferredValue: function(a3) {
  var b5 = Kh(Jh), c6 = b5[0], d5 = b5[1];
  Xh(function() {
    var b6 = wh.transition;
    wh.transition = 1;
    try {
      d5(a3);
    } finally {
      wh.transition = b6;
    }
  }, [a3]);
  return c6;
}, useTransition: function() {
  var a3 = Kh(Jh)[0];
  return [
    Th().current,
    a3
  ];
}, useMutableSource: Ph, useOpaqueIdentifier: function() {
  return Kh(Jh)[0];
}, unstable_isNewReconciler: false};
var Fh = {readContext: vg, useCallback: bi, useContext: vg, useEffect: Xh, useImperativeHandle: $h, useLayoutEffect: Yh, useMemo: ci, useReducer: Lh, useRef: Th, useState: function() {
  return Lh(Jh);
}, useDebugValue: ai, useDeferredValue: function(a3) {
  var b5 = Lh(Jh), c6 = b5[0], d5 = b5[1];
  Xh(function() {
    var b6 = wh.transition;
    wh.transition = 1;
    try {
      d5(a3);
    } finally {
      wh.transition = b6;
    }
  }, [a3]);
  return c6;
}, useTransition: function() {
  var a3 = Lh(Jh)[0];
  return [
    Th().current,
    a3
  ];
}, useMutableSource: Ph, useOpaqueIdentifier: function() {
  return Lh(Jh)[0];
}, unstable_isNewReconciler: false};
var ei = ra.ReactCurrentOwner;
var ug = false;
function fi(a3, b5, c6, d5) {
  b5.child = a3 === null ? Zg(b5, null, c6, d5) : Yg(b5, a3.child, c6, d5);
}
function gi(a3, b5, c6, d5, e5) {
  c6 = c6.render;
  var f4 = b5.ref;
  tg(b5, e5);
  d5 = Ch(a3, b5, c6, d5, f4, e5);
  if (a3 !== null && !ug)
    return b5.updateQueue = a3.updateQueue, b5.flags &= -517, a3.lanes &= ~e5, hi(a3, b5, e5);
  b5.flags |= 1;
  fi(a3, b5, d5, e5);
  return b5.child;
}
function ii(a3, b5, c6, d5, e5, f4) {
  if (a3 === null) {
    var g5 = c6.type;
    if (typeof g5 === "function" && !ji(g5) && g5.defaultProps === void 0 && c6.compare === null && c6.defaultProps === void 0)
      return b5.tag = 15, b5.type = g5, ki(a3, b5, g5, d5, e5, f4);
    a3 = Vg(c6.type, null, d5, b5, b5.mode, f4);
    a3.ref = b5.ref;
    a3.return = b5;
    return b5.child = a3;
  }
  g5 = a3.child;
  if ((e5 & f4) === 0 && (e5 = g5.memoizedProps, c6 = c6.compare, c6 = c6 !== null ? c6 : Je, c6(e5, d5) && a3.ref === b5.ref))
    return hi(a3, b5, f4);
  b5.flags |= 1;
  a3 = Tg(g5, d5);
  a3.ref = b5.ref;
  a3.return = b5;
  return b5.child = a3;
}
function ki(a3, b5, c6, d5, e5, f4) {
  if (a3 !== null && Je(a3.memoizedProps, d5) && a3.ref === b5.ref)
    if (ug = false, (f4 & e5) !== 0)
      (a3.flags & 16384) !== 0 && (ug = true);
    else
      return b5.lanes = a3.lanes, hi(a3, b5, f4);
  return li(a3, b5, c6, d5, f4);
}
function mi(a3, b5, c6) {
  var d5 = b5.pendingProps, e5 = d5.children, f4 = a3 !== null ? a3.memoizedState : null;
  if (d5.mode === "hidden" || d5.mode === "unstable-defer-without-hiding")
    if ((b5.mode & 4) === 0)
      b5.memoizedState = {baseLanes: 0}, ni(b5, c6);
    else if ((c6 & 1073741824) !== 0)
      b5.memoizedState = {baseLanes: 0}, ni(b5, f4 !== null ? f4.baseLanes : c6);
    else
      return a3 = f4 !== null ? f4.baseLanes | c6 : c6, b5.lanes = b5.childLanes = 1073741824, b5.memoizedState = {baseLanes: a3}, ni(b5, a3), null;
  else
    f4 !== null ? (d5 = f4.baseLanes | c6, b5.memoizedState = null) : d5 = c6, ni(b5, d5);
  fi(a3, b5, e5, c6);
  return b5.child;
}
function oi(a3, b5) {
  var c6 = b5.ref;
  if (a3 === null && c6 !== null || a3 !== null && a3.ref !== c6)
    b5.flags |= 128;
}
function li(a3, b5, c6, d5, e5) {
  var f4 = Ff(c6) ? Df : M.current;
  f4 = Ef(b5, f4);
  tg(b5, e5);
  c6 = Ch(a3, b5, c6, d5, f4, e5);
  if (a3 !== null && !ug)
    return b5.updateQueue = a3.updateQueue, b5.flags &= -517, a3.lanes &= ~e5, hi(a3, b5, e5);
  b5.flags |= 1;
  fi(a3, b5, c6, e5);
  return b5.child;
}
function pi(a3, b5, c6, d5, e5) {
  if (Ff(c6)) {
    var f4 = true;
    Jf(b5);
  } else
    f4 = false;
  tg(b5, e5);
  if (b5.stateNode === null)
    a3 !== null && (a3.alternate = null, b5.alternate = null, b5.flags |= 2), Mg(b5, c6, d5), Og(b5, c6, d5, e5), d5 = true;
  else if (a3 === null) {
    var g5 = b5.stateNode, h4 = b5.memoizedProps;
    g5.props = h4;
    var k5 = g5.context, l4 = c6.contextType;
    typeof l4 === "object" && l4 !== null ? l4 = vg(l4) : (l4 = Ff(c6) ? Df : M.current, l4 = Ef(b5, l4));
    var n5 = c6.getDerivedStateFromProps, A5 = typeof n5 === "function" || typeof g5.getSnapshotBeforeUpdate === "function";
    A5 || typeof g5.UNSAFE_componentWillReceiveProps !== "function" && typeof g5.componentWillReceiveProps !== "function" || (h4 !== d5 || k5 !== l4) && Ng(b5, g5, d5, l4);
    wg = false;
    var p5 = b5.memoizedState;
    g5.state = p5;
    Cg(b5, d5, g5, e5);
    k5 = b5.memoizedState;
    h4 !== d5 || p5 !== k5 || N.current || wg ? (typeof n5 === "function" && (Gg(b5, c6, n5, d5), k5 = b5.memoizedState), (h4 = wg || Lg(b5, c6, h4, d5, p5, k5, l4)) ? (A5 || typeof g5.UNSAFE_componentWillMount !== "function" && typeof g5.componentWillMount !== "function" || (typeof g5.componentWillMount === "function" && g5.componentWillMount(), typeof g5.UNSAFE_componentWillMount === "function" && g5.UNSAFE_componentWillMount()), typeof g5.componentDidMount === "function" && (b5.flags |= 4)) : (typeof g5.componentDidMount === "function" && (b5.flags |= 4), b5.memoizedProps = d5, b5.memoizedState = k5), g5.props = d5, g5.state = k5, g5.context = l4, d5 = h4) : (typeof g5.componentDidMount === "function" && (b5.flags |= 4), d5 = false);
  } else {
    g5 = b5.stateNode;
    yg(a3, b5);
    h4 = b5.memoizedProps;
    l4 = b5.type === b5.elementType ? h4 : lg(b5.type, h4);
    g5.props = l4;
    A5 = b5.pendingProps;
    p5 = g5.context;
    k5 = c6.contextType;
    typeof k5 === "object" && k5 !== null ? k5 = vg(k5) : (k5 = Ff(c6) ? Df : M.current, k5 = Ef(b5, k5));
    var C4 = c6.getDerivedStateFromProps;
    (n5 = typeof C4 === "function" || typeof g5.getSnapshotBeforeUpdate === "function") || typeof g5.UNSAFE_componentWillReceiveProps !== "function" && typeof g5.componentWillReceiveProps !== "function" || (h4 !== A5 || p5 !== k5) && Ng(b5, g5, d5, k5);
    wg = false;
    p5 = b5.memoizedState;
    g5.state = p5;
    Cg(b5, d5, g5, e5);
    var x3 = b5.memoizedState;
    h4 !== A5 || p5 !== x3 || N.current || wg ? (typeof C4 === "function" && (Gg(b5, c6, C4, d5), x3 = b5.memoizedState), (l4 = wg || Lg(b5, c6, l4, d5, p5, x3, k5)) ? (n5 || typeof g5.UNSAFE_componentWillUpdate !== "function" && typeof g5.componentWillUpdate !== "function" || (typeof g5.componentWillUpdate === "function" && g5.componentWillUpdate(d5, x3, k5), typeof g5.UNSAFE_componentWillUpdate === "function" && g5.UNSAFE_componentWillUpdate(d5, x3, k5)), typeof g5.componentDidUpdate === "function" && (b5.flags |= 4), typeof g5.getSnapshotBeforeUpdate === "function" && (b5.flags |= 256)) : (typeof g5.componentDidUpdate !== "function" || h4 === a3.memoizedProps && p5 === a3.memoizedState || (b5.flags |= 4), typeof g5.getSnapshotBeforeUpdate !== "function" || h4 === a3.memoizedProps && p5 === a3.memoizedState || (b5.flags |= 256), b5.memoizedProps = d5, b5.memoizedState = x3), g5.props = d5, g5.state = x3, g5.context = k5, d5 = l4) : (typeof g5.componentDidUpdate !== "function" || h4 === a3.memoizedProps && p5 === a3.memoizedState || (b5.flags |= 4), typeof g5.getSnapshotBeforeUpdate !== "function" || h4 === a3.memoizedProps && p5 === a3.memoizedState || (b5.flags |= 256), d5 = false);
  }
  return qi(a3, b5, c6, d5, f4, e5);
}
function qi(a3, b5, c6, d5, e5, f4) {
  oi(a3, b5);
  var g5 = (b5.flags & 64) !== 0;
  if (!d5 && !g5)
    return e5 && Kf(b5, c6, false), hi(a3, b5, f4);
  d5 = b5.stateNode;
  ei.current = b5;
  var h4 = g5 && typeof c6.getDerivedStateFromError !== "function" ? null : d5.render();
  b5.flags |= 1;
  a3 !== null && g5 ? (b5.child = Yg(b5, a3.child, null, f4), b5.child = Yg(b5, null, h4, f4)) : fi(a3, b5, h4, f4);
  b5.memoizedState = d5.state;
  e5 && Kf(b5, c6, true);
  return b5.child;
}
function ri(a3) {
  var b5 = a3.stateNode;
  b5.pendingContext ? Hf(a3, b5.pendingContext, b5.pendingContext !== b5.context) : b5.context && Hf(a3, b5.context, false);
  eh(a3, b5.containerInfo);
}
var si = {dehydrated: null, retryLane: 0};
function ti(a3, b5, c6) {
  var d5 = b5.pendingProps, e5 = P.current, f4 = false, g5;
  (g5 = (b5.flags & 64) !== 0) || (g5 = a3 !== null && a3.memoizedState === null ? false : (e5 & 2) !== 0);
  g5 ? (f4 = true, b5.flags &= -65) : a3 !== null && a3.memoizedState === null || d5.fallback === void 0 || d5.unstable_avoidThisFallback === true || (e5 |= 1);
  I(P, e5 & 1);
  if (a3 === null) {
    d5.fallback !== void 0 && ph(b5);
    a3 = d5.children;
    e5 = d5.fallback;
    if (f4)
      return a3 = ui(b5, a3, e5, c6), b5.child.memoizedState = {baseLanes: c6}, b5.memoizedState = si, a3;
    if (typeof d5.unstable_expectedLoadTime === "number")
      return a3 = ui(b5, a3, e5, c6), b5.child.memoizedState = {baseLanes: c6}, b5.memoizedState = si, b5.lanes = 33554432, a3;
    c6 = vi({mode: "visible", children: a3}, b5.mode, c6, null);
    c6.return = b5;
    return b5.child = c6;
  }
  if (a3.memoizedState !== null) {
    if (f4)
      return d5 = wi(a3, b5, d5.children, d5.fallback, c6), f4 = b5.child, e5 = a3.child.memoizedState, f4.memoizedState = e5 === null ? {baseLanes: c6} : {baseLanes: e5.baseLanes | c6}, f4.childLanes = a3.childLanes & ~c6, b5.memoizedState = si, d5;
    c6 = xi(a3, b5, d5.children, c6);
    b5.memoizedState = null;
    return c6;
  }
  if (f4)
    return d5 = wi(a3, b5, d5.children, d5.fallback, c6), f4 = b5.child, e5 = a3.child.memoizedState, f4.memoizedState = e5 === null ? {baseLanes: c6} : {baseLanes: e5.baseLanes | c6}, f4.childLanes = a3.childLanes & ~c6, b5.memoizedState = si, d5;
  c6 = xi(a3, b5, d5.children, c6);
  b5.memoizedState = null;
  return c6;
}
function ui(a3, b5, c6, d5) {
  var e5 = a3.mode, f4 = a3.child;
  b5 = {mode: "hidden", children: b5};
  (e5 & 2) === 0 && f4 !== null ? (f4.childLanes = 0, f4.pendingProps = b5) : f4 = vi(b5, e5, 0, null);
  c6 = Xg(c6, e5, d5, null);
  f4.return = a3;
  c6.return = a3;
  f4.sibling = c6;
  a3.child = f4;
  return c6;
}
function xi(a3, b5, c6, d5) {
  var e5 = a3.child;
  a3 = e5.sibling;
  c6 = Tg(e5, {mode: "visible", children: c6});
  (b5.mode & 2) === 0 && (c6.lanes = d5);
  c6.return = b5;
  c6.sibling = null;
  a3 !== null && (a3.nextEffect = null, a3.flags = 8, b5.firstEffect = b5.lastEffect = a3);
  return b5.child = c6;
}
function wi(a3, b5, c6, d5, e5) {
  var f4 = b5.mode, g5 = a3.child;
  a3 = g5.sibling;
  var h4 = {mode: "hidden", children: c6};
  (f4 & 2) === 0 && b5.child !== g5 ? (c6 = b5.child, c6.childLanes = 0, c6.pendingProps = h4, g5 = c6.lastEffect, g5 !== null ? (b5.firstEffect = c6.firstEffect, b5.lastEffect = g5, g5.nextEffect = null) : b5.firstEffect = b5.lastEffect = null) : c6 = Tg(g5, h4);
  a3 !== null ? d5 = Tg(a3, d5) : (d5 = Xg(d5, f4, e5, null), d5.flags |= 2);
  d5.return = b5;
  c6.return = b5;
  c6.sibling = d5;
  b5.child = c6;
  return d5;
}
function yi(a3, b5) {
  a3.lanes |= b5;
  var c6 = a3.alternate;
  c6 !== null && (c6.lanes |= b5);
  sg(a3.return, b5);
}
function zi(a3, b5, c6, d5, e5, f4) {
  var g5 = a3.memoizedState;
  g5 === null ? a3.memoizedState = {isBackwards: b5, rendering: null, renderingStartTime: 0, last: d5, tail: c6, tailMode: e5, lastEffect: f4} : (g5.isBackwards = b5, g5.rendering = null, g5.renderingStartTime = 0, g5.last = d5, g5.tail = c6, g5.tailMode = e5, g5.lastEffect = f4);
}
function Ai(a3, b5, c6) {
  var d5 = b5.pendingProps, e5 = d5.revealOrder, f4 = d5.tail;
  fi(a3, b5, d5.children, c6);
  d5 = P.current;
  if ((d5 & 2) !== 0)
    d5 = d5 & 1 | 2, b5.flags |= 64;
  else {
    if (a3 !== null && (a3.flags & 64) !== 0)
      a:
        for (a3 = b5.child; a3 !== null; ) {
          if (a3.tag === 13)
            a3.memoizedState !== null && yi(a3, c6);
          else if (a3.tag === 19)
            yi(a3, c6);
          else if (a3.child !== null) {
            a3.child.return = a3;
            a3 = a3.child;
            continue;
          }
          if (a3 === b5)
            break a;
          for (; a3.sibling === null; ) {
            if (a3.return === null || a3.return === b5)
              break a;
            a3 = a3.return;
          }
          a3.sibling.return = a3.return;
          a3 = a3.sibling;
        }
    d5 &= 1;
  }
  I(P, d5);
  if ((b5.mode & 2) === 0)
    b5.memoizedState = null;
  else
    switch (e5) {
      case "forwards":
        c6 = b5.child;
        for (e5 = null; c6 !== null; )
          a3 = c6.alternate, a3 !== null && ih(a3) === null && (e5 = c6), c6 = c6.sibling;
        c6 = e5;
        c6 === null ? (e5 = b5.child, b5.child = null) : (e5 = c6.sibling, c6.sibling = null);
        zi(b5, false, e5, c6, f4, b5.lastEffect);
        break;
      case "backwards":
        c6 = null;
        e5 = b5.child;
        for (b5.child = null; e5 !== null; ) {
          a3 = e5.alternate;
          if (a3 !== null && ih(a3) === null) {
            b5.child = e5;
            break;
          }
          a3 = e5.sibling;
          e5.sibling = c6;
          c6 = e5;
          e5 = a3;
        }
        zi(b5, true, c6, null, f4, b5.lastEffect);
        break;
      case "together":
        zi(b5, false, null, null, void 0, b5.lastEffect);
        break;
      default:
        b5.memoizedState = null;
    }
  return b5.child;
}
function hi(a3, b5, c6) {
  a3 !== null && (b5.dependencies = a3.dependencies);
  Dg |= b5.lanes;
  if ((c6 & b5.childLanes) !== 0) {
    if (a3 !== null && b5.child !== a3.child)
      throw Error(y(153));
    if (b5.child !== null) {
      a3 = b5.child;
      c6 = Tg(a3, a3.pendingProps);
      b5.child = c6;
      for (c6.return = b5; a3.sibling !== null; )
        a3 = a3.sibling, c6 = c6.sibling = Tg(a3, a3.pendingProps), c6.return = b5;
      c6.sibling = null;
    }
    return b5.child;
  }
  return null;
}
var Bi;
var Ci;
var Di;
var Ei;
Bi = function(a3, b5) {
  for (var c6 = b5.child; c6 !== null; ) {
    if (c6.tag === 5 || c6.tag === 6)
      a3.appendChild(c6.stateNode);
    else if (c6.tag !== 4 && c6.child !== null) {
      c6.child.return = c6;
      c6 = c6.child;
      continue;
    }
    if (c6 === b5)
      break;
    for (; c6.sibling === null; ) {
      if (c6.return === null || c6.return === b5)
        return;
      c6 = c6.return;
    }
    c6.sibling.return = c6.return;
    c6 = c6.sibling;
  }
};
Ci = function() {
};
Di = function(a3, b5, c6, d5) {
  var e5 = a3.memoizedProps;
  if (e5 !== d5) {
    a3 = b5.stateNode;
    dh(ah.current);
    var f4 = null;
    switch (c6) {
      case "input":
        e5 = Ya(a3, e5);
        d5 = Ya(a3, d5);
        f4 = [];
        break;
      case "option":
        e5 = eb(a3, e5);
        d5 = eb(a3, d5);
        f4 = [];
        break;
      case "select":
        e5 = objectAssign({}, e5, {value: void 0});
        d5 = objectAssign({}, d5, {value: void 0});
        f4 = [];
        break;
      case "textarea":
        e5 = gb(a3, e5);
        d5 = gb(a3, d5);
        f4 = [];
        break;
      default:
        typeof e5.onClick !== "function" && typeof d5.onClick === "function" && (a3.onclick = jf);
    }
    vb(c6, d5);
    var g5;
    c6 = null;
    for (l4 in e5)
      if (!d5.hasOwnProperty(l4) && e5.hasOwnProperty(l4) && e5[l4] != null)
        if (l4 === "style") {
          var h4 = e5[l4];
          for (g5 in h4)
            h4.hasOwnProperty(g5) && (c6 || (c6 = {}), c6[g5] = "");
        } else
          l4 !== "dangerouslySetInnerHTML" && l4 !== "children" && l4 !== "suppressContentEditableWarning" && l4 !== "suppressHydrationWarning" && l4 !== "autoFocus" && (ca.hasOwnProperty(l4) ? f4 || (f4 = []) : (f4 = f4 || []).push(l4, null));
    for (l4 in d5) {
      var k5 = d5[l4];
      h4 = e5 != null ? e5[l4] : void 0;
      if (d5.hasOwnProperty(l4) && k5 !== h4 && (k5 != null || h4 != null))
        if (l4 === "style")
          if (h4) {
            for (g5 in h4)
              !h4.hasOwnProperty(g5) || k5 && k5.hasOwnProperty(g5) || (c6 || (c6 = {}), c6[g5] = "");
            for (g5 in k5)
              k5.hasOwnProperty(g5) && h4[g5] !== k5[g5] && (c6 || (c6 = {}), c6[g5] = k5[g5]);
          } else
            c6 || (f4 || (f4 = []), f4.push(l4, c6)), c6 = k5;
        else
          l4 === "dangerouslySetInnerHTML" ? (k5 = k5 ? k5.__html : void 0, h4 = h4 ? h4.__html : void 0, k5 != null && h4 !== k5 && (f4 = f4 || []).push(l4, k5)) : l4 === "children" ? typeof k5 !== "string" && typeof k5 !== "number" || (f4 = f4 || []).push(l4, "" + k5) : l4 !== "suppressContentEditableWarning" && l4 !== "suppressHydrationWarning" && (ca.hasOwnProperty(l4) ? (k5 != null && l4 === "onScroll" && G("scroll", a3), f4 || h4 === k5 || (f4 = [])) : typeof k5 === "object" && k5 !== null && k5.$$typeof === Ga ? k5.toString() : (f4 = f4 || []).push(l4, k5));
    }
    c6 && (f4 = f4 || []).push("style", c6);
    var l4 = f4;
    if (b5.updateQueue = l4)
      b5.flags |= 4;
  }
};
Ei = function(a3, b5, c6, d5) {
  c6 !== d5 && (b5.flags |= 4);
};
function Fi(a3, b5) {
  if (!lh)
    switch (a3.tailMode) {
      case "hidden":
        b5 = a3.tail;
        for (var c6 = null; b5 !== null; )
          b5.alternate !== null && (c6 = b5), b5 = b5.sibling;
        c6 === null ? a3.tail = null : c6.sibling = null;
        break;
      case "collapsed":
        c6 = a3.tail;
        for (var d5 = null; c6 !== null; )
          c6.alternate !== null && (d5 = c6), c6 = c6.sibling;
        d5 === null ? b5 || a3.tail === null ? a3.tail = null : a3.tail.sibling = null : d5.sibling = null;
    }
}
function Gi(a3, b5, c6) {
  var d5 = b5.pendingProps;
  switch (b5.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return null;
    case 1:
      return Ff(b5.type) && Gf(), null;
    case 3:
      fh();
      H(N);
      H(M);
      uh();
      d5 = b5.stateNode;
      d5.pendingContext && (d5.context = d5.pendingContext, d5.pendingContext = null);
      if (a3 === null || a3.child === null)
        rh(b5) ? b5.flags |= 4 : d5.hydrate || (b5.flags |= 256);
      Ci(b5);
      return null;
    case 5:
      hh(b5);
      var e5 = dh(ch.current);
      c6 = b5.type;
      if (a3 !== null && b5.stateNode != null)
        Di(a3, b5, c6, d5, e5), a3.ref !== b5.ref && (b5.flags |= 128);
      else {
        if (!d5) {
          if (b5.stateNode === null)
            throw Error(y(166));
          return null;
        }
        a3 = dh(ah.current);
        if (rh(b5)) {
          d5 = b5.stateNode;
          c6 = b5.type;
          var f4 = b5.memoizedProps;
          d5[wf] = b5;
          d5[xf] = f4;
          switch (c6) {
            case "dialog":
              G("cancel", d5);
              G("close", d5);
              break;
            case "iframe":
            case "object":
            case "embed":
              G("load", d5);
              break;
            case "video":
            case "audio":
              for (a3 = 0; a3 < Xe.length; a3++)
                G(Xe[a3], d5);
              break;
            case "source":
              G("error", d5);
              break;
            case "img":
            case "image":
            case "link":
              G("error", d5);
              G("load", d5);
              break;
            case "details":
              G("toggle", d5);
              break;
            case "input":
              Za(d5, f4);
              G("invalid", d5);
              break;
            case "select":
              d5._wrapperState = {wasMultiple: !!f4.multiple};
              G("invalid", d5);
              break;
            case "textarea":
              hb(d5, f4), G("invalid", d5);
          }
          vb(c6, f4);
          a3 = null;
          for (var g5 in f4)
            f4.hasOwnProperty(g5) && (e5 = f4[g5], g5 === "children" ? typeof e5 === "string" ? d5.textContent !== e5 && (a3 = ["children", e5]) : typeof e5 === "number" && d5.textContent !== "" + e5 && (a3 = ["children", "" + e5]) : ca.hasOwnProperty(g5) && e5 != null && g5 === "onScroll" && G("scroll", d5));
          switch (c6) {
            case "input":
              Va(d5);
              cb(d5, f4, true);
              break;
            case "textarea":
              Va(d5);
              jb(d5);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof f4.onClick === "function" && (d5.onclick = jf);
          }
          d5 = a3;
          b5.updateQueue = d5;
          d5 !== null && (b5.flags |= 4);
        } else {
          g5 = e5.nodeType === 9 ? e5 : e5.ownerDocument;
          a3 === kb.html && (a3 = lb(c6));
          a3 === kb.html ? c6 === "script" ? (a3 = g5.createElement("div"), a3.innerHTML = "<script></script>", a3 = a3.removeChild(a3.firstChild)) : typeof d5.is === "string" ? a3 = g5.createElement(c6, {is: d5.is}) : (a3 = g5.createElement(c6), c6 === "select" && (g5 = a3, d5.multiple ? g5.multiple = true : d5.size && (g5.size = d5.size))) : a3 = g5.createElementNS(a3, c6);
          a3[wf] = b5;
          a3[xf] = d5;
          Bi(a3, b5, false, false);
          b5.stateNode = a3;
          g5 = wb(c6, d5);
          switch (c6) {
            case "dialog":
              G("cancel", a3);
              G("close", a3);
              e5 = d5;
              break;
            case "iframe":
            case "object":
            case "embed":
              G("load", a3);
              e5 = d5;
              break;
            case "video":
            case "audio":
              for (e5 = 0; e5 < Xe.length; e5++)
                G(Xe[e5], a3);
              e5 = d5;
              break;
            case "source":
              G("error", a3);
              e5 = d5;
              break;
            case "img":
            case "image":
            case "link":
              G("error", a3);
              G("load", a3);
              e5 = d5;
              break;
            case "details":
              G("toggle", a3);
              e5 = d5;
              break;
            case "input":
              Za(a3, d5);
              e5 = Ya(a3, d5);
              G("invalid", a3);
              break;
            case "option":
              e5 = eb(a3, d5);
              break;
            case "select":
              a3._wrapperState = {wasMultiple: !!d5.multiple};
              e5 = objectAssign({}, d5, {value: void 0});
              G("invalid", a3);
              break;
            case "textarea":
              hb(a3, d5);
              e5 = gb(a3, d5);
              G("invalid", a3);
              break;
            default:
              e5 = d5;
          }
          vb(c6, e5);
          var h4 = e5;
          for (f4 in h4)
            if (h4.hasOwnProperty(f4)) {
              var k5 = h4[f4];
              f4 === "style" ? tb(a3, k5) : f4 === "dangerouslySetInnerHTML" ? (k5 = k5 ? k5.__html : void 0, k5 != null && ob(a3, k5)) : f4 === "children" ? typeof k5 === "string" ? (c6 !== "textarea" || k5 !== "") && pb(a3, k5) : typeof k5 === "number" && pb(a3, "" + k5) : f4 !== "suppressContentEditableWarning" && f4 !== "suppressHydrationWarning" && f4 !== "autoFocus" && (ca.hasOwnProperty(f4) ? k5 != null && f4 === "onScroll" && G("scroll", a3) : k5 != null && qa(a3, f4, k5, g5));
            }
          switch (c6) {
            case "input":
              Va(a3);
              cb(a3, d5, false);
              break;
            case "textarea":
              Va(a3);
              jb(a3);
              break;
            case "option":
              d5.value != null && a3.setAttribute("value", "" + Sa(d5.value));
              break;
            case "select":
              a3.multiple = !!d5.multiple;
              f4 = d5.value;
              f4 != null ? fb(a3, !!d5.multiple, f4, false) : d5.defaultValue != null && fb(a3, !!d5.multiple, d5.defaultValue, true);
              break;
            default:
              typeof e5.onClick === "function" && (a3.onclick = jf);
          }
          mf(c6, d5) && (b5.flags |= 4);
        }
        b5.ref !== null && (b5.flags |= 128);
      }
      return null;
    case 6:
      if (a3 && b5.stateNode != null)
        Ei(a3, b5, a3.memoizedProps, d5);
      else {
        if (typeof d5 !== "string" && b5.stateNode === null)
          throw Error(y(166));
        c6 = dh(ch.current);
        dh(ah.current);
        rh(b5) ? (d5 = b5.stateNode, c6 = b5.memoizedProps, d5[wf] = b5, d5.nodeValue !== c6 && (b5.flags |= 4)) : (d5 = (c6.nodeType === 9 ? c6 : c6.ownerDocument).createTextNode(d5), d5[wf] = b5, b5.stateNode = d5);
      }
      return null;
    case 13:
      H(P);
      d5 = b5.memoizedState;
      if ((b5.flags & 64) !== 0)
        return b5.lanes = c6, b5;
      d5 = d5 !== null;
      c6 = false;
      a3 === null ? b5.memoizedProps.fallback !== void 0 && rh(b5) : c6 = a3.memoizedState !== null;
      if (d5 && !c6 && (b5.mode & 2) !== 0)
        if (a3 === null && b5.memoizedProps.unstable_avoidThisFallback !== true || (P.current & 1) !== 0)
          V === 0 && (V = 3);
        else {
          if (V === 0 || V === 3)
            V = 4;
          U === null || (Dg & 134217727) === 0 && (Hi & 134217727) === 0 || Ii(U, W);
        }
      if (d5 || c6)
        b5.flags |= 4;
      return null;
    case 4:
      return fh(), Ci(b5), a3 === null && cf(b5.stateNode.containerInfo), null;
    case 10:
      return rg(b5), null;
    case 17:
      return Ff(b5.type) && Gf(), null;
    case 19:
      H(P);
      d5 = b5.memoizedState;
      if (d5 === null)
        return null;
      f4 = (b5.flags & 64) !== 0;
      g5 = d5.rendering;
      if (g5 === null)
        if (f4)
          Fi(d5, false);
        else {
          if (V !== 0 || a3 !== null && (a3.flags & 64) !== 0)
            for (a3 = b5.child; a3 !== null; ) {
              g5 = ih(a3);
              if (g5 !== null) {
                b5.flags |= 64;
                Fi(d5, false);
                f4 = g5.updateQueue;
                f4 !== null && (b5.updateQueue = f4, b5.flags |= 4);
                d5.lastEffect === null && (b5.firstEffect = null);
                b5.lastEffect = d5.lastEffect;
                d5 = c6;
                for (c6 = b5.child; c6 !== null; )
                  f4 = c6, a3 = d5, f4.flags &= 2, f4.nextEffect = null, f4.firstEffect = null, f4.lastEffect = null, g5 = f4.alternate, g5 === null ? (f4.childLanes = 0, f4.lanes = a3, f4.child = null, f4.memoizedProps = null, f4.memoizedState = null, f4.updateQueue = null, f4.dependencies = null, f4.stateNode = null) : (f4.childLanes = g5.childLanes, f4.lanes = g5.lanes, f4.child = g5.child, f4.memoizedProps = g5.memoizedProps, f4.memoizedState = g5.memoizedState, f4.updateQueue = g5.updateQueue, f4.type = g5.type, a3 = g5.dependencies, f4.dependencies = a3 === null ? null : {lanes: a3.lanes, firstContext: a3.firstContext}), c6 = c6.sibling;
                I(P, P.current & 1 | 2);
                return b5.child;
              }
              a3 = a3.sibling;
            }
          d5.tail !== null && O() > Ji && (b5.flags |= 64, f4 = true, Fi(d5, false), b5.lanes = 33554432);
        }
      else {
        if (!f4)
          if (a3 = ih(g5), a3 !== null) {
            if (b5.flags |= 64, f4 = true, c6 = a3.updateQueue, c6 !== null && (b5.updateQueue = c6, b5.flags |= 4), Fi(d5, true), d5.tail === null && d5.tailMode === "hidden" && !g5.alternate && !lh)
              return b5 = b5.lastEffect = d5.lastEffect, b5 !== null && (b5.nextEffect = null), null;
          } else
            2 * O() - d5.renderingStartTime > Ji && c6 !== 1073741824 && (b5.flags |= 64, f4 = true, Fi(d5, false), b5.lanes = 33554432);
        d5.isBackwards ? (g5.sibling = b5.child, b5.child = g5) : (c6 = d5.last, c6 !== null ? c6.sibling = g5 : b5.child = g5, d5.last = g5);
      }
      return d5.tail !== null ? (c6 = d5.tail, d5.rendering = c6, d5.tail = c6.sibling, d5.lastEffect = b5.lastEffect, d5.renderingStartTime = O(), c6.sibling = null, b5 = P.current, I(P, f4 ? b5 & 1 | 2 : b5 & 1), c6) : null;
    case 23:
    case 24:
      return Ki(), a3 !== null && a3.memoizedState !== null !== (b5.memoizedState !== null) && d5.mode !== "unstable-defer-without-hiding" && (b5.flags |= 4), null;
  }
  throw Error(y(156, b5.tag));
}
function Li(a3) {
  switch (a3.tag) {
    case 1:
      Ff(a3.type) && Gf();
      var b5 = a3.flags;
      return b5 & 4096 ? (a3.flags = b5 & -4097 | 64, a3) : null;
    case 3:
      fh();
      H(N);
      H(M);
      uh();
      b5 = a3.flags;
      if ((b5 & 64) !== 0)
        throw Error(y(285));
      a3.flags = b5 & -4097 | 64;
      return a3;
    case 5:
      return hh(a3), null;
    case 13:
      return H(P), b5 = a3.flags, b5 & 4096 ? (a3.flags = b5 & -4097 | 64, a3) : null;
    case 19:
      return H(P), null;
    case 4:
      return fh(), null;
    case 10:
      return rg(a3), null;
    case 23:
    case 24:
      return Ki(), null;
    default:
      return null;
  }
}
function Mi(a3, b5) {
  try {
    var c6 = "", d5 = b5;
    do
      c6 += Qa(d5), d5 = d5.return;
    while (d5);
    var e5 = c6;
  } catch (f4) {
    e5 = "\nError generating stack: " + f4.message + "\n" + f4.stack;
  }
  return {value: a3, source: b5, stack: e5};
}
function Ni(a3, b5) {
  try {
    console.error(b5.value);
  } catch (c6) {
    setTimeout(function() {
      throw c6;
    });
  }
}
var Oi = typeof WeakMap === "function" ? WeakMap : Map;
function Pi(a3, b5, c6) {
  c6 = zg(-1, c6);
  c6.tag = 3;
  c6.payload = {element: null};
  var d5 = b5.value;
  c6.callback = function() {
    Qi || (Qi = true, Ri = d5);
    Ni(a3, b5);
  };
  return c6;
}
function Si(a3, b5, c6) {
  c6 = zg(-1, c6);
  c6.tag = 3;
  var d5 = a3.type.getDerivedStateFromError;
  if (typeof d5 === "function") {
    var e5 = b5.value;
    c6.payload = function() {
      Ni(a3, b5);
      return d5(e5);
    };
  }
  var f4 = a3.stateNode;
  f4 !== null && typeof f4.componentDidCatch === "function" && (c6.callback = function() {
    typeof d5 !== "function" && (Ti === null ? Ti = new Set([this]) : Ti.add(this), Ni(a3, b5));
    var c7 = b5.stack;
    this.componentDidCatch(b5.value, {componentStack: c7 !== null ? c7 : ""});
  });
  return c6;
}
var Ui = typeof WeakSet === "function" ? WeakSet : Set;
function Vi(a3) {
  var b5 = a3.ref;
  if (b5 !== null)
    if (typeof b5 === "function")
      try {
        b5(null);
      } catch (c6) {
        Wi(a3, c6);
      }
    else
      b5.current = null;
}
function Xi(a3, b5) {
  switch (b5.tag) {
    case 0:
    case 11:
    case 15:
    case 22:
      return;
    case 1:
      if (b5.flags & 256 && a3 !== null) {
        var c6 = a3.memoizedProps, d5 = a3.memoizedState;
        a3 = b5.stateNode;
        b5 = a3.getSnapshotBeforeUpdate(b5.elementType === b5.type ? c6 : lg(b5.type, c6), d5);
        a3.__reactInternalSnapshotBeforeUpdate = b5;
      }
      return;
    case 3:
      b5.flags & 256 && qf(b5.stateNode.containerInfo);
      return;
    case 5:
    case 6:
    case 4:
    case 17:
      return;
  }
  throw Error(y(163));
}
function Yi(a3, b5, c6) {
  switch (c6.tag) {
    case 0:
    case 11:
    case 15:
    case 22:
      b5 = c6.updateQueue;
      b5 = b5 !== null ? b5.lastEffect : null;
      if (b5 !== null) {
        a3 = b5 = b5.next;
        do {
          if ((a3.tag & 3) === 3) {
            var d5 = a3.create;
            a3.destroy = d5();
          }
          a3 = a3.next;
        } while (a3 !== b5);
      }
      b5 = c6.updateQueue;
      b5 = b5 !== null ? b5.lastEffect : null;
      if (b5 !== null) {
        a3 = b5 = b5.next;
        do {
          var e5 = a3;
          d5 = e5.next;
          e5 = e5.tag;
          (e5 & 4) !== 0 && (e5 & 1) !== 0 && (Zi(c6, a3), $i(c6, a3));
          a3 = d5;
        } while (a3 !== b5);
      }
      return;
    case 1:
      a3 = c6.stateNode;
      c6.flags & 4 && (b5 === null ? a3.componentDidMount() : (d5 = c6.elementType === c6.type ? b5.memoizedProps : lg(c6.type, b5.memoizedProps), a3.componentDidUpdate(d5, b5.memoizedState, a3.__reactInternalSnapshotBeforeUpdate)));
      b5 = c6.updateQueue;
      b5 !== null && Eg(c6, b5, a3);
      return;
    case 3:
      b5 = c6.updateQueue;
      if (b5 !== null) {
        a3 = null;
        if (c6.child !== null)
          switch (c6.child.tag) {
            case 5:
              a3 = c6.child.stateNode;
              break;
            case 1:
              a3 = c6.child.stateNode;
          }
        Eg(c6, b5, a3);
      }
      return;
    case 5:
      a3 = c6.stateNode;
      b5 === null && c6.flags & 4 && mf(c6.type, c6.memoizedProps) && a3.focus();
      return;
    case 6:
      return;
    case 4:
      return;
    case 12:
      return;
    case 13:
      c6.memoizedState === null && (c6 = c6.alternate, c6 !== null && (c6 = c6.memoizedState, c6 !== null && (c6 = c6.dehydrated, c6 !== null && Cc(c6))));
      return;
    case 19:
    case 17:
    case 20:
    case 21:
    case 23:
    case 24:
      return;
  }
  throw Error(y(163));
}
function aj(a3, b5) {
  for (var c6 = a3; ; ) {
    if (c6.tag === 5) {
      var d5 = c6.stateNode;
      if (b5)
        d5 = d5.style, typeof d5.setProperty === "function" ? d5.setProperty("display", "none", "important") : d5.display = "none";
      else {
        d5 = c6.stateNode;
        var e5 = c6.memoizedProps.style;
        e5 = e5 !== void 0 && e5 !== null && e5.hasOwnProperty("display") ? e5.display : null;
        d5.style.display = sb("display", e5);
      }
    } else if (c6.tag === 6)
      c6.stateNode.nodeValue = b5 ? "" : c6.memoizedProps;
    else if ((c6.tag !== 23 && c6.tag !== 24 || c6.memoizedState === null || c6 === a3) && c6.child !== null) {
      c6.child.return = c6;
      c6 = c6.child;
      continue;
    }
    if (c6 === a3)
      break;
    for (; c6.sibling === null; ) {
      if (c6.return === null || c6.return === a3)
        return;
      c6 = c6.return;
    }
    c6.sibling.return = c6.return;
    c6 = c6.sibling;
  }
}
function bj(a3, b5) {
  if (Mf && typeof Mf.onCommitFiberUnmount === "function")
    try {
      Mf.onCommitFiberUnmount(Lf, b5);
    } catch (f4) {
    }
  switch (b5.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
    case 22:
      a3 = b5.updateQueue;
      if (a3 !== null && (a3 = a3.lastEffect, a3 !== null)) {
        var c6 = a3 = a3.next;
        do {
          var d5 = c6, e5 = d5.destroy;
          d5 = d5.tag;
          if (e5 !== void 0)
            if ((d5 & 4) !== 0)
              Zi(b5, c6);
            else {
              d5 = b5;
              try {
                e5();
              } catch (f4) {
                Wi(d5, f4);
              }
            }
          c6 = c6.next;
        } while (c6 !== a3);
      }
      break;
    case 1:
      Vi(b5);
      a3 = b5.stateNode;
      if (typeof a3.componentWillUnmount === "function")
        try {
          a3.props = b5.memoizedProps, a3.state = b5.memoizedState, a3.componentWillUnmount();
        } catch (f4) {
          Wi(b5, f4);
        }
      break;
    case 5:
      Vi(b5);
      break;
    case 4:
      cj(a3, b5);
  }
}
function dj(a3) {
  a3.alternate = null;
  a3.child = null;
  a3.dependencies = null;
  a3.firstEffect = null;
  a3.lastEffect = null;
  a3.memoizedProps = null;
  a3.memoizedState = null;
  a3.pendingProps = null;
  a3.return = null;
  a3.updateQueue = null;
}
function ej(a3) {
  return a3.tag === 5 || a3.tag === 3 || a3.tag === 4;
}
function fj(a3) {
  a: {
    for (var b5 = a3.return; b5 !== null; ) {
      if (ej(b5))
        break a;
      b5 = b5.return;
    }
    throw Error(y(160));
  }
  var c6 = b5;
  b5 = c6.stateNode;
  switch (c6.tag) {
    case 5:
      var d5 = false;
      break;
    case 3:
      b5 = b5.containerInfo;
      d5 = true;
      break;
    case 4:
      b5 = b5.containerInfo;
      d5 = true;
      break;
    default:
      throw Error(y(161));
  }
  c6.flags & 16 && (pb(b5, ""), c6.flags &= -17);
  a:
    b:
      for (c6 = a3; ; ) {
        for (; c6.sibling === null; ) {
          if (c6.return === null || ej(c6.return)) {
            c6 = null;
            break a;
          }
          c6 = c6.return;
        }
        c6.sibling.return = c6.return;
        for (c6 = c6.sibling; c6.tag !== 5 && c6.tag !== 6 && c6.tag !== 18; ) {
          if (c6.flags & 2)
            continue b;
          if (c6.child === null || c6.tag === 4)
            continue b;
          else
            c6.child.return = c6, c6 = c6.child;
        }
        if (!(c6.flags & 2)) {
          c6 = c6.stateNode;
          break a;
        }
      }
  d5 ? gj(a3, c6, b5) : hj(a3, c6, b5);
}
function gj(a3, b5, c6) {
  var d5 = a3.tag, e5 = d5 === 5 || d5 === 6;
  if (e5)
    a3 = e5 ? a3.stateNode : a3.stateNode.instance, b5 ? c6.nodeType === 8 ? c6.parentNode.insertBefore(a3, b5) : c6.insertBefore(a3, b5) : (c6.nodeType === 8 ? (b5 = c6.parentNode, b5.insertBefore(a3, c6)) : (b5 = c6, b5.appendChild(a3)), c6 = c6._reactRootContainer, c6 !== null && c6 !== void 0 || b5.onclick !== null || (b5.onclick = jf));
  else if (d5 !== 4 && (a3 = a3.child, a3 !== null))
    for (gj(a3, b5, c6), a3 = a3.sibling; a3 !== null; )
      gj(a3, b5, c6), a3 = a3.sibling;
}
function hj(a3, b5, c6) {
  var d5 = a3.tag, e5 = d5 === 5 || d5 === 6;
  if (e5)
    a3 = e5 ? a3.stateNode : a3.stateNode.instance, b5 ? c6.insertBefore(a3, b5) : c6.appendChild(a3);
  else if (d5 !== 4 && (a3 = a3.child, a3 !== null))
    for (hj(a3, b5, c6), a3 = a3.sibling; a3 !== null; )
      hj(a3, b5, c6), a3 = a3.sibling;
}
function cj(a3, b5) {
  for (var c6 = b5, d5 = false, e5, f4; ; ) {
    if (!d5) {
      d5 = c6.return;
      a:
        for (; ; ) {
          if (d5 === null)
            throw Error(y(160));
          e5 = d5.stateNode;
          switch (d5.tag) {
            case 5:
              f4 = false;
              break a;
            case 3:
              e5 = e5.containerInfo;
              f4 = true;
              break a;
            case 4:
              e5 = e5.containerInfo;
              f4 = true;
              break a;
          }
          d5 = d5.return;
        }
      d5 = true;
    }
    if (c6.tag === 5 || c6.tag === 6) {
      a:
        for (var g5 = a3, h4 = c6, k5 = h4; ; )
          if (bj(g5, k5), k5.child !== null && k5.tag !== 4)
            k5.child.return = k5, k5 = k5.child;
          else {
            if (k5 === h4)
              break a;
            for (; k5.sibling === null; ) {
              if (k5.return === null || k5.return === h4)
                break a;
              k5 = k5.return;
            }
            k5.sibling.return = k5.return;
            k5 = k5.sibling;
          }
      f4 ? (g5 = e5, h4 = c6.stateNode, g5.nodeType === 8 ? g5.parentNode.removeChild(h4) : g5.removeChild(h4)) : e5.removeChild(c6.stateNode);
    } else if (c6.tag === 4) {
      if (c6.child !== null) {
        e5 = c6.stateNode.containerInfo;
        f4 = true;
        c6.child.return = c6;
        c6 = c6.child;
        continue;
      }
    } else if (bj(a3, c6), c6.child !== null) {
      c6.child.return = c6;
      c6 = c6.child;
      continue;
    }
    if (c6 === b5)
      break;
    for (; c6.sibling === null; ) {
      if (c6.return === null || c6.return === b5)
        return;
      c6 = c6.return;
      c6.tag === 4 && (d5 = false);
    }
    c6.sibling.return = c6.return;
    c6 = c6.sibling;
  }
}
function ij(a3, b5) {
  switch (b5.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
    case 22:
      var c6 = b5.updateQueue;
      c6 = c6 !== null ? c6.lastEffect : null;
      if (c6 !== null) {
        var d5 = c6 = c6.next;
        do
          (d5.tag & 3) === 3 && (a3 = d5.destroy, d5.destroy = void 0, a3 !== void 0 && a3()), d5 = d5.next;
        while (d5 !== c6);
      }
      return;
    case 1:
      return;
    case 5:
      c6 = b5.stateNode;
      if (c6 != null) {
        d5 = b5.memoizedProps;
        var e5 = a3 !== null ? a3.memoizedProps : d5;
        a3 = b5.type;
        var f4 = b5.updateQueue;
        b5.updateQueue = null;
        if (f4 !== null) {
          c6[xf] = d5;
          a3 === "input" && d5.type === "radio" && d5.name != null && $a(c6, d5);
          wb(a3, e5);
          b5 = wb(a3, d5);
          for (e5 = 0; e5 < f4.length; e5 += 2) {
            var g5 = f4[e5], h4 = f4[e5 + 1];
            g5 === "style" ? tb(c6, h4) : g5 === "dangerouslySetInnerHTML" ? ob(c6, h4) : g5 === "children" ? pb(c6, h4) : qa(c6, g5, h4, b5);
          }
          switch (a3) {
            case "input":
              ab(c6, d5);
              break;
            case "textarea":
              ib(c6, d5);
              break;
            case "select":
              a3 = c6._wrapperState.wasMultiple, c6._wrapperState.wasMultiple = !!d5.multiple, f4 = d5.value, f4 != null ? fb(c6, !!d5.multiple, f4, false) : a3 !== !!d5.multiple && (d5.defaultValue != null ? fb(c6, !!d5.multiple, d5.defaultValue, true) : fb(c6, !!d5.multiple, d5.multiple ? [] : "", false));
          }
        }
      }
      return;
    case 6:
      if (b5.stateNode === null)
        throw Error(y(162));
      b5.stateNode.nodeValue = b5.memoizedProps;
      return;
    case 3:
      c6 = b5.stateNode;
      c6.hydrate && (c6.hydrate = false, Cc(c6.containerInfo));
      return;
    case 12:
      return;
    case 13:
      b5.memoizedState !== null && (jj = O(), aj(b5.child, true));
      kj(b5);
      return;
    case 19:
      kj(b5);
      return;
    case 17:
      return;
    case 23:
    case 24:
      aj(b5, b5.memoizedState !== null);
      return;
  }
  throw Error(y(163));
}
function kj(a3) {
  var b5 = a3.updateQueue;
  if (b5 !== null) {
    a3.updateQueue = null;
    var c6 = a3.stateNode;
    c6 === null && (c6 = a3.stateNode = new Ui());
    b5.forEach(function(b6) {
      var d5 = lj.bind(null, a3, b6);
      c6.has(b6) || (c6.add(b6), b6.then(d5, d5));
    });
  }
}
function mj(a3, b5) {
  return a3 !== null && (a3 = a3.memoizedState, a3 === null || a3.dehydrated !== null) ? (b5 = b5.memoizedState, b5 !== null && b5.dehydrated === null) : false;
}
var nj = Math.ceil;
var oj = ra.ReactCurrentDispatcher;
var pj = ra.ReactCurrentOwner;
var X = 0;
var U = null;
var Y = null;
var W = 0;
var qj = 0;
var rj = Bf(0);
var V = 0;
var sj = null;
var tj = 0;
var Dg = 0;
var Hi = 0;
var uj = 0;
var vj = null;
var jj = 0;
var Ji = Infinity;
function wj() {
  Ji = O() + 500;
}
var Z = null;
var Qi = false;
var Ri = null;
var Ti = null;
var xj = false;
var yj = null;
var zj = 90;
var Aj = [];
var Bj = [];
var Cj = null;
var Dj = 0;
var Ej = null;
var Fj = -1;
var Gj = 0;
var Hj = 0;
var Ij = null;
var Jj = false;
function Hg() {
  return (X & 48) !== 0 ? O() : Fj !== -1 ? Fj : Fj = O();
}
function Ig(a3) {
  a3 = a3.mode;
  if ((a3 & 2) === 0)
    return 1;
  if ((a3 & 4) === 0)
    return eg() === 99 ? 1 : 2;
  Gj === 0 && (Gj = tj);
  if (kg.transition !== 0) {
    Hj !== 0 && (Hj = vj !== null ? vj.pendingLanes : 0);
    a3 = Gj;
    var b5 = 4186112 & ~Hj;
    b5 &= -b5;
    b5 === 0 && (a3 = 4186112 & ~a3, b5 = a3 & -a3, b5 === 0 && (b5 = 8192));
    return b5;
  }
  a3 = eg();
  (X & 4) !== 0 && a3 === 98 ? a3 = Xc(12, Gj) : (a3 = Sc(a3), a3 = Xc(a3, Gj));
  return a3;
}
function Jg(a3, b5, c6) {
  if (50 < Dj)
    throw Dj = 0, Ej = null, Error(y(185));
  a3 = Kj(a3, b5);
  if (a3 === null)
    return null;
  $c(a3, b5, c6);
  a3 === U && (Hi |= b5, V === 4 && Ii(a3, W));
  var d5 = eg();
  b5 === 1 ? (X & 8) !== 0 && (X & 48) === 0 ? Lj(a3) : (Mj(a3, c6), X === 0 && (wj(), ig())) : ((X & 4) === 0 || d5 !== 98 && d5 !== 99 || (Cj === null ? Cj = new Set([a3]) : Cj.add(a3)), Mj(a3, c6));
  vj = a3;
}
function Kj(a3, b5) {
  a3.lanes |= b5;
  var c6 = a3.alternate;
  c6 !== null && (c6.lanes |= b5);
  c6 = a3;
  for (a3 = a3.return; a3 !== null; )
    a3.childLanes |= b5, c6 = a3.alternate, c6 !== null && (c6.childLanes |= b5), c6 = a3, a3 = a3.return;
  return c6.tag === 3 ? c6.stateNode : null;
}
function Mj(a3, b5) {
  for (var c6 = a3.callbackNode, d5 = a3.suspendedLanes, e5 = a3.pingedLanes, f4 = a3.expirationTimes, g5 = a3.pendingLanes; 0 < g5; ) {
    var h4 = 31 - Vc(g5), k5 = 1 << h4, l4 = f4[h4];
    if (l4 === -1) {
      if ((k5 & d5) === 0 || (k5 & e5) !== 0) {
        l4 = b5;
        Rc(k5);
        var n5 = F;
        f4[h4] = 10 <= n5 ? l4 + 250 : 6 <= n5 ? l4 + 5e3 : -1;
      }
    } else
      l4 <= b5 && (a3.expiredLanes |= k5);
    g5 &= ~k5;
  }
  d5 = Uc(a3, a3 === U ? W : 0);
  b5 = F;
  if (d5 === 0)
    c6 !== null && (c6 !== Zf && Pf(c6), a3.callbackNode = null, a3.callbackPriority = 0);
  else {
    if (c6 !== null) {
      if (a3.callbackPriority === b5)
        return;
      c6 !== Zf && Pf(c6);
    }
    b5 === 15 ? (c6 = Lj.bind(null, a3), ag === null ? (ag = [c6], bg = Of(Uf, jg)) : ag.push(c6), c6 = Zf) : b5 === 14 ? c6 = hg(99, Lj.bind(null, a3)) : (c6 = Tc(b5), c6 = hg(c6, Nj.bind(null, a3)));
    a3.callbackPriority = b5;
    a3.callbackNode = c6;
  }
}
function Nj(a3) {
  Fj = -1;
  Hj = Gj = 0;
  if ((X & 48) !== 0)
    throw Error(y(327));
  var b5 = a3.callbackNode;
  if (Oj() && a3.callbackNode !== b5)
    return null;
  var c6 = Uc(a3, a3 === U ? W : 0);
  if (c6 === 0)
    return null;
  var d5 = c6;
  var e5 = X;
  X |= 16;
  var f4 = Pj();
  if (U !== a3 || W !== d5)
    wj(), Qj(a3, d5);
  do
    try {
      Rj();
      break;
    } catch (h4) {
      Sj(a3, h4);
    }
  while (1);
  qg();
  oj.current = f4;
  X = e5;
  Y !== null ? d5 = 0 : (U = null, W = 0, d5 = V);
  if ((tj & Hi) !== 0)
    Qj(a3, 0);
  else if (d5 !== 0) {
    d5 === 2 && (X |= 64, a3.hydrate && (a3.hydrate = false, qf(a3.containerInfo)), c6 = Wc(a3), c6 !== 0 && (d5 = Tj(a3, c6)));
    if (d5 === 1)
      throw b5 = sj, Qj(a3, 0), Ii(a3, c6), Mj(a3, O()), b5;
    a3.finishedWork = a3.current.alternate;
    a3.finishedLanes = c6;
    switch (d5) {
      case 0:
      case 1:
        throw Error(y(345));
      case 2:
        Uj(a3);
        break;
      case 3:
        Ii(a3, c6);
        if ((c6 & 62914560) === c6 && (d5 = jj + 500 - O(), 10 < d5)) {
          if (Uc(a3, 0) !== 0)
            break;
          e5 = a3.suspendedLanes;
          if ((e5 & c6) !== c6) {
            Hg();
            a3.pingedLanes |= a3.suspendedLanes & e5;
            break;
          }
          a3.timeoutHandle = of(Uj.bind(null, a3), d5);
          break;
        }
        Uj(a3);
        break;
      case 4:
        Ii(a3, c6);
        if ((c6 & 4186112) === c6)
          break;
        d5 = a3.eventTimes;
        for (e5 = -1; 0 < c6; ) {
          var g5 = 31 - Vc(c6);
          f4 = 1 << g5;
          g5 = d5[g5];
          g5 > e5 && (e5 = g5);
          c6 &= ~f4;
        }
        c6 = e5;
        c6 = O() - c6;
        c6 = (120 > c6 ? 120 : 480 > c6 ? 480 : 1080 > c6 ? 1080 : 1920 > c6 ? 1920 : 3e3 > c6 ? 3e3 : 4320 > c6 ? 4320 : 1960 * nj(c6 / 1960)) - c6;
        if (10 < c6) {
          a3.timeoutHandle = of(Uj.bind(null, a3), c6);
          break;
        }
        Uj(a3);
        break;
      case 5:
        Uj(a3);
        break;
      default:
        throw Error(y(329));
    }
  }
  Mj(a3, O());
  return a3.callbackNode === b5 ? Nj.bind(null, a3) : null;
}
function Ii(a3, b5) {
  b5 &= ~uj;
  b5 &= ~Hi;
  a3.suspendedLanes |= b5;
  a3.pingedLanes &= ~b5;
  for (a3 = a3.expirationTimes; 0 < b5; ) {
    var c6 = 31 - Vc(b5), d5 = 1 << c6;
    a3[c6] = -1;
    b5 &= ~d5;
  }
}
function Lj(a3) {
  if ((X & 48) !== 0)
    throw Error(y(327));
  Oj();
  if (a3 === U && (a3.expiredLanes & W) !== 0) {
    var b5 = W;
    var c6 = Tj(a3, b5);
    (tj & Hi) !== 0 && (b5 = Uc(a3, b5), c6 = Tj(a3, b5));
  } else
    b5 = Uc(a3, 0), c6 = Tj(a3, b5);
  a3.tag !== 0 && c6 === 2 && (X |= 64, a3.hydrate && (a3.hydrate = false, qf(a3.containerInfo)), b5 = Wc(a3), b5 !== 0 && (c6 = Tj(a3, b5)));
  if (c6 === 1)
    throw c6 = sj, Qj(a3, 0), Ii(a3, b5), Mj(a3, O()), c6;
  a3.finishedWork = a3.current.alternate;
  a3.finishedLanes = b5;
  Uj(a3);
  Mj(a3, O());
  return null;
}
function Vj() {
  if (Cj !== null) {
    var a3 = Cj;
    Cj = null;
    a3.forEach(function(a4) {
      a4.expiredLanes |= 24 & a4.pendingLanes;
      Mj(a4, O());
    });
  }
  ig();
}
function Wj(a3, b5) {
  var c6 = X;
  X |= 1;
  try {
    return a3(b5);
  } finally {
    X = c6, X === 0 && (wj(), ig());
  }
}
function Xj(a3, b5) {
  var c6 = X;
  X &= -2;
  X |= 8;
  try {
    return a3(b5);
  } finally {
    X = c6, X === 0 && (wj(), ig());
  }
}
function ni(a3, b5) {
  I(rj, qj);
  qj |= b5;
  tj |= b5;
}
function Ki() {
  qj = rj.current;
  H(rj);
}
function Qj(a3, b5) {
  a3.finishedWork = null;
  a3.finishedLanes = 0;
  var c6 = a3.timeoutHandle;
  c6 !== -1 && (a3.timeoutHandle = -1, pf(c6));
  if (Y !== null)
    for (c6 = Y.return; c6 !== null; ) {
      var d5 = c6;
      switch (d5.tag) {
        case 1:
          d5 = d5.type.childContextTypes;
          d5 !== null && d5 !== void 0 && Gf();
          break;
        case 3:
          fh();
          H(N);
          H(M);
          uh();
          break;
        case 5:
          hh(d5);
          break;
        case 4:
          fh();
          break;
        case 13:
          H(P);
          break;
        case 19:
          H(P);
          break;
        case 10:
          rg(d5);
          break;
        case 23:
        case 24:
          Ki();
      }
      c6 = c6.return;
    }
  U = a3;
  Y = Tg(a3.current, null);
  W = qj = tj = b5;
  V = 0;
  sj = null;
  uj = Hi = Dg = 0;
}
function Sj(a3, b5) {
  do {
    var c6 = Y;
    try {
      qg();
      vh.current = Gh;
      if (yh) {
        for (var d5 = R.memoizedState; d5 !== null; ) {
          var e5 = d5.queue;
          e5 !== null && (e5.pending = null);
          d5 = d5.next;
        }
        yh = false;
      }
      xh = 0;
      T = S = R = null;
      zh = false;
      pj.current = null;
      if (c6 === null || c6.return === null) {
        V = 1;
        sj = b5;
        Y = null;
        break;
      }
      a: {
        var f4 = a3, g5 = c6.return, h4 = c6, k5 = b5;
        b5 = W;
        h4.flags |= 2048;
        h4.firstEffect = h4.lastEffect = null;
        if (k5 !== null && typeof k5 === "object" && typeof k5.then === "function") {
          var l4 = k5;
          if ((h4.mode & 2) === 0) {
            var n5 = h4.alternate;
            n5 ? (h4.updateQueue = n5.updateQueue, h4.memoizedState = n5.memoizedState, h4.lanes = n5.lanes) : (h4.updateQueue = null, h4.memoizedState = null);
          }
          var A5 = (P.current & 1) !== 0, p5 = g5;
          do {
            var C4;
            if (C4 = p5.tag === 13) {
              var x3 = p5.memoizedState;
              if (x3 !== null)
                C4 = x3.dehydrated !== null ? true : false;
              else {
                var w4 = p5.memoizedProps;
                C4 = w4.fallback === void 0 ? false : w4.unstable_avoidThisFallback !== true ? true : A5 ? false : true;
              }
            }
            if (C4) {
              var z5 = p5.updateQueue;
              if (z5 === null) {
                var u4 = new Set();
                u4.add(l4);
                p5.updateQueue = u4;
              } else
                z5.add(l4);
              if ((p5.mode & 2) === 0) {
                p5.flags |= 64;
                h4.flags |= 16384;
                h4.flags &= -2981;
                if (h4.tag === 1)
                  if (h4.alternate === null)
                    h4.tag = 17;
                  else {
                    var t3 = zg(-1, 1);
                    t3.tag = 2;
                    Ag(h4, t3);
                  }
                h4.lanes |= 1;
                break a;
              }
              k5 = void 0;
              h4 = b5;
              var q5 = f4.pingCache;
              q5 === null ? (q5 = f4.pingCache = new Oi(), k5 = new Set(), q5.set(l4, k5)) : (k5 = q5.get(l4), k5 === void 0 && (k5 = new Set(), q5.set(l4, k5)));
              if (!k5.has(h4)) {
                k5.add(h4);
                var v4 = Yj.bind(null, f4, l4, h4);
                l4.then(v4, v4);
              }
              p5.flags |= 4096;
              p5.lanes = b5;
              break a;
            }
            p5 = p5.return;
          } while (p5 !== null);
          k5 = Error((Ra(h4.type) || "A React component") + " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.");
        }
        V !== 5 && (V = 2);
        k5 = Mi(k5, h4);
        p5 = g5;
        do {
          switch (p5.tag) {
            case 3:
              f4 = k5;
              p5.flags |= 4096;
              b5 &= -b5;
              p5.lanes |= b5;
              var J2 = Pi(p5, f4, b5);
              Bg(p5, J2);
              break a;
            case 1:
              f4 = k5;
              var K2 = p5.type, Q2 = p5.stateNode;
              if ((p5.flags & 64) === 0 && (typeof K2.getDerivedStateFromError === "function" || Q2 !== null && typeof Q2.componentDidCatch === "function" && (Ti === null || !Ti.has(Q2)))) {
                p5.flags |= 4096;
                b5 &= -b5;
                p5.lanes |= b5;
                var L2 = Si(p5, f4, b5);
                Bg(p5, L2);
                break a;
              }
          }
          p5 = p5.return;
        } while (p5 !== null);
      }
      Zj(c6);
    } catch (va) {
      b5 = va;
      Y === c6 && c6 !== null && (Y = c6 = c6.return);
      continue;
    }
    break;
  } while (1);
}
function Pj() {
  var a3 = oj.current;
  oj.current = Gh;
  return a3 === null ? Gh : a3;
}
function Tj(a3, b5) {
  var c6 = X;
  X |= 16;
  var d5 = Pj();
  U === a3 && W === b5 || Qj(a3, b5);
  do
    try {
      ak();
      break;
    } catch (e5) {
      Sj(a3, e5);
    }
  while (1);
  qg();
  X = c6;
  oj.current = d5;
  if (Y !== null)
    throw Error(y(261));
  U = null;
  W = 0;
  return V;
}
function ak() {
  for (; Y !== null; )
    bk(Y);
}
function Rj() {
  for (; Y !== null && !Qf(); )
    bk(Y);
}
function bk(a3) {
  var b5 = ck(a3.alternate, a3, qj);
  a3.memoizedProps = a3.pendingProps;
  b5 === null ? Zj(a3) : Y = b5;
  pj.current = null;
}
function Zj(a3) {
  var b5 = a3;
  do {
    var c6 = b5.alternate;
    a3 = b5.return;
    if ((b5.flags & 2048) === 0) {
      c6 = Gi(c6, b5, qj);
      if (c6 !== null) {
        Y = c6;
        return;
      }
      c6 = b5;
      if (c6.tag !== 24 && c6.tag !== 23 || c6.memoizedState === null || (qj & 1073741824) !== 0 || (c6.mode & 4) === 0) {
        for (var d5 = 0, e5 = c6.child; e5 !== null; )
          d5 |= e5.lanes | e5.childLanes, e5 = e5.sibling;
        c6.childLanes = d5;
      }
      a3 !== null && (a3.flags & 2048) === 0 && (a3.firstEffect === null && (a3.firstEffect = b5.firstEffect), b5.lastEffect !== null && (a3.lastEffect !== null && (a3.lastEffect.nextEffect = b5.firstEffect), a3.lastEffect = b5.lastEffect), 1 < b5.flags && (a3.lastEffect !== null ? a3.lastEffect.nextEffect = b5 : a3.firstEffect = b5, a3.lastEffect = b5));
    } else {
      c6 = Li(b5);
      if (c6 !== null) {
        c6.flags &= 2047;
        Y = c6;
        return;
      }
      a3 !== null && (a3.firstEffect = a3.lastEffect = null, a3.flags |= 2048);
    }
    b5 = b5.sibling;
    if (b5 !== null) {
      Y = b5;
      return;
    }
    Y = b5 = a3;
  } while (b5 !== null);
  V === 0 && (V = 5);
}
function Uj(a3) {
  var b5 = eg();
  gg(99, dk.bind(null, a3, b5));
  return null;
}
function dk(a3, b5) {
  do
    Oj();
  while (yj !== null);
  if ((X & 48) !== 0)
    throw Error(y(327));
  var c6 = a3.finishedWork;
  if (c6 === null)
    return null;
  a3.finishedWork = null;
  a3.finishedLanes = 0;
  if (c6 === a3.current)
    throw Error(y(177));
  a3.callbackNode = null;
  var d5 = c6.lanes | c6.childLanes, e5 = d5, f4 = a3.pendingLanes & ~e5;
  a3.pendingLanes = e5;
  a3.suspendedLanes = 0;
  a3.pingedLanes = 0;
  a3.expiredLanes &= e5;
  a3.mutableReadLanes &= e5;
  a3.entangledLanes &= e5;
  e5 = a3.entanglements;
  for (var g5 = a3.eventTimes, h4 = a3.expirationTimes; 0 < f4; ) {
    var k5 = 31 - Vc(f4), l4 = 1 << k5;
    e5[k5] = 0;
    g5[k5] = -1;
    h4[k5] = -1;
    f4 &= ~l4;
  }
  Cj !== null && (d5 & 24) === 0 && Cj.has(a3) && Cj.delete(a3);
  a3 === U && (Y = U = null, W = 0);
  1 < c6.flags ? c6.lastEffect !== null ? (c6.lastEffect.nextEffect = c6, d5 = c6.firstEffect) : d5 = c6 : d5 = c6.firstEffect;
  if (d5 !== null) {
    e5 = X;
    X |= 32;
    pj.current = null;
    kf = fd;
    g5 = Ne();
    if (Oe(g5)) {
      if ("selectionStart" in g5)
        h4 = {start: g5.selectionStart, end: g5.selectionEnd};
      else
        a:
          if (h4 = (h4 = g5.ownerDocument) && h4.defaultView || window, (l4 = h4.getSelection && h4.getSelection()) && l4.rangeCount !== 0) {
            h4 = l4.anchorNode;
            f4 = l4.anchorOffset;
            k5 = l4.focusNode;
            l4 = l4.focusOffset;
            try {
              h4.nodeType, k5.nodeType;
            } catch (va) {
              h4 = null;
              break a;
            }
            var n5 = 0, A5 = -1, p5 = -1, C4 = 0, x3 = 0, w4 = g5, z5 = null;
            b:
              for (; ; ) {
                for (var u4; ; ) {
                  w4 !== h4 || f4 !== 0 && w4.nodeType !== 3 || (A5 = n5 + f4);
                  w4 !== k5 || l4 !== 0 && w4.nodeType !== 3 || (p5 = n5 + l4);
                  w4.nodeType === 3 && (n5 += w4.nodeValue.length);
                  if ((u4 = w4.firstChild) === null)
                    break;
                  z5 = w4;
                  w4 = u4;
                }
                for (; ; ) {
                  if (w4 === g5)
                    break b;
                  z5 === h4 && ++C4 === f4 && (A5 = n5);
                  z5 === k5 && ++x3 === l4 && (p5 = n5);
                  if ((u4 = w4.nextSibling) !== null)
                    break;
                  w4 = z5;
                  z5 = w4.parentNode;
                }
                w4 = u4;
              }
            h4 = A5 === -1 || p5 === -1 ? null : {start: A5, end: p5};
          } else
            h4 = null;
      h4 = h4 || {start: 0, end: 0};
    } else
      h4 = null;
    lf = {focusedElem: g5, selectionRange: h4};
    fd = false;
    Ij = null;
    Jj = false;
    Z = d5;
    do
      try {
        ek();
      } catch (va) {
        if (Z === null)
          throw Error(y(330));
        Wi(Z, va);
        Z = Z.nextEffect;
      }
    while (Z !== null);
    Ij = null;
    Z = d5;
    do
      try {
        for (g5 = a3; Z !== null; ) {
          var t3 = Z.flags;
          t3 & 16 && pb(Z.stateNode, "");
          if (t3 & 128) {
            var q5 = Z.alternate;
            if (q5 !== null) {
              var v4 = q5.ref;
              v4 !== null && (typeof v4 === "function" ? v4(null) : v4.current = null);
            }
          }
          switch (t3 & 1038) {
            case 2:
              fj(Z);
              Z.flags &= -3;
              break;
            case 6:
              fj(Z);
              Z.flags &= -3;
              ij(Z.alternate, Z);
              break;
            case 1024:
              Z.flags &= -1025;
              break;
            case 1028:
              Z.flags &= -1025;
              ij(Z.alternate, Z);
              break;
            case 4:
              ij(Z.alternate, Z);
              break;
            case 8:
              h4 = Z;
              cj(g5, h4);
              var J2 = h4.alternate;
              dj(h4);
              J2 !== null && dj(J2);
          }
          Z = Z.nextEffect;
        }
      } catch (va) {
        if (Z === null)
          throw Error(y(330));
        Wi(Z, va);
        Z = Z.nextEffect;
      }
    while (Z !== null);
    v4 = lf;
    q5 = Ne();
    t3 = v4.focusedElem;
    g5 = v4.selectionRange;
    if (q5 !== t3 && t3 && t3.ownerDocument && Me(t3.ownerDocument.documentElement, t3)) {
      g5 !== null && Oe(t3) && (q5 = g5.start, v4 = g5.end, v4 === void 0 && (v4 = q5), "selectionStart" in t3 ? (t3.selectionStart = q5, t3.selectionEnd = Math.min(v4, t3.value.length)) : (v4 = (q5 = t3.ownerDocument || document) && q5.defaultView || window, v4.getSelection && (v4 = v4.getSelection(), h4 = t3.textContent.length, J2 = Math.min(g5.start, h4), g5 = g5.end === void 0 ? J2 : Math.min(g5.end, h4), !v4.extend && J2 > g5 && (h4 = g5, g5 = J2, J2 = h4), h4 = Le(t3, J2), f4 = Le(t3, g5), h4 && f4 && (v4.rangeCount !== 1 || v4.anchorNode !== h4.node || v4.anchorOffset !== h4.offset || v4.focusNode !== f4.node || v4.focusOffset !== f4.offset) && (q5 = q5.createRange(), q5.setStart(h4.node, h4.offset), v4.removeAllRanges(), J2 > g5 ? (v4.addRange(q5), v4.extend(f4.node, f4.offset)) : (q5.setEnd(f4.node, f4.offset), v4.addRange(q5))))));
      q5 = [];
      for (v4 = t3; v4 = v4.parentNode; )
        v4.nodeType === 1 && q5.push({element: v4, left: v4.scrollLeft, top: v4.scrollTop});
      typeof t3.focus === "function" && t3.focus();
      for (t3 = 0; t3 < q5.length; t3++)
        v4 = q5[t3], v4.element.scrollLeft = v4.left, v4.element.scrollTop = v4.top;
    }
    fd = !!kf;
    lf = kf = null;
    a3.current = c6;
    Z = d5;
    do
      try {
        for (t3 = a3; Z !== null; ) {
          var K2 = Z.flags;
          K2 & 36 && Yi(t3, Z.alternate, Z);
          if (K2 & 128) {
            q5 = void 0;
            var Q2 = Z.ref;
            if (Q2 !== null) {
              var L2 = Z.stateNode;
              switch (Z.tag) {
                case 5:
                  q5 = L2;
                  break;
                default:
                  q5 = L2;
              }
              typeof Q2 === "function" ? Q2(q5) : Q2.current = q5;
            }
          }
          Z = Z.nextEffect;
        }
      } catch (va) {
        if (Z === null)
          throw Error(y(330));
        Wi(Z, va);
        Z = Z.nextEffect;
      }
    while (Z !== null);
    Z = null;
    $f();
    X = e5;
  } else
    a3.current = c6;
  if (xj)
    xj = false, yj = a3, zj = b5;
  else
    for (Z = d5; Z !== null; )
      b5 = Z.nextEffect, Z.nextEffect = null, Z.flags & 8 && (K2 = Z, K2.sibling = null, K2.stateNode = null), Z = b5;
  d5 = a3.pendingLanes;
  d5 === 0 && (Ti = null);
  d5 === 1 ? a3 === Ej ? Dj++ : (Dj = 0, Ej = a3) : Dj = 0;
  c6 = c6.stateNode;
  if (Mf && typeof Mf.onCommitFiberRoot === "function")
    try {
      Mf.onCommitFiberRoot(Lf, c6, void 0, (c6.current.flags & 64) === 64);
    } catch (va) {
    }
  Mj(a3, O());
  if (Qi)
    throw Qi = false, a3 = Ri, Ri = null, a3;
  if ((X & 8) !== 0)
    return null;
  ig();
  return null;
}
function ek() {
  for (; Z !== null; ) {
    var a3 = Z.alternate;
    Jj || Ij === null || ((Z.flags & 8) !== 0 ? dc(Z, Ij) && (Jj = true) : Z.tag === 13 && mj(a3, Z) && dc(Z, Ij) && (Jj = true));
    var b5 = Z.flags;
    (b5 & 256) !== 0 && Xi(a3, Z);
    (b5 & 512) === 0 || xj || (xj = true, hg(97, function() {
      Oj();
      return null;
    }));
    Z = Z.nextEffect;
  }
}
function Oj() {
  if (zj !== 90) {
    var a3 = 97 < zj ? 97 : zj;
    zj = 90;
    return gg(a3, fk);
  }
  return false;
}
function $i(a3, b5) {
  Aj.push(b5, a3);
  xj || (xj = true, hg(97, function() {
    Oj();
    return null;
  }));
}
function Zi(a3, b5) {
  Bj.push(b5, a3);
  xj || (xj = true, hg(97, function() {
    Oj();
    return null;
  }));
}
function fk() {
  if (yj === null)
    return false;
  var a3 = yj;
  yj = null;
  if ((X & 48) !== 0)
    throw Error(y(331));
  var b5 = X;
  X |= 32;
  var c6 = Bj;
  Bj = [];
  for (var d5 = 0; d5 < c6.length; d5 += 2) {
    var e5 = c6[d5], f4 = c6[d5 + 1], g5 = e5.destroy;
    e5.destroy = void 0;
    if (typeof g5 === "function")
      try {
        g5();
      } catch (k5) {
        if (f4 === null)
          throw Error(y(330));
        Wi(f4, k5);
      }
  }
  c6 = Aj;
  Aj = [];
  for (d5 = 0; d5 < c6.length; d5 += 2) {
    e5 = c6[d5];
    f4 = c6[d5 + 1];
    try {
      var h4 = e5.create;
      e5.destroy = h4();
    } catch (k5) {
      if (f4 === null)
        throw Error(y(330));
      Wi(f4, k5);
    }
  }
  for (h4 = a3.current.firstEffect; h4 !== null; )
    a3 = h4.nextEffect, h4.nextEffect = null, h4.flags & 8 && (h4.sibling = null, h4.stateNode = null), h4 = a3;
  X = b5;
  ig();
  return true;
}
function gk(a3, b5, c6) {
  b5 = Mi(c6, b5);
  b5 = Pi(a3, b5, 1);
  Ag(a3, b5);
  b5 = Hg();
  a3 = Kj(a3, 1);
  a3 !== null && ($c(a3, 1, b5), Mj(a3, b5));
}
function Wi(a3, b5) {
  if (a3.tag === 3)
    gk(a3, a3, b5);
  else
    for (var c6 = a3.return; c6 !== null; ) {
      if (c6.tag === 3) {
        gk(c6, a3, b5);
        break;
      } else if (c6.tag === 1) {
        var d5 = c6.stateNode;
        if (typeof c6.type.getDerivedStateFromError === "function" || typeof d5.componentDidCatch === "function" && (Ti === null || !Ti.has(d5))) {
          a3 = Mi(b5, a3);
          var e5 = Si(c6, a3, 1);
          Ag(c6, e5);
          e5 = Hg();
          c6 = Kj(c6, 1);
          if (c6 !== null)
            $c(c6, 1, e5), Mj(c6, e5);
          else if (typeof d5.componentDidCatch === "function" && (Ti === null || !Ti.has(d5)))
            try {
              d5.componentDidCatch(b5, a3);
            } catch (f4) {
            }
          break;
        }
      }
      c6 = c6.return;
    }
}
function Yj(a3, b5, c6) {
  var d5 = a3.pingCache;
  d5 !== null && d5.delete(b5);
  b5 = Hg();
  a3.pingedLanes |= a3.suspendedLanes & c6;
  U === a3 && (W & c6) === c6 && (V === 4 || V === 3 && (W & 62914560) === W && 500 > O() - jj ? Qj(a3, 0) : uj |= c6);
  Mj(a3, b5);
}
function lj(a3, b5) {
  var c6 = a3.stateNode;
  c6 !== null && c6.delete(b5);
  b5 = 0;
  b5 === 0 && (b5 = a3.mode, (b5 & 2) === 0 ? b5 = 1 : (b5 & 4) === 0 ? b5 = eg() === 99 ? 1 : 2 : (Gj === 0 && (Gj = tj), b5 = Yc(62914560 & ~Gj), b5 === 0 && (b5 = 4194304)));
  c6 = Hg();
  a3 = Kj(a3, b5);
  a3 !== null && ($c(a3, b5, c6), Mj(a3, c6));
}
var ck;
ck = function(a3, b5, c6) {
  var d5 = b5.lanes;
  if (a3 !== null)
    if (a3.memoizedProps !== b5.pendingProps || N.current)
      ug = true;
    else if ((c6 & d5) !== 0)
      ug = (a3.flags & 16384) !== 0 ? true : false;
    else {
      ug = false;
      switch (b5.tag) {
        case 3:
          ri(b5);
          sh();
          break;
        case 5:
          gh(b5);
          break;
        case 1:
          Ff(b5.type) && Jf(b5);
          break;
        case 4:
          eh(b5, b5.stateNode.containerInfo);
          break;
        case 10:
          d5 = b5.memoizedProps.value;
          var e5 = b5.type._context;
          I(mg, e5._currentValue);
          e5._currentValue = d5;
          break;
        case 13:
          if (b5.memoizedState !== null) {
            if ((c6 & b5.child.childLanes) !== 0)
              return ti(a3, b5, c6);
            I(P, P.current & 1);
            b5 = hi(a3, b5, c6);
            return b5 !== null ? b5.sibling : null;
          }
          I(P, P.current & 1);
          break;
        case 19:
          d5 = (c6 & b5.childLanes) !== 0;
          if ((a3.flags & 64) !== 0) {
            if (d5)
              return Ai(a3, b5, c6);
            b5.flags |= 64;
          }
          e5 = b5.memoizedState;
          e5 !== null && (e5.rendering = null, e5.tail = null, e5.lastEffect = null);
          I(P, P.current);
          if (d5)
            break;
          else
            return null;
        case 23:
        case 24:
          return b5.lanes = 0, mi(a3, b5, c6);
      }
      return hi(a3, b5, c6);
    }
  else
    ug = false;
  b5.lanes = 0;
  switch (b5.tag) {
    case 2:
      d5 = b5.type;
      a3 !== null && (a3.alternate = null, b5.alternate = null, b5.flags |= 2);
      a3 = b5.pendingProps;
      e5 = Ef(b5, M.current);
      tg(b5, c6);
      e5 = Ch(null, b5, d5, a3, e5, c6);
      b5.flags |= 1;
      if (typeof e5 === "object" && e5 !== null && typeof e5.render === "function" && e5.$$typeof === void 0) {
        b5.tag = 1;
        b5.memoizedState = null;
        b5.updateQueue = null;
        if (Ff(d5)) {
          var f4 = true;
          Jf(b5);
        } else
          f4 = false;
        b5.memoizedState = e5.state !== null && e5.state !== void 0 ? e5.state : null;
        xg(b5);
        var g5 = d5.getDerivedStateFromProps;
        typeof g5 === "function" && Gg(b5, d5, g5, a3);
        e5.updater = Kg;
        b5.stateNode = e5;
        e5._reactInternals = b5;
        Og(b5, d5, a3, c6);
        b5 = qi(null, b5, d5, true, f4, c6);
      } else
        b5.tag = 0, fi(null, b5, e5, c6), b5 = b5.child;
      return b5;
    case 16:
      e5 = b5.elementType;
      a: {
        a3 !== null && (a3.alternate = null, b5.alternate = null, b5.flags |= 2);
        a3 = b5.pendingProps;
        f4 = e5._init;
        e5 = f4(e5._payload);
        b5.type = e5;
        f4 = b5.tag = hk(e5);
        a3 = lg(e5, a3);
        switch (f4) {
          case 0:
            b5 = li(null, b5, e5, a3, c6);
            break a;
          case 1:
            b5 = pi(null, b5, e5, a3, c6);
            break a;
          case 11:
            b5 = gi(null, b5, e5, a3, c6);
            break a;
          case 14:
            b5 = ii(null, b5, e5, lg(e5.type, a3), d5, c6);
            break a;
        }
        throw Error(y(306, e5, ""));
      }
      return b5;
    case 0:
      return d5 = b5.type, e5 = b5.pendingProps, e5 = b5.elementType === d5 ? e5 : lg(d5, e5), li(a3, b5, d5, e5, c6);
    case 1:
      return d5 = b5.type, e5 = b5.pendingProps, e5 = b5.elementType === d5 ? e5 : lg(d5, e5), pi(a3, b5, d5, e5, c6);
    case 3:
      ri(b5);
      d5 = b5.updateQueue;
      if (a3 === null || d5 === null)
        throw Error(y(282));
      d5 = b5.pendingProps;
      e5 = b5.memoizedState;
      e5 = e5 !== null ? e5.element : null;
      yg(a3, b5);
      Cg(b5, d5, null, c6);
      d5 = b5.memoizedState.element;
      if (d5 === e5)
        sh(), b5 = hi(a3, b5, c6);
      else {
        e5 = b5.stateNode;
        if (f4 = e5.hydrate)
          kh = rf(b5.stateNode.containerInfo.firstChild), jh = b5, f4 = lh = true;
        if (f4) {
          a3 = e5.mutableSourceEagerHydrationData;
          if (a3 != null)
            for (e5 = 0; e5 < a3.length; e5 += 2)
              f4 = a3[e5], f4._workInProgressVersionPrimary = a3[e5 + 1], th.push(f4);
          c6 = Zg(b5, null, d5, c6);
          for (b5.child = c6; c6; )
            c6.flags = c6.flags & -3 | 1024, c6 = c6.sibling;
        } else
          fi(a3, b5, d5, c6), sh();
        b5 = b5.child;
      }
      return b5;
    case 5:
      return gh(b5), a3 === null && ph(b5), d5 = b5.type, e5 = b5.pendingProps, f4 = a3 !== null ? a3.memoizedProps : null, g5 = e5.children, nf(d5, e5) ? g5 = null : f4 !== null && nf(d5, f4) && (b5.flags |= 16), oi(a3, b5), fi(a3, b5, g5, c6), b5.child;
    case 6:
      return a3 === null && ph(b5), null;
    case 13:
      return ti(a3, b5, c6);
    case 4:
      return eh(b5, b5.stateNode.containerInfo), d5 = b5.pendingProps, a3 === null ? b5.child = Yg(b5, null, d5, c6) : fi(a3, b5, d5, c6), b5.child;
    case 11:
      return d5 = b5.type, e5 = b5.pendingProps, e5 = b5.elementType === d5 ? e5 : lg(d5, e5), gi(a3, b5, d5, e5, c6);
    case 7:
      return fi(a3, b5, b5.pendingProps, c6), b5.child;
    case 8:
      return fi(a3, b5, b5.pendingProps.children, c6), b5.child;
    case 12:
      return fi(a3, b5, b5.pendingProps.children, c6), b5.child;
    case 10:
      a: {
        d5 = b5.type._context;
        e5 = b5.pendingProps;
        g5 = b5.memoizedProps;
        f4 = e5.value;
        var h4 = b5.type._context;
        I(mg, h4._currentValue);
        h4._currentValue = f4;
        if (g5 !== null)
          if (h4 = g5.value, f4 = He(h4, f4) ? 0 : (typeof d5._calculateChangedBits === "function" ? d5._calculateChangedBits(h4, f4) : 1073741823) | 0, f4 === 0) {
            if (g5.children === e5.children && !N.current) {
              b5 = hi(a3, b5, c6);
              break a;
            }
          } else
            for (h4 = b5.child, h4 !== null && (h4.return = b5); h4 !== null; ) {
              var k5 = h4.dependencies;
              if (k5 !== null) {
                g5 = h4.child;
                for (var l4 = k5.firstContext; l4 !== null; ) {
                  if (l4.context === d5 && (l4.observedBits & f4) !== 0) {
                    h4.tag === 1 && (l4 = zg(-1, c6 & -c6), l4.tag = 2, Ag(h4, l4));
                    h4.lanes |= c6;
                    l4 = h4.alternate;
                    l4 !== null && (l4.lanes |= c6);
                    sg(h4.return, c6);
                    k5.lanes |= c6;
                    break;
                  }
                  l4 = l4.next;
                }
              } else
                g5 = h4.tag === 10 ? h4.type === b5.type ? null : h4.child : h4.child;
              if (g5 !== null)
                g5.return = h4;
              else
                for (g5 = h4; g5 !== null; ) {
                  if (g5 === b5) {
                    g5 = null;
                    break;
                  }
                  h4 = g5.sibling;
                  if (h4 !== null) {
                    h4.return = g5.return;
                    g5 = h4;
                    break;
                  }
                  g5 = g5.return;
                }
              h4 = g5;
            }
        fi(a3, b5, e5.children, c6);
        b5 = b5.child;
      }
      return b5;
    case 9:
      return e5 = b5.type, f4 = b5.pendingProps, d5 = f4.children, tg(b5, c6), e5 = vg(e5, f4.unstable_observedBits), d5 = d5(e5), b5.flags |= 1, fi(a3, b5, d5, c6), b5.child;
    case 14:
      return e5 = b5.type, f4 = lg(e5, b5.pendingProps), f4 = lg(e5.type, f4), ii(a3, b5, e5, f4, d5, c6);
    case 15:
      return ki(a3, b5, b5.type, b5.pendingProps, d5, c6);
    case 17:
      return d5 = b5.type, e5 = b5.pendingProps, e5 = b5.elementType === d5 ? e5 : lg(d5, e5), a3 !== null && (a3.alternate = null, b5.alternate = null, b5.flags |= 2), b5.tag = 1, Ff(d5) ? (a3 = true, Jf(b5)) : a3 = false, tg(b5, c6), Mg(b5, d5, e5), Og(b5, d5, e5, c6), qi(null, b5, d5, true, a3, c6);
    case 19:
      return Ai(a3, b5, c6);
    case 23:
      return mi(a3, b5, c6);
    case 24:
      return mi(a3, b5, c6);
  }
  throw Error(y(156, b5.tag));
};
function ik(a3, b5, c6, d5) {
  this.tag = a3;
  this.key = c6;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = b5;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = d5;
  this.flags = 0;
  this.lastEffect = this.firstEffect = this.nextEffect = null;
  this.childLanes = this.lanes = 0;
  this.alternate = null;
}
function nh(a3, b5, c6, d5) {
  return new ik(a3, b5, c6, d5);
}
function ji(a3) {
  a3 = a3.prototype;
  return !(!a3 || !a3.isReactComponent);
}
function hk(a3) {
  if (typeof a3 === "function")
    return ji(a3) ? 1 : 0;
  if (a3 !== void 0 && a3 !== null) {
    a3 = a3.$$typeof;
    if (a3 === Aa)
      return 11;
    if (a3 === Da)
      return 14;
  }
  return 2;
}
function Tg(a3, b5) {
  var c6 = a3.alternate;
  c6 === null ? (c6 = nh(a3.tag, b5, a3.key, a3.mode), c6.elementType = a3.elementType, c6.type = a3.type, c6.stateNode = a3.stateNode, c6.alternate = a3, a3.alternate = c6) : (c6.pendingProps = b5, c6.type = a3.type, c6.flags = 0, c6.nextEffect = null, c6.firstEffect = null, c6.lastEffect = null);
  c6.childLanes = a3.childLanes;
  c6.lanes = a3.lanes;
  c6.child = a3.child;
  c6.memoizedProps = a3.memoizedProps;
  c6.memoizedState = a3.memoizedState;
  c6.updateQueue = a3.updateQueue;
  b5 = a3.dependencies;
  c6.dependencies = b5 === null ? null : {lanes: b5.lanes, firstContext: b5.firstContext};
  c6.sibling = a3.sibling;
  c6.index = a3.index;
  c6.ref = a3.ref;
  return c6;
}
function Vg(a3, b5, c6, d5, e5, f4) {
  var g5 = 2;
  d5 = a3;
  if (typeof a3 === "function")
    ji(a3) && (g5 = 1);
  else if (typeof a3 === "string")
    g5 = 5;
  else
    a:
      switch (a3) {
        case ua:
          return Xg(c6.children, e5, f4, b5);
        case Ha:
          g5 = 8;
          e5 |= 16;
          break;
        case wa:
          g5 = 8;
          e5 |= 1;
          break;
        case xa:
          return a3 = nh(12, c6, b5, e5 | 8), a3.elementType = xa, a3.type = xa, a3.lanes = f4, a3;
        case Ba:
          return a3 = nh(13, c6, b5, e5), a3.type = Ba, a3.elementType = Ba, a3.lanes = f4, a3;
        case Ca:
          return a3 = nh(19, c6, b5, e5), a3.elementType = Ca, a3.lanes = f4, a3;
        case Ia:
          return vi(c6, e5, f4, b5);
        case Ja:
          return a3 = nh(24, c6, b5, e5), a3.elementType = Ja, a3.lanes = f4, a3;
        default:
          if (typeof a3 === "object" && a3 !== null)
            switch (a3.$$typeof) {
              case ya:
                g5 = 10;
                break a;
              case za:
                g5 = 9;
                break a;
              case Aa:
                g5 = 11;
                break a;
              case Da:
                g5 = 14;
                break a;
              case Ea:
                g5 = 16;
                d5 = null;
                break a;
              case Fa:
                g5 = 22;
                break a;
            }
          throw Error(y(130, a3 == null ? a3 : typeof a3, ""));
      }
  b5 = nh(g5, c6, b5, e5);
  b5.elementType = a3;
  b5.type = d5;
  b5.lanes = f4;
  return b5;
}
function Xg(a3, b5, c6, d5) {
  a3 = nh(7, a3, d5, b5);
  a3.lanes = c6;
  return a3;
}
function vi(a3, b5, c6, d5) {
  a3 = nh(23, a3, d5, b5);
  a3.elementType = Ia;
  a3.lanes = c6;
  return a3;
}
function Ug(a3, b5, c6) {
  a3 = nh(6, a3, null, b5);
  a3.lanes = c6;
  return a3;
}
function Wg(a3, b5, c6) {
  b5 = nh(4, a3.children !== null ? a3.children : [], a3.key, b5);
  b5.lanes = c6;
  b5.stateNode = {containerInfo: a3.containerInfo, pendingChildren: null, implementation: a3.implementation};
  return b5;
}
function jk(a3, b5, c6) {
  this.tag = b5;
  this.containerInfo = a3;
  this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
  this.timeoutHandle = -1;
  this.pendingContext = this.context = null;
  this.hydrate = c6;
  this.callbackNode = null;
  this.callbackPriority = 0;
  this.eventTimes = Zc(0);
  this.expirationTimes = Zc(-1);
  this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
  this.entanglements = Zc(0);
  this.mutableSourceEagerHydrationData = null;
}
function kk(a3, b5, c6) {
  var d5 = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {$$typeof: ta, key: d5 == null ? null : "" + d5, children: a3, containerInfo: b5, implementation: c6};
}
function lk(a3, b5, c6, d5) {
  var e5 = b5.current, f4 = Hg(), g5 = Ig(e5);
  a:
    if (c6) {
      c6 = c6._reactInternals;
      b: {
        if (Zb(c6) !== c6 || c6.tag !== 1)
          throw Error(y(170));
        var h4 = c6;
        do {
          switch (h4.tag) {
            case 3:
              h4 = h4.stateNode.context;
              break b;
            case 1:
              if (Ff(h4.type)) {
                h4 = h4.stateNode.__reactInternalMemoizedMergedChildContext;
                break b;
              }
          }
          h4 = h4.return;
        } while (h4 !== null);
        throw Error(y(171));
      }
      if (c6.tag === 1) {
        var k5 = c6.type;
        if (Ff(k5)) {
          c6 = If(c6, k5, h4);
          break a;
        }
      }
      c6 = h4;
    } else
      c6 = Cf;
  b5.context === null ? b5.context = c6 : b5.pendingContext = c6;
  b5 = zg(f4, g5);
  b5.payload = {element: a3};
  d5 = d5 === void 0 ? null : d5;
  d5 !== null && (b5.callback = d5);
  Ag(e5, b5);
  Jg(e5, g5, f4);
  return g5;
}
function mk(a3) {
  a3 = a3.current;
  if (!a3.child)
    return null;
  switch (a3.child.tag) {
    case 5:
      return a3.child.stateNode;
    default:
      return a3.child.stateNode;
  }
}
function nk(a3, b5) {
  a3 = a3.memoizedState;
  if (a3 !== null && a3.dehydrated !== null) {
    var c6 = a3.retryLane;
    a3.retryLane = c6 !== 0 && c6 < b5 ? c6 : b5;
  }
}
function ok(a3, b5) {
  nk(a3, b5);
  (a3 = a3.alternate) && nk(a3, b5);
}
function pk() {
  return null;
}
function qk(a3, b5, c6) {
  var d5 = c6 != null && c6.hydrationOptions != null && c6.hydrationOptions.mutableSources || null;
  c6 = new jk(a3, b5, c6 != null && c6.hydrate === true);
  b5 = nh(3, null, null, b5 === 2 ? 7 : b5 === 1 ? 3 : 0);
  c6.current = b5;
  b5.stateNode = c6;
  xg(b5);
  a3[ff] = c6.current;
  cf(a3.nodeType === 8 ? a3.parentNode : a3);
  if (d5)
    for (a3 = 0; a3 < d5.length; a3++) {
      b5 = d5[a3];
      var e5 = b5._getVersion;
      e5 = e5(b5._source);
      c6.mutableSourceEagerHydrationData == null ? c6.mutableSourceEagerHydrationData = [b5, e5] : c6.mutableSourceEagerHydrationData.push(b5, e5);
    }
  this._internalRoot = c6;
}
qk.prototype.render = function(a3) {
  lk(a3, this._internalRoot, null, null);
};
qk.prototype.unmount = function() {
  var a3 = this._internalRoot, b5 = a3.containerInfo;
  lk(null, a3, null, function() {
    b5[ff] = null;
  });
};
function rk(a3) {
  return !(!a3 || a3.nodeType !== 1 && a3.nodeType !== 9 && a3.nodeType !== 11 && (a3.nodeType !== 8 || a3.nodeValue !== " react-mount-point-unstable "));
}
function sk(a3, b5) {
  b5 || (b5 = a3 ? a3.nodeType === 9 ? a3.documentElement : a3.firstChild : null, b5 = !(!b5 || b5.nodeType !== 1 || !b5.hasAttribute("data-reactroot")));
  if (!b5)
    for (var c6; c6 = a3.lastChild; )
      a3.removeChild(c6);
  return new qk(a3, 0, b5 ? {hydrate: true} : void 0);
}
function tk(a3, b5, c6, d5, e5) {
  var f4 = c6._reactRootContainer;
  if (f4) {
    var g5 = f4._internalRoot;
    if (typeof e5 === "function") {
      var h4 = e5;
      e5 = function() {
        var a4 = mk(g5);
        h4.call(a4);
      };
    }
    lk(b5, g5, a3, e5);
  } else {
    f4 = c6._reactRootContainer = sk(c6, d5);
    g5 = f4._internalRoot;
    if (typeof e5 === "function") {
      var k5 = e5;
      e5 = function() {
        var a4 = mk(g5);
        k5.call(a4);
      };
    }
    Xj(function() {
      lk(b5, g5, a3, e5);
    });
  }
  return mk(g5);
}
ec = function(a3) {
  if (a3.tag === 13) {
    var b5 = Hg();
    Jg(a3, 4, b5);
    ok(a3, 4);
  }
};
fc = function(a3) {
  if (a3.tag === 13) {
    var b5 = Hg();
    Jg(a3, 67108864, b5);
    ok(a3, 67108864);
  }
};
gc = function(a3) {
  if (a3.tag === 13) {
    var b5 = Hg(), c6 = Ig(a3);
    Jg(a3, c6, b5);
    ok(a3, c6);
  }
};
hc = function(a3, b5) {
  return b5();
};
yb = function(a3, b5, c6) {
  switch (b5) {
    case "input":
      ab(a3, c6);
      b5 = c6.name;
      if (c6.type === "radio" && b5 != null) {
        for (c6 = a3; c6.parentNode; )
          c6 = c6.parentNode;
        c6 = c6.querySelectorAll("input[name=" + JSON.stringify("" + b5) + '][type="radio"]');
        for (b5 = 0; b5 < c6.length; b5++) {
          var d5 = c6[b5];
          if (d5 !== a3 && d5.form === a3.form) {
            var e5 = Db(d5);
            if (!e5)
              throw Error(y(90));
            Wa(d5);
            ab(d5, e5);
          }
        }
      }
      break;
    case "textarea":
      ib(a3, c6);
      break;
    case "select":
      b5 = c6.value, b5 != null && fb(a3, !!c6.multiple, b5, false);
  }
};
Gb = Wj;
Hb = function(a3, b5, c6, d5, e5) {
  var f4 = X;
  X |= 4;
  try {
    return gg(98, a3.bind(null, b5, c6, d5, e5));
  } finally {
    X = f4, X === 0 && (wj(), ig());
  }
};
Ib = function() {
  (X & 49) === 0 && (Vj(), Oj());
};
Jb = function(a3, b5) {
  var c6 = X;
  X |= 2;
  try {
    return a3(b5);
  } finally {
    X = c6, X === 0 && (wj(), ig());
  }
};
function uk(a3, b5) {
  var c6 = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!rk(b5))
    throw Error(y(200));
  return kk(a3, b5, null, c6);
}
var vk = {Events: [Cb, ue, Db, Eb, Fb, Oj, {current: false}]};
var wk = {findFiberByHostInstance: wc, bundleType: 0, version: "17.0.2", rendererPackageName: "react-dom"};
var xk = {bundleType: wk.bundleType, version: wk.version, rendererPackageName: wk.rendererPackageName, rendererConfig: wk.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ra.ReactCurrentDispatcher, findHostInstanceByFiber: function(a3) {
  a3 = cc(a3);
  return a3 === null ? null : a3.stateNode;
}, findFiberByHostInstance: wk.findFiberByHostInstance || pk, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null};
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined") {
  yk = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!yk.isDisabled && yk.supportsFiber)
    try {
      Lf = yk.inject(xk), Mf = yk;
    } catch (a3) {
    }
}
var yk;
var __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED2 = vk;
var createPortal = uk;
var findDOMNode = function(a3) {
  if (a3 == null)
    return null;
  if (a3.nodeType === 1)
    return a3;
  var b5 = a3._reactInternals;
  if (b5 === void 0) {
    if (typeof a3.render === "function")
      throw Error(y(188));
    throw Error(y(268, Object.keys(a3)));
  }
  a3 = cc(b5);
  a3 = a3 === null ? null : a3.stateNode;
  return a3;
};
var flushSync = function(a3, b5) {
  var c6 = X;
  if ((c6 & 48) !== 0)
    return a3(b5);
  X |= 1;
  try {
    if (a3)
      return gg(99, a3.bind(null, b5));
  } finally {
    X = c6, ig();
  }
};
var hydrate = function(a3, b5, c6) {
  if (!rk(b5))
    throw Error(y(200));
  return tk(null, a3, b5, true, c6);
};
var render = function(a3, b5, c6) {
  if (!rk(b5))
    throw Error(y(200));
  return tk(null, a3, b5, false, c6);
};
var unmountComponentAtNode = function(a3) {
  if (!rk(a3))
    throw Error(y(40));
  return a3._reactRootContainer ? (Xj(function() {
    tk(null, null, a3, false, function() {
      a3._reactRootContainer = null;
      a3[ff] = null;
    });
  }), true) : false;
};
var unstable_batchedUpdates = Wj;
var unstable_createPortal = function(a3, b5) {
  return uk(a3, b5, 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null);
};
var unstable_renderSubtreeIntoContainer = function(a3, b5, c6, d5) {
  if (!rk(c6))
    throw Error(y(200));
  if (a3 == null || a3._reactInternals === void 0)
    throw Error(y(38));
  return tk(a3, b5, c6, false, d5);
};
var version2 = "17.0.2";
var reactDom_production_min = {
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED2,
  createPortal,
  findDOMNode,
  flushSync,
  hydrate,
  render,
  unmountComponentAtNode,
  unstable_batchedUpdates,
  unstable_createPortal,
  unstable_renderSubtreeIntoContainer,
  version: version2
};
var reactDom = createCommonjsModule(function(module) {
  function checkDCE() {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
      return;
    }
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
    } catch (err) {
      console.error(err);
    }
  }
  {
    checkDCE();
    module.exports = reactDom_production_min;
  }
});

// docs/snowpack/pkg/common/hoist-non-react-statics.cjs-43de917e.js
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b = typeof Symbol === "function" && Symbol.for;
var c = b ? Symbol.for("react.element") : 60103;
var d = b ? Symbol.for("react.portal") : 60106;
var e = b ? Symbol.for("react.fragment") : 60107;
var f = b ? Symbol.for("react.strict_mode") : 60108;
var g = b ? Symbol.for("react.profiler") : 60114;
var h = b ? Symbol.for("react.provider") : 60109;
var k = b ? Symbol.for("react.context") : 60110;
var l = b ? Symbol.for("react.async_mode") : 60111;
var m = b ? Symbol.for("react.concurrent_mode") : 60111;
var n = b ? Symbol.for("react.forward_ref") : 60112;
var p = b ? Symbol.for("react.suspense") : 60113;
var q = b ? Symbol.for("react.suspense_list") : 60120;
var r = b ? Symbol.for("react.memo") : 60115;
var t = b ? Symbol.for("react.lazy") : 60116;
var v = b ? Symbol.for("react.block") : 60121;
var w = b ? Symbol.for("react.fundamental") : 60117;
var x = b ? Symbol.for("react.responder") : 60118;
var y2 = b ? Symbol.for("react.scope") : 60119;
function z(a3) {
  if (typeof a3 === "object" && a3 !== null) {
    var u4 = a3.$$typeof;
    switch (u4) {
      case c:
        switch (a3 = a3.type, a3) {
          case l:
          case m:
          case e:
          case g:
          case f:
          case p:
            return a3;
          default:
            switch (a3 = a3 && a3.$$typeof, a3) {
              case k:
              case n:
              case t:
              case r:
              case h:
                return a3;
              default:
                return u4;
            }
        }
      case d:
        return u4;
    }
  }
}
function A(a3) {
  return z(a3) === m;
}
var AsyncMode = l;
var ConcurrentMode = m;
var ContextConsumer = k;
var ContextProvider = h;
var Element2 = c;
var ForwardRef = n;
var Fragment2 = e;
var Lazy = t;
var Memo = r;
var Portal = d;
var Profiler2 = g;
var StrictMode2 = f;
var Suspense2 = p;
var isAsyncMode = function(a3) {
  return A(a3) || z(a3) === l;
};
var isConcurrentMode = A;
var isContextConsumer = function(a3) {
  return z(a3) === k;
};
var isContextProvider = function(a3) {
  return z(a3) === h;
};
var isElement = function(a3) {
  return typeof a3 === "object" && a3 !== null && a3.$$typeof === c;
};
var isForwardRef = function(a3) {
  return z(a3) === n;
};
var isFragment = function(a3) {
  return z(a3) === e;
};
var isLazy = function(a3) {
  return z(a3) === t;
};
var isMemo = function(a3) {
  return z(a3) === r;
};
var isPortal = function(a3) {
  return z(a3) === d;
};
var isProfiler = function(a3) {
  return z(a3) === g;
};
var isStrictMode = function(a3) {
  return z(a3) === f;
};
var isSuspense = function(a3) {
  return z(a3) === p;
};
var isValidElementType = function(a3) {
  return typeof a3 === "string" || typeof a3 === "function" || a3 === e || a3 === m || a3 === g || a3 === f || a3 === p || a3 === q || typeof a3 === "object" && a3 !== null && (a3.$$typeof === t || a3.$$typeof === r || a3.$$typeof === h || a3.$$typeof === k || a3.$$typeof === n || a3.$$typeof === w || a3.$$typeof === x || a3.$$typeof === y2 || a3.$$typeof === v);
};
var typeOf = z;
var reactIs_production_min = {
  AsyncMode,
  ConcurrentMode,
  ContextConsumer,
  ContextProvider,
  Element: Element2,
  ForwardRef,
  Fragment: Fragment2,
  Lazy,
  Memo,
  Portal,
  Profiler: Profiler2,
  StrictMode: StrictMode2,
  Suspense: Suspense2,
  isAsyncMode,
  isConcurrentMode,
  isContextConsumer,
  isContextProvider,
  isElement,
  isForwardRef,
  isFragment,
  isLazy,
  isMemo,
  isPortal,
  isProfiler,
  isStrictMode,
  isSuspense,
  isValidElementType,
  typeOf
};
var reactIs = createCommonjsModule(function(module) {
  {
    module.exports = reactIs_production_min;
  }
});
var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  $$typeof: true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  $$typeof: true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;
function getStatics(component) {
  if (reactIs.isMemo(component)) {
    return MEMO_STATICS;
  }
  return TYPE_STATICS[component["$$typeof"]] || REACT_STATICS;
}
var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols2 = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== "string") {
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);
      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }
    var keys2 = getOwnPropertyNames(sourceComponent);
    if (getOwnPropertySymbols2) {
      keys2 = keys2.concat(getOwnPropertySymbols2(sourceComponent));
    }
    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);
    for (var i2 = 0; i2 < keys2.length; ++i2) {
      var key = keys2[i2];
      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
        try {
          defineProperty(targetComponent, key, descriptor);
        } catch (e5) {
        }
      }
    }
  }
  return targetComponent;
}
var hoistNonReactStatics_cjs = hoistNonReactStatics;

// docs/snowpack/pkg/formik.js
var import_formik_esm_c35373e0 = __toModule(require_formik_esm_c35373e0());

// docs/snowpack/pkg/common/index-ce016b4a.js
var ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
var ReactPropTypesSecret_1 = ReactPropTypesSecret;
function emptyFunction() {
}
function emptyFunctionWithReset() {
}
emptyFunctionWithReset.resetWarningCache = emptyFunction;
var factoryWithThrowingShims = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret_1) {
      return;
    }
    var err = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
    err.name = "Invariant Violation";
    throw err;
  }
  shim.isRequired = shim;
  function getShim() {
    return shim;
  }
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,
    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,
    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};
var propTypes = createCommonjsModule(function(module) {
  {
    module.exports = factoryWithThrowingShims();
  }
});

// docs/snowpack/pkg/common/colorManipulator-3728bc64.js
var _extends_1 = createCommonjsModule(function(module) {
  function _extends3() {
    module.exports = _extends3 = Object.assign || function(target) {
      for (var i2 = 1; i2 < arguments.length; i2++) {
        var source = arguments[i2];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    module.exports["default"] = module.exports, module.exports.__esModule = true;
    return _extends3.apply(this, arguments);
  }
  module.exports = _extends3;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});
function toVal(mix) {
  var k5, y6, str = "";
  if (typeof mix === "string" || typeof mix === "number") {
    str += mix;
  } else if (typeof mix === "object") {
    if (Array.isArray(mix)) {
      for (k5 = 0; k5 < mix.length; k5++) {
        if (mix[k5]) {
          if (y6 = toVal(mix[k5])) {
            str && (str += " ");
            str += y6;
          }
        }
      }
    } else {
      for (k5 in mix) {
        if (mix[k5]) {
          str && (str += " ");
          str += k5;
        }
      }
    }
  }
  return str;
}
function clsx() {
  var i2 = 0, tmp, x3, str = "";
  while (i2 < arguments.length) {
    if (tmp = arguments[i2++]) {
      if (x3 = toVal(tmp)) {
        str && (str += " ");
        str += x3;
      }
    }
  }
  return str;
}
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function isPlainObject(item) {
  return item !== null && typeof item === "object" && item.constructor === Object;
}
function deepmerge(target, source, options = {
  clone: true
}) {
  const output = options.clone ? _extends({}, target) : target;
  if (isPlainObject(target) && isPlainObject(source)) {
    Object.keys(source).forEach((key) => {
      if (key === "__proto__") {
        return;
      }
      if (isPlainObject(source[key]) && key in target && isPlainObject(target[key])) {
        output[key] = deepmerge(target[key], source[key], options);
      } else {
        output[key] = source[key];
      }
    });
  }
  return output;
}
function formatMuiErrorMessage(code) {
  let url = "https://mui.com/production-error/?code=" + code;
  for (let i2 = 1; i2 < arguments.length; i2 += 1) {
    url += "&args[]=" + encodeURIComponent(arguments[i2]);
  }
  return "Minified MUI error #" + code + "; visit " + url + " for the full message.";
}
function capitalize(string2) {
  if (typeof string2 !== "string") {
    throw new Error(formatMuiErrorMessage(7));
  }
  return string2.charAt(0).toUpperCase() + string2.slice(1);
}
function createChainedFunction(...funcs) {
  return funcs.reduce((acc, func) => {
    if (func == null) {
      return acc;
    }
    return function chainedFunction(...args) {
      acc.apply(this, args);
      func.apply(this, args);
    };
  }, () => {
  });
}
function debounce(func, wait = 166) {
  let timeout;
  function debounced(...args) {
    const later = () => {
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }
  debounced.clear = () => {
    clearTimeout(timeout);
  };
  return debounced;
}
function isMuiElement(element, muiNames) {
  return /* @__PURE__ */ react.isValidElement(element) && muiNames.indexOf(element.type.muiName) !== -1;
}
function ownerDocument(node) {
  return node && node.ownerDocument || document;
}
function ownerWindow(node) {
  const doc = ownerDocument(node);
  return doc.defaultView || window;
}
function setRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}
var useEnhancedEffect = typeof window !== "undefined" ? react.useLayoutEffect : react.useEffect;
function useControlled({
  controlled,
  default: defaultProp,
  name,
  state = "value"
}) {
  const {
    current: isControlled
  } = react.useRef(controlled !== void 0);
  const [valueState, setValue] = react.useState(defaultProp);
  const value = isControlled ? controlled : valueState;
  const setValueIfUncontrolled = react.useCallback((newValue) => {
    if (!isControlled) {
      setValue(newValue);
    }
  }, []);
  return [value, setValueIfUncontrolled];
}
function useEventCallback(fn2) {
  const ref = react.useRef(fn2);
  useEnhancedEffect(() => {
    ref.current = fn2;
  });
  return react.useCallback((...args) => (0, ref.current)(...args), []);
}
function useForkRef(refA, refB) {
  return react.useMemo(() => {
    if (refA == null && refB == null) {
      return null;
    }
    return (refValue) => {
      setRef(refA, refValue);
      setRef(refB, refValue);
    };
  }, [refA, refB]);
}
function getScrollbarSize(doc) {
  const documentWidth = doc.documentElement.clientWidth;
  return Math.abs(window.innerWidth - documentWidth);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i2;
  for (i2 = 0; i2 < sourceKeys.length; i2++) {
    key = sourceKeys[i2];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
var reactJsxRuntime_production_min = createCommonjsModule(function(module, exports) {
  var g5 = 60103;
  exports.Fragment = 60107;
  if (typeof Symbol === "function" && Symbol.for) {
    var h4 = Symbol.for;
    g5 = h4("react.element");
    exports.Fragment = h4("react.fragment");
  }
  var m5 = react.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, n5 = Object.prototype.hasOwnProperty, p5 = {key: true, ref: true, __self: true, __source: true};
  function q5(c6, a3, k5) {
    var b5, d5 = {}, e5 = null, l4 = null;
    k5 !== void 0 && (e5 = "" + k5);
    a3.key !== void 0 && (e5 = "" + a3.key);
    a3.ref !== void 0 && (l4 = a3.ref);
    for (b5 in a3)
      n5.call(a3, b5) && !p5.hasOwnProperty(b5) && (d5[b5] = a3[b5]);
    if (c6 && c6.defaultProps)
      for (b5 in a3 = c6.defaultProps, a3)
        d5[b5] === void 0 && (d5[b5] = a3[b5]);
    return {$$typeof: g5, type: c6, key: e5, ref: l4, props: d5, _owner: m5.current};
  }
  exports.jsx = q5;
  exports.jsxs = q5;
});
var jsxRuntime = createCommonjsModule(function(module) {
  {
    module.exports = reactJsxRuntime_production_min;
  }
});
function memoize(fn2) {
  var cache2 = Object.create(null);
  return function(arg) {
    if (cache2[arg] === void 0)
      cache2[arg] = fn2(arg);
    return cache2[arg];
  };
}
var reactPropsRegex = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|download|draggable|encType|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/;
var isPropValid = /* @__PURE__ */ memoize(function(prop) {
  return reactPropsRegex.test(prop) || prop.charCodeAt(0) === 111 && prop.charCodeAt(1) === 110 && prop.charCodeAt(2) < 91;
});
function sheetForTag(tag) {
  if (tag.sheet) {
    return tag.sheet;
  }
  for (var i2 = 0; i2 < document.styleSheets.length; i2++) {
    if (document.styleSheets[i2].ownerNode === tag) {
      return document.styleSheets[i2];
    }
  }
}
function createStyleElement(options) {
  var tag = document.createElement("style");
  tag.setAttribute("data-emotion", options.key);
  if (options.nonce !== void 0) {
    tag.setAttribute("nonce", options.nonce);
  }
  tag.appendChild(document.createTextNode(""));
  tag.setAttribute("data-s", "");
  return tag;
}
var StyleSheet = /* @__PURE__ */ function() {
  function StyleSheet2(options) {
    var _this = this;
    this._insertTag = function(tag) {
      var before;
      if (_this.tags.length === 0) {
        before = _this.prepend ? _this.container.firstChild : _this.before;
      } else {
        before = _this.tags[_this.tags.length - 1].nextSibling;
      }
      _this.container.insertBefore(tag, before);
      _this.tags.push(tag);
    };
    this.isSpeedy = options.speedy === void 0 ? true : options.speedy;
    this.tags = [];
    this.ctr = 0;
    this.nonce = options.nonce;
    this.key = options.key;
    this.container = options.container;
    this.prepend = options.prepend;
    this.before = null;
  }
  var _proto = StyleSheet2.prototype;
  _proto.hydrate = function hydrate2(nodes) {
    nodes.forEach(this._insertTag);
  };
  _proto.insert = function insert(rule) {
    if (this.ctr % (this.isSpeedy ? 65e3 : 1) === 0) {
      this._insertTag(createStyleElement(this));
    }
    var tag = this.tags[this.tags.length - 1];
    if (this.isSpeedy) {
      var sheet = sheetForTag(tag);
      try {
        sheet.insertRule(rule, sheet.cssRules.length);
      } catch (e5) {
      }
    } else {
      tag.appendChild(document.createTextNode(rule));
    }
    this.ctr++;
  };
  _proto.flush = function flush() {
    this.tags.forEach(function(tag) {
      return tag.parentNode && tag.parentNode.removeChild(tag);
    });
    this.tags = [];
    this.ctr = 0;
  };
  return StyleSheet2;
}();
var e2 = "-ms-";
var r2 = "-moz-";
var a2 = "-webkit-";
var c3 = "comm";
var n2 = "rule";
var t2 = "decl";
var i = "@import";
var p2 = "@keyframes";
var k2 = Math.abs;
var d2 = String.fromCharCode;
function m2(e22, r22) {
  return (((r22 << 2 ^ z2(e22, 0)) << 2 ^ z2(e22, 1)) << 2 ^ z2(e22, 2)) << 2 ^ z2(e22, 3);
}
function g2(e22) {
  return e22.trim();
}
function x2(e22, r22) {
  return (e22 = r22.exec(e22)) ? e22[0] : e22;
}
function y3(e22, r22, a22) {
  return e22.replace(r22, a22);
}
function j(e22, r22) {
  return e22.indexOf(r22);
}
function z2(e22, r22) {
  return e22.charCodeAt(r22) | 0;
}
function C(e22, r22, a22) {
  return e22.slice(r22, a22);
}
function A2(e22) {
  return e22.length;
}
function M2(e22) {
  return e22.length;
}
function O2(e22, r22) {
  return r22.push(e22), e22;
}
function S2(e22, r22) {
  return e22.map(r22).join("");
}
var q2 = 1;
var B2 = 1;
var D2 = 0;
var E2 = 0;
var F3 = 0;
var G2 = "";
function H2(e22, r22, a22, c22, n22, t22, s2) {
  return {value: e22, root: r22, parent: a22, type: c22, props: n22, children: t22, line: q2, column: B2, length: s2, return: ""};
}
function I2(e22, r22, a22) {
  return H2(e22, r22.root, r22.parent, a22, r22.props, r22.children, 0);
}
function J() {
  return F3;
}
function K() {
  F3 = E2 > 0 ? z2(G2, --E2) : 0;
  if (B2--, F3 === 10)
    B2 = 1, q2--;
  return F3;
}
function L() {
  F3 = E2 < D2 ? z2(G2, E2++) : 0;
  if (B2++, F3 === 10)
    B2 = 1, q2++;
  return F3;
}
function N2() {
  return z2(G2, E2);
}
function P2() {
  return E2;
}
function Q(e22, r22) {
  return C(G2, e22, r22);
}
function R2(e22) {
  switch (e22) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function T2(e22) {
  return q2 = B2 = 1, D2 = A2(G2 = e22), E2 = 0, [];
}
function U2(e22) {
  return G2 = "", e22;
}
function V2(e22) {
  return g2(Q(E2 - 1, _(e22 === 91 ? e22 + 2 : e22 === 40 ? e22 + 1 : e22)));
}
function X2(e22) {
  while (F3 = N2())
    if (F3 < 33)
      L();
    else
      break;
  return R2(e22) > 2 || R2(F3) > 3 ? "" : " ";
}
function Z2(e22, r22) {
  while (--r22 && L())
    if (F3 < 48 || F3 > 102 || F3 > 57 && F3 < 65 || F3 > 70 && F3 < 97)
      break;
  return Q(e22, P2() + (r22 < 6 && N2() == 32 && L() == 32));
}
function _(e22) {
  while (L())
    switch (F3) {
      case e22:
        return E2;
      case 34:
      case 39:
        return _(e22 === 34 || e22 === 39 ? e22 : F3);
      case 40:
        if (e22 === 41)
          _(e22);
        break;
      case 92:
        L();
        break;
    }
  return E2;
}
function ee2(e22, r22) {
  while (L())
    if (e22 + F3 === 47 + 10)
      break;
    else if (e22 + F3 === 42 + 42 && N2() === 47)
      break;
  return "/*" + Q(r22, E2 - 1) + "*" + d2(e22 === 47 ? e22 : L());
}
function re2(e22) {
  while (!R2(N2()))
    L();
  return Q(e22, E2);
}
function ae2(e22) {
  return U2(ce2("", null, null, null, [""], e22 = T2(e22), 0, [0], e22));
}
function ce2(e22, r22, a22, c22, n22, t22, s2, u22, i2) {
  var f22 = 0;
  var o2 = 0;
  var l22 = s2;
  var v22 = 0;
  var h22 = 0;
  var p22 = 0;
  var b22 = 1;
  var w22 = 1;
  var $2 = 1;
  var k22 = 0;
  var m22 = "";
  var g22 = n22;
  var x22 = t22;
  var j2 = c22;
  var z22 = m22;
  while (w22)
    switch (p22 = k22, k22 = L()) {
      case 34:
      case 39:
      case 91:
      case 40:
        z22 += V2(k22);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        z22 += X2(p22);
        break;
      case 92:
        z22 += Z2(P2() - 1, 7);
        continue;
      case 47:
        switch (N2()) {
          case 42:
          case 47:
            O2(te2(ee2(L(), P2()), r22, a22), i2);
            break;
          default:
            z22 += "/";
        }
        break;
      case 123 * b22:
        u22[f22++] = A2(z22) * $2;
      case 125 * b22:
      case 59:
      case 0:
        switch (k22) {
          case 0:
          case 125:
            w22 = 0;
          case 59 + o2:
            if (h22 > 0 && A2(z22) - l22)
              O2(h22 > 32 ? se2(z22 + ";", c22, a22, l22 - 1) : se2(y3(z22, " ", "") + ";", c22, a22, l22 - 2), i2);
            break;
          case 59:
            z22 += ";";
          default:
            O2(j2 = ne2(z22, r22, a22, f22, o2, n22, u22, m22, g22 = [], x22 = [], l22), t22);
            if (k22 === 123)
              if (o2 === 0)
                ce2(z22, r22, j2, j2, g22, t22, l22, u22, x22);
              else
                switch (v22) {
                  case 100:
                  case 109:
                  case 115:
                    ce2(e22, j2, j2, c22 && O2(ne2(e22, j2, j2, 0, 0, n22, u22, m22, n22, g22 = [], l22), x22), n22, x22, l22, u22, c22 ? g22 : x22);
                    break;
                  default:
                    ce2(z22, j2, j2, j2, [""], x22, l22, u22, x22);
                }
        }
        f22 = o2 = h22 = 0, b22 = $2 = 1, m22 = z22 = "", l22 = s2;
        break;
      case 58:
        l22 = 1 + A2(z22), h22 = p22;
      default:
        if (b22 < 1) {
          if (k22 == 123)
            --b22;
          else if (k22 == 125 && b22++ == 0 && K() == 125)
            continue;
        }
        switch (z22 += d2(k22), k22 * b22) {
          case 38:
            $2 = o2 > 0 ? 1 : (z22 += "\f", -1);
            break;
          case 44:
            u22[f22++] = (A2(z22) - 1) * $2, $2 = 1;
            break;
          case 64:
            if (N2() === 45)
              z22 += V2(L());
            v22 = N2(), o2 = A2(m22 = z22 += re2(P2())), k22++;
            break;
          case 45:
            if (p22 === 45 && A2(z22) == 2)
              b22 = 0;
        }
    }
  return t22;
}
function ne2(e22, r22, a22, c22, t22, s2, u22, i2, f22, o2, l22) {
  var v22 = t22 - 1;
  var h22 = t22 === 0 ? s2 : [""];
  var p22 = M2(h22);
  for (var b22 = 0, w22 = 0, $2 = 0; b22 < c22; ++b22)
    for (var d22 = 0, m22 = C(e22, v22 + 1, v22 = k2(w22 = u22[b22])), x22 = e22; d22 < p22; ++d22)
      if (x22 = g2(w22 > 0 ? h22[d22] + " " + m22 : y3(m22, /&\f/g, h22[d22])))
        f22[$2++] = x22;
  return H2(e22, r22, a22, t22 === 0 ? n2 : i2, f22, o2, l22);
}
function te2(e22, r22, a22) {
  return H2(e22, r22, a22, c3, d2(J()), C(e22, 2, -2), 0);
}
function se2(e22, r22, a22, c22) {
  return H2(e22, r22, a22, t2, C(e22, 0, c22), C(e22, c22 + 1, -1), c22);
}
function ue2(c22, n22) {
  switch (m2(c22, n22)) {
    case 5103:
      return a2 + "print-" + c22 + c22;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return a2 + c22 + c22;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return a2 + c22 + r2 + c22 + e2 + c22 + c22;
    case 6828:
    case 4268:
      return a2 + c22 + e2 + c22 + c22;
    case 6165:
      return a2 + c22 + e2 + "flex-" + c22 + c22;
    case 5187:
      return a2 + c22 + y3(c22, /(\w+).+(:[^]+)/, a2 + "box-$1$2" + e2 + "flex-$1$2") + c22;
    case 5443:
      return a2 + c22 + e2 + "flex-item-" + y3(c22, /flex-|-self/, "") + c22;
    case 4675:
      return a2 + c22 + e2 + "flex-line-pack" + y3(c22, /align-content|flex-|-self/, "") + c22;
    case 5548:
      return a2 + c22 + e2 + y3(c22, "shrink", "negative") + c22;
    case 5292:
      return a2 + c22 + e2 + y3(c22, "basis", "preferred-size") + c22;
    case 6060:
      return a2 + "box-" + y3(c22, "-grow", "") + a2 + c22 + e2 + y3(c22, "grow", "positive") + c22;
    case 4554:
      return a2 + y3(c22, /([^-])(transform)/g, "$1" + a2 + "$2") + c22;
    case 6187:
      return y3(y3(y3(c22, /(zoom-|grab)/, a2 + "$1"), /(image-set)/, a2 + "$1"), c22, "") + c22;
    case 5495:
    case 3959:
      return y3(c22, /(image-set\([^]*)/, a2 + "$1$`$1");
    case 4968:
      return y3(y3(c22, /(.+:)(flex-)?(.*)/, a2 + "box-pack:$3" + e2 + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + a2 + c22 + c22;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return y3(c22, /(.+)-inline(.+)/, a2 + "$1$2") + c22;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (A2(c22) - 1 - n22 > 6)
        switch (z2(c22, n22 + 1)) {
          case 109:
            if (z2(c22, n22 + 4) !== 45)
              break;
          case 102:
            return y3(c22, /(.+:)(.+)-([^]+)/, "$1" + a2 + "$2-$3$1" + r2 + (z2(c22, n22 + 3) == 108 ? "$3" : "$2-$3")) + c22;
          case 115:
            return ~j(c22, "stretch") ? ue2(y3(c22, "stretch", "fill-available"), n22) + c22 : c22;
        }
      break;
    case 4949:
      if (z2(c22, n22 + 1) !== 115)
        break;
    case 6444:
      switch (z2(c22, A2(c22) - 3 - (~j(c22, "!important") && 10))) {
        case 107:
          return y3(c22, ":", ":" + a2) + c22;
        case 101:
          return y3(c22, /(.+:)([^;!]+)(;|!.+)?/, "$1" + a2 + (z2(c22, 14) === 45 ? "inline-" : "") + "box$3$1" + a2 + "$2$3$1" + e2 + "$2box$3") + c22;
      }
      break;
    case 5936:
      switch (z2(c22, n22 + 11)) {
        case 114:
          return a2 + c22 + e2 + y3(c22, /[svh]\w+-[tblr]{2}/, "tb") + c22;
        case 108:
          return a2 + c22 + e2 + y3(c22, /[svh]\w+-[tblr]{2}/, "tb-rl") + c22;
        case 45:
          return a2 + c22 + e2 + y3(c22, /[svh]\w+-[tblr]{2}/, "lr") + c22;
      }
      return a2 + c22 + e2 + c22 + c22;
  }
  return c22;
}
function ie2(e22, r22) {
  var a22 = "";
  var c22 = M2(e22);
  for (var n22 = 0; n22 < c22; n22++)
    a22 += r22(e22[n22], n22, e22, r22) || "";
  return a22;
}
function fe2(e22, r22, a22, s2) {
  switch (e22.type) {
    case i:
    case t2:
      return e22.return = e22.return || e22.value;
    case c3:
      return "";
    case n2:
      e22.value = e22.props.join(",");
  }
  return A2(a22 = ie2(e22.children, s2)) ? e22.return = e22.value + "{" + a22 + "}" : "";
}
function oe2(e22) {
  var r22 = M2(e22);
  return function(a22, c22, n22, t22) {
    var s2 = "";
    for (var u22 = 0; u22 < r22; u22++)
      s2 += e22[u22](a22, c22, n22, t22) || "";
    return s2;
  };
}
function le2(e22) {
  return function(r22) {
    if (!r22.root) {
      if (r22 = r22.return)
        e22(r22);
    }
  };
}
function ve2(c22, s2, u22, i2) {
  if (!c22.return)
    switch (c22.type) {
      case t2:
        c22.return = ue2(c22.value, c22.length);
        break;
      case p2:
        return ie2([I2(y3(c22.value, "@", "@" + a2), c22, "")], i2);
      case n2:
        if (c22.length)
          return S2(c22.props, function(n22) {
            switch (x2(n22, /(::plac\w+|:read-\w+)/)) {
              case ":read-only":
              case ":read-write":
                return ie2([I2(y3(n22, /:(read-\w+)/, ":" + r2 + "$1"), c22, "")], i2);
              case "::placeholder":
                return ie2([I2(y3(n22, /:(plac\w+)/, ":" + a2 + "input-$1"), c22, ""), I2(y3(n22, /:(plac\w+)/, ":" + r2 + "$1"), c22, ""), I2(y3(n22, /:(plac\w+)/, e2 + "input-$1"), c22, "")], i2);
            }
            return "";
          });
    }
}
var identifierWithPointTracking = function identifierWithPointTracking2(begin, points, index) {
  var previous = 0;
  var character = 0;
  while (true) {
    previous = character;
    character = N2();
    if (previous === 38 && character === 12) {
      points[index] = 1;
    }
    if (R2(character)) {
      break;
    }
    L();
  }
  return Q(begin, E2);
};
var toRules = function toRules2(parsed, points) {
  var index = -1;
  var character = 44;
  do {
    switch (R2(character)) {
      case 0:
        if (character === 38 && N2() === 12) {
          points[index] = 1;
        }
        parsed[index] += identifierWithPointTracking(E2 - 1, points, index);
        break;
      case 2:
        parsed[index] += V2(character);
        break;
      case 4:
        if (character === 44) {
          parsed[++index] = N2() === 58 ? "&\f" : "";
          points[index] = parsed[index].length;
          break;
        }
      default:
        parsed[index] += d2(character);
    }
  } while (character = L());
  return parsed;
};
var getRules = function getRules2(value, points) {
  return U2(toRules(T2(value), points));
};
var fixedElements = /* @__PURE__ */ new WeakMap();
var compat = function compat2(element) {
  if (element.type !== "rule" || !element.parent || !element.length) {
    return;
  }
  var value = element.value, parent = element.parent;
  var isImplicitRule = element.column === parent.column && element.line === parent.line;
  while (parent.type !== "rule") {
    parent = parent.parent;
    if (!parent)
      return;
  }
  if (element.props.length === 1 && value.charCodeAt(0) !== 58 && !fixedElements.get(parent)) {
    return;
  }
  if (isImplicitRule) {
    return;
  }
  fixedElements.set(element, true);
  var points = [];
  var rules = getRules(value, points);
  var parentRules = parent.props;
  for (var i2 = 0, k5 = 0; i2 < rules.length; i2++) {
    for (var j2 = 0; j2 < parentRules.length; j2++, k5++) {
      element.props[k5] = points[i2] ? rules[i2].replace(/&\f/g, parentRules[j2]) : parentRules[j2] + " " + rules[i2];
    }
  }
};
var removeLabel = function removeLabel2(element) {
  if (element.type === "decl") {
    var value = element.value;
    if (value.charCodeAt(0) === 108 && value.charCodeAt(2) === 98) {
      element["return"] = "";
      element.value = "";
    }
  }
};
var defaultStylisPlugins = [ve2];
var createCache = function createCache2(options) {
  var key = options.key;
  if (key === "css") {
    var ssrStyles = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(ssrStyles, function(node) {
      var dataEmotionAttribute = node.getAttribute("data-emotion");
      if (dataEmotionAttribute.indexOf(" ") === -1) {
        return;
      }
      document.head.appendChild(node);
      node.setAttribute("data-s", "");
    });
  }
  var stylisPlugins = options.stylisPlugins || defaultStylisPlugins;
  var inserted = {};
  var container;
  var nodesToHydrate = [];
  {
    container = options.container || document.head;
    Array.prototype.forEach.call(document.querySelectorAll('style[data-emotion^="' + key + ' "]'), function(node) {
      var attrib = node.getAttribute("data-emotion").split(" ");
      for (var i2 = 1; i2 < attrib.length; i2++) {
        inserted[attrib[i2]] = true;
      }
      nodesToHydrate.push(node);
    });
  }
  var _insert;
  var omnipresentPlugins = [compat, removeLabel];
  {
    var currentSheet;
    var finalizingPlugins = [fe2, le2(function(rule) {
      currentSheet.insert(rule);
    })];
    var serializer = oe2(omnipresentPlugins.concat(stylisPlugins, finalizingPlugins));
    var stylis = function stylis2(styles2) {
      return ie2(ae2(styles2), serializer);
    };
    _insert = function insert(selector, serialized, sheet, shouldCache) {
      currentSheet = sheet;
      stylis(selector ? selector + "{" + serialized.styles + "}" : serialized.styles);
      if (shouldCache) {
        cache2.inserted[serialized.name] = true;
      }
    };
  }
  var cache2 = {
    key,
    sheet: new StyleSheet({
      key,
      container,
      nonce: options.nonce,
      speedy: options.speedy,
      prepend: options.prepend
    }),
    nonce: options.nonce,
    inserted,
    registered: {},
    insert: _insert
  };
  cache2.sheet.hydrate(nodesToHydrate);
  return cache2;
};
var isBrowser = true;
function getRegisteredStyles(registered, registeredStyles, classNames) {
  var rawClassName = "";
  classNames.split(" ").forEach(function(className) {
    if (registered[className] !== void 0) {
      registeredStyles.push(registered[className] + ";");
    } else {
      rawClassName += className + " ";
    }
  });
  return rawClassName;
}
var insertStyles = function insertStyles2(cache2, serialized, isStringTag) {
  var className = cache2.key + "-" + serialized.name;
  if ((isStringTag === false || isBrowser === false) && cache2.registered[className] === void 0) {
    cache2.registered[className] = serialized.styles;
  }
  if (cache2.inserted[serialized.name] === void 0) {
    var current = serialized;
    do {
      var maybeStyles = cache2.insert(serialized === current ? "." + className : "", current, cache2.sheet, true);
      current = current.next;
    } while (current !== void 0);
  }
};
function murmur2(str) {
  var h4 = 0;
  var k5, i2 = 0, len = str.length;
  for (; len >= 4; ++i2, len -= 4) {
    k5 = str.charCodeAt(i2) & 255 | (str.charCodeAt(++i2) & 255) << 8 | (str.charCodeAt(++i2) & 255) << 16 | (str.charCodeAt(++i2) & 255) << 24;
    k5 = (k5 & 65535) * 1540483477 + ((k5 >>> 16) * 59797 << 16);
    k5 ^= k5 >>> 24;
    h4 = (k5 & 65535) * 1540483477 + ((k5 >>> 16) * 59797 << 16) ^ (h4 & 65535) * 1540483477 + ((h4 >>> 16) * 59797 << 16);
  }
  switch (len) {
    case 3:
      h4 ^= (str.charCodeAt(i2 + 2) & 255) << 16;
    case 2:
      h4 ^= (str.charCodeAt(i2 + 1) & 255) << 8;
    case 1:
      h4 ^= str.charCodeAt(i2) & 255;
      h4 = (h4 & 65535) * 1540483477 + ((h4 >>> 16) * 59797 << 16);
  }
  h4 ^= h4 >>> 13;
  h4 = (h4 & 65535) * 1540483477 + ((h4 >>> 16) * 59797 << 16);
  return ((h4 ^ h4 >>> 15) >>> 0).toString(36);
}
var unitlessKeys = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};
var hyphenateRegex = /[A-Z]|^ms/g;
var animationRegex = /_EMO_([^_]+?)_([^]*?)_EMO_/g;
var isCustomProperty = function isCustomProperty2(property2) {
  return property2.charCodeAt(1) === 45;
};
var isProcessableValue = function isProcessableValue2(value) {
  return value != null && typeof value !== "boolean";
};
var processStyleName = /* @__PURE__ */ memoize(function(styleName) {
  return isCustomProperty(styleName) ? styleName : styleName.replace(hyphenateRegex, "-$&").toLowerCase();
});
var processStyleValue = function processStyleValue2(key, value) {
  switch (key) {
    case "animation":
    case "animationName": {
      if (typeof value === "string") {
        return value.replace(animationRegex, function(match, p1, p22) {
          cursor = {
            name: p1,
            styles: p22,
            next: cursor
          };
          return p1;
        });
      }
    }
  }
  if (unitlessKeys[key] !== 1 && !isCustomProperty(key) && typeof value === "number" && value !== 0) {
    return value + "px";
  }
  return value;
};
function handleInterpolation(mergedProps, registered, interpolation) {
  if (interpolation == null) {
    return "";
  }
  if (interpolation.__emotion_styles !== void 0) {
    return interpolation;
  }
  switch (typeof interpolation) {
    case "boolean": {
      return "";
    }
    case "object": {
      if (interpolation.anim === 1) {
        cursor = {
          name: interpolation.name,
          styles: interpolation.styles,
          next: cursor
        };
        return interpolation.name;
      }
      if (interpolation.styles !== void 0) {
        var next = interpolation.next;
        if (next !== void 0) {
          while (next !== void 0) {
            cursor = {
              name: next.name,
              styles: next.styles,
              next: cursor
            };
            next = next.next;
          }
        }
        var styles2 = interpolation.styles + ";";
        return styles2;
      }
      return createStringFromObject(mergedProps, registered, interpolation);
    }
    case "function": {
      if (mergedProps !== void 0) {
        var previousCursor = cursor;
        var result = interpolation(mergedProps);
        cursor = previousCursor;
        return handleInterpolation(mergedProps, registered, result);
      }
      break;
    }
  }
  if (registered == null) {
    return interpolation;
  }
  var cached = registered[interpolation];
  return cached !== void 0 ? cached : interpolation;
}
function createStringFromObject(mergedProps, registered, obj) {
  var string2 = "";
  if (Array.isArray(obj)) {
    for (var i2 = 0; i2 < obj.length; i2++) {
      string2 += handleInterpolation(mergedProps, registered, obj[i2]) + ";";
    }
  } else {
    for (var _key in obj) {
      var value = obj[_key];
      if (typeof value !== "object") {
        if (registered != null && registered[value] !== void 0) {
          string2 += _key + "{" + registered[value] + "}";
        } else if (isProcessableValue(value)) {
          string2 += processStyleName(_key) + ":" + processStyleValue(_key, value) + ";";
        }
      } else {
        if (_key === "NO_COMPONENT_SELECTOR" && false) {
          throw new Error("Component selectors can only be used in conjunction with @emotion/babel-plugin.");
        }
        if (Array.isArray(value) && typeof value[0] === "string" && (registered == null || registered[value[0]] === void 0)) {
          for (var _i = 0; _i < value.length; _i++) {
            if (isProcessableValue(value[_i])) {
              string2 += processStyleName(_key) + ":" + processStyleValue(_key, value[_i]) + ";";
            }
          }
        } else {
          var interpolated = handleInterpolation(mergedProps, registered, value);
          switch (_key) {
            case "animation":
            case "animationName": {
              string2 += processStyleName(_key) + ":" + interpolated + ";";
              break;
            }
            default: {
              string2 += _key + "{" + interpolated + "}";
            }
          }
        }
      }
    }
  }
  return string2;
}
var labelPattern = /label:\s*([^\s;\n{]+)\s*(;|$)/g;
var cursor;
var serializeStyles = function serializeStyles2(args, registered, mergedProps) {
  if (args.length === 1 && typeof args[0] === "object" && args[0] !== null && args[0].styles !== void 0) {
    return args[0];
  }
  var stringMode = true;
  var styles2 = "";
  cursor = void 0;
  var strings = args[0];
  if (strings == null || strings.raw === void 0) {
    stringMode = false;
    styles2 += handleInterpolation(mergedProps, registered, strings);
  } else {
    styles2 += strings[0];
  }
  for (var i2 = 1; i2 < args.length; i2++) {
    styles2 += handleInterpolation(mergedProps, registered, args[i2]);
    if (stringMode) {
      styles2 += strings[i2];
    }
  }
  labelPattern.lastIndex = 0;
  var identifierName = "";
  var match;
  while ((match = labelPattern.exec(styles2)) !== null) {
    identifierName += "-" + match[1];
  }
  var name = murmur2(styles2) + identifierName;
  return {
    name,
    styles: styles2,
    next: cursor
  };
};
var EmotionCacheContext = /* @__PURE__ */ react.createContext(typeof HTMLElement !== "undefined" ? /* @__PURE__ */ createCache({
  key: "css"
}) : null);
var CacheProvider = EmotionCacheContext.Provider;
var withEmotionCache = function withEmotionCache2(func) {
  return /* @__PURE__ */ react.forwardRef(function(props, ref) {
    var cache2 = react.useContext(EmotionCacheContext);
    return func(props, cache2, ref);
  });
};
var ThemeContext = /* @__PURE__ */ react.createContext({});
var Global = /* @__PURE__ */ withEmotionCache(function(props, cache2) {
  var styles2 = props.styles;
  var serialized = serializeStyles([styles2], void 0, react.useContext(ThemeContext));
  var sheetRef = react.useRef();
  react.useLayoutEffect(function() {
    var key = cache2.key + "-global";
    var sheet = new StyleSheet({
      key,
      nonce: cache2.sheet.nonce,
      container: cache2.sheet.container,
      speedy: cache2.sheet.isSpeedy
    });
    var rehydrating = false;
    var node = document.querySelector('style[data-emotion="' + key + " " + serialized.name + '"]');
    if (cache2.sheet.tags.length) {
      sheet.before = cache2.sheet.tags[0];
    }
    if (node !== null) {
      rehydrating = true;
      node.setAttribute("data-emotion", key);
      sheet.hydrate([node]);
    }
    sheetRef.current = [sheet, rehydrating];
    return function() {
      sheet.flush();
    };
  }, [cache2]);
  react.useLayoutEffect(function() {
    var sheetRefCurrent = sheetRef.current;
    var sheet = sheetRefCurrent[0], rehydrating = sheetRefCurrent[1];
    if (rehydrating) {
      sheetRefCurrent[1] = false;
      return;
    }
    if (serialized.next !== void 0) {
      insertStyles(cache2, serialized.next, true);
    }
    if (sheet.tags.length) {
      var element = sheet.tags[sheet.tags.length - 1].nextElementSibling;
      sheet.before = element;
      sheet.flush();
    }
    cache2.insert("", serialized, sheet, false);
  }, [cache2, serialized.name]);
  return null;
});
function css() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return serializeStyles(args);
}
var keyframes = function keyframes2() {
  var insertable = css.apply(void 0, arguments);
  var name = "animation-" + insertable.name;
  return {
    name,
    styles: "@keyframes " + name + "{" + insertable.styles + "}",
    anim: 1,
    toString: function toString2() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
};
var testOmitPropsOnStringTag = isPropValid;
var testOmitPropsOnComponent = function testOmitPropsOnComponent2(key) {
  return key !== "theme";
};
var getDefaultShouldForwardProp = function getDefaultShouldForwardProp2(tag) {
  return typeof tag === "string" && tag.charCodeAt(0) > 96 ? testOmitPropsOnStringTag : testOmitPropsOnComponent;
};
var composeShouldForwardProps = function composeShouldForwardProps2(tag, options, isReal) {
  var shouldForwardProp2;
  if (options) {
    var optionsShouldForwardProp = options.shouldForwardProp;
    shouldForwardProp2 = tag.__emotion_forwardProp && optionsShouldForwardProp ? function(propName) {
      return tag.__emotion_forwardProp(propName) && optionsShouldForwardProp(propName);
    } : optionsShouldForwardProp;
  }
  if (typeof shouldForwardProp2 !== "function" && isReal) {
    shouldForwardProp2 = tag.__emotion_forwardProp;
  }
  return shouldForwardProp2;
};
var createStyled = function createStyled2(tag, options) {
  var isReal = tag.__emotion_real === tag;
  var baseTag = isReal && tag.__emotion_base || tag;
  var identifierName;
  var targetClassName;
  if (options !== void 0) {
    identifierName = options.label;
    targetClassName = options.target;
  }
  var shouldForwardProp2 = composeShouldForwardProps(tag, options, isReal);
  var defaultShouldForwardProp = shouldForwardProp2 || getDefaultShouldForwardProp(baseTag);
  var shouldUseAs = !defaultShouldForwardProp("as");
  return function() {
    var args = arguments;
    var styles2 = isReal && tag.__emotion_styles !== void 0 ? tag.__emotion_styles.slice(0) : [];
    if (identifierName !== void 0) {
      styles2.push("label:" + identifierName + ";");
    }
    if (args[0] == null || args[0].raw === void 0) {
      styles2.push.apply(styles2, args);
    } else {
      styles2.push(args[0][0]);
      var len = args.length;
      var i2 = 1;
      for (; i2 < len; i2++) {
        styles2.push(args[i2], args[0][i2]);
      }
    }
    var Styled = withEmotionCache(function(props, cache2, ref) {
      var finalTag = shouldUseAs && props.as || baseTag;
      var className = "";
      var classInterpolations = [];
      var mergedProps = props;
      if (props.theme == null) {
        mergedProps = {};
        for (var key in props) {
          mergedProps[key] = props[key];
        }
        mergedProps.theme = react.useContext(ThemeContext);
      }
      if (typeof props.className === "string") {
        className = getRegisteredStyles(cache2.registered, classInterpolations, props.className);
      } else if (props.className != null) {
        className = props.className + " ";
      }
      var serialized = serializeStyles(styles2.concat(classInterpolations), cache2.registered, mergedProps);
      var rules = insertStyles(cache2, serialized, typeof finalTag === "string");
      className += cache2.key + "-" + serialized.name;
      if (targetClassName !== void 0) {
        className += " " + targetClassName;
      }
      var finalShouldForwardProp = shouldUseAs && shouldForwardProp2 === void 0 ? getDefaultShouldForwardProp(finalTag) : defaultShouldForwardProp;
      var newProps = {};
      for (var _key in props) {
        if (shouldUseAs && _key === "as")
          continue;
        if (finalShouldForwardProp(_key)) {
          newProps[_key] = props[_key];
        }
      }
      newProps.className = className;
      newProps.ref = ref;
      var ele = /* @__PURE__ */ react.createElement(finalTag, newProps);
      return ele;
    });
    Styled.displayName = identifierName !== void 0 ? identifierName : "Styled(" + (typeof baseTag === "string" ? baseTag : baseTag.displayName || baseTag.name || "Component") + ")";
    Styled.defaultProps = tag.defaultProps;
    Styled.__emotion_real = Styled;
    Styled.__emotion_base = baseTag;
    Styled.__emotion_styles = styles2;
    Styled.__emotion_forwardProp = shouldForwardProp2;
    Object.defineProperty(Styled, "toString", {
      value: function value() {
        if (targetClassName === void 0 && false) {
          return "NO_COMPONENT_SELECTOR";
        }
        return "." + targetClassName;
      }
    });
    Styled.withComponent = function(nextTag, nextOptions) {
      return createStyled2(nextTag, _extends({}, options, nextOptions, {
        shouldForwardProp: composeShouldForwardProps(Styled, nextOptions, true)
      })).apply(void 0, styles2);
    };
    return Styled;
  };
};
var tags = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "marquee",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  "circle",
  "clipPath",
  "defs",
  "ellipse",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "mask",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "svg",
  "text",
  "tspan"
];
var newStyled = createStyled.bind();
tags.forEach(function(tagName) {
  newStyled[tagName] = newStyled(tagName);
});
function isEmpty(obj) {
  return obj === void 0 || obj === null || Object.keys(obj).length === 0;
}
function GlobalStyles(props) {
  const {
    styles: styles2,
    defaultTheme: defaultTheme2 = {}
  } = props;
  const globalStyles = typeof styles2 === "function" ? (themeInput) => styles2(isEmpty(themeInput) ? defaultTheme2 : themeInput) : styles2;
  return /* @__PURE__ */ jsxRuntime.jsx(Global, {
    styles: globalStyles
  });
}
/** @license MUI v5.0.1
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function styled(tag, options) {
  const stylesFactory = newStyled(tag, options);
  return stylesFactory;
}
function merge(acc, item) {
  if (!item) {
    return acc;
  }
  return deepmerge(acc, item, {
    clone: false
  });
}
var values = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536
};
var defaultBreakpoints = {
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (key) => `@media (min-width:${values[key]}px)`
};
function handleBreakpoints(props, propValue, styleFromPropValue) {
  const theme = props.theme || {};
  if (Array.isArray(propValue)) {
    const themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    return propValue.reduce((acc, item, index) => {
      acc[themeBreakpoints.up(themeBreakpoints.keys[index])] = styleFromPropValue(propValue[index]);
      return acc;
    }, {});
  }
  if (typeof propValue === "object") {
    const themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    return Object.keys(propValue).reduce((acc, breakpoint) => {
      if (Object.keys(themeBreakpoints.values || values).indexOf(breakpoint) !== -1) {
        const mediaKey = themeBreakpoints.up(breakpoint);
        acc[mediaKey] = styleFromPropValue(propValue[breakpoint], breakpoint);
      } else {
        const cssKey = breakpoint;
        acc[cssKey] = propValue[cssKey];
      }
      return acc;
    }, {});
  }
  const output = styleFromPropValue(propValue);
  return output;
}
function breakpoints(styleFunction) {
  const newStyleFunction = (props) => {
    const theme = props.theme || {};
    const base = styleFunction(props);
    const themeBreakpoints = theme.breakpoints || defaultBreakpoints;
    const extended = themeBreakpoints.keys.reduce((acc, key) => {
      if (props[key]) {
        acc = acc || {};
        acc[themeBreakpoints.up(key)] = styleFunction(_extends({
          theme
        }, props[key]));
      }
      return acc;
    }, null);
    return merge(base, extended);
  };
  newStyleFunction.propTypes = {};
  newStyleFunction.filterProps = ["xs", "sm", "md", "lg", "xl", ...styleFunction.filterProps];
  return newStyleFunction;
}
function createEmptyBreakpointObject(breakpointsInput = {}) {
  var _breakpointsInput$key;
  const breakpointsInOrder = breakpointsInput == null ? void 0 : (_breakpointsInput$key = breakpointsInput.keys) == null ? void 0 : _breakpointsInput$key.reduce((acc, key) => {
    const breakpointStyleKey = breakpointsInput.up(key);
    acc[breakpointStyleKey] = {};
    return acc;
  }, {});
  return breakpointsInOrder || {};
}
function removeUnusedBreakpoints(breakpointKeys, style2) {
  return breakpointKeys.reduce((acc, key) => {
    const breakpointOutput = acc[key];
    const isBreakpointUnused = Object.keys(breakpointOutput).length === 0;
    if (isBreakpointUnused) {
      delete acc[key];
    }
    return acc;
  }, style2);
}
function mergeBreakpointsInOrder(breakpointsInput, ...styles2) {
  const emptyBreakpoints = createEmptyBreakpointObject(breakpointsInput);
  const mergedOutput = [emptyBreakpoints, ...styles2].reduce((prev, next) => deepmerge(prev, next), {});
  return removeUnusedBreakpoints(Object.keys(emptyBreakpoints), mergedOutput);
}
function resolveBreakpointValues({
  values: breakpointValues,
  base
}) {
  const keys2 = Object.keys(base);
  if (keys2.length === 0) {
    return breakpointValues;
  }
  let previous;
  return keys2.reduce((acc, breakpoint) => {
    if (typeof breakpointValues === "object") {
      acc[breakpoint] = breakpointValues[breakpoint] != null ? breakpointValues[breakpoint] : breakpointValues[previous];
    } else {
      acc[breakpoint] = breakpointValues;
    }
    previous = breakpoint;
    return acc;
  }, {});
}
function getPath(obj, path) {
  if (!path || typeof path !== "string") {
    return null;
  }
  return path.split(".").reduce((acc, item) => acc && acc[item] ? acc[item] : null, obj);
}
function getValue(themeMapping, transform2, propValueFinal, userValue = propValueFinal) {
  let value;
  if (typeof themeMapping === "function") {
    value = themeMapping(propValueFinal);
  } else if (Array.isArray(themeMapping)) {
    value = themeMapping[propValueFinal] || userValue;
  } else {
    value = getPath(themeMapping, propValueFinal) || userValue;
  }
  if (transform2) {
    value = transform2(value);
  }
  return value;
}
function style(options) {
  const {
    prop,
    cssProperty = options.prop,
    themeKey,
    transform: transform2
  } = options;
  const fn2 = (props) => {
    if (props[prop] == null) {
      return null;
    }
    const propValue = props[prop];
    const theme = props.theme;
    const themeMapping = getPath(theme, themeKey) || {};
    const styleFromPropValue = (propValueFinal) => {
      let value = getValue(themeMapping, transform2, propValueFinal);
      if (propValueFinal === value && typeof propValueFinal === "string") {
        value = getValue(themeMapping, transform2, `${prop}${propValueFinal === "default" ? "" : capitalize(propValueFinal)}`, propValueFinal);
      }
      if (cssProperty === false) {
        return value;
      }
      return {
        [cssProperty]: value
      };
    };
    return handleBreakpoints(props, propValue, styleFromPropValue);
  };
  fn2.propTypes = {};
  fn2.filterProps = [prop];
  return fn2;
}
function compose(...styles2) {
  const handlers = styles2.reduce((acc, style2) => {
    style2.filterProps.forEach((prop) => {
      acc[prop] = style2;
    });
    return acc;
  }, {});
  const fn2 = (props) => {
    return Object.keys(props).reduce((acc, prop) => {
      if (handlers[prop]) {
        return merge(acc, handlers[prop](props));
      }
      return acc;
    }, {});
  };
  fn2.propTypes = {};
  fn2.filterProps = styles2.reduce((acc, style2) => acc.concat(style2.filterProps), []);
  return fn2;
}
function memoize$1(fn2) {
  const cache2 = {};
  return (arg) => {
    if (cache2[arg] === void 0) {
      cache2[arg] = fn2(arg);
    }
    return cache2[arg];
  };
}
var properties = {
  m: "margin",
  p: "padding"
};
var directions = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
};
var aliases = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
};
var getCssProperties = memoize$1((prop) => {
  if (prop.length > 2) {
    if (aliases[prop]) {
      prop = aliases[prop];
    } else {
      return [prop];
    }
  }
  const [a3, b5] = prop.split("");
  const property2 = properties[a3];
  const direction = directions[b5] || "";
  return Array.isArray(direction) ? direction.map((dir) => property2 + dir) : [property2 + direction];
});
var marginKeys = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"];
var paddingKeys = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"];
var spacingKeys = [...marginKeys, ...paddingKeys];
function createUnaryUnit(theme, themeKey, defaultValue, propName) {
  const themeSpacing = getPath(theme, themeKey) || defaultValue;
  if (typeof themeSpacing === "number") {
    return (abs) => {
      if (typeof abs === "string") {
        return abs;
      }
      return themeSpacing * abs;
    };
  }
  if (Array.isArray(themeSpacing)) {
    return (abs) => {
      if (typeof abs === "string") {
        return abs;
      }
      return themeSpacing[abs];
    };
  }
  if (typeof themeSpacing === "function") {
    return themeSpacing;
  }
  return () => void 0;
}
function createUnarySpacing(theme) {
  return createUnaryUnit(theme, "spacing", 8);
}
function getValue$1(transformer, propValue) {
  if (typeof propValue === "string" || propValue == null) {
    return propValue;
  }
  const abs = Math.abs(propValue);
  const transformed = transformer(abs);
  if (propValue >= 0) {
    return transformed;
  }
  if (typeof transformed === "number") {
    return -transformed;
  }
  return `-${transformed}`;
}
function getStyleFromPropValue(cssProperties, transformer) {
  return (propValue) => cssProperties.reduce((acc, cssProperty) => {
    acc[cssProperty] = getValue$1(transformer, propValue);
    return acc;
  }, {});
}
function resolveCssProperty(props, keys2, prop, transformer) {
  if (keys2.indexOf(prop) === -1) {
    return null;
  }
  const cssProperties = getCssProperties(prop);
  const styleFromPropValue = getStyleFromPropValue(cssProperties, transformer);
  const propValue = props[prop];
  return handleBreakpoints(props, propValue, styleFromPropValue);
}
function style$1(props, keys2) {
  const transformer = createUnarySpacing(props.theme);
  return Object.keys(props).map((prop) => resolveCssProperty(props, keys2, prop, transformer)).reduce(merge, {});
}
function margin(props) {
  return style$1(props, marginKeys);
}
margin.propTypes = {};
margin.filterProps = marginKeys;
function padding(props) {
  return style$1(props, paddingKeys);
}
padding.propTypes = {};
padding.filterProps = paddingKeys;
function spacing(props) {
  return style$1(props, spacingKeys);
}
spacing.propTypes = {};
spacing.filterProps = spacingKeys;
function getBorder(value) {
  if (typeof value !== "number") {
    return value;
  }
  return `${value}px solid`;
}
var border = style({
  prop: "border",
  themeKey: "borders",
  transform: getBorder
});
var borderTop = style({
  prop: "borderTop",
  themeKey: "borders",
  transform: getBorder
});
var borderRight = style({
  prop: "borderRight",
  themeKey: "borders",
  transform: getBorder
});
var borderBottom = style({
  prop: "borderBottom",
  themeKey: "borders",
  transform: getBorder
});
var borderLeft = style({
  prop: "borderLeft",
  themeKey: "borders",
  transform: getBorder
});
var borderColor = style({
  prop: "borderColor",
  themeKey: "palette"
});
var borderTopColor = style({
  prop: "borderTopColor",
  themeKey: "palette"
});
var borderRightColor = style({
  prop: "borderRightColor",
  themeKey: "palette"
});
var borderBottomColor = style({
  prop: "borderBottomColor",
  themeKey: "palette"
});
var borderLeftColor = style({
  prop: "borderLeftColor",
  themeKey: "palette"
});
var borderRadius = (props) => {
  if (props.borderRadius !== void 0 && props.borderRadius !== null) {
    const transformer = createUnaryUnit(props.theme, "shape.borderRadius", 4);
    const styleFromPropValue = (propValue) => ({
      borderRadius: getValue$1(transformer, propValue)
    });
    return handleBreakpoints(props, props.borderRadius, styleFromPropValue);
  }
  return null;
};
borderRadius.propTypes = {};
borderRadius.filterProps = ["borderRadius"];
var borders = compose(border, borderTop, borderRight, borderBottom, borderLeft, borderColor, borderTopColor, borderRightColor, borderBottomColor, borderLeftColor, borderRadius);
var displayPrint = style({
  prop: "displayPrint",
  cssProperty: false,
  transform: (value) => ({
    "@media print": {
      display: value
    }
  })
});
var displayRaw = style({
  prop: "display"
});
var overflow = style({
  prop: "overflow"
});
var textOverflow = style({
  prop: "textOverflow"
});
var visibility = style({
  prop: "visibility"
});
var whiteSpace = style({
  prop: "whiteSpace"
});
var display = compose(displayPrint, displayRaw, overflow, textOverflow, visibility, whiteSpace);
var flexBasis = style({
  prop: "flexBasis"
});
var flexDirection = style({
  prop: "flexDirection"
});
var flexWrap = style({
  prop: "flexWrap"
});
var justifyContent = style({
  prop: "justifyContent"
});
var alignItems = style({
  prop: "alignItems"
});
var alignContent = style({
  prop: "alignContent"
});
var order = style({
  prop: "order"
});
var flex = style({
  prop: "flex"
});
var flexGrow = style({
  prop: "flexGrow"
});
var flexShrink = style({
  prop: "flexShrink"
});
var alignSelf = style({
  prop: "alignSelf"
});
var justifyItems = style({
  prop: "justifyItems"
});
var justifySelf = style({
  prop: "justifySelf"
});
var flexbox = compose(flexBasis, flexDirection, flexWrap, justifyContent, alignItems, alignContent, order, flex, flexGrow, flexShrink, alignSelf, justifyItems, justifySelf);
var gap = (props) => {
  if (props.gap !== void 0 && props.gap !== null) {
    const transformer = createUnaryUnit(props.theme, "spacing", 8);
    const styleFromPropValue = (propValue) => ({
      gap: getValue$1(transformer, propValue)
    });
    return handleBreakpoints(props, props.gap, styleFromPropValue);
  }
  return null;
};
gap.propTypes = {};
gap.filterProps = ["gap"];
var columnGap = (props) => {
  if (props.columnGap !== void 0 && props.columnGap !== null) {
    const transformer = createUnaryUnit(props.theme, "spacing", 8);
    const styleFromPropValue = (propValue) => ({
      columnGap: getValue$1(transformer, propValue)
    });
    return handleBreakpoints(props, props.columnGap, styleFromPropValue);
  }
  return null;
};
columnGap.propTypes = {};
columnGap.filterProps = ["columnGap"];
var rowGap = (props) => {
  if (props.rowGap !== void 0 && props.rowGap !== null) {
    const transformer = createUnaryUnit(props.theme, "spacing", 8);
    const styleFromPropValue = (propValue) => ({
      rowGap: getValue$1(transformer, propValue)
    });
    return handleBreakpoints(props, props.rowGap, styleFromPropValue);
  }
  return null;
};
rowGap.propTypes = {};
rowGap.filterProps = ["rowGap"];
var gridColumn = style({
  prop: "gridColumn"
});
var gridRow = style({
  prop: "gridRow"
});
var gridAutoFlow = style({
  prop: "gridAutoFlow"
});
var gridAutoColumns = style({
  prop: "gridAutoColumns"
});
var gridAutoRows = style({
  prop: "gridAutoRows"
});
var gridTemplateColumns = style({
  prop: "gridTemplateColumns"
});
var gridTemplateRows = style({
  prop: "gridTemplateRows"
});
var gridTemplateAreas = style({
  prop: "gridTemplateAreas"
});
var gridArea = style({
  prop: "gridArea"
});
var grid = compose(gap, columnGap, rowGap, gridColumn, gridRow, gridAutoFlow, gridAutoColumns, gridAutoRows, gridTemplateColumns, gridTemplateRows, gridTemplateAreas, gridArea);
var color = style({
  prop: "color",
  themeKey: "palette"
});
var bgcolor = style({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette"
});
var backgroundColor = style({
  prop: "backgroundColor",
  themeKey: "palette"
});
var palette = compose(color, bgcolor, backgroundColor);
var position = style({
  prop: "position"
});
var zIndex = style({
  prop: "zIndex",
  themeKey: "zIndex"
});
var top = style({
  prop: "top"
});
var right = style({
  prop: "right"
});
var bottom = style({
  prop: "bottom"
});
var left = style({
  prop: "left"
});
var positions = compose(position, zIndex, top, right, bottom, left);
var boxShadow = style({
  prop: "boxShadow",
  themeKey: "shadows"
});
function transform(value) {
  return value <= 1 && value !== 0 ? `${value * 100}%` : value;
}
var width = style({
  prop: "width",
  transform
});
var maxWidth = (props) => {
  if (props.maxWidth !== void 0 && props.maxWidth !== null) {
    const styleFromPropValue = (propValue) => {
      var _props$theme, _props$theme$breakpoi, _props$theme$breakpoi2;
      const breakpoint = ((_props$theme = props.theme) == null ? void 0 : (_props$theme$breakpoi = _props$theme.breakpoints) == null ? void 0 : (_props$theme$breakpoi2 = _props$theme$breakpoi.values) == null ? void 0 : _props$theme$breakpoi2[propValue]) || values[propValue];
      return {
        maxWidth: breakpoint || transform(propValue)
      };
    };
    return handleBreakpoints(props, props.maxWidth, styleFromPropValue);
  }
  return null;
};
maxWidth.filterProps = ["maxWidth"];
var minWidth = style({
  prop: "minWidth",
  transform
});
var height = style({
  prop: "height",
  transform
});
var maxHeight = style({
  prop: "maxHeight",
  transform
});
var minHeight = style({
  prop: "minHeight",
  transform
});
var sizeWidth = style({
  prop: "size",
  cssProperty: "width",
  transform
});
var sizeHeight = style({
  prop: "size",
  cssProperty: "height",
  transform
});
var boxSizing = style({
  prop: "boxSizing"
});
var sizing = compose(width, maxWidth, minWidth, height, maxHeight, minHeight, boxSizing);
var fontFamily = style({
  prop: "fontFamily",
  themeKey: "typography"
});
var fontSize = style({
  prop: "fontSize",
  themeKey: "typography"
});
var fontStyle = style({
  prop: "fontStyle",
  themeKey: "typography"
});
var fontWeight = style({
  prop: "fontWeight",
  themeKey: "typography"
});
var letterSpacing = style({
  prop: "letterSpacing"
});
var lineHeight = style({
  prop: "lineHeight"
});
var textAlign = style({
  prop: "textAlign"
});
var typographyVariant = style({
  prop: "typography",
  cssProperty: false,
  themeKey: "typography"
});
var typography = compose(typographyVariant, fontFamily, fontSize, fontStyle, fontWeight, letterSpacing, lineHeight, textAlign);
var filterPropsMapping = {
  borders: borders.filterProps,
  display: display.filterProps,
  flexbox: flexbox.filterProps,
  grid: grid.filterProps,
  positions: positions.filterProps,
  palette: palette.filterProps,
  shadows: boxShadow.filterProps,
  sizing: sizing.filterProps,
  spacing: spacing.filterProps,
  typography: typography.filterProps
};
var styleFunctionMapping = {
  borders,
  display,
  flexbox,
  grid,
  positions,
  palette,
  shadows: boxShadow,
  sizing,
  spacing,
  typography
};
var propToStyleFunction = Object.keys(filterPropsMapping).reduce((acc, styleFnName) => {
  filterPropsMapping[styleFnName].forEach((propName) => {
    acc[propName] = styleFunctionMapping[styleFnName];
  });
  return acc;
}, {});
function getThemeValue(prop, value, theme) {
  const inputProps = {
    [prop]: value,
    theme
  };
  const styleFunction = propToStyleFunction[prop];
  return styleFunction ? styleFunction(inputProps) : {
    [prop]: value
  };
}
function objectsHaveSameKeys(...objects) {
  const allKeys = objects.reduce((keys2, object2) => keys2.concat(Object.keys(object2)), []);
  const union = new Set(allKeys);
  return objects.every((object2) => union.size === Object.keys(object2).length);
}
function callIfFn(maybeFn, arg) {
  return typeof maybeFn === "function" ? maybeFn(arg) : maybeFn;
}
function styleFunctionSx(props) {
  const {
    sx: styles2,
    theme = {}
  } = props || {};
  if (!styles2) {
    return null;
  }
  if (typeof styles2 === "function") {
    return styles2(theme);
  }
  if (typeof styles2 !== "object") {
    return styles2;
  }
  const emptyBreakpoints = createEmptyBreakpointObject(theme.breakpoints);
  const breakpointsKeys = Object.keys(emptyBreakpoints);
  let css2 = emptyBreakpoints;
  Object.keys(styles2).forEach((styleKey) => {
    const value = callIfFn(styles2[styleKey], theme);
    if (typeof value === "object") {
      if (propToStyleFunction[styleKey]) {
        css2 = merge(css2, getThemeValue(styleKey, value, theme));
      } else {
        const breakpointsValues = handleBreakpoints({
          theme
        }, value, (x3) => ({
          [styleKey]: x3
        }));
        if (objectsHaveSameKeys(breakpointsValues, value)) {
          css2[styleKey] = styleFunctionSx({
            sx: value,
            theme
          });
        } else {
          css2 = merge(css2, breakpointsValues);
        }
      }
    } else {
      css2 = merge(css2, getThemeValue(styleKey, value, theme));
    }
  });
  return removeUnusedBreakpoints(breakpointsKeys, css2);
}
styleFunctionSx.filterProps = ["sx"];
var _excluded = ["values", "unit", "step"];
function createBreakpoints(breakpoints2) {
  const {
    values: values3 = {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536
    },
    unit = "px",
    step = 5
  } = breakpoints2, other = _objectWithoutPropertiesLoose(breakpoints2, _excluded);
  const keys2 = Object.keys(values3);
  function up(key) {
    const value = typeof values3[key] === "number" ? values3[key] : key;
    return `@media (min-width:${value}${unit})`;
  }
  function down(key) {
    const value = typeof values3[key] === "number" ? values3[key] : key;
    return `@media (max-width:${value - step / 100}${unit})`;
  }
  function between(start2, end2) {
    const endIndex = keys2.indexOf(end2);
    return `@media (min-width:${typeof values3[start2] === "number" ? values3[start2] : start2}${unit}) and (max-width:${(endIndex !== -1 && typeof values3[keys2[endIndex]] === "number" ? values3[keys2[endIndex]] : end2) - step / 100}${unit})`;
  }
  function only(key) {
    if (keys2.indexOf(key) + 1 < keys2.length) {
      return between(key, keys2[keys2.indexOf(key) + 1]);
    }
    return up(key);
  }
  return _extends({
    keys: keys2,
    values: values3,
    up,
    down,
    between,
    only,
    unit
  }, other);
}
var shape = {
  borderRadius: 4
};
function createSpacing(spacingInput = 8) {
  if (spacingInput.mui) {
    return spacingInput;
  }
  const transform2 = createUnarySpacing({
    spacing: spacingInput
  });
  const spacing2 = (...argsInput) => {
    const args = argsInput.length === 0 ? [1] : argsInput;
    return args.map((argument) => {
      const output = transform2(argument);
      return typeof output === "number" ? `${output}px` : output;
    }).join(" ");
  };
  spacing2.mui = true;
  return spacing2;
}
var _excluded$1 = ["breakpoints", "palette", "spacing", "shape"];
function createTheme(options = {}, ...args) {
  const {
    breakpoints: breakpointsInput = {},
    palette: paletteInput = {},
    spacing: spacingInput,
    shape: shapeInput = {}
  } = options, other = _objectWithoutPropertiesLoose(options, _excluded$1);
  const breakpoints2 = createBreakpoints(breakpointsInput);
  const spacing2 = createSpacing(spacingInput);
  let muiTheme = deepmerge({
    breakpoints: breakpoints2,
    direction: "ltr",
    components: {},
    palette: _extends({
      mode: "light"
    }, paletteInput),
    spacing: spacing2,
    shape: _extends({}, shape, shapeInput)
  }, other);
  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);
  return muiTheme;
}
var ThemeContext$1 = /* @__PURE__ */ react.createContext(null);
function useTheme() {
  const theme = react.useContext(ThemeContext$1);
  return theme;
}
function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0;
}
function useTheme$1(defaultTheme2 = null) {
  const contextTheme = useTheme();
  return !contextTheme || isObjectEmpty(contextTheme) ? defaultTheme2 : contextTheme;
}
var systemDefaultTheme = createTheme();
function useTheme$2(defaultTheme2 = systemDefaultTheme) {
  return useTheme$1(defaultTheme2);
}
var _excluded$2 = ["variant"];
function isEmpty$1(string2) {
  return string2.length === 0;
}
function propsToClassKey(props) {
  const {
    variant
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$2);
  let classKey = variant || "";
  Object.keys(other).sort().forEach((key) => {
    if (key === "color") {
      classKey += isEmpty$1(classKey) ? props[key] : capitalize(props[key]);
    } else {
      classKey += `${isEmpty$1(classKey) ? key : capitalize(key)}${capitalize(props[key].toString())}`;
    }
  });
  return classKey;
}
var _excluded$3 = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
var _excluded2 = ["theme"];
var _excluded3 = ["theme"];
function isEmpty$2(obj) {
  return Object.keys(obj).length === 0;
}
var getStyleOverrides = (name, theme) => {
  if (theme.components && theme.components[name] && theme.components[name].styleOverrides) {
    return theme.components[name].styleOverrides;
  }
  return null;
};
var getVariantStyles = (name, theme) => {
  let variants = [];
  if (theme && theme.components && theme.components[name] && theme.components[name].variants) {
    variants = theme.components[name].variants;
  }
  const variantsStyles = {};
  variants.forEach((definition) => {
    const key = propsToClassKey(definition.props);
    variantsStyles[key] = definition.style;
  });
  return variantsStyles;
};
var variantsResolver = (props, styles2, theme, name) => {
  var _theme$components, _theme$components$nam;
  const {
    ownerState = {}
  } = props;
  const variantsStyles = [];
  const themeVariants = theme == null ? void 0 : (_theme$components = theme.components) == null ? void 0 : (_theme$components$nam = _theme$components[name]) == null ? void 0 : _theme$components$nam.variants;
  if (themeVariants) {
    themeVariants.forEach((themeVariant) => {
      let isMatch = true;
      Object.keys(themeVariant.props).forEach((key) => {
        if (ownerState[key] !== themeVariant.props[key] && props[key] !== themeVariant.props[key]) {
          isMatch = false;
        }
      });
      if (isMatch) {
        variantsStyles.push(styles2[propsToClassKey(themeVariant.props)]);
      }
    });
  }
  return variantsStyles;
};
function shouldForwardProp(prop) {
  return prop !== "ownerState" && prop !== "theme" && prop !== "sx" && prop !== "as";
}
var systemDefaultTheme$1 = createTheme();
function createStyled$1(input = {}) {
  const {
    defaultTheme: defaultTheme2 = systemDefaultTheme$1,
    rootShouldForwardProp: rootShouldForwardProp2 = shouldForwardProp,
    slotShouldForwardProp: slotShouldForwardProp2 = shouldForwardProp
  } = input;
  return (tag, inputOptions = {}) => {
    const {
      name: componentName,
      slot: componentSlot,
      skipVariantsResolver: inputSkipVariantsResolver,
      skipSx: inputSkipSx,
      overridesResolver
    } = inputOptions, options = _objectWithoutPropertiesLoose(inputOptions, _excluded$3);
    const skipVariantsResolver = inputSkipVariantsResolver !== void 0 ? inputSkipVariantsResolver : componentSlot && componentSlot !== "Root" || false;
    const skipSx = inputSkipSx || false;
    let label;
    let shouldForwardPropOption = shouldForwardProp;
    if (componentSlot === "Root") {
      shouldForwardPropOption = rootShouldForwardProp2;
    } else if (componentSlot) {
      shouldForwardPropOption = slotShouldForwardProp2;
    }
    const defaultStyledResolver = styled(tag, _extends({
      shouldForwardProp: shouldForwardPropOption,
      label
    }, options));
    const muiStyledResolver = (styleArg, ...expressions) => {
      const expressionsWithDefaultTheme = expressions ? expressions.map((stylesArg) => {
        return typeof stylesArg === "function" ? (_ref) => {
          let {
            theme: themeInput
          } = _ref, other = _objectWithoutPropertiesLoose(_ref, _excluded2);
          return stylesArg(_extends({
            theme: isEmpty$2(themeInput) ? defaultTheme2 : themeInput
          }, other));
        } : stylesArg;
      }) : [];
      let transformedStyleArg = styleArg;
      if (componentName && overridesResolver) {
        expressionsWithDefaultTheme.push((props) => {
          const theme = isEmpty$2(props.theme) ? defaultTheme2 : props.theme;
          const styleOverrides = getStyleOverrides(componentName, theme);
          if (styleOverrides) {
            return overridesResolver(props, styleOverrides);
          }
          return null;
        });
      }
      if (componentName && !skipVariantsResolver) {
        expressionsWithDefaultTheme.push((props) => {
          const theme = isEmpty$2(props.theme) ? defaultTheme2 : props.theme;
          return variantsResolver(props, getVariantStyles(componentName, theme), theme, componentName);
        });
      }
      if (!skipSx) {
        expressionsWithDefaultTheme.push((props) => {
          const theme = isEmpty$2(props.theme) ? defaultTheme2 : props.theme;
          return styleFunctionSx(_extends({}, props, {
            theme
          }));
        });
      }
      const numOfCustomFnsApplied = expressionsWithDefaultTheme.length - expressions.length;
      if (Array.isArray(styleArg) && numOfCustomFnsApplied > 0) {
        const placeholders = new Array(numOfCustomFnsApplied).fill("");
        transformedStyleArg = [...styleArg, ...placeholders];
        transformedStyleArg.raw = [...styleArg.raw, ...placeholders];
      } else if (typeof styleArg === "function") {
        transformedStyleArg = (_ref2) => {
          let {
            theme: themeInput
          } = _ref2, other = _objectWithoutPropertiesLoose(_ref2, _excluded3);
          return styleArg(_extends({
            theme: isEmpty$2(themeInput) ? defaultTheme2 : themeInput
          }, other));
        };
      }
      const Component2 = defaultStyledResolver(transformedStyleArg, ...expressionsWithDefaultTheme);
      return Component2;
    };
    return muiStyledResolver;
  };
}
function getThemeProps(params) {
  const {
    theme,
    name,
    props
  } = params;
  if (!theme || !theme.components || !theme.components[name] || !theme.components[name].defaultProps) {
    return props;
  }
  const output = _extends({}, props);
  const defaultProps2 = theme.components[name].defaultProps;
  let propName;
  for (propName in defaultProps2) {
    if (output[propName] === void 0) {
      output[propName] = defaultProps2[propName];
    }
  }
  return output;
}
function useThemeProps({
  props,
  name,
  defaultTheme: defaultTheme2
}) {
  const theme = useTheme$2(defaultTheme2);
  const mergedProps = getThemeProps({
    theme,
    name,
    props
  });
  return mergedProps;
}
function clamp(value, min2 = 0, max2 = 1) {
  return Math.min(Math.max(min2, value), max2);
}
function hexToRgb(color2) {
  color2 = color2.substr(1);
  const re3 = new RegExp(`.{1,${color2.length >= 6 ? 2 : 1}}`, "g");
  let colors = color2.match(re3);
  if (colors && colors[0].length === 1) {
    colors = colors.map((n5) => n5 + n5);
  }
  return colors ? `rgb${colors.length === 4 ? "a" : ""}(${colors.map((n5, index) => {
    return index < 3 ? parseInt(n5, 16) : Math.round(parseInt(n5, 16) / 255 * 1e3) / 1e3;
  }).join(", ")})` : "";
}
function intToHex(int) {
  const hex = int.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}
function decomposeColor(color2) {
  if (color2.type) {
    return color2;
  }
  if (color2.charAt(0) === "#") {
    return decomposeColor(hexToRgb(color2));
  }
  const marker = color2.indexOf("(");
  const type = color2.substring(0, marker);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(type) === -1) {
    throw new Error(formatMuiErrorMessage(9, color2));
  }
  let values3 = color2.substring(marker + 1, color2.length - 1);
  let colorSpace;
  if (type === "color") {
    values3 = values3.split(" ");
    colorSpace = values3.shift();
    if (values3.length === 4 && values3[3].charAt(0) === "/") {
      values3[3] = values3[3].substr(1);
    }
    if (["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(colorSpace) === -1) {
      throw new Error(formatMuiErrorMessage(10, colorSpace));
    }
  } else {
    values3 = values3.split(",");
  }
  values3 = values3.map((value) => parseFloat(value));
  return {
    type,
    values: values3,
    colorSpace
  };
}
function recomposeColor(color2) {
  const {
    type,
    colorSpace
  } = color2;
  let {
    values: values3
  } = color2;
  if (type.indexOf("rgb") !== -1) {
    values3 = values3.map((n5, i2) => i2 < 3 ? parseInt(n5, 10) : n5);
  } else if (type.indexOf("hsl") !== -1) {
    values3[1] = `${values3[1]}%`;
    values3[2] = `${values3[2]}%`;
  }
  if (type.indexOf("color") !== -1) {
    values3 = `${colorSpace} ${values3.join(" ")}`;
  } else {
    values3 = `${values3.join(", ")}`;
  }
  return `${type}(${values3})`;
}
function rgbToHex(color2) {
  if (color2.indexOf("#") === 0) {
    return color2;
  }
  const {
    values: values3
  } = decomposeColor(color2);
  return `#${values3.map((n5, i2) => intToHex(i2 === 3 ? Math.round(255 * n5) : n5)).join("")}`;
}
function hslToRgb(color2) {
  color2 = decomposeColor(color2);
  const {
    values: values3
  } = color2;
  const h4 = values3[0];
  const s = values3[1] / 100;
  const l4 = values3[2] / 100;
  const a3 = s * Math.min(l4, 1 - l4);
  const f4 = (n5, k5 = (n5 + h4 / 30) % 12) => l4 - a3 * Math.max(Math.min(k5 - 3, 9 - k5, 1), -1);
  let type = "rgb";
  const rgb = [Math.round(f4(0) * 255), Math.round(f4(8) * 255), Math.round(f4(4) * 255)];
  if (color2.type === "hsla") {
    type += "a";
    rgb.push(values3[3]);
  }
  return recomposeColor({
    type,
    values: rgb
  });
}
function getLuminance(color2) {
  color2 = decomposeColor(color2);
  let rgb = color2.type === "hsl" ? decomposeColor(hslToRgb(color2)).values : color2.values;
  rgb = rgb.map((val) => {
    if (color2.type !== "color") {
      val /= 255;
    }
    return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4;
  });
  return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3));
}
function getContrastRatio(foreground, background) {
  const lumA = getLuminance(foreground);
  const lumB = getLuminance(background);
  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
}
function alpha(color2, value) {
  color2 = decomposeColor(color2);
  value = clamp(value);
  if (color2.type === "rgb" || color2.type === "hsl") {
    color2.type += "a";
  }
  if (color2.type === "color") {
    color2.values[3] = `/${value}`;
  } else {
    color2.values[3] = value;
  }
  return recomposeColor(color2);
}
function darken(color2, coefficient) {
  color2 = decomposeColor(color2);
  coefficient = clamp(coefficient);
  if (color2.type.indexOf("hsl") !== -1) {
    color2.values[2] *= 1 - coefficient;
  } else if (color2.type.indexOf("rgb") !== -1 || color2.type.indexOf("color") !== -1) {
    for (let i2 = 0; i2 < 3; i2 += 1) {
      color2.values[i2] *= 1 - coefficient;
    }
  }
  return recomposeColor(color2);
}
function lighten(color2, coefficient) {
  color2 = decomposeColor(color2);
  coefficient = clamp(coefficient);
  if (color2.type.indexOf("hsl") !== -1) {
    color2.values[2] += (100 - color2.values[2]) * coefficient;
  } else if (color2.type.indexOf("rgb") !== -1) {
    for (let i2 = 0; i2 < 3; i2 += 1) {
      color2.values[i2] += (255 - color2.values[i2]) * coefficient;
    }
  } else if (color2.type.indexOf("color") !== -1) {
    for (let i2 = 0; i2 < 3; i2 += 1) {
      color2.values[i2] += (1 - color2.values[i2]) * coefficient;
    }
  }
  return recomposeColor(color2);
}
function emphasize(color2, coefficient = 0.15) {
  return getLuminance(color2) > 0.5 ? darken(color2, coefficient) : lighten(color2, coefficient);
}

// docs/snowpack/pkg/common/useThemeProps-5b6086ae.js
var interopRequireDefault = createCommonjsModule(function(module) {
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
  module.exports = _interopRequireDefault;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});
var objectWithoutPropertiesLoose = createCommonjsModule(function(module) {
  function _objectWithoutPropertiesLoose3(source, excluded) {
    if (source == null)
      return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i2;
    for (i2 = 0; i2 < sourceKeys.length; i2++) {
      key = sourceKeys[i2];
      if (excluded.indexOf(key) >= 0)
        continue;
      target[key] = source[key];
    }
    return target;
  }
  module.exports = _objectWithoutPropertiesLoose3;
  module.exports["default"] = module.exports, module.exports.__esModule = true;
});
function chainPropTypes(propType1, propType2) {
  {
    return () => null;
  }
}
var elementAcceptingRef = chainPropTypes(propTypes.element);
elementAcceptingRef.isRequired = chainPropTypes(propTypes.element.isRequired);
var elementTypeAcceptingRef = chainPropTypes(propTypes.elementType);
function exactProp(propTypes2) {
  {
    return propTypes2;
  }
}
/** @license React v17.0.2
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b3 = 60103;
var c4 = 60106;
var d3 = 60107;
var e3 = 60108;
var f2 = 60114;
var g3 = 60109;
var h2 = 60110;
var k3 = 60112;
var l2 = 60113;
var m3 = 60120;
var n3 = 60115;
var p3 = 60116;
var q3 = 60121;
var r3 = 60122;
var u2 = 60117;
var v2 = 60129;
var w2 = 60131;
if (typeof Symbol === "function" && Symbol.for) {
  x3 = Symbol.for;
  b3 = x3("react.element");
  c4 = x3("react.portal");
  d3 = x3("react.fragment");
  e3 = x3("react.strict_mode");
  f2 = x3("react.profiler");
  g3 = x3("react.provider");
  h2 = x3("react.context");
  k3 = x3("react.forward_ref");
  l2 = x3("react.suspense");
  m3 = x3("react.suspense_list");
  n3 = x3("react.memo");
  p3 = x3("react.lazy");
  q3 = x3("react.block");
  r3 = x3("react.server.block");
  u2 = x3("react.fundamental");
  v2 = x3("react.debug_trace_mode");
  w2 = x3("react.legacy_hidden");
}
var x3;
function y4(a3) {
  if (typeof a3 === "object" && a3 !== null) {
    var t3 = a3.$$typeof;
    switch (t3) {
      case b3:
        switch (a3 = a3.type, a3) {
          case d3:
          case f2:
          case e3:
          case l2:
          case m3:
            return a3;
          default:
            switch (a3 = a3 && a3.$$typeof, a3) {
              case h2:
              case k3:
              case p3:
              case n3:
              case g3:
                return a3;
              default:
                return t3;
            }
        }
      case c4:
        return t3;
    }
  }
}
var z3 = g3;
var A3 = b3;
var B3 = k3;
var C2 = d3;
var D3 = p3;
var E3 = n3;
var F4 = c4;
var G3 = f2;
var H3 = e3;
var I3 = l2;
var ContextConsumer2 = h2;
var ContextProvider2 = z3;
var Element3 = A3;
var ForwardRef2 = B3;
var Fragment3 = C2;
var Lazy2 = D3;
var Memo2 = E3;
var Portal2 = F4;
var Profiler3 = G3;
var StrictMode3 = H3;
var Suspense3 = I3;
var isAsyncMode2 = function() {
  return false;
};
var isConcurrentMode2 = function() {
  return false;
};
var isContextConsumer2 = function(a3) {
  return y4(a3) === h2;
};
var isContextProvider2 = function(a3) {
  return y4(a3) === g3;
};
var isElement2 = function(a3) {
  return typeof a3 === "object" && a3 !== null && a3.$$typeof === b3;
};
var isForwardRef2 = function(a3) {
  return y4(a3) === k3;
};
var isFragment2 = function(a3) {
  return y4(a3) === d3;
};
var isLazy2 = function(a3) {
  return y4(a3) === p3;
};
var isMemo2 = function(a3) {
  return y4(a3) === n3;
};
var isPortal2 = function(a3) {
  return y4(a3) === c4;
};
var isProfiler2 = function(a3) {
  return y4(a3) === f2;
};
var isStrictMode2 = function(a3) {
  return y4(a3) === e3;
};
var isSuspense2 = function(a3) {
  return y4(a3) === l2;
};
var isValidElementType2 = function(a3) {
  return typeof a3 === "string" || typeof a3 === "function" || a3 === d3 || a3 === f2 || a3 === v2 || a3 === e3 || a3 === l2 || a3 === m3 || a3 === w2 || typeof a3 === "object" && a3 !== null && (a3.$$typeof === p3 || a3.$$typeof === n3 || a3.$$typeof === g3 || a3.$$typeof === h2 || a3.$$typeof === k3 || a3.$$typeof === u2 || a3.$$typeof === q3 || a3[0] === r3) ? true : false;
};
var typeOf2 = y4;
var reactIs_production_min2 = {
  ContextConsumer: ContextConsumer2,
  ContextProvider: ContextProvider2,
  Element: Element3,
  ForwardRef: ForwardRef2,
  Fragment: Fragment3,
  Lazy: Lazy2,
  Memo: Memo2,
  Portal: Portal2,
  Profiler: Profiler3,
  StrictMode: StrictMode3,
  Suspense: Suspense3,
  isAsyncMode: isAsyncMode2,
  isConcurrentMode: isConcurrentMode2,
  isContextConsumer: isContextConsumer2,
  isContextProvider: isContextProvider2,
  isElement: isElement2,
  isForwardRef: isForwardRef2,
  isFragment: isFragment2,
  isLazy: isLazy2,
  isMemo: isMemo2,
  isPortal: isPortal2,
  isProfiler: isProfiler2,
  isStrictMode: isStrictMode2,
  isSuspense: isSuspense2,
  isValidElementType: isValidElementType2,
  typeOf: typeOf2
};
var reactIs2 = createCommonjsModule(function(module) {
  {
    module.exports = reactIs_production_min2;
  }
});
var fnNameMatchRegex = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function getFunctionName(fn2) {
  const match = `${fn2}`.match(fnNameMatchRegex);
  const name = match && match[1];
  return name || "";
}
function getFunctionComponentName(Component2, fallback = "") {
  return Component2.displayName || Component2.name || getFunctionName(Component2) || fallback;
}
function getWrappedName(outerType, innerType, wrapperName) {
  const functionName = getFunctionComponentName(innerType);
  return outerType.displayName || (functionName !== "" ? `${wrapperName}(${functionName})` : wrapperName);
}
function getDisplayName(Component2) {
  if (Component2 == null) {
    return void 0;
  }
  if (typeof Component2 === "string") {
    return Component2;
  }
  if (typeof Component2 === "function") {
    return getFunctionComponentName(Component2, "Component");
  }
  if (typeof Component2 === "object") {
    switch (Component2.$$typeof) {
      case reactIs2.ForwardRef:
        return getWrappedName(Component2, Component2.render, "ForwardRef");
      case reactIs2.Memo:
        return getWrappedName(Component2, Component2.type, "memo");
      default:
        return void 0;
    }
  }
  return void 0;
}
function HTMLElementType(props, propName, componentName, location, propFullName) {
  {
    return null;
  }
}
var ponyfillGlobal = typeof window != "undefined" && window.Math == Math ? window : typeof self != "undefined" && self.Math == Math ? self : Function("return this")();
var refType = propTypes.oneOfType([propTypes.func, propTypes.object]);
function deprecatedPropType(validator, reason) {
  {
    return () => null;
  }
}
function requirePropFactory(componentNameInError, Component2) {
  {
    return () => null;
  }
}
function useId(idOverride) {
  const [defaultId, setDefaultId] = react.useState(idOverride);
  const id2 = idOverride || defaultId;
  react.useEffect(() => {
    if (defaultId == null) {
      setDefaultId(`mui-${Math.round(Math.random() * 1e9)}`);
    }
  }, [defaultId]);
  return id2;
}
function unsupportedProp(props, propName, componentName, location, propFullName) {
  {
    return null;
  }
}
var hadKeyboardEvent = true;
var hadFocusVisibleRecently = false;
var hadFocusVisibleRecentlyTimeout = null;
var inputTypesWhitelist = {
  text: true,
  search: true,
  url: true,
  tel: true,
  email: true,
  password: true,
  number: true,
  date: true,
  month: true,
  week: true,
  time: true,
  datetime: true,
  "datetime-local": true
};
function focusTriggersKeyboardModality(node) {
  const {
    type,
    tagName
  } = node;
  if (tagName === "INPUT" && inputTypesWhitelist[type] && !node.readOnly) {
    return true;
  }
  if (tagName === "TEXTAREA" && !node.readOnly) {
    return true;
  }
  if (node.isContentEditable) {
    return true;
  }
  return false;
}
function handleKeyDown(event) {
  if (event.metaKey || event.altKey || event.ctrlKey) {
    return;
  }
  hadKeyboardEvent = true;
}
function handlePointerDown() {
  hadKeyboardEvent = false;
}
function handleVisibilityChange() {
  if (this.visibilityState === "hidden") {
    if (hadFocusVisibleRecently) {
      hadKeyboardEvent = true;
    }
  }
}
function prepare(doc) {
  doc.addEventListener("keydown", handleKeyDown, true);
  doc.addEventListener("mousedown", handlePointerDown, true);
  doc.addEventListener("pointerdown", handlePointerDown, true);
  doc.addEventListener("touchstart", handlePointerDown, true);
  doc.addEventListener("visibilitychange", handleVisibilityChange, true);
}
function isFocusVisible(event) {
  const {
    target
  } = event;
  try {
    return target.matches(":focus-visible");
  } catch (error) {
  }
  return hadKeyboardEvent || focusTriggersKeyboardModality(target);
}
function useIsFocusVisible() {
  const ref = react.useCallback((node) => {
    if (node != null) {
      prepare(node.ownerDocument);
    }
  }, []);
  const isFocusVisibleRef = react.useRef(false);
  function handleBlurVisible() {
    if (isFocusVisibleRef.current) {
      hadFocusVisibleRecently = true;
      window.clearTimeout(hadFocusVisibleRecentlyTimeout);
      hadFocusVisibleRecentlyTimeout = window.setTimeout(() => {
        hadFocusVisibleRecently = false;
      }, 100);
      isFocusVisibleRef.current = false;
      return true;
    }
    return false;
  }
  function handleFocusVisible(event) {
    if (isFocusVisible(event)) {
      isFocusVisibleRef.current = true;
      return true;
    }
    return false;
  }
  return {
    isFocusVisibleRef,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
    ref
  };
}
var cachedType;
function detectScrollType() {
  if (cachedType) {
    return cachedType;
  }
  const dummy = document.createElement("div");
  const container = document.createElement("div");
  container.style.width = "10px";
  container.style.height = "1px";
  dummy.appendChild(container);
  dummy.dir = "rtl";
  dummy.style.fontSize = "14px";
  dummy.style.width = "4px";
  dummy.style.height = "1px";
  dummy.style.position = "absolute";
  dummy.style.top = "-1000px";
  dummy.style.overflow = "scroll";
  document.body.appendChild(dummy);
  cachedType = "reverse";
  if (dummy.scrollLeft > 0) {
    cachedType = "default";
  } else {
    dummy.scrollLeft = 1;
    if (dummy.scrollLeft === 0) {
      cachedType = "negative";
    }
  }
  document.body.removeChild(dummy);
  return cachedType;
}
function getNormalizedScrollLeft(element, direction) {
  const scrollLeft = element.scrollLeft;
  if (direction !== "rtl") {
    return scrollLeft;
  }
  const type = detectScrollType();
  switch (type) {
    case "negative":
      return element.scrollWidth - element.clientWidth + scrollLeft;
    case "reverse":
      return element.scrollWidth - element.clientWidth - scrollLeft;
    default:
      return scrollLeft;
  }
}
var usePreviousProps = (value) => {
  const ref = react.useRef({});
  react.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
var visuallyHidden = {
  border: 0,
  clip: "rect(0 0 0 0)",
  height: "1px",
  margin: -1,
  overflow: "hidden",
  padding: 0,
  position: "absolute",
  whiteSpace: "nowrap",
  width: "1px"
};
function validatorNoop() {
  return null;
}
validatorNoop.isRequired = validatorNoop;
var integerPropType = validatorNoop;
var esm = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  chainPropTypes,
  deepmerge,
  elementAcceptingRef,
  elementTypeAcceptingRef,
  exactProp,
  formatMuiErrorMessage,
  getDisplayName,
  HTMLElementType,
  ponyfillGlobal,
  refType,
  unstable_capitalize: capitalize,
  unstable_createChainedFunction: createChainedFunction,
  unstable_debounce: debounce,
  unstable_deprecatedPropType: deprecatedPropType,
  unstable_isMuiElement: isMuiElement,
  unstable_ownerDocument: ownerDocument,
  unstable_ownerWindow: ownerWindow,
  unstable_requirePropFactory: requirePropFactory,
  unstable_setRef: setRef,
  unstable_useEnhancedEffect: useEnhancedEffect,
  unstable_useId: useId,
  unstable_unsupportedProp: unsupportedProp,
  unstable_useControlled: useControlled,
  unstable_useEventCallback: useEventCallback,
  unstable_useForkRef: useForkRef,
  unstable_useIsFocusVisible: useIsFocusVisible,
  unstable_getScrollbarSize: getScrollbarSize,
  unstable_detectScrollType: detectScrollType,
  unstable_getNormalizedScrollLeft: getNormalizedScrollLeft,
  usePreviousProps,
  visuallyHidden,
  integerPropType
});
var cache = createCache({
  key: "css",
  prepend: true
});
function StyledEngineProvider(props) {
  const {
    injectFirst,
    children
  } = props;
  return injectFirst ? /* @__PURE__ */ jsxRuntime.jsx(CacheProvider, {
    value: cache,
    children
  }) : children;
}
var _excluded4 = ["sx"];
var splitProps = (props) => {
  const result = {
    systemProps: {},
    otherProps: {}
  };
  Object.keys(props).forEach((prop) => {
    if (propToStyleFunction[prop]) {
      result.systemProps[prop] = props[prop];
    } else {
      result.otherProps[prop] = props[prop];
    }
  });
  return result;
};
function extendSxProp(props) {
  const {
    sx: inSx
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded4);
  const {
    systemProps,
    otherProps
  } = splitProps(other);
  return _extends({}, otherProps, {
    sx: _extends({}, systemProps, inSx)
  });
}
var hasSymbol = typeof Symbol === "function" && Symbol.for;
var nested = hasSymbol ? Symbol.for("mui.nested") : "__THEME_NESTED__";
function mergeOuterLocalTheme(outerTheme, localTheme) {
  if (typeof localTheme === "function") {
    const mergedTheme = localTheme(outerTheme);
    return mergedTheme;
  }
  return _extends({}, outerTheme, localTheme);
}
function ThemeProvider(props) {
  const {
    children,
    theme: localTheme
  } = props;
  const outerTheme = useTheme();
  const theme = react.useMemo(() => {
    const output = outerTheme === null ? localTheme : mergeOuterLocalTheme(outerTheme, localTheme);
    if (output != null) {
      output[nested] = outerTheme !== null;
    }
    return output;
  }, [localTheme, outerTheme]);
  return /* @__PURE__ */ jsxRuntime.jsx(ThemeContext$1.Provider, {
    value: theme,
    children
  });
}
var _excluded$12 = ["className", "component"];
function createBox(options = {}) {
  const {
    defaultTheme: defaultTheme2
  } = options;
  const BoxRoot = styled("div")(styleFunctionSx);
  const Box2 = /* @__PURE__ */ react.forwardRef(function Box3(inProps, ref) {
    const theme = useTheme$2(defaultTheme2);
    const _extendSxProp = extendSxProp(inProps), {
      className,
      component = "div"
    } = _extendSxProp, other = _objectWithoutPropertiesLoose(_extendSxProp, _excluded$12);
    return /* @__PURE__ */ jsxRuntime.jsx(BoxRoot, _extends({
      as: component,
      ref,
      className: clsx(className, "MuiBox-root"),
      theme
    }, other));
  });
  return Box2;
}
var Box = createBox();
var styled2 = createStyled$1();
function InnerThemeProvider(props) {
  const theme = useTheme$2();
  return /* @__PURE__ */ jsxRuntime.jsx(ThemeContext.Provider, {
    value: typeof theme === "object" ? theme : {},
    children: props.children
  });
}
function ThemeProvider$1(props) {
  const {
    children,
    theme: localTheme
  } = props;
  return /* @__PURE__ */ jsxRuntime.jsx(ThemeProvider, {
    theme: localTheme,
    children: /* @__PURE__ */ jsxRuntime.jsx(InnerThemeProvider, {
      children
    })
  });
}
var esm$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  css,
  keyframes,
  GlobalStyles,
  StyledEngineProvider,
  borders,
  breakpoints,
  handleBreakpoints,
  mergeBreakpointsInOrder,
  unstable_resolveBreakpointValues: resolveBreakpointValues,
  compose,
  display,
  flexbox,
  grid,
  palette,
  positions,
  shadows: boxShadow,
  sizing,
  spacing,
  style,
  getPath,
  typography,
  unstable_styleFunctionSx: styleFunctionSx,
  unstable_extendSxProp: extendSxProp,
  unstable_getThemeValue: getThemeValue,
  Box,
  createBox,
  createStyled: createStyled$1,
  styled: styled2,
  createTheme,
  createBreakpoints,
  createSpacing,
  shape,
  useThemeProps,
  getThemeProps,
  useTheme: useTheme$2,
  useThemeWithoutDefault: useTheme$1,
  ThemeProvider: ThemeProvider$1,
  border,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft,
  borderColor,
  borderTopColor,
  borderRightColor,
  borderBottomColor,
  borderLeftColor,
  borderRadius,
  flexBasis,
  flexDirection,
  flexWrap,
  justifyContent,
  alignItems,
  alignContent,
  order,
  flex,
  flexGrow,
  flexShrink,
  alignSelf,
  justifyItems,
  justifySelf,
  gap,
  columnGap,
  rowGap,
  gridColumn,
  gridRow,
  gridAutoFlow,
  gridAutoColumns,
  gridAutoRows,
  gridTemplateColumns,
  gridTemplateRows,
  gridTemplateAreas,
  gridArea,
  color,
  bgcolor,
  backgroundColor,
  position,
  zIndex,
  top,
  right,
  bottom,
  left,
  width,
  maxWidth,
  minWidth,
  height,
  maxHeight,
  minHeight,
  sizeWidth,
  sizeHeight,
  boxSizing,
  createUnaryUnit,
  createUnarySpacing,
  getValue: getValue$1,
  getStyleFromPropValue,
  margin,
  padding,
  fontFamily,
  fontSize,
  fontStyle,
  fontWeight,
  letterSpacing,
  lineHeight,
  textAlign,
  typographyVariant,
  shouldForwardProp,
  systemDefaultTheme: systemDefaultTheme$1,
  hexToRgb,
  decomposeColor,
  recomposeColor,
  rgbToHex,
  hslToRgb,
  getLuminance,
  getContrastRatio,
  alpha,
  darken,
  lighten,
  emphasize
});
var createMixins_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = createMixins2;
  var _extends22 = interopRequireDefault(_extends_1);
  function createMixins2(breakpoints2, spacing2, mixins) {
    return (0, _extends22.default)({
      toolbar: {
        minHeight: 56,
        [`${breakpoints2.up("xs")} and (orientation: landscape)`]: {
          minHeight: 48
        },
        [breakpoints2.up("sm")]: {
          minHeight: 64
        }
      }
    }, mixins);
  }
});
var common_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  const common2 = {
    black: "#000",
    white: "#fff"
  };
  var _default = common2;
  exports.default = _default;
});
var grey_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  const grey2 = {
    50: "#fafafa",
    100: "#f5f5f5",
    200: "#eeeeee",
    300: "#e0e0e0",
    400: "#bdbdbd",
    500: "#9e9e9e",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#212121",
    A100: "#f5f5f5",
    A200: "#eeeeee",
    A400: "#bdbdbd",
    A700: "#616161"
  };
  var _default = grey2;
  exports.default = _default;
});
var purple_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  const purple2 = {
    50: "#f3e5f5",
    100: "#e1bee7",
    200: "#ce93d8",
    300: "#ba68c8",
    400: "#ab47bc",
    500: "#9c27b0",
    600: "#8e24aa",
    700: "#7b1fa2",
    800: "#6a1b9a",
    900: "#4a148c",
    A100: "#ea80fc",
    A200: "#e040fb",
    A400: "#d500f9",
    A700: "#aa00ff"
  };
  var _default = purple2;
  exports.default = _default;
});
var red_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  const red2 = {
    50: "#ffebee",
    100: "#ffcdd2",
    200: "#ef9a9a",
    300: "#e57373",
    400: "#ef5350",
    500: "#f44336",
    600: "#e53935",
    700: "#d32f2f",
    800: "#c62828",
    900: "#b71c1c",
    A100: "#ff8a80",
    A200: "#ff5252",
    A400: "#ff1744",
    A700: "#d50000"
  };
  var _default = red2;
  exports.default = _default;
});
var orange_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  const orange2 = {
    50: "#fff3e0",
    100: "#ffe0b2",
    200: "#ffcc80",
    300: "#ffb74d",
    400: "#ffa726",
    500: "#ff9800",
    600: "#fb8c00",
    700: "#f57c00",
    800: "#ef6c00",
    900: "#e65100",
    A100: "#ffd180",
    A200: "#ffab40",
    A400: "#ff9100",
    A700: "#ff6d00"
  };
  var _default = orange2;
  exports.default = _default;
});
var blue_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  const blue2 = {
    50: "#e3f2fd",
    100: "#bbdefb",
    200: "#90caf9",
    300: "#64b5f6",
    400: "#42a5f5",
    500: "#2196f3",
    600: "#1e88e5",
    700: "#1976d2",
    800: "#1565c0",
    900: "#0d47a1",
    A100: "#82b1ff",
    A200: "#448aff",
    A400: "#2979ff",
    A700: "#2962ff"
  };
  var _default = blue2;
  exports.default = _default;
});
var lightBlue_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  const lightBlue2 = {
    50: "#e1f5fe",
    100: "#b3e5fc",
    200: "#81d4fa",
    300: "#4fc3f7",
    400: "#29b6f6",
    500: "#03a9f4",
    600: "#039be5",
    700: "#0288d1",
    800: "#0277bd",
    900: "#01579b",
    A100: "#80d8ff",
    A200: "#40c4ff",
    A400: "#00b0ff",
    A700: "#0091ea"
  };
  var _default = lightBlue2;
  exports.default = _default;
});
var green_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  const green2 = {
    50: "#e8f5e9",
    100: "#c8e6c9",
    200: "#a5d6a7",
    300: "#81c784",
    400: "#66bb6a",
    500: "#4caf50",
    600: "#43a047",
    700: "#388e3c",
    800: "#2e7d32",
    900: "#1b5e20",
    A100: "#b9f6ca",
    A200: "#69f0ae",
    A400: "#00e676",
    A700: "#00c853"
  };
  var _default = green2;
  exports.default = _default;
});
var createPalette_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.dark = void 0;
  exports.default = createPalette2;
  exports.light = void 0;
  var _extends22 = interopRequireDefault(_extends_1);
  var _objectWithoutPropertiesLoose22 = interopRequireDefault(objectWithoutPropertiesLoose);
  var _common = interopRequireDefault(common_1);
  var _grey = interopRequireDefault(grey_1);
  var _purple = interopRequireDefault(purple_1);
  var _red = interopRequireDefault(red_1);
  var _orange = interopRequireDefault(orange_1);
  var _blue = interopRequireDefault(blue_1);
  var _lightBlue = interopRequireDefault(lightBlue_1);
  var _green = interopRequireDefault(green_1);
  const _excluded8 = ["mode", "contrastThreshold", "tonalOffset"];
  const light2 = {
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.6)",
      disabled: "rgba(0, 0, 0, 0.38)"
    },
    divider: "rgba(0, 0, 0, 0.12)",
    background: {
      paper: _common.default.white,
      default: _common.default.white
    },
    action: {
      active: "rgba(0, 0, 0, 0.54)",
      hover: "rgba(0, 0, 0, 0.04)",
      hoverOpacity: 0.04,
      selected: "rgba(0, 0, 0, 0.08)",
      selectedOpacity: 0.08,
      disabled: "rgba(0, 0, 0, 0.26)",
      disabledBackground: "rgba(0, 0, 0, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(0, 0, 0, 0.12)",
      focusOpacity: 0.12,
      activatedOpacity: 0.12
    }
  };
  exports.light = light2;
  const dark2 = {
    text: {
      primary: _common.default.white,
      secondary: "rgba(255, 255, 255, 0.7)",
      disabled: "rgba(255, 255, 255, 0.5)",
      icon: "rgba(255, 255, 255, 0.5)"
    },
    divider: "rgba(255, 255, 255, 0.12)",
    background: {
      paper: "#121212",
      default: "#121212"
    },
    action: {
      active: _common.default.white,
      hover: "rgba(255, 255, 255, 0.08)",
      hoverOpacity: 0.08,
      selected: "rgba(255, 255, 255, 0.16)",
      selectedOpacity: 0.16,
      disabled: "rgba(255, 255, 255, 0.3)",
      disabledBackground: "rgba(255, 255, 255, 0.12)",
      disabledOpacity: 0.38,
      focus: "rgba(255, 255, 255, 0.12)",
      focusOpacity: 0.12,
      activatedOpacity: 0.24
    }
  };
  exports.dark = dark2;
  function addLightOrDark2(intent, direction, shade, tonalOffset) {
    const tonalOffsetLight = tonalOffset.light || tonalOffset;
    const tonalOffsetDark = tonalOffset.dark || tonalOffset * 1.5;
    if (!intent[direction]) {
      if (intent.hasOwnProperty(shade)) {
        intent[direction] = intent[shade];
      } else if (direction === "light") {
        intent.light = (0, esm$1.lighten)(intent.main, tonalOffsetLight);
      } else if (direction === "dark") {
        intent.dark = (0, esm$1.darken)(intent.main, tonalOffsetDark);
      }
    }
  }
  function getDefaultPrimary2(mode = "light") {
    if (mode === "dark") {
      return {
        main: _blue.default[200],
        light: _blue.default[50],
        dark: _blue.default[400]
      };
    }
    return {
      main: _blue.default[700],
      light: _blue.default[400],
      dark: _blue.default[800]
    };
  }
  function getDefaultSecondary2(mode = "light") {
    if (mode === "dark") {
      return {
        main: _purple.default[200],
        light: _purple.default[50],
        dark: _purple.default[400]
      };
    }
    return {
      main: _purple.default[500],
      light: _purple.default[300],
      dark: _purple.default[700]
    };
  }
  function getDefaultError2(mode = "light") {
    if (mode === "dark") {
      return {
        main: _red.default[500],
        light: _red.default[300],
        dark: _red.default[700]
      };
    }
    return {
      main: _red.default[700],
      light: _red.default[400],
      dark: _red.default[800]
    };
  }
  function getDefaultInfo2(mode = "light") {
    if (mode === "dark") {
      return {
        main: _lightBlue.default[400],
        light: _lightBlue.default[300],
        dark: _lightBlue.default[700]
      };
    }
    return {
      main: _lightBlue.default[700],
      light: _lightBlue.default[500],
      dark: _lightBlue.default[900]
    };
  }
  function getDefaultSuccess2(mode = "light") {
    if (mode === "dark") {
      return {
        main: _green.default[400],
        light: _green.default[300],
        dark: _green.default[700]
      };
    }
    return {
      main: _green.default[800],
      light: _green.default[500],
      dark: _green.default[900]
    };
  }
  function getDefaultWarning2(mode = "light") {
    if (mode === "dark") {
      return {
        main: _orange.default[400],
        light: _orange.default[300],
        dark: _orange.default[700]
      };
    }
    return {
      main: "#ED6C02",
      light: _orange.default[500],
      dark: _orange.default[900]
    };
  }
  function createPalette2(palette2) {
    const {
      mode = "light",
      contrastThreshold = 3,
      tonalOffset = 0.2
    } = palette2, other = (0, _objectWithoutPropertiesLoose22.default)(palette2, _excluded8);
    const primary = palette2.primary || getDefaultPrimary2(mode);
    const secondary = palette2.secondary || getDefaultSecondary2(mode);
    const error = palette2.error || getDefaultError2(mode);
    const info = palette2.info || getDefaultInfo2(mode);
    const success = palette2.success || getDefaultSuccess2(mode);
    const warning = palette2.warning || getDefaultWarning2(mode);
    function getContrastText(background) {
      const contrastText = (0, esm$1.getContrastRatio)(background, dark2.text.primary) >= contrastThreshold ? dark2.text.primary : light2.text.primary;
      return contrastText;
    }
    const augmentColor = ({
      color: color2,
      name,
      mainShade = 500,
      lightShade = 300,
      darkShade = 700
    }) => {
      color2 = (0, _extends22.default)({}, color2);
      if (!color2.main && color2[mainShade]) {
        color2.main = color2[mainShade];
      }
      if (!color2.hasOwnProperty("main")) {
        throw new Error((0, esm.formatMuiErrorMessage)(11, name ? ` (${name})` : "", mainShade));
      }
      if (typeof color2.main !== "string") {
        throw new Error((0, esm.formatMuiErrorMessage)(12, name ? ` (${name})` : "", JSON.stringify(color2.main)));
      }
      addLightOrDark2(color2, "light", lightShade, tonalOffset);
      addLightOrDark2(color2, "dark", darkShade, tonalOffset);
      if (!color2.contrastText) {
        color2.contrastText = getContrastText(color2.main);
      }
      return color2;
    };
    const modes2 = {
      dark: dark2,
      light: light2
    };
    const paletteOutput = (0, esm.deepmerge)((0, _extends22.default)({
      common: _common.default,
      mode,
      primary: augmentColor({
        color: primary,
        name: "primary"
      }),
      secondary: augmentColor({
        color: secondary,
        name: "secondary",
        mainShade: "A400",
        lightShade: "A200",
        darkShade: "A700"
      }),
      error: augmentColor({
        color: error,
        name: "error"
      }),
      warning: augmentColor({
        color: warning,
        name: "warning"
      }),
      info: augmentColor({
        color: info,
        name: "info"
      }),
      success: augmentColor({
        color: success,
        name: "success"
      }),
      grey: _grey.default,
      contrastThreshold,
      getContrastText,
      augmentColor,
      tonalOffset
    }, modes2[mode]), other);
    return paletteOutput;
  }
});
var createTypography_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = createTypography2;
  var _extends22 = interopRequireDefault(_extends_1);
  var _objectWithoutPropertiesLoose22 = interopRequireDefault(objectWithoutPropertiesLoose);
  const _excluded8 = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
  function round3(value) {
    return Math.round(value * 1e5) / 1e5;
  }
  const caseAllCaps2 = {
    textTransform: "uppercase"
  };
  const defaultFontFamily2 = '"Roboto", "Helvetica", "Arial", sans-serif';
  function createTypography2(palette2, typography2) {
    const _ref = typeof typography2 === "function" ? typography2(palette2) : typography2, {
      fontFamily: fontFamily2 = defaultFontFamily2,
      fontSize: fontSize2 = 14,
      fontWeightLight = 300,
      fontWeightRegular = 400,
      fontWeightMedium = 500,
      fontWeightBold = 700,
      htmlFontSize = 16,
      allVariants,
      pxToRem: pxToRem2
    } = _ref, other = (0, _objectWithoutPropertiesLoose22.default)(_ref, _excluded8);
    const coef = fontSize2 / 14;
    const pxToRem = pxToRem2 || ((size) => `${size / htmlFontSize * coef}rem`);
    const buildVariant = (fontWeight2, size, lineHeight2, letterSpacing2, casing) => (0, _extends22.default)({
      fontFamily: fontFamily2,
      fontWeight: fontWeight2,
      fontSize: pxToRem(size),
      lineHeight: lineHeight2
    }, fontFamily2 === defaultFontFamily2 ? {
      letterSpacing: `${round3(letterSpacing2 / size)}em`
    } : {}, casing, allVariants);
    const variants = {
      h1: buildVariant(fontWeightLight, 96, 1.167, -1.5),
      h2: buildVariant(fontWeightLight, 60, 1.2, -0.5),
      h3: buildVariant(fontWeightRegular, 48, 1.167, 0),
      h4: buildVariant(fontWeightRegular, 34, 1.235, 0.25),
      h5: buildVariant(fontWeightRegular, 24, 1.334, 0),
      h6: buildVariant(fontWeightMedium, 20, 1.6, 0.15),
      subtitle1: buildVariant(fontWeightRegular, 16, 1.75, 0.15),
      subtitle2: buildVariant(fontWeightMedium, 14, 1.57, 0.1),
      body1: buildVariant(fontWeightRegular, 16, 1.5, 0.15),
      body2: buildVariant(fontWeightRegular, 14, 1.43, 0.15),
      button: buildVariant(fontWeightMedium, 14, 1.75, 0.4, caseAllCaps2),
      caption: buildVariant(fontWeightRegular, 12, 1.66, 0.4),
      overline: buildVariant(fontWeightRegular, 12, 2.66, 1, caseAllCaps2)
    };
    return (0, esm.deepmerge)((0, _extends22.default)({
      htmlFontSize,
      pxToRem,
      fontFamily: fontFamily2,
      fontSize: fontSize2,
      fontWeightLight,
      fontWeightRegular,
      fontWeightMedium,
      fontWeightBold
    }, variants), other, {
      clone: false
    });
  }
});
var shadows_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  const shadowKeyUmbraOpacity2 = 0.2;
  const shadowKeyPenumbraOpacity2 = 0.14;
  const shadowAmbientShadowOpacity2 = 0.12;
  function createShadow2(...px) {
    return [`${px[0]}px ${px[1]}px ${px[2]}px ${px[3]}px rgba(0,0,0,${shadowKeyUmbraOpacity2})`, `${px[4]}px ${px[5]}px ${px[6]}px ${px[7]}px rgba(0,0,0,${shadowKeyPenumbraOpacity2})`, `${px[8]}px ${px[9]}px ${px[10]}px ${px[11]}px rgba(0,0,0,${shadowAmbientShadowOpacity2})`].join(",");
  }
  const shadows2 = ["none", createShadow2(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), createShadow2(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), createShadow2(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), createShadow2(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), createShadow2(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), createShadow2(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), createShadow2(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), createShadow2(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), createShadow2(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), createShadow2(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), createShadow2(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), createShadow2(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), createShadow2(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), createShadow2(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), createShadow2(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), createShadow2(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), createShadow2(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), createShadow2(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), createShadow2(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), createShadow2(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), createShadow2(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), createShadow2(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), createShadow2(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), createShadow2(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)];
  var _default = shadows2;
  exports.default = _default;
});
var createTransitions_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = createTransitions2;
  exports.easing = exports.duration = void 0;
  var _objectWithoutPropertiesLoose22 = interopRequireDefault(objectWithoutPropertiesLoose);
  var _extends22 = interopRequireDefault(_extends_1);
  const _excluded8 = ["duration", "easing", "delay"];
  const easing2 = {
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
  };
  exports.easing = easing2;
  const duration2 = {
    shortest: 150,
    shorter: 200,
    short: 250,
    standard: 300,
    complex: 375,
    enteringScreen: 225,
    leavingScreen: 195
  };
  exports.duration = duration2;
  function formatMs2(milliseconds) {
    return `${Math.round(milliseconds)}ms`;
  }
  function getAutoHeightDuration2(height2) {
    if (!height2) {
      return 0;
    }
    const constant = height2 / 36;
    return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
  }
  function createTransitions2(inputTransitions) {
    const mergedEasing = (0, _extends22.default)({}, easing2, inputTransitions.easing);
    const mergedDuration = (0, _extends22.default)({}, duration2, inputTransitions.duration);
    const create = (props = ["all"], options = {}) => {
      const {
        duration: durationOption = mergedDuration.standard,
        easing: easingOption = mergedEasing.easeInOut,
        delay = 0
      } = options, other = (0, _objectWithoutPropertiesLoose22.default)(options, _excluded8);
      return (Array.isArray(props) ? props : [props]).map((animatedProp) => `${animatedProp} ${typeof durationOption === "string" ? durationOption : formatMs2(durationOption)} ${easingOption} ${typeof delay === "string" ? delay : formatMs2(delay)}`).join(",");
    };
    return (0, _extends22.default)({
      getAutoHeightDuration: getAutoHeightDuration2,
      create
    }, inputTransitions, {
      easing: mergedEasing,
      duration: mergedDuration
    });
  }
});
var zIndex_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  const zIndex3 = {
    mobileStepper: 1e3,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500
  };
  var _default = zIndex3;
  exports.default = _default;
});
var createTheme_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.createMuiTheme = createMuiTheme;
  exports.default = void 0;
  var _extends22 = interopRequireDefault(_extends_1);
  var _objectWithoutPropertiesLoose22 = interopRequireDefault(objectWithoutPropertiesLoose);
  var _createMixins = interopRequireDefault(createMixins_1);
  var _createPalette = interopRequireDefault(createPalette_1);
  var _createTypography = interopRequireDefault(createTypography_1);
  var _shadows = interopRequireDefault(shadows_1);
  var _createTransitions = interopRequireDefault(createTransitions_1);
  var _zIndex = interopRequireDefault(zIndex_1);
  const _excluded8 = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
  function createTheme3(options = {}, ...args) {
    const {
      mixins: mixinsInput = {},
      palette: paletteInput = {},
      transitions: transitionsInput = {},
      typography: typographyInput = {}
    } = options, other = (0, _objectWithoutPropertiesLoose22.default)(options, _excluded8);
    const palette2 = (0, _createPalette.default)(paletteInput);
    const systemTheme = (0, esm$1.createTheme)(options);
    let muiTheme = (0, esm.deepmerge)(systemTheme, {
      mixins: (0, _createMixins.default)(systemTheme.breakpoints, systemTheme.spacing, mixinsInput),
      palette: palette2,
      shadows: _shadows.default.slice(),
      typography: (0, _createTypography.default)(palette2, typographyInput),
      transitions: (0, _createTransitions.default)(transitionsInput),
      zIndex: (0, _extends22.default)({}, _zIndex.default)
    });
    muiTheme = (0, esm.deepmerge)(muiTheme, other);
    muiTheme = args.reduce((acc, argument) => (0, esm.deepmerge)(acc, argument), muiTheme);
    return muiTheme;
  }
  function createMuiTheme(...args) {
    return createTheme3(...args);
  }
  var _default = createTheme3;
  exports.default = _default;
});
var defaultTheme_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _createTheme = interopRequireDefault(createTheme_1);
  const defaultTheme2 = (0, _createTheme.default)();
  var _default = defaultTheme2;
  exports.default = _default;
});
var styled_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.slotShouldForwardProp = exports.rootShouldForwardProp = exports.default = void 0;
  var _defaultTheme = interopRequireDefault(defaultTheme_1);
  const rootShouldForwardProp2 = (prop) => (0, esm$1.shouldForwardProp)(prop) && prop !== "classes";
  exports.rootShouldForwardProp = rootShouldForwardProp2;
  const slotShouldForwardProp2 = esm$1.shouldForwardProp;
  exports.slotShouldForwardProp = slotShouldForwardProp2;
  const styled4 = (0, esm$1.createStyled)({
    defaultTheme: _defaultTheme.default,
    rootShouldForwardProp: rootShouldForwardProp2
  });
  var _default = styled4;
  exports.default = _default;
});
var useThemeProps_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useThemeProps3;
  var _defaultTheme = interopRequireDefault(defaultTheme_1);
  function useThemeProps3({
    props,
    name
  }) {
    return (0, esm$1.useThemeProps)({
      props,
      name,
      defaultTheme: _defaultTheme.default
    });
  }
});

// docs/snowpack/pkg/common/ModalUnstyled-e05e38f9.js
function composeClasses(slots, getUtilityClass, classes) {
  const output = {};
  Object.keys(slots).forEach((slot) => {
    output[slot] = slots[slot].reduce((acc, key) => {
      if (key) {
        if (classes && classes[key]) {
          acc.push(classes[key]);
        }
        acc.push(getUtilityClass(key));
      }
      return acc;
    }, []).join(" ");
  });
  return output;
}
function isHostComponent(element) {
  return typeof element === "string";
}
var globalStateClassesMapping = {
  active: "Mui-active",
  checked: "Mui-checked",
  completed: "Mui-completed",
  disabled: "Mui-disabled",
  error: "Mui-error",
  expanded: "Mui-expanded",
  focused: "Mui-focused",
  focusVisible: "Mui-focusVisible",
  required: "Mui-required",
  selected: "Mui-selected"
};
function generateUtilityClass(componentName, slot) {
  const globalStateClass = globalStateClassesMapping[slot];
  return globalStateClass || `${componentName}-${slot}`;
}
function generateUtilityClasses(componentName, slots) {
  const result = {};
  slots.forEach((slot) => {
    result[slot] = generateUtilityClass(componentName, slot);
  });
  return result;
}
function getBackdropUtilityClass(slot) {
  return generateUtilityClass("MuiBackdrop", slot);
}
var backdropUnstyledClasses = generateUtilityClasses("MuiBackdrop", ["root", "invisible"]);
var _excluded5 = ["classes", "className", "invisible", "component", "components", "componentsProps", "theme"];
var useUtilityClasses = (ownerState) => {
  const {
    classes,
    invisible
  } = ownerState;
  const slots = {
    root: ["root", invisible && "invisible"]
  };
  return composeClasses(slots, getBackdropUtilityClass, classes);
};
var BackdropUnstyled = /* @__PURE__ */ react.forwardRef(function BackdropUnstyled2(props, ref) {
  const {
    classes: classesProp,
    className,
    invisible = false,
    component = "div",
    components = {},
    componentsProps = {},
    theme
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded5);
  const ownerState = _extends({}, props, {
    classes: classesProp,
    invisible
  });
  const classes = useUtilityClasses(ownerState);
  const Root = components.Root || component;
  const rootProps = componentsProps.root || {};
  return /* @__PURE__ */ jsxRuntime.jsx(Root, _extends({
    "aria-hidden": true
  }, rootProps, !isHostComponent(Root) && {
    as: component,
    ownerState: _extends({}, ownerState, rootProps.ownerState),
    theme
  }, {
    ref
  }, other, {
    className: clsx(classes.root, rootProps.className, className)
  }));
});
function getContainer(container) {
  return typeof container === "function" ? container() : container;
}
var Portal3 = /* @__PURE__ */ react.forwardRef(function Portal4(props, ref) {
  const {
    children,
    container,
    disablePortal = false
  } = props;
  const [mountNode, setMountNode] = react.useState(null);
  const handleRef = useForkRef(/* @__PURE__ */ react.isValidElement(children) ? children.ref : null, ref);
  useEnhancedEffect(() => {
    if (!disablePortal) {
      setMountNode(getContainer(container) || document.body);
    }
  }, [container, disablePortal]);
  useEnhancedEffect(() => {
    if (mountNode && !disablePortal) {
      setRef(ref, mountNode);
      return () => {
        setRef(ref, null);
      };
    }
    return void 0;
  }, [ref, mountNode, disablePortal]);
  if (disablePortal) {
    if (/* @__PURE__ */ react.isValidElement(children)) {
      return /* @__PURE__ */ react.cloneElement(children, {
        ref: handleRef
      });
    }
    return children;
  }
  return mountNode ? /* @__PURE__ */ reactDom.createPortal(children, mountNode) : mountNode;
});
function isOverflowing(container) {
  const doc = ownerDocument(container);
  if (doc.body === container) {
    return ownerWindow(container).innerWidth > doc.documentElement.clientWidth;
  }
  return container.scrollHeight > container.clientHeight;
}
function ariaHidden(element, show) {
  if (show) {
    element.setAttribute("aria-hidden", "true");
  } else {
    element.removeAttribute("aria-hidden");
  }
}
function getPaddingRight(element) {
  return parseInt(ownerWindow(element).getComputedStyle(element).paddingRight, 10) || 0;
}
function ariaHiddenSiblings(container, mountElement, currentElement, elementsToExclude = [], show) {
  const blacklist = [mountElement, currentElement, ...elementsToExclude];
  const blacklistTagNames = ["TEMPLATE", "SCRIPT", "STYLE"];
  [].forEach.call(container.children, (element) => {
    if (blacklist.indexOf(element) === -1 && blacklistTagNames.indexOf(element.tagName) === -1) {
      ariaHidden(element, show);
    }
  });
}
function findIndexOf(items, callback) {
  let idx = -1;
  items.some((item, index) => {
    if (callback(item)) {
      idx = index;
      return true;
    }
    return false;
  });
  return idx;
}
function handleContainer(containerInfo, props) {
  const restoreStyle = [];
  const container = containerInfo.container;
  if (!props.disableScrollLock) {
    if (isOverflowing(container)) {
      const scrollbarSize = getScrollbarSize(ownerDocument(container));
      restoreStyle.push({
        value: container.style.paddingRight,
        property: "padding-right",
        el: container
      });
      container.style.paddingRight = `${getPaddingRight(container) + scrollbarSize}px`;
      const fixedElements2 = ownerDocument(container).querySelectorAll(".mui-fixed");
      [].forEach.call(fixedElements2, (element) => {
        restoreStyle.push({
          value: element.style.paddingRight,
          property: "padding-right",
          el: element
        });
        element.style.paddingRight = `${getPaddingRight(element) + scrollbarSize}px`;
      });
    }
    const parent = container.parentElement;
    const containerWindow = ownerWindow(container);
    const scrollContainer = (parent == null ? void 0 : parent.nodeName) === "HTML" && containerWindow.getComputedStyle(parent).overflowY === "scroll" ? parent : container;
    restoreStyle.push({
      value: scrollContainer.style.overflow,
      property: "overflow",
      el: scrollContainer
    }, {
      value: scrollContainer.style.overflowX,
      property: "overflow-x",
      el: scrollContainer
    }, {
      value: scrollContainer.style.overflowY,
      property: "overflow-y",
      el: scrollContainer
    });
    scrollContainer.style.overflow = "hidden";
  }
  const restore = () => {
    restoreStyle.forEach(({
      value,
      el,
      property: property2
    }) => {
      if (value) {
        el.style.setProperty(property2, value);
      } else {
        el.style.removeProperty(property2);
      }
    });
  };
  return restore;
}
function getHiddenSiblings(container) {
  const hiddenSiblings = [];
  [].forEach.call(container.children, (element) => {
    if (element.getAttribute("aria-hidden") === "true") {
      hiddenSiblings.push(element);
    }
  });
  return hiddenSiblings;
}
var ModalManager = class {
  constructor() {
    this.containers = void 0;
    this.modals = void 0;
    this.modals = [];
    this.containers = [];
  }
  add(modal, container) {
    let modalIndex = this.modals.indexOf(modal);
    if (modalIndex !== -1) {
      return modalIndex;
    }
    modalIndex = this.modals.length;
    this.modals.push(modal);
    if (modal.modalRef) {
      ariaHidden(modal.modalRef, false);
    }
    const hiddenSiblings = getHiddenSiblings(container);
    ariaHiddenSiblings(container, modal.mount, modal.modalRef, hiddenSiblings, true);
    const containerIndex = findIndexOf(this.containers, (item) => item.container === container);
    if (containerIndex !== -1) {
      this.containers[containerIndex].modals.push(modal);
      return modalIndex;
    }
    this.containers.push({
      modals: [modal],
      container,
      restore: null,
      hiddenSiblings
    });
    return modalIndex;
  }
  mount(modal, props) {
    const containerIndex = findIndexOf(this.containers, (item) => item.modals.indexOf(modal) !== -1);
    const containerInfo = this.containers[containerIndex];
    if (!containerInfo.restore) {
      containerInfo.restore = handleContainer(containerInfo, props);
    }
  }
  remove(modal) {
    const modalIndex = this.modals.indexOf(modal);
    if (modalIndex === -1) {
      return modalIndex;
    }
    const containerIndex = findIndexOf(this.containers, (item) => item.modals.indexOf(modal) !== -1);
    const containerInfo = this.containers[containerIndex];
    containerInfo.modals.splice(containerInfo.modals.indexOf(modal), 1);
    this.modals.splice(modalIndex, 1);
    if (containerInfo.modals.length === 0) {
      if (containerInfo.restore) {
        containerInfo.restore();
      }
      if (modal.modalRef) {
        ariaHidden(modal.modalRef, true);
      }
      ariaHiddenSiblings(containerInfo.container, modal.mount, modal.modalRef, containerInfo.hiddenSiblings, false);
      this.containers.splice(containerIndex, 1);
    } else {
      const nextTop = containerInfo.modals[containerInfo.modals.length - 1];
      if (nextTop.modalRef) {
        ariaHidden(nextTop.modalRef, false);
      }
    }
    return modalIndex;
  }
  isTopModal(modal) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === modal;
  }
};
var candidatesSelector = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function getTabIndex(node) {
  const tabindexAttr = parseInt(node.getAttribute("tabindex"), 10);
  if (!Number.isNaN(tabindexAttr)) {
    return tabindexAttr;
  }
  if (node.contentEditable === "true" || (node.nodeName === "AUDIO" || node.nodeName === "VIDEO" || node.nodeName === "DETAILS") && node.getAttribute("tabindex") === null) {
    return 0;
  }
  return node.tabIndex;
}
function isNonTabbableRadio(node) {
  if (node.tagName !== "INPUT" || node.type !== "radio") {
    return false;
  }
  if (!node.name) {
    return false;
  }
  const getRadio = (selector) => node.ownerDocument.querySelector(`input[type="radio"]${selector}`);
  let roving = getRadio(`[name="${node.name}"]:checked`);
  if (!roving) {
    roving = getRadio(`[name="${node.name}"]`);
  }
  return roving !== node;
}
function isNodeMatchingSelectorFocusable(node) {
  if (node.disabled || node.tagName === "INPUT" && node.type === "hidden" || isNonTabbableRadio(node)) {
    return false;
  }
  return true;
}
function defaultGetTabbable(root2) {
  const regularTabNodes = [];
  const orderedTabNodes = [];
  Array.from(root2.querySelectorAll(candidatesSelector)).forEach((node, i2) => {
    const nodeTabIndex = getTabIndex(node);
    if (nodeTabIndex === -1 || !isNodeMatchingSelectorFocusable(node)) {
      return;
    }
    if (nodeTabIndex === 0) {
      regularTabNodes.push(node);
    } else {
      orderedTabNodes.push({
        documentOrder: i2,
        tabIndex: nodeTabIndex,
        node
      });
    }
  });
  return orderedTabNodes.sort((a3, b5) => a3.tabIndex === b5.tabIndex ? a3.documentOrder - b5.documentOrder : a3.tabIndex - b5.tabIndex).map((a3) => a3.node).concat(regularTabNodes);
}
function defaultIsEnabled() {
  return true;
}
function Unstable_TrapFocus(props) {
  const {
    children,
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableRestoreFocus = false,
    getTabbable = defaultGetTabbable,
    isEnabled = defaultIsEnabled,
    open
  } = props;
  const ignoreNextEnforceFocus = react.useRef();
  const sentinelStart = react.useRef(null);
  const sentinelEnd = react.useRef(null);
  const nodeToRestore = react.useRef(null);
  const reactFocusEventTarget = react.useRef(null);
  const activated = react.useRef(false);
  const rootRef = react.useRef(null);
  const handleRef = useForkRef(children.ref, rootRef);
  const lastKeydown = react.useRef(null);
  react.useEffect(() => {
    if (!open || !rootRef.current) {
      return;
    }
    activated.current = !disableAutoFocus;
  }, [disableAutoFocus, open]);
  react.useEffect(() => {
    if (!open || !rootRef.current) {
      return;
    }
    const doc = ownerDocument(rootRef.current);
    if (!rootRef.current.contains(doc.activeElement)) {
      if (!rootRef.current.hasAttribute("tabIndex")) {
        rootRef.current.setAttribute("tabIndex", -1);
      }
      if (activated.current) {
        rootRef.current.focus();
      }
    }
    return () => {
      if (!disableRestoreFocus) {
        if (nodeToRestore.current && nodeToRestore.current.focus) {
          ignoreNextEnforceFocus.current = true;
          nodeToRestore.current.focus();
        }
        nodeToRestore.current = null;
      }
    };
  }, [open]);
  react.useEffect(() => {
    if (!open || !rootRef.current) {
      return;
    }
    const doc = ownerDocument(rootRef.current);
    const contain = (nativeEvent) => {
      const {
        current: rootElement
      } = rootRef;
      if (rootElement === null) {
        return;
      }
      if (!doc.hasFocus() || disableEnforceFocus || !isEnabled() || ignoreNextEnforceFocus.current) {
        ignoreNextEnforceFocus.current = false;
        return;
      }
      if (!rootElement.contains(doc.activeElement)) {
        if (nativeEvent && reactFocusEventTarget.current !== nativeEvent.target || doc.activeElement !== reactFocusEventTarget.current) {
          reactFocusEventTarget.current = null;
        } else if (reactFocusEventTarget.current !== null) {
          return;
        }
        if (!activated.current) {
          return;
        }
        let tabbable = [];
        if (doc.activeElement === sentinelStart.current || doc.activeElement === sentinelEnd.current) {
          tabbable = getTabbable(rootRef.current);
        }
        if (tabbable.length > 0) {
          var _lastKeydown$current, _lastKeydown$current2;
          const isShiftTab = Boolean(((_lastKeydown$current = lastKeydown.current) == null ? void 0 : _lastKeydown$current.shiftKey) && ((_lastKeydown$current2 = lastKeydown.current) == null ? void 0 : _lastKeydown$current2.key) === "Tab");
          const focusNext = tabbable[0];
          const focusPrevious = tabbable[tabbable.length - 1];
          if (isShiftTab) {
            focusPrevious.focus();
          } else {
            focusNext.focus();
          }
        } else {
          rootElement.focus();
        }
      }
    };
    const loopFocus = (nativeEvent) => {
      lastKeydown.current = nativeEvent;
      if (disableEnforceFocus || !isEnabled() || nativeEvent.key !== "Tab") {
        return;
      }
      if (doc.activeElement === rootRef.current && nativeEvent.shiftKey) {
        ignoreNextEnforceFocus.current = true;
        sentinelEnd.current.focus();
      }
    };
    doc.addEventListener("focusin", contain);
    doc.addEventListener("keydown", loopFocus, true);
    const interval = setInterval(() => {
      if (doc.activeElement.tagName === "BODY") {
        contain();
      }
    }, 50);
    return () => {
      clearInterval(interval);
      doc.removeEventListener("focusin", contain);
      doc.removeEventListener("keydown", loopFocus, true);
    };
  }, [disableAutoFocus, disableEnforceFocus, disableRestoreFocus, isEnabled, open, getTabbable]);
  const onFocus = (event) => {
    if (nodeToRestore.current === null) {
      nodeToRestore.current = event.relatedTarget;
    }
    activated.current = true;
    reactFocusEventTarget.current = event.target;
    const childrenPropsHandler = children.props.onFocus;
    if (childrenPropsHandler) {
      childrenPropsHandler(event);
    }
  };
  const handleFocusSentinel = (event) => {
    if (nodeToRestore.current === null) {
      nodeToRestore.current = event.relatedTarget;
    }
    activated.current = true;
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(react.Fragment, {
    children: [/* @__PURE__ */ jsxRuntime.jsx("div", {
      tabIndex: 0,
      onFocus: handleFocusSentinel,
      ref: sentinelStart,
      "data-test": "sentinelStart"
    }), /* @__PURE__ */ react.cloneElement(children, {
      ref: handleRef,
      onFocus
    }), /* @__PURE__ */ jsxRuntime.jsx("div", {
      tabIndex: 0,
      onFocus: handleFocusSentinel,
      ref: sentinelEnd,
      "data-test": "sentinelEnd"
    })]
  });
}
function getModalUtilityClass(slot) {
  return generateUtilityClass("MuiModal", slot);
}
var modalUnstyledClasses = generateUtilityClasses("MuiModal", ["root", "hidden"]);
var _excluded$13 = ["BackdropComponent", "BackdropProps", "children", "classes", "className", "closeAfterTransition", "component", "components", "componentsProps", "container", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "manager", "onBackdropClick", "onClose", "onKeyDown", "open", "theme", "onTransitionEnter", "onTransitionExited"];
var useUtilityClasses$1 = (ownerState) => {
  const {
    open,
    exited,
    classes
  } = ownerState;
  const slots = {
    root: ["root", !open && exited && "hidden"]
  };
  return composeClasses(slots, getModalUtilityClass, classes);
};
function getContainer$1(container) {
  return typeof container === "function" ? container() : container;
}
function getHasTransition(props) {
  return props.children ? props.children.props.hasOwnProperty("in") : false;
}
var defaultManager = new ModalManager();
var ModalUnstyled = /* @__PURE__ */ react.forwardRef(function ModalUnstyled2(props, ref) {
  const {
    BackdropComponent,
    BackdropProps,
    children,
    classes: classesProp,
    className,
    closeAfterTransition = false,
    component = "div",
    components = {},
    componentsProps = {},
    container,
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableEscapeKeyDown = false,
    disablePortal = false,
    disableRestoreFocus = false,
    disableScrollLock = false,
    hideBackdrop = false,
    keepMounted = false,
    manager = defaultManager,
    onBackdropClick,
    onClose,
    onKeyDown,
    open,
    theme,
    onTransitionEnter,
    onTransitionExited
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$13);
  const [exited, setExited] = react.useState(true);
  const modal = react.useRef({});
  const mountNodeRef = react.useRef(null);
  const modalRef = react.useRef(null);
  const handleRef = useForkRef(modalRef, ref);
  const hasTransition = getHasTransition(props);
  const getDoc = () => ownerDocument(mountNodeRef.current);
  const getModal = () => {
    modal.current.modalRef = modalRef.current;
    modal.current.mountNode = mountNodeRef.current;
    return modal.current;
  };
  const handleMounted = () => {
    manager.mount(getModal(), {
      disableScrollLock
    });
    modalRef.current.scrollTop = 0;
  };
  const handleOpen = useEventCallback(() => {
    const resolvedContainer = getContainer$1(container) || getDoc().body;
    manager.add(getModal(), resolvedContainer);
    if (modalRef.current) {
      handleMounted();
    }
  });
  const isTopModal = react.useCallback(() => manager.isTopModal(getModal()), [manager]);
  const handlePortalRef = useEventCallback((node) => {
    mountNodeRef.current = node;
    if (!node) {
      return;
    }
    if (open && isTopModal()) {
      handleMounted();
    } else {
      ariaHidden(modalRef.current, true);
    }
  });
  const handleClose = react.useCallback(() => {
    manager.remove(getModal());
  }, [manager]);
  react.useEffect(() => {
    return () => {
      handleClose();
    };
  }, [handleClose]);
  react.useEffect(() => {
    if (open) {
      handleOpen();
    } else if (!hasTransition || !closeAfterTransition) {
      handleClose();
    }
  }, [open, handleClose, hasTransition, closeAfterTransition, handleOpen]);
  const ownerState = _extends({}, props, {
    classes: classesProp,
    closeAfterTransition,
    disableAutoFocus,
    disableEnforceFocus,
    disableEscapeKeyDown,
    disablePortal,
    disableRestoreFocus,
    disableScrollLock,
    exited,
    hideBackdrop,
    keepMounted
  });
  const classes = useUtilityClasses$1(ownerState);
  if (!keepMounted && !open && (!hasTransition || exited)) {
    return null;
  }
  const handleEnter = () => {
    setExited(false);
    if (onTransitionEnter) {
      onTransitionEnter();
    }
  };
  const handleExited = () => {
    setExited(true);
    if (onTransitionExited) {
      onTransitionExited();
    }
    if (closeAfterTransition) {
      handleClose();
    }
  };
  const handleBackdropClick = (event) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    if (onBackdropClick) {
      onBackdropClick(event);
    }
    if (onClose) {
      onClose(event, "backdropClick");
    }
  };
  const handleKeyDown2 = (event) => {
    if (onKeyDown) {
      onKeyDown(event);
    }
    if (event.key !== "Escape" || !isTopModal()) {
      return;
    }
    if (!disableEscapeKeyDown) {
      event.stopPropagation();
      if (onClose) {
        onClose(event, "escapeKeyDown");
      }
    }
  };
  const childProps = {};
  if (children.props.tabIndex === void 0) {
    childProps.tabIndex = "-1";
  }
  if (hasTransition) {
    childProps.onEnter = createChainedFunction(handleEnter, children.props.onEnter);
    childProps.onExited = createChainedFunction(handleExited, children.props.onExited);
  }
  const Root = components.Root || component;
  const rootProps = componentsProps.root || {};
  return /* @__PURE__ */ jsxRuntime.jsx(Portal3, {
    ref: handlePortalRef,
    container,
    disablePortal,
    children: /* @__PURE__ */ jsxRuntime.jsxs(Root, _extends({
      role: "presentation"
    }, rootProps, !isHostComponent(Root) && {
      as: component,
      ownerState: _extends({}, ownerState, rootProps.ownerState),
      theme
    }, other, {
      ref: handleRef,
      onKeyDown: handleKeyDown2,
      className: clsx(classes.root, rootProps.className, className),
      children: [!hideBackdrop && BackdropComponent ? /* @__PURE__ */ jsxRuntime.jsx(BackdropComponent, _extends({
        open,
        onClick: handleBackdropClick
      }, BackdropProps)) : null, /* @__PURE__ */ jsxRuntime.jsx(Unstable_TrapFocus, {
        disableEnforceFocus,
        disableAutoFocus,
        disableRestoreFocus,
        isEnabled: isTopModal,
        open,
        children: /* @__PURE__ */ react.cloneElement(children, childProps)
      })]
    }))
  });
});

// docs/snowpack/pkg/common/index-296dd4cc.js
function stripDiacritics(string2) {
  return typeof string2.normalize !== "undefined" ? string2.normalize("NFD").replace(/[\u0300-\u036f]/g, "") : string2;
}
function createFilterOptions(config2 = {}) {
  const {
    ignoreAccents = true,
    ignoreCase = true,
    limit,
    matchFrom = "any",
    stringify,
    trim: trim2 = false
  } = config2;
  return (options, {
    inputValue,
    getOptionLabel
  }) => {
    let input = trim2 ? inputValue.trim() : inputValue;
    if (ignoreCase) {
      input = input.toLowerCase();
    }
    if (ignoreAccents) {
      input = stripDiacritics(input);
    }
    const filteredOptions = options.filter((option) => {
      let candidate = (stringify || getOptionLabel)(option);
      if (ignoreCase) {
        candidate = candidate.toLowerCase();
      }
      if (ignoreAccents) {
        candidate = stripDiacritics(candidate);
      }
      return matchFrom === "start" ? candidate.indexOf(input) === 0 : candidate.indexOf(input) > -1;
    });
    return typeof limit === "number" ? filteredOptions.slice(0, limit) : filteredOptions;
  };
}
function findIndex(array2, comp) {
  for (let i2 = 0; i2 < array2.length; i2 += 1) {
    if (comp(array2[i2])) {
      return i2;
    }
  }
  return -1;
}
var defaultFilterOptions = createFilterOptions();
var pageSize = 5;
function useAutocomplete(props) {
  const {
    autoComplete = false,
    autoHighlight = false,
    autoSelect = false,
    blurOnSelect = false,
    disabled: disabledProp,
    clearOnBlur = !props.freeSolo,
    clearOnEscape = false,
    componentName = "useAutocomplete",
    defaultValue = props.multiple ? [] : null,
    disableClearable = false,
    disableCloseOnSelect = false,
    disabledItemsFocusable = false,
    disableListWrap = false,
    filterOptions = defaultFilterOptions,
    filterSelectedOptions = false,
    freeSolo = false,
    getOptionDisabled,
    getOptionLabel: getOptionLabelProp = (option) => {
      var _option$label;
      return (_option$label = option.label) != null ? _option$label : option;
    },
    isOptionEqualToValue = (option, value2) => option === value2,
    groupBy,
    handleHomeEndKeys = !props.freeSolo,
    id: idProp,
    includeInputInList = false,
    inputValue: inputValueProp,
    multiple = false,
    onChange,
    onClose,
    onHighlightChange,
    onInputChange,
    onOpen,
    open: openProp,
    openOnFocus = false,
    options,
    selectOnFocus = !props.freeSolo,
    value: valueProp
  } = props;
  const id2 = useId(idProp);
  let getOptionLabel = getOptionLabelProp;
  getOptionLabel = (option) => {
    const optionLabel = getOptionLabelProp(option);
    if (typeof optionLabel !== "string") {
      return String(optionLabel);
    }
    return optionLabel;
  };
  const ignoreFocus = react.useRef(false);
  const firstFocus = react.useRef(true);
  const inputRef = react.useRef(null);
  const listboxRef = react.useRef(null);
  const [anchorEl, setAnchorEl] = react.useState(null);
  const [focusedTag, setFocusedTag] = react.useState(-1);
  const defaultHighlighted = autoHighlight ? 0 : -1;
  const highlightedIndexRef = react.useRef(defaultHighlighted);
  const [value, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: componentName
  });
  const [inputValue, setInputValueState] = useControlled({
    controlled: inputValueProp,
    default: "",
    name: componentName,
    state: "inputValue"
  });
  const [focused, setFocused] = react.useState(false);
  const resetInputValue = react.useCallback((event, newValue) => {
    let newInputValue;
    if (multiple) {
      newInputValue = "";
    } else if (newValue == null) {
      newInputValue = "";
    } else {
      const optionLabel = getOptionLabel(newValue);
      newInputValue = typeof optionLabel === "string" ? optionLabel : "";
    }
    if (inputValue === newInputValue) {
      return;
    }
    setInputValueState(newInputValue);
    if (onInputChange) {
      onInputChange(event, newInputValue, "reset");
    }
  }, [getOptionLabel, inputValue, multiple, onInputChange, setInputValueState]);
  const prevValue = react.useRef();
  react.useEffect(() => {
    const valueChange = value !== prevValue.current;
    prevValue.current = value;
    if (focused && !valueChange) {
      return;
    }
    if (freeSolo && !valueChange) {
      return;
    }
    resetInputValue(null, value);
  }, [value, resetInputValue, focused, prevValue, freeSolo]);
  const [open, setOpenState] = useControlled({
    controlled: openProp,
    default: false,
    name: componentName,
    state: "open"
  });
  const [inputPristine, setInputPristine] = react.useState(true);
  const inputValueIsSelectedValue = !multiple && value != null && inputValue === getOptionLabel(value);
  const popupOpen = open;
  const filteredOptions = popupOpen ? filterOptions(options.filter((option) => {
    if (filterSelectedOptions && (multiple ? value : [value]).some((value2) => value2 !== null && isOptionEqualToValue(option, value2))) {
      return false;
    }
    return true;
  }), {
    inputValue: inputValueIsSelectedValue && inputPristine ? "" : inputValue,
    getOptionLabel
  }) : [];
  const listboxAvailable = open && filteredOptions.length > 0;
  const focusTag = useEventCallback((tagToFocus) => {
    if (tagToFocus === -1) {
      inputRef.current.focus();
    } else {
      anchorEl.querySelector(`[data-tag-index="${tagToFocus}"]`).focus();
    }
  });
  react.useEffect(() => {
    if (multiple && focusedTag > value.length - 1) {
      setFocusedTag(-1);
      focusTag(-1);
    }
  }, [value, multiple, focusedTag, focusTag]);
  function validOptionIndex(index, direction) {
    if (!listboxRef.current || index === -1) {
      return -1;
    }
    let nextFocus = index;
    while (true) {
      if (direction === "next" && nextFocus === filteredOptions.length || direction === "previous" && nextFocus === -1) {
        return -1;
      }
      const option = listboxRef.current.querySelector(`[data-option-index="${nextFocus}"]`);
      const nextFocusDisabled = disabledItemsFocusable ? false : !option || option.disabled || option.getAttribute("aria-disabled") === "true";
      if (option && !option.hasAttribute("tabindex") || nextFocusDisabled) {
        nextFocus += direction === "next" ? 1 : -1;
      } else {
        return nextFocus;
      }
    }
  }
  const setHighlightedIndex = useEventCallback(({
    event,
    index,
    reason = "auto"
  }) => {
    highlightedIndexRef.current = index;
    if (index === -1) {
      inputRef.current.removeAttribute("aria-activedescendant");
    } else {
      inputRef.current.setAttribute("aria-activedescendant", `${id2}-option-${index}`);
    }
    if (onHighlightChange) {
      onHighlightChange(event, index === -1 ? null : filteredOptions[index], reason);
    }
    if (!listboxRef.current) {
      return;
    }
    const prev = listboxRef.current.querySelector('[role="option"].Mui-focused');
    if (prev) {
      prev.classList.remove("Mui-focused");
      prev.classList.remove("Mui-focusVisible");
    }
    const listboxNode = listboxRef.current.parentElement.querySelector('[role="listbox"]');
    if (!listboxNode) {
      return;
    }
    if (index === -1) {
      listboxNode.scrollTop = 0;
      return;
    }
    const option = listboxRef.current.querySelector(`[data-option-index="${index}"]`);
    if (!option) {
      return;
    }
    option.classList.add("Mui-focused");
    if (reason === "keyboard") {
      option.classList.add("Mui-focusVisible");
    }
    if (listboxNode.scrollHeight > listboxNode.clientHeight && reason !== "mouse") {
      const element = option;
      const scrollBottom = listboxNode.clientHeight + listboxNode.scrollTop;
      const elementBottom = element.offsetTop + element.offsetHeight;
      if (elementBottom > scrollBottom) {
        listboxNode.scrollTop = elementBottom - listboxNode.clientHeight;
      } else if (element.offsetTop - element.offsetHeight * (groupBy ? 1.3 : 0) < listboxNode.scrollTop) {
        listboxNode.scrollTop = element.offsetTop - element.offsetHeight * (groupBy ? 1.3 : 0);
      }
    }
  });
  const changeHighlightedIndex = useEventCallback(({
    event,
    diff,
    direction = "next",
    reason = "auto"
  }) => {
    if (!popupOpen) {
      return;
    }
    const getNextIndex = () => {
      const maxIndex = filteredOptions.length - 1;
      if (diff === "reset") {
        return defaultHighlighted;
      }
      if (diff === "start") {
        return 0;
      }
      if (diff === "end") {
        return maxIndex;
      }
      const newIndex = highlightedIndexRef.current + diff;
      if (newIndex < 0) {
        if (newIndex === -1 && includeInputInList) {
          return -1;
        }
        if (disableListWrap && highlightedIndexRef.current !== -1 || Math.abs(diff) > 1) {
          return 0;
        }
        return maxIndex;
      }
      if (newIndex > maxIndex) {
        if (newIndex === maxIndex + 1 && includeInputInList) {
          return -1;
        }
        if (disableListWrap || Math.abs(diff) > 1) {
          return maxIndex;
        }
        return 0;
      }
      return newIndex;
    };
    const nextIndex = validOptionIndex(getNextIndex(), direction);
    setHighlightedIndex({
      index: nextIndex,
      reason,
      event
    });
    if (autoComplete && diff !== "reset") {
      if (nextIndex === -1) {
        inputRef.current.value = inputValue;
      } else {
        const option = getOptionLabel(filteredOptions[nextIndex]);
        inputRef.current.value = option;
        const index = option.toLowerCase().indexOf(inputValue.toLowerCase());
        if (index === 0 && inputValue.length > 0) {
          inputRef.current.setSelectionRange(inputValue.length, option.length);
        }
      }
    }
  });
  const syncHighlightedIndex = react.useCallback(() => {
    if (!popupOpen) {
      return;
    }
    const valueItem = multiple ? value[0] : value;
    if (filteredOptions.length === 0 || valueItem == null) {
      changeHighlightedIndex({
        diff: "reset"
      });
      return;
    }
    if (!listboxRef.current) {
      return;
    }
    if (valueItem != null) {
      const currentOption = filteredOptions[highlightedIndexRef.current];
      if (multiple && currentOption && findIndex(value, (val) => isOptionEqualToValue(currentOption, val)) !== -1) {
        return;
      }
      const itemIndex = findIndex(filteredOptions, (optionItem) => isOptionEqualToValue(optionItem, valueItem));
      if (itemIndex === -1) {
        changeHighlightedIndex({
          diff: "reset"
        });
      } else {
        setHighlightedIndex({
          index: itemIndex
        });
      }
      return;
    }
    if (highlightedIndexRef.current >= filteredOptions.length - 1) {
      setHighlightedIndex({
        index: filteredOptions.length - 1
      });
      return;
    }
    setHighlightedIndex({
      index: highlightedIndexRef.current
    });
  }, [
    filteredOptions.length,
    multiple ? false : value,
    filterSelectedOptions,
    changeHighlightedIndex,
    setHighlightedIndex,
    popupOpen,
    inputValue,
    multiple
  ]);
  const handleListboxRef = useEventCallback((node) => {
    setRef(listboxRef, node);
    if (!node) {
      return;
    }
    syncHighlightedIndex();
  });
  react.useEffect(() => {
    syncHighlightedIndex();
  }, [syncHighlightedIndex]);
  const handleOpen = (event) => {
    if (open) {
      return;
    }
    setOpenState(true);
    setInputPristine(true);
    if (onOpen) {
      onOpen(event);
    }
  };
  const handleClose = (event, reason) => {
    if (!open) {
      return;
    }
    setOpenState(false);
    if (onClose) {
      onClose(event, reason);
    }
  };
  const handleValue = (event, newValue, reason, details) => {
    if (value === newValue) {
      return;
    }
    if (onChange) {
      onChange(event, newValue, reason, details);
    }
    setValueState(newValue);
  };
  const isTouch = react.useRef(false);
  const selectNewValue = (event, option, reasonProp = "selectOption", origin = "options") => {
    let reason = reasonProp;
    let newValue = option;
    if (multiple) {
      newValue = Array.isArray(value) ? value.slice() : [];
      const itemIndex = findIndex(newValue, (valueItem) => isOptionEqualToValue(option, valueItem));
      if (itemIndex === -1) {
        newValue.push(option);
      } else if (origin !== "freeSolo") {
        newValue.splice(itemIndex, 1);
        reason = "removeOption";
      }
    }
    resetInputValue(event, newValue);
    handleValue(event, newValue, reason, {
      option
    });
    if (!disableCloseOnSelect && !event.ctrlKey && !event.metaKey) {
      handleClose(event, reason);
    }
    if (blurOnSelect === true || blurOnSelect === "touch" && isTouch.current || blurOnSelect === "mouse" && !isTouch.current) {
      inputRef.current.blur();
    }
  };
  function validTagIndex(index, direction) {
    if (index === -1) {
      return -1;
    }
    let nextFocus = index;
    while (true) {
      if (direction === "next" && nextFocus === value.length || direction === "previous" && nextFocus === -1) {
        return -1;
      }
      const option = anchorEl.querySelector(`[data-tag-index="${nextFocus}"]`);
      if (!option || !option.hasAttribute("tabindex") || option.disabled || option.getAttribute("aria-disabled") === "true") {
        nextFocus += direction === "next" ? 1 : -1;
      } else {
        return nextFocus;
      }
    }
  }
  const handleFocusTag = (event, direction) => {
    if (!multiple) {
      return;
    }
    handleClose(event, "toggleInput");
    let nextTag = focusedTag;
    if (focusedTag === -1) {
      if (inputValue === "" && direction === "previous") {
        nextTag = value.length - 1;
      }
    } else {
      nextTag += direction === "next" ? 1 : -1;
      if (nextTag < 0) {
        nextTag = 0;
      }
      if (nextTag === value.length) {
        nextTag = -1;
      }
    }
    nextTag = validTagIndex(nextTag, direction);
    setFocusedTag(nextTag);
    focusTag(nextTag);
  };
  const handleClear = (event) => {
    ignoreFocus.current = true;
    setInputValueState("");
    if (onInputChange) {
      onInputChange(event, "", "clear");
    }
    handleValue(event, multiple ? [] : null, "clear");
  };
  const handleKeyDown2 = (other) => (event) => {
    if (other.onKeyDown) {
      other.onKeyDown(event);
    }
    if (event.defaultMuiPrevented) {
      return;
    }
    if (focusedTag !== -1 && ["ArrowLeft", "ArrowRight"].indexOf(event.key) === -1) {
      setFocusedTag(-1);
      focusTag(-1);
    }
    if (event.which !== 229) {
      switch (event.key) {
        case "Home":
          if (popupOpen && handleHomeEndKeys) {
            event.preventDefault();
            changeHighlightedIndex({
              diff: "start",
              direction: "next",
              reason: "keyboard",
              event
            });
          }
          break;
        case "End":
          if (popupOpen && handleHomeEndKeys) {
            event.preventDefault();
            changeHighlightedIndex({
              diff: "end",
              direction: "previous",
              reason: "keyboard",
              event
            });
          }
          break;
        case "PageUp":
          event.preventDefault();
          changeHighlightedIndex({
            diff: -pageSize,
            direction: "previous",
            reason: "keyboard",
            event
          });
          handleOpen(event);
          break;
        case "PageDown":
          event.preventDefault();
          changeHighlightedIndex({
            diff: pageSize,
            direction: "next",
            reason: "keyboard",
            event
          });
          handleOpen(event);
          break;
        case "ArrowDown":
          event.preventDefault();
          changeHighlightedIndex({
            diff: 1,
            direction: "next",
            reason: "keyboard",
            event
          });
          handleOpen(event);
          break;
        case "ArrowUp":
          event.preventDefault();
          changeHighlightedIndex({
            diff: -1,
            direction: "previous",
            reason: "keyboard",
            event
          });
          handleOpen(event);
          break;
        case "ArrowLeft":
          handleFocusTag(event, "previous");
          break;
        case "ArrowRight":
          handleFocusTag(event, "next");
          break;
        case "Enter":
          if (highlightedIndexRef.current !== -1 && popupOpen) {
            const option = filteredOptions[highlightedIndexRef.current];
            const disabled = getOptionDisabled ? getOptionDisabled(option) : false;
            event.preventDefault();
            if (disabled) {
              return;
            }
            selectNewValue(event, option, "selectOption");
            if (autoComplete) {
              inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length);
            }
          } else if (freeSolo && inputValue !== "" && inputValueIsSelectedValue === false) {
            if (multiple) {
              event.preventDefault();
            }
            selectNewValue(event, inputValue, "createOption", "freeSolo");
          }
          break;
        case "Escape":
          if (popupOpen) {
            event.preventDefault();
            event.stopPropagation();
            handleClose(event, "escape");
          } else if (clearOnEscape && (inputValue !== "" || multiple && value.length > 0)) {
            event.preventDefault();
            event.stopPropagation();
            handleClear(event);
          }
          break;
        case "Backspace":
          if (multiple && inputValue === "" && value.length > 0) {
            const index = focusedTag === -1 ? value.length - 1 : focusedTag;
            const newValue = value.slice();
            newValue.splice(index, 1);
            handleValue(event, newValue, "removeOption", {
              option: value[index]
            });
          }
          break;
      }
    }
  };
  const handleFocus = (event) => {
    setFocused(true);
    if (openOnFocus && !ignoreFocus.current) {
      handleOpen(event);
    }
  };
  const handleBlur = (event) => {
    if (listboxRef.current !== null && listboxRef.current.parentElement.contains(document.activeElement)) {
      inputRef.current.focus();
      return;
    }
    setFocused(false);
    firstFocus.current = true;
    ignoreFocus.current = false;
    if (autoSelect && highlightedIndexRef.current !== -1 && popupOpen) {
      selectNewValue(event, filteredOptions[highlightedIndexRef.current], "blur");
    } else if (autoSelect && freeSolo && inputValue !== "") {
      selectNewValue(event, inputValue, "blur", "freeSolo");
    } else if (clearOnBlur) {
      resetInputValue(event, value);
    }
    handleClose(event, "blur");
  };
  const handleInputChange = (event) => {
    const newValue = event.target.value;
    if (inputValue !== newValue) {
      setInputValueState(newValue);
      setInputPristine(false);
      if (onInputChange) {
        onInputChange(event, newValue, "input");
      }
    }
    if (newValue === "") {
      if (!disableClearable && !multiple) {
        handleValue(event, null, "clear");
      }
    } else {
      handleOpen(event);
    }
  };
  const handleOptionMouseOver = (event) => {
    setHighlightedIndex({
      event,
      index: Number(event.currentTarget.getAttribute("data-option-index")),
      reason: "mouse"
    });
  };
  const handleOptionTouchStart = () => {
    isTouch.current = true;
  };
  const handleOptionClick = (event) => {
    const index = Number(event.currentTarget.getAttribute("data-option-index"));
    selectNewValue(event, filteredOptions[index], "selectOption");
    isTouch.current = false;
  };
  const handleTagDelete = (index) => (event) => {
    const newValue = value.slice();
    newValue.splice(index, 1);
    handleValue(event, newValue, "removeOption", {
      option: value[index]
    });
  };
  const handlePopupIndicator = (event) => {
    if (open) {
      handleClose(event, "toggleInput");
    } else {
      handleOpen(event);
    }
  };
  const handleMouseDown = (event) => {
    if (event.target.getAttribute("id") !== id2) {
      event.preventDefault();
    }
  };
  const handleClick = () => {
    inputRef.current.focus();
    if (selectOnFocus && firstFocus.current && inputRef.current.selectionEnd - inputRef.current.selectionStart === 0) {
      inputRef.current.select();
    }
    firstFocus.current = false;
  };
  const handleInputMouseDown = (event) => {
    if (inputValue === "" || !open) {
      handlePopupIndicator(event);
    }
  };
  let dirty = freeSolo && inputValue.length > 0;
  dirty = dirty || (multiple ? value.length > 0 : value !== null);
  let groupedOptions = filteredOptions;
  if (groupBy) {
    groupedOptions = filteredOptions.reduce((acc, option, index) => {
      const group = groupBy(option);
      if (acc.length > 0 && acc[acc.length - 1].group === group) {
        acc[acc.length - 1].options.push(option);
      } else {
        acc.push({
          key: index,
          index,
          group,
          options: [option]
        });
      }
      return acc;
    }, []);
  }
  if (disabledProp && focused) {
    handleBlur();
  }
  return {
    getRootProps: (other = {}) => _extends({
      "aria-owns": listboxAvailable ? `${id2}-listbox` : null,
      role: "combobox",
      "aria-expanded": listboxAvailable
    }, other, {
      onKeyDown: handleKeyDown2(other),
      onMouseDown: handleMouseDown,
      onClick: handleClick
    }),
    getInputLabelProps: () => ({
      id: `${id2}-label`,
      htmlFor: id2
    }),
    getInputProps: () => ({
      id: id2,
      value: inputValue,
      onBlur: handleBlur,
      onFocus: handleFocus,
      onChange: handleInputChange,
      onMouseDown: handleInputMouseDown,
      "aria-activedescendant": popupOpen ? "" : null,
      "aria-autocomplete": autoComplete ? "both" : "list",
      "aria-controls": listboxAvailable ? `${id2}-listbox` : null,
      autoComplete: "off",
      ref: inputRef,
      autoCapitalize: "none",
      spellCheck: "false"
    }),
    getClearProps: () => ({
      tabIndex: -1,
      onClick: handleClear
    }),
    getPopupIndicatorProps: () => ({
      tabIndex: -1,
      onClick: handlePopupIndicator
    }),
    getTagProps: ({
      index
    }) => ({
      key: index,
      "data-tag-index": index,
      tabIndex: -1,
      onDelete: handleTagDelete(index)
    }),
    getListboxProps: () => ({
      role: "listbox",
      id: `${id2}-listbox`,
      "aria-labelledby": `${id2}-label`,
      ref: handleListboxRef,
      onMouseDown: (event) => {
        event.preventDefault();
      }
    }),
    getOptionProps: ({
      index,
      option
    }) => {
      const selected = (multiple ? value : [value]).some((value2) => value2 != null && isOptionEqualToValue(option, value2));
      const disabled = getOptionDisabled ? getOptionDisabled(option) : false;
      return {
        key: getOptionLabel(option),
        tabIndex: -1,
        role: "option",
        id: `${id2}-option-${index}`,
        onMouseOver: handleOptionMouseOver,
        onClick: handleOptionClick,
        onTouchStart: handleOptionTouchStart,
        "data-option-index": index,
        "aria-disabled": disabled,
        "aria-selected": selected
      };
    },
    id: id2,
    inputValue,
    value,
    dirty,
    popupOpen,
    focused: focused || focusedTag !== -1,
    anchorEl,
    setAnchorEl,
    focusedTag,
    groupedOptions
  };
}
function getBadgeUtilityClass(slot) {
  return generateUtilityClass("MuiBadge", slot);
}
var badgeUnstyledClasses = generateUtilityClasses("MuiBadge", ["root", "badge", "dot", "standard", "anchorOriginTopLeftCircular", "anchorOriginTopLeftRectangular", "anchorOriginTopRightCircular", "anchorOriginTopRightRectangular", "anchorOriginBottomLeftCircular", "anchorOriginBottomLeftRectangular", "anchorOriginBottomRightCircular", "anchorOriginBottomRightRectangular", "invisible"]);
var _excluded6 = ["anchorOrigin", "classes", "badgeContent", "component", "children", "className", "components", "componentsProps", "invisible", "max", "overlap", "showZero", "variant", "theme"];
var useUtilityClasses2 = (ownerState) => {
  const {
    variant,
    anchorOrigin,
    overlap,
    invisible,
    classes
  } = ownerState;
  const slots = {
    root: ["root"],
    badge: ["badge", variant, `anchorOrigin${capitalize(anchorOrigin.vertical)}${capitalize(anchorOrigin.horizontal)}${capitalize(overlap)}`, invisible && "invisible"]
  };
  return composeClasses(slots, getBadgeUtilityClass, classes);
};
var BadgeUnstyled = /* @__PURE__ */ react.forwardRef(function BadgeUnstyled2(props, ref) {
  const {
    anchorOrigin: anchorOriginProp = {
      vertical: "top",
      horizontal: "right"
    },
    classes: classesProp,
    badgeContent: badgeContentProp,
    component = "span",
    children,
    className,
    components = {},
    componentsProps = {},
    invisible: invisibleProp,
    max: maxProp = 99,
    overlap: overlapProp = "rectangular",
    showZero = false,
    variant: variantProp = "standard",
    theme
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded6);
  const prevProps = usePreviousProps({
    anchorOrigin: anchorOriginProp,
    badgeContent: badgeContentProp,
    max: maxProp,
    overlap: overlapProp,
    variant: variantProp
  });
  let invisible = invisibleProp;
  if (invisibleProp == null && (badgeContentProp === 0 && !showZero || badgeContentProp == null && variantProp !== "dot")) {
    invisible = true;
  }
  const {
    anchorOrigin = anchorOriginProp,
    badgeContent,
    max: max2 = maxProp,
    overlap = overlapProp,
    variant = variantProp
  } = invisible ? prevProps : props;
  const ownerState = _extends({}, props, {
    anchorOrigin,
    badgeContent,
    classes: classesProp,
    invisible,
    max: max2,
    overlap,
    variant
  });
  let displayValue = "";
  if (variant !== "dot") {
    displayValue = badgeContent > max2 ? `${max2}+` : badgeContent;
  }
  const classes = useUtilityClasses2(ownerState);
  const Root = components.Root || component;
  const rootProps = componentsProps.root || {};
  const Badge = components.Badge || "span";
  const badgeProps = componentsProps.badge || {};
  return /* @__PURE__ */ jsxRuntime.jsxs(Root, _extends({}, rootProps, !isHostComponent(Root) && {
    as: component,
    ownerState: _extends({}, ownerState, rootProps.ownerState),
    theme
  }, {
    ref
  }, other, {
    className: clsx(classes.root, rootProps.className, className),
    children: [children, /* @__PURE__ */ jsxRuntime.jsx(Badge, _extends({}, badgeProps, !isHostComponent(Badge) && {
      ownerState: _extends({}, ownerState, badgeProps.ownerState),
      theme
    }, {
      className: clsx(classes.badge, badgeProps.className),
      children: displayValue
    }))]
  }));
});
function getButtonUnstyledUtilityClass(slot) {
  return generateUtilityClass("ButtonUnstyled", slot);
}
var buttonUnstyledClasses = generateUtilityClasses("ButtonUnstyled", ["root", "active", "disabled", "focusVisible"]);
function extractEventHandlers(object2, excludeKeys = []) {
  if (object2 === void 0) {
    return {};
  }
  const result = {};
  Object.keys(object2).filter((prop) => prop.match(/^on[A-Z]/) && typeof object2[prop] === "function" && !excludeKeys.includes(prop)).forEach((prop) => {
    result[prop] = object2[prop];
  });
  return result;
}
function useButton(props) {
  var _ref;
  const {
    component,
    components = {},
    disabled = false,
    href,
    ref,
    tabIndex = 0,
    to,
    type
  } = props;
  const buttonRef = react.useRef();
  const [active, setActive] = react.useState(false);
  const {
    isFocusVisibleRef,
    onFocus: handleFocusVisible,
    onBlur: handleBlurVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = react.useState(false);
  if (disabled && focusVisible) {
    setFocusVisible(false);
  }
  react.useEffect(() => {
    isFocusVisibleRef.current = focusVisible;
  }, [focusVisible, isFocusVisibleRef]);
  const handleMouseLeave = (otherHandlers) => (event) => {
    var _otherHandlers$onMous;
    if (focusVisible) {
      event.preventDefault();
    }
    (_otherHandlers$onMous = otherHandlers.onMouseLeave) == null ? void 0 : _otherHandlers$onMous.call(otherHandlers, event);
  };
  const handleBlur = (otherHandlers) => (event) => {
    var _otherHandlers$onBlur;
    handleBlurVisible(event);
    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }
    (_otherHandlers$onBlur = otherHandlers.onBlur) == null ? void 0 : _otherHandlers$onBlur.call(otherHandlers, event);
  };
  const handleFocus = useEventCallback((otherHandlers) => (event) => {
    var _otherHandlers$onFocu2;
    if (!buttonRef.current) {
      buttonRef.current = event.currentTarget;
    }
    handleFocusVisible(event);
    if (isFocusVisibleRef.current === true) {
      var _otherHandlers$onFocu;
      setFocusVisible(true);
      (_otherHandlers$onFocu = otherHandlers.onFocusVisible) == null ? void 0 : _otherHandlers$onFocu.call(otherHandlers, event);
    }
    (_otherHandlers$onFocu2 = otherHandlers.onFocus) == null ? void 0 : _otherHandlers$onFocu2.call(otherHandlers, event);
  });
  const elementType = (_ref = component != null ? component : components.Root) != null ? _ref : "button";
  const isNonNativeButton = () => {
    const button = buttonRef.current;
    return elementType !== "button" && !((button == null ? void 0 : button.tagName) === "A" && button != null && button.href);
  };
  const handleMouseDown = (otherHandlers) => (event) => {
    var _otherHandlers$onMous2;
    if (event.target === event.currentTarget && !disabled) {
      setActive(true);
    }
    (_otherHandlers$onMous2 = otherHandlers.onMouseDown) == null ? void 0 : _otherHandlers$onMous2.call(otherHandlers, event);
  };
  const handleMouseUp = (otherHandlers) => (event) => {
    var _otherHandlers$onMous3;
    if (event.target === event.currentTarget) {
      setActive(false);
    }
    (_otherHandlers$onMous3 = otherHandlers.onMouseUp) == null ? void 0 : _otherHandlers$onMous3.call(otherHandlers, event);
  };
  const handleKeyDown2 = useEventCallback((otherHandlers) => (event) => {
    var _otherHandlers$onKeyD;
    if (event.target === event.currentTarget && isNonNativeButton() && event.key === " ") {
      event.preventDefault();
    }
    if (event.target === event.currentTarget && event.key === " " && !disabled) {
      setActive(true);
    }
    (_otherHandlers$onKeyD = otherHandlers.onKeyDown) == null ? void 0 : _otherHandlers$onKeyD.call(otherHandlers, event);
    if (event.target === event.currentTarget && isNonNativeButton() && event.key === "Enter" && !disabled) {
      var _otherHandlers$onClic;
      event.preventDefault();
      (_otherHandlers$onClic = otherHandlers.onClick) == null ? void 0 : _otherHandlers$onClic.call(otherHandlers, event);
    }
  });
  const handleKeyUp = useEventCallback((otherHandlers) => (event) => {
    var _otherHandlers$onKeyU;
    if (event.target === event.currentTarget) {
      setActive(false);
    }
    (_otherHandlers$onKeyU = otherHandlers.onKeyUp) == null ? void 0 : _otherHandlers$onKeyU.call(otherHandlers, event);
    if (event.target === event.currentTarget && isNonNativeButton() && event.key === " " && !event.defaultPrevented) {
      var _otherHandlers$onClic2;
      (_otherHandlers$onClic2 = otherHandlers.onClick) == null ? void 0 : _otherHandlers$onClic2.call(otherHandlers, event);
    }
  });
  const handleOwnRef = useForkRef(focusVisibleRef, buttonRef);
  const handleRef = useForkRef(ref, handleOwnRef);
  const [hostElementName, setHostElementName] = react.useState("");
  const updateRef = (instance) => {
    var _instance$tagName;
    setHostElementName((_instance$tagName = instance == null ? void 0 : instance.tagName) != null ? _instance$tagName : "");
    setRef(handleRef, instance);
  };
  const buttonProps = {};
  if (hostElementName === "BUTTON") {
    buttonProps.type = type != null ? type : "button";
    buttonProps.disabled = disabled;
  } else if (hostElementName !== "") {
    if (!href && !to) {
      buttonProps.role = "button";
    }
    if (disabled) {
      buttonProps["aria-disabled"] = disabled;
    }
  }
  const getRootProps = (otherHandlers) => {
    const propsEventHandlers = extractEventHandlers(props);
    const externalEventHandlers = _extends({}, propsEventHandlers, otherHandlers);
    const ownEventHandlers = {
      onBlur: handleBlur(externalEventHandlers),
      onFocus: handleFocus(externalEventHandlers),
      onKeyDown: handleKeyDown2(externalEventHandlers),
      onKeyUp: handleKeyUp(externalEventHandlers),
      onMouseDown: handleMouseDown(externalEventHandlers),
      onMouseLeave: handleMouseLeave(externalEventHandlers),
      onMouseUp: handleMouseUp(externalEventHandlers)
    };
    const mergedEventHandlers = _extends({}, externalEventHandlers, ownEventHandlers);
    delete mergedEventHandlers.onFocusVisible;
    return _extends({
      tabIndex: disabled ? -1 : tabIndex,
      type,
      ref: updateRef
    }, buttonProps, mergedEventHandlers);
  };
  return {
    getRootProps,
    focusVisible,
    setFocusVisible,
    disabled,
    active
  };
}
function appendOwnerState(elementType, existingProps, ownerState) {
  if (isHostComponent(elementType)) {
    return existingProps;
  }
  return _extends({}, existingProps, {
    ownerState: _extends({}, existingProps.ownerState, ownerState)
  });
}
var _excluded$14 = ["className", "component", "components", "componentsProps", "children", "disabled", "action", "onBlur", "onClick", "onFocus", "onFocusVisible", "onKeyDown", "onKeyUp", "onMouseLeave"];
var useUtilityClasses$12 = (ownerState) => {
  const {
    active,
    disabled,
    focusVisible
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", focusVisible && "focusVisible", active && "active"]
  };
  return composeClasses(slots, getButtonUnstyledUtilityClass, {});
};
var ButtonUnstyled = /* @__PURE__ */ react.forwardRef(function ButtonUnstyled2(props, ref) {
  var _ref;
  const {
    className,
    component,
    components = {},
    componentsProps = {},
    children,
    action
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$14);
  const buttonRef = react.useRef();
  const handleRef = useForkRef(buttonRef, ref);
  const {
    active,
    focusVisible,
    setFocusVisible,
    getRootProps
  } = useButton(_extends({}, props, {
    ref: handleRef
  }));
  react.useImperativeHandle(action, () => ({
    focusVisible: () => {
      setFocusVisible(true);
      buttonRef.current.focus();
    }
  }), [setFocusVisible]);
  const ownerState = _extends({}, props, {
    active,
    focusVisible
  });
  const ButtonRoot = (_ref = component != null ? component : components.Root) != null ? _ref : "button";
  const buttonRootProps = appendOwnerState(ButtonRoot, _extends({}, other, componentsProps.root), ownerState);
  const classes = useUtilityClasses$12(ownerState);
  return /* @__PURE__ */ jsxRuntime.jsx(ButtonRoot, _extends({}, getRootProps(), buttonRootProps, {
    className: clsx(classes.root, className, buttonRootProps.className),
    children
  }));
});
var FormControlUnstyledContext = /* @__PURE__ */ react.createContext(void 0);
function getFormControlUnstyledUtilityClasses(slot) {
  return generateUtilityClass("MuiFormControl", slot);
}
var formControlUnstyledClasses = generateUtilityClasses("MuiFormControl", ["root", "disabled"]);
var _excluded$22 = ["defaultValue", "children", "className", "component", "components", "componentsProps", "disabled", "error", "focused", "onChange", "required", "value"];
function hasValue(value) {
  return value != null && !(Array.isArray(value) && value.length === 0) && value !== "";
}
var FormControlUnstyled = /* @__PURE__ */ react.forwardRef(function FormControlUnstyled2(props, ref) {
  var _ref;
  const {
    defaultValue,
    children,
    className,
    component,
    components = {},
    componentsProps = {},
    disabled = false,
    error = false,
    focused: visuallyFocused = false,
    onChange,
    required = false,
    value: incomingValue
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$22);
  const [value, setValue] = useControlled({
    controlled: incomingValue,
    default: defaultValue,
    name: "FormControl",
    state: "value"
  });
  const filled = hasValue(value);
  const [focusedState, setFocused] = react.useState(false);
  if (disabled && focusedState) {
    setFocused(false);
  }
  const focused = visuallyFocused !== void 0 && !disabled ? visuallyFocused : focusedState;
  const ownerState = _extends({}, props, {
    disabled,
    error,
    filled,
    focused,
    required
  });
  let registerEffect = () => {
  };
  const handleChange = (event) => {
    setValue(event.target.value);
    onChange == null ? void 0 : onChange(event);
  };
  const childContext = {
    disabled,
    error,
    filled,
    focused,
    onBlur: () => {
      setFocused(false);
    },
    onChange: handleChange,
    onFocus: () => {
      setFocused(true);
    },
    registerEffect,
    required,
    value: value != null ? value : ""
  };
  const Root = (_ref = component != null ? component : components.Root) != null ? _ref : "div";
  const rootProps = appendOwnerState(Root, _extends({}, other, componentsProps.root), ownerState);
  return /* @__PURE__ */ jsxRuntime.jsx(FormControlUnstyledContext.Provider, {
    value: childContext,
    children: /* @__PURE__ */ jsxRuntime.jsx(Root, _extends({
      ref
    }, rootProps, {
      className: clsx(formControlUnstyledClasses.root, className, rootProps == null ? void 0 : rootProps.className, disabled && formControlUnstyledClasses.disabled),
      children
    }))
  });
});
function useFormControlUnstyled() {
  return react.useContext(FormControlUnstyledContext);
}
function getInputUnstyledUtilityClass(slot) {
  return generateUtilityClass("MuiInput", slot);
}
var inputBaseClasses = generateUtilityClasses("MuiInput", ["root", "formControl", "focused", "disabled", "error", "multiline", "input", "inputMultiline", "inputTypeSearch", "adornedStart", "adornedEnd"]);
function useInput(props, inputRef) {
  const {
    defaultValue,
    disabled: disabledProp = false,
    error: errorProp = false,
    onBlur,
    onChange,
    onFocus,
    required: requiredProp = false,
    value: valueProp
  } = props;
  const formControlContext = useFormControlUnstyled();
  let value;
  let required;
  let disabled;
  let error;
  if (formControlContext) {
    var _formControlContext$d, _formControlContext$r, _formControlContext$e;
    value = formControlContext.value;
    disabled = (_formControlContext$d = formControlContext.disabled) != null ? _formControlContext$d : false;
    required = (_formControlContext$r = formControlContext.required) != null ? _formControlContext$r : false;
    error = (_formControlContext$e = formControlContext.error) != null ? _formControlContext$e : false;
  } else {
    value = valueProp;
    disabled = disabledProp;
    required = requiredProp;
    error = errorProp;
  }
  const {
    current: isControlled
  } = react.useRef(value != null);
  const handleInputRefWarning = react.useCallback((instance) => {
  }, []);
  const internalInputRef = react.useRef(null);
  const handleIncomingRef = useForkRef(inputRef, handleInputRefWarning);
  const handleInputRef = useForkRef(internalInputRef, handleIncomingRef);
  const [focused, setFocused] = react.useState(false);
  react.useEffect(() => {
    if (!formControlContext && disabled && focused) {
      setFocused(false);
      onBlur == null ? void 0 : onBlur();
    }
  }, [formControlContext, disabled, focused, onBlur]);
  const handleFocus = (otherHandlers) => (event) => {
    var _otherHandlers$onFocu;
    if (formControlContext != null && formControlContext.disabled) {
      event.stopPropagation();
      return;
    }
    (_otherHandlers$onFocu = otherHandlers.onFocus) == null ? void 0 : _otherHandlers$onFocu.call(otherHandlers, event);
    if (formControlContext && formControlContext.onFocus) {
      var _formControlContext$o;
      formControlContext == null ? void 0 : (_formControlContext$o = formControlContext.onFocus) == null ? void 0 : _formControlContext$o.call(formControlContext);
    } else {
      setFocused(true);
    }
  };
  const handleBlur = (otherHandlers) => (event) => {
    var _otherHandlers$onBlur;
    (_otherHandlers$onBlur = otherHandlers.onBlur) == null ? void 0 : _otherHandlers$onBlur.call(otherHandlers, event);
    if (formControlContext && formControlContext.onBlur) {
      formControlContext.onBlur();
    } else {
      setFocused(false);
    }
  };
  const handleChange = (otherHandlers) => (event, ...args) => {
    var _formControlContext$o2, _otherHandlers$onChan;
    if (!isControlled) {
      const element = event.target || internalInputRef.current;
      if (element == null) {
        throw new Error(formatMuiErrorMessage(17));
      }
    }
    formControlContext == null ? void 0 : (_formControlContext$o2 = formControlContext.onChange) == null ? void 0 : _formControlContext$o2.call(formControlContext, event);
    (_otherHandlers$onChan = otherHandlers.onChange) == null ? void 0 : _otherHandlers$onChan.call(otherHandlers, event, ...args);
  };
  const handleClick = (otherHandlers) => (event) => {
    var _otherHandlers$onClic;
    if (internalInputRef.current && event.currentTarget === event.target) {
      internalInputRef.current.focus();
    }
    (_otherHandlers$onClic = otherHandlers.onClick) == null ? void 0 : _otherHandlers$onClic.call(otherHandlers, event);
  };
  const getRootProps = (externalProps) => {
    const propsEventHandlers = extractEventHandlers(props, ["onBlur", "onChange", "onFocus"]);
    const externalEventHandlers = _extends({}, propsEventHandlers, extractEventHandlers(externalProps));
    return _extends({}, externalProps, externalEventHandlers, {
      onClick: handleClick(externalEventHandlers)
    });
  };
  const getInputProps = (externalProps) => {
    const propsEventHandlers = {
      onBlur,
      onChange,
      onFocus
    };
    const externalEventHandlers = _extends({}, propsEventHandlers, extractEventHandlers(externalProps));
    const mergedEventHandlers = _extends({}, externalProps, externalEventHandlers, {
      onBlur: handleBlur(externalEventHandlers),
      onChange: handleChange(externalEventHandlers),
      onFocus: handleFocus(externalEventHandlers)
    });
    return _extends({}, mergedEventHandlers, {
      "aria-invalid": error || void 0,
      defaultValue,
      ref: handleInputRef,
      value,
      required,
      disabled
    });
  };
  return {
    disabled,
    error,
    focused,
    formControlContext,
    getInputProps,
    getRootProps,
    required,
    value
  };
}
var _excluded$32 = ["aria-describedby", "aria-label", "aria-labelledby", "autoComplete", "autoFocus", "className", "component", "components", "componentsProps", "defaultValue", "disabled", "endAdornment", "error", "id", "maxRows", "minRows", "multiline", "name", "onClick", "onChange", "onKeyDown", "onKeyUp", "onFocus", "onBlur", "placeholder", "readOnly", "required", "rows", "type", "startAdornment", "value"];
var InputUnstyled = /* @__PURE__ */ react.forwardRef(function InputUnstyled2(props, ref) {
  var _componentsProps$inpu, _ref, _componentsProps$root, _components$Input, _componentsProps$inpu2;
  const {
    "aria-describedby": ariaDescribedby,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    autoComplete,
    autoFocus,
    className,
    component,
    components = {},
    componentsProps = {},
    defaultValue,
    disabled,
    endAdornment,
    error,
    id: id2,
    maxRows,
    minRows,
    multiline = false,
    name,
    onClick,
    onChange,
    onKeyDown,
    onKeyUp,
    onFocus,
    onBlur,
    placeholder,
    readOnly,
    required,
    rows,
    type = "text",
    startAdornment,
    value
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$32);
  const {
    getRootProps,
    getInputProps,
    focused,
    formControlContext,
    error: errorState,
    disabled: disabledState
  } = useInput({
    disabled,
    defaultValue,
    error,
    onBlur,
    onClick,
    onChange,
    onFocus,
    required,
    value
  }, (_componentsProps$inpu = componentsProps.input) == null ? void 0 : _componentsProps$inpu.ref);
  const ownerState = _extends({}, props, {
    disabled: disabledState,
    error: errorState,
    focused,
    formControlContext,
    multiline,
    type
  });
  const rootStateClasses = clsx(disabledState && inputBaseClasses.disabled, errorState && inputBaseClasses.error, focused && inputBaseClasses.focused, Boolean(formControlContext) && inputBaseClasses.formControl, multiline && inputBaseClasses.multiline, Boolean(startAdornment) && inputBaseClasses.adornedStart, Boolean(endAdornment) && inputBaseClasses.adornedEnd);
  const inputStateClasses = clsx(disabledState && inputBaseClasses.disabled, multiline && inputBaseClasses.multiline);
  const propsToForward = {
    "aria-describedby": ariaDescribedby,
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    autoComplete,
    autoFocus,
    id: id2,
    onKeyDown,
    onKeyUp,
    name,
    placeholder,
    readOnly,
    type
  };
  const Root = (_ref = component != null ? component : components.Root) != null ? _ref : "div";
  const rootProps = appendOwnerState(Root, _extends({}, getRootProps(_extends({}, other, componentsProps.root)), {
    className: clsx(inputBaseClasses.root, rootStateClasses, className, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.className)
  }), ownerState);
  let Input3 = (_components$Input = components.Input) != null ? _components$Input : "input";
  let inputProps = appendOwnerState(Input3, _extends({}, getInputProps(_extends({}, componentsProps.input, propsToForward)), {
    className: clsx(inputBaseClasses.input, inputStateClasses, (_componentsProps$inpu2 = componentsProps.input) == null ? void 0 : _componentsProps$inpu2.className)
  }), ownerState);
  if (multiline) {
    var _components$Textarea, _components$Textarea2;
    const hasHostTexarea = isHostComponent((_components$Textarea = components.Textarea) != null ? _components$Textarea : "textarea");
    if (rows) {
      inputProps = _extends({
        type: void 0,
        minRows: hasHostTexarea ? void 0 : rows,
        maxRows: hasHostTexarea ? void 0 : rows
      }, inputProps);
    } else {
      inputProps = _extends({
        type: void 0,
        maxRows: hasHostTexarea ? void 0 : maxRows,
        minRows: hasHostTexarea ? void 0 : minRows
      }, inputProps);
    }
    Input3 = (_components$Textarea2 = components.Textarea) != null ? _components$Textarea2 : "textarea";
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(Root, _extends({}, rootProps, {
    ref,
    children: [startAdornment, /* @__PURE__ */ jsxRuntime.jsx(Input3, _extends({}, inputProps)), endAdornment]
  }));
});
function NoSsr(props) {
  const {
    children,
    defer = false,
    fallback = null
  } = props;
  const [mountedState, setMountedState] = react.useState(false);
  useEnhancedEffect(() => {
    if (!defer) {
      setMountedState(true);
    }
  }, [defer]);
  react.useEffect(() => {
    if (defer) {
      setMountedState(true);
    }
  }, [defer]);
  return /* @__PURE__ */ jsxRuntime.jsx(react.Fragment, {
    children: mountedState ? children : fallback
  });
}
function getSliderUtilityClass(slot) {
  return generateUtilityClass("MuiSlider", slot);
}
var sliderUnstyledClasses = generateUtilityClasses("MuiSlider", ["root", "active", "focusVisible", "disabled", "dragging", "marked", "vertical", "trackInverted", "trackFalse", "rail", "track", "mark", "markActive", "markLabel", "markLabelActive", "thumb", "valueLabel", "valueLabelOpen", "valueLabelCircle", "valueLabelLabel"]);
var useValueLabelClasses = (props) => {
  const {
    open
  } = props;
  const utilityClasses = {
    offset: clsx(open && sliderUnstyledClasses.valueLabelOpen),
    circle: sliderUnstyledClasses.valueLabelCircle,
    label: sliderUnstyledClasses.valueLabelLabel
  };
  return utilityClasses;
};
function SliderValueLabelUnstyled(props) {
  const {
    children,
    className,
    value,
    theme
  } = props;
  const classes = useValueLabelClasses(props);
  return /* @__PURE__ */ react.cloneElement(children, {
    className: clsx(children.props.className)
  }, /* @__PURE__ */ jsxRuntime.jsxs(react.Fragment, {
    children: [children.props.children, /* @__PURE__ */ jsxRuntime.jsx("span", {
      className: clsx(classes.offset, className),
      theme,
      "aria-hidden": true,
      children: /* @__PURE__ */ jsxRuntime.jsx("span", {
        className: classes.circle,
        children: /* @__PURE__ */ jsxRuntime.jsx("span", {
          className: classes.label,
          children: value
        })
      })
    })]
  }));
}
var _excluded$4 = ["aria-label", "aria-labelledby", "aria-valuetext", "className", "component", "classes", "defaultValue", "disableSwap", "disabled", "getAriaLabel", "getAriaValueText", "marks", "max", "min", "name", "onChange", "onChangeCommitted", "onMouseDown", "orientation", "scale", "step", "tabIndex", "track", "value", "valueLabelDisplay", "valueLabelFormat", "isRtl", "components", "componentsProps"];
var INTENTIONAL_DRAG_COUNT_THRESHOLD = 2;
function asc(a3, b5) {
  return a3 - b5;
}
function clamp2(value, min2, max2) {
  if (value == null) {
    return min2;
  }
  return Math.min(Math.max(min2, value), max2);
}
function findClosest(values3, currentValue) {
  const {
    index: closestIndex
  } = values3.reduce((acc, value, index) => {
    const distance = Math.abs(currentValue - value);
    if (acc === null || distance < acc.distance || distance === acc.distance) {
      return {
        distance,
        index
      };
    }
    return acc;
  }, null);
  return closestIndex;
}
function trackFinger(event, touchId) {
  if (touchId.current !== void 0 && event.changedTouches) {
    for (let i2 = 0; i2 < event.changedTouches.length; i2 += 1) {
      const touch = event.changedTouches[i2];
      if (touch.identifier === touchId.current) {
        return {
          x: touch.clientX,
          y: touch.clientY
        };
      }
    }
    return false;
  }
  return {
    x: event.clientX,
    y: event.clientY
  };
}
function valueToPercent(value, min2, max2) {
  return (value - min2) * 100 / (max2 - min2);
}
function percentToValue(percent, min2, max2) {
  return (max2 - min2) * percent + min2;
}
function getDecimalPrecision(num) {
  if (Math.abs(num) < 1) {
    const parts = num.toExponential().split("e-");
    const matissaDecimalPart = parts[0].split(".")[1];
    return (matissaDecimalPart ? matissaDecimalPart.length : 0) + parseInt(parts[1], 10);
  }
  const decimalPart = num.toString().split(".")[1];
  return decimalPart ? decimalPart.length : 0;
}
function roundValueToStep(value, step, min2) {
  const nearest = Math.round((value - min2) / step) * step + min2;
  return Number(nearest.toFixed(getDecimalPrecision(step)));
}
function setValueIndex({
  values: values3,
  newValue,
  index
}) {
  const output = values3.slice();
  output[index] = newValue;
  return output.sort(asc);
}
function focusThumb({
  sliderRef,
  activeIndex,
  setActive
}) {
  const doc = ownerDocument(sliderRef.current);
  if (!sliderRef.current.contains(doc.activeElement) || Number(doc.activeElement.getAttribute("data-index")) !== activeIndex) {
    sliderRef.current.querySelector(`[type="range"][data-index="${activeIndex}"]`).focus();
  }
  if (setActive) {
    setActive(activeIndex);
  }
}
var axisProps = {
  horizontal: {
    offset: (percent) => ({
      left: `${percent}%`
    }),
    leap: (percent) => ({
      width: `${percent}%`
    })
  },
  "horizontal-reverse": {
    offset: (percent) => ({
      right: `${percent}%`
    }),
    leap: (percent) => ({
      width: `${percent}%`
    })
  },
  vertical: {
    offset: (percent) => ({
      bottom: `${percent}%`
    }),
    leap: (percent) => ({
      height: `${percent}%`
    })
  }
};
var Identity = (x3) => x3;
var cachedSupportsTouchActionNone;
function doesSupportTouchActionNone() {
  if (cachedSupportsTouchActionNone === void 0) {
    if (typeof CSS !== "undefined" && typeof CSS.supports === "function") {
      cachedSupportsTouchActionNone = CSS.supports("touch-action", "none");
    } else {
      cachedSupportsTouchActionNone = true;
    }
  }
  return cachedSupportsTouchActionNone;
}
var useUtilityClasses$2 = (ownerState) => {
  const {
    disabled,
    dragging,
    marked,
    orientation,
    track,
    classes
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", dragging && "dragging", marked && "marked", orientation === "vertical" && "vertical", track === "inverted" && "trackInverted", track === false && "trackFalse"],
    rail: ["rail"],
    track: ["track"],
    mark: ["mark"],
    markActive: ["markActive"],
    markLabel: ["markLabel"],
    markLabelActive: ["markLabelActive"],
    valueLabel: ["valueLabel"],
    thumb: ["thumb", disabled && "disabled"],
    active: ["active"],
    disabled: ["disabled"],
    focusVisible: ["focusVisible"]
  };
  return composeClasses(slots, getSliderUtilityClass, classes);
};
var Forward = ({
  children
}) => children;
var SliderUnstyled = /* @__PURE__ */ react.forwardRef(function SliderUnstyled2(props, ref) {
  const {
    "aria-label": ariaLabel,
    "aria-labelledby": ariaLabelledby,
    "aria-valuetext": ariaValuetext,
    className,
    component = "span",
    classes: classesProp,
    defaultValue,
    disableSwap = false,
    disabled = false,
    getAriaLabel,
    getAriaValueText,
    marks: marksProp = false,
    max: max2 = 100,
    min: min2 = 0,
    name,
    onChange,
    onChangeCommitted,
    onMouseDown,
    orientation = "horizontal",
    scale = Identity,
    step = 1,
    tabIndex,
    track = "normal",
    value: valueProp,
    valueLabelDisplay = "off",
    valueLabelFormat = Identity,
    isRtl = false,
    components = {},
    componentsProps = {}
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$4);
  const touchId = react.useRef();
  const [active, setActive] = react.useState(-1);
  const [open, setOpen] = react.useState(-1);
  const [dragging, setDragging] = react.useState(false);
  const moveCount = react.useRef(0);
  const [valueDerived, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue != null ? defaultValue : min2,
    name: "Slider"
  });
  const handleChange = onChange && ((event, value, thumbIndex) => {
    const nativeEvent = event.nativeEvent || event;
    const clonedEvent = new nativeEvent.constructor(nativeEvent.type, nativeEvent);
    Object.defineProperty(clonedEvent, "target", {
      writable: true,
      value: {
        value,
        name
      }
    });
    onChange(clonedEvent, value, thumbIndex);
  });
  const range = Array.isArray(valueDerived);
  let values3 = range ? valueDerived.slice().sort(asc) : [valueDerived];
  values3 = values3.map((value) => clamp2(value, min2, max2));
  const marks = marksProp === true && step !== null ? [...Array(Math.floor((max2 - min2) / step) + 1)].map((_2, index) => ({
    value: min2 + step * index
  })) : marksProp || [];
  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = react.useState(-1);
  const sliderRef = react.useRef();
  const handleFocusRef = useForkRef(focusVisibleRef, sliderRef);
  const handleRef = useForkRef(ref, handleFocusRef);
  const handleFocus = useEventCallback((event) => {
    const index = Number(event.currentTarget.getAttribute("data-index"));
    handleFocusVisible(event);
    if (isFocusVisibleRef.current === true) {
      setFocusVisible(index);
    }
    setOpen(index);
  });
  const handleBlur = useEventCallback((event) => {
    handleBlurVisible(event);
    if (isFocusVisibleRef.current === false) {
      setFocusVisible(-1);
    }
    setOpen(-1);
  });
  const handleMouseOver = useEventCallback((event) => {
    const index = Number(event.currentTarget.getAttribute("data-index"));
    setOpen(index);
  });
  const handleMouseLeave = useEventCallback(() => {
    setOpen(-1);
  });
  useEnhancedEffect(() => {
    if (disabled && sliderRef.current.contains(document.activeElement)) {
      document.activeElement.blur();
    }
  }, [disabled]);
  if (disabled && active !== -1) {
    setActive(-1);
  }
  if (disabled && focusVisible !== -1) {
    setFocusVisible(-1);
  }
  const handleHiddenInputChange = useEventCallback((event) => {
    const index = Number(event.currentTarget.getAttribute("data-index"));
    const value = values3[index];
    const marksValues = marks.map((mark) => mark.value);
    const marksIndex = marksValues.indexOf(value);
    let newValue = event.target.valueAsNumber;
    if (marks && step == null) {
      newValue = newValue < value ? marksValues[marksIndex - 1] : marksValues[marksIndex + 1];
    }
    newValue = clamp2(newValue, min2, max2);
    if (marks && step == null) {
      const markValues = marks.map((mark) => mark.value);
      const currentMarkIndex = markValues.indexOf(values3[index]);
      newValue = newValue < values3[index] ? markValues[currentMarkIndex - 1] : markValues[currentMarkIndex + 1];
    }
    if (range) {
      if (disableSwap) {
        newValue = clamp2(newValue, values3[index - 1] || -Infinity, values3[index + 1] || Infinity);
      }
      const previousValue = newValue;
      newValue = setValueIndex({
        values: values3,
        newValue,
        index
      });
      let activeIndex = index;
      if (!disableSwap) {
        activeIndex = newValue.indexOf(previousValue);
      }
      focusThumb({
        sliderRef,
        activeIndex
      });
    }
    setValueState(newValue);
    setFocusVisible(index);
    if (handleChange) {
      handleChange(event, newValue, index);
    }
    if (onChangeCommitted) {
      onChangeCommitted(event, newValue);
    }
  });
  const previousIndex = react.useRef();
  let axis = orientation;
  if (isRtl && orientation !== "vertical") {
    axis += "-reverse";
  }
  const getFingerNewValue = ({
    finger,
    move = false,
    values: values22
  }) => {
    const {
      current: slider
    } = sliderRef;
    const {
      width: width2,
      height: height2,
      bottom: bottom3,
      left: left3
    } = slider.getBoundingClientRect();
    let percent;
    if (axis.indexOf("vertical") === 0) {
      percent = (bottom3 - finger.y) / height2;
    } else {
      percent = (finger.x - left3) / width2;
    }
    if (axis.indexOf("-reverse") !== -1) {
      percent = 1 - percent;
    }
    let newValue;
    newValue = percentToValue(percent, min2, max2);
    if (step) {
      newValue = roundValueToStep(newValue, step, min2);
    } else {
      const marksValues = marks.map((mark) => mark.value);
      const closestIndex = findClosest(marksValues, newValue);
      newValue = marksValues[closestIndex];
    }
    newValue = clamp2(newValue, min2, max2);
    let activeIndex = 0;
    if (range) {
      if (!move) {
        activeIndex = findClosest(values22, newValue);
      } else {
        activeIndex = previousIndex.current;
      }
      if (disableSwap) {
        newValue = clamp2(newValue, values22[activeIndex - 1] || -Infinity, values22[activeIndex + 1] || Infinity);
      }
      const previousValue = newValue;
      newValue = setValueIndex({
        values: values22,
        newValue,
        index: activeIndex
      });
      if (!(disableSwap && move)) {
        activeIndex = newValue.indexOf(previousValue);
        previousIndex.current = activeIndex;
      }
    }
    return {
      newValue,
      activeIndex
    };
  };
  const handleTouchMove = useEventCallback((nativeEvent) => {
    const finger = trackFinger(nativeEvent, touchId);
    if (!finger) {
      return;
    }
    moveCount.current += 1;
    if (nativeEvent.type === "mousemove" && nativeEvent.buttons === 0) {
      handleTouchEnd(nativeEvent);
      return;
    }
    const {
      newValue,
      activeIndex
    } = getFingerNewValue({
      finger,
      move: true,
      values: values3
    });
    focusThumb({
      sliderRef,
      activeIndex,
      setActive
    });
    setValueState(newValue);
    if (!dragging && moveCount.current > INTENTIONAL_DRAG_COUNT_THRESHOLD) {
      setDragging(true);
    }
    if (handleChange) {
      handleChange(nativeEvent, newValue, activeIndex);
    }
  });
  const handleTouchEnd = useEventCallback((nativeEvent) => {
    const finger = trackFinger(nativeEvent, touchId);
    setDragging(false);
    if (!finger) {
      return;
    }
    const {
      newValue
    } = getFingerNewValue({
      finger,
      values: values3
    });
    setActive(-1);
    if (nativeEvent.type === "touchend") {
      setOpen(-1);
    }
    if (onChangeCommitted) {
      onChangeCommitted(nativeEvent, newValue);
    }
    touchId.current = void 0;
    stopListening();
  });
  const handleTouchStart = useEventCallback((nativeEvent) => {
    if (!doesSupportTouchActionNone()) {
      nativeEvent.preventDefault();
    }
    const touch = nativeEvent.changedTouches[0];
    if (touch != null) {
      touchId.current = touch.identifier;
    }
    const finger = trackFinger(nativeEvent, touchId);
    const {
      newValue,
      activeIndex
    } = getFingerNewValue({
      finger,
      values: values3
    });
    focusThumb({
      sliderRef,
      activeIndex,
      setActive
    });
    setValueState(newValue);
    if (handleChange) {
      handleChange(nativeEvent, newValue, activeIndex);
    }
    moveCount.current = 0;
    const doc = ownerDocument(sliderRef.current);
    doc.addEventListener("touchmove", handleTouchMove);
    doc.addEventListener("touchend", handleTouchEnd);
  });
  const stopListening = react.useCallback(() => {
    const doc = ownerDocument(sliderRef.current);
    doc.removeEventListener("mousemove", handleTouchMove);
    doc.removeEventListener("mouseup", handleTouchEnd);
    doc.removeEventListener("touchmove", handleTouchMove);
    doc.removeEventListener("touchend", handleTouchEnd);
  }, [handleTouchEnd, handleTouchMove]);
  react.useEffect(() => {
    const {
      current: slider
    } = sliderRef;
    slider.addEventListener("touchstart", handleTouchStart, {
      passive: doesSupportTouchActionNone()
    });
    return () => {
      slider.removeEventListener("touchstart", handleTouchStart, {
        passive: doesSupportTouchActionNone()
      });
      stopListening();
    };
  }, [stopListening, handleTouchStart]);
  react.useEffect(() => {
    if (disabled) {
      stopListening();
    }
  }, [disabled, stopListening]);
  const handleMouseDown = useEventCallback((event) => {
    if (onMouseDown) {
      onMouseDown(event);
    }
    if (event.button !== 0) {
      return;
    }
    event.preventDefault();
    const finger = trackFinger(event, touchId);
    const {
      newValue,
      activeIndex
    } = getFingerNewValue({
      finger,
      values: values3
    });
    focusThumb({
      sliderRef,
      activeIndex,
      setActive
    });
    setValueState(newValue);
    if (handleChange) {
      handleChange(event, newValue, activeIndex);
    }
    moveCount.current = 0;
    const doc = ownerDocument(sliderRef.current);
    doc.addEventListener("mousemove", handleTouchMove);
    doc.addEventListener("mouseup", handleTouchEnd);
  });
  const trackOffset = valueToPercent(range ? values3[0] : min2, min2, max2);
  const trackLeap = valueToPercent(values3[values3.length - 1], min2, max2) - trackOffset;
  const trackStyle = _extends({}, axisProps[axis].offset(trackOffset), axisProps[axis].leap(trackLeap));
  const Root = components.Root || component;
  const rootProps = componentsProps.root || {};
  const Rail = components.Rail || "span";
  const railProps = componentsProps.rail || {};
  const Track = components.Track || "span";
  const trackProps = componentsProps.track || {};
  const Thumb = components.Thumb || "span";
  const thumbProps = componentsProps.thumb || {};
  const ValueLabel = components.ValueLabel || SliderValueLabelUnstyled;
  const valueLabelProps = componentsProps.valueLabel || {};
  const Mark = components.Mark || "span";
  const markProps = componentsProps.mark || {};
  const MarkLabel = components.MarkLabel || "span";
  const markLabelProps = componentsProps.markLabel || {};
  const ownerState = _extends({}, props, {
    classes: classesProp,
    disabled,
    dragging,
    isRtl,
    marked: marks.length > 0 && marks.some((mark) => mark.label),
    max: max2,
    min: min2,
    orientation,
    scale,
    step,
    track,
    valueLabelDisplay,
    valueLabelFormat
  });
  const classes = useUtilityClasses$2(ownerState);
  return /* @__PURE__ */ jsxRuntime.jsxs(Root, _extends({
    ref: handleRef,
    onMouseDown: handleMouseDown
  }, rootProps, !isHostComponent(Root) && {
    as: component,
    ownerState: _extends({}, ownerState, rootProps.ownerState)
  }, other, {
    className: clsx(classes.root, rootProps.className, className),
    children: [/* @__PURE__ */ jsxRuntime.jsx(Rail, _extends({}, railProps, !isHostComponent(Rail) && {
      ownerState: _extends({}, ownerState, railProps.ownerState)
    }, {
      className: clsx(classes.rail, railProps.className)
    })), /* @__PURE__ */ jsxRuntime.jsx(Track, _extends({}, trackProps, !isHostComponent(Track) && {
      ownerState: _extends({}, ownerState, trackProps.ownerState)
    }, {
      className: clsx(classes.track, trackProps.className),
      style: _extends({}, trackStyle, trackProps.style)
    })), marks.map((mark, index) => {
      const percent = valueToPercent(mark.value, min2, max2);
      const style2 = axisProps[axis].offset(percent);
      let markActive;
      if (track === false) {
        markActive = values3.indexOf(mark.value) !== -1;
      } else {
        markActive = track === "normal" && (range ? mark.value >= values3[0] && mark.value <= values3[values3.length - 1] : mark.value <= values3[0]) || track === "inverted" && (range ? mark.value <= values3[0] || mark.value >= values3[values3.length - 1] : mark.value >= values3[0]);
      }
      return /* @__PURE__ */ jsxRuntime.jsxs(react.Fragment, {
        children: [/* @__PURE__ */ jsxRuntime.jsx(Mark, _extends({
          "data-index": index
        }, markProps, !isHostComponent(Mark) && {
          ownerState: _extends({}, ownerState, markProps.ownerState),
          markActive
        }, {
          style: _extends({}, style2, markProps.style),
          className: clsx(classes.mark, markProps.className, markActive && classes.markActive)
        })), mark.label != null ? /* @__PURE__ */ jsxRuntime.jsx(MarkLabel, _extends({
          "aria-hidden": true,
          "data-index": index
        }, markLabelProps, !isHostComponent(MarkLabel) && {
          ownerState: _extends({}, ownerState, markLabelProps.ownerState)
        }, {
          markLabelActive: markActive,
          style: _extends({}, style2, markLabelProps.style),
          className: clsx(classes.markLabel, markLabelProps.className, markActive && classes.markLabelActive),
          children: mark.label
        })) : null]
      }, mark.value);
    }), values3.map((value, index) => {
      const percent = valueToPercent(value, min2, max2);
      const style2 = axisProps[axis].offset(percent);
      const ValueLabelComponent = valueLabelDisplay === "off" ? Forward : ValueLabel;
      return /* @__PURE__ */ jsxRuntime.jsx(react.Fragment, {
        children: /* @__PURE__ */ jsxRuntime.jsx(ValueLabelComponent, _extends({
          valueLabelFormat,
          valueLabelDisplay,
          value: typeof valueLabelFormat === "function" ? valueLabelFormat(scale(value), index) : valueLabelFormat,
          index,
          open: open === index || active === index || valueLabelDisplay === "on",
          disabled
        }, valueLabelProps, {
          className: clsx(classes.valueLabel, valueLabelProps.className)
        }, !isHostComponent(ValueLabel) && {
          ownerState: _extends({}, ownerState, valueLabelProps.ownerState)
        }, {
          children: /* @__PURE__ */ jsxRuntime.jsx(Thumb, _extends({
            "data-index": index,
            onMouseOver: handleMouseOver,
            onMouseLeave: handleMouseLeave
          }, thumbProps, {
            className: clsx(classes.thumb, thumbProps.className, active === index && classes.active, focusVisible === index && classes.focusVisible)
          }, !isHostComponent(Thumb) && {
            ownerState: _extends({}, ownerState, thumbProps.ownerState)
          }, {
            style: _extends({}, style2, {
              pointerEvents: disableSwap && active !== index ? "none" : void 0
            }, thumbProps.style),
            children: /* @__PURE__ */ jsxRuntime.jsx("input", {
              tabIndex,
              "data-index": index,
              "aria-label": getAriaLabel ? getAriaLabel(index) : ariaLabel,
              "aria-labelledby": ariaLabelledby,
              "aria-orientation": orientation,
              "aria-valuemax": scale(max2),
              "aria-valuemin": scale(min2),
              "aria-valuenow": scale(value),
              "aria-valuetext": getAriaValueText ? getAriaValueText(scale(value), index) : ariaValuetext,
              onFocus: handleFocus,
              onBlur: handleBlur,
              name,
              type: "range",
              min: props.min,
              max: props.max,
              step: props.step,
              disabled,
              value: values3[index],
              onChange: handleHiddenInputChange,
              style: _extends({}, visuallyHidden, {
                direction: isRtl ? "rtl" : "ltr",
                width: "100%",
                height: "100%"
              })
            })
          }))
        }))
      }, index);
    })]
  }));
});
function useSwitch(props) {
  const {
    checked: checkedProp,
    defaultChecked,
    disabled,
    onBlur,
    onChange,
    onFocus,
    onFocusVisible,
    readOnly,
    required
  } = props;
  const [checked, setCheckedState] = useControlled({
    controlled: checkedProp,
    default: Boolean(defaultChecked),
    name: "Switch",
    state: "checked"
  });
  const handleInputChange = useEventCallback((event, otherHandler) => {
    if (event.nativeEvent.defaultPrevented) {
      return;
    }
    setCheckedState(event.target.checked);
    onChange == null ? void 0 : onChange(event);
    otherHandler == null ? void 0 : otherHandler(event);
  });
  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef
  } = useIsFocusVisible();
  const [focusVisible, setFocusVisible] = react.useState(false);
  if (disabled && focusVisible) {
    setFocusVisible(false);
  }
  react.useEffect(() => {
    isFocusVisibleRef.current = focusVisible;
  }, [focusVisible, isFocusVisibleRef]);
  const inputRef = react.useRef(null);
  const handleFocus = useEventCallback((event, otherHandler) => {
    if (!inputRef.current) {
      inputRef.current = event.currentTarget;
    }
    handleFocusVisible(event);
    if (isFocusVisibleRef.current === true) {
      setFocusVisible(true);
      onFocusVisible == null ? void 0 : onFocusVisible(event);
    }
    onFocus == null ? void 0 : onFocus(event);
    otherHandler == null ? void 0 : otherHandler(event);
  });
  const handleBlur = useEventCallback((event, otherHandler) => {
    handleBlurVisible(event);
    if (isFocusVisibleRef.current === false) {
      setFocusVisible(false);
    }
    onBlur == null ? void 0 : onBlur(event);
    otherHandler == null ? void 0 : otherHandler(event);
  });
  const handleRefChange = useForkRef(focusVisibleRef, inputRef);
  const getInputProps = (otherProps = {}) => _extends({
    checked: checkedProp,
    defaultChecked,
    disabled,
    readOnly,
    required,
    type: "checkbox"
  }, otherProps, {
    onChange: (event) => handleInputChange(event, otherProps.onChange),
    onFocus: (event) => handleFocus(event, otherProps.onFocus),
    onBlur: (event) => handleBlur(event, otherProps.onBlur),
    ref: handleRefChange
  });
  return {
    checked,
    disabled: Boolean(disabled),
    focusVisible,
    getInputProps,
    readOnly: Boolean(readOnly)
  };
}
function getSwitchUnstyledUtilityClass(slot) {
  return generateUtilityClass("MuiSwitch", slot);
}
var switchUnstyledClasses = generateUtilityClasses("MuiSwitch", ["root", "input", "track", "thumb", "checked", "disabled", "focusVisible", "readOnly"]);
var _excluded$5 = ["checked", "className", "component", "components", "componentsProps", "defaultChecked", "disabled", "onBlur", "onChange", "onFocus", "onFocusVisible", "readOnly", "required"];
var SwitchUnstyled = /* @__PURE__ */ react.forwardRef(function SwitchUnstyled2(props, ref) {
  var _ref, _components$Thumb, _componentsProps$thum, _components$Input, _componentsProps$inpu, _components$Track, _componentsProps$trac;
  const {
    checked: checkedProp,
    className,
    component,
    components = {},
    componentsProps = {},
    defaultChecked,
    disabled: disabledProp,
    onBlur,
    onChange,
    onFocus,
    onFocusVisible,
    readOnly: readOnlyProp
  } = props, otherProps = _objectWithoutPropertiesLoose(props, _excluded$5);
  const useSwitchProps = {
    checked: checkedProp,
    defaultChecked,
    disabled: disabledProp,
    onBlur,
    onChange,
    onFocus,
    onFocusVisible,
    readOnly: readOnlyProp
  };
  const {
    getInputProps,
    checked,
    disabled,
    focusVisible,
    readOnly
  } = useSwitch(useSwitchProps);
  const ownerState = _extends({}, props, {
    checked,
    disabled,
    focusVisible,
    readOnly
  });
  const Root = (_ref = component != null ? component : components.Root) != null ? _ref : "span";
  const rootProps = appendOwnerState(Root, _extends({}, otherProps, componentsProps.root), ownerState);
  const Thumb = (_components$Thumb = components.Thumb) != null ? _components$Thumb : "span";
  const thumbProps = appendOwnerState(Thumb, (_componentsProps$thum = componentsProps.thumb) != null ? _componentsProps$thum : {}, ownerState);
  const Input3 = (_components$Input = components.Input) != null ? _components$Input : "input";
  const inputProps = appendOwnerState(Input3, (_componentsProps$inpu = componentsProps.input) != null ? _componentsProps$inpu : {}, ownerState);
  const Track = components.Track === null ? () => null : (_components$Track = components.Track) != null ? _components$Track : "span";
  const trackProps = appendOwnerState(Track, (_componentsProps$trac = componentsProps.track) != null ? _componentsProps$trac : {}, ownerState);
  const stateClasses = clsx(checked && switchUnstyledClasses.checked, disabled && switchUnstyledClasses.disabled, focusVisible && switchUnstyledClasses.focusVisible, readOnly && switchUnstyledClasses.readOnly);
  return /* @__PURE__ */ jsxRuntime.jsxs(Root, _extends({
    ref
  }, rootProps, {
    className: clsx(switchUnstyledClasses.root, stateClasses, className, rootProps == null ? void 0 : rootProps.className),
    children: [/* @__PURE__ */ jsxRuntime.jsx(Track, _extends({}, trackProps, {
      className: clsx(switchUnstyledClasses.track, trackProps == null ? void 0 : trackProps.className)
    })), /* @__PURE__ */ jsxRuntime.jsx(Thumb, _extends({}, thumbProps, {
      className: clsx(switchUnstyledClasses.thumb, thumbProps == null ? void 0 : thumbProps.className)
    })), /* @__PURE__ */ jsxRuntime.jsx(Input3, _extends({}, getInputProps(inputProps), {
      className: clsx(switchUnstyledClasses.input, inputProps == null ? void 0 : inputProps.className)
    }))]
  }));
});
/** @license MUI v5.0.0-alpha.51
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var core = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  BackdropUnstyled,
  BadgeUnstyled,
  ButtonUnstyled,
  unstable_composeClasses: composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  FormControlUnstyled,
  InputUnstyled,
  ModalUnstyled,
  NoSsr,
  Portal: Portal3,
  SliderUnstyled,
  SwitchUnstyled,
  Unstable_TrapFocus,
  useAutocomplete,
  createFilterOptions,
  backdropUnstyledClasses,
  getBackdropUtilityClass,
  badgeUnstyledClasses,
  getBadgeUtilityClass,
  buttonUnstyledClasses,
  getButtonUnstyledUtilityClass,
  useButton,
  FormControlUnstyledContext,
  formControlUnstyledClasses,
  useFormControlUnstyled,
  getFormControlUnstyledUtilityClasses,
  useInput,
  inputUnstyledClasses: inputBaseClasses,
  getInputUnstyledUtilityClass,
  ModalManager,
  modalUnstyledClasses,
  getModalUtilityClass,
  SliderValueLabelUnstyled,
  sliderUnstyledClasses,
  getSliderUtilityClass,
  useSwitch,
  switchUnstyledClasses,
  getSwitchUnstyledUtilityClass,
  appendOwnerState,
  extractEventHandlers,
  isHostComponent
});

// docs/snowpack/pkg/common/Transition-6f34324c.js
function _setPrototypeOf(o, p5) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf2(o2, p6) {
    o2.__proto__ = p6;
    return o2;
  };
  return _setPrototypeOf(o, p5);
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
var config = {
  disabled: false
};
var TransitionGroupContext = react.createContext(null);
var UNMOUNTED = "unmounted";
var EXITED = "exited";
var ENTERING = "entering";
var ENTERED = "entered";
var EXITING = "exiting";
var Transition = /* @__PURE__ */ function(_React$Component) {
  _inheritsLoose(Transition2, _React$Component);
  function Transition2(props, context) {
    var _this;
    _this = _React$Component.call(this, props, context) || this;
    var parentGroup = context;
    var appear = parentGroup && !parentGroup.isMounting ? props.enter : props.appear;
    var initialStatus;
    _this.appearStatus = null;
    if (props.in) {
      if (appear) {
        initialStatus = EXITED;
        _this.appearStatus = ENTERING;
      } else {
        initialStatus = ENTERED;
      }
    } else {
      if (props.unmountOnExit || props.mountOnEnter) {
        initialStatus = UNMOUNTED;
      } else {
        initialStatus = EXITED;
      }
    }
    _this.state = {
      status: initialStatus
    };
    _this.nextCallback = null;
    return _this;
  }
  Transition2.getDerivedStateFromProps = function getDerivedStateFromProps(_ref, prevState) {
    var nextIn = _ref.in;
    if (nextIn && prevState.status === UNMOUNTED) {
      return {
        status: EXITED
      };
    }
    return null;
  };
  var _proto = Transition2.prototype;
  _proto.componentDidMount = function componentDidMount() {
    this.updateStatus(true, this.appearStatus);
  };
  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    var nextStatus = null;
    if (prevProps !== this.props) {
      var status = this.state.status;
      if (this.props.in) {
        if (status !== ENTERING && status !== ENTERED) {
          nextStatus = ENTERING;
        }
      } else {
        if (status === ENTERING || status === ENTERED) {
          nextStatus = EXITING;
        }
      }
    }
    this.updateStatus(false, nextStatus);
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    this.cancelNextCallback();
  };
  _proto.getTimeouts = function getTimeouts() {
    var timeout = this.props.timeout;
    var exit, enter, appear;
    exit = enter = appear = timeout;
    if (timeout != null && typeof timeout !== "number") {
      exit = timeout.exit;
      enter = timeout.enter;
      appear = timeout.appear !== void 0 ? timeout.appear : enter;
    }
    return {
      exit,
      enter,
      appear
    };
  };
  _proto.updateStatus = function updateStatus(mounting, nextStatus) {
    if (mounting === void 0) {
      mounting = false;
    }
    if (nextStatus !== null) {
      this.cancelNextCallback();
      if (nextStatus === ENTERING) {
        this.performEnter(mounting);
      } else {
        this.performExit();
      }
    } else if (this.props.unmountOnExit && this.state.status === EXITED) {
      this.setState({
        status: UNMOUNTED
      });
    }
  };
  _proto.performEnter = function performEnter(mounting) {
    var _this2 = this;
    var enter = this.props.enter;
    var appearing = this.context ? this.context.isMounting : mounting;
    var _ref2 = this.props.nodeRef ? [appearing] : [reactDom.findDOMNode(this), appearing], maybeNode = _ref2[0], maybeAppearing = _ref2[1];
    var timeouts = this.getTimeouts();
    var enterTimeout = appearing ? timeouts.appear : timeouts.enter;
    if (!mounting && !enter || config.disabled) {
      this.safeSetState({
        status: ENTERED
      }, function() {
        _this2.props.onEntered(maybeNode);
      });
      return;
    }
    this.props.onEnter(maybeNode, maybeAppearing);
    this.safeSetState({
      status: ENTERING
    }, function() {
      _this2.props.onEntering(maybeNode, maybeAppearing);
      _this2.onTransitionEnd(enterTimeout, function() {
        _this2.safeSetState({
          status: ENTERED
        }, function() {
          _this2.props.onEntered(maybeNode, maybeAppearing);
        });
      });
    });
  };
  _proto.performExit = function performExit() {
    var _this3 = this;
    var exit = this.props.exit;
    var timeouts = this.getTimeouts();
    var maybeNode = this.props.nodeRef ? void 0 : reactDom.findDOMNode(this);
    if (!exit || config.disabled) {
      this.safeSetState({
        status: EXITED
      }, function() {
        _this3.props.onExited(maybeNode);
      });
      return;
    }
    this.props.onExit(maybeNode);
    this.safeSetState({
      status: EXITING
    }, function() {
      _this3.props.onExiting(maybeNode);
      _this3.onTransitionEnd(timeouts.exit, function() {
        _this3.safeSetState({
          status: EXITED
        }, function() {
          _this3.props.onExited(maybeNode);
        });
      });
    });
  };
  _proto.cancelNextCallback = function cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  };
  _proto.safeSetState = function safeSetState(nextState, callback) {
    callback = this.setNextCallback(callback);
    this.setState(nextState, callback);
  };
  _proto.setNextCallback = function setNextCallback(callback) {
    var _this4 = this;
    var active = true;
    this.nextCallback = function(event) {
      if (active) {
        active = false;
        _this4.nextCallback = null;
        callback(event);
      }
    };
    this.nextCallback.cancel = function() {
      active = false;
    };
    return this.nextCallback;
  };
  _proto.onTransitionEnd = function onTransitionEnd(timeout, handler) {
    this.setNextCallback(handler);
    var node = this.props.nodeRef ? this.props.nodeRef.current : reactDom.findDOMNode(this);
    var doesNotHaveTimeoutOrListener = timeout == null && !this.props.addEndListener;
    if (!node || doesNotHaveTimeoutOrListener) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var _ref3 = this.props.nodeRef ? [this.nextCallback] : [node, this.nextCallback], maybeNode = _ref3[0], maybeNextCallback = _ref3[1];
      this.props.addEndListener(maybeNode, maybeNextCallback);
    }
    if (timeout != null) {
      setTimeout(this.nextCallback, timeout);
    }
  };
  _proto.render = function render2() {
    var status = this.state.status;
    if (status === UNMOUNTED) {
      return null;
    }
    var _this$props = this.props, children = _this$props.children, _in = _this$props.in, _mountOnEnter = _this$props.mountOnEnter, _unmountOnExit = _this$props.unmountOnExit, _appear = _this$props.appear, _enter = _this$props.enter, _exit = _this$props.exit, _timeout = _this$props.timeout, _addEndListener = _this$props.addEndListener, _onEnter = _this$props.onEnter, _onEntering = _this$props.onEntering, _onEntered = _this$props.onEntered, _onExit = _this$props.onExit, _onExiting = _this$props.onExiting, _onExited = _this$props.onExited, _nodeRef = _this$props.nodeRef, childProps = _objectWithoutPropertiesLoose(_this$props, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return /* @__PURE__ */ react.createElement(TransitionGroupContext.Provider, {
      value: null
    }, typeof children === "function" ? children(status, childProps) : react.cloneElement(react.Children.only(children), childProps));
  };
  return Transition2;
}(react.Component);
Transition.contextType = TransitionGroupContext;
Transition.propTypes = {};
function noop() {
}
Transition.defaultProps = {
  in: false,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  enter: true,
  exit: true,
  onEnter: noop,
  onEntering: noop,
  onEntered: noop,
  onExit: noop,
  onExiting: noop,
  onExited: noop
};
Transition.UNMOUNTED = UNMOUNTED;
Transition.EXITED = EXITED;
Transition.ENTERING = ENTERING;
Transition.ENTERED = ENTERED;
Transition.EXITING = EXITING;

// docs/snowpack/pkg/common/index-8bc207d9.js
var useForkRef2 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _default = esm.unstable_useForkRef;
  exports.default = _default;
});
var useEventCallback2 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _default = esm.unstable_useEventCallback;
  exports.default = _default;
});
var useIsFocusVisible2 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _default = esm.unstable_useIsFocusVisible;
  exports.default = _default;
});
function hasClass(element, className) {
  if (element.classList)
    return !!className && element.classList.contains(className);
  return (" " + (element.className.baseVal || element.className) + " ").indexOf(" " + className + " ") !== -1;
}
function addClass(element, className) {
  if (element.classList)
    element.classList.add(className);
  else if (!hasClass(element, className))
    if (typeof element.className === "string")
      element.className = element.className + " " + className;
    else
      element.setAttribute("class", (element.className && element.className.baseVal || "") + " " + className);
}
function replaceClassName(origClass, classToRemove) {
  return origClass.replace(new RegExp("(^|\\s)" + classToRemove + "(?:\\s|$)", "g"), "$1").replace(/\s+/g, " ").replace(/^\s*|\s*$/g, "");
}
function removeClass(element, className) {
  if (element.classList) {
    element.classList.remove(className);
  } else if (typeof element.className === "string") {
    element.className = replaceClassName(element.className, className);
  } else {
    element.setAttribute("class", replaceClassName(element.className && element.className.baseVal || "", className));
  }
}
var _addClass = function addClass$1(node, classes) {
  return node && classes && classes.split(" ").forEach(function(c6) {
    return addClass(node, c6);
  });
};
var removeClass$1 = function removeClass$12(node, classes) {
  return node && classes && classes.split(" ").forEach(function(c6) {
    return removeClass(node, c6);
  });
};
var CSSTransition = /* @__PURE__ */ function(_React$Component) {
  _inheritsLoose(CSSTransition2, _React$Component);
  function CSSTransition2() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.appliedClasses = {
      appear: {},
      enter: {},
      exit: {}
    };
    _this.onEnter = function(maybeNode, maybeAppearing) {
      var _this$resolveArgument = _this.resolveArguments(maybeNode, maybeAppearing), node = _this$resolveArgument[0], appearing = _this$resolveArgument[1];
      _this.removeClasses(node, "exit");
      _this.addClass(node, appearing ? "appear" : "enter", "base");
      if (_this.props.onEnter) {
        _this.props.onEnter(maybeNode, maybeAppearing);
      }
    };
    _this.onEntering = function(maybeNode, maybeAppearing) {
      var _this$resolveArgument2 = _this.resolveArguments(maybeNode, maybeAppearing), node = _this$resolveArgument2[0], appearing = _this$resolveArgument2[1];
      var type = appearing ? "appear" : "enter";
      _this.addClass(node, type, "active");
      if (_this.props.onEntering) {
        _this.props.onEntering(maybeNode, maybeAppearing);
      }
    };
    _this.onEntered = function(maybeNode, maybeAppearing) {
      var _this$resolveArgument3 = _this.resolveArguments(maybeNode, maybeAppearing), node = _this$resolveArgument3[0], appearing = _this$resolveArgument3[1];
      var type = appearing ? "appear" : "enter";
      _this.removeClasses(node, type);
      _this.addClass(node, type, "done");
      if (_this.props.onEntered) {
        _this.props.onEntered(maybeNode, maybeAppearing);
      }
    };
    _this.onExit = function(maybeNode) {
      var _this$resolveArgument4 = _this.resolveArguments(maybeNode), node = _this$resolveArgument4[0];
      _this.removeClasses(node, "appear");
      _this.removeClasses(node, "enter");
      _this.addClass(node, "exit", "base");
      if (_this.props.onExit) {
        _this.props.onExit(maybeNode);
      }
    };
    _this.onExiting = function(maybeNode) {
      var _this$resolveArgument5 = _this.resolveArguments(maybeNode), node = _this$resolveArgument5[0];
      _this.addClass(node, "exit", "active");
      if (_this.props.onExiting) {
        _this.props.onExiting(maybeNode);
      }
    };
    _this.onExited = function(maybeNode) {
      var _this$resolveArgument6 = _this.resolveArguments(maybeNode), node = _this$resolveArgument6[0];
      _this.removeClasses(node, "exit");
      _this.addClass(node, "exit", "done");
      if (_this.props.onExited) {
        _this.props.onExited(maybeNode);
      }
    };
    _this.resolveArguments = function(maybeNode, maybeAppearing) {
      return _this.props.nodeRef ? [_this.props.nodeRef.current, maybeNode] : [maybeNode, maybeAppearing];
    };
    _this.getClassNames = function(type) {
      var classNames = _this.props.classNames;
      var isStringClassNames = typeof classNames === "string";
      var prefix = isStringClassNames && classNames ? classNames + "-" : "";
      var baseClassName = isStringClassNames ? "" + prefix + type : classNames[type];
      var activeClassName = isStringClassNames ? baseClassName + "-active" : classNames[type + "Active"];
      var doneClassName = isStringClassNames ? baseClassName + "-done" : classNames[type + "Done"];
      return {
        baseClassName,
        activeClassName,
        doneClassName
      };
    };
    return _this;
  }
  var _proto = CSSTransition2.prototype;
  _proto.addClass = function addClass2(node, type, phase) {
    var className = this.getClassNames(type)[phase + "ClassName"];
    var _this$getClassNames = this.getClassNames("enter"), doneClassName = _this$getClassNames.doneClassName;
    if (type === "appear" && phase === "done" && doneClassName) {
      className += " " + doneClassName;
    }
    if (phase === "active") {
      node && node.scrollTop;
    }
    if (className) {
      this.appliedClasses[type][phase] = className;
      _addClass(node, className);
    }
  };
  _proto.removeClasses = function removeClasses(node, type) {
    var _this$appliedClasses$ = this.appliedClasses[type], baseClassName = _this$appliedClasses$.base, activeClassName = _this$appliedClasses$.active, doneClassName = _this$appliedClasses$.done;
    this.appliedClasses[type] = {};
    if (baseClassName) {
      removeClass$1(node, baseClassName);
    }
    if (activeClassName) {
      removeClass$1(node, activeClassName);
    }
    if (doneClassName) {
      removeClass$1(node, doneClassName);
    }
  };
  _proto.render = function render2() {
    var _this$props = this.props, _2 = _this$props.classNames, props = _objectWithoutPropertiesLoose(_this$props, ["classNames"]);
    return /* @__PURE__ */ react.createElement(Transition, _extends({}, props, {
      onEnter: this.onEnter,
      onEntered: this.onEntered,
      onEntering: this.onEntering,
      onExit: this.onExit,
      onExiting: this.onExiting,
      onExited: this.onExited
    }));
  };
  return CSSTransition2;
}(react.Component);
CSSTransition.defaultProps = {
  classNames: ""
};
CSSTransition.propTypes = {};
function _assertThisInitialized(self2) {
  if (self2 === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self2;
}
function getChildMapping(children, mapFn) {
  var mapper = function mapper2(child) {
    return mapFn && react.isValidElement(child) ? mapFn(child) : child;
  };
  var result = Object.create(null);
  if (children)
    react.Children.map(children, function(c6) {
      return c6;
    }).forEach(function(child) {
      result[child.key] = mapper(child);
    });
  return result;
}
function mergeChildMappings(prev, next) {
  prev = prev || {};
  next = next || {};
  function getValueForKey(key) {
    return key in next ? next[key] : prev[key];
  }
  var nextKeysPending = Object.create(null);
  var pendingKeys = [];
  for (var prevKey in prev) {
    if (prevKey in next) {
      if (pendingKeys.length) {
        nextKeysPending[prevKey] = pendingKeys;
        pendingKeys = [];
      }
    } else {
      pendingKeys.push(prevKey);
    }
  }
  var i2;
  var childMapping = {};
  for (var nextKey in next) {
    if (nextKeysPending[nextKey]) {
      for (i2 = 0; i2 < nextKeysPending[nextKey].length; i2++) {
        var pendingNextKey = nextKeysPending[nextKey][i2];
        childMapping[nextKeysPending[nextKey][i2]] = getValueForKey(pendingNextKey);
      }
    }
    childMapping[nextKey] = getValueForKey(nextKey);
  }
  for (i2 = 0; i2 < pendingKeys.length; i2++) {
    childMapping[pendingKeys[i2]] = getValueForKey(pendingKeys[i2]);
  }
  return childMapping;
}
function getProp(child, prop, props) {
  return props[prop] != null ? props[prop] : child.props[prop];
}
function getInitialChildMapping(props, onExited) {
  return getChildMapping(props.children, function(child) {
    return react.cloneElement(child, {
      onExited: onExited.bind(null, child),
      in: true,
      appear: getProp(child, "appear", props),
      enter: getProp(child, "enter", props),
      exit: getProp(child, "exit", props)
    });
  });
}
function getNextChildMapping(nextProps, prevChildMapping, onExited) {
  var nextChildMapping = getChildMapping(nextProps.children);
  var children = mergeChildMappings(prevChildMapping, nextChildMapping);
  Object.keys(children).forEach(function(key) {
    var child = children[key];
    if (!react.isValidElement(child))
      return;
    var hasPrev = key in prevChildMapping;
    var hasNext = key in nextChildMapping;
    var prevChild = prevChildMapping[key];
    var isLeaving = react.isValidElement(prevChild) && !prevChild.props.in;
    if (hasNext && (!hasPrev || isLeaving)) {
      children[key] = react.cloneElement(child, {
        onExited: onExited.bind(null, child),
        in: true,
        exit: getProp(child, "exit", nextProps),
        enter: getProp(child, "enter", nextProps)
      });
    } else if (!hasNext && hasPrev && !isLeaving) {
      children[key] = react.cloneElement(child, {
        in: false
      });
    } else if (hasNext && hasPrev && react.isValidElement(prevChild)) {
      children[key] = react.cloneElement(child, {
        onExited: onExited.bind(null, child),
        in: prevChild.props.in,
        exit: getProp(child, "exit", nextProps),
        enter: getProp(child, "enter", nextProps)
      });
    }
  });
  return children;
}
var values2 = Object.values || function(obj) {
  return Object.keys(obj).map(function(k5) {
    return obj[k5];
  });
};
var defaultProps = {
  component: "div",
  childFactory: function childFactory(child) {
    return child;
  }
};
var TransitionGroup = /* @__PURE__ */ function(_React$Component) {
  _inheritsLoose(TransitionGroup2, _React$Component);
  function TransitionGroup2(props, context) {
    var _this;
    _this = _React$Component.call(this, props, context) || this;
    var handleExited = _this.handleExited.bind(_assertThisInitialized(_this));
    _this.state = {
      contextValue: {
        isMounting: true
      },
      handleExited,
      firstRender: true
    };
    return _this;
  }
  var _proto = TransitionGroup2.prototype;
  _proto.componentDidMount = function componentDidMount() {
    this.mounted = true;
    this.setState({
      contextValue: {
        isMounting: false
      }
    });
  };
  _proto.componentWillUnmount = function componentWillUnmount() {
    this.mounted = false;
  };
  TransitionGroup2.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, _ref) {
    var prevChildMapping = _ref.children, handleExited = _ref.handleExited, firstRender = _ref.firstRender;
    return {
      children: firstRender ? getInitialChildMapping(nextProps, handleExited) : getNextChildMapping(nextProps, prevChildMapping, handleExited),
      firstRender: false
    };
  };
  _proto.handleExited = function handleExited(child, node) {
    var currentChildMapping = getChildMapping(this.props.children);
    if (child.key in currentChildMapping)
      return;
    if (child.props.onExited) {
      child.props.onExited(node);
    }
    if (this.mounted) {
      this.setState(function(state) {
        var children = _extends({}, state.children);
        delete children[child.key];
        return {
          children
        };
      });
    }
  };
  _proto.render = function render2() {
    var _this$props = this.props, Component2 = _this$props.component, childFactory2 = _this$props.childFactory, props = _objectWithoutPropertiesLoose(_this$props, ["component", "childFactory"]);
    var contextValue = this.state.contextValue;
    var children = values2(this.state.children).map(childFactory2);
    delete props.appear;
    delete props.enter;
    delete props.exit;
    if (Component2 === null) {
      return /* @__PURE__ */ react.createElement(TransitionGroupContext.Provider, {
        value: contextValue
      }, children);
    }
    return /* @__PURE__ */ react.createElement(TransitionGroupContext.Provider, {
      value: contextValue
    }, /* @__PURE__ */ react.createElement(Component2, props, children));
  };
  return TransitionGroup2;
}(react.Component);
TransitionGroup.propTypes = {};
TransitionGroup.defaultProps = defaultProps;
var ReplaceTransition = /* @__PURE__ */ function(_React$Component) {
  _inheritsLoose(ReplaceTransition2, _React$Component);
  function ReplaceTransition2() {
    var _this;
    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }
    _this = _React$Component.call.apply(_React$Component, [this].concat(_args)) || this;
    _this.handleEnter = function() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      return _this.handleLifecycle("onEnter", 0, args);
    };
    _this.handleEntering = function() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      return _this.handleLifecycle("onEntering", 0, args);
    };
    _this.handleEntered = function() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return _this.handleLifecycle("onEntered", 0, args);
    };
    _this.handleExit = function() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      return _this.handleLifecycle("onExit", 1, args);
    };
    _this.handleExiting = function() {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }
      return _this.handleLifecycle("onExiting", 1, args);
    };
    _this.handleExited = function() {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }
      return _this.handleLifecycle("onExited", 1, args);
    };
    return _this;
  }
  var _proto = ReplaceTransition2.prototype;
  _proto.handleLifecycle = function handleLifecycle(handler, idx, originalArgs) {
    var _child$props;
    var children = this.props.children;
    var child = react.Children.toArray(children)[idx];
    if (child.props[handler])
      (_child$props = child.props)[handler].apply(_child$props, originalArgs);
    if (this.props[handler]) {
      var maybeNode = child.props.nodeRef ? void 0 : reactDom.findDOMNode(this);
      this.props[handler](maybeNode);
    }
  };
  _proto.render = function render2() {
    var _this$props = this.props, children = _this$props.children, inProp = _this$props.in, props = _objectWithoutPropertiesLoose(_this$props, ["children", "in"]);
    var _React$Children$toArr = react.Children.toArray(children), first = _React$Children$toArr[0], second = _React$Children$toArr[1];
    delete props.onEnter;
    delete props.onEntering;
    delete props.onEntered;
    delete props.onExit;
    delete props.onExiting;
    delete props.onExited;
    return /* @__PURE__ */ react.createElement(TransitionGroup, props, inProp ? react.cloneElement(first, {
      key: "first",
      onEnter: this.handleEnter,
      onEntering: this.handleEntering,
      onEntered: this.handleEntered
    }) : react.cloneElement(second, {
      key: "second",
      onEnter: this.handleExit,
      onEntering: this.handleExiting,
      onEntered: this.handleExited
    }));
  };
  return ReplaceTransition2;
}(react.Component);
ReplaceTransition.propTypes = {};
var _leaveRenders;
var _enterRenders;
function areChildrenDifferent(oldChildren, newChildren) {
  if (oldChildren === newChildren)
    return false;
  if (react.isValidElement(oldChildren) && react.isValidElement(newChildren) && oldChildren.key != null && oldChildren.key === newChildren.key) {
    return false;
  }
  return true;
}
var modes = {
  out: "out-in",
  in: "in-out"
};
var callHook = function callHook2(element, name, cb2) {
  return function() {
    var _element$props;
    element.props[name] && (_element$props = element.props)[name].apply(_element$props, arguments);
    cb2();
  };
};
var leaveRenders = (_leaveRenders = {}, _leaveRenders[modes.out] = function(_ref) {
  var current = _ref.current, changeState = _ref.changeState;
  return react.cloneElement(current, {
    in: false,
    onExited: callHook(current, "onExited", function() {
      changeState(ENTERING, null);
    })
  });
}, _leaveRenders[modes.in] = function(_ref2) {
  var current = _ref2.current, changeState = _ref2.changeState, children = _ref2.children;
  return [current, react.cloneElement(children, {
    in: true,
    onEntered: callHook(children, "onEntered", function() {
      changeState(ENTERING);
    })
  })];
}, _leaveRenders);
var enterRenders = (_enterRenders = {}, _enterRenders[modes.out] = function(_ref3) {
  var children = _ref3.children, changeState = _ref3.changeState;
  return react.cloneElement(children, {
    in: true,
    onEntered: callHook(children, "onEntered", function() {
      changeState(ENTERED, react.cloneElement(children, {
        in: true
      }));
    })
  });
}, _enterRenders[modes.in] = function(_ref4) {
  var current = _ref4.current, children = _ref4.children, changeState = _ref4.changeState;
  return [react.cloneElement(current, {
    in: false,
    onExited: callHook(current, "onExited", function() {
      changeState(ENTERED, react.cloneElement(children, {
        in: true
      }));
    })
  }), react.cloneElement(children, {
    in: true
  })];
}, _enterRenders);
var SwitchTransition = /* @__PURE__ */ function(_React$Component) {
  _inheritsLoose(SwitchTransition2, _React$Component);
  function SwitchTransition2() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.state = {
      status: ENTERED,
      current: null
    };
    _this.appeared = false;
    _this.changeState = function(status, current) {
      if (current === void 0) {
        current = _this.state.current;
      }
      _this.setState({
        status,
        current
      });
    };
    return _this;
  }
  var _proto = SwitchTransition2.prototype;
  _proto.componentDidMount = function componentDidMount() {
    this.appeared = true;
  };
  SwitchTransition2.getDerivedStateFromProps = function getDerivedStateFromProps(props, state) {
    if (props.children == null) {
      return {
        current: null
      };
    }
    if (state.status === ENTERING && props.mode === modes.in) {
      return {
        status: ENTERING
      };
    }
    if (state.current && areChildrenDifferent(state.current, props.children)) {
      return {
        status: EXITING
      };
    }
    return {
      current: react.cloneElement(props.children, {
        in: true
      })
    };
  };
  _proto.render = function render2() {
    var _this$props = this.props, children = _this$props.children, mode = _this$props.mode, _this$state = this.state, status = _this$state.status, current = _this$state.current;
    var data = {
      children,
      current,
      changeState: this.changeState,
      status
    };
    var component;
    switch (status) {
      case ENTERING:
        component = enterRenders[mode](data);
        break;
      case EXITING:
        component = leaveRenders[mode](data);
        break;
      case ENTERED:
        component = current;
    }
    return /* @__PURE__ */ react.createElement(TransitionGroupContext.Provider, {
      value: {
        isMounting: !this.appeared
      }
    }, component);
  };
  return SwitchTransition2;
}(react.Component);
SwitchTransition.propTypes = {};
SwitchTransition.defaultProps = {
  mode: modes.out
};
var esm2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  CSSTransition,
  ReplaceTransition,
  SwitchTransition,
  TransitionGroup,
  Transition,
  config
});

// docs/snowpack/pkg/common/capitalize-ce37e419.js
var capitalize2 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _default = esm.unstable_capitalize;
  exports.default = _default;
});

// docs/snowpack/pkg/@mui/material/Button.js
var Ripple_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var React2 = _interopRequireWildcard(react);
  var _propTypes = interopRequireDefault(propTypes);
  var _clsx = interopRequireDefault(clsx);
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function")
      return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop2) {
      return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
      return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
      return {default: obj};
    }
    var cache2 = _getRequireWildcardCache(nodeInterop);
    if (cache2 && cache2.has(obj)) {
      return cache2.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj.default = obj;
    if (cache2) {
      cache2.set(obj, newObj);
    }
    return newObj;
  }
  function Ripple(props) {
    const {
      className,
      classes,
      pulsate = false,
      rippleX,
      rippleY,
      rippleSize,
      in: inProp,
      onExited,
      timeout
    } = props;
    const [leaving, setLeaving] = React2.useState(false);
    const rippleClassName = (0, _clsx.default)(className, classes.ripple, classes.rippleVisible, pulsate && classes.ripplePulsate);
    const rippleStyles = {
      width: rippleSize,
      height: rippleSize,
      top: -(rippleSize / 2) + rippleY,
      left: -(rippleSize / 2) + rippleX
    };
    const childClassName = (0, _clsx.default)(classes.child, leaving && classes.childLeaving, pulsate && classes.childPulsate);
    if (!inProp && !leaving) {
      setLeaving(true);
    }
    React2.useEffect(() => {
      if (!inProp && onExited != null) {
        const timeoutId = setTimeout(onExited, timeout);
        return () => {
          clearTimeout(timeoutId);
        };
      }
      return void 0;
    }, [onExited, inProp, timeout]);
    return /* @__PURE__ */ (0, jsxRuntime.jsx)("span", {
      className: rippleClassName,
      style: rippleStyles,
      children: /* @__PURE__ */ (0, jsxRuntime.jsx)("span", {
        className: childClassName
      })
    });
  }
  var _default = Ripple;
  exports.default = _default;
});
var touchRippleClasses_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  exports.getTouchRippleUtilityClass = getTouchRippleUtilityClass;
  function getTouchRippleUtilityClass(slot) {
    return (0, core.generateUtilityClass)("MuiTouchRipple", slot);
  }
  const touchRippleClasses = (0, core.generateUtilityClasses)("MuiTouchRipple", ["root", "ripple", "rippleVisible", "ripplePulsate", "child", "childLeaving", "childPulsate"]);
  var _default = touchRippleClasses;
  exports.default = _default;
});
var TouchRipple_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = exports.TouchRippleRoot = exports.TouchRippleRipple = exports.DELAY_RIPPLE = void 0;
  var _extends22 = interopRequireDefault(_extends_1);
  var _objectWithoutPropertiesLoose22 = interopRequireDefault(objectWithoutPropertiesLoose);
  var React2 = _interopRequireWildcard(react);
  var _propTypes = interopRequireDefault(propTypes);
  var _clsx = interopRequireDefault(clsx);
  var _styled = interopRequireDefault(styled_1);
  var _useThemeProps = interopRequireDefault(useThemeProps_1);
  var _Ripple = interopRequireDefault(Ripple_1);
  var _touchRippleClasses = interopRequireDefault(touchRippleClasses_1);
  const _excluded8 = ["center", "classes", "className"];
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function")
      return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop2) {
      return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
      return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
      return {default: obj};
    }
    var cache2 = _getRequireWildcardCache(nodeInterop);
    if (cache2 && cache2.has(obj)) {
      return cache2.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj.default = obj;
    if (cache2) {
      cache2.set(obj, newObj);
    }
    return newObj;
  }
  const DURATION = 550;
  const DELAY_RIPPLE = 80;
  exports.DELAY_RIPPLE = DELAY_RIPPLE;
  const enterKeyframe = esm$1.keyframes`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`;
  const exitKeyframe = esm$1.keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;
  const pulsateKeyframe = esm$1.keyframes`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`;
  const TouchRippleRoot = (0, _styled.default)("span", {
    name: "MuiTouchRipple",
    slot: "Root",
    skipSx: true
  })({
    overflow: "hidden",
    pointerEvents: "none",
    position: "absolute",
    zIndex: 0,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    borderRadius: "inherit"
  });
  exports.TouchRippleRoot = TouchRippleRoot;
  const TouchRippleRipple = (0, _styled.default)(_Ripple.default, {
    name: "MuiTouchRipple",
    slot: "Ripple"
  })`
  opacity: 0;
  position: absolute;

  &.${_touchRippleClasses.default.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${enterKeyframe};
    animation-duration: ${DURATION}ms;
    animation-timing-function: ${({
    theme
  }) => theme.transitions.easing.easeInOut};
  }

  &.${_touchRippleClasses.default.ripplePulsate} {
    animation-duration: ${({
    theme
  }) => theme.transitions.duration.shorter}ms;
  }

  & .${_touchRippleClasses.default.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${_touchRippleClasses.default.childLeaving} {
    opacity: 0;
    animation-name: ${exitKeyframe};
    animation-duration: ${DURATION}ms;
    animation-timing-function: ${({
    theme
  }) => theme.transitions.easing.easeInOut};
  }

  & .${_touchRippleClasses.default.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${pulsateKeyframe};
    animation-duration: 2500ms;
    animation-timing-function: ${({
    theme
  }) => theme.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`;
  exports.TouchRippleRipple = TouchRippleRipple;
  const TouchRipple = /* @__PURE__ */ React2.forwardRef(function TouchRipple2(inProps, ref) {
    const props = (0, _useThemeProps.default)({
      props: inProps,
      name: "MuiTouchRipple"
    });
    const {
      center: centerProp = false,
      classes = {},
      className
    } = props, other = (0, _objectWithoutPropertiesLoose22.default)(props, _excluded8);
    const [ripples, setRipples] = React2.useState([]);
    const nextKey = React2.useRef(0);
    const rippleCallback = React2.useRef(null);
    React2.useEffect(() => {
      if (rippleCallback.current) {
        rippleCallback.current();
        rippleCallback.current = null;
      }
    }, [ripples]);
    const ignoringMouseDown = React2.useRef(false);
    const startTimer = React2.useRef(null);
    const startTimerCommit = React2.useRef(null);
    const container = React2.useRef(null);
    React2.useEffect(() => {
      return () => {
        clearTimeout(startTimer.current);
      };
    }, []);
    const startCommit = React2.useCallback((params) => {
      const {
        pulsate: pulsate2,
        rippleX,
        rippleY,
        rippleSize,
        cb: cb2
      } = params;
      setRipples((oldRipples) => [...oldRipples, /* @__PURE__ */ (0, jsxRuntime.jsx)(TouchRippleRipple, {
        classes: {
          ripple: (0, _clsx.default)(classes.ripple, _touchRippleClasses.default.ripple),
          rippleVisible: (0, _clsx.default)(classes.rippleVisible, _touchRippleClasses.default.rippleVisible),
          ripplePulsate: (0, _clsx.default)(classes.ripplePulsate, _touchRippleClasses.default.ripplePulsate),
          child: (0, _clsx.default)(classes.child, _touchRippleClasses.default.child),
          childLeaving: (0, _clsx.default)(classes.childLeaving, _touchRippleClasses.default.childLeaving),
          childPulsate: (0, _clsx.default)(classes.childPulsate, _touchRippleClasses.default.childPulsate)
        },
        timeout: DURATION,
        pulsate: pulsate2,
        rippleX,
        rippleY,
        rippleSize
      }, nextKey.current)]);
      nextKey.current += 1;
      rippleCallback.current = cb2;
    }, [classes]);
    const start2 = React2.useCallback((event = {}, options = {}, cb2) => {
      const {
        pulsate: pulsate2 = false,
        center = centerProp || options.pulsate,
        fakeElement = false
      } = options;
      if (event.type === "mousedown" && ignoringMouseDown.current) {
        ignoringMouseDown.current = false;
        return;
      }
      if (event.type === "touchstart") {
        ignoringMouseDown.current = true;
      }
      const element = fakeElement ? null : container.current;
      const rect = element ? element.getBoundingClientRect() : {
        width: 0,
        height: 0,
        left: 0,
        top: 0
      };
      let rippleX;
      let rippleY;
      let rippleSize;
      if (center || event.clientX === 0 && event.clientY === 0 || !event.clientX && !event.touches) {
        rippleX = Math.round(rect.width / 2);
        rippleY = Math.round(rect.height / 2);
      } else {
        const {
          clientX,
          clientY
        } = event.touches ? event.touches[0] : event;
        rippleX = Math.round(clientX - rect.left);
        rippleY = Math.round(clientY - rect.top);
      }
      if (center) {
        rippleSize = Math.sqrt((2 * rect.width ** 2 + rect.height ** 2) / 3);
        if (rippleSize % 2 === 0) {
          rippleSize += 1;
        }
      } else {
        const sizeX = Math.max(Math.abs((element ? element.clientWidth : 0) - rippleX), rippleX) * 2 + 2;
        const sizeY = Math.max(Math.abs((element ? element.clientHeight : 0) - rippleY), rippleY) * 2 + 2;
        rippleSize = Math.sqrt(sizeX ** 2 + sizeY ** 2);
      }
      if (event.touches) {
        if (startTimerCommit.current === null) {
          startTimerCommit.current = () => {
            startCommit({
              pulsate: pulsate2,
              rippleX,
              rippleY,
              rippleSize,
              cb: cb2
            });
          };
          startTimer.current = setTimeout(() => {
            if (startTimerCommit.current) {
              startTimerCommit.current();
              startTimerCommit.current = null;
            }
          }, DELAY_RIPPLE);
        }
      } else {
        startCommit({
          pulsate: pulsate2,
          rippleX,
          rippleY,
          rippleSize,
          cb: cb2
        });
      }
    }, [centerProp, startCommit]);
    const pulsate = React2.useCallback(() => {
      start2({}, {
        pulsate: true
      });
    }, [start2]);
    const stop = React2.useCallback((event, cb2) => {
      clearTimeout(startTimer.current);
      if (event.type === "touchend" && startTimerCommit.current) {
        startTimerCommit.current();
        startTimerCommit.current = null;
        startTimer.current = setTimeout(() => {
          stop(event, cb2);
        });
        return;
      }
      startTimerCommit.current = null;
      setRipples((oldRipples) => {
        if (oldRipples.length > 0) {
          return oldRipples.slice(1);
        }
        return oldRipples;
      });
      rippleCallback.current = cb2;
    }, []);
    React2.useImperativeHandle(ref, () => ({
      pulsate,
      start: start2,
      stop
    }), [pulsate, start2, stop]);
    return /* @__PURE__ */ (0, jsxRuntime.jsx)(TouchRippleRoot, (0, _extends22.default)({
      className: (0, _clsx.default)(classes.root, _touchRippleClasses.default.root, className),
      ref: container
    }, other, {
      children: /* @__PURE__ */ (0, jsxRuntime.jsx)(esm2.TransitionGroup, {
        component: null,
        exit: true,
        children: ripples
      })
    }));
  });
  var _default = TouchRipple;
  exports.default = _default;
});
var buttonBaseClasses_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  exports.getButtonBaseUtilityClass = getButtonBaseUtilityClass;
  function getButtonBaseUtilityClass(slot) {
    return (0, core.generateUtilityClass)("MuiButtonBase", slot);
  }
  const buttonBaseClasses = (0, core.generateUtilityClasses)("MuiButtonBase", ["root", "disabled", "focusVisible"]);
  var _default = buttonBaseClasses;
  exports.default = _default;
});
var ButtonBase_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = exports.ButtonBaseRoot = void 0;
  var _extends22 = interopRequireDefault(_extends_1);
  var _objectWithoutPropertiesLoose22 = interopRequireDefault(objectWithoutPropertiesLoose);
  var React2 = _interopRequireWildcard(react);
  var _propTypes = interopRequireDefault(propTypes);
  var _clsx = interopRequireDefault(clsx);
  var _composeClasses = interopRequireDefault(composeClasses);
  var _styled = interopRequireDefault(styled_1);
  var _useThemeProps = interopRequireDefault(useThemeProps_1);
  var _useForkRef = interopRequireDefault(useForkRef2);
  var _useEventCallback = interopRequireDefault(useEventCallback2);
  var _useIsFocusVisible = interopRequireDefault(useIsFocusVisible2);
  var _TouchRipple = interopRequireDefault(TouchRipple_1);
  var _buttonBaseClasses = _interopRequireWildcard(buttonBaseClasses_1);
  const _excluded8 = ["action", "centerRipple", "children", "className", "component", "disabled", "disableRipple", "disableTouchRipple", "focusRipple", "focusVisibleClassName", "LinkComponent", "onBlur", "onClick", "onContextMenu", "onDragLeave", "onFocus", "onFocusVisible", "onKeyDown", "onKeyUp", "onMouseDown", "onMouseLeave", "onMouseUp", "onTouchEnd", "onTouchMove", "onTouchStart", "tabIndex", "TouchRippleProps", "type"];
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function")
      return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop2) {
      return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
      return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
      return {default: obj};
    }
    var cache2 = _getRequireWildcardCache(nodeInterop);
    if (cache2 && cache2.has(obj)) {
      return cache2.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj.default = obj;
    if (cache2) {
      cache2.set(obj, newObj);
    }
    return newObj;
  }
  const useUtilityClasses4 = (ownerState) => {
    const {
      disabled,
      focusVisible,
      focusVisibleClassName,
      classes
    } = ownerState;
    const slots = {
      root: ["root", disabled && "disabled", focusVisible && "focusVisible"]
    };
    const composedClasses = (0, _composeClasses.default)(slots, _buttonBaseClasses.getButtonBaseUtilityClass, classes);
    if (focusVisible && focusVisibleClassName) {
      composedClasses.root += ` ${focusVisibleClassName}`;
    }
    return composedClasses;
  };
  const ButtonBaseRoot = (0, _styled.default)("button", {
    name: "MuiButtonBase",
    slot: "Root",
    overridesResolver: (props, styles2) => styles2.root
  })({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    boxSizing: "border-box",
    WebkitTapHighlightColor: "transparent",
    backgroundColor: "transparent",
    outline: 0,
    border: 0,
    margin: 0,
    borderRadius: 0,
    padding: 0,
    cursor: "pointer",
    userSelect: "none",
    verticalAlign: "middle",
    MozAppearance: "none",
    WebkitAppearance: "none",
    textDecoration: "none",
    color: "inherit",
    "&::-moz-focus-inner": {
      borderStyle: "none"
    },
    [`&.${_buttonBaseClasses.default.disabled}`]: {
      pointerEvents: "none",
      cursor: "default"
    },
    "@media print": {
      colorAdjust: "exact"
    }
  });
  exports.ButtonBaseRoot = ButtonBaseRoot;
  const ButtonBase2 = /* @__PURE__ */ React2.forwardRef(function ButtonBase3(inProps, ref) {
    const props = (0, _useThemeProps.default)({
      props: inProps,
      name: "MuiButtonBase"
    });
    const {
      action,
      centerRipple = false,
      children,
      className,
      component = "button",
      disabled = false,
      disableRipple = false,
      disableTouchRipple = false,
      focusRipple = false,
      LinkComponent = "a",
      onBlur,
      onClick,
      onContextMenu,
      onDragLeave,
      onFocus,
      onFocusVisible,
      onKeyDown,
      onKeyUp,
      onMouseDown,
      onMouseLeave,
      onMouseUp,
      onTouchEnd,
      onTouchMove,
      onTouchStart,
      tabIndex = 0,
      TouchRippleProps,
      type
    } = props, other = (0, _objectWithoutPropertiesLoose22.default)(props, _excluded8);
    const buttonRef = React2.useRef(null);
    const rippleRef = React2.useRef(null);
    const {
      isFocusVisibleRef,
      onFocus: handleFocusVisible,
      onBlur: handleBlurVisible,
      ref: focusVisibleRef
    } = (0, _useIsFocusVisible.default)();
    const [focusVisible, setFocusVisible] = React2.useState(false);
    if (disabled && focusVisible) {
      setFocusVisible(false);
    }
    React2.useImperativeHandle(action, () => ({
      focusVisible: () => {
        setFocusVisible(true);
        buttonRef.current.focus();
      }
    }), []);
    React2.useEffect(() => {
      if (focusVisible && focusRipple && !disableRipple) {
        rippleRef.current.pulsate();
      }
    }, [disableRipple, focusRipple, focusVisible]);
    function useRippleHandler(rippleAction, eventCallback, skipRippleAction = disableTouchRipple) {
      return (0, _useEventCallback.default)((event) => {
        if (eventCallback) {
          eventCallback(event);
        }
        const ignore = skipRippleAction;
        if (!ignore && rippleRef.current) {
          rippleRef.current[rippleAction](event);
        }
        return true;
      });
    }
    const handleMouseDown = useRippleHandler("start", onMouseDown);
    const handleContextMenu = useRippleHandler("stop", onContextMenu);
    const handleDragLeave = useRippleHandler("stop", onDragLeave);
    const handleMouseUp = useRippleHandler("stop", onMouseUp);
    const handleMouseLeave = useRippleHandler("stop", (event) => {
      if (focusVisible) {
        event.preventDefault();
      }
      if (onMouseLeave) {
        onMouseLeave(event);
      }
    });
    const handleTouchStart = useRippleHandler("start", onTouchStart);
    const handleTouchEnd = useRippleHandler("stop", onTouchEnd);
    const handleTouchMove = useRippleHandler("stop", onTouchMove);
    const handleBlur = useRippleHandler("stop", (event) => {
      handleBlurVisible(event);
      if (isFocusVisibleRef.current === false) {
        setFocusVisible(false);
      }
      if (onBlur) {
        onBlur(event);
      }
    }, false);
    const handleFocus = (0, _useEventCallback.default)((event) => {
      if (!buttonRef.current) {
        buttonRef.current = event.currentTarget;
      }
      handleFocusVisible(event);
      if (isFocusVisibleRef.current === true) {
        setFocusVisible(true);
        if (onFocusVisible) {
          onFocusVisible(event);
        }
      }
      if (onFocus) {
        onFocus(event);
      }
    });
    const isNonNativeButton = () => {
      const button = buttonRef.current;
      return component && component !== "button" && !(button.tagName === "A" && button.href);
    };
    const keydownRef = React2.useRef(false);
    const handleKeyDown2 = (0, _useEventCallback.default)((event) => {
      if (focusRipple && !keydownRef.current && focusVisible && rippleRef.current && event.key === " ") {
        keydownRef.current = true;
        rippleRef.current.stop(event, () => {
          rippleRef.current.start(event);
        });
      }
      if (event.target === event.currentTarget && isNonNativeButton() && event.key === " ") {
        event.preventDefault();
      }
      if (onKeyDown) {
        onKeyDown(event);
      }
      if (event.target === event.currentTarget && isNonNativeButton() && event.key === "Enter" && !disabled) {
        event.preventDefault();
        if (onClick) {
          onClick(event);
        }
      }
    });
    const handleKeyUp = (0, _useEventCallback.default)((event) => {
      if (focusRipple && event.key === " " && rippleRef.current && focusVisible && !event.defaultPrevented) {
        keydownRef.current = false;
        rippleRef.current.stop(event, () => {
          rippleRef.current.pulsate(event);
        });
      }
      if (onKeyUp) {
        onKeyUp(event);
      }
      if (onClick && event.target === event.currentTarget && isNonNativeButton() && event.key === " " && !event.defaultPrevented) {
        onClick(event);
      }
    });
    let ComponentProp = component;
    if (ComponentProp === "button" && (other.href || other.to)) {
      ComponentProp = LinkComponent;
    }
    const buttonProps = {};
    if (ComponentProp === "button") {
      buttonProps.type = type === void 0 ? "button" : type;
      buttonProps.disabled = disabled;
    } else {
      if (!other.href && !other.to) {
        buttonProps.role = "button";
      }
      if (disabled) {
        buttonProps["aria-disabled"] = disabled;
      }
    }
    const handleOwnRef = (0, _useForkRef.default)(focusVisibleRef, buttonRef);
    const handleRef = (0, _useForkRef.default)(ref, handleOwnRef);
    const [mountedState, setMountedState] = React2.useState(false);
    React2.useEffect(() => {
      setMountedState(true);
    }, []);
    const enableTouchRipple = mountedState && !disableRipple && !disabled;
    const ownerState = (0, _extends22.default)({}, props, {
      centerRipple,
      component,
      disabled,
      disableRipple,
      disableTouchRipple,
      focusRipple,
      tabIndex,
      focusVisible
    });
    const classes = useUtilityClasses4(ownerState);
    return /* @__PURE__ */ (0, jsxRuntime.jsxs)(ButtonBaseRoot, (0, _extends22.default)({
      as: ComponentProp,
      className: (0, _clsx.default)(classes.root, className),
      ownerState,
      onBlur: handleBlur,
      onClick,
      onContextMenu: handleContextMenu,
      onFocus: handleFocus,
      onKeyDown: handleKeyDown2,
      onKeyUp: handleKeyUp,
      onMouseDown: handleMouseDown,
      onMouseLeave: handleMouseLeave,
      onMouseUp: handleMouseUp,
      onDragLeave: handleDragLeave,
      onTouchEnd: handleTouchEnd,
      onTouchMove: handleTouchMove,
      onTouchStart: handleTouchStart,
      ref: handleRef,
      tabIndex: disabled ? -1 : tabIndex,
      type
    }, buttonProps, other, {
      children: [children, enableTouchRipple ? /* @__PURE__ */ (0, jsxRuntime.jsx)(_TouchRipple.default, (0, _extends22.default)({
        ref: rippleRef,
        center: centerRipple
      }, TouchRippleProps)) : null]
    }));
  });
  var _default = ButtonBase2;
  exports.default = _default;
});
var ButtonBase = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _exportNames = {
    buttonBaseClasses: true,
    touchRippleClasses: true
  };
  Object.defineProperty(exports, "buttonBaseClasses", {
    enumerable: true,
    get: function() {
      return _buttonBaseClasses.default;
    }
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
      return _ButtonBase.default;
    }
  });
  Object.defineProperty(exports, "touchRippleClasses", {
    enumerable: true,
    get: function() {
      return _touchRippleClasses.default;
    }
  });
  var _ButtonBase = interopRequireDefault(ButtonBase_1);
  var _buttonBaseClasses = _interopRequireWildcard(buttonBaseClasses_1);
  Object.keys(_buttonBaseClasses).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key))
      return;
    if (key in exports && exports[key] === _buttonBaseClasses[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _buttonBaseClasses[key];
      }
    });
  });
  var _touchRippleClasses = _interopRequireWildcard(touchRippleClasses_1);
  Object.keys(_touchRippleClasses).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key))
      return;
    if (key in exports && exports[key] === _touchRippleClasses[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _touchRippleClasses[key];
      }
    });
  });
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function")
      return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop2) {
      return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
      return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
      return {default: obj};
    }
    var cache2 = _getRequireWildcardCache(nodeInterop);
    if (cache2 && cache2.has(obj)) {
      return cache2.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj.default = obj;
    if (cache2) {
      cache2.set(obj, newObj);
    }
    return newObj;
  }
});
var buttonClasses_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  exports.getButtonUtilityClass = getButtonUtilityClass;
  function getButtonUtilityClass(slot) {
    return (0, core.generateUtilityClass)("MuiButton", slot);
  }
  const buttonClasses = (0, core.generateUtilityClasses)("MuiButton", ["root", "text", "textInherit", "textPrimary", "textSecondary", "outlined", "outlinedInherit", "outlinedPrimary", "outlinedSecondary", "contained", "containedInherit", "containedPrimary", "containedSecondary", "disableElevation", "focusVisible", "disabled", "colorInherit", "textSizeSmall", "textSizeMedium", "textSizeLarge", "outlinedSizeSmall", "outlinedSizeMedium", "outlinedSizeLarge", "containedSizeSmall", "containedSizeMedium", "containedSizeLarge", "sizeMedium", "sizeSmall", "sizeLarge", "fullWidth", "startIcon", "endIcon", "iconSizeSmall", "iconSizeMedium", "iconSizeLarge"]);
  var _default = buttonClasses;
  exports.default = _default;
});
var Button_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _objectWithoutPropertiesLoose22 = interopRequireDefault(objectWithoutPropertiesLoose);
  var _extends22 = interopRequireDefault(_extends_1);
  var React2 = _interopRequireWildcard(react);
  var _propTypes = interopRequireDefault(propTypes);
  var _clsx = interopRequireDefault(clsx);
  var _styled = _interopRequireWildcard(styled_1);
  var _useThemeProps = interopRequireDefault(useThemeProps_1);
  var _ButtonBase = interopRequireDefault(ButtonBase);
  var _capitalize = interopRequireDefault(capitalize2);
  var _buttonClasses = _interopRequireWildcard(buttonClasses_1);
  const _excluded8 = ["children", "color", "component", "disabled", "disableElevation", "disableFocusRipple", "endIcon", "focusVisibleClassName", "fullWidth", "size", "startIcon", "type", "variant"];
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function")
      return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop2) {
      return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
      return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
      return {default: obj};
    }
    var cache2 = _getRequireWildcardCache(nodeInterop);
    if (cache2 && cache2.has(obj)) {
      return cache2.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj.default = obj;
    if (cache2) {
      cache2.set(obj, newObj);
    }
    return newObj;
  }
  const useUtilityClasses4 = (ownerState) => {
    const {
      color: color2,
      disableElevation,
      fullWidth,
      size,
      variant,
      classes
    } = ownerState;
    const slots = {
      root: ["root", variant, `${variant}${(0, _capitalize.default)(color2)}`, `size${(0, _capitalize.default)(size)}`, `${variant}Size${(0, _capitalize.default)(size)}`, color2 === "inherit" && "colorInherit", disableElevation && "disableElevation", fullWidth && "fullWidth"],
      label: ["label"],
      startIcon: ["startIcon", `iconSize${(0, _capitalize.default)(size)}`],
      endIcon: ["endIcon", `iconSize${(0, _capitalize.default)(size)}`]
    };
    const composedClasses = (0, core.unstable_composeClasses)(slots, _buttonClasses.getButtonUtilityClass, classes);
    return (0, _extends22.default)({}, classes, composedClasses);
  };
  const commonIconStyles = (ownerState) => (0, _extends22.default)({}, ownerState.size === "small" && {
    "& > *:nth-of-type(1)": {
      fontSize: 18
    }
  }, ownerState.size === "medium" && {
    "& > *:nth-of-type(1)": {
      fontSize: 20
    }
  }, ownerState.size === "large" && {
    "& > *:nth-of-type(1)": {
      fontSize: 22
    }
  });
  const ButtonRoot = (0, _styled.default)(_ButtonBase.default, {
    shouldForwardProp: (prop) => (0, _styled.rootShouldForwardProp)(prop) || prop === "classes",
    name: "MuiButton",
    slot: "Root",
    overridesResolver: (props, styles2) => {
      const {
        ownerState
      } = props;
      return [styles2.root, styles2[ownerState.variant], styles2[`${ownerState.variant}${(0, _capitalize.default)(ownerState.color)}`], styles2[`size${(0, _capitalize.default)(ownerState.size)}`], styles2[`${ownerState.variant}Size${(0, _capitalize.default)(ownerState.size)}`], ownerState.color === "inherit" && styles2.colorInherit, ownerState.disableElevation && styles2.disableElevation, ownerState.fullWidth && styles2.fullWidth];
    }
  })(({
    theme,
    ownerState
  }) => (0, _extends22.default)({}, theme.typography.button, {
    minWidth: 64,
    padding: "6px 16px",
    borderRadius: theme.shape.borderRadius,
    transition: theme.transitions.create(["background-color", "box-shadow", "border-color", "color"], {
      duration: theme.transitions.duration.short
    }),
    "&:hover": (0, _extends22.default)({
      textDecoration: "none",
      backgroundColor: (0, esm$1.alpha)(theme.palette.text.primary, theme.palette.action.hoverOpacity),
      "@media (hover: none)": {
        backgroundColor: "transparent"
      }
    }, ownerState.variant === "text" && ownerState.color !== "inherit" && {
      backgroundColor: (0, esm$1.alpha)(theme.palette[ownerState.color].main, theme.palette.action.hoverOpacity),
      "@media (hover: none)": {
        backgroundColor: "transparent"
      }
    }, ownerState.variant === "outlined" && ownerState.color !== "inherit" && {
      border: `1px solid ${theme.palette[ownerState.color].main}`,
      backgroundColor: (0, esm$1.alpha)(theme.palette[ownerState.color].main, theme.palette.action.hoverOpacity),
      "@media (hover: none)": {
        backgroundColor: "transparent"
      }
    }, ownerState.variant === "contained" && {
      backgroundColor: theme.palette.grey.A100,
      boxShadow: theme.shadows[4],
      "@media (hover: none)": {
        boxShadow: theme.shadows[2],
        backgroundColor: theme.palette.grey[300]
      }
    }, ownerState.variant === "contained" && ownerState.color !== "inherit" && {
      backgroundColor: theme.palette[ownerState.color].dark,
      "@media (hover: none)": {
        backgroundColor: theme.palette[ownerState.color].main
      }
    }),
    "&:active": (0, _extends22.default)({}, ownerState.variant === "contained" && {
      boxShadow: theme.shadows[8]
    }),
    [`&.${_buttonClasses.default.focusVisible}`]: (0, _extends22.default)({}, ownerState.variant === "contained" && {
      boxShadow: theme.shadows[6]
    }),
    [`&.${_buttonClasses.default.disabled}`]: (0, _extends22.default)({
      color: theme.palette.action.disabled
    }, ownerState.variant === "outlined" && {
      border: `1px solid ${theme.palette.action.disabledBackground}`
    }, ownerState.variant === "outlined" && ownerState.color === "secondary" && {
      border: `1px solid ${theme.palette.action.disabled}`
    }, ownerState.variant === "contained" && {
      color: theme.palette.action.disabled,
      boxShadow: theme.shadows[0],
      backgroundColor: theme.palette.action.disabledBackground
    })
  }, ownerState.variant === "text" && {
    padding: "6px 8px"
  }, ownerState.variant === "text" && ownerState.color !== "inherit" && {
    color: theme.palette[ownerState.color].main
  }, ownerState.variant === "outlined" && {
    padding: "5px 15px",
    border: `1px solid ${theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)"}`
  }, ownerState.variant === "outlined" && ownerState.color !== "inherit" && {
    color: theme.palette[ownerState.color].main,
    border: `1px solid ${(0, esm$1.alpha)(theme.palette[ownerState.color].main, 0.5)}`
  }, ownerState.variant === "contained" && {
    color: theme.palette.getContrastText(theme.palette.grey[300]),
    backgroundColor: theme.palette.grey[300],
    boxShadow: theme.shadows[2]
  }, ownerState.variant === "contained" && ownerState.color !== "inherit" && {
    color: theme.palette[ownerState.color].contrastText,
    backgroundColor: theme.palette[ownerState.color].main
  }, ownerState.color === "inherit" && {
    color: "inherit",
    borderColor: "currentColor"
  }, ownerState.size === "small" && ownerState.variant === "text" && {
    padding: "4px 5px",
    fontSize: theme.typography.pxToRem(13)
  }, ownerState.size === "large" && ownerState.variant === "text" && {
    padding: "8px 11px",
    fontSize: theme.typography.pxToRem(15)
  }, ownerState.size === "small" && ownerState.variant === "outlined" && {
    padding: "3px 9px",
    fontSize: theme.typography.pxToRem(13)
  }, ownerState.size === "large" && ownerState.variant === "outlined" && {
    padding: "7px 21px",
    fontSize: theme.typography.pxToRem(15)
  }, ownerState.size === "small" && ownerState.variant === "contained" && {
    padding: "4px 10px",
    fontSize: theme.typography.pxToRem(13)
  }, ownerState.size === "large" && ownerState.variant === "contained" && {
    padding: "8px 22px",
    fontSize: theme.typography.pxToRem(15)
  }, ownerState.fullWidth && {
    width: "100%"
  }), ({
    ownerState
  }) => ownerState.disableElevation && {
    boxShadow: "none",
    "&:hover": {
      boxShadow: "none"
    },
    [`&.${_buttonClasses.default.focusVisible}`]: {
      boxShadow: "none"
    },
    "&:active": {
      boxShadow: "none"
    },
    [`&.${_buttonClasses.default.disabled}`]: {
      boxShadow: "none"
    }
  });
  const ButtonStartIcon = (0, _styled.default)("span", {
    name: "MuiButton",
    slot: "StartIcon",
    overridesResolver: (props, styles2) => {
      const {
        ownerState
      } = props;
      return [styles2.startIcon, styles2[`iconSize${(0, _capitalize.default)(ownerState.size)}`]];
    }
  })(({
    ownerState
  }) => (0, _extends22.default)({
    display: "inherit",
    marginRight: 8,
    marginLeft: -4
  }, ownerState.size === "small" && {
    marginLeft: -2
  }, commonIconStyles(ownerState)));
  const ButtonEndIcon = (0, _styled.default)("span", {
    name: "MuiButton",
    slot: "EndIcon",
    overridesResolver: (props, styles2) => {
      const {
        ownerState
      } = props;
      return [styles2.endIcon, styles2[`iconSize${(0, _capitalize.default)(ownerState.size)}`]];
    }
  })(({
    ownerState
  }) => (0, _extends22.default)({
    display: "inherit",
    marginRight: -4,
    marginLeft: 8
  }, ownerState.size === "small" && {
    marginRight: -2
  }, commonIconStyles(ownerState)));
  const Button2 = /* @__PURE__ */ React2.forwardRef(function Button3(inProps, ref) {
    const props = (0, _useThemeProps.default)({
      props: inProps,
      name: "MuiButton"
    });
    const {
      children,
      color: color2 = "primary",
      component = "button",
      disabled = false,
      disableElevation = false,
      disableFocusRipple = false,
      endIcon: endIconProp,
      focusVisibleClassName,
      fullWidth = false,
      size = "medium",
      startIcon: startIconProp,
      type,
      variant = "text"
    } = props, other = (0, _objectWithoutPropertiesLoose22.default)(props, _excluded8);
    const ownerState = (0, _extends22.default)({}, props, {
      color: color2,
      component,
      disabled,
      disableElevation,
      disableFocusRipple,
      fullWidth,
      size,
      type,
      variant
    });
    const classes = useUtilityClasses4(ownerState);
    const startIcon = startIconProp && /* @__PURE__ */ (0, jsxRuntime.jsx)(ButtonStartIcon, {
      className: classes.startIcon,
      ownerState,
      children: startIconProp
    });
    const endIcon = endIconProp && /* @__PURE__ */ (0, jsxRuntime.jsx)(ButtonEndIcon, {
      className: classes.endIcon,
      ownerState,
      children: endIconProp
    });
    return /* @__PURE__ */ (0, jsxRuntime.jsxs)(ButtonRoot, (0, _extends22.default)({
      ownerState,
      component,
      disabled,
      focusRipple: !disableFocusRipple,
      focusVisibleClassName: (0, _clsx.default)(classes.focusVisible, focusVisibleClassName),
      ref,
      type
    }, other, {
      classes,
      children: [startIcon, children, endIcon]
    }));
  });
  var _default = Button2;
  exports.default = _default;
});
var Button = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _exportNames = {
    buttonClasses: true
  };
  Object.defineProperty(exports, "buttonClasses", {
    enumerable: true,
    get: function() {
      return _buttonClasses.default;
    }
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
      return _Button.default;
    }
  });
  var _Button = interopRequireDefault(Button_1);
  var _buttonClasses = _interopRequireWildcard(buttonClasses_1);
  Object.keys(_buttonClasses).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key))
      return;
    if (key in exports && exports[key] === _buttonClasses[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _buttonClasses[key];
      }
    });
  });
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function")
      return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop2) {
      return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
      return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
      return {default: obj};
    }
    var cache2 = _getRequireWildcardCache(nodeInterop);
    if (cache2 && cache2.has(obj)) {
      return cache2.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj.default = obj;
    if (cache2) {
      cache2.set(obj, newObj);
    }
    return newObj;
  }
});
var __pika_web_default_export_for_treeshaking__ = /* @__PURE__ */ getDefaultExportFromCjs(Button);
var Button_default = __pika_web_default_export_for_treeshaking__;

// docs/snowpack/pkg/@mui/material/Stack.js
var Stack_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.style = exports.default = void 0;
  var _objectWithoutPropertiesLoose22 = interopRequireDefault(objectWithoutPropertiesLoose);
  var _extends22 = interopRequireDefault(_extends_1);
  var React2 = _interopRequireWildcard(react);
  var _propTypes = interopRequireDefault(propTypes);
  var _styled = interopRequireDefault(styled_1);
  var _useThemeProps = interopRequireDefault(useThemeProps_1);
  const _excluded8 = ["component", "direction", "spacing", "divider", "children"];
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function")
      return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop2) {
      return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
      return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
      return {default: obj};
    }
    var cache2 = _getRequireWildcardCache(nodeInterop);
    if (cache2 && cache2.has(obj)) {
      return cache2.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj.default = obj;
    if (cache2) {
      cache2.set(obj, newObj);
    }
    return newObj;
  }
  function joinChildren(children, separator) {
    const childrenArray = React2.Children.toArray(children).filter(Boolean);
    return childrenArray.reduce((output, child, index) => {
      output.push(child);
      if (index < childrenArray.length - 1) {
        output.push(/* @__PURE__ */ React2.cloneElement(separator, {
          key: `separator-${index}`
        }));
      }
      return output;
    }, []);
  }
  const getSideFromDirection = (direction) => {
    return {
      row: "Left",
      "row-reverse": "Right",
      column: "Top",
      "column-reverse": "Bottom"
    }[direction];
  };
  const style2 = ({
    ownerState,
    theme
  }) => {
    let styles2 = (0, _extends22.default)({
      display: "flex"
    }, (0, esm$1.handleBreakpoints)({
      theme
    }, ownerState.direction, (propValue) => ({
      flexDirection: propValue
    })));
    if (ownerState.spacing) {
      const transformer = (0, esm$1.createUnarySpacing)(theme);
      const base = Object.keys(theme.breakpoints.values).reduce((acc, breakpoint) => {
        if (ownerState.spacing[breakpoint] != null || ownerState.direction[breakpoint] != null) {
          acc[breakpoint] = true;
        }
        return acc;
      }, {});
      const directionValues = (0, esm$1.unstable_resolveBreakpointValues)({
        values: ownerState.direction,
        base
      });
      const spacingValues = (0, esm$1.unstable_resolveBreakpointValues)({
        values: ownerState.spacing,
        base
      });
      const styleFromPropValue = (propValue, breakpoint) => {
        return {
          "& > :not(style) + :not(style)": {
            margin: 0,
            [`margin${getSideFromDirection(breakpoint ? directionValues[breakpoint] : ownerState.direction)}`]: (0, esm$1.getValue)(transformer, propValue)
          }
        };
      };
      styles2 = (0, esm.deepmerge)(styles2, (0, esm$1.handleBreakpoints)({
        theme
      }, spacingValues, styleFromPropValue));
    }
    return styles2;
  };
  exports.style = style2;
  const StackRoot = (0, _styled.default)("div", {
    name: "MuiStack",
    slot: "Root",
    overridesResolver: (props, styles2) => {
      return [styles2.root];
    }
  })(style2);
  const Stack3 = /* @__PURE__ */ React2.forwardRef(function Stack4(inProps, ref) {
    const themeProps = (0, _useThemeProps.default)({
      props: inProps,
      name: "MuiStack"
    });
    const props = (0, esm$1.unstable_extendSxProp)(themeProps);
    const {
      component = "div",
      direction = "column",
      spacing: spacing2 = 0,
      divider,
      children
    } = props, other = (0, _objectWithoutPropertiesLoose22.default)(props, _excluded8);
    const ownerState = {
      direction,
      spacing: spacing2
    };
    return /* @__PURE__ */ (0, jsxRuntime.jsx)(StackRoot, (0, _extends22.default)({
      as: component,
      ownerState,
      ref
    }, other, {
      children: divider ? joinChildren(children, divider) : children
    }));
  });
  var _default = Stack3;
  exports.default = _default;
});
var Stack = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
      return _Stack2.default;
    }
  });
  var _Stack2 = interopRequireDefault(Stack_1);
});
var __pika_web_default_export_for_treeshaking__2 = /* @__PURE__ */ getDefaultExportFromCjs(Stack);
var Stack_default = __pika_web_default_export_for_treeshaking__2;

// docs/snowpack/pkg/@mui/material/Typography.js
var typographyClasses_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  exports.getTypographyUtilityClass = getTypographyUtilityClass;
  function getTypographyUtilityClass(slot) {
    return (0, core.generateUtilityClass)("MuiTypography", slot);
  }
  const typographyClasses = (0, core.generateUtilityClasses)("MuiTypography", ["root", "h1", "h2", "h3", "h4", "h5", "h6", "subtitle1", "subtitle2", "body1", "body2", "inherit", "button", "caption", "overline", "alignLeft", "alignRight", "alignCenter", "alignJustify", "noWrap", "gutterBottom", "paragraph"]);
  var _default = typographyClasses;
  exports.default = _default;
});
var Typography_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = exports.TypographyRoot = void 0;
  var _objectWithoutPropertiesLoose22 = interopRequireDefault(objectWithoutPropertiesLoose);
  var _extends22 = interopRequireDefault(_extends_1);
  var React2 = _interopRequireWildcard(react);
  var _propTypes = interopRequireDefault(propTypes);
  var _clsx = interopRequireDefault(clsx);
  var _styled = interopRequireDefault(styled_1);
  var _useThemeProps = interopRequireDefault(useThemeProps_1);
  var _capitalize = interopRequireDefault(capitalize2);
  const _excluded8 = ["align", "className", "component", "gutterBottom", "noWrap", "paragraph", "variant", "variantMapping"];
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function")
      return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop2) {
      return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
      return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
      return {default: obj};
    }
    var cache2 = _getRequireWildcardCache(nodeInterop);
    if (cache2 && cache2.has(obj)) {
      return cache2.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj.default = obj;
    if (cache2) {
      cache2.set(obj, newObj);
    }
    return newObj;
  }
  const useUtilityClasses4 = (ownerState) => {
    const {
      align,
      gutterBottom,
      noWrap,
      paragraph,
      variant,
      classes
    } = ownerState;
    const slots = {
      root: ["root", variant, ownerState.align !== "inherit" && `align${(0, _capitalize.default)(align)}`, gutterBottom && "gutterBottom", noWrap && "noWrap", paragraph && "paragraph"]
    };
    return (0, core.unstable_composeClasses)(slots, typographyClasses_1.getTypographyUtilityClass, classes);
  };
  const TypographyRoot = (0, _styled.default)("span", {
    name: "MuiTypography",
    slot: "Root",
    overridesResolver: (props, styles2) => {
      const {
        ownerState
      } = props;
      return [styles2.root, ownerState.variant && styles2[ownerState.variant], ownerState.align !== "inherit" && styles2[`align${(0, _capitalize.default)(ownerState.align)}`], ownerState.noWrap && styles2.noWrap, ownerState.gutterBottom && styles2.gutterBottom, ownerState.paragraph && styles2.paragraph];
    }
  })(({
    theme,
    ownerState
  }) => (0, _extends22.default)({
    margin: 0
  }, ownerState.variant && theme.typography[ownerState.variant], ownerState.align !== "inherit" && {
    textAlign: ownerState.align
  }, ownerState.noWrap && {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  }, ownerState.gutterBottom && {
    marginBottom: "0.35em"
  }, ownerState.paragraph && {
    marginBottom: 16
  }));
  exports.TypographyRoot = TypographyRoot;
  const defaultVariantMapping = {
    h1: "h1",
    h2: "h2",
    h3: "h3",
    h4: "h4",
    h5: "h5",
    h6: "h6",
    subtitle1: "h6",
    subtitle2: "h6",
    body1: "p",
    body2: "p",
    inherit: "p"
  };
  const colorTransformations = {
    primary: "primary.main",
    textPrimary: "text.primary",
    secondary: "secondary.main",
    textSecondary: "text.secondary",
    error: "error.main"
  };
  const transformDeprecatedColors = (color2) => {
    return colorTransformations[color2] || color2;
  };
  const Typography2 = /* @__PURE__ */ React2.forwardRef(function Typography3(inProps, ref) {
    const themeProps = (0, _useThemeProps.default)({
      props: inProps,
      name: "MuiTypography"
    });
    const color2 = transformDeprecatedColors(themeProps.color);
    const props = (0, esm$1.unstable_extendSxProp)((0, _extends22.default)({}, themeProps, {
      color: color2
    }));
    const {
      align = "inherit",
      className,
      component,
      gutterBottom = false,
      noWrap = false,
      paragraph = false,
      variant = "body1",
      variantMapping = defaultVariantMapping
    } = props, other = (0, _objectWithoutPropertiesLoose22.default)(props, _excluded8);
    const ownerState = (0, _extends22.default)({}, props, {
      align,
      color: color2,
      className,
      component,
      gutterBottom,
      noWrap,
      paragraph,
      variant,
      variantMapping
    });
    const Component2 = component || (paragraph ? "p" : variantMapping[variant] || defaultVariantMapping[variant]) || "span";
    const classes = useUtilityClasses4(ownerState);
    return /* @__PURE__ */ (0, jsxRuntime.jsx)(TypographyRoot, (0, _extends22.default)({
      as: Component2,
      ref,
      ownerState,
      className: (0, _clsx.default)(classes.root, className)
    }, other));
  });
  var _default = Typography2;
  exports.default = _default;
});
var Typography = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _exportNames = {
    typographyClasses: true
  };
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
      return _Typography.default;
    }
  });
  Object.defineProperty(exports, "typographyClasses", {
    enumerable: true,
    get: function() {
      return _typographyClasses.default;
    }
  });
  var _Typography = interopRequireDefault(Typography_1);
  var _typographyClasses = _interopRequireWildcard(typographyClasses_1);
  Object.keys(_typographyClasses).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key))
      return;
    if (key in exports && exports[key] === _typographyClasses[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _typographyClasses[key];
      }
    });
  });
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function")
      return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop2) {
      return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
      return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
      return {default: obj};
    }
    var cache2 = _getRequireWildcardCache(nodeInterop);
    if (cache2 && cache2.has(obj)) {
      return cache2.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj.default = obj;
    if (cache2) {
      cache2.set(obj, newObj);
    }
    return newObj;
  }
});
var __pika_web_default_export_for_treeshaking__3 = /* @__PURE__ */ getDefaultExportFromCjs(Typography);
var Typography_default = __pika_web_default_export_for_treeshaking__3;

// docs/snowpack/pkg/@mui/material/Container.js
var containerClasses_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  exports.getContainerUtilityClass = getContainerUtilityClass;
  function getContainerUtilityClass(slot) {
    return (0, core.generateUtilityClass)("MuiContainer", slot);
  }
  const containerClasses = (0, core.generateUtilityClasses)("MuiContainer", ["root", "disableGutters", "fixed", "maxWidthXs", "maxWidthSm", "maxWidthMd", "maxWidthLg", "maxWidthXl"]);
  var _default = containerClasses;
  exports.default = _default;
});
var Container_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _objectWithoutPropertiesLoose22 = interopRequireDefault(objectWithoutPropertiesLoose);
  var _extends22 = interopRequireDefault(_extends_1);
  var React2 = _interopRequireWildcard(react);
  var _propTypes = interopRequireDefault(propTypes);
  var _clsx = interopRequireDefault(clsx);
  var _useThemeProps = interopRequireDefault(useThemeProps_1);
  var _styled = interopRequireDefault(styled_1);
  var _capitalize = interopRequireDefault(capitalize2);
  const _excluded8 = ["className", "component", "disableGutters", "fixed", "maxWidth"];
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function")
      return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop2) {
      return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
      return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
      return {default: obj};
    }
    var cache2 = _getRequireWildcardCache(nodeInterop);
    if (cache2 && cache2.has(obj)) {
      return cache2.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj.default = obj;
    if (cache2) {
      cache2.set(obj, newObj);
    }
    return newObj;
  }
  const useUtilityClasses4 = (ownerState) => {
    const {
      classes,
      fixed,
      disableGutters,
      maxWidth: maxWidth2
    } = ownerState;
    const slots = {
      root: ["root", maxWidth2 && `maxWidth${(0, _capitalize.default)(String(maxWidth2))}`, fixed && "fixed", disableGutters && "disableGutters"]
    };
    return (0, core.unstable_composeClasses)(slots, containerClasses_1.getContainerUtilityClass, classes);
  };
  const ContainerRoot = (0, _styled.default)("div", {
    name: "MuiContainer",
    slot: "Root",
    overridesResolver: (props, styles2) => {
      const {
        ownerState
      } = props;
      return [styles2.root, styles2[`maxWidth${(0, _capitalize.default)(String(ownerState.maxWidth))}`], ownerState.fixed && styles2.fixed, ownerState.disableGutters && styles2.disableGutters];
    }
  })(({
    theme,
    ownerState
  }) => (0, _extends22.default)({
    width: "100%",
    marginLeft: "auto",
    boxSizing: "border-box",
    marginRight: "auto",
    display: "block"
  }, !ownerState.disableGutters && {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3)
    }
  }), ({
    theme,
    ownerState
  }) => ownerState.fixed && Object.keys(theme.breakpoints.values).reduce((acc, breakpoint) => {
    const value = theme.breakpoints.values[breakpoint];
    if (value !== 0) {
      acc[theme.breakpoints.up(breakpoint)] = {
        maxWidth: `${value}${theme.breakpoints.unit}`
      };
    }
    return acc;
  }, {}), ({
    theme,
    ownerState
  }) => (0, _extends22.default)({}, ownerState.maxWidth === "xs" && {
    [theme.breakpoints.up("xs")]: {
      maxWidth: Math.max(theme.breakpoints.values.xs, 444)
    }
  }, ownerState.maxWidth && ownerState.maxWidth !== "xs" && {
    [theme.breakpoints.up(ownerState.maxWidth)]: {
      maxWidth: `${theme.breakpoints.values[ownerState.maxWidth]}${theme.breakpoints.unit}`
    }
  }));
  const Container2 = /* @__PURE__ */ React2.forwardRef(function Container3(inProps, ref) {
    const props = (0, _useThemeProps.default)({
      props: inProps,
      name: "MuiContainer"
    });
    const {
      className,
      component = "div",
      disableGutters = false,
      fixed = false,
      maxWidth: maxWidth2 = "lg"
    } = props, other = (0, _objectWithoutPropertiesLoose22.default)(props, _excluded8);
    const ownerState = (0, _extends22.default)({}, props, {
      component,
      disableGutters,
      fixed,
      maxWidth: maxWidth2
    });
    const classes = useUtilityClasses4(ownerState);
    return /* @__PURE__ */ (0, jsxRuntime.jsx)(ContainerRoot, (0, _extends22.default)({
      as: component,
      ownerState,
      className: (0, _clsx.default)(classes.root, className),
      ref
    }, other));
  });
  var _default = Container2;
  exports.default = _default;
});
var Container = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _exportNames = {
    containerClasses: true
  };
  Object.defineProperty(exports, "containerClasses", {
    enumerable: true,
    get: function() {
      return _containerClasses.default;
    }
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
      return _Container.default;
    }
  });
  var _Container = interopRequireDefault(Container_1);
  var _containerClasses = _interopRequireWildcard(containerClasses_1);
  Object.keys(_containerClasses).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key))
      return;
    if (key in exports && exports[key] === _containerClasses[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _containerClasses[key];
      }
    });
  });
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function")
      return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop2) {
      return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
      return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
      return {default: obj};
    }
    var cache2 = _getRequireWildcardCache(nodeInterop);
    if (cache2 && cache2.has(obj)) {
      return cache2.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj.default = obj;
    if (cache2) {
      cache2.set(obj, newObj);
    }
    return newObj;
  }
});
var __pika_web_default_export_for_treeshaking__4 = /* @__PURE__ */ getDefaultExportFromCjs(Container);
var Container_default = __pika_web_default_export_for_treeshaking__4;

// docs/dist/utilities/util.js
var calculateTotals = (values3) => {
  let subtotal = 0;
  let taxTotal = 0;
  let taxRate = 0;
  let tipRate = 0;
  let preTipTotal = parseInt(values3.price);
  let tip = parseInt(values3.tip);
  let total = preTipTotal + tip;
  let splits = {};
  values3.plates.forEach(({price}) => subtotal += parseInt(price));
  taxTotal = preTipTotal - subtotal;
  taxRate = taxTotal / subtotal;
  tipRate = tip / preTipTotal;
  values3.people.forEach(({name}) => {
    splits[name] = {total: 0, tax: 0, tip: 0, ledger: []};
  });
  Object.keys(splits).forEach((person) => {
    values3.plates.forEach((plate) => {
      if (plate.eatenBy.includes(person)) {
        const splitAmount = plate.eatenBy.length;
        const plateCost = parseInt(plate.price) / splitAmount;
        const taxCost = plateCost * taxRate;
        const tipCost = (taxCost + plateCost) * tipRate;
        const plateTotal = plateCost + tipCost + taxCost;
        splits[person].ledger.push({
          name: plate.name,
          plateCost,
          plateTotal,
          tipCost,
          taxCost
        });
        splits[person].total += plateTotal;
        splits[person].tip += tipCost;
        splits[person].tax += taxCost;
      }
    });
  });
  return {
    subtotal,
    taxRate,
    tipRate,
    taxTotal,
    preTipTotal,
    tip,
    total,
    splits
  };
};
var util_default = calculateTotals;

// docs/snowpack/pkg/yup.js
var map;
try {
  map = Map;
} catch (_2) {
}
var set;
try {
  set = Set;
} catch (_2) {
}
function baseClone(src, circulars, clones) {
  if (!src || typeof src !== "object" || typeof src === "function") {
    return src;
  }
  if (src.nodeType && "cloneNode" in src) {
    return src.cloneNode(true);
  }
  if (src instanceof Date) {
    return new Date(src.getTime());
  }
  if (src instanceof RegExp) {
    return new RegExp(src);
  }
  if (Array.isArray(src)) {
    return src.map(clone);
  }
  if (map && src instanceof map) {
    return new Map(Array.from(src.entries()));
  }
  if (set && src instanceof set) {
    return new Set(Array.from(src.values()));
  }
  if (src instanceof Object) {
    circulars.push(src);
    var obj = Object.create(src);
    clones.push(obj);
    for (var key in src) {
      var idx = circulars.findIndex(function(i2) {
        return i2 === src[key];
      });
      obj[key] = idx > -1 ? clones[idx] : baseClone(src[key], circulars, clones);
    }
    return obj;
  }
  return src;
}
function clone(src) {
  return baseClone(src, [], []);
}
var toString = Object.prototype.toString;
var errorToString = Error.prototype.toString;
var regExpToString = RegExp.prototype.toString;
var symbolToString = typeof Symbol !== "undefined" ? Symbol.prototype.toString : () => "";
var SYMBOL_REGEXP = /^Symbol\((.*)\)(.*)$/;
function printNumber(val) {
  if (val != +val)
    return "NaN";
  const isNegativeZero = val === 0 && 1 / val < 0;
  return isNegativeZero ? "-0" : "" + val;
}
function printSimpleValue(val, quoteStrings = false) {
  if (val == null || val === true || val === false)
    return "" + val;
  const typeOf4 = typeof val;
  if (typeOf4 === "number")
    return printNumber(val);
  if (typeOf4 === "string")
    return quoteStrings ? `"${val}"` : val;
  if (typeOf4 === "function")
    return "[Function " + (val.name || "anonymous") + "]";
  if (typeOf4 === "symbol")
    return symbolToString.call(val).replace(SYMBOL_REGEXP, "Symbol($1)");
  const tag = toString.call(val).slice(8, -1);
  if (tag === "Date")
    return isNaN(val.getTime()) ? "" + val : val.toISOString(val);
  if (tag === "Error" || val instanceof Error)
    return "[" + errorToString.call(val) + "]";
  if (tag === "RegExp")
    return regExpToString.call(val);
  return null;
}
function printValue(value, quoteStrings) {
  let result = printSimpleValue(value, quoteStrings);
  if (result !== null)
    return result;
  return JSON.stringify(value, function(key, value2) {
    let result2 = printSimpleValue(this[key], quoteStrings);
    if (result2 !== null)
      return result2;
    return value2;
  }, 2);
}
var mixed = {
  default: "${path} is invalid",
  required: "${path} is a required field",
  oneOf: "${path} must be one of the following values: ${values}",
  notOneOf: "${path} must not be one of the following values: ${values}",
  notType: ({
    path,
    type,
    value,
    originalValue
  }) => {
    let isCast = originalValue != null && originalValue !== value;
    let msg = `${path} must be a \`${type}\` type, but the final value was: \`${printValue(value, true)}\`` + (isCast ? ` (cast from the value \`${printValue(originalValue, true)}\`).` : ".");
    if (value === null) {
      msg += `
 If "null" is intended as an empty value be sure to mark the schema as \`.nullable()\``;
    }
    return msg;
  },
  defined: "${path} must be defined"
};
var string = {
  length: "${path} must be exactly ${length} characters",
  min: "${path} must be at least ${min} characters",
  max: "${path} must be at most ${max} characters",
  matches: '${path} must match the following: "${regex}"',
  email: "${path} must be a valid email",
  url: "${path} must be a valid URL",
  uuid: "${path} must be a valid UUID",
  trim: "${path} must be a trimmed string",
  lowercase: "${path} must be a lowercase string",
  uppercase: "${path} must be a upper case string"
};
var number = {
  min: "${path} must be greater than or equal to ${min}",
  max: "${path} must be less than or equal to ${max}",
  lessThan: "${path} must be less than ${less}",
  moreThan: "${path} must be greater than ${more}",
  positive: "${path} must be a positive number",
  negative: "${path} must be a negative number",
  integer: "${path} must be an integer"
};
var date = {
  min: "${path} field must be later than ${min}",
  max: "${path} field must be at earlier than ${max}"
};
var boolean = {
  isValue: "${path} field must be ${value}"
};
var object = {
  noUnknown: "${path} field has unspecified keys: ${unknown}"
};
var array = {
  min: "${path} field must have at least ${min} items",
  max: "${path} field must have less than or equal to ${max} items",
  length: "${path} must have ${length} items"
};
var locale = Object.assign(Object.create(null), {
  mixed,
  string,
  number,
  date,
  object,
  array,
  boolean
});
var objectProto = Object.prototype;
var hasOwnProperty2 = objectProto.hasOwnProperty;
function baseHas(object2, key) {
  return object2 != null && hasOwnProperty2.call(object2, key);
}
var _baseHas = baseHas;
var isArray = Array.isArray;
var isArray_1 = isArray;
var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
var _freeGlobal = freeGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = _freeGlobal || freeSelf || Function("return this")();
var _root = root;
var Symbol$1 = _root.Symbol;
var _Symbol = Symbol$1;
var objectProto$1 = Object.prototype;
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
var nativeObjectToString = objectProto$1.toString;
var symToStringTag = _Symbol ? _Symbol.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty$1.call(value, symToStringTag), tag = value[symToStringTag];
  try {
    value[symToStringTag] = void 0;
    var unmasked = true;
  } catch (e5) {
  }
  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}
var _getRawTag = getRawTag;
var objectProto$2 = Object.prototype;
var nativeObjectToString$1 = objectProto$2.toString;
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}
var _objectToString = objectToString;
var nullTag = "[object Null]";
var undefinedTag = "[object Undefined]";
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag$1 && symToStringTag$1 in Object(value) ? _getRawTag(value) : _objectToString(value);
}
var _baseGetTag = baseGetTag;
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var isObjectLike_1 = isObjectLike;
var symbolTag = "[object Symbol]";
function isSymbol(value) {
  return typeof value == "symbol" || isObjectLike_1(value) && _baseGetTag(value) == symbolTag;
}
var isSymbol_1 = isSymbol;
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
var reIsPlainProp = /^\w*$/;
function isKey(value, object2) {
  if (isArray_1(value)) {
    return false;
  }
  var type = typeof value;
  if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol_1(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object2 != null && value in Object(object2);
}
var _isKey = isKey;
function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var isObject_1 = isObject;
var asyncTag = "[object AsyncFunction]";
var funcTag = "[object Function]";
var genTag = "[object GeneratorFunction]";
var proxyTag = "[object Proxy]";
function isFunction(value) {
  if (!isObject_1(value)) {
    return false;
  }
  var tag = _baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}
var isFunction_1 = isFunction;
var coreJsData = _root["__core-js_shared__"];
var _coreJsData = coreJsData;
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var _isMasked = isMasked;
var funcProto = Function.prototype;
var funcToString = funcProto.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e5) {
    }
    try {
      return func + "";
    } catch (e5) {
    }
  }
  return "";
}
var _toSource = toSource;
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto$1 = Function.prototype;
var objectProto$3 = Object.prototype;
var funcToString$1 = funcProto$1.toString;
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
var reIsNative = RegExp("^" + funcToString$1.call(hasOwnProperty$2).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
function baseIsNative(value) {
  if (!isObject_1(value) || _isMasked(value)) {
    return false;
  }
  var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
  return pattern.test(_toSource(value));
}
var _baseIsNative = baseIsNative;
function getValue2(object2, key) {
  return object2 == null ? void 0 : object2[key];
}
var _getValue = getValue2;
function getNative(object2, key) {
  var value = _getValue(object2, key);
  return _baseIsNative(value) ? value : void 0;
}
var _getNative = getNative;
var nativeCreate = _getNative(Object, "create");
var _nativeCreate = nativeCreate;
function hashClear() {
  this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
  this.size = 0;
}
var _hashClear = hashClear;
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var _hashDelete = hashDelete;
var HASH_UNDEFINED = "__lodash_hash_undefined__";
var objectProto$4 = Object.prototype;
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (_nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? void 0 : result;
  }
  return hasOwnProperty$3.call(data, key) ? data[key] : void 0;
}
var _hashGet = hashGet;
var objectProto$5 = Object.prototype;
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return _nativeCreate ? data[key] !== void 0 : hasOwnProperty$4.call(data, key);
}
var _hashHas = hashHas;
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = _nativeCreate && value === void 0 ? HASH_UNDEFINED$1 : value;
  return this;
}
var _hashSet = hashSet;
function Hash(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
Hash.prototype.clear = _hashClear;
Hash.prototype["delete"] = _hashDelete;
Hash.prototype.get = _hashGet;
Hash.prototype.has = _hashHas;
Hash.prototype.set = _hashSet;
var _Hash = Hash;
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
var _listCacheClear = listCacheClear;
function eq(value, other) {
  return value === other || value !== value && other !== other;
}
var eq_1 = eq;
function assocIndexOf(array2, key) {
  var length = array2.length;
  while (length--) {
    if (eq_1(array2[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var _assocIndexOf = assocIndexOf;
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key) {
  var data = this.__data__, index = _assocIndexOf(data, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}
var _listCacheDelete = listCacheDelete;
function listCacheGet(key) {
  var data = this.__data__, index = _assocIndexOf(data, key);
  return index < 0 ? void 0 : data[index][1];
}
var _listCacheGet = listCacheGet;
function listCacheHas(key) {
  return _assocIndexOf(this.__data__, key) > -1;
}
var _listCacheHas = listCacheHas;
function listCacheSet(key, value) {
  var data = this.__data__, index = _assocIndexOf(data, key);
  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}
var _listCacheSet = listCacheSet;
function ListCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = _listCacheClear;
ListCache.prototype["delete"] = _listCacheDelete;
ListCache.prototype.get = _listCacheGet;
ListCache.prototype.has = _listCacheHas;
ListCache.prototype.set = _listCacheSet;
var _ListCache = ListCache;
var Map$1 = _getNative(_root, "Map");
var _Map = Map$1;
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    hash: new _Hash(),
    map: new (_Map || _ListCache)(),
    string: new _Hash()
  };
}
var _mapCacheClear = mapCacheClear;
function isKeyable(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
var _isKeyable = isKeyable;
function getMapData(map2, key) {
  var data = map2.__data__;
  return _isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
var _getMapData = getMapData;
function mapCacheDelete(key) {
  var result = _getMapData(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
var _mapCacheDelete = mapCacheDelete;
function mapCacheGet(key) {
  return _getMapData(this, key).get(key);
}
var _mapCacheGet = mapCacheGet;
function mapCacheHas(key) {
  return _getMapData(this, key).has(key);
}
var _mapCacheHas = mapCacheHas;
function mapCacheSet(key, value) {
  var data = _getMapData(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
var _mapCacheSet = mapCacheSet;
function MapCache(entries) {
  var index = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}
MapCache.prototype.clear = _mapCacheClear;
MapCache.prototype["delete"] = _mapCacheDelete;
MapCache.prototype.get = _mapCacheGet;
MapCache.prototype.has = _mapCacheHas;
MapCache.prototype.set = _mapCacheSet;
var _MapCache = MapCache;
var FUNC_ERROR_TEXT = "Expected a function";
function memoize2(func, resolver) {
  if (typeof func != "function" || resolver != null && typeof resolver != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache2 = memoized.cache;
    if (cache2.has(key)) {
      return cache2.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache2.set(key, result) || cache2;
    return result;
  };
  memoized.cache = new (memoize2.Cache || _MapCache)();
  return memoized;
}
memoize2.Cache = _MapCache;
var memoize_1 = memoize2;
var MAX_MEMOIZE_SIZE = 500;
function memoizeCapped(func) {
  var result = memoize_1(func, function(key) {
    if (cache2.size === MAX_MEMOIZE_SIZE) {
      cache2.clear();
    }
    return key;
  });
  var cache2 = result.cache;
  return result;
}
var _memoizeCapped = memoizeCapped;
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var reEscapeChar = /\\(\\)?/g;
var stringToPath = _memoizeCapped(function(string2) {
  var result = [];
  if (string2.charCodeAt(0) === 46) {
    result.push("");
  }
  string2.replace(rePropName, function(match, number2, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, "$1") : number2 || match);
  });
  return result;
});
var _stringToPath = stringToPath;
function arrayMap(array2, iteratee) {
  var index = -1, length = array2 == null ? 0 : array2.length, result = Array(length);
  while (++index < length) {
    result[index] = iteratee(array2[index], index, array2);
  }
  return result;
}
var _arrayMap = arrayMap;
var INFINITY = 1 / 0;
var symbolProto = _Symbol ? _Symbol.prototype : void 0;
var symbolToString$1 = symbolProto ? symbolProto.toString : void 0;
function baseToString(value) {
  if (typeof value == "string") {
    return value;
  }
  if (isArray_1(value)) {
    return _arrayMap(value, baseToString) + "";
  }
  if (isSymbol_1(value)) {
    return symbolToString$1 ? symbolToString$1.call(value) : "";
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}
var _baseToString = baseToString;
function toString$1(value) {
  return value == null ? "" : _baseToString(value);
}
var toString_1 = toString$1;
function castPath(value, object2) {
  if (isArray_1(value)) {
    return value;
  }
  return _isKey(value, object2) ? [value] : _stringToPath(toString_1(value));
}
var _castPath = castPath;
var argsTag = "[object Arguments]";
function baseIsArguments(value) {
  return isObjectLike_1(value) && _baseGetTag(value) == argsTag;
}
var _baseIsArguments = baseIsArguments;
var objectProto$6 = Object.prototype;
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;
var propertyIsEnumerable = objectProto$6.propertyIsEnumerable;
var isArguments = _baseIsArguments(function() {
  return arguments;
}()) ? _baseIsArguments : function(value) {
  return isObjectLike_1(value) && hasOwnProperty$5.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
};
var isArguments_1 = isArguments;
var MAX_SAFE_INTEGER = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
var _isIndex = isIndex;
var MAX_SAFE_INTEGER$1 = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
}
var isLength_1 = isLength;
var INFINITY$1 = 1 / 0;
function toKey(value) {
  if (typeof value == "string" || isSymbol_1(value)) {
    return value;
  }
  var result = value + "";
  return result == "0" && 1 / value == -INFINITY$1 ? "-0" : result;
}
var _toKey = toKey;
function hasPath(object2, path, hasFunc) {
  path = _castPath(path, object2);
  var index = -1, length = path.length, result = false;
  while (++index < length) {
    var key = _toKey(path[index]);
    if (!(result = object2 != null && hasFunc(object2, key))) {
      break;
    }
    object2 = object2[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object2 == null ? 0 : object2.length;
  return !!length && isLength_1(length) && _isIndex(key, length) && (isArray_1(object2) || isArguments_1(object2));
}
var _hasPath = hasPath;
function has(object2, path) {
  return object2 != null && _hasPath(object2, path, _baseHas);
}
var has_1 = has;
var isSchema = (obj) => obj && obj.__isYupSchema__;
var Condition = class {
  constructor(refs, options) {
    this.fn = void 0;
    this.refs = refs;
    this.refs = refs;
    if (typeof options === "function") {
      this.fn = options;
      return;
    }
    if (!has_1(options, "is"))
      throw new TypeError("`is:` is required for `when()` conditions");
    if (!options.then && !options.otherwise)
      throw new TypeError("either `then:` or `otherwise:` is required for `when()` conditions");
    let {
      is,
      then,
      otherwise
    } = options;
    let check = typeof is === "function" ? is : (...values3) => values3.every((value) => value === is);
    this.fn = function(...args) {
      let options2 = args.pop();
      let schema = args.pop();
      let branch = check(...args) ? then : otherwise;
      if (!branch)
        return void 0;
      if (typeof branch === "function")
        return branch(schema);
      return schema.concat(branch.resolve(options2));
    };
  }
  resolve(base, options) {
    let values3 = this.refs.map((ref) => ref.getValue(options == null ? void 0 : options.value, options == null ? void 0 : options.parent, options == null ? void 0 : options.context));
    let schema = this.fn.apply(base, values3.concat(base, options));
    if (schema === void 0 || schema === base)
      return base;
    if (!isSchema(schema))
      throw new TypeError("conditions must return a schema object");
    return schema.resolve(options);
  }
};
function toArray(value) {
  return value == null ? [] : [].concat(value);
}
function _extends2() {
  _extends2 = Object.assign || function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends2.apply(this, arguments);
}
var strReg = /\$\{\s*(\w+)\s*\}/g;
var ValidationError = class extends Error {
  static formatError(message, params) {
    const path = params.label || params.path || "this";
    if (path !== params.path)
      params = _extends2({}, params, {
        path
      });
    if (typeof message === "string")
      return message.replace(strReg, (_2, key) => printValue(params[key]));
    if (typeof message === "function")
      return message(params);
    return message;
  }
  static isError(err) {
    return err && err.name === "ValidationError";
  }
  constructor(errorOrErrors, value, field, type) {
    super();
    this.value = void 0;
    this.path = void 0;
    this.type = void 0;
    this.errors = void 0;
    this.params = void 0;
    this.inner = void 0;
    this.name = "ValidationError";
    this.value = value;
    this.path = field;
    this.type = type;
    this.errors = [];
    this.inner = [];
    toArray(errorOrErrors).forEach((err) => {
      if (ValidationError.isError(err)) {
        this.errors.push(...err.errors);
        this.inner = this.inner.concat(err.inner.length ? err.inner : err);
      } else {
        this.errors.push(err);
      }
    });
    this.message = this.errors.length > 1 ? `${this.errors.length} errors occurred` : this.errors[0];
    if (Error.captureStackTrace)
      Error.captureStackTrace(this, ValidationError);
  }
};
var once = (cb2) => {
  let fired = false;
  return (...args) => {
    if (fired)
      return;
    fired = true;
    cb2(...args);
  };
};
function runTests(options, cb2) {
  let {
    endEarly,
    tests,
    args,
    value,
    errors,
    sort,
    path
  } = options;
  let callback = once(cb2);
  let count = tests.length;
  const nestedErrors = [];
  errors = errors ? errors : [];
  if (!count)
    return errors.length ? callback(new ValidationError(errors, value, path)) : callback(null, value);
  for (let i2 = 0; i2 < tests.length; i2++) {
    const test = tests[i2];
    test(args, function finishTestRun(err) {
      if (err) {
        if (!ValidationError.isError(err)) {
          return callback(err, value);
        }
        if (endEarly) {
          err.value = value;
          return callback(err, value);
        }
        nestedErrors.push(err);
      }
      if (--count <= 0) {
        if (nestedErrors.length) {
          if (sort)
            nestedErrors.sort(sort);
          if (errors.length)
            nestedErrors.push(...errors);
          errors = nestedErrors;
        }
        if (errors.length) {
          callback(new ValidationError(errors, value, path), value);
          return;
        }
        callback(null, value);
      }
    });
  }
}
var defineProperty2 = function() {
  try {
    var func = _getNative(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e5) {
  }
}();
var _defineProperty = defineProperty2;
function baseAssignValue(object2, key, value) {
  if (key == "__proto__" && _defineProperty) {
    _defineProperty(object2, key, {
      configurable: true,
      enumerable: true,
      value,
      writable: true
    });
  } else {
    object2[key] = value;
  }
}
var _baseAssignValue = baseAssignValue;
function createBaseFor(fromRight) {
  return function(object2, iteratee, keysFunc) {
    var index = -1, iterable = Object(object2), props = keysFunc(object2), length = props.length;
    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object2;
  };
}
var _createBaseFor = createBaseFor;
var baseFor = _createBaseFor();
var _baseFor = baseFor;
function baseTimes(n5, iteratee) {
  var index = -1, result = Array(n5);
  while (++index < n5) {
    result[index] = iteratee(index);
  }
  return result;
}
var _baseTimes = baseTimes;
function stubFalse() {
  return false;
}
var stubFalse_1 = stubFalse;
var isBuffer_1 = createCommonjsModule(function(module, exports) {
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var Buffer2 = moduleExports ? _root.Buffer : void 0;
  var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
  var isBuffer = nativeIsBuffer || stubFalse_1;
  module.exports = isBuffer;
});
var argsTag$1 = "[object Arguments]";
var arrayTag = "[object Array]";
var boolTag = "[object Boolean]";
var dateTag = "[object Date]";
var errorTag = "[object Error]";
var funcTag$1 = "[object Function]";
var mapTag = "[object Map]";
var numberTag = "[object Number]";
var objectTag = "[object Object]";
var regexpTag = "[object RegExp]";
var setTag = "[object Set]";
var stringTag = "[object String]";
var weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]";
var dataViewTag = "[object DataView]";
var float32Tag = "[object Float32Array]";
var float64Tag = "[object Float64Array]";
var int8Tag = "[object Int8Array]";
var int16Tag = "[object Int16Array]";
var int32Tag = "[object Int32Array]";
var uint8Tag = "[object Uint8Array]";
var uint8ClampedTag = "[object Uint8ClampedArray]";
var uint16Tag = "[object Uint16Array]";
var uint32Tag = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
function baseIsTypedArray(value) {
  return isObjectLike_1(value) && isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
}
var _baseIsTypedArray = baseIsTypedArray;
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
var _baseUnary = baseUnary;
var _nodeUtil = createCommonjsModule(function(module, exports) {
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var freeProcess = moduleExports && _freeGlobal.process;
  var nodeUtil = function() {
    try {
      var types = freeModule && freeModule.require && freeModule.require("util").types;
      if (types) {
        return types;
      }
      return freeProcess && freeProcess.binding && freeProcess.binding("util");
    } catch (e5) {
    }
  }();
  module.exports = nodeUtil;
});
var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;
var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;
var isTypedArray_1 = isTypedArray;
var objectProto$7 = Object.prototype;
var hasOwnProperty$6 = objectProto$7.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray_1(value), isArg = !isArr && isArguments_1(value), isBuff = !isArr && !isArg && isBuffer_1(value), isType = !isArr && !isArg && !isBuff && isTypedArray_1(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? _baseTimes(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty$6.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || _isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
var _arrayLikeKeys = arrayLikeKeys;
var objectProto$8 = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$8;
  return value === proto;
}
var _isPrototype = isPrototype;
function overArg(func, transform2) {
  return function(arg) {
    return func(transform2(arg));
  };
}
var _overArg = overArg;
var nativeKeys = _overArg(Object.keys, Object);
var _nativeKeys = nativeKeys;
var objectProto$9 = Object.prototype;
var hasOwnProperty$7 = objectProto$9.hasOwnProperty;
function baseKeys(object2) {
  if (!_isPrototype(object2)) {
    return _nativeKeys(object2);
  }
  var result = [];
  for (var key in Object(object2)) {
    if (hasOwnProperty$7.call(object2, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
var _baseKeys = baseKeys;
function isArrayLike(value) {
  return value != null && isLength_1(value.length) && !isFunction_1(value);
}
var isArrayLike_1 = isArrayLike;
function keys(object2) {
  return isArrayLike_1(object2) ? _arrayLikeKeys(object2) : _baseKeys(object2);
}
var keys_1 = keys;
function baseForOwn(object2, iteratee) {
  return object2 && _baseFor(object2, iteratee, keys_1);
}
var _baseForOwn = baseForOwn;
function stackClear() {
  this.__data__ = new _ListCache();
  this.size = 0;
}
var _stackClear = stackClear;
function stackDelete(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
var _stackDelete = stackDelete;
function stackGet(key) {
  return this.__data__.get(key);
}
var _stackGet = stackGet;
function stackHas(key) {
  return this.__data__.has(key);
}
var _stackHas = stackHas;
var LARGE_ARRAY_SIZE = 200;
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof _ListCache) {
    var pairs = data.__data__;
    if (!_Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new _MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
var _stackSet = stackSet;
function Stack2(entries) {
  var data = this.__data__ = new _ListCache(entries);
  this.size = data.size;
}
Stack2.prototype.clear = _stackClear;
Stack2.prototype["delete"] = _stackDelete;
Stack2.prototype.get = _stackGet;
Stack2.prototype.has = _stackHas;
Stack2.prototype.set = _stackSet;
var _Stack = Stack2;
var HASH_UNDEFINED$2 = "__lodash_hash_undefined__";
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED$2);
  return this;
}
var _setCacheAdd = setCacheAdd;
function setCacheHas(value) {
  return this.__data__.has(value);
}
var _setCacheHas = setCacheHas;
function SetCache(values3) {
  var index = -1, length = values3 == null ? 0 : values3.length;
  this.__data__ = new _MapCache();
  while (++index < length) {
    this.add(values3[index]);
  }
}
SetCache.prototype.add = SetCache.prototype.push = _setCacheAdd;
SetCache.prototype.has = _setCacheHas;
var _SetCache = SetCache;
function arraySome(array2, predicate) {
  var index = -1, length = array2 == null ? 0 : array2.length;
  while (++index < length) {
    if (predicate(array2[index], index, array2)) {
      return true;
    }
  }
  return false;
}
var _arraySome = arraySome;
function cacheHas(cache2, key) {
  return cache2.has(key);
}
var _cacheHas = cacheHas;
var COMPARE_PARTIAL_FLAG = 1;
var COMPARE_UNORDERED_FLAG = 2;
function equalArrays(array2, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array2.length, othLength = other.length;
  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  var arrStacked = stack.get(array2);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array2;
  }
  var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new _SetCache() : void 0;
  stack.set(array2, other);
  stack.set(other, array2);
  while (++index < arrLength) {
    var arrValue = array2[index], othValue = other[index];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, arrValue, index, other, array2, stack) : customizer(arrValue, othValue, index, array2, other, stack);
    }
    if (compared !== void 0) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    if (seen) {
      if (!_arraySome(other, function(othValue2, othIndex) {
        if (!_cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
          return seen.push(othIndex);
        }
      })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
      result = false;
      break;
    }
  }
  stack["delete"](array2);
  stack["delete"](other);
  return result;
}
var _equalArrays = equalArrays;
var Uint8Array2 = _root.Uint8Array;
var _Uint8Array = Uint8Array2;
function mapToArray(map2) {
  var index = -1, result = Array(map2.size);
  map2.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}
var _mapToArray = mapToArray;
function setToArray(set2) {
  var index = -1, result = Array(set2.size);
  set2.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}
var _setToArray = setToArray;
var COMPARE_PARTIAL_FLAG$1 = 1;
var COMPARE_UNORDERED_FLAG$1 = 2;
var boolTag$1 = "[object Boolean]";
var dateTag$1 = "[object Date]";
var errorTag$1 = "[object Error]";
var mapTag$1 = "[object Map]";
var numberTag$1 = "[object Number]";
var regexpTag$1 = "[object RegExp]";
var setTag$1 = "[object Set]";
var stringTag$1 = "[object String]";
var symbolTag$1 = "[object Symbol]";
var arrayBufferTag$1 = "[object ArrayBuffer]";
var dataViewTag$1 = "[object DataView]";
var symbolProto$1 = _Symbol ? _Symbol.prototype : void 0;
var symbolValueOf = symbolProto$1 ? symbolProto$1.valueOf : void 0;
function equalByTag(object2, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag$1:
      if (object2.byteLength != other.byteLength || object2.byteOffset != other.byteOffset) {
        return false;
      }
      object2 = object2.buffer;
      other = other.buffer;
    case arrayBufferTag$1:
      if (object2.byteLength != other.byteLength || !equalFunc(new _Uint8Array(object2), new _Uint8Array(other))) {
        return false;
      }
      return true;
    case boolTag$1:
    case dateTag$1:
    case numberTag$1:
      return eq_1(+object2, +other);
    case errorTag$1:
      return object2.name == other.name && object2.message == other.message;
    case regexpTag$1:
    case stringTag$1:
      return object2 == other + "";
    case mapTag$1:
      var convert = _mapToArray;
    case setTag$1:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1;
      convert || (convert = _setToArray);
      if (object2.size != other.size && !isPartial) {
        return false;
      }
      var stacked = stack.get(object2);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG$1;
      stack.set(object2, other);
      var result = _equalArrays(convert(object2), convert(other), bitmask, customizer, equalFunc, stack);
      stack["delete"](object2);
      return result;
    case symbolTag$1:
      if (symbolValueOf) {
        return symbolValueOf.call(object2) == symbolValueOf.call(other);
      }
  }
  return false;
}
var _equalByTag = equalByTag;
function arrayPush(array2, values3) {
  var index = -1, length = values3.length, offset2 = array2.length;
  while (++index < length) {
    array2[offset2 + index] = values3[index];
  }
  return array2;
}
var _arrayPush = arrayPush;
function baseGetAllKeys(object2, keysFunc, symbolsFunc) {
  var result = keysFunc(object2);
  return isArray_1(object2) ? result : _arrayPush(result, symbolsFunc(object2));
}
var _baseGetAllKeys = baseGetAllKeys;
function arrayFilter(array2, predicate) {
  var index = -1, length = array2 == null ? 0 : array2.length, resIndex = 0, result = [];
  while (++index < length) {
    var value = array2[index];
    if (predicate(value, index, array2)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
var _arrayFilter = arrayFilter;
function stubArray() {
  return [];
}
var stubArray_1 = stubArray;
var objectProto$a = Object.prototype;
var propertyIsEnumerable$1 = objectProto$a.propertyIsEnumerable;
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbols = !nativeGetSymbols ? stubArray_1 : function(object2) {
  if (object2 == null) {
    return [];
  }
  object2 = Object(object2);
  return _arrayFilter(nativeGetSymbols(object2), function(symbol) {
    return propertyIsEnumerable$1.call(object2, symbol);
  });
};
var _getSymbols = getSymbols;
function getAllKeys(object2) {
  return _baseGetAllKeys(object2, keys_1, _getSymbols);
}
var _getAllKeys = getAllKeys;
var COMPARE_PARTIAL_FLAG$2 = 1;
var objectProto$b = Object.prototype;
var hasOwnProperty$8 = objectProto$b.hasOwnProperty;
function equalObjects(object2, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2, objProps = _getAllKeys(object2), objLength = objProps.length, othProps = _getAllKeys(other), othLength = othProps.length;
  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty$8.call(other, key))) {
      return false;
    }
  }
  var objStacked = stack.get(object2);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object2;
  }
  var result = true;
  stack.set(object2, other);
  stack.set(other, object2);
  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object2[key], othValue = other[key];
    if (customizer) {
      var compared = isPartial ? customizer(othValue, objValue, key, other, object2, stack) : customizer(objValue, othValue, key, object2, other, stack);
    }
    if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == "constructor");
  }
  if (result && !skipCtor) {
    var objCtor = object2.constructor, othCtor = other.constructor;
    if (objCtor != othCtor && ("constructor" in object2 && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack["delete"](object2);
  stack["delete"](other);
  return result;
}
var _equalObjects = equalObjects;
var DataView = _getNative(_root, "DataView");
var _DataView = DataView;
var Promise$1 = _getNative(_root, "Promise");
var _Promise = Promise$1;
var Set$1 = _getNative(_root, "Set");
var _Set = Set$1;
var WeakMap2 = _getNative(_root, "WeakMap");
var _WeakMap = WeakMap2;
var mapTag$2 = "[object Map]";
var objectTag$1 = "[object Object]";
var promiseTag = "[object Promise]";
var setTag$2 = "[object Set]";
var weakMapTag$1 = "[object WeakMap]";
var dataViewTag$2 = "[object DataView]";
var dataViewCtorString = _toSource(_DataView);
var mapCtorString = _toSource(_Map);
var promiseCtorString = _toSource(_Promise);
var setCtorString = _toSource(_Set);
var weakMapCtorString = _toSource(_WeakMap);
var getTag = _baseGetTag;
if (_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag$2 || _Map && getTag(new _Map()) != mapTag$2 || _Promise && getTag(_Promise.resolve()) != promiseTag || _Set && getTag(new _Set()) != setTag$2 || _WeakMap && getTag(new _WeakMap()) != weakMapTag$1) {
  getTag = function(value) {
    var result = _baseGetTag(value), Ctor = result == objectTag$1 ? value.constructor : void 0, ctorString = Ctor ? _toSource(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag$2;
        case mapCtorString:
          return mapTag$2;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag$2;
        case weakMapCtorString:
          return weakMapTag$1;
      }
    }
    return result;
  };
}
var _getTag = getTag;
var COMPARE_PARTIAL_FLAG$3 = 1;
var argsTag$2 = "[object Arguments]";
var arrayTag$1 = "[object Array]";
var objectTag$2 = "[object Object]";
var objectProto$c = Object.prototype;
var hasOwnProperty$9 = objectProto$c.hasOwnProperty;
function baseIsEqualDeep(object2, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray_1(object2), othIsArr = isArray_1(other), objTag = objIsArr ? arrayTag$1 : _getTag(object2), othTag = othIsArr ? arrayTag$1 : _getTag(other);
  objTag = objTag == argsTag$2 ? objectTag$2 : objTag;
  othTag = othTag == argsTag$2 ? objectTag$2 : othTag;
  var objIsObj = objTag == objectTag$2, othIsObj = othTag == objectTag$2, isSameTag = objTag == othTag;
  if (isSameTag && isBuffer_1(object2)) {
    if (!isBuffer_1(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new _Stack());
    return objIsArr || isTypedArray_1(object2) ? _equalArrays(object2, other, bitmask, customizer, equalFunc, stack) : _equalByTag(object2, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG$3)) {
    var objIsWrapped = objIsObj && hasOwnProperty$9.call(object2, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty$9.call(other, "__wrapped__");
    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object2.value() : object2, othUnwrapped = othIsWrapped ? other.value() : other;
      stack || (stack = new _Stack());
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new _Stack());
  return _equalObjects(object2, other, bitmask, customizer, equalFunc, stack);
}
var _baseIsEqualDeep = baseIsEqualDeep;
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || !isObjectLike_1(value) && !isObjectLike_1(other)) {
    return value !== value && other !== other;
  }
  return _baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}
var _baseIsEqual = baseIsEqual;
var COMPARE_PARTIAL_FLAG$4 = 1;
var COMPARE_UNORDERED_FLAG$2 = 2;
function baseIsMatch(object2, source, matchData, customizer) {
  var index = matchData.length, length = index, noCustomizer = !customizer;
  if (object2 == null) {
    return !length;
  }
  object2 = Object(object2);
  while (index--) {
    var data = matchData[index];
    if (noCustomizer && data[2] ? data[1] !== object2[data[0]] : !(data[0] in object2)) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0], objValue = object2[key], srcValue = data[1];
    if (noCustomizer && data[2]) {
      if (objValue === void 0 && !(key in object2)) {
        return false;
      }
    } else {
      var stack = new _Stack();
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object2, source, stack);
      }
      if (!(result === void 0 ? _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$4 | COMPARE_UNORDERED_FLAG$2, customizer, stack) : result)) {
        return false;
      }
    }
  }
  return true;
}
var _baseIsMatch = baseIsMatch;
function isStrictComparable(value) {
  return value === value && !isObject_1(value);
}
var _isStrictComparable = isStrictComparable;
function getMatchData(object2) {
  var result = keys_1(object2), length = result.length;
  while (length--) {
    var key = result[length], value = object2[key];
    result[length] = [key, value, _isStrictComparable(value)];
  }
  return result;
}
var _getMatchData = getMatchData;
function matchesStrictComparable(key, srcValue) {
  return function(object2) {
    if (object2 == null) {
      return false;
    }
    return object2[key] === srcValue && (srcValue !== void 0 || key in Object(object2));
  };
}
var _matchesStrictComparable = matchesStrictComparable;
function baseMatches(source) {
  var matchData = _getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return _matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object2) {
    return object2 === source || _baseIsMatch(object2, source, matchData);
  };
}
var _baseMatches = baseMatches;
function baseGet(object2, path) {
  path = _castPath(path, object2);
  var index = 0, length = path.length;
  while (object2 != null && index < length) {
    object2 = object2[_toKey(path[index++])];
  }
  return index && index == length ? object2 : void 0;
}
var _baseGet = baseGet;
function get(object2, path, defaultValue) {
  var result = object2 == null ? void 0 : _baseGet(object2, path);
  return result === void 0 ? defaultValue : result;
}
var get_1 = get;
function baseHasIn(object2, key) {
  return object2 != null && key in Object(object2);
}
var _baseHasIn = baseHasIn;
function hasIn(object2, path) {
  return object2 != null && _hasPath(object2, path, _baseHasIn);
}
var hasIn_1 = hasIn;
var COMPARE_PARTIAL_FLAG$5 = 1;
var COMPARE_UNORDERED_FLAG$3 = 2;
function baseMatchesProperty(path, srcValue) {
  if (_isKey(path) && _isStrictComparable(srcValue)) {
    return _matchesStrictComparable(_toKey(path), srcValue);
  }
  return function(object2) {
    var objValue = get_1(object2, path);
    return objValue === void 0 && objValue === srcValue ? hasIn_1(object2, path) : _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$5 | COMPARE_UNORDERED_FLAG$3);
  };
}
var _baseMatchesProperty = baseMatchesProperty;
function identity(value) {
  return value;
}
var identity_1 = identity;
function baseProperty(key) {
  return function(object2) {
    return object2 == null ? void 0 : object2[key];
  };
}
var _baseProperty = baseProperty;
function basePropertyDeep(path) {
  return function(object2) {
    return _baseGet(object2, path);
  };
}
var _basePropertyDeep = basePropertyDeep;
function property(path) {
  return _isKey(path) ? _baseProperty(_toKey(path)) : _basePropertyDeep(path);
}
var property_1 = property;
function baseIteratee(value) {
  if (typeof value == "function") {
    return value;
  }
  if (value == null) {
    return identity_1;
  }
  if (typeof value == "object") {
    return isArray_1(value) ? _baseMatchesProperty(value[0], value[1]) : _baseMatches(value);
  }
  return property_1(value);
}
var _baseIteratee = baseIteratee;
function mapValues(object2, iteratee) {
  var result = {};
  iteratee = _baseIteratee(iteratee);
  _baseForOwn(object2, function(value, key, object3) {
    _baseAssignValue(result, key, iteratee(value, key, object3));
  });
  return result;
}
var mapValues_1 = mapValues;
function Cache(maxSize) {
  this._maxSize = maxSize;
  this.clear();
}
Cache.prototype.clear = function() {
  this._size = 0;
  this._values = Object.create(null);
};
Cache.prototype.get = function(key) {
  return this._values[key];
};
Cache.prototype.set = function(key, value) {
  this._size >= this._maxSize && this.clear();
  if (!(key in this._values))
    this._size++;
  return this._values[key] = value;
};
var SPLIT_REGEX = /[^.^\]^[]+|(?=\[\]|\.\.)/g;
var DIGIT_REGEX = /^\d+$/;
var LEAD_DIGIT_REGEX = /^\d/;
var SPEC_CHAR_REGEX = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g;
var CLEAN_QUOTES_REGEX = /^\s*(['"]?)(.*?)(\1)\s*$/;
var MAX_CACHE_SIZE = 512;
var pathCache = new Cache(MAX_CACHE_SIZE);
var setCache = new Cache(MAX_CACHE_SIZE);
var getCache = new Cache(MAX_CACHE_SIZE);
var propertyExpr = {
  Cache,
  split,
  normalizePath,
  setter: function(path) {
    var parts = normalizePath(path);
    return setCache.get(path) || setCache.set(path, function setter(obj, value) {
      var index = 0;
      var len = parts.length;
      var data = obj;
      while (index < len - 1) {
        var part = parts[index];
        if (part === "__proto__" || part === "constructor" || part === "prototype") {
          return obj;
        }
        data = data[parts[index++]];
      }
      data[parts[index]] = value;
    });
  },
  getter: function(path, safe) {
    var parts = normalizePath(path);
    return getCache.get(path) || getCache.set(path, function getter(data) {
      var index = 0, len = parts.length;
      while (index < len) {
        if (data != null || !safe)
          data = data[parts[index++]];
        else
          return;
      }
      return data;
    });
  },
  join: function(segments) {
    return segments.reduce(function(path, part) {
      return path + (isQuoted(part) || DIGIT_REGEX.test(part) ? "[" + part + "]" : (path ? "." : "") + part);
    }, "");
  },
  forEach: function(path, cb2, thisArg) {
    forEach(Array.isArray(path) ? path : split(path), cb2, thisArg);
  }
};
function normalizePath(path) {
  return pathCache.get(path) || pathCache.set(path, split(path).map(function(part) {
    return part.replace(CLEAN_QUOTES_REGEX, "$2");
  }));
}
function split(path) {
  return path.match(SPLIT_REGEX);
}
function forEach(parts, iter, thisArg) {
  var len = parts.length, part, idx, isArray2, isBracket;
  for (idx = 0; idx < len; idx++) {
    part = parts[idx];
    if (part) {
      if (shouldBeQuoted(part)) {
        part = '"' + part + '"';
      }
      isBracket = isQuoted(part);
      isArray2 = !isBracket && /^\d+$/.test(part);
      iter.call(thisArg, part, isBracket, isArray2, idx, parts);
    }
  }
}
function isQuoted(str) {
  return typeof str === "string" && str && ["'", '"'].indexOf(str.charAt(0)) !== -1;
}
function hasLeadingNumber(part) {
  return part.match(LEAD_DIGIT_REGEX) && !part.match(DIGIT_REGEX);
}
function hasSpecialChars(part) {
  return SPEC_CHAR_REGEX.test(part);
}
function shouldBeQuoted(part) {
  return !isQuoted(part) && (hasLeadingNumber(part) || hasSpecialChars(part));
}
var prefixes = {
  context: "$",
  value: "."
};
var Reference = class {
  constructor(key, options = {}) {
    this.key = void 0;
    this.isContext = void 0;
    this.isValue = void 0;
    this.isSibling = void 0;
    this.path = void 0;
    this.getter = void 0;
    this.map = void 0;
    if (typeof key !== "string")
      throw new TypeError("ref must be a string, got: " + key);
    this.key = key.trim();
    if (key === "")
      throw new TypeError("ref must be a non-empty string");
    this.isContext = this.key[0] === prefixes.context;
    this.isValue = this.key[0] === prefixes.value;
    this.isSibling = !this.isContext && !this.isValue;
    let prefix = this.isContext ? prefixes.context : this.isValue ? prefixes.value : "";
    this.path = this.key.slice(prefix.length);
    this.getter = this.path && propertyExpr.getter(this.path, true);
    this.map = options.map;
  }
  getValue(value, parent, context) {
    let result = this.isContext ? context : this.isValue ? value : parent;
    if (this.getter)
      result = this.getter(result || {});
    if (this.map)
      result = this.map(result);
    return result;
  }
  cast(value, options) {
    return this.getValue(value, options == null ? void 0 : options.parent, options == null ? void 0 : options.context);
  }
  resolve() {
    return this;
  }
  describe() {
    return {
      type: "ref",
      key: this.key
    };
  }
  toString() {
    return `Ref(${this.key})`;
  }
  static isRef(value) {
    return value && value.__isYupRef;
  }
};
Reference.prototype.__isYupRef = true;
function _extends$1() {
  _extends$1 = Object.assign || function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$1.apply(this, arguments);
}
function _objectWithoutPropertiesLoose2(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i2;
  for (i2 = 0; i2 < sourceKeys.length; i2++) {
    key = sourceKeys[i2];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
function createValidation(config2) {
  function validate(_ref, cb2) {
    let {
      value,
      path = "",
      label,
      options,
      originalValue,
      sync
    } = _ref, rest = _objectWithoutPropertiesLoose2(_ref, ["value", "path", "label", "options", "originalValue", "sync"]);
    const {
      name,
      test,
      params,
      message
    } = config2;
    let {
      parent,
      context
    } = options;
    function resolve(item) {
      return Reference.isRef(item) ? item.getValue(value, parent, context) : item;
    }
    function createError(overrides = {}) {
      const nextParams = mapValues_1(_extends$1({
        value,
        originalValue,
        label,
        path: overrides.path || path
      }, params, overrides.params), resolve);
      const error = new ValidationError(ValidationError.formatError(overrides.message || message, nextParams), value, nextParams.path, overrides.type || name);
      error.params = nextParams;
      return error;
    }
    let ctx = _extends$1({
      path,
      parent,
      type: name,
      createError,
      resolve,
      options,
      originalValue
    }, rest);
    if (!sync) {
      try {
        Promise.resolve(test.call(ctx, value, ctx)).then((validOrError) => {
          if (ValidationError.isError(validOrError))
            cb2(validOrError);
          else if (!validOrError)
            cb2(createError());
          else
            cb2(null, validOrError);
        }).catch(cb2);
      } catch (err) {
        cb2(err);
      }
      return;
    }
    let result;
    try {
      var _ref2;
      result = test.call(ctx, value, ctx);
      if (typeof ((_ref2 = result) == null ? void 0 : _ref2.then) === "function") {
        throw new Error(`Validation test of type: "${ctx.type}" returned a Promise during a synchronous validate. This test will finish after the validate call has returned`);
      }
    } catch (err) {
      cb2(err);
      return;
    }
    if (ValidationError.isError(result))
      cb2(result);
    else if (!result)
      cb2(createError());
    else
      cb2(null, result);
  }
  validate.OPTIONS = config2;
  return validate;
}
var trim = (part) => part.substr(0, part.length - 1).substr(1);
function getIn(schema, path, value, context = value) {
  let parent, lastPart, lastPartDebug;
  if (!path)
    return {
      parent,
      parentPath: path,
      schema
    };
  propertyExpr.forEach(path, (_part, isBracket, isArray2) => {
    let part = isBracket ? trim(_part) : _part;
    schema = schema.resolve({
      context,
      parent,
      value
    });
    if (schema.innerType) {
      let idx = isArray2 ? parseInt(part, 10) : 0;
      if (value && idx >= value.length) {
        throw new Error(`Yup.reach cannot resolve an array item at index: ${_part}, in the path: ${path}. because there is no value at that index. `);
      }
      parent = value;
      value = value && value[idx];
      schema = schema.innerType;
    }
    if (!isArray2) {
      if (!schema.fields || !schema.fields[part])
        throw new Error(`The schema does not contain the path: ${path}. (failed at: ${lastPartDebug} which is a type: "${schema._type}")`);
      parent = value;
      value = value && value[part];
      schema = schema.fields[part];
    }
    lastPart = part;
    lastPartDebug = isBracket ? "[" + _part + "]" : "." + _part;
  });
  return {
    schema,
    parent,
    parentPath: lastPart
  };
}
var ReferenceSet = class {
  constructor() {
    this.list = void 0;
    this.refs = void 0;
    this.list = new Set();
    this.refs = new Map();
  }
  get size() {
    return this.list.size + this.refs.size;
  }
  describe() {
    const description = [];
    for (const item of this.list)
      description.push(item);
    for (const [, ref] of this.refs)
      description.push(ref.describe());
    return description;
  }
  toArray() {
    return Array.from(this.list).concat(Array.from(this.refs.values()));
  }
  resolveAll(resolve) {
    return this.toArray().reduce((acc, e5) => acc.concat(Reference.isRef(e5) ? resolve(e5) : e5), []);
  }
  add(value) {
    Reference.isRef(value) ? this.refs.set(value.key, value) : this.list.add(value);
  }
  delete(value) {
    Reference.isRef(value) ? this.refs.delete(value.key) : this.list.delete(value);
  }
  clone() {
    const next = new ReferenceSet();
    next.list = new Set(this.list);
    next.refs = new Map(this.refs);
    return next;
  }
  merge(newItems, removeItems) {
    const next = this.clone();
    newItems.list.forEach((value) => next.add(value));
    newItems.refs.forEach((value) => next.add(value));
    removeItems.list.forEach((value) => next.delete(value));
    removeItems.refs.forEach((value) => next.delete(value));
    return next;
  }
};
function _extends$2() {
  _extends$2 = Object.assign || function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$2.apply(this, arguments);
}
var BaseSchema = class {
  constructor(options) {
    this.deps = [];
    this.tests = void 0;
    this.transforms = void 0;
    this.conditions = [];
    this._mutate = void 0;
    this._typeError = void 0;
    this._whitelist = new ReferenceSet();
    this._blacklist = new ReferenceSet();
    this.exclusiveTests = Object.create(null);
    this.spec = void 0;
    this.tests = [];
    this.transforms = [];
    this.withMutation(() => {
      this.typeError(mixed.notType);
    });
    this.type = (options == null ? void 0 : options.type) || "mixed";
    this.spec = _extends$2({
      strip: false,
      strict: false,
      abortEarly: true,
      recursive: true,
      nullable: false,
      presence: "optional"
    }, options == null ? void 0 : options.spec);
  }
  get _type() {
    return this.type;
  }
  _typeCheck(_value) {
    return true;
  }
  clone(spec) {
    if (this._mutate) {
      if (spec)
        Object.assign(this.spec, spec);
      return this;
    }
    const next = Object.create(Object.getPrototypeOf(this));
    next.type = this.type;
    next._typeError = this._typeError;
    next._whitelistError = this._whitelistError;
    next._blacklistError = this._blacklistError;
    next._whitelist = this._whitelist.clone();
    next._blacklist = this._blacklist.clone();
    next.exclusiveTests = _extends$2({}, this.exclusiveTests);
    next.deps = [...this.deps];
    next.conditions = [...this.conditions];
    next.tests = [...this.tests];
    next.transforms = [...this.transforms];
    next.spec = clone(_extends$2({}, this.spec, spec));
    return next;
  }
  label(label) {
    let next = this.clone();
    next.spec.label = label;
    return next;
  }
  meta(...args) {
    if (args.length === 0)
      return this.spec.meta;
    let next = this.clone();
    next.spec.meta = Object.assign(next.spec.meta || {}, args[0]);
    return next;
  }
  withMutation(fn2) {
    let before = this._mutate;
    this._mutate = true;
    let result = fn2(this);
    this._mutate = before;
    return result;
  }
  concat(schema) {
    if (!schema || schema === this)
      return this;
    if (schema.type !== this.type && this.type !== "mixed")
      throw new TypeError(`You cannot \`concat()\` schema's of different types: ${this.type} and ${schema.type}`);
    let base = this;
    let combined = schema.clone();
    const mergedSpec = _extends$2({}, base.spec, combined.spec);
    combined.spec = mergedSpec;
    combined._typeError || (combined._typeError = base._typeError);
    combined._whitelistError || (combined._whitelistError = base._whitelistError);
    combined._blacklistError || (combined._blacklistError = base._blacklistError);
    combined._whitelist = base._whitelist.merge(schema._whitelist, schema._blacklist);
    combined._blacklist = base._blacklist.merge(schema._blacklist, schema._whitelist);
    combined.tests = base.tests;
    combined.exclusiveTests = base.exclusiveTests;
    combined.withMutation((next) => {
      schema.tests.forEach((fn2) => {
        next.test(fn2.OPTIONS);
      });
    });
    combined.transforms = [...base.transforms, ...combined.transforms];
    return combined;
  }
  isType(v4) {
    if (this.spec.nullable && v4 === null)
      return true;
    return this._typeCheck(v4);
  }
  resolve(options) {
    let schema = this;
    if (schema.conditions.length) {
      let conditions = schema.conditions;
      schema = schema.clone();
      schema.conditions = [];
      schema = conditions.reduce((schema2, condition) => condition.resolve(schema2, options), schema);
      schema = schema.resolve(options);
    }
    return schema;
  }
  cast(value, options = {}) {
    let resolvedSchema = this.resolve(_extends$2({
      value
    }, options));
    let result = resolvedSchema._cast(value, options);
    if (value !== void 0 && options.assert !== false && resolvedSchema.isType(result) !== true) {
      let formattedValue = printValue(value);
      let formattedResult = printValue(result);
      throw new TypeError(`The value of ${options.path || "field"} could not be cast to a value that satisfies the schema type: "${resolvedSchema._type}". 

attempted value: ${formattedValue} 
` + (formattedResult !== formattedValue ? `result of cast: ${formattedResult}` : ""));
    }
    return result;
  }
  _cast(rawValue, _options) {
    let value = rawValue === void 0 ? rawValue : this.transforms.reduce((value2, fn2) => fn2.call(this, value2, rawValue, this), rawValue);
    if (value === void 0) {
      value = this.getDefault();
    }
    return value;
  }
  _validate(_value, options = {}, cb2) {
    let {
      sync,
      path,
      from = [],
      originalValue = _value,
      strict = this.spec.strict,
      abortEarly = this.spec.abortEarly
    } = options;
    let value = _value;
    if (!strict) {
      value = this._cast(value, _extends$2({
        assert: false
      }, options));
    }
    let args = {
      value,
      path,
      options,
      originalValue,
      schema: this,
      label: this.spec.label,
      sync,
      from
    };
    let initialTests = [];
    if (this._typeError)
      initialTests.push(this._typeError);
    let finalTests = [];
    if (this._whitelistError)
      finalTests.push(this._whitelistError);
    if (this._blacklistError)
      finalTests.push(this._blacklistError);
    runTests({
      args,
      value,
      path,
      sync,
      tests: initialTests,
      endEarly: abortEarly
    }, (err) => {
      if (err)
        return void cb2(err, value);
      runTests({
        tests: this.tests.concat(finalTests),
        args,
        path,
        sync,
        value,
        endEarly: abortEarly
      }, cb2);
    });
  }
  validate(value, options, maybeCb) {
    let schema = this.resolve(_extends$2({}, options, {
      value
    }));
    return typeof maybeCb === "function" ? schema._validate(value, options, maybeCb) : new Promise((resolve, reject) => schema._validate(value, options, (err, value2) => {
      if (err)
        reject(err);
      else
        resolve(value2);
    }));
  }
  validateSync(value, options) {
    let schema = this.resolve(_extends$2({}, options, {
      value
    }));
    let result;
    schema._validate(value, _extends$2({}, options, {
      sync: true
    }), (err, value2) => {
      if (err)
        throw err;
      result = value2;
    });
    return result;
  }
  isValid(value, options) {
    return this.validate(value, options).then(() => true, (err) => {
      if (ValidationError.isError(err))
        return false;
      throw err;
    });
  }
  isValidSync(value, options) {
    try {
      this.validateSync(value, options);
      return true;
    } catch (err) {
      if (ValidationError.isError(err))
        return false;
      throw err;
    }
  }
  _getDefault() {
    let defaultValue = this.spec.default;
    if (defaultValue == null) {
      return defaultValue;
    }
    return typeof defaultValue === "function" ? defaultValue.call(this) : clone(defaultValue);
  }
  getDefault(options) {
    let schema = this.resolve(options || {});
    return schema._getDefault();
  }
  default(def) {
    if (arguments.length === 0) {
      return this._getDefault();
    }
    let next = this.clone({
      default: def
    });
    return next;
  }
  strict(isStrict = true) {
    let next = this.clone();
    next.spec.strict = isStrict;
    return next;
  }
  _isPresent(value) {
    return value != null;
  }
  defined(message = mixed.defined) {
    return this.test({
      message,
      name: "defined",
      exclusive: true,
      test(value) {
        return value !== void 0;
      }
    });
  }
  required(message = mixed.required) {
    return this.clone({
      presence: "required"
    }).withMutation((s) => s.test({
      message,
      name: "required",
      exclusive: true,
      test(value) {
        return this.schema._isPresent(value);
      }
    }));
  }
  notRequired() {
    let next = this.clone({
      presence: "optional"
    });
    next.tests = next.tests.filter((test) => test.OPTIONS.name !== "required");
    return next;
  }
  nullable(isNullable = true) {
    let next = this.clone({
      nullable: isNullable !== false
    });
    return next;
  }
  transform(fn2) {
    let next = this.clone();
    next.transforms.push(fn2);
    return next;
  }
  test(...args) {
    let opts;
    if (args.length === 1) {
      if (typeof args[0] === "function") {
        opts = {
          test: args[0]
        };
      } else {
        opts = args[0];
      }
    } else if (args.length === 2) {
      opts = {
        name: args[0],
        test: args[1]
      };
    } else {
      opts = {
        name: args[0],
        message: args[1],
        test: args[2]
      };
    }
    if (opts.message === void 0)
      opts.message = mixed.default;
    if (typeof opts.test !== "function")
      throw new TypeError("`test` is a required parameters");
    let next = this.clone();
    let validate = createValidation(opts);
    let isExclusive = opts.exclusive || opts.name && next.exclusiveTests[opts.name] === true;
    if (opts.exclusive) {
      if (!opts.name)
        throw new TypeError("Exclusive tests must provide a unique `name` identifying the test");
    }
    if (opts.name)
      next.exclusiveTests[opts.name] = !!opts.exclusive;
    next.tests = next.tests.filter((fn2) => {
      if (fn2.OPTIONS.name === opts.name) {
        if (isExclusive)
          return false;
        if (fn2.OPTIONS.test === validate.OPTIONS.test)
          return false;
      }
      return true;
    });
    next.tests.push(validate);
    return next;
  }
  when(keys2, options) {
    if (!Array.isArray(keys2) && typeof keys2 !== "string") {
      options = keys2;
      keys2 = ".";
    }
    let next = this.clone();
    let deps = toArray(keys2).map((key) => new Reference(key));
    deps.forEach((dep) => {
      if (dep.isSibling)
        next.deps.push(dep.key);
    });
    next.conditions.push(new Condition(deps, options));
    return next;
  }
  typeError(message) {
    let next = this.clone();
    next._typeError = createValidation({
      message,
      name: "typeError",
      test(value) {
        if (value !== void 0 && !this.schema.isType(value))
          return this.createError({
            params: {
              type: this.schema._type
            }
          });
        return true;
      }
    });
    return next;
  }
  oneOf(enums, message = mixed.oneOf) {
    let next = this.clone();
    enums.forEach((val) => {
      next._whitelist.add(val);
      next._blacklist.delete(val);
    });
    next._whitelistError = createValidation({
      message,
      name: "oneOf",
      test(value) {
        if (value === void 0)
          return true;
        let valids = this.schema._whitelist;
        let resolved = valids.resolveAll(this.resolve);
        return resolved.includes(value) ? true : this.createError({
          params: {
            values: valids.toArray().join(", "),
            resolved
          }
        });
      }
    });
    return next;
  }
  notOneOf(enums, message = mixed.notOneOf) {
    let next = this.clone();
    enums.forEach((val) => {
      next._blacklist.add(val);
      next._whitelist.delete(val);
    });
    next._blacklistError = createValidation({
      message,
      name: "notOneOf",
      test(value) {
        let invalids = this.schema._blacklist;
        let resolved = invalids.resolveAll(this.resolve);
        if (resolved.includes(value))
          return this.createError({
            params: {
              values: invalids.toArray().join(", "),
              resolved
            }
          });
        return true;
      }
    });
    return next;
  }
  strip(strip = true) {
    let next = this.clone();
    next.spec.strip = strip;
    return next;
  }
  describe() {
    const next = this.clone();
    const {
      label,
      meta
    } = next.spec;
    const description = {
      meta,
      label,
      type: next.type,
      oneOf: next._whitelist.describe(),
      notOneOf: next._blacklist.describe(),
      tests: next.tests.map((fn2) => ({
        name: fn2.OPTIONS.name,
        params: fn2.OPTIONS.params
      })).filter((n5, idx, list) => list.findIndex((c6) => c6.name === n5.name) === idx)
    };
    return description;
  }
};
BaseSchema.prototype.__isYupSchema__ = true;
for (const method of ["validate", "validateSync"])
  BaseSchema.prototype[`${method}At`] = function(path, value, options = {}) {
    const {
      parent,
      parentPath,
      schema
    } = getIn(this, path, value, options.context);
    return schema[method](parent && parent[parentPath], _extends$2({}, options, {
      parent,
      path
    }));
  };
for (const alias of ["equals", "is"])
  BaseSchema.prototype[alias] = BaseSchema.prototype.oneOf;
for (const alias of ["not", "nope"])
  BaseSchema.prototype[alias] = BaseSchema.prototype.notOneOf;
BaseSchema.prototype.optional = BaseSchema.prototype.notRequired;
var Mixed = BaseSchema;
function create$1() {
  return new Mixed();
}
create$1.prototype = Mixed.prototype;
var isAbsent = (value) => value == null;
function create$2() {
  return new BooleanSchema();
}
var BooleanSchema = class extends BaseSchema {
  constructor() {
    super({
      type: "boolean"
    });
    this.withMutation(() => {
      this.transform(function(value) {
        if (!this.isType(value)) {
          if (/^(true|1)$/i.test(String(value)))
            return true;
          if (/^(false|0)$/i.test(String(value)))
            return false;
        }
        return value;
      });
    });
  }
  _typeCheck(v4) {
    if (v4 instanceof Boolean)
      v4 = v4.valueOf();
    return typeof v4 === "boolean";
  }
  isTrue(message = boolean.isValue) {
    return this.test({
      message,
      name: "is-value",
      exclusive: true,
      params: {
        value: "true"
      },
      test(value) {
        return isAbsent(value) || value === true;
      }
    });
  }
  isFalse(message = boolean.isValue) {
    return this.test({
      message,
      name: "is-value",
      exclusive: true,
      params: {
        value: "false"
      },
      test(value) {
        return isAbsent(value) || value === false;
      }
    });
  }
};
create$2.prototype = BooleanSchema.prototype;
var rEmail = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
var rUrl = /^((https?|ftp):)?\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
var rUUID = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
var isTrimmed = (value) => isAbsent(value) || value === value.trim();
var objStringTag = {}.toString();
function create$3() {
  return new StringSchema();
}
var StringSchema = class extends BaseSchema {
  constructor() {
    super({
      type: "string"
    });
    this.withMutation(() => {
      this.transform(function(value) {
        if (this.isType(value))
          return value;
        if (Array.isArray(value))
          return value;
        const strValue = value != null && value.toString ? value.toString() : value;
        if (strValue === objStringTag)
          return value;
        return strValue;
      });
    });
  }
  _typeCheck(value) {
    if (value instanceof String)
      value = value.valueOf();
    return typeof value === "string";
  }
  _isPresent(value) {
    return super._isPresent(value) && !!value.length;
  }
  length(length, message = string.length) {
    return this.test({
      message,
      name: "length",
      exclusive: true,
      params: {
        length
      },
      test(value) {
        return isAbsent(value) || value.length === this.resolve(length);
      }
    });
  }
  min(min2, message = string.min) {
    return this.test({
      message,
      name: "min",
      exclusive: true,
      params: {
        min: min2
      },
      test(value) {
        return isAbsent(value) || value.length >= this.resolve(min2);
      }
    });
  }
  max(max2, message = string.max) {
    return this.test({
      name: "max",
      exclusive: true,
      message,
      params: {
        max: max2
      },
      test(value) {
        return isAbsent(value) || value.length <= this.resolve(max2);
      }
    });
  }
  matches(regex, options) {
    let excludeEmptyString = false;
    let message;
    let name;
    if (options) {
      if (typeof options === "object") {
        ({
          excludeEmptyString = false,
          message,
          name
        } = options);
      } else {
        message = options;
      }
    }
    return this.test({
      name: name || "matches",
      message: message || string.matches,
      params: {
        regex
      },
      test: (value) => isAbsent(value) || value === "" && excludeEmptyString || value.search(regex) !== -1
    });
  }
  email(message = string.email) {
    return this.matches(rEmail, {
      name: "email",
      message,
      excludeEmptyString: true
    });
  }
  url(message = string.url) {
    return this.matches(rUrl, {
      name: "url",
      message,
      excludeEmptyString: true
    });
  }
  uuid(message = string.uuid) {
    return this.matches(rUUID, {
      name: "uuid",
      message,
      excludeEmptyString: false
    });
  }
  ensure() {
    return this.default("").transform((val) => val === null ? "" : val);
  }
  trim(message = string.trim) {
    return this.transform((val) => val != null ? val.trim() : val).test({
      message,
      name: "trim",
      test: isTrimmed
    });
  }
  lowercase(message = string.lowercase) {
    return this.transform((value) => !isAbsent(value) ? value.toLowerCase() : value).test({
      message,
      name: "string_case",
      exclusive: true,
      test: (value) => isAbsent(value) || value === value.toLowerCase()
    });
  }
  uppercase(message = string.uppercase) {
    return this.transform((value) => !isAbsent(value) ? value.toUpperCase() : value).test({
      message,
      name: "string_case",
      exclusive: true,
      test: (value) => isAbsent(value) || value === value.toUpperCase()
    });
  }
};
create$3.prototype = StringSchema.prototype;
var isNaN$1 = (value) => value != +value;
function create$4() {
  return new NumberSchema();
}
var NumberSchema = class extends BaseSchema {
  constructor() {
    super({
      type: "number"
    });
    this.withMutation(() => {
      this.transform(function(value) {
        let parsed = value;
        if (typeof parsed === "string") {
          parsed = parsed.replace(/\s/g, "");
          if (parsed === "")
            return NaN;
          parsed = +parsed;
        }
        if (this.isType(parsed))
          return parsed;
        return parseFloat(parsed);
      });
    });
  }
  _typeCheck(value) {
    if (value instanceof Number)
      value = value.valueOf();
    return typeof value === "number" && !isNaN$1(value);
  }
  min(min2, message = number.min) {
    return this.test({
      message,
      name: "min",
      exclusive: true,
      params: {
        min: min2
      },
      test(value) {
        return isAbsent(value) || value >= this.resolve(min2);
      }
    });
  }
  max(max2, message = number.max) {
    return this.test({
      message,
      name: "max",
      exclusive: true,
      params: {
        max: max2
      },
      test(value) {
        return isAbsent(value) || value <= this.resolve(max2);
      }
    });
  }
  lessThan(less, message = number.lessThan) {
    return this.test({
      message,
      name: "max",
      exclusive: true,
      params: {
        less
      },
      test(value) {
        return isAbsent(value) || value < this.resolve(less);
      }
    });
  }
  moreThan(more, message = number.moreThan) {
    return this.test({
      message,
      name: "min",
      exclusive: true,
      params: {
        more
      },
      test(value) {
        return isAbsent(value) || value > this.resolve(more);
      }
    });
  }
  positive(msg = number.positive) {
    return this.moreThan(0, msg);
  }
  negative(msg = number.negative) {
    return this.lessThan(0, msg);
  }
  integer(message = number.integer) {
    return this.test({
      name: "integer",
      message,
      test: (val) => isAbsent(val) || Number.isInteger(val)
    });
  }
  truncate() {
    return this.transform((value) => !isAbsent(value) ? value | 0 : value);
  }
  round(method) {
    var _method;
    let avail = ["ceil", "floor", "round", "trunc"];
    method = ((_method = method) == null ? void 0 : _method.toLowerCase()) || "round";
    if (method === "trunc")
      return this.truncate();
    if (avail.indexOf(method.toLowerCase()) === -1)
      throw new TypeError("Only valid options for round() are: " + avail.join(", "));
    return this.transform((value) => !isAbsent(value) ? Math[method](value) : value);
  }
};
create$4.prototype = NumberSchema.prototype;
var isoReg = /^(\d{4}|[+\-]\d{6})(?:-?(\d{2})(?:-?(\d{2}))?)?(?:[ T]?(\d{2}):?(\d{2})(?::?(\d{2})(?:[,\.](\d{1,}))?)?(?:(Z)|([+\-])(\d{2})(?::?(\d{2}))?)?)?$/;
function parseIsoDate(date2) {
  var numericKeys = [1, 4, 5, 6, 7, 10, 11], minutesOffset = 0, timestamp, struct;
  if (struct = isoReg.exec(date2)) {
    for (var i2 = 0, k5; k5 = numericKeys[i2]; ++i2)
      struct[k5] = +struct[k5] || 0;
    struct[2] = (+struct[2] || 1) - 1;
    struct[3] = +struct[3] || 1;
    struct[7] = struct[7] ? String(struct[7]).substr(0, 3) : 0;
    if ((struct[8] === void 0 || struct[8] === "") && (struct[9] === void 0 || struct[9] === ""))
      timestamp = +new Date(struct[1], struct[2], struct[3], struct[4], struct[5], struct[6], struct[7]);
    else {
      if (struct[8] !== "Z" && struct[9] !== void 0) {
        minutesOffset = struct[10] * 60 + struct[11];
        if (struct[9] === "+")
          minutesOffset = 0 - minutesOffset;
      }
      timestamp = Date.UTC(struct[1], struct[2], struct[3], struct[4], struct[5] + minutesOffset, struct[6], struct[7]);
    }
  } else
    timestamp = Date.parse ? Date.parse(date2) : NaN;
  return timestamp;
}
var invalidDate = new Date("");
var isDate = (obj) => Object.prototype.toString.call(obj) === "[object Date]";
function create$5() {
  return new DateSchema();
}
var DateSchema = class extends BaseSchema {
  constructor() {
    super({
      type: "date"
    });
    this.withMutation(() => {
      this.transform(function(value) {
        if (this.isType(value))
          return value;
        value = parseIsoDate(value);
        return !isNaN(value) ? new Date(value) : invalidDate;
      });
    });
  }
  _typeCheck(v4) {
    return isDate(v4) && !isNaN(v4.getTime());
  }
  prepareParam(ref, name) {
    let param;
    if (!Reference.isRef(ref)) {
      let cast = this.cast(ref);
      if (!this._typeCheck(cast))
        throw new TypeError(`\`${name}\` must be a Date or a value that can be \`cast()\` to a Date`);
      param = cast;
    } else {
      param = ref;
    }
    return param;
  }
  min(min2, message = date.min) {
    let limit = this.prepareParam(min2, "min");
    return this.test({
      message,
      name: "min",
      exclusive: true,
      params: {
        min: min2
      },
      test(value) {
        return isAbsent(value) || value >= this.resolve(limit);
      }
    });
  }
  max(max2, message = date.max) {
    let limit = this.prepareParam(max2, "max");
    return this.test({
      message,
      name: "max",
      exclusive: true,
      params: {
        max: max2
      },
      test(value) {
        return isAbsent(value) || value <= this.resolve(limit);
      }
    });
  }
};
DateSchema.INVALID_DATE = invalidDate;
create$5.prototype = DateSchema.prototype;
create$5.INVALID_DATE = invalidDate;
function arrayReduce(array2, iteratee, accumulator, initAccum) {
  var index = -1, length = array2 == null ? 0 : array2.length;
  if (initAccum && length) {
    accumulator = array2[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array2[index], index, array2);
  }
  return accumulator;
}
var _arrayReduce = arrayReduce;
function basePropertyOf(object2) {
  return function(key) {
    return object2 == null ? void 0 : object2[key];
  };
}
var _basePropertyOf = basePropertyOf;
var deburredLetters = {
  À: "A",
  Á: "A",
  Â: "A",
  Ã: "A",
  Ä: "A",
  Å: "A",
  à: "a",
  á: "a",
  â: "a",
  ã: "a",
  ä: "a",
  å: "a",
  Ç: "C",
  ç: "c",
  Ð: "D",
  ð: "d",
  È: "E",
  É: "E",
  Ê: "E",
  Ë: "E",
  è: "e",
  é: "e",
  ê: "e",
  ë: "e",
  Ì: "I",
  Í: "I",
  Î: "I",
  Ï: "I",
  ì: "i",
  í: "i",
  î: "i",
  ï: "i",
  Ñ: "N",
  ñ: "n",
  Ò: "O",
  Ó: "O",
  Ô: "O",
  Õ: "O",
  Ö: "O",
  Ø: "O",
  ò: "o",
  ó: "o",
  ô: "o",
  õ: "o",
  ö: "o",
  ø: "o",
  Ù: "U",
  Ú: "U",
  Û: "U",
  Ü: "U",
  ù: "u",
  ú: "u",
  û: "u",
  ü: "u",
  Ý: "Y",
  ý: "y",
  ÿ: "y",
  Æ: "Ae",
  æ: "ae",
  Þ: "Th",
  þ: "th",
  ß: "ss",
  Ā: "A",
  Ă: "A",
  Ą: "A",
  ā: "a",
  ă: "a",
  ą: "a",
  Ć: "C",
  Ĉ: "C",
  Ċ: "C",
  Č: "C",
  ć: "c",
  ĉ: "c",
  ċ: "c",
  č: "c",
  Ď: "D",
  Đ: "D",
  ď: "d",
  đ: "d",
  Ē: "E",
  Ĕ: "E",
  Ė: "E",
  Ę: "E",
  Ě: "E",
  ē: "e",
  ĕ: "e",
  ė: "e",
  ę: "e",
  ě: "e",
  Ĝ: "G",
  Ğ: "G",
  Ġ: "G",
  Ģ: "G",
  ĝ: "g",
  ğ: "g",
  ġ: "g",
  ģ: "g",
  Ĥ: "H",
  Ħ: "H",
  ĥ: "h",
  ħ: "h",
  Ĩ: "I",
  Ī: "I",
  Ĭ: "I",
  Į: "I",
  İ: "I",
  ĩ: "i",
  ī: "i",
  ĭ: "i",
  į: "i",
  ı: "i",
  Ĵ: "J",
  ĵ: "j",
  Ķ: "K",
  ķ: "k",
  ĸ: "k",
  Ĺ: "L",
  Ļ: "L",
  Ľ: "L",
  Ŀ: "L",
  Ł: "L",
  ĺ: "l",
  ļ: "l",
  ľ: "l",
  ŀ: "l",
  ł: "l",
  Ń: "N",
  Ņ: "N",
  Ň: "N",
  Ŋ: "N",
  ń: "n",
  ņ: "n",
  ň: "n",
  ŋ: "n",
  Ō: "O",
  Ŏ: "O",
  Ő: "O",
  ō: "o",
  ŏ: "o",
  ő: "o",
  Ŕ: "R",
  Ŗ: "R",
  Ř: "R",
  ŕ: "r",
  ŗ: "r",
  ř: "r",
  Ś: "S",
  Ŝ: "S",
  Ş: "S",
  Š: "S",
  ś: "s",
  ŝ: "s",
  ş: "s",
  š: "s",
  Ţ: "T",
  Ť: "T",
  Ŧ: "T",
  ţ: "t",
  ť: "t",
  ŧ: "t",
  Ũ: "U",
  Ū: "U",
  Ŭ: "U",
  Ů: "U",
  Ű: "U",
  Ų: "U",
  ũ: "u",
  ū: "u",
  ŭ: "u",
  ů: "u",
  ű: "u",
  ų: "u",
  Ŵ: "W",
  ŵ: "w",
  Ŷ: "Y",
  ŷ: "y",
  Ÿ: "Y",
  Ź: "Z",
  Ż: "Z",
  Ž: "Z",
  ź: "z",
  ż: "z",
  ž: "z",
  Ĳ: "IJ",
  ĳ: "ij",
  Œ: "Oe",
  œ: "oe",
  ŉ: "'n",
  ſ: "s"
};
var deburrLetter = _basePropertyOf(deburredLetters);
var _deburrLetter = deburrLetter;
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
var rsComboMarksRange = "\\u0300-\\u036f";
var reComboHalfMarksRange = "\\ufe20-\\ufe2f";
var rsComboSymbolsRange = "\\u20d0-\\u20ff";
var rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange;
var rsCombo = "[" + rsComboRange + "]";
var reComboMark = RegExp(rsCombo, "g");
function deburr(string2) {
  string2 = toString_1(string2);
  return string2 && string2.replace(reLatin, _deburrLetter).replace(reComboMark, "");
}
var deburr_1 = deburr;
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
function asciiWords(string2) {
  return string2.match(reAsciiWord) || [];
}
var _asciiWords = asciiWords;
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
function hasUnicodeWord(string2) {
  return reHasUnicodeWord.test(string2);
}
var _hasUnicodeWord = hasUnicodeWord;
var rsAstralRange = "\\ud800-\\udfff";
var rsComboMarksRange$1 = "\\u0300-\\u036f";
var reComboHalfMarksRange$1 = "\\ufe20-\\ufe2f";
var rsComboSymbolsRange$1 = "\\u20d0-\\u20ff";
var rsComboRange$1 = rsComboMarksRange$1 + reComboHalfMarksRange$1 + rsComboSymbolsRange$1;
var rsDingbatRange = "\\u2700-\\u27bf";
var rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff";
var rsMathOpRange = "\\xac\\xb1\\xd7\\xf7";
var rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf";
var rsPunctuationRange = "\\u2000-\\u206f";
var rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000";
var rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde";
var rsVarRange = "\\ufe0e\\ufe0f";
var rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
var rsApos = "['’]";
var rsBreak = "[" + rsBreakRange + "]";
var rsCombo$1 = "[" + rsComboRange$1 + "]";
var rsDigits = "\\d+";
var rsDingbat = "[" + rsDingbatRange + "]";
var rsLower = "[" + rsLowerRange + "]";
var rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]";
var rsFitz = "\\ud83c[\\udffb-\\udfff]";
var rsModifier = "(?:" + rsCombo$1 + "|" + rsFitz + ")";
var rsNonAstral = "[^" + rsAstralRange + "]";
var rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
var rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
var rsUpper = "[" + rsUpperRange + "]";
var rsZWJ = "\\u200d";
var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")";
var rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")";
var rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?";
var rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?";
var reOptMod = rsModifier + "?";
var rsOptVar = "[" + rsVarRange + "]?";
var rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*";
var rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])";
var rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])";
var rsSeq = rsOptVar + reOptMod + rsOptJoin;
var rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq;
var reUnicodeWord = RegExp([
  rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
  rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
  rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
  rsUpper + "+" + rsOptContrUpper,
  rsOrdUpper,
  rsOrdLower,
  rsDigits,
  rsEmoji
].join("|"), "g");
function unicodeWords(string2) {
  return string2.match(reUnicodeWord) || [];
}
var _unicodeWords = unicodeWords;
function words(string2, pattern, guard) {
  string2 = toString_1(string2);
  pattern = guard ? void 0 : pattern;
  if (pattern === void 0) {
    return _hasUnicodeWord(string2) ? _unicodeWords(string2) : _asciiWords(string2);
  }
  return string2.match(pattern) || [];
}
var words_1 = words;
var rsApos$1 = "['’]";
var reApos = RegExp(rsApos$1, "g");
function createCompounder(callback) {
  return function(string2) {
    return _arrayReduce(words_1(deburr_1(string2).replace(reApos, "")), callback, "");
  };
}
var _createCompounder = createCompounder;
var snakeCase = _createCompounder(function(result, word, index) {
  return result + (index ? "_" : "") + word.toLowerCase();
});
var snakeCase_1 = snakeCase;
function baseSlice(array2, start2, end2) {
  var index = -1, length = array2.length;
  if (start2 < 0) {
    start2 = -start2 > length ? 0 : length + start2;
  }
  end2 = end2 > length ? length : end2;
  if (end2 < 0) {
    end2 += length;
  }
  length = start2 > end2 ? 0 : end2 - start2 >>> 0;
  start2 >>>= 0;
  var result = Array(length);
  while (++index < length) {
    result[index] = array2[index + start2];
  }
  return result;
}
var _baseSlice = baseSlice;
function castSlice(array2, start2, end2) {
  var length = array2.length;
  end2 = end2 === void 0 ? length : end2;
  return !start2 && end2 >= length ? array2 : _baseSlice(array2, start2, end2);
}
var _castSlice = castSlice;
var rsAstralRange$1 = "\\ud800-\\udfff";
var rsComboMarksRange$2 = "\\u0300-\\u036f";
var reComboHalfMarksRange$2 = "\\ufe20-\\ufe2f";
var rsComboSymbolsRange$2 = "\\u20d0-\\u20ff";
var rsComboRange$2 = rsComboMarksRange$2 + reComboHalfMarksRange$2 + rsComboSymbolsRange$2;
var rsVarRange$1 = "\\ufe0e\\ufe0f";
var rsZWJ$1 = "\\u200d";
var reHasUnicode = RegExp("[" + rsZWJ$1 + rsAstralRange$1 + rsComboRange$2 + rsVarRange$1 + "]");
function hasUnicode(string2) {
  return reHasUnicode.test(string2);
}
var _hasUnicode = hasUnicode;
function asciiToArray(string2) {
  return string2.split("");
}
var _asciiToArray = asciiToArray;
var rsAstralRange$2 = "\\ud800-\\udfff";
var rsComboMarksRange$3 = "\\u0300-\\u036f";
var reComboHalfMarksRange$3 = "\\ufe20-\\ufe2f";
var rsComboSymbolsRange$3 = "\\u20d0-\\u20ff";
var rsComboRange$3 = rsComboMarksRange$3 + reComboHalfMarksRange$3 + rsComboSymbolsRange$3;
var rsVarRange$2 = "\\ufe0e\\ufe0f";
var rsAstral = "[" + rsAstralRange$2 + "]";
var rsCombo$2 = "[" + rsComboRange$3 + "]";
var rsFitz$1 = "\\ud83c[\\udffb-\\udfff]";
var rsModifier$1 = "(?:" + rsCombo$2 + "|" + rsFitz$1 + ")";
var rsNonAstral$1 = "[^" + rsAstralRange$2 + "]";
var rsRegional$1 = "(?:\\ud83c[\\udde6-\\uddff]){2}";
var rsSurrPair$1 = "[\\ud800-\\udbff][\\udc00-\\udfff]";
var rsZWJ$2 = "\\u200d";
var reOptMod$1 = rsModifier$1 + "?";
var rsOptVar$1 = "[" + rsVarRange$2 + "]?";
var rsOptJoin$1 = "(?:" + rsZWJ$2 + "(?:" + [rsNonAstral$1, rsRegional$1, rsSurrPair$1].join("|") + ")" + rsOptVar$1 + reOptMod$1 + ")*";
var rsSeq$1 = rsOptVar$1 + reOptMod$1 + rsOptJoin$1;
var rsSymbol = "(?:" + [rsNonAstral$1 + rsCombo$2 + "?", rsCombo$2, rsRegional$1, rsSurrPair$1, rsAstral].join("|") + ")";
var reUnicode = RegExp(rsFitz$1 + "(?=" + rsFitz$1 + ")|" + rsSymbol + rsSeq$1, "g");
function unicodeToArray(string2) {
  return string2.match(reUnicode) || [];
}
var _unicodeToArray = unicodeToArray;
function stringToArray(string2) {
  return _hasUnicode(string2) ? _unicodeToArray(string2) : _asciiToArray(string2);
}
var _stringToArray = stringToArray;
function createCaseFirst(methodName) {
  return function(string2) {
    string2 = toString_1(string2);
    var strSymbols = _hasUnicode(string2) ? _stringToArray(string2) : void 0;
    var chr = strSymbols ? strSymbols[0] : string2.charAt(0);
    var trailing = strSymbols ? _castSlice(strSymbols, 1).join("") : string2.slice(1);
    return chr[methodName]() + trailing;
  };
}
var _createCaseFirst = createCaseFirst;
var upperFirst = _createCaseFirst("toUpperCase");
var upperFirst_1 = upperFirst;
function capitalize3(string2) {
  return upperFirst_1(toString_1(string2).toLowerCase());
}
var capitalize_1 = capitalize3;
var camelCase = _createCompounder(function(result, word, index) {
  word = word.toLowerCase();
  return result + (index ? capitalize_1(word) : word);
});
var camelCase_1 = camelCase;
function mapKeys(object2, iteratee) {
  var result = {};
  iteratee = _baseIteratee(iteratee);
  _baseForOwn(object2, function(value, key, object3) {
    _baseAssignValue(result, iteratee(value, key, object3), value);
  });
  return result;
}
var mapKeys_1 = mapKeys;
var toposort_1 = function(edges) {
  return toposort(uniqueNodes(edges), edges);
};
var array$1 = toposort;
function toposort(nodes, edges) {
  var cursor2 = nodes.length, sorted = new Array(cursor2), visited = {}, i2 = cursor2, outgoingEdges = makeOutgoingEdges(edges), nodesHash = makeNodesHash(nodes);
  edges.forEach(function(edge) {
    if (!nodesHash.has(edge[0]) || !nodesHash.has(edge[1])) {
      throw new Error("Unknown node. There is an unknown node in the supplied edges.");
    }
  });
  while (i2--) {
    if (!visited[i2])
      visit(nodes[i2], i2, new Set());
  }
  return sorted;
  function visit(node, i3, predecessors) {
    if (predecessors.has(node)) {
      var nodeRep;
      try {
        nodeRep = ", node was:" + JSON.stringify(node);
      } catch (e5) {
        nodeRep = "";
      }
      throw new Error("Cyclic dependency" + nodeRep);
    }
    if (!nodesHash.has(node)) {
      throw new Error("Found unknown node. Make sure to provided all involved nodes. Unknown node: " + JSON.stringify(node));
    }
    if (visited[i3])
      return;
    visited[i3] = true;
    var outgoing = outgoingEdges.get(node) || new Set();
    outgoing = Array.from(outgoing);
    if (i3 = outgoing.length) {
      predecessors.add(node);
      do {
        var child = outgoing[--i3];
        visit(child, nodesHash.get(child), predecessors);
      } while (i3);
      predecessors.delete(node);
    }
    sorted[--cursor2] = node;
  }
}
function uniqueNodes(arr) {
  var res = new Set();
  for (var i2 = 0, len = arr.length; i2 < len; i2++) {
    var edge = arr[i2];
    res.add(edge[0]);
    res.add(edge[1]);
  }
  return Array.from(res);
}
function makeOutgoingEdges(arr) {
  var edges = new Map();
  for (var i2 = 0, len = arr.length; i2 < len; i2++) {
    var edge = arr[i2];
    if (!edges.has(edge[0]))
      edges.set(edge[0], new Set());
    if (!edges.has(edge[1]))
      edges.set(edge[1], new Set());
    edges.get(edge[0]).add(edge[1]);
  }
  return edges;
}
function makeNodesHash(arr) {
  var res = new Map();
  for (var i2 = 0, len = arr.length; i2 < len; i2++) {
    res.set(arr[i2], i2);
  }
  return res;
}
toposort_1.array = array$1;
function sortFields(fields, excludedEdges = []) {
  let edges = [];
  let nodes = new Set();
  let excludes = new Set(excludedEdges.map(([a3, b5]) => `${a3}-${b5}`));
  function addNode(depPath, key) {
    let node = propertyExpr.split(depPath)[0];
    nodes.add(node);
    if (!excludes.has(`${key}-${node}`))
      edges.push([key, node]);
  }
  for (const key in fields)
    if (has_1(fields, key)) {
      let value = fields[key];
      nodes.add(key);
      if (Reference.isRef(value) && value.isSibling)
        addNode(value.path, key);
      else if (isSchema(value) && "deps" in value)
        value.deps.forEach((path) => addNode(path, key));
    }
  return toposort_1.array(Array.from(nodes), edges).reverse();
}
function findIndex2(arr, err) {
  let idx = Infinity;
  arr.some((key, ii2) => {
    var _err$path;
    if (((_err$path = err.path) == null ? void 0 : _err$path.indexOf(key)) !== -1) {
      idx = ii2;
      return true;
    }
  });
  return idx;
}
function sortByKeyOrder(keys2) {
  return (a3, b5) => {
    return findIndex2(keys2, a3) - findIndex2(keys2, b5);
  };
}
function _extends$3() {
  _extends$3 = Object.assign || function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$3.apply(this, arguments);
}
var isObject$1 = (obj) => Object.prototype.toString.call(obj) === "[object Object]";
function unknown(ctx, value) {
  let known = Object.keys(ctx.fields);
  return Object.keys(value).filter((key) => known.indexOf(key) === -1);
}
var defaultSort = sortByKeyOrder([]);
var ObjectSchema = class extends BaseSchema {
  constructor(spec) {
    super({
      type: "object"
    });
    this.fields = Object.create(null);
    this._sortErrors = defaultSort;
    this._nodes = [];
    this._excludedEdges = [];
    this.withMutation(() => {
      this.transform(function coerce(value) {
        if (typeof value === "string") {
          try {
            value = JSON.parse(value);
          } catch (err) {
            value = null;
          }
        }
        if (this.isType(value))
          return value;
        return null;
      });
      if (spec) {
        this.shape(spec);
      }
    });
  }
  _typeCheck(value) {
    return isObject$1(value) || typeof value === "function";
  }
  _cast(_value, options = {}) {
    var _options$stripUnknown;
    let value = super._cast(_value, options);
    if (value === void 0)
      return this.getDefault();
    if (!this._typeCheck(value))
      return value;
    let fields = this.fields;
    let strip = (_options$stripUnknown = options.stripUnknown) != null ? _options$stripUnknown : this.spec.noUnknown;
    let props = this._nodes.concat(Object.keys(value).filter((v4) => this._nodes.indexOf(v4) === -1));
    let intermediateValue = {};
    let innerOptions = _extends$3({}, options, {
      parent: intermediateValue,
      __validating: options.__validating || false
    });
    let isChanged = false;
    for (const prop of props) {
      let field = fields[prop];
      let exists = has_1(value, prop);
      if (field) {
        let fieldValue;
        let inputValue = value[prop];
        innerOptions.path = (options.path ? `${options.path}.` : "") + prop;
        field = field.resolve({
          value: inputValue,
          context: options.context,
          parent: intermediateValue
        });
        let fieldSpec = "spec" in field ? field.spec : void 0;
        let strict = fieldSpec == null ? void 0 : fieldSpec.strict;
        if (fieldSpec == null ? void 0 : fieldSpec.strip) {
          isChanged = isChanged || prop in value;
          continue;
        }
        fieldValue = !options.__validating || !strict ? field.cast(value[prop], innerOptions) : value[prop];
        if (fieldValue !== void 0) {
          intermediateValue[prop] = fieldValue;
        }
      } else if (exists && !strip) {
        intermediateValue[prop] = value[prop];
      }
      if (intermediateValue[prop] !== value[prop]) {
        isChanged = true;
      }
    }
    return isChanged ? intermediateValue : value;
  }
  _validate(_value, opts = {}, callback) {
    let errors = [];
    let {
      sync,
      from = [],
      originalValue = _value,
      abortEarly = this.spec.abortEarly,
      recursive = this.spec.recursive
    } = opts;
    from = [{
      schema: this,
      value: originalValue
    }, ...from];
    opts.__validating = true;
    opts.originalValue = originalValue;
    opts.from = from;
    super._validate(_value, opts, (err, value) => {
      if (err) {
        if (!ValidationError.isError(err) || abortEarly) {
          return void callback(err, value);
        }
        errors.push(err);
      }
      if (!recursive || !isObject$1(value)) {
        callback(errors[0] || null, value);
        return;
      }
      originalValue = originalValue || value;
      let tests = this._nodes.map((key) => (_2, cb2) => {
        let path = key.indexOf(".") === -1 ? (opts.path ? `${opts.path}.` : "") + key : `${opts.path || ""}["${key}"]`;
        let field = this.fields[key];
        if (field && "validate" in field) {
          field.validate(value[key], _extends$3({}, opts, {
            path,
            from,
            strict: true,
            parent: value,
            originalValue: originalValue[key]
          }), cb2);
          return;
        }
        cb2(null);
      });
      runTests({
        sync,
        tests,
        value,
        errors,
        endEarly: abortEarly,
        sort: this._sortErrors,
        path: opts.path
      }, callback);
    });
  }
  clone(spec) {
    const next = super.clone(spec);
    next.fields = _extends$3({}, this.fields);
    next._nodes = this._nodes;
    next._excludedEdges = this._excludedEdges;
    next._sortErrors = this._sortErrors;
    return next;
  }
  concat(schema) {
    let next = super.concat(schema);
    let nextFields = next.fields;
    for (let [field, schemaOrRef] of Object.entries(this.fields)) {
      const target = nextFields[field];
      if (target === void 0) {
        nextFields[field] = schemaOrRef;
      } else if (target instanceof BaseSchema && schemaOrRef instanceof BaseSchema) {
        nextFields[field] = schemaOrRef.concat(target);
      }
    }
    return next.withMutation(() => next.shape(nextFields, this._excludedEdges));
  }
  getDefaultFromShape() {
    let dft = {};
    this._nodes.forEach((key) => {
      const field = this.fields[key];
      dft[key] = "default" in field ? field.getDefault() : void 0;
    });
    return dft;
  }
  _getDefault() {
    if ("default" in this.spec) {
      return super._getDefault();
    }
    if (!this._nodes.length) {
      return void 0;
    }
    return this.getDefaultFromShape();
  }
  shape(additions, excludes = []) {
    let next = this.clone();
    let fields = Object.assign(next.fields, additions);
    next.fields = fields;
    next._sortErrors = sortByKeyOrder(Object.keys(fields));
    if (excludes.length) {
      if (!Array.isArray(excludes[0]))
        excludes = [excludes];
      next._excludedEdges = [...next._excludedEdges, ...excludes];
    }
    next._nodes = sortFields(fields, next._excludedEdges);
    return next;
  }
  pick(keys2) {
    const picked = {};
    for (const key of keys2) {
      if (this.fields[key])
        picked[key] = this.fields[key];
    }
    return this.clone().withMutation((next) => {
      next.fields = {};
      return next.shape(picked);
    });
  }
  omit(keys2) {
    const next = this.clone();
    const fields = next.fields;
    next.fields = {};
    for (const key of keys2) {
      delete fields[key];
    }
    return next.withMutation(() => next.shape(fields));
  }
  from(from, to, alias) {
    let fromGetter = propertyExpr.getter(from, true);
    return this.transform((obj) => {
      if (obj == null)
        return obj;
      let newObj = obj;
      if (has_1(obj, from)) {
        newObj = _extends$3({}, obj);
        if (!alias)
          delete newObj[from];
        newObj[to] = fromGetter(obj);
      }
      return newObj;
    });
  }
  noUnknown(noAllow = true, message = object.noUnknown) {
    if (typeof noAllow === "string") {
      message = noAllow;
      noAllow = true;
    }
    let next = this.test({
      name: "noUnknown",
      exclusive: true,
      message,
      test(value) {
        if (value == null)
          return true;
        const unknownKeys = unknown(this.schema, value);
        return !noAllow || unknownKeys.length === 0 || this.createError({
          params: {
            unknown: unknownKeys.join(", ")
          }
        });
      }
    });
    next.spec.noUnknown = noAllow;
    return next;
  }
  unknown(allow = true, message = object.noUnknown) {
    return this.noUnknown(!allow, message);
  }
  transformKeys(fn2) {
    return this.transform((obj) => obj && mapKeys_1(obj, (_2, key) => fn2(key)));
  }
  camelCase() {
    return this.transformKeys(camelCase_1);
  }
  snakeCase() {
    return this.transformKeys(snakeCase_1);
  }
  constantCase() {
    return this.transformKeys((key) => snakeCase_1(key).toUpperCase());
  }
  describe() {
    let base = super.describe();
    base.fields = mapValues_1(this.fields, (value) => value.describe());
    return base;
  }
};
function create$6(spec) {
  return new ObjectSchema(spec);
}
create$6.prototype = ObjectSchema.prototype;
function _extends$4() {
  _extends$4 = Object.assign || function(target) {
    for (var i2 = 1; i2 < arguments.length; i2++) {
      var source = arguments[i2];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$4.apply(this, arguments);
}
function create$7(type) {
  return new ArraySchema(type);
}
var ArraySchema = class extends BaseSchema {
  constructor(type) {
    super({
      type: "array"
    });
    this.innerType = void 0;
    this.innerType = type;
    this.withMutation(() => {
      this.transform(function(values3) {
        if (typeof values3 === "string")
          try {
            values3 = JSON.parse(values3);
          } catch (err) {
            values3 = null;
          }
        return this.isType(values3) ? values3 : null;
      });
    });
  }
  _typeCheck(v4) {
    return Array.isArray(v4);
  }
  get _subType() {
    return this.innerType;
  }
  _cast(_value, _opts) {
    const value = super._cast(_value, _opts);
    if (!this._typeCheck(value) || !this.innerType)
      return value;
    let isChanged = false;
    const castArray = value.map((v4, idx) => {
      const castElement = this.innerType.cast(v4, _extends$4({}, _opts, {
        path: `${_opts.path || ""}[${idx}]`
      }));
      if (castElement !== v4) {
        isChanged = true;
      }
      return castElement;
    });
    return isChanged ? castArray : value;
  }
  _validate(_value, options = {}, callback) {
    var _options$abortEarly, _options$recursive;
    let errors = [];
    let sync = options.sync;
    let path = options.path;
    let innerType = this.innerType;
    let endEarly = (_options$abortEarly = options.abortEarly) != null ? _options$abortEarly : this.spec.abortEarly;
    let recursive = (_options$recursive = options.recursive) != null ? _options$recursive : this.spec.recursive;
    let originalValue = options.originalValue != null ? options.originalValue : _value;
    super._validate(_value, options, (err, value) => {
      if (err) {
        if (!ValidationError.isError(err) || endEarly) {
          return void callback(err, value);
        }
        errors.push(err);
      }
      if (!recursive || !innerType || !this._typeCheck(value)) {
        callback(errors[0] || null, value);
        return;
      }
      originalValue = originalValue || value;
      let tests = new Array(value.length);
      for (let idx = 0; idx < value.length; idx++) {
        let item = value[idx];
        let path2 = `${options.path || ""}[${idx}]`;
        let innerOptions = _extends$4({}, options, {
          path: path2,
          strict: true,
          parent: value,
          index: idx,
          originalValue: originalValue[idx]
        });
        tests[idx] = (_2, cb2) => innerType.validate(item, innerOptions, cb2);
      }
      runTests({
        sync,
        path,
        value,
        errors,
        endEarly,
        tests
      }, callback);
    });
  }
  clone(spec) {
    const next = super.clone(spec);
    next.innerType = this.innerType;
    return next;
  }
  concat(schema) {
    let next = super.concat(schema);
    next.innerType = this.innerType;
    if (schema.innerType)
      next.innerType = next.innerType ? next.innerType.concat(schema.innerType) : schema.innerType;
    return next;
  }
  of(schema) {
    let next = this.clone();
    if (!isSchema(schema))
      throw new TypeError("`array.of()` sub-schema must be a valid yup schema not: " + printValue(schema));
    next.innerType = schema;
    return next;
  }
  length(length, message = array.length) {
    return this.test({
      message,
      name: "length",
      exclusive: true,
      params: {
        length
      },
      test(value) {
        return isAbsent(value) || value.length === this.resolve(length);
      }
    });
  }
  min(min2, message) {
    message = message || array.min;
    return this.test({
      message,
      name: "min",
      exclusive: true,
      params: {
        min: min2
      },
      test(value) {
        return isAbsent(value) || value.length >= this.resolve(min2);
      }
    });
  }
  max(max2, message) {
    message = message || array.max;
    return this.test({
      message,
      name: "max",
      exclusive: true,
      params: {
        max: max2
      },
      test(value) {
        return isAbsent(value) || value.length <= this.resolve(max2);
      }
    });
  }
  ensure() {
    return this.default(() => []).transform((val, original) => {
      if (this._typeCheck(val))
        return val;
      return original == null ? [] : [].concat(original);
    });
  }
  compact(rejector) {
    let reject = !rejector ? (v4) => !!v4 : (v4, i2, a3) => !rejector(v4, i2, a3);
    return this.transform((values3) => values3 != null ? values3.filter(reject) : values3);
  }
  describe() {
    let base = super.describe();
    if (this.innerType)
      base.innerType = this.innerType.describe();
    return base;
  }
  nullable(isNullable = true) {
    return super.nullable(isNullable);
  }
  defined() {
    return super.defined();
  }
  required(msg) {
    return super.required(msg);
  }
};
create$7.prototype = ArraySchema.prototype;

// docs/dist/utilities/validation.js
var validationSchema = [
  create$6().shape({
    people: create$7().of(create$6().shape({
      name: create$3().required("It’s ok, you can name them")
    })).min(2, "If you ate alone you don’t need this!")
  }),
  create$6().shape({
    plates: create$7().of(create$6().shape({
      name: create$3().required("Was it good?"),
      price: create$4().required("It wasn’t free lol").positive("You got paid to eat??"),
      eatenBy: create$7().of(create$3()).min(1, "Someone has to eat it!")
    })).min(1, "No food, no website")
  }),
  create$6().shape({
    price: create$4().required("It wasn’t free lol").positive("You got paid to eat??"),
    tip: create$4().required("If you didn’t tip this app breaks").positive("You got paid to eat??")
  })
];
var validation_default = validationSchema;

// docs/dist/utilities/initialValues.js
var initialValues = {
  people: [
    {
      name: ""
    },
    {
      name: ""
    }
  ],
  plates: [
    {
      name: "",
      price: "",
      eatenBy: []
    }
  ],
  price: "",
  tip: ""
};
var initialValues_default = initialValues;

// docs/snowpack/pkg/formik-mui.js
var import_formik_esm_c35373e02 = __toModule(require_formik_esm_c35373e0());
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var __assign = function() {
  __assign = Object.assign || function __assign2(t3) {
    for (var s, i2 = 1, n5 = arguments.length; i2 < n5; i2++) {
      s = arguments[i2];
      for (var p5 in s)
        if (Object.prototype.hasOwnProperty.call(s, p5))
          t3[p5] = s[p5];
    }
    return t3;
  };
  return __assign.apply(this, arguments);
};
function __rest(s, e5) {
  var t3 = {};
  for (var p5 in s)
    if (Object.prototype.hasOwnProperty.call(s, p5) && e5.indexOf(p5) < 0)
      t3[p5] = s[p5];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i2 = 0, p5 = Object.getOwnPropertySymbols(s); i2 < p5.length; i2++) {
      if (e5.indexOf(p5[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p5[i2]))
        t3[p5[i2]] = s[p5[i2]];
    }
  return t3;
}
function createMixins(breakpoints2, spacing2, mixins) {
  return _extends({
    toolbar: {
      minHeight: 56,
      [`${breakpoints2.up("xs")} and (orientation: landscape)`]: {
        minHeight: 48
      },
      [breakpoints2.up("sm")]: {
        minHeight: 64
      }
    }
  }, mixins);
}
var common = {
  black: "#000",
  white: "#fff"
};
var grey = {
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#eeeeee",
  300: "#e0e0e0",
  400: "#bdbdbd",
  500: "#9e9e9e",
  600: "#757575",
  700: "#616161",
  800: "#424242",
  900: "#212121",
  A100: "#f5f5f5",
  A200: "#eeeeee",
  A400: "#bdbdbd",
  A700: "#616161"
};
var purple = {
  50: "#f3e5f5",
  100: "#e1bee7",
  200: "#ce93d8",
  300: "#ba68c8",
  400: "#ab47bc",
  500: "#9c27b0",
  600: "#8e24aa",
  700: "#7b1fa2",
  800: "#6a1b9a",
  900: "#4a148c",
  A100: "#ea80fc",
  A200: "#e040fb",
  A400: "#d500f9",
  A700: "#aa00ff"
};
var red = {
  50: "#ffebee",
  100: "#ffcdd2",
  200: "#ef9a9a",
  300: "#e57373",
  400: "#ef5350",
  500: "#f44336",
  600: "#e53935",
  700: "#d32f2f",
  800: "#c62828",
  900: "#b71c1c",
  A100: "#ff8a80",
  A200: "#ff5252",
  A400: "#ff1744",
  A700: "#d50000"
};
var orange = {
  50: "#fff3e0",
  100: "#ffe0b2",
  200: "#ffcc80",
  300: "#ffb74d",
  400: "#ffa726",
  500: "#ff9800",
  600: "#fb8c00",
  700: "#f57c00",
  800: "#ef6c00",
  900: "#e65100",
  A100: "#ffd180",
  A200: "#ffab40",
  A400: "#ff9100",
  A700: "#ff6d00"
};
var blue = {
  50: "#e3f2fd",
  100: "#bbdefb",
  200: "#90caf9",
  300: "#64b5f6",
  400: "#42a5f5",
  500: "#2196f3",
  600: "#1e88e5",
  700: "#1976d2",
  800: "#1565c0",
  900: "#0d47a1",
  A100: "#82b1ff",
  A200: "#448aff",
  A400: "#2979ff",
  A700: "#2962ff"
};
var lightBlue = {
  50: "#e1f5fe",
  100: "#b3e5fc",
  200: "#81d4fa",
  300: "#4fc3f7",
  400: "#29b6f6",
  500: "#03a9f4",
  600: "#039be5",
  700: "#0288d1",
  800: "#0277bd",
  900: "#01579b",
  A100: "#80d8ff",
  A200: "#40c4ff",
  A400: "#00b0ff",
  A700: "#0091ea"
};
var green = {
  50: "#e8f5e9",
  100: "#c8e6c9",
  200: "#a5d6a7",
  300: "#81c784",
  400: "#66bb6a",
  500: "#4caf50",
  600: "#43a047",
  700: "#388e3c",
  800: "#2e7d32",
  900: "#1b5e20",
  A100: "#b9f6ca",
  A200: "#69f0ae",
  A400: "#00e676",
  A700: "#00c853"
};
var _excluded7 = ["mode", "contrastThreshold", "tonalOffset"];
var light = {
  text: {
    primary: "rgba(0, 0, 0, 0.87)",
    secondary: "rgba(0, 0, 0, 0.6)",
    disabled: "rgba(0, 0, 0, 0.38)"
  },
  divider: "rgba(0, 0, 0, 0.12)",
  background: {
    paper: common.white,
    default: common.white
  },
  action: {
    active: "rgba(0, 0, 0, 0.54)",
    hover: "rgba(0, 0, 0, 0.04)",
    hoverOpacity: 0.04,
    selected: "rgba(0, 0, 0, 0.08)",
    selectedOpacity: 0.08,
    disabled: "rgba(0, 0, 0, 0.26)",
    disabledBackground: "rgba(0, 0, 0, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(0, 0, 0, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.12
  }
};
var dark = {
  text: {
    primary: common.white,
    secondary: "rgba(255, 255, 255, 0.7)",
    disabled: "rgba(255, 255, 255, 0.5)",
    icon: "rgba(255, 255, 255, 0.5)"
  },
  divider: "rgba(255, 255, 255, 0.12)",
  background: {
    paper: "#121212",
    default: "#121212"
  },
  action: {
    active: common.white,
    hover: "rgba(255, 255, 255, 0.08)",
    hoverOpacity: 0.08,
    selected: "rgba(255, 255, 255, 0.16)",
    selectedOpacity: 0.16,
    disabled: "rgba(255, 255, 255, 0.3)",
    disabledBackground: "rgba(255, 255, 255, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(255, 255, 255, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.24
  }
};
function addLightOrDark(intent, direction, shade, tonalOffset) {
  const tonalOffsetLight = tonalOffset.light || tonalOffset;
  const tonalOffsetDark = tonalOffset.dark || tonalOffset * 1.5;
  if (!intent[direction]) {
    if (intent.hasOwnProperty(shade)) {
      intent[direction] = intent[shade];
    } else if (direction === "light") {
      intent.light = lighten(intent.main, tonalOffsetLight);
    } else if (direction === "dark") {
      intent.dark = darken(intent.main, tonalOffsetDark);
    }
  }
}
function getDefaultPrimary(mode = "light") {
  if (mode === "dark") {
    return {
      main: blue[200],
      light: blue[50],
      dark: blue[400]
    };
  }
  return {
    main: blue[700],
    light: blue[400],
    dark: blue[800]
  };
}
function getDefaultSecondary(mode = "light") {
  if (mode === "dark") {
    return {
      main: purple[200],
      light: purple[50],
      dark: purple[400]
    };
  }
  return {
    main: purple[500],
    light: purple[300],
    dark: purple[700]
  };
}
function getDefaultError(mode = "light") {
  if (mode === "dark") {
    return {
      main: red[500],
      light: red[300],
      dark: red[700]
    };
  }
  return {
    main: red[700],
    light: red[400],
    dark: red[800]
  };
}
function getDefaultInfo(mode = "light") {
  if (mode === "dark") {
    return {
      main: lightBlue[400],
      light: lightBlue[300],
      dark: lightBlue[700]
    };
  }
  return {
    main: lightBlue[700],
    light: lightBlue[500],
    dark: lightBlue[900]
  };
}
function getDefaultSuccess(mode = "light") {
  if (mode === "dark") {
    return {
      main: green[400],
      light: green[300],
      dark: green[700]
    };
  }
  return {
    main: green[800],
    light: green[500],
    dark: green[900]
  };
}
function getDefaultWarning(mode = "light") {
  if (mode === "dark") {
    return {
      main: orange[400],
      light: orange[300],
      dark: orange[700]
    };
  }
  return {
    main: "#ED6C02",
    light: orange[500],
    dark: orange[900]
  };
}
function createPalette(palette2) {
  const {
    mode = "light",
    contrastThreshold = 3,
    tonalOffset = 0.2
  } = palette2, other = _objectWithoutPropertiesLoose(palette2, _excluded7);
  const primary = palette2.primary || getDefaultPrimary(mode);
  const secondary = palette2.secondary || getDefaultSecondary(mode);
  const error = palette2.error || getDefaultError(mode);
  const info = palette2.info || getDefaultInfo(mode);
  const success = palette2.success || getDefaultSuccess(mode);
  const warning = palette2.warning || getDefaultWarning(mode);
  function getContrastText(background) {
    const contrastText = getContrastRatio(background, dark.text.primary) >= contrastThreshold ? dark.text.primary : light.text.primary;
    return contrastText;
  }
  const augmentColor = ({
    color: color2,
    name,
    mainShade = 500,
    lightShade = 300,
    darkShade = 700
  }) => {
    color2 = _extends({}, color2);
    if (!color2.main && color2[mainShade]) {
      color2.main = color2[mainShade];
    }
    if (!color2.hasOwnProperty("main")) {
      throw new Error(formatMuiErrorMessage(11, name ? ` (${name})` : "", mainShade));
    }
    if (typeof color2.main !== "string") {
      throw new Error(formatMuiErrorMessage(12, name ? ` (${name})` : "", JSON.stringify(color2.main)));
    }
    addLightOrDark(color2, "light", lightShade, tonalOffset);
    addLightOrDark(color2, "dark", darkShade, tonalOffset);
    if (!color2.contrastText) {
      color2.contrastText = getContrastText(color2.main);
    }
    return color2;
  };
  const modes2 = {
    dark,
    light
  };
  const paletteOutput = deepmerge(_extends({
    common,
    mode,
    primary: augmentColor({
      color: primary,
      name: "primary"
    }),
    secondary: augmentColor({
      color: secondary,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    error: augmentColor({
      color: error,
      name: "error"
    }),
    warning: augmentColor({
      color: warning,
      name: "warning"
    }),
    info: augmentColor({
      color: info,
      name: "info"
    }),
    success: augmentColor({
      color: success,
      name: "success"
    }),
    grey,
    contrastThreshold,
    getContrastText,
    augmentColor,
    tonalOffset
  }, modes2[mode]), other);
  return paletteOutput;
}
var _excluded$15 = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function round(value) {
  return Math.round(value * 1e5) / 1e5;
}
var caseAllCaps = {
  textTransform: "uppercase"
};
var defaultFontFamily = '"Roboto", "Helvetica", "Arial", sans-serif';
function createTypography(palette2, typography2) {
  const _ref = typeof typography2 === "function" ? typography2(palette2) : typography2, {
    fontFamily: fontFamily2 = defaultFontFamily,
    fontSize: fontSize2 = 14,
    fontWeightLight = 300,
    fontWeightRegular = 400,
    fontWeightMedium = 500,
    fontWeightBold = 700,
    htmlFontSize = 16,
    allVariants,
    pxToRem: pxToRem2
  } = _ref, other = _objectWithoutPropertiesLoose(_ref, _excluded$15);
  const coef = fontSize2 / 14;
  const pxToRem = pxToRem2 || ((size) => `${size / htmlFontSize * coef}rem`);
  const buildVariant = (fontWeight2, size, lineHeight2, letterSpacing2, casing) => _extends({
    fontFamily: fontFamily2,
    fontWeight: fontWeight2,
    fontSize: pxToRem(size),
    lineHeight: lineHeight2
  }, fontFamily2 === defaultFontFamily ? {
    letterSpacing: `${round(letterSpacing2 / size)}em`
  } : {}, casing, allVariants);
  const variants = {
    h1: buildVariant(fontWeightLight, 96, 1.167, -1.5),
    h2: buildVariant(fontWeightLight, 60, 1.2, -0.5),
    h3: buildVariant(fontWeightRegular, 48, 1.167, 0),
    h4: buildVariant(fontWeightRegular, 34, 1.235, 0.25),
    h5: buildVariant(fontWeightRegular, 24, 1.334, 0),
    h6: buildVariant(fontWeightMedium, 20, 1.6, 0.15),
    subtitle1: buildVariant(fontWeightRegular, 16, 1.75, 0.15),
    subtitle2: buildVariant(fontWeightMedium, 14, 1.57, 0.1),
    body1: buildVariant(fontWeightRegular, 16, 1.5, 0.15),
    body2: buildVariant(fontWeightRegular, 14, 1.43, 0.15),
    button: buildVariant(fontWeightMedium, 14, 1.75, 0.4, caseAllCaps),
    caption: buildVariant(fontWeightRegular, 12, 1.66, 0.4),
    overline: buildVariant(fontWeightRegular, 12, 2.66, 1, caseAllCaps)
  };
  return deepmerge(_extends({
    htmlFontSize,
    pxToRem,
    fontFamily: fontFamily2,
    fontSize: fontSize2,
    fontWeightLight,
    fontWeightRegular,
    fontWeightMedium,
    fontWeightBold
  }, variants), other, {
    clone: false
  });
}
var shadowKeyUmbraOpacity = 0.2;
var shadowKeyPenumbraOpacity = 0.14;
var shadowAmbientShadowOpacity = 0.12;
function createShadow(...px) {
  return [`${px[0]}px ${px[1]}px ${px[2]}px ${px[3]}px rgba(0,0,0,${shadowKeyUmbraOpacity})`, `${px[4]}px ${px[5]}px ${px[6]}px ${px[7]}px rgba(0,0,0,${shadowKeyPenumbraOpacity})`, `${px[8]}px ${px[9]}px ${px[10]}px ${px[11]}px rgba(0,0,0,${shadowAmbientShadowOpacity})`].join(",");
}
var shadows = ["none", createShadow(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), createShadow(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), createShadow(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), createShadow(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), createShadow(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), createShadow(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), createShadow(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), createShadow(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), createShadow(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), createShadow(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), createShadow(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), createShadow(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), createShadow(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), createShadow(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), createShadow(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), createShadow(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), createShadow(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), createShadow(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), createShadow(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), createShadow(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), createShadow(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), createShadow(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), createShadow(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), createShadow(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)];
var _excluded$23 = ["duration", "easing", "delay"];
var easing = {
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
};
var duration = {
  shortest: 150,
  shorter: 200,
  short: 250,
  standard: 300,
  complex: 375,
  enteringScreen: 225,
  leavingScreen: 195
};
function formatMs(milliseconds) {
  return `${Math.round(milliseconds)}ms`;
}
function getAutoHeightDuration(height2) {
  if (!height2) {
    return 0;
  }
  const constant = height2 / 36;
  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}
function createTransitions(inputTransitions) {
  const mergedEasing = _extends({}, easing, inputTransitions.easing);
  const mergedDuration = _extends({}, duration, inputTransitions.duration);
  const create = (props = ["all"], options = {}) => {
    const {
      duration: durationOption = mergedDuration.standard,
      easing: easingOption = mergedEasing.easeInOut,
      delay = 0
    } = options, other = _objectWithoutPropertiesLoose(options, _excluded$23);
    return (Array.isArray(props) ? props : [props]).map((animatedProp) => `${animatedProp} ${typeof durationOption === "string" ? durationOption : formatMs(durationOption)} ${easingOption} ${typeof delay === "string" ? delay : formatMs(delay)}`).join(",");
  };
  return _extends({
    getAutoHeightDuration,
    create
  }, inputTransitions, {
    easing: mergedEasing,
    duration: mergedDuration
  });
}
var zIndex2 = {
  mobileStepper: 1e3,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
};
var _excluded$33 = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function createTheme2(options = {}, ...args) {
  const {
    mixins: mixinsInput = {},
    palette: paletteInput = {},
    transitions: transitionsInput = {},
    typography: typographyInput = {}
  } = options, other = _objectWithoutPropertiesLoose(options, _excluded$33);
  const palette2 = createPalette(paletteInput);
  const systemTheme = createTheme(options);
  let muiTheme = deepmerge(systemTheme, {
    mixins: createMixins(systemTheme.breakpoints, systemTheme.spacing, mixinsInput),
    palette: palette2,
    shadows: shadows.slice(),
    typography: createTypography(palette2, typographyInput),
    transitions: createTransitions(transitionsInput),
    zIndex: _extends({}, zIndex2)
  });
  muiTheme = deepmerge(muiTheme, other);
  muiTheme = args.reduce((acc, argument) => deepmerge(acc, argument), muiTheme);
  return muiTheme;
}
var defaultTheme = createTheme2();
var rootShouldForwardProp = (prop) => shouldForwardProp(prop) && prop !== "classes";
var slotShouldForwardProp = shouldForwardProp;
var styled3 = createStyled$1({
  defaultTheme,
  rootShouldForwardProp
});
function useThemeProps2({
  props,
  name
}) {
  return useThemeProps({
    props,
    name,
    defaultTheme
  });
}
function useTheme2() {
  const theme = useTheme$2(defaultTheme);
  return theme;
}
function getPaperUtilityClass(slot) {
  return generateUtilityClass("MuiPaper", slot);
}
var paperClasses = generateUtilityClasses("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
var _excluded$42 = ["className", "component", "elevation", "square", "variant"];
var getOverlayAlpha = (elevation) => {
  let alphaValue;
  if (elevation < 1) {
    alphaValue = 5.11916 * elevation ** 2;
  } else {
    alphaValue = 4.5 * Math.log(elevation + 1) + 2;
  }
  return (alphaValue / 100).toFixed(2);
};
var useUtilityClasses3 = (ownerState) => {
  const {
    square,
    elevation,
    variant,
    classes
  } = ownerState;
  const slots = {
    root: ["root", variant, !square && "rounded", variant === "elevation" && `elevation${elevation}`]
  };
  return composeClasses(slots, getPaperUtilityClass, classes);
};
var PaperRoot = styled3("div", {
  name: "MuiPaper",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, styles2[ownerState.variant], !ownerState.square && styles2.rounded, ownerState.variant === "elevation" && styles2[`elevation${ownerState.elevation}`]];
  }
})(({
  theme,
  ownerState
}) => _extends({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  transition: theme.transitions.create("box-shadow")
}, !ownerState.square && {
  borderRadius: theme.shape.borderRadius
}, ownerState.variant === "outlined" && {
  border: `1px solid ${theme.palette.divider}`
}, ownerState.variant === "elevation" && _extends({
  boxShadow: theme.shadows[ownerState.elevation]
}, theme.palette.mode === "dark" && {
  backgroundImage: `linear-gradient(${alpha("#fff", getOverlayAlpha(ownerState.elevation))}, ${alpha("#fff", getOverlayAlpha(ownerState.elevation))})`
})));
var Paper = /* @__PURE__ */ react.forwardRef(function Paper2(inProps, ref) {
  const props = useThemeProps2({
    props: inProps,
    name: "MuiPaper"
  });
  const {
    className,
    component = "div",
    elevation = 1,
    square = false,
    variant = "elevation"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$42);
  const ownerState = _extends({}, props, {
    component,
    elevation,
    square,
    variant
  });
  const classes = useUtilityClasses3(ownerState);
  return /* @__PURE__ */ jsxRuntime.jsx(PaperRoot, _extends({
    as: component,
    ownerState,
    className: clsx(classes.root, className),
    ref
  }, other));
});
function getSvgIconUtilityClass(slot) {
  return generateUtilityClass("MuiSvgIcon", slot);
}
var svgIconClasses = generateUtilityClasses("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
var _excluded$52 = ["children", "className", "color", "component", "fontSize", "htmlColor", "titleAccess", "viewBox"];
var useUtilityClasses$13 = (ownerState) => {
  const {
    color: color2,
    fontSize: fontSize2,
    classes
  } = ownerState;
  const slots = {
    root: ["root", color2 !== "inherit" && `color${capitalize(color2)}`, `fontSize${capitalize(fontSize2)}`]
  };
  return composeClasses(slots, getSvgIconUtilityClass, classes);
};
var SvgIconRoot = styled3("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, ownerState.color !== "inherit" && styles2[`color${capitalize(ownerState.color)}`], styles2[`fontSize${capitalize(ownerState.fontSize)}`]];
  }
})(({
  theme,
  ownerState
}) => {
  var _theme$palette$ownerS, _theme$palette$ownerS2;
  return {
    userSelect: "none",
    width: "1em",
    height: "1em",
    display: "inline-block",
    fill: "currentColor",
    flexShrink: 0,
    transition: theme.transitions.create("fill", {
      duration: theme.transitions.duration.shorter
    }),
    fontSize: {
      inherit: "inherit",
      small: theme.typography.pxToRem(20),
      medium: theme.typography.pxToRem(24),
      large: theme.typography.pxToRem(35)
    }[ownerState.fontSize],
    color: (_theme$palette$ownerS = (_theme$palette$ownerS2 = theme.palette[ownerState.color]) == null ? void 0 : _theme$palette$ownerS2.main) != null ? _theme$palette$ownerS : {
      action: theme.palette.action.active,
      disabled: theme.palette.action.disabled,
      inherit: void 0
    }[ownerState.color]
  };
});
var SvgIcon = /* @__PURE__ */ react.forwardRef(function SvgIcon2(inProps, ref) {
  const props = useThemeProps2({
    props: inProps,
    name: "MuiSvgIcon"
  });
  const {
    children,
    className,
    color: color2 = "inherit",
    component = "svg",
    fontSize: fontSize2 = "medium",
    htmlColor,
    titleAccess,
    viewBox = "0 0 24 24"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$52);
  const ownerState = _extends({}, props, {
    color: color2,
    component,
    fontSize: fontSize2,
    viewBox
  });
  const classes = useUtilityClasses$13(ownerState);
  return /* @__PURE__ */ jsxRuntime.jsxs(SvgIconRoot, _extends({
    as: component,
    className: clsx(classes.root, className),
    ownerState,
    focusable: "false",
    viewBox,
    color: htmlColor,
    "aria-hidden": titleAccess ? void 0 : true,
    role: titleAccess ? "img" : void 0,
    ref
  }, other, {
    children: [children, titleAccess ? /* @__PURE__ */ jsxRuntime.jsx("title", {
      children: titleAccess
    }) : null]
  }));
});
SvgIcon.muiName = "SvgIcon";
function createSvgIcon(path, displayName) {
  const Component2 = (props, ref) => /* @__PURE__ */ jsxRuntime.jsx(SvgIcon, _extends({
    "data-testid": `${displayName}Icon`,
    ref
  }, props, {
    children: path
  }));
  Component2.muiName = SvgIcon.muiName;
  return /* @__PURE__ */ react.memo(/* @__PURE__ */ react.forwardRef(Component2));
}
var ArrowDropDownIcon = createSvgIcon(/* @__PURE__ */ jsxRuntime.jsx("path", {
  d: "M7 10l5 5 5-5z"
}), "ArrowDropDown");
var FormControlContext = /* @__PURE__ */ react.createContext();
function useFormControl() {
  return react.useContext(FormControlContext);
}
function hasValue2(value) {
  return value != null && !(Array.isArray(value) && value.length === 0);
}
function isFilled(obj, SSR2 = false) {
  return obj && (hasValue2(obj.value) && obj.value !== "" || SSR2 && hasValue2(obj.defaultValue) && obj.defaultValue !== "");
}
function isAdornedStart(obj) {
  return obj.startAdornment;
}
function getFormControlUtilityClasses(slot) {
  return generateUtilityClass("MuiFormControl", slot);
}
var formControlClasses = generateUtilityClasses("MuiFormControl", ["root", "marginNone", "marginNormal", "marginDense", "fullWidth", "disabled"]);
var _excluded$6 = ["children", "className", "color", "component", "disabled", "error", "focused", "fullWidth", "hiddenLabel", "margin", "required", "size", "variant"];
var useUtilityClasses$22 = (ownerState) => {
  const {
    classes,
    margin: margin2,
    fullWidth
  } = ownerState;
  const slots = {
    root: ["root", margin2 !== "none" && `margin${capitalize(margin2)}`, fullWidth && "fullWidth"]
  };
  return composeClasses(slots, getFormControlUtilityClasses, classes);
};
var FormControlRoot = styled3("div", {
  name: "MuiFormControl",
  slot: "Root",
  overridesResolver: ({
    ownerState
  }, styles2) => {
    return _extends({}, styles2.root, styles2[`margin${capitalize(ownerState.margin)}`], ownerState.fullWidth && styles2.fullWidth);
  }
})(({
  ownerState
}) => _extends({
  display: "inline-flex",
  flexDirection: "column",
  position: "relative",
  minWidth: 0,
  padding: 0,
  margin: 0,
  border: 0,
  verticalAlign: "top"
}, ownerState.margin === "normal" && {
  marginTop: 16,
  marginBottom: 8
}, ownerState.margin === "dense" && {
  marginTop: 8,
  marginBottom: 4
}, ownerState.fullWidth && {
  width: "100%"
}));
var FormControl = /* @__PURE__ */ react.forwardRef(function FormControl2(inProps, ref) {
  const props = useThemeProps2({
    props: inProps,
    name: "MuiFormControl"
  });
  const {
    children,
    className,
    color: color2 = "primary",
    component = "div",
    disabled = false,
    error = false,
    focused: visuallyFocused,
    fullWidth = false,
    hiddenLabel = false,
    margin: margin2 = "none",
    required = false,
    size = "medium",
    variant = "outlined"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$6);
  const ownerState = _extends({}, props, {
    color: color2,
    component,
    disabled,
    error,
    fullWidth,
    hiddenLabel,
    margin: margin2,
    required,
    size,
    variant
  });
  const classes = useUtilityClasses$22(ownerState);
  const [adornedStart, setAdornedStart] = react.useState(() => {
    let initialAdornedStart = false;
    if (children) {
      react.Children.forEach(children, (child) => {
        if (!isMuiElement(child, ["Input", "Select"])) {
          return;
        }
        const input = isMuiElement(child, ["Select"]) ? child.props.input : child;
        if (input && isAdornedStart(input.props)) {
          initialAdornedStart = true;
        }
      });
    }
    return initialAdornedStart;
  });
  const [filled, setFilled] = react.useState(() => {
    let initialFilled = false;
    if (children) {
      react.Children.forEach(children, (child) => {
        if (!isMuiElement(child, ["Input", "Select"])) {
          return;
        }
        if (isFilled(child.props, true)) {
          initialFilled = true;
        }
      });
    }
    return initialFilled;
  });
  const [focusedState, setFocused] = react.useState(false);
  if (disabled && focusedState) {
    setFocused(false);
  }
  const focused = visuallyFocused !== void 0 && !disabled ? visuallyFocused : focusedState;
  let registerEffect;
  const onFilled = react.useCallback(() => {
    setFilled(true);
  }, []);
  const onEmpty = react.useCallback(() => {
    setFilled(false);
  }, []);
  const childContext = {
    adornedStart,
    setAdornedStart,
    color: color2,
    disabled,
    error,
    filled,
    focused,
    fullWidth,
    hiddenLabel,
    size,
    onBlur: () => {
      setFocused(false);
    },
    onEmpty,
    onFilled,
    onFocus: () => {
      setFocused(true);
    },
    registerEffect,
    required,
    variant
  };
  return /* @__PURE__ */ jsxRuntime.jsx(FormControlContext.Provider, {
    value: childContext,
    children: /* @__PURE__ */ jsxRuntime.jsx(FormControlRoot, _extends({
      as: component,
      ownerState,
      className: clsx(classes.root, className),
      ref
    }, other, {
      children
    }))
  });
});
function formControlState({
  props,
  states,
  muiFormControl
}) {
  return states.reduce((acc, state) => {
    acc[state] = props[state];
    if (muiFormControl) {
      if (typeof props[state] === "undefined") {
        acc[state] = muiFormControl[state];
      }
    }
    return acc;
  }, {});
}
var _excluded$7 = ["onChange", "maxRows", "minRows", "style", "value"];
function getStyleValue(computedStyle, property2) {
  return parseInt(computedStyle[property2], 10) || 0;
}
var styles = {
  shadow: {
    visibility: "hidden",
    position: "absolute",
    overflow: "hidden",
    height: 0,
    top: 0,
    left: 0,
    transform: "translateZ(0)"
  }
};
var TextareaAutosize = /* @__PURE__ */ react.forwardRef(function TextareaAutosize2(props, ref) {
  const {
    onChange,
    maxRows,
    minRows = 1,
    style: style2,
    value
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$7);
  const {
    current: isControlled
  } = react.useRef(value != null);
  const inputRef = react.useRef(null);
  const handleRef = useForkRef(ref, inputRef);
  const shadowRef = react.useRef(null);
  const renders = react.useRef(0);
  const [state, setState] = react.useState({});
  const syncHeight = react.useCallback(() => {
    const input = inputRef.current;
    const containerWindow = ownerWindow(input);
    const computedStyle = containerWindow.getComputedStyle(input);
    if (computedStyle.width === "0px") {
      return;
    }
    const inputShallow = shadowRef.current;
    inputShallow.style.width = computedStyle.width;
    inputShallow.value = input.value || props.placeholder || "x";
    if (inputShallow.value.slice(-1) === "\n") {
      inputShallow.value += " ";
    }
    const boxSizing2 = computedStyle["box-sizing"];
    const padding2 = getStyleValue(computedStyle, "padding-bottom") + getStyleValue(computedStyle, "padding-top");
    const border2 = getStyleValue(computedStyle, "border-bottom-width") + getStyleValue(computedStyle, "border-top-width");
    const innerHeight = inputShallow.scrollHeight;
    inputShallow.value = "x";
    const singleRowHeight = inputShallow.scrollHeight;
    let outerHeight = innerHeight;
    if (minRows) {
      outerHeight = Math.max(Number(minRows) * singleRowHeight, outerHeight);
    }
    if (maxRows) {
      outerHeight = Math.min(Number(maxRows) * singleRowHeight, outerHeight);
    }
    outerHeight = Math.max(outerHeight, singleRowHeight);
    const outerHeightStyle = outerHeight + (boxSizing2 === "border-box" ? padding2 + border2 : 0);
    const overflow2 = Math.abs(outerHeight - innerHeight) <= 1;
    setState((prevState) => {
      if (renders.current < 20 && (outerHeightStyle > 0 && Math.abs((prevState.outerHeightStyle || 0) - outerHeightStyle) > 1 || prevState.overflow !== overflow2)) {
        renders.current += 1;
        return {
          overflow: overflow2,
          outerHeightStyle
        };
      }
      return prevState;
    });
  }, [maxRows, minRows, props.placeholder]);
  react.useEffect(() => {
    const handleResize = debounce(() => {
      renders.current = 0;
      syncHeight();
    });
    const containerWindow = ownerWindow(inputRef.current);
    containerWindow.addEventListener("resize", handleResize);
    let resizeObserver;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(inputRef.current);
    }
    return () => {
      handleResize.clear();
      containerWindow.removeEventListener("resize", handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [syncHeight]);
  useEnhancedEffect(() => {
    syncHeight();
  });
  react.useEffect(() => {
    renders.current = 0;
  }, [value]);
  const handleChange = (event) => {
    renders.current = 0;
    if (!isControlled) {
      syncHeight();
    }
    if (onChange) {
      onChange(event);
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(react.Fragment, {
    children: [/* @__PURE__ */ jsxRuntime.jsx("textarea", _extends({
      value,
      onChange: handleChange,
      ref: handleRef,
      rows: minRows,
      style: _extends({
        height: state.outerHeightStyle,
        overflow: state.overflow ? "hidden" : null
      }, style2)
    }, other)), /* @__PURE__ */ jsxRuntime.jsx("textarea", {
      "aria-hidden": true,
      className: props.className,
      readOnly: true,
      ref: shadowRef,
      tabIndex: -1,
      style: _extends({}, styles.shadow, style2, {
        padding: 0
      })
    })]
  });
});
function GlobalStyles2(props) {
  return /* @__PURE__ */ jsxRuntime.jsx(GlobalStyles, _extends({}, props, {
    defaultTheme
  }));
}
function getInputBaseUtilityClass(slot) {
  return generateUtilityClass("MuiInputBase", slot);
}
var inputBaseClasses2 = generateUtilityClasses("MuiInputBase", ["root", "formControl", "focused", "disabled", "adornedStart", "adornedEnd", "error", "sizeSmall", "multiline", "colorSecondary", "fullWidth", "hiddenLabel", "input", "inputSizeSmall", "inputMultiline", "inputTypeSearch", "inputAdornedStart", "inputAdornedEnd", "inputHiddenLabel"]);
var _excluded$8 = ["aria-describedby", "autoComplete", "autoFocus", "className", "color", "components", "componentsProps", "defaultValue", "disabled", "endAdornment", "error", "fullWidth", "id", "inputComponent", "inputProps", "inputRef", "margin", "maxRows", "minRows", "multiline", "name", "onBlur", "onChange", "onClick", "onFocus", "onKeyDown", "onKeyUp", "placeholder", "readOnly", "renderSuffix", "rows", "size", "startAdornment", "type", "value"];
var rootOverridesResolver = (props, styles2) => {
  const {
    ownerState
  } = props;
  return [styles2.root, ownerState.formControl && styles2.formControl, ownerState.startAdornment && styles2.adornedStart, ownerState.endAdornment && styles2.adornedEnd, ownerState.error && styles2.error, ownerState.size === "small" && styles2.sizeSmall, ownerState.multiline && styles2.multiline, ownerState.color && styles2[`color${capitalize(ownerState.color)}`], ownerState.fullWidth && styles2.fullWidth, ownerState.hiddenLabel && styles2.hiddenLabel];
};
var inputOverridesResolver = (props, styles2) => {
  const {
    ownerState
  } = props;
  return [styles2.input, ownerState.size === "small" && styles2.inputSizeSmall, ownerState.multiline && styles2.inputMultiline, ownerState.type === "search" && styles2.inputTypeSearch, ownerState.startAdornment && styles2.inputAdornedStart, ownerState.endAdornment && styles2.inputAdornedEnd, ownerState.hiddenLabel && styles2.inputHiddenLabel];
};
var useUtilityClasses$3 = (ownerState) => {
  const {
    classes,
    color: color2,
    disabled,
    error,
    endAdornment,
    focused,
    formControl,
    fullWidth,
    hiddenLabel,
    multiline,
    size,
    startAdornment,
    type
  } = ownerState;
  const slots = {
    root: ["root", `color${capitalize(color2)}`, disabled && "disabled", error && "error", fullWidth && "fullWidth", focused && "focused", formControl && "formControl", size === "small" && "sizeSmall", multiline && "multiline", startAdornment && "adornedStart", endAdornment && "adornedEnd", hiddenLabel && "hiddenLabel"],
    input: ["input", disabled && "disabled", type === "search" && "inputTypeSearch", multiline && "inputMultiline", size === "small" && "inputSizeSmall", hiddenLabel && "inputHiddenLabel", startAdornment && "inputAdornedStart", endAdornment && "inputAdornedEnd"]
  };
  return composeClasses(slots, getInputBaseUtilityClass, classes);
};
var InputBaseRoot = styled3("div", {
  name: "MuiInputBase",
  slot: "Root",
  overridesResolver: rootOverridesResolver
})(({
  theme,
  ownerState
}) => _extends({}, theme.typography.body1, {
  color: theme.palette.text.primary,
  lineHeight: "1.4375em",
  boxSizing: "border-box",
  position: "relative",
  cursor: "text",
  display: "inline-flex",
  alignItems: "center",
  [`&.${inputBaseClasses2.disabled}`]: {
    color: theme.palette.text.disabled,
    cursor: "default"
  }
}, ownerState.multiline && _extends({
  padding: "4px 0 5px"
}, ownerState.size === "small" && {
  paddingTop: 1
}), ownerState.fullWidth && {
  width: "100%"
}));
var InputBaseComponent = styled3("input", {
  name: "MuiInputBase",
  slot: "Input",
  overridesResolver: inputOverridesResolver
})(({
  theme,
  ownerState
}) => {
  const light2 = theme.palette.mode === "light";
  const placeholder = {
    color: "currentColor",
    opacity: light2 ? 0.42 : 0.5,
    transition: theme.transitions.create("opacity", {
      duration: theme.transitions.duration.shorter
    })
  };
  const placeholderHidden = {
    opacity: "0 !important"
  };
  const placeholderVisible = {
    opacity: light2 ? 0.42 : 0.5
  };
  return _extends({
    font: "inherit",
    letterSpacing: "inherit",
    color: "currentColor",
    padding: "4px 0 5px",
    border: 0,
    boxSizing: "content-box",
    background: "none",
    height: "1.4375em",
    margin: 0,
    WebkitTapHighlightColor: "transparent",
    display: "block",
    minWidth: 0,
    width: "100%",
    animationName: "mui-auto-fill-cancel",
    animationDuration: "10ms",
    "&::-webkit-input-placeholder": placeholder,
    "&::-moz-placeholder": placeholder,
    "&:-ms-input-placeholder": placeholder,
    "&::-ms-input-placeholder": placeholder,
    "&:focus": {
      outline: 0
    },
    "&:invalid": {
      boxShadow: "none"
    },
    "&::-webkit-search-decoration": {
      WebkitAppearance: "none"
    },
    [`label[data-shrink=false] + .${inputBaseClasses2.formControl} &`]: {
      "&::-webkit-input-placeholder": placeholderHidden,
      "&::-moz-placeholder": placeholderHidden,
      "&:-ms-input-placeholder": placeholderHidden,
      "&::-ms-input-placeholder": placeholderHidden,
      "&:focus::-webkit-input-placeholder": placeholderVisible,
      "&:focus::-moz-placeholder": placeholderVisible,
      "&:focus:-ms-input-placeholder": placeholderVisible,
      "&:focus::-ms-input-placeholder": placeholderVisible
    },
    [`&.${inputBaseClasses2.disabled}`]: {
      opacity: 1,
      WebkitTextFillColor: theme.palette.text.disabled
    },
    "&:-webkit-autofill": {
      animationDuration: "5000s",
      animationName: "mui-auto-fill"
    }
  }, ownerState.size === "small" && {
    paddingTop: 1
  }, ownerState.multiline && {
    height: "auto",
    resize: "none",
    padding: 0,
    paddingTop: 0
  }, ownerState.type === "search" && {
    MozAppearance: "textfield",
    WebkitAppearance: "textfield"
  });
});
var inputGlobalStyles = /* @__PURE__ */ jsxRuntime.jsx(GlobalStyles2, {
  styles: {
    "@keyframes mui-auto-fill": {
      from: {
        display: "block"
      }
    },
    "@keyframes mui-auto-fill-cancel": {
      from: {
        display: "block"
      }
    }
  }
});
var InputBase = /* @__PURE__ */ react.forwardRef(function InputBase2(inProps, ref) {
  const props = useThemeProps2({
    props: inProps,
    name: "MuiInputBase"
  });
  const {
    "aria-describedby": ariaDescribedby,
    autoComplete,
    autoFocus,
    className,
    components = {},
    componentsProps = {},
    defaultValue,
    disabled,
    endAdornment,
    fullWidth = false,
    id: id2,
    inputComponent = "input",
    inputProps: inputPropsProp = {},
    inputRef: inputRefProp,
    maxRows,
    minRows,
    multiline = false,
    name,
    onBlur,
    onChange,
    onClick,
    onFocus,
    onKeyDown,
    onKeyUp,
    placeholder,
    readOnly,
    renderSuffix,
    rows,
    startAdornment,
    type = "text",
    value: valueProp
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$8);
  const theme = useTheme2();
  const value = inputPropsProp.value != null ? inputPropsProp.value : valueProp;
  const {
    current: isControlled
  } = react.useRef(value != null);
  const inputRef = react.useRef();
  const handleInputRefWarning = react.useCallback((instance) => {
  }, []);
  const handleInputPropsRefProp = useForkRef(inputPropsProp.ref, handleInputRefWarning);
  const handleInputRefProp = useForkRef(inputRefProp, handleInputPropsRefProp);
  const handleInputRef = useForkRef(inputRef, handleInputRefProp);
  const [focused, setFocused] = react.useState(false);
  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ["color", "disabled", "error", "hiddenLabel", "size", "required", "filled"]
  });
  fcs.focused = muiFormControl ? muiFormControl.focused : focused;
  react.useEffect(() => {
    if (!muiFormControl && disabled && focused) {
      setFocused(false);
      if (onBlur) {
        onBlur();
      }
    }
  }, [muiFormControl, disabled, focused, onBlur]);
  const onFilled = muiFormControl && muiFormControl.onFilled;
  const onEmpty = muiFormControl && muiFormControl.onEmpty;
  const checkDirty = react.useCallback((obj) => {
    if (isFilled(obj)) {
      if (onFilled) {
        onFilled();
      }
    } else if (onEmpty) {
      onEmpty();
    }
  }, [onFilled, onEmpty]);
  useEnhancedEffect(() => {
    if (isControlled) {
      checkDirty({
        value
      });
    }
  }, [value, checkDirty, isControlled]);
  const handleFocus = (event) => {
    if (fcs.disabled) {
      event.stopPropagation();
      return;
    }
    if (onFocus) {
      onFocus(event);
    }
    if (inputPropsProp.onFocus) {
      inputPropsProp.onFocus(event);
    }
    if (muiFormControl && muiFormControl.onFocus) {
      muiFormControl.onFocus(event);
    } else {
      setFocused(true);
    }
  };
  const handleBlur = (event) => {
    if (onBlur) {
      onBlur(event);
    }
    if (inputPropsProp.onBlur) {
      inputPropsProp.onBlur(event);
    }
    if (muiFormControl && muiFormControl.onBlur) {
      muiFormControl.onBlur(event);
    } else {
      setFocused(false);
    }
  };
  const handleChange = (event, ...args) => {
    if (!isControlled) {
      const element = event.target || inputRef.current;
      if (element == null) {
        throw new Error(formatMuiErrorMessage(1));
      }
      checkDirty({
        value: element.value
      });
    }
    if (inputPropsProp.onChange) {
      inputPropsProp.onChange(event, ...args);
    }
    if (onChange) {
      onChange(event, ...args);
    }
  };
  react.useEffect(() => {
    checkDirty(inputRef.current);
  }, []);
  const handleClick = (event) => {
    if (inputRef.current && event.currentTarget === event.target) {
      inputRef.current.focus();
    }
    if (onClick) {
      onClick(event);
    }
  };
  let InputComponent = inputComponent;
  let inputProps = inputPropsProp;
  if (multiline && InputComponent === "input") {
    if (rows) {
      inputProps = _extends({
        type: void 0,
        minRows: rows,
        maxRows: rows
      }, inputProps);
    } else {
      inputProps = _extends({
        type: void 0,
        maxRows,
        minRows
      }, inputProps);
    }
    InputComponent = TextareaAutosize;
  }
  const handleAutoFill = (event) => {
    checkDirty(event.animationName === "mui-auto-fill-cancel" ? inputRef.current : {
      value: "x"
    });
  };
  react.useEffect(() => {
    if (muiFormControl) {
      muiFormControl.setAdornedStart(Boolean(startAdornment));
    }
  }, [muiFormControl, startAdornment]);
  const ownerState = _extends({}, props, {
    color: fcs.color || "primary",
    disabled: fcs.disabled,
    endAdornment,
    error: fcs.error,
    focused: fcs.focused,
    formControl: muiFormControl,
    fullWidth,
    hiddenLabel: fcs.hiddenLabel,
    multiline,
    size: fcs.size,
    startAdornment,
    type
  });
  const classes = useUtilityClasses$3(ownerState);
  const Root = components.Root || InputBaseRoot;
  const rootProps = componentsProps.root || {};
  const Input3 = components.Input || InputBaseComponent;
  inputProps = _extends({}, inputProps, componentsProps.input);
  return /* @__PURE__ */ jsxRuntime.jsxs(react.Fragment, {
    children: [inputGlobalStyles, /* @__PURE__ */ jsxRuntime.jsxs(Root, _extends({}, rootProps, !isHostComponent(Root) && {
      ownerState: _extends({}, ownerState, rootProps.ownerState),
      theme
    }, {
      ref,
      onClick: handleClick
    }, other, {
      className: clsx(classes.root, rootProps.className, className),
      children: [startAdornment, /* @__PURE__ */ jsxRuntime.jsx(FormControlContext.Provider, {
        value: null,
        children: /* @__PURE__ */ jsxRuntime.jsx(Input3, _extends({
          ownerState,
          "aria-invalid": fcs.error,
          "aria-describedby": ariaDescribedby,
          autoComplete,
          autoFocus,
          defaultValue,
          disabled: fcs.disabled,
          id: id2,
          onAnimationStart: handleAutoFill,
          name,
          placeholder,
          readOnly,
          required: fcs.required,
          rows,
          value,
          onKeyDown,
          onKeyUp,
          type
        }, inputProps, !isHostComponent(Input3) && {
          as: InputComponent,
          ownerState: _extends({}, ownerState, inputProps.ownerState),
          theme
        }, {
          ref: handleInputRef,
          className: clsx(classes.input, inputProps.className, inputPropsProp.className),
          onBlur: handleBlur,
          onChange: handleChange,
          onFocus: handleFocus
        }))
      }), endAdornment, renderSuffix ? renderSuffix(_extends({}, fcs, {
        startAdornment
      })) : null]
    }))]
  });
});
function getFormHelperTextUtilityClasses(slot) {
  return generateUtilityClass("MuiFormHelperText", slot);
}
var formHelperTextClasses = generateUtilityClasses("MuiFormHelperText", ["root", "error", "disabled", "sizeSmall", "sizeMedium", "contained", "focused", "filled", "required"]);
var _excluded$9 = ["children", "className", "component", "disabled", "error", "filled", "focused", "margin", "required", "variant"];
var useUtilityClasses$4 = (ownerState) => {
  const {
    classes,
    contained,
    size,
    disabled,
    error,
    filled,
    focused,
    required
  } = ownerState;
  const slots = {
    root: ["root", disabled && "disabled", error && "error", size && `size${capitalize(size)}`, contained && "contained", focused && "focused", filled && "filled", required && "required"]
  };
  return composeClasses(slots, getFormHelperTextUtilityClasses, classes);
};
var FormHelperTextRoot = styled3("p", {
  name: "MuiFormHelperText",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, ownerState.size && styles2[`size${capitalize(ownerState.size)}`], ownerState.contained && styles2.contained, ownerState.filled && styles2.filled];
  }
})(({
  theme,
  ownerState
}) => _extends({
  color: theme.palette.text.secondary
}, theme.typography.caption, {
  textAlign: "left",
  marginTop: 3,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,
  [`&.${formHelperTextClasses.disabled}`]: {
    color: theme.palette.text.disabled
  },
  [`&.${formHelperTextClasses.error}`]: {
    color: theme.palette.error.main
  }
}, ownerState.size === "small" && {
  marginTop: 4
}, ownerState.contained && {
  marginLeft: 14,
  marginRight: 14
}));
var FormHelperText = /* @__PURE__ */ react.forwardRef(function FormHelperText2(inProps, ref) {
  const props = useThemeProps2({
    props: inProps,
    name: "MuiFormHelperText"
  });
  const {
    children,
    className,
    component = "p"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$9);
  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ["variant", "size", "disabled", "error", "filled", "focused", "required"]
  });
  const ownerState = _extends({}, props, {
    component,
    contained: fcs.variant === "filled" || fcs.variant === "outlined",
    variant: fcs.variant,
    size: fcs.size,
    disabled: fcs.disabled,
    error: fcs.error,
    filled: fcs.filled,
    focused: fcs.focused,
    required: fcs.required
  });
  const classes = useUtilityClasses$4(ownerState);
  return /* @__PURE__ */ jsxRuntime.jsx(FormHelperTextRoot, _extends({
    as: component,
    ownerState,
    className: clsx(classes.root, className),
    ref
  }, other, {
    children: children === " " ? /* @__PURE__ */ jsxRuntime.jsx("span", {
      className: "notranslate",
      dangerouslySetInnerHTML: {
        __html: "&#8203;"
      }
    }) : children
  }));
});
function getFormLabelUtilityClasses(slot) {
  return generateUtilityClass("MuiFormLabel", slot);
}
var formLabelClasses = generateUtilityClasses("MuiFormLabel", ["root", "colorSecondary", "focused", "disabled", "error", "filled", "required", "asterisk"]);
var _excluded$a = ["children", "className", "color", "component", "disabled", "error", "filled", "focused", "required"];
var useUtilityClasses$5 = (ownerState) => {
  const {
    classes,
    color: color2,
    focused,
    disabled,
    error,
    filled,
    required
  } = ownerState;
  const slots = {
    root: ["root", `color${capitalize(color2)}`, disabled && "disabled", error && "error", filled && "filled", focused && "focused", required && "required"],
    asterisk: ["asterisk", error && "error"]
  };
  return composeClasses(slots, getFormLabelUtilityClasses, classes);
};
var FormLabelRoot = styled3("label", {
  name: "MuiFormLabel",
  slot: "Root",
  overridesResolver: ({
    ownerState
  }, styles2) => {
    return _extends({}, styles2.root, ownerState.color === "secondary" && styles2.colorSecondary, ownerState.filled && styles2.filled);
  }
})(({
  theme,
  ownerState
}) => _extends({
  color: theme.palette.text.secondary
}, theme.typography.body1, {
  lineHeight: "1.4375em",
  padding: 0,
  position: "relative",
  [`&.${formLabelClasses.focused}`]: {
    color: theme.palette[ownerState.color].main
  },
  [`&.${formLabelClasses.disabled}`]: {
    color: theme.palette.text.disabled
  },
  [`&.${formLabelClasses.error}`]: {
    color: theme.palette.error.main
  }
}));
var AsteriskComponent = styled3("span", {
  name: "MuiFormLabel",
  slot: "Asterisk",
  overridesResolver: (props, styles2) => styles2.asterisk
})(({
  theme
}) => ({
  [`&.${formLabelClasses.error}`]: {
    color: theme.palette.error.main
  }
}));
var FormLabel = /* @__PURE__ */ react.forwardRef(function FormLabel2(inProps, ref) {
  const props = useThemeProps2({
    props: inProps,
    name: "MuiFormLabel"
  });
  const {
    children,
    className,
    component = "label"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$a);
  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ["color", "required", "focused", "disabled", "error", "filled"]
  });
  const ownerState = _extends({}, props, {
    color: fcs.color || "primary",
    component,
    disabled: fcs.disabled,
    error: fcs.error,
    filled: fcs.filled,
    focused: fcs.focused,
    required: fcs.required
  });
  const classes = useUtilityClasses$5(ownerState);
  return /* @__PURE__ */ jsxRuntime.jsxs(FormLabelRoot, _extends({
    as: component,
    ownerState,
    className: clsx(classes.root, className),
    ref
  }, other, {
    children: [children, fcs.required && /* @__PURE__ */ jsxRuntime.jsxs(AsteriskComponent, {
      ownerState,
      "aria-hidden": true,
      className: classes.asterisk,
      children: [" ", "*"]
    })]
  }));
});
function getInputLabelUtilityClasses(slot) {
  return generateUtilityClass("MuiInputLabel", slot);
}
var inputLabelClasses = generateUtilityClasses("MuiInputLabel", ["root", "focused", "disabled", "error", "required", "asterisk", "formControl", "sizeSmall", "shrink", "animated", "standard", "filled", "outlined"]);
var _excluded$b = ["disableAnimation", "margin", "shrink", "variant"];
var useUtilityClasses$6 = (ownerState) => {
  const {
    classes,
    formControl,
    size,
    shrink,
    disableAnimation,
    variant,
    required
  } = ownerState;
  const slots = {
    root: ["root", formControl && "formControl", !disableAnimation && "animated", shrink && "shrink", size === "small" && "sizeSmall", variant],
    asterisk: [required && "asterisk"]
  };
  const composedClasses = composeClasses(slots, getInputLabelUtilityClasses, classes);
  return _extends({}, classes, composedClasses);
};
var InputLabelRoot = styled3(FormLabel, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiInputLabel",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [{
      [`& .${formLabelClasses.asterisk}`]: styles2.asterisk
    }, styles2.root, ownerState.formControl && styles2.formControl, ownerState.size === "small" && styles2.sizeSmall, ownerState.shrink && styles2.shrink, !ownerState.disableAnimation && styles2.animated, styles2[ownerState.variant]];
  }
})(({
  theme,
  ownerState
}) => _extends({
  display: "block",
  transformOrigin: "top left",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  maxWidth: "100%"
}, ownerState.formControl && {
  position: "absolute",
  left: 0,
  top: 0,
  transform: "translate(0, 20px) scale(1)"
}, ownerState.size === "small" && {
  transform: "translate(0, 17px) scale(1)"
}, ownerState.shrink && {
  transform: "translate(0, -1.5px) scale(0.75)",
  transformOrigin: "top left",
  maxWidth: "133%"
}, !ownerState.disableAnimation && {
  transition: theme.transitions.create(["color", "transform", "max-width"], {
    duration: theme.transitions.duration.shorter,
    easing: theme.transitions.easing.easeOut
  })
}, ownerState.variant === "filled" && _extends({
  zIndex: 1,
  pointerEvents: "none",
  transform: "translate(12px, 16px) scale(1)",
  maxWidth: "calc(100% - 24px)"
}, ownerState.size === "small" && {
  transform: "translate(12px, 13px) scale(1)"
}, ownerState.shrink && _extends({
  transform: "translate(12px, 7px) scale(0.75)",
  maxWidth: "calc(133% - 24px)"
}, ownerState.size === "small" && {
  transform: "translate(12px, 4px) scale(0.75)"
})), ownerState.variant === "outlined" && _extends({
  zIndex: 1,
  pointerEvents: "none",
  transform: "translate(14px, 16px) scale(1)",
  maxWidth: "calc(100% - 24px)"
}, ownerState.size === "small" && {
  transform: "translate(14px, 9px) scale(1)"
}, ownerState.shrink && {
  maxWidth: "calc(133% - 24px)",
  transform: "translate(14px, -9px) scale(0.75)"
})));
var InputLabel = /* @__PURE__ */ react.forwardRef(function InputLabel2(inProps, ref) {
  const props = useThemeProps2({
    name: "MuiInputLabel",
    props: inProps
  });
  const {
    disableAnimation = false,
    shrink: shrinkProp
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$b);
  const muiFormControl = useFormControl();
  let shrink = shrinkProp;
  if (typeof shrink === "undefined" && muiFormControl) {
    shrink = muiFormControl.filled || muiFormControl.focused || muiFormControl.adornedStart;
  }
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ["size", "variant", "required"]
  });
  const ownerState = _extends({}, props, {
    disableAnimation,
    formControl: muiFormControl,
    shrink,
    size: fcs.size,
    variant: fcs.variant,
    required: fcs.required
  });
  const classes = useUtilityClasses$6(ownerState);
  return /* @__PURE__ */ jsxRuntime.jsx(InputLabelRoot, _extends({
    "data-shrink": shrink,
    ownerState,
    ref
  }, other, {
    classes
  }));
});
/** @license React v17.0.2
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b4 = 60103;
var c5 = 60106;
var d4 = 60107;
var e4 = 60108;
var f3 = 60114;
var g4 = 60109;
var h3 = 60110;
var k4 = 60112;
var l3 = 60113;
var m4 = 60120;
var n4 = 60115;
var p4 = 60116;
var q4 = 60121;
var r4 = 60122;
var u3 = 60117;
var v3 = 60129;
var w3 = 60131;
if (typeof Symbol === "function" && Symbol.for) {
  x3 = Symbol.for;
  b4 = x3("react.element");
  c5 = x3("react.portal");
  d4 = x3("react.fragment");
  e4 = x3("react.strict_mode");
  f3 = x3("react.profiler");
  g4 = x3("react.provider");
  h3 = x3("react.context");
  k4 = x3("react.forward_ref");
  l3 = x3("react.suspense");
  m4 = x3("react.suspense_list");
  n4 = x3("react.memo");
  p4 = x3("react.lazy");
  q4 = x3("react.block");
  r4 = x3("react.server.block");
  u3 = x3("react.fundamental");
  v3 = x3("react.debug_trace_mode");
  w3 = x3("react.legacy_hidden");
}
var x3;
function y5(a3) {
  if (typeof a3 === "object" && a3 !== null) {
    var t3 = a3.$$typeof;
    switch (t3) {
      case b4:
        switch (a3 = a3.type, a3) {
          case d4:
          case f3:
          case e4:
          case l3:
          case m4:
            return a3;
          default:
            switch (a3 = a3 && a3.$$typeof, a3) {
              case h3:
              case k4:
              case p4:
              case n4:
              case g4:
                return a3;
              default:
                return t3;
            }
        }
      case c5:
        return t3;
    }
  }
}
var z4 = g4;
var A4 = b4;
var B4 = k4;
var C3 = d4;
var D4 = p4;
var E4 = n4;
var F5 = c5;
var G4 = f3;
var H4 = e4;
var I4 = l3;
var ContextConsumer3 = h3;
var ContextProvider3 = z4;
var Element4 = A4;
var ForwardRef3 = B4;
var Fragment4 = C3;
var Lazy3 = D4;
var Memo3 = E4;
var Portal5 = F5;
var Profiler4 = G4;
var StrictMode4 = H4;
var Suspense4 = I4;
var isAsyncMode3 = function() {
  return false;
};
var isConcurrentMode3 = function() {
  return false;
};
var isContextConsumer3 = function(a3) {
  return y5(a3) === h3;
};
var isContextProvider3 = function(a3) {
  return y5(a3) === g4;
};
var isElement3 = function(a3) {
  return typeof a3 === "object" && a3 !== null && a3.$$typeof === b4;
};
var isForwardRef3 = function(a3) {
  return y5(a3) === k4;
};
var isFragment3 = function(a3) {
  return y5(a3) === d4;
};
var isLazy3 = function(a3) {
  return y5(a3) === p4;
};
var isMemo3 = function(a3) {
  return y5(a3) === n4;
};
var isPortal3 = function(a3) {
  return y5(a3) === c5;
};
var isProfiler3 = function(a3) {
  return y5(a3) === f3;
};
var isStrictMode3 = function(a3) {
  return y5(a3) === e4;
};
var isSuspense3 = function(a3) {
  return y5(a3) === l3;
};
var isValidElementType3 = function(a3) {
  return typeof a3 === "string" || typeof a3 === "function" || a3 === d4 || a3 === f3 || a3 === v3 || a3 === e4 || a3 === l3 || a3 === m4 || a3 === w3 || typeof a3 === "object" && a3 !== null && (a3.$$typeof === p4 || a3.$$typeof === n4 || a3.$$typeof === g4 || a3.$$typeof === h3 || a3.$$typeof === k4 || a3.$$typeof === u3 || a3.$$typeof === q4 || a3[0] === r4) ? true : false;
};
var typeOf3 = y5;
var reactIs_production_min3 = {
  ContextConsumer: ContextConsumer3,
  ContextProvider: ContextProvider3,
  Element: Element4,
  ForwardRef: ForwardRef3,
  Fragment: Fragment4,
  Lazy: Lazy3,
  Memo: Memo3,
  Portal: Portal5,
  Profiler: Profiler4,
  StrictMode: StrictMode4,
  Suspense: Suspense4,
  isAsyncMode: isAsyncMode3,
  isConcurrentMode: isConcurrentMode3,
  isContextConsumer: isContextConsumer3,
  isContextProvider: isContextProvider3,
  isElement: isElement3,
  isForwardRef: isForwardRef3,
  isFragment: isFragment3,
  isLazy: isLazy3,
  isMemo: isMemo3,
  isPortal: isPortal3,
  isProfiler: isProfiler3,
  isStrictMode: isStrictMode3,
  isSuspense: isSuspense3,
  isValidElementType: isValidElementType3,
  typeOf: typeOf3
};
var reactIs3 = createCommonjsModule(function(module) {
  {
    module.exports = reactIs_production_min3;
  }
});
var ListContext = /* @__PURE__ */ react.createContext({});
function getListUtilityClass(slot) {
  return generateUtilityClass("MuiList", slot);
}
var listClasses = generateUtilityClasses("MuiList", ["root", "padding", "dense", "subheader"]);
var _excluded$c = ["children", "className", "component", "dense", "disablePadding", "subheader"];
var useUtilityClasses$7 = (ownerState) => {
  const {
    classes,
    disablePadding,
    dense,
    subheader
  } = ownerState;
  const slots = {
    root: ["root", !disablePadding && "padding", dense && "dense", subheader && "subheader"]
  };
  return composeClasses(slots, getListUtilityClass, classes);
};
var ListRoot = styled3("ul", {
  name: "MuiList",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, !ownerState.disablePadding && styles2.padding, ownerState.dense && styles2.dense, ownerState.subheader && styles2.subheader];
  }
})(({
  ownerState
}) => _extends({
  listStyle: "none",
  margin: 0,
  padding: 0,
  position: "relative"
}, !ownerState.disablePadding && {
  paddingTop: 8,
  paddingBottom: 8
}, ownerState.subheader && {
  paddingTop: 0
}));
var List = /* @__PURE__ */ react.forwardRef(function List2(inProps, ref) {
  const props = useThemeProps2({
    props: inProps,
    name: "MuiList"
  });
  const {
    children,
    className,
    component = "ul",
    dense = false,
    disablePadding = false,
    subheader
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$c);
  const context = react.useMemo(() => ({
    dense
  }), [dense]);
  const ownerState = _extends({}, props, {
    component,
    dense,
    disablePadding
  });
  const classes = useUtilityClasses$7(ownerState);
  return /* @__PURE__ */ jsxRuntime.jsx(ListContext.Provider, {
    value: context,
    children: /* @__PURE__ */ jsxRuntime.jsxs(ListRoot, _extends({
      as: component,
      className: clsx(classes.root, className),
      ref,
      ownerState
    }, other, {
      children: [subheader, children]
    }))
  });
});
var _excluded$d = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function nextItem(list, item, disableListWrap) {
  if (list === item) {
    return list.firstChild;
  }
  if (item && item.nextElementSibling) {
    return item.nextElementSibling;
  }
  return disableListWrap ? null : list.firstChild;
}
function previousItem(list, item, disableListWrap) {
  if (list === item) {
    return disableListWrap ? list.firstChild : list.lastChild;
  }
  if (item && item.previousElementSibling) {
    return item.previousElementSibling;
  }
  return disableListWrap ? null : list.lastChild;
}
function textCriteriaMatches(nextFocus, textCriteria) {
  if (textCriteria === void 0) {
    return true;
  }
  let text = nextFocus.innerText;
  if (text === void 0) {
    text = nextFocus.textContent;
  }
  text = text.trim().toLowerCase();
  if (text.length === 0) {
    return false;
  }
  if (textCriteria.repeating) {
    return text[0] === textCriteria.keys[0];
  }
  return text.indexOf(textCriteria.keys.join("")) === 0;
}
function moveFocus(list, currentFocus, disableListWrap, disabledItemsFocusable, traversalFunction, textCriteria) {
  let wrappedOnce = false;
  let nextFocus = traversalFunction(list, currentFocus, currentFocus ? disableListWrap : false);
  while (nextFocus) {
    if (nextFocus === list.firstChild) {
      if (wrappedOnce) {
        return false;
      }
      wrappedOnce = true;
    }
    const nextFocusDisabled = disabledItemsFocusable ? false : nextFocus.disabled || nextFocus.getAttribute("aria-disabled") === "true";
    if (!nextFocus.hasAttribute("tabindex") || !textCriteriaMatches(nextFocus, textCriteria) || nextFocusDisabled) {
      nextFocus = traversalFunction(list, nextFocus, disableListWrap);
    } else {
      nextFocus.focus();
      return true;
    }
  }
  return false;
}
var MenuList = /* @__PURE__ */ react.forwardRef(function MenuList2(props, ref) {
  const {
    actions,
    autoFocus = false,
    autoFocusItem = false,
    children,
    className,
    disabledItemsFocusable = false,
    disableListWrap = false,
    onKeyDown,
    variant = "selectedMenu"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$d);
  const listRef = react.useRef(null);
  const textCriteriaRef = react.useRef({
    keys: [],
    repeating: true,
    previousKeyMatched: true,
    lastTime: null
  });
  useEnhancedEffect(() => {
    if (autoFocus) {
      listRef.current.focus();
    }
  }, [autoFocus]);
  react.useImperativeHandle(actions, () => ({
    adjustStyleForScrollbar: (containerElement, theme) => {
      const noExplicitWidth = !listRef.current.style.width;
      if (containerElement.clientHeight < listRef.current.clientHeight && noExplicitWidth) {
        const scrollbarSize = `${getScrollbarSize(ownerDocument(containerElement))}px`;
        listRef.current.style[theme.direction === "rtl" ? "paddingLeft" : "paddingRight"] = scrollbarSize;
        listRef.current.style.width = `calc(100% + ${scrollbarSize})`;
      }
      return listRef.current;
    }
  }), []);
  const handleKeyDown2 = (event) => {
    const list = listRef.current;
    const key = event.key;
    const currentFocus = ownerDocument(list).activeElement;
    if (key === "ArrowDown") {
      event.preventDefault();
      moveFocus(list, currentFocus, disableListWrap, disabledItemsFocusable, nextItem);
    } else if (key === "ArrowUp") {
      event.preventDefault();
      moveFocus(list, currentFocus, disableListWrap, disabledItemsFocusable, previousItem);
    } else if (key === "Home") {
      event.preventDefault();
      moveFocus(list, null, disableListWrap, disabledItemsFocusable, nextItem);
    } else if (key === "End") {
      event.preventDefault();
      moveFocus(list, null, disableListWrap, disabledItemsFocusable, previousItem);
    } else if (key.length === 1) {
      const criteria = textCriteriaRef.current;
      const lowerKey = key.toLowerCase();
      const currTime = performance.now();
      if (criteria.keys.length > 0) {
        if (currTime - criteria.lastTime > 500) {
          criteria.keys = [];
          criteria.repeating = true;
          criteria.previousKeyMatched = true;
        } else if (criteria.repeating && lowerKey !== criteria.keys[0]) {
          criteria.repeating = false;
        }
      }
      criteria.lastTime = currTime;
      criteria.keys.push(lowerKey);
      const keepFocusOnCurrent = currentFocus && !criteria.repeating && textCriteriaMatches(currentFocus, criteria);
      if (criteria.previousKeyMatched && (keepFocusOnCurrent || moveFocus(list, currentFocus, false, disabledItemsFocusable, nextItem, criteria))) {
        event.preventDefault();
      } else {
        criteria.previousKeyMatched = false;
      }
    }
    if (onKeyDown) {
      onKeyDown(event);
    }
  };
  const handleRef = useForkRef(listRef, ref);
  let activeItemIndex = -1;
  react.Children.forEach(children, (child, index) => {
    if (!/* @__PURE__ */ react.isValidElement(child)) {
      return;
    }
    if (!child.props.disabled) {
      if (variant === "selectedMenu" && child.props.selected) {
        activeItemIndex = index;
      } else if (activeItemIndex === -1) {
        activeItemIndex = index;
      }
    }
  });
  const items = react.Children.map(children, (child, index) => {
    if (index === activeItemIndex) {
      const newChildProps = {};
      if (autoFocusItem) {
        newChildProps.autoFocus = true;
      }
      if (child.props.tabIndex === void 0 && variant === "selectedMenu") {
        newChildProps.tabIndex = 0;
      }
      return /* @__PURE__ */ react.cloneElement(child, newChildProps);
    }
    return child;
  });
  return /* @__PURE__ */ jsxRuntime.jsx(List, _extends({
    role: "menu",
    ref: handleRef,
    className,
    onKeyDown: handleKeyDown2,
    tabIndex: autoFocus ? 0 : -1
  }, other, {
    children: items
  }));
});
var reflow = (node) => node.scrollTop;
function getTransitionProps(props, options) {
  var _style$transitionDura, _style$transitionTimi;
  const {
    timeout,
    easing: easing2,
    style: style2 = {}
  } = props;
  return {
    duration: (_style$transitionDura = style2.transitionDuration) != null ? _style$transitionDura : typeof timeout === "number" ? timeout : timeout[options.mode] || 0,
    easing: (_style$transitionTimi = style2.transitionTimingFunction) != null ? _style$transitionTimi : typeof easing2 === "object" ? easing2[options.mode] : easing2,
    delay: style2.transitionDelay
  };
}
var _excluded$e = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function getScale(value) {
  return `scale(${value}, ${value ** 2})`;
}
var styles$1 = {
  entering: {
    opacity: 1,
    transform: getScale(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
};
var Grow = /* @__PURE__ */ react.forwardRef(function Grow2(props, ref) {
  const {
    addEndListener,
    appear = true,
    children,
    easing: easing2,
    in: inProp,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    style: style2,
    timeout = "auto",
    TransitionComponent = Transition
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$e);
  const timer = react.useRef();
  const autoTimeout = react.useRef();
  const theme = useTheme2();
  const nodeRef = react.useRef(null);
  const foreignRef = useForkRef(children.ref, ref);
  const handleRef = useForkRef(nodeRef, foreignRef);
  const normalizedTransitionCallback = (callback) => (maybeIsAppearing) => {
    if (callback) {
      const node = nodeRef.current;
      if (maybeIsAppearing === void 0) {
        callback(node);
      } else {
        callback(node, maybeIsAppearing);
      }
    }
  };
  const handleEntering = normalizedTransitionCallback(onEntering);
  const handleEnter = normalizedTransitionCallback((node, isAppearing) => {
    reflow(node);
    const {
      duration: transitionDuration,
      delay,
      easing: transitionTimingFunction
    } = getTransitionProps({
      style: style2,
      timeout,
      easing: easing2
    }, {
      mode: "enter"
    });
    let duration2;
    if (timeout === "auto") {
      duration2 = theme.transitions.getAutoHeightDuration(node.clientHeight);
      autoTimeout.current = duration2;
    } else {
      duration2 = transitionDuration;
    }
    node.style.transition = [theme.transitions.create("opacity", {
      duration: duration2,
      delay
    }), theme.transitions.create("transform", {
      duration: duration2 * 0.666,
      delay,
      easing: transitionTimingFunction
    })].join(",");
    if (onEnter) {
      onEnter(node, isAppearing);
    }
  });
  const handleEntered = normalizedTransitionCallback(onEntered);
  const handleExiting = normalizedTransitionCallback(onExiting);
  const handleExit = normalizedTransitionCallback((node) => {
    const {
      duration: transitionDuration,
      delay,
      easing: transitionTimingFunction
    } = getTransitionProps({
      style: style2,
      timeout,
      easing: easing2
    }, {
      mode: "exit"
    });
    let duration2;
    if (timeout === "auto") {
      duration2 = theme.transitions.getAutoHeightDuration(node.clientHeight);
      autoTimeout.current = duration2;
    } else {
      duration2 = transitionDuration;
    }
    node.style.transition = [theme.transitions.create("opacity", {
      duration: duration2,
      delay
    }), theme.transitions.create("transform", {
      duration: duration2 * 0.666,
      delay: delay || duration2 * 0.333,
      easing: transitionTimingFunction
    })].join(",");
    node.style.opacity = "0";
    node.style.transform = getScale(0.75);
    if (onExit) {
      onExit(node);
    }
  });
  const handleExited = normalizedTransitionCallback(onExited);
  const handleAddEndListener = (next) => {
    if (timeout === "auto") {
      timer.current = setTimeout(next, autoTimeout.current || 0);
    }
    if (addEndListener) {
      addEndListener(nodeRef.current, next);
    }
  };
  react.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);
  return /* @__PURE__ */ jsxRuntime.jsx(TransitionComponent, _extends({
    appear,
    in: inProp,
    nodeRef,
    onEnter: handleEnter,
    onEntered: handleEntered,
    onEntering: handleEntering,
    onExit: handleExit,
    onExited: handleExited,
    onExiting: handleExiting,
    addEndListener: handleAddEndListener,
    timeout: timeout === "auto" ? null : timeout
  }, other, {
    children: (state, childProps) => {
      return /* @__PURE__ */ react.cloneElement(children, _extends({
        style: _extends({
          opacity: 0,
          transform: getScale(0.75),
          visibility: state === "exited" && !inProp ? "hidden" : void 0
        }, styles$1[state], style2, children.props.style),
        ref: handleRef
      }, childProps));
    }
  }));
});
Grow.muiSupportAuto = true;
var _excluded$f = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
var styles$2 = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
};
var defaultTimeout = {
  enter: duration.enteringScreen,
  exit: duration.leavingScreen
};
var Fade = /* @__PURE__ */ react.forwardRef(function Fade2(props, ref) {
  const {
    addEndListener,
    appear = true,
    children,
    easing: easing2,
    in: inProp,
    onEnter,
    onEntered,
    onEntering,
    onExit,
    onExited,
    onExiting,
    style: style2,
    timeout = defaultTimeout,
    TransitionComponent = Transition
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$f);
  const theme = useTheme2();
  const nodeRef = react.useRef(null);
  const foreignRef = useForkRef(children.ref, ref);
  const handleRef = useForkRef(nodeRef, foreignRef);
  const normalizedTransitionCallback = (callback) => (maybeIsAppearing) => {
    if (callback) {
      const node = nodeRef.current;
      if (maybeIsAppearing === void 0) {
        callback(node);
      } else {
        callback(node, maybeIsAppearing);
      }
    }
  };
  const handleEntering = normalizedTransitionCallback(onEntering);
  const handleEnter = normalizedTransitionCallback((node, isAppearing) => {
    reflow(node);
    const transitionProps = getTransitionProps({
      style: style2,
      timeout,
      easing: easing2
    }, {
      mode: "enter"
    });
    node.style.webkitTransition = theme.transitions.create("opacity", transitionProps);
    node.style.transition = theme.transitions.create("opacity", transitionProps);
    if (onEnter) {
      onEnter(node, isAppearing);
    }
  });
  const handleEntered = normalizedTransitionCallback(onEntered);
  const handleExiting = normalizedTransitionCallback(onExiting);
  const handleExit = normalizedTransitionCallback((node) => {
    const transitionProps = getTransitionProps({
      style: style2,
      timeout,
      easing: easing2
    }, {
      mode: "exit"
    });
    node.style.webkitTransition = theme.transitions.create("opacity", transitionProps);
    node.style.transition = theme.transitions.create("opacity", transitionProps);
    if (onExit) {
      onExit(node);
    }
  });
  const handleExited = normalizedTransitionCallback(onExited);
  const handleAddEndListener = (next) => {
    if (addEndListener) {
      addEndListener(nodeRef.current, next);
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsx(TransitionComponent, _extends({
    appear,
    in: inProp,
    nodeRef,
    onEnter: handleEnter,
    onEntered: handleEntered,
    onEntering: handleEntering,
    onExit: handleExit,
    onExited: handleExited,
    onExiting: handleExiting,
    addEndListener: handleAddEndListener,
    timeout
  }, other, {
    children: (state, childProps) => {
      return /* @__PURE__ */ react.cloneElement(children, _extends({
        style: _extends({
          opacity: 0,
          visibility: state === "exited" && !inProp ? "hidden" : void 0
        }, styles$2[state], style2, children.props.style),
        ref: handleRef
      }, childProps));
    }
  }));
});
var _excluded$g = ["children", "components", "componentsProps", "className", "invisible", "open", "transitionDuration", "TransitionComponent"];
var extendUtilityClasses = (ownerState) => {
  const {
    classes
  } = ownerState;
  return classes;
};
var BackdropRoot = styled3("div", {
  name: "MuiBackdrop",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, ownerState.invisible && styles2.invisible];
  }
})(({
  ownerState
}) => _extends({
  position: "fixed",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  WebkitTapHighlightColor: "transparent"
}, ownerState.invisible && {
  backgroundColor: "transparent"
}));
var Backdrop = /* @__PURE__ */ react.forwardRef(function Backdrop2(inProps, ref) {
  var _componentsProps$root;
  const props = useThemeProps2({
    props: inProps,
    name: "MuiBackdrop"
  });
  const {
    children,
    components = {},
    componentsProps = {},
    className,
    invisible = false,
    open,
    transitionDuration,
    TransitionComponent = Fade
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$g);
  const ownerState = _extends({}, props, {
    invisible
  });
  const classes = extendUtilityClasses(ownerState);
  return /* @__PURE__ */ jsxRuntime.jsx(TransitionComponent, _extends({
    in: open,
    timeout: transitionDuration
  }, other, {
    children: /* @__PURE__ */ jsxRuntime.jsx(BackdropUnstyled, {
      className,
      invisible,
      components: _extends({
        Root: BackdropRoot
      }, components),
      componentsProps: {
        root: _extends({}, componentsProps.root, (!components.Root || !isHostComponent(components.Root)) && {
          ownerState: _extends({}, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.ownerState)
        })
      },
      classes,
      ref,
      children
    })
  }));
});
var _excluded$h = ["BackdropComponent", "closeAfterTransition", "children", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted"];
var extendUtilityClasses$1 = (ownerState) => {
  return ownerState.classes;
};
var ModalRoot = styled3("div", {
  name: "MuiModal",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.root, !ownerState.open && ownerState.exited && styles2.hidden];
  }
})(({
  theme,
  ownerState
}) => _extends({
  position: "fixed",
  zIndex: theme.zIndex.modal,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0
}, !ownerState.open && ownerState.exited && {
  visibility: "hidden"
}));
var ModalBackdrop = styled3(Backdrop, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (props, styles2) => {
    return styles2.backdrop;
  }
})({
  zIndex: -1
});
var Modal = /* @__PURE__ */ react.forwardRef(function Modal2(inProps, ref) {
  var _componentsProps$root;
  const props = useThemeProps2({
    name: "MuiModal",
    props: inProps
  });
  const {
    BackdropComponent = ModalBackdrop,
    closeAfterTransition = false,
    children,
    components = {},
    componentsProps = {},
    disableAutoFocus = false,
    disableEnforceFocus = false,
    disableEscapeKeyDown = false,
    disablePortal = false,
    disableRestoreFocus = false,
    disableScrollLock = false,
    hideBackdrop = false,
    keepMounted = false
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$h);
  const [exited, setExited] = react.useState(true);
  const commonProps = {
    closeAfterTransition,
    disableAutoFocus,
    disableEnforceFocus,
    disableEscapeKeyDown,
    disablePortal,
    disableRestoreFocus,
    disableScrollLock,
    hideBackdrop,
    keepMounted
  };
  const ownerState = _extends({}, props, commonProps, {
    exited
  });
  const classes = extendUtilityClasses$1(ownerState);
  return /* @__PURE__ */ jsxRuntime.jsx(ModalUnstyled, _extends({
    components: _extends({
      Root: ModalRoot
    }, components),
    componentsProps: {
      root: _extends({}, componentsProps.root, (!components.Root || !isHostComponent(components.Root)) && {
        ownerState: _extends({}, (_componentsProps$root = componentsProps.root) == null ? void 0 : _componentsProps$root.ownerState)
      })
    },
    BackdropComponent,
    onTransitionEnter: () => setExited(false),
    onTransitionExited: () => setExited(true),
    ref
  }, other, {
    classes
  }, commonProps, {
    children
  }));
});
function getPopoverUtilityClass(slot) {
  return generateUtilityClass("MuiPopover", slot);
}
var popoverClasses = generateUtilityClasses("MuiPopover", ["root", "paper"]);
var _excluded$i = ["onEntering"];
var _excluded22 = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps"];
function getOffsetTop(rect, vertical) {
  let offset2 = 0;
  if (typeof vertical === "number") {
    offset2 = vertical;
  } else if (vertical === "center") {
    offset2 = rect.height / 2;
  } else if (vertical === "bottom") {
    offset2 = rect.height;
  }
  return offset2;
}
function getOffsetLeft(rect, horizontal) {
  let offset2 = 0;
  if (typeof horizontal === "number") {
    offset2 = horizontal;
  } else if (horizontal === "center") {
    offset2 = rect.width / 2;
  } else if (horizontal === "right") {
    offset2 = rect.width;
  }
  return offset2;
}
function getTransformOriginValue(transformOrigin) {
  return [transformOrigin.horizontal, transformOrigin.vertical].map((n5) => typeof n5 === "number" ? `${n5}px` : n5).join(" ");
}
function resolveAnchorEl(anchorEl) {
  return typeof anchorEl === "function" ? anchorEl() : anchorEl;
}
var useUtilityClasses$8 = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"],
    paper: ["paper"]
  };
  return composeClasses(slots, getPopoverUtilityClass, classes);
};
var PopoverRoot = styled3(Modal, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (props, styles2) => styles2.root
})({});
var PopoverPaper = styled3(Paper, {
  name: "MuiPopover",
  slot: "Paper",
  overridesResolver: (props, styles2) => styles2.paper
})({
  position: "absolute",
  overflowY: "auto",
  overflowX: "hidden",
  minWidth: 16,
  minHeight: 16,
  maxWidth: "calc(100% - 32px)",
  maxHeight: "calc(100% - 32px)",
  outline: 0
});
var Popover = /* @__PURE__ */ react.forwardRef(function Popover2(inProps, ref) {
  const props = useThemeProps2({
    props: inProps,
    name: "MuiPopover"
  });
  const {
    action,
    anchorEl,
    anchorOrigin = {
      vertical: "top",
      horizontal: "left"
    },
    anchorPosition,
    anchorReference = "anchorEl",
    children,
    className,
    container: containerProp,
    elevation = 8,
    marginThreshold = 16,
    open,
    PaperProps = {},
    transformOrigin = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent = Grow,
    transitionDuration: transitionDurationProp = "auto",
    TransitionProps: {
      onEntering
    } = {}
  } = props, TransitionProps = _objectWithoutPropertiesLoose(props.TransitionProps, _excluded$i), other = _objectWithoutPropertiesLoose(props, _excluded22);
  const paperRef = react.useRef();
  const handlePaperRef = useForkRef(paperRef, PaperProps.ref);
  const ownerState = _extends({}, props, {
    anchorOrigin,
    anchorReference,
    elevation,
    marginThreshold,
    PaperProps,
    transformOrigin,
    TransitionComponent,
    transitionDuration: transitionDurationProp,
    TransitionProps
  });
  const classes = useUtilityClasses$8(ownerState);
  const getAnchorOffset = react.useCallback(() => {
    if (anchorReference === "anchorPosition") {
      return anchorPosition;
    }
    const resolvedAnchorEl = resolveAnchorEl(anchorEl);
    const anchorElement = resolvedAnchorEl && resolvedAnchorEl.nodeType === 1 ? resolvedAnchorEl : ownerDocument(paperRef.current).body;
    const anchorRect = anchorElement.getBoundingClientRect();
    return {
      top: anchorRect.top + getOffsetTop(anchorRect, anchorOrigin.vertical),
      left: anchorRect.left + getOffsetLeft(anchorRect, anchorOrigin.horizontal)
    };
  }, [anchorEl, anchorOrigin.horizontal, anchorOrigin.vertical, anchorPosition, anchorReference]);
  const getTransformOrigin = react.useCallback((elemRect) => {
    return {
      vertical: getOffsetTop(elemRect, transformOrigin.vertical),
      horizontal: getOffsetLeft(elemRect, transformOrigin.horizontal)
    };
  }, [transformOrigin.horizontal, transformOrigin.vertical]);
  const getPositioningStyle = react.useCallback((element) => {
    const elemRect = {
      width: element.offsetWidth,
      height: element.offsetHeight
    };
    const elemTransformOrigin = getTransformOrigin(elemRect);
    if (anchorReference === "none") {
      return {
        top: null,
        left: null,
        transformOrigin: getTransformOriginValue(elemTransformOrigin)
      };
    }
    const anchorOffset = getAnchorOffset();
    let top3 = anchorOffset.top - elemTransformOrigin.vertical;
    let left3 = anchorOffset.left - elemTransformOrigin.horizontal;
    const bottom3 = top3 + elemRect.height;
    const right3 = left3 + elemRect.width;
    const containerWindow = ownerWindow(resolveAnchorEl(anchorEl));
    const heightThreshold = containerWindow.innerHeight - marginThreshold;
    const widthThreshold = containerWindow.innerWidth - marginThreshold;
    if (top3 < marginThreshold) {
      const diff = top3 - marginThreshold;
      top3 -= diff;
      elemTransformOrigin.vertical += diff;
    } else if (bottom3 > heightThreshold) {
      const diff = bottom3 - heightThreshold;
      top3 -= diff;
      elemTransformOrigin.vertical += diff;
    }
    if (left3 < marginThreshold) {
      const diff = left3 - marginThreshold;
      left3 -= diff;
      elemTransformOrigin.horizontal += diff;
    } else if (right3 > widthThreshold) {
      const diff = right3 - widthThreshold;
      left3 -= diff;
      elemTransformOrigin.horizontal += diff;
    }
    return {
      top: `${Math.round(top3)}px`,
      left: `${Math.round(left3)}px`,
      transformOrigin: getTransformOriginValue(elemTransformOrigin)
    };
  }, [anchorEl, anchorReference, getAnchorOffset, getTransformOrigin, marginThreshold]);
  const setPositioningStyles = react.useCallback(() => {
    const element = paperRef.current;
    if (!element) {
      return;
    }
    const positioning = getPositioningStyle(element);
    if (positioning.top !== null) {
      element.style.top = positioning.top;
    }
    if (positioning.left !== null) {
      element.style.left = positioning.left;
    }
    element.style.transformOrigin = positioning.transformOrigin;
  }, [getPositioningStyle]);
  const handleEntering = (element, isAppearing) => {
    if (onEntering) {
      onEntering(element, isAppearing);
    }
    setPositioningStyles();
  };
  react.useEffect(() => {
    if (open) {
      setPositioningStyles();
    }
  });
  react.useImperativeHandle(action, () => open ? {
    updatePosition: () => {
      setPositioningStyles();
    }
  } : null, [open, setPositioningStyles]);
  react.useEffect(() => {
    if (!open) {
      return void 0;
    }
    const handleResize = debounce(() => {
      setPositioningStyles();
    });
    const containerWindow = ownerWindow(anchorEl);
    containerWindow.addEventListener("resize", handleResize);
    return () => {
      handleResize.clear();
      containerWindow.removeEventListener("resize", handleResize);
    };
  }, [anchorEl, open, setPositioningStyles]);
  let transitionDuration = transitionDurationProp;
  if (transitionDurationProp === "auto" && !TransitionComponent.muiSupportAuto) {
    transitionDuration = void 0;
  }
  const container = containerProp || (anchorEl ? ownerDocument(resolveAnchorEl(anchorEl)).body : void 0);
  return /* @__PURE__ */ jsxRuntime.jsx(PopoverRoot, _extends({
    BackdropProps: {
      invisible: true
    },
    className: clsx(classes.root, className),
    container,
    open,
    ref,
    ownerState
  }, other, {
    children: /* @__PURE__ */ jsxRuntime.jsx(TransitionComponent, _extends({
      appear: true,
      in: open,
      onEntering: handleEntering,
      timeout: transitionDuration
    }, TransitionProps, {
      children: /* @__PURE__ */ jsxRuntime.jsx(PopoverPaper, _extends({
        elevation
      }, PaperProps, {
        ref: handlePaperRef,
        className: clsx(classes.paper, PaperProps.className),
        children
      }))
    }))
  }));
});
function getMenuUtilityClass(slot) {
  return generateUtilityClass("MuiMenu", slot);
}
var menuClasses = generateUtilityClasses("MuiMenu", ["root", "paper", "list"]);
var _excluded$j = ["onEntering"];
var _excluded2$1 = ["autoFocus", "children", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant"];
var RTL_ORIGIN = {
  vertical: "top",
  horizontal: "right"
};
var LTR_ORIGIN = {
  vertical: "top",
  horizontal: "left"
};
var useUtilityClasses$9 = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  };
  return composeClasses(slots, getMenuUtilityClass, classes);
};
var MenuRoot = styled3(Popover, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (props, styles2) => styles2.root
})({});
var MenuPaper = styled3(Paper, {
  name: "MuiMenu",
  slot: "Paper",
  overridesResolver: (props, styles2) => styles2.paper
})({
  maxHeight: "calc(100% - 96px)",
  WebkitOverflowScrolling: "touch"
});
var MenuMenuList = styled3(MenuList, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (props, styles2) => styles2.list
})({
  outline: 0
});
var Menu = /* @__PURE__ */ react.forwardRef(function Menu2(inProps, ref) {
  const props = useThemeProps2({
    props: inProps,
    name: "MuiMenu"
  });
  const {
    autoFocus = true,
    children,
    disableAutoFocusItem = false,
    MenuListProps = {},
    onClose,
    open,
    PaperProps = {},
    PopoverClasses,
    transitionDuration = "auto",
    TransitionProps: {
      onEntering
    } = {},
    variant = "selectedMenu"
  } = props, TransitionProps = _objectWithoutPropertiesLoose(props.TransitionProps, _excluded$j), other = _objectWithoutPropertiesLoose(props, _excluded2$1);
  const theme = useTheme2();
  const isRtl = theme.direction === "rtl";
  const ownerState = _extends({}, props, {
    autoFocus,
    disableAutoFocusItem,
    MenuListProps,
    onEntering,
    PaperProps,
    transitionDuration,
    TransitionProps,
    variant
  });
  const classes = useUtilityClasses$9(ownerState);
  const autoFocusItem = autoFocus && !disableAutoFocusItem && open;
  const menuListActionsRef = react.useRef(null);
  const handleEntering = (element, isAppearing) => {
    if (menuListActionsRef.current) {
      menuListActionsRef.current.adjustStyleForScrollbar(element, theme);
    }
    if (onEntering) {
      onEntering(element, isAppearing);
    }
  };
  const handleListKeyDown = (event) => {
    if (event.key === "Tab") {
      event.preventDefault();
      if (onClose) {
        onClose(event, "tabKeyDown");
      }
    }
  };
  let activeItemIndex = -1;
  react.Children.map(children, (child, index) => {
    if (!/* @__PURE__ */ react.isValidElement(child)) {
      return;
    }
    if (!child.props.disabled) {
      if (variant === "selectedMenu" && child.props.selected) {
        activeItemIndex = index;
      } else if (activeItemIndex === -1) {
        activeItemIndex = index;
      }
    }
  });
  return /* @__PURE__ */ jsxRuntime.jsx(MenuRoot, _extends({
    classes: PopoverClasses,
    onClose,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: isRtl ? "right" : "left"
    },
    transformOrigin: isRtl ? RTL_ORIGIN : LTR_ORIGIN,
    PaperProps: _extends({
      component: MenuPaper
    }, PaperProps, {
      classes: _extends({}, PaperProps.classes, {
        root: classes.paper
      })
    }),
    className: classes.root,
    open,
    ref,
    transitionDuration,
    TransitionProps: _extends({
      onEntering: handleEntering
    }, TransitionProps),
    ownerState
  }, other, {
    children: /* @__PURE__ */ jsxRuntime.jsx(MenuMenuList, _extends({
      onKeyDown: handleListKeyDown,
      actions: menuListActionsRef,
      autoFocus: autoFocus && (activeItemIndex === -1 || disableAutoFocusItem),
      autoFocusItem,
      variant
    }, MenuListProps, {
      className: clsx(classes.list, MenuListProps.className),
      children
    }))
  }));
});
function getNativeSelectUtilityClasses(slot) {
  return generateUtilityClass("MuiNativeSelect", slot);
}
var nativeSelectClasses = generateUtilityClasses("MuiNativeSelect", ["root", "select", "filled", "outlined", "standard", "disabled", "icon", "iconOpen", "iconFilled", "iconOutlined", "iconStandard", "nativeInput"]);
var _excluded$k = ["className", "disabled", "IconComponent", "inputRef", "variant"];
var useUtilityClasses$a = (ownerState) => {
  const {
    classes,
    variant,
    disabled,
    open
  } = ownerState;
  const slots = {
    select: ["select", variant, disabled && "disabled"],
    icon: ["icon", `icon${capitalize(variant)}`, open && "iconOpen", disabled && "disabled"]
  };
  return composeClasses(slots, getNativeSelectUtilityClasses, classes);
};
var nativeSelectSelectStyles = ({
  ownerState,
  theme
}) => _extends({
  MozAppearance: "none",
  WebkitAppearance: "none",
  userSelect: "none",
  borderRadius: 0,
  cursor: "pointer",
  "&:focus": {
    backgroundColor: theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.05)",
    borderRadius: 0
  },
  "&::-ms-expand": {
    display: "none"
  },
  [`&.${nativeSelectClasses.disabled}`]: {
    cursor: "default"
  },
  "&[multiple]": {
    height: "auto"
  },
  "&:not([multiple]) option, &:not([multiple]) optgroup": {
    backgroundColor: theme.palette.background.paper
  },
  "&&&": {
    paddingRight: 24,
    minWidth: 16
  }
}, ownerState.variant === "filled" && {
  "&&&": {
    paddingRight: 32
  }
}, ownerState.variant === "outlined" && {
  borderRadius: theme.shape.borderRadius,
  "&:focus": {
    borderRadius: theme.shape.borderRadius
  },
  "&&&": {
    paddingRight: 32
  }
});
var NativeSelectSelect = styled3("select", {
  name: "MuiNativeSelect",
  slot: "Select",
  shouldForwardProp: rootShouldForwardProp,
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.select, styles2[ownerState.variant]];
  }
})(nativeSelectSelectStyles);
var nativeSelectIconStyles = ({
  ownerState,
  theme
}) => _extends({
  position: "absolute",
  right: 0,
  top: "calc(50% - .5em)",
  pointerEvents: "none",
  color: theme.palette.action.active,
  [`&.${nativeSelectClasses.disabled}`]: {
    color: theme.palette.action.disabled
  }
}, ownerState.open && {
  transform: "rotate(180deg)"
}, ownerState.variant === "filled" && {
  right: 7
}, ownerState.variant === "outlined" && {
  right: 7
});
var NativeSelectIcon = styled3("svg", {
  name: "MuiNativeSelect",
  slot: "Icon",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.icon, ownerState.variant && styles2[`icon${capitalize(ownerState.variant)}`], ownerState.open && styles2.iconOpen];
  }
})(nativeSelectIconStyles);
var NativeSelectInput = /* @__PURE__ */ react.forwardRef(function NativeSelectInput2(props, ref) {
  const {
    className,
    disabled,
    IconComponent,
    inputRef,
    variant = "standard"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$k);
  const ownerState = _extends({}, props, {
    disabled,
    variant
  });
  const classes = useUtilityClasses$a(ownerState);
  return /* @__PURE__ */ jsxRuntime.jsxs(react.Fragment, {
    children: [/* @__PURE__ */ jsxRuntime.jsx(NativeSelectSelect, _extends({
      ownerState,
      className: clsx(classes.select, className),
      disabled,
      ref: inputRef || ref
    }, other)), props.multiple ? null : /* @__PURE__ */ jsxRuntime.jsx(NativeSelectIcon, {
      as: IconComponent,
      ownerState,
      className: classes.icon
    })]
  });
});
function getSelectUtilityClasses(slot) {
  return generateUtilityClass("MuiSelect", slot);
}
var selectClasses = generateUtilityClasses("MuiSelect", ["root", "select", "filled", "outlined", "standard", "disabled", "focused", "icon", "iconOpen", "iconFilled", "iconOutlined", "iconStandard", "nativeInput"]);
var _excluded$l = ["aria-describedby", "aria-label", "autoFocus", "autoWidth", "children", "className", "defaultValue", "disabled", "displayEmpty", "IconComponent", "inputRef", "labelId", "MenuProps", "multiple", "name", "onBlur", "onChange", "onClose", "onFocus", "onOpen", "open", "readOnly", "renderValue", "SelectDisplayProps", "tabIndex", "type", "value", "variant"];
var SelectSelect = styled3("div", {
  name: "MuiSelect",
  slot: "Select",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [
      {
        [`&.${selectClasses.select}`]: styles2.select
      },
      {
        [`&.${selectClasses.select}`]: styles2[ownerState.variant]
      }
    ];
  }
})(nativeSelectSelectStyles, {
  [`&.${selectClasses.select}`]: {
    height: "auto",
    minHeight: "1.4375em",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
  }
});
var SelectIcon = styled3("svg", {
  name: "MuiSelect",
  slot: "Icon",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [styles2.icon, ownerState.variant && styles2[`icon${capitalize(ownerState.variant)}`], ownerState.open && styles2.iconOpen];
  }
})(nativeSelectIconStyles);
var SelectNativeInput = styled3("input", {
  shouldForwardProp: (prop) => slotShouldForwardProp(prop) && prop !== "classes",
  name: "MuiSelect",
  slot: "NativeInput",
  overridesResolver: (props, styles2) => styles2.nativeInput
})({
  bottom: 0,
  left: 0,
  position: "absolute",
  opacity: 0,
  pointerEvents: "none",
  width: "100%",
  boxSizing: "border-box"
});
function areEqualValues(a3, b5) {
  if (typeof b5 === "object" && b5 !== null) {
    return a3 === b5;
  }
  return String(a3) === String(b5);
}
function isEmpty2(display2) {
  return display2 == null || typeof display2 === "string" && !display2.trim();
}
var useUtilityClasses$b = (ownerState) => {
  const {
    classes,
    variant,
    disabled,
    open
  } = ownerState;
  const slots = {
    select: ["select", variant, disabled && "disabled"],
    icon: ["icon", `icon${capitalize(variant)}`, open && "iconOpen", disabled && "disabled"],
    nativeInput: ["nativeInput"]
  };
  return composeClasses(slots, getSelectUtilityClasses, classes);
};
var SelectInput = /* @__PURE__ */ react.forwardRef(function SelectInput2(props, ref) {
  const {
    "aria-describedby": ariaDescribedby,
    "aria-label": ariaLabel,
    autoFocus,
    autoWidth,
    children,
    className,
    defaultValue,
    disabled,
    displayEmpty,
    IconComponent,
    inputRef: inputRefProp,
    labelId,
    MenuProps = {},
    multiple,
    name,
    onBlur,
    onChange,
    onClose,
    onFocus,
    onOpen,
    open: openProp,
    readOnly,
    renderValue,
    SelectDisplayProps = {},
    tabIndex: tabIndexProp,
    value: valueProp,
    variant = "standard"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$l);
  const [value, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue,
    name: "Select"
  });
  const inputRef = react.useRef(null);
  const displayRef = react.useRef(null);
  const [displayNode, setDisplayNode] = react.useState(null);
  const {
    current: isOpenControlled
  } = react.useRef(openProp != null);
  const [menuMinWidthState, setMenuMinWidthState] = react.useState();
  const [openState, setOpenState] = react.useState(false);
  const handleRef = useForkRef(ref, inputRefProp);
  const handleDisplayRef = react.useCallback((node) => {
    displayRef.current = node;
    if (node) {
      setDisplayNode(node);
    }
  }, []);
  react.useImperativeHandle(handleRef, () => ({
    focus: () => {
      displayRef.current.focus();
    },
    node: inputRef.current,
    value
  }), [value]);
  react.useEffect(() => {
    if (autoFocus) {
      displayRef.current.focus();
    }
  }, [autoFocus]);
  react.useEffect(() => {
    const label = ownerDocument(displayRef.current).getElementById(labelId);
    if (label) {
      const handler = () => {
        if (getSelection().isCollapsed) {
          displayRef.current.focus();
        }
      };
      label.addEventListener("click", handler);
      return () => {
        label.removeEventListener("click", handler);
      };
    }
    return void 0;
  }, [labelId]);
  const update = (open2, event) => {
    if (open2) {
      if (onOpen) {
        onOpen(event);
      }
    } else if (onClose) {
      onClose(event);
    }
    if (!isOpenControlled) {
      setMenuMinWidthState(autoWidth ? null : displayNode.clientWidth);
      setOpenState(open2);
    }
  };
  const handleMouseDown = (event) => {
    if (event.button !== 0) {
      return;
    }
    event.preventDefault();
    displayRef.current.focus();
    update(true, event);
  };
  const handleClose = (event) => {
    update(false, event);
  };
  const childrenArray = react.Children.toArray(children);
  const handleChange = (event) => {
    const index = childrenArray.map((child2) => child2.props.value).indexOf(event.target.value);
    if (index === -1) {
      return;
    }
    const child = childrenArray[index];
    setValueState(child.props.value);
    if (onChange) {
      onChange(event, child);
    }
  };
  const handleItemClick = (child) => (event) => {
    let newValue;
    if (!event.currentTarget.hasAttribute("tabindex")) {
      return;
    }
    if (multiple) {
      newValue = Array.isArray(value) ? value.slice() : [];
      const itemIndex = value.indexOf(child.props.value);
      if (itemIndex === -1) {
        newValue.push(child.props.value);
      } else {
        newValue.splice(itemIndex, 1);
      }
    } else {
      newValue = child.props.value;
    }
    if (child.props.onClick) {
      child.props.onClick(event);
    }
    if (value !== newValue) {
      setValueState(newValue);
      if (onChange) {
        const nativeEvent = event.nativeEvent || event;
        const clonedEvent = new nativeEvent.constructor(nativeEvent.type, nativeEvent);
        Object.defineProperty(clonedEvent, "target", {
          writable: true,
          value: {
            value: newValue,
            name
          }
        });
        onChange(clonedEvent, child);
      }
    }
    if (!multiple) {
      update(false, event);
    }
  };
  const handleKeyDown2 = (event) => {
    if (!readOnly) {
      const validKeys = [
        " ",
        "ArrowUp",
        "ArrowDown",
        "Enter"
      ];
      if (validKeys.indexOf(event.key) !== -1) {
        event.preventDefault();
        update(true, event);
      }
    }
  };
  const open = displayNode !== null && (isOpenControlled ? openProp : openState);
  const handleBlur = (event) => {
    if (!open && onBlur) {
      Object.defineProperty(event, "target", {
        writable: true,
        value: {
          value,
          name
        }
      });
      onBlur(event);
    }
  };
  delete other["aria-invalid"];
  let display2;
  let displaySingle;
  const displayMultiple = [];
  let computeDisplay = false;
  if (isFilled({
    value
  }) || displayEmpty) {
    if (renderValue) {
      display2 = renderValue(value);
    } else {
      computeDisplay = true;
    }
  }
  const items = childrenArray.map((child) => {
    if (!/* @__PURE__ */ react.isValidElement(child)) {
      return null;
    }
    let selected;
    if (multiple) {
      if (!Array.isArray(value)) {
        throw new Error(formatMuiErrorMessage(2));
      }
      selected = value.some((v4) => areEqualValues(v4, child.props.value));
      if (selected && computeDisplay) {
        displayMultiple.push(child.props.children);
      }
    } else {
      selected = areEqualValues(value, child.props.value);
      if (selected && computeDisplay) {
        displaySingle = child.props.children;
      }
    }
    return /* @__PURE__ */ react.cloneElement(child, {
      "aria-selected": selected ? "true" : void 0,
      onClick: handleItemClick(child),
      onKeyUp: (event) => {
        if (event.key === " ") {
          event.preventDefault();
        }
        if (child.props.onKeyUp) {
          child.props.onKeyUp(event);
        }
      },
      role: "option",
      selected,
      value: void 0,
      "data-value": child.props.value
    });
  });
  if (computeDisplay) {
    display2 = multiple ? displayMultiple.join(", ") : displaySingle;
  }
  let menuMinWidth = menuMinWidthState;
  if (!autoWidth && isOpenControlled && displayNode) {
    menuMinWidth = displayNode.clientWidth;
  }
  let tabIndex;
  if (typeof tabIndexProp !== "undefined") {
    tabIndex = tabIndexProp;
  } else {
    tabIndex = disabled ? null : 0;
  }
  const buttonId = SelectDisplayProps.id || (name ? `mui-component-select-${name}` : void 0);
  const ownerState = _extends({}, props, {
    variant,
    value,
    open
  });
  const classes = useUtilityClasses$b(ownerState);
  return /* @__PURE__ */ jsxRuntime.jsxs(react.Fragment, {
    children: [/* @__PURE__ */ jsxRuntime.jsx(SelectSelect, _extends({
      ref: handleDisplayRef,
      tabIndex,
      role: "button",
      "aria-disabled": disabled ? "true" : void 0,
      "aria-expanded": open ? "true" : "false",
      "aria-haspopup": "listbox",
      "aria-label": ariaLabel,
      "aria-labelledby": [labelId, buttonId].filter(Boolean).join(" ") || void 0,
      "aria-describedby": ariaDescribedby,
      onKeyDown: handleKeyDown2,
      onMouseDown: disabled || readOnly ? null : handleMouseDown,
      onBlur: handleBlur,
      onFocus
    }, SelectDisplayProps, {
      ownerState,
      className: clsx(classes.select, className, SelectDisplayProps.className),
      id: buttonId,
      children: isEmpty2(display2) ? /* @__PURE__ */ jsxRuntime.jsx("span", {
        className: "notranslate",
        dangerouslySetInnerHTML: {
          __html: "&#8203;"
        }
      }) : display2
    })), /* @__PURE__ */ jsxRuntime.jsx(SelectNativeInput, _extends({
      value: Array.isArray(value) ? value.join(",") : value,
      name,
      ref: inputRef,
      "aria-hidden": true,
      onChange: handleChange,
      tabIndex: -1,
      disabled,
      className: classes.nativeInput,
      autoFocus,
      ownerState
    }, other)), /* @__PURE__ */ jsxRuntime.jsx(SelectIcon, {
      as: IconComponent,
      className: classes.icon,
      ownerState
    }), /* @__PURE__ */ jsxRuntime.jsx(Menu, _extends({
      id: `menu-${name || ""}`,
      anchorEl: displayNode,
      open,
      onClose: handleClose,
      anchorOrigin: {
        vertical: "bottom",
        horizontal: "center"
      },
      transformOrigin: {
        vertical: "top",
        horizontal: "center"
      }
    }, MenuProps, {
      MenuListProps: _extends({
        "aria-labelledby": labelId,
        role: "listbox",
        disableListWrap: true
      }, MenuProps.MenuListProps),
      PaperProps: _extends({}, MenuProps.PaperProps, {
        style: _extends({
          minWidth: menuMinWidth
        }, MenuProps.PaperProps != null ? MenuProps.PaperProps.style : null)
      }),
      children: items
    }))]
  });
});
function getInputUtilityClass(slot) {
  return generateUtilityClass("MuiInput", slot);
}
var inputClasses = generateUtilityClasses("MuiInput", ["root", "formControl", "focused", "disabled", "colorSecondary", "underline", "error", "sizeSmall", "multiline", "fullWidth", "input", "inputSizeSmall", "inputMultiline", "inputTypeSearch"]);
var _excluded$m = ["disableUnderline", "components", "componentsProps", "fullWidth", "inputComponent", "multiline", "type"];
var useUtilityClasses$c = (ownerState) => {
  const {
    classes,
    disableUnderline
  } = ownerState;
  const slots = {
    root: ["root", !disableUnderline && "underline"],
    input: ["input"]
  };
  const composedClasses = composeClasses(slots, getInputUtilityClass, classes);
  return _extends({}, classes, composedClasses);
};
var InputRoot = styled3(InputBaseRoot, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiInput",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [...rootOverridesResolver(props, styles2), !ownerState.disableUnderline && styles2.underline];
  }
})(({
  theme,
  ownerState
}) => {
  const light2 = theme.palette.mode === "light";
  const bottomLineColor = light2 ? "rgba(0, 0, 0, 0.42)" : "rgba(255, 255, 255, 0.7)";
  return _extends({
    position: "relative"
  }, ownerState.formControl && {
    "label + &": {
      marginTop: 16
    }
  }, !ownerState.disableUnderline && {
    "&:after": {
      borderBottom: `2px solid ${theme.palette[ownerState.color].main}`,
      left: 0,
      bottom: 0,
      content: '""',
      position: "absolute",
      right: 0,
      transform: "scaleX(0)",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeOut
      }),
      pointerEvents: "none"
    },
    [`&.${inputClasses.focused}:after`]: {
      transform: "scaleX(1)"
    },
    [`&.${inputClasses.error}:after`]: {
      borderBottomColor: theme.palette.error.main,
      transform: "scaleX(1)"
    },
    "&:before": {
      borderBottom: `1px solid ${bottomLineColor}`,
      left: 0,
      bottom: 0,
      content: '"\\00a0"',
      position: "absolute",
      right: 0,
      transition: theme.transitions.create("border-bottom-color", {
        duration: theme.transitions.duration.shorter
      }),
      pointerEvents: "none"
    },
    [`&:hover:not(.${inputClasses.disabled}):before`]: {
      borderBottom: `2px solid ${theme.palette.text.primary}`,
      "@media (hover: none)": {
        borderBottom: `1px solid ${bottomLineColor}`
      }
    },
    [`&.${inputClasses.disabled}:before`]: {
      borderBottomStyle: "dotted"
    }
  });
});
var InputInput = styled3(InputBaseComponent, {
  name: "MuiInput",
  slot: "Input",
  overridesResolver: inputOverridesResolver
})({});
var Input = /* @__PURE__ */ react.forwardRef(function Input2(inProps, ref) {
  const props = useThemeProps2({
    props: inProps,
    name: "MuiInput"
  });
  const {
    disableUnderline,
    components = {},
    componentsProps: componentsPropsProp,
    fullWidth = false,
    inputComponent = "input",
    multiline = false,
    type = "text"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$m);
  const classes = useUtilityClasses$c(props);
  const ownerState = {
    disableUnderline
  };
  const inputComponentsProps = {
    root: {
      ownerState
    }
  };
  const componentsProps = componentsPropsProp ? deepmerge(componentsPropsProp, inputComponentsProps) : inputComponentsProps;
  return /* @__PURE__ */ jsxRuntime.jsx(InputBase, _extends({
    components: _extends({
      Root: InputRoot,
      Input: InputInput
    }, components),
    componentsProps,
    fullWidth,
    inputComponent,
    multiline,
    ref,
    type
  }, other, {
    classes
  }));
});
Input.muiName = "Input";
function getFilledInputUtilityClass(slot) {
  return generateUtilityClass("MuiFilledInput", slot);
}
var filledInputClasses = generateUtilityClasses("MuiFilledInput", ["root", "colorSecondary", "underline", "focused", "disabled", "adornedStart", "adornedEnd", "error", "sizeSmall", "multiline", "hiddenLabel", "input", "inputSizeSmall", "inputHiddenLabel", "inputMultiline", "inputAdornedStart", "inputAdornedEnd"]);
var _excluded$n = ["disableUnderline", "components", "componentsProps", "fullWidth", "hiddenLabel", "inputComponent", "multiline", "type"];
var useUtilityClasses$d = (ownerState) => {
  const {
    classes,
    disableUnderline
  } = ownerState;
  const slots = {
    root: ["root", !disableUnderline && "underline"],
    input: ["input"]
  };
  const composedClasses = composeClasses(slots, getFilledInputUtilityClass, classes);
  return _extends({}, classes, composedClasses);
};
var FilledInputRoot = styled3(InputBaseRoot, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiFilledInput",
  slot: "Root",
  overridesResolver: (props, styles2) => {
    const {
      ownerState
    } = props;
    return [...rootOverridesResolver(props, styles2), !ownerState.disableUnderline && styles2.underline];
  }
})(({
  theme,
  ownerState
}) => {
  const light2 = theme.palette.mode === "light";
  const bottomLineColor = light2 ? "rgba(0, 0, 0, 0.42)" : "rgba(255, 255, 255, 0.7)";
  const backgroundColor2 = light2 ? "rgba(0, 0, 0, 0.06)" : "rgba(255, 255, 255, 0.09)";
  return _extends({
    position: "relative",
    backgroundColor: backgroundColor2,
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
    transition: theme.transitions.create("background-color", {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeOut
    }),
    "&:hover": {
      backgroundColor: light2 ? "rgba(0, 0, 0, 0.09)" : "rgba(255, 255, 255, 0.13)",
      "@media (hover: none)": {
        backgroundColor: backgroundColor2
      }
    },
    [`&.${filledInputClasses.focused}`]: {
      backgroundColor: backgroundColor2
    },
    [`&.${filledInputClasses.disabled}`]: {
      backgroundColor: light2 ? "rgba(0, 0, 0, 0.12)" : "rgba(255, 255, 255, 0.12)"
    }
  }, !ownerState.disableUnderline && {
    "&:after": {
      borderBottom: `2px solid ${theme.palette[ownerState.color].main}`,
      left: 0,
      bottom: 0,
      content: '""',
      position: "absolute",
      right: 0,
      transform: "scaleX(0)",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeOut
      }),
      pointerEvents: "none"
    },
    [`&.${filledInputClasses.focused}:after`]: {
      transform: "scaleX(1)"
    },
    [`&.${filledInputClasses.error}:after`]: {
      borderBottomColor: theme.palette.error.main,
      transform: "scaleX(1)"
    },
    "&:before": {
      borderBottom: `1px solid ${bottomLineColor}`,
      left: 0,
      bottom: 0,
      content: '"\\00a0"',
      position: "absolute",
      right: 0,
      transition: theme.transitions.create("border-bottom-color", {
        duration: theme.transitions.duration.shorter
      }),
      pointerEvents: "none"
    },
    [`&:hover:not(.${filledInputClasses.disabled}):before`]: {
      borderBottom: `1px solid ${theme.palette.text.primary}`
    },
    [`&.${filledInputClasses.disabled}:before`]: {
      borderBottomStyle: "dotted"
    }
  }, ownerState.startAdornment && {
    paddingLeft: 12
  }, ownerState.endAdornment && {
    paddingRight: 12
  }, ownerState.multiline && _extends({
    padding: "25px 12px 8px"
  }, ownerState.size === "small" && {
    paddingTop: 21,
    paddingBottom: 4
  }, ownerState.hiddenLabel && {
    paddingTop: 16,
    paddingBottom: 17
  }));
});
var FilledInputInput = styled3(InputBaseComponent, {
  name: "MuiFilledInput",
  slot: "Input",
  overridesResolver: inputOverridesResolver
})(({
  theme,
  ownerState
}) => _extends({
  paddingTop: 25,
  paddingRight: 12,
  paddingBottom: 8,
  paddingLeft: 12,
  "&:-webkit-autofill": {
    WebkitBoxShadow: theme.palette.mode === "light" ? null : "0 0 0 100px #266798 inset",
    WebkitTextFillColor: theme.palette.mode === "light" ? null : "#fff",
    caretColor: theme.palette.mode === "light" ? null : "#fff",
    borderTopLeftRadius: "inherit",
    borderTopRightRadius: "inherit"
  }
}, ownerState.size === "small" && {
  paddingTop: 21,
  paddingBottom: 4
}, ownerState.hiddenLabel && {
  paddingTop: 16,
  paddingBottom: 17
}, ownerState.multiline && {
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  paddingRight: 0
}, ownerState.startAdornment && {
  paddingLeft: 0
}, ownerState.endAdornment && {
  paddingRight: 0
}, ownerState.hiddenLabel && ownerState.size === "small" && {
  paddingTop: 8,
  paddingBottom: 9
}));
var FilledInput = /* @__PURE__ */ react.forwardRef(function FilledInput2(inProps, ref) {
  const props = useThemeProps2({
    props: inProps,
    name: "MuiFilledInput"
  });
  const {
    components = {},
    componentsProps: componentsPropsProp,
    fullWidth = false,
    inputComponent = "input",
    multiline = false,
    type = "text"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$n);
  const ownerState = _extends({}, props, {
    fullWidth,
    inputComponent,
    multiline,
    type
  });
  const classes = useUtilityClasses$d(props);
  const filledInputComponentsProps = {
    root: {
      ownerState
    },
    input: {
      ownerState
    }
  };
  const componentsProps = componentsPropsProp ? deepmerge(componentsPropsProp, filledInputComponentsProps) : filledInputComponentsProps;
  return /* @__PURE__ */ jsxRuntime.jsx(InputBase, _extends({
    components: _extends({
      Root: FilledInputRoot,
      Input: FilledInputInput
    }, components),
    componentsProps,
    fullWidth,
    inputComponent,
    multiline,
    ref,
    type
  }, other, {
    classes
  }));
});
FilledInput.muiName = "Input";
var _excluded$o = ["children", "classes", "className", "label", "notched"];
var NotchedOutlineRoot = styled3("fieldset")({
  textAlign: "left",
  position: "absolute",
  bottom: 0,
  right: 0,
  top: -5,
  left: 0,
  margin: 0,
  padding: "0 8px",
  pointerEvents: "none",
  borderRadius: "inherit",
  borderStyle: "solid",
  borderWidth: 1,
  overflow: "hidden",
  minWidth: "0%"
});
var NotchedOutlineLegend = styled3("legend", {
  skipSx: true
})(({
  ownerState,
  theme
}) => _extends({}, ownerState.label === void 0 && {
  padding: 0,
  lineHeight: "11px",
  transition: theme.transitions.create("width", {
    duration: 150,
    easing: theme.transitions.easing.easeOut
  })
}, ownerState.label !== void 0 && _extends({
  display: "block",
  width: "auto",
  padding: 0,
  height: 11,
  fontSize: "0.75em",
  visibility: "hidden",
  maxWidth: 0.01,
  transition: theme.transitions.create("max-width", {
    duration: 50,
    easing: theme.transitions.easing.easeOut
  }),
  "& > span": {
    paddingLeft: 5,
    paddingRight: 5,
    display: "inline-block"
  }
}, ownerState.notched && {
  maxWidth: "100%",
  transition: theme.transitions.create("max-width", {
    duration: 100,
    easing: theme.transitions.easing.easeOut,
    delay: 50
  })
})));
function NotchedOutline(props) {
  const {
    className,
    label,
    notched
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$o);
  const ownerState = _extends({}, props, {
    notched,
    label
  });
  return /* @__PURE__ */ jsxRuntime.jsx(NotchedOutlineRoot, _extends({
    "aria-hidden": true,
    className,
    ownerState
  }, other, {
    children: /* @__PURE__ */ jsxRuntime.jsx(NotchedOutlineLegend, {
      ownerState,
      children: label ? /* @__PURE__ */ jsxRuntime.jsx("span", {
        children: label
      }) : /* @__PURE__ */ jsxRuntime.jsx("span", {
        className: "notranslate",
        dangerouslySetInnerHTML: {
          __html: "&#8203;"
        }
      })
    })
  }));
}
function getOutlinedInputUtilityClass(slot) {
  return generateUtilityClass("MuiOutlinedInput", slot);
}
var outlinedInputClasses = generateUtilityClasses("MuiOutlinedInput", ["root", "colorSecondary", "focused", "disabled", "adornedStart", "adornedEnd", "error", "sizeSmall", "multiline", "notchedOutline", "input", "inputSizeSmall", "inputMultiline", "inputAdornedStart", "inputAdornedEnd"]);
var _excluded$p = ["components", "fullWidth", "inputComponent", "label", "multiline", "notched", "type"];
var useUtilityClasses$e = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"],
    notchedOutline: ["notchedOutline"],
    input: ["input"]
  };
  const composedClasses = composeClasses(slots, getOutlinedInputUtilityClass, classes);
  return _extends({}, classes, composedClasses);
};
var OutlinedInputRoot = styled3(InputBaseRoot, {
  shouldForwardProp: (prop) => rootShouldForwardProp(prop) || prop === "classes",
  name: "MuiOutlinedInput",
  slot: "Root",
  overridesResolver: rootOverridesResolver
})(({
  theme,
  ownerState
}) => {
  const borderColor2 = theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)";
  return _extends({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
      borderColor: theme.palette.text.primary
    },
    "@media (hover: none)": {
      [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
        borderColor: borderColor2
      }
    },
    [`&.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]: {
      borderColor: theme.palette[ownerState.color].main,
      borderWidth: 2
    },
    [`&.${outlinedInputClasses.error} .${outlinedInputClasses.notchedOutline}`]: {
      borderColor: theme.palette.error.main
    },
    [`&.${outlinedInputClasses.disabled} .${outlinedInputClasses.notchedOutline}`]: {
      borderColor: theme.palette.action.disabled
    }
  }, ownerState.startAdornment && {
    paddingLeft: 14
  }, ownerState.endAdornment && {
    paddingRight: 14
  }, ownerState.multiline && _extends({
    padding: "16.5px 14px"
  }, ownerState.size === "small" && {
    padding: "8.5px 14px"
  }));
});
var NotchedOutlineRoot$1 = styled3(NotchedOutline, {
  name: "MuiOutlinedInput",
  slot: "NotchedOutline",
  overridesResolver: (props, styles2) => styles2.notchedOutline
})(({
  theme
}) => ({
  borderColor: theme.palette.mode === "light" ? "rgba(0, 0, 0, 0.23)" : "rgba(255, 255, 255, 0.23)"
}));
var OutlinedInputInput = styled3(InputBaseComponent, {
  name: "MuiOutlinedInput",
  slot: "Input",
  overridesResolver: inputOverridesResolver
})(({
  theme,
  ownerState
}) => _extends({
  padding: "16.5px 14px",
  "&:-webkit-autofill": {
    WebkitBoxShadow: theme.palette.mode === "light" ? null : "0 0 0 100px #266798 inset",
    WebkitTextFillColor: theme.palette.mode === "light" ? null : "#fff",
    caretColor: theme.palette.mode === "light" ? null : "#fff",
    borderRadius: "inherit"
  }
}, ownerState.size === "small" && {
  padding: "8.5px 14px"
}, ownerState.multiline && {
  padding: 0
}, ownerState.startAdornment && {
  paddingLeft: 0
}, ownerState.endAdornment && {
  paddingRight: 0
}));
var OutlinedInput = /* @__PURE__ */ react.forwardRef(function OutlinedInput2(inProps, ref) {
  const props = useThemeProps2({
    props: inProps,
    name: "MuiOutlinedInput"
  });
  const {
    components = {},
    fullWidth = false,
    inputComponent = "input",
    label,
    multiline = false,
    notched,
    type = "text"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$p);
  const classes = useUtilityClasses$e(props);
  return /* @__PURE__ */ jsxRuntime.jsx(InputBase, _extends({
    components: _extends({
      Root: OutlinedInputRoot,
      Input: OutlinedInputInput
    }, components),
    renderSuffix: (state) => /* @__PURE__ */ jsxRuntime.jsx(NotchedOutlineRoot$1, {
      className: classes.notchedOutline,
      label,
      notched: typeof notched !== "undefined" ? notched : Boolean(state.startAdornment || state.filled || state.focused)
    }),
    fullWidth,
    inputComponent,
    multiline,
    ref,
    type
  }, other, {
    classes: _extends({}, classes, {
      notchedOutline: null
    })
  }));
});
OutlinedInput.muiName = "Input";
var _Input;
var _FilledInput;
var _excluded$q = ["autoWidth", "children", "classes", "className", "displayEmpty", "IconComponent", "id", "input", "inputProps", "label", "labelId", "MenuProps", "multiple", "native", "onClose", "onOpen", "open", "renderValue", "SelectDisplayProps", "variant"];
var _excluded2$2 = ["root"];
var useUtilityClasses$f = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getSelectUtilityClasses, classes);
};
var Select = /* @__PURE__ */ react.forwardRef(function Select2(inProps, ref) {
  const props = useThemeProps2({
    name: "MuiSelect",
    props: inProps
  });
  const {
    autoWidth = false,
    children,
    classes: classesProp = {},
    className,
    displayEmpty = false,
    IconComponent = ArrowDropDownIcon,
    id: id2,
    input,
    inputProps,
    label,
    labelId,
    MenuProps,
    multiple = false,
    native = false,
    onClose,
    onOpen,
    open,
    renderValue,
    SelectDisplayProps,
    variant: variantProps = "outlined"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$q);
  const inputComponent = native ? NativeSelectInput : SelectInput;
  const muiFormControl = useFormControl();
  const fcs = formControlState({
    props,
    muiFormControl,
    states: ["variant"]
  });
  const variant = fcs.variant || variantProps;
  const InputComponent = input || {
    standard: _Input || (_Input = /* @__PURE__ */ jsxRuntime.jsx(Input, {})),
    outlined: /* @__PURE__ */ jsxRuntime.jsx(OutlinedInput, {
      label
    }),
    filled: _FilledInput || (_FilledInput = /* @__PURE__ */ jsxRuntime.jsx(FilledInput, {}))
  }[variant];
  const ownerState = _extends({}, props, {
    classes: classesProp
  });
  const classes = useUtilityClasses$f(ownerState);
  const otherClasses = _objectWithoutPropertiesLoose(classesProp, _excluded2$2);
  const inputComponentRef = useForkRef(ref, InputComponent.ref);
  return /* @__PURE__ */ react.cloneElement(InputComponent, _extends({
    inputComponent,
    inputProps: _extends({
      children,
      IconComponent,
      variant,
      type: void 0,
      multiple
    }, native ? {
      id: id2
    } : {
      autoWidth,
      displayEmpty,
      labelId,
      MenuProps,
      onClose,
      onOpen,
      open,
      renderValue,
      SelectDisplayProps: _extends({
        id: id2
      }, SelectDisplayProps)
    }, inputProps, {
      classes: inputProps ? deepmerge(otherClasses, inputProps.classes) : otherClasses
    }, input ? input.props.inputProps : {})
  }, multiple && native && variant === "outlined" ? {
    notched: true
  } : {}, {
    ref: inputComponentRef,
    className: clsx(classes.root, InputComponent.props.className, className)
  }, other));
});
Select.muiName = "Select";
function getTextFieldUtilityClass(slot) {
  return generateUtilityClass("MuiTextField", slot);
}
var textFieldClasses = generateUtilityClasses("MuiTextField", ["root"]);
var _excluded$r = ["autoComplete", "autoFocus", "children", "className", "color", "defaultValue", "disabled", "error", "FormHelperTextProps", "fullWidth", "helperText", "id", "InputLabelProps", "inputProps", "InputProps", "inputRef", "label", "maxRows", "minRows", "multiline", "name", "onBlur", "onChange", "onFocus", "placeholder", "required", "rows", "select", "SelectProps", "type", "value", "variant"];
var variantComponent = {
  standard: Input,
  filled: FilledInput,
  outlined: OutlinedInput
};
var useUtilityClasses$g = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"]
  };
  return composeClasses(slots, getTextFieldUtilityClass, classes);
};
var TextFieldRoot = styled3(FormControl, {
  name: "MuiTextField",
  slot: "Root",
  overridesResolver: (props, styles2) => styles2.root
})({});
var TextField = /* @__PURE__ */ react.forwardRef(function TextField2(inProps, ref) {
  const props = useThemeProps2({
    props: inProps,
    name: "MuiTextField"
  });
  const {
    autoComplete,
    autoFocus = false,
    children,
    className,
    color: color2 = "primary",
    defaultValue,
    disabled = false,
    error = false,
    FormHelperTextProps,
    fullWidth = false,
    helperText,
    id: id2,
    InputLabelProps,
    inputProps,
    InputProps,
    inputRef,
    label,
    maxRows,
    minRows,
    multiline = false,
    name,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    required = false,
    rows,
    select = false,
    SelectProps,
    type,
    value,
    variant = "outlined"
  } = props, other = _objectWithoutPropertiesLoose(props, _excluded$r);
  const ownerState = _extends({}, props, {
    autoFocus,
    color: color2,
    disabled,
    error,
    fullWidth,
    multiline,
    required,
    select,
    variant
  });
  const classes = useUtilityClasses$g(ownerState);
  const InputMore = {};
  if (variant === "outlined") {
    if (InputLabelProps && typeof InputLabelProps.shrink !== "undefined") {
      InputMore.notched = InputLabelProps.shrink;
    }
    if (label) {
      var _InputLabelProps$requ;
      const displayRequired = (_InputLabelProps$requ = InputLabelProps == null ? void 0 : InputLabelProps.required) != null ? _InputLabelProps$requ : required;
      InputMore.label = /* @__PURE__ */ jsxRuntime.jsxs(react.Fragment, {
        children: [label, displayRequired && " *"]
      });
    }
  }
  if (select) {
    if (!SelectProps || !SelectProps.native) {
      InputMore.id = void 0;
    }
    InputMore["aria-describedby"] = void 0;
  }
  const helperTextId = helperText && id2 ? `${id2}-helper-text` : void 0;
  const inputLabelId = label && id2 ? `${id2}-label` : void 0;
  const InputComponent = variantComponent[variant];
  const InputElement = /* @__PURE__ */ jsxRuntime.jsx(InputComponent, _extends({
    "aria-describedby": helperTextId,
    autoComplete,
    autoFocus,
    defaultValue,
    fullWidth,
    multiline,
    name,
    rows,
    maxRows,
    minRows,
    type,
    value,
    id: id2,
    inputRef,
    onBlur,
    onChange,
    onFocus,
    placeholder,
    inputProps
  }, InputMore, InputProps));
  return /* @__PURE__ */ jsxRuntime.jsxs(TextFieldRoot, _extends({
    className: clsx(classes.root, className),
    disabled,
    error,
    fullWidth,
    ref,
    required,
    color: color2,
    variant,
    ownerState
  }, other, {
    children: [label && /* @__PURE__ */ jsxRuntime.jsx(InputLabel, _extends({
      htmlFor: id2,
      id: inputLabelId
    }, InputLabelProps, {
      children: label
    })), select ? /* @__PURE__ */ jsxRuntime.jsx(Select, _extends({
      "aria-describedby": helperTextId,
      id: id2,
      labelId: inputLabelId,
      value,
      input: InputElement
    }, SelectProps, {
      children
    })) : InputElement, helperText && /* @__PURE__ */ jsxRuntime.jsx(FormHelperText, _extends({
      id: helperTextId
    }, FormHelperTextProps, {
      children: helperText
    }))]
  }));
});
function fieldToTextField(_a) {
  var disabled = _a.disabled, _b = _a.field, fieldOnBlur = _b.onBlur, field = __rest(_b, ["onBlur"]), _c = _a.form, isSubmitting = _c.isSubmitting, touched = _c.touched, errors = _c.errors, onBlur = _a.onBlur, helperText = _a.helperText, props = __rest(_a, ["disabled", "field", "form", "onBlur", "helperText"]);
  var fieldError = (0, import_formik_esm_c35373e02.g)(errors, field.name);
  var showError = (0, import_formik_esm_c35373e02.g)(touched, field.name) && !!fieldError;
  return __assign(__assign({error: showError, helperText: showError ? fieldError : helperText, disabled: disabled !== null && disabled !== void 0 ? disabled : isSubmitting, onBlur: onBlur !== null && onBlur !== void 0 ? onBlur : function(e5) {
    fieldOnBlur(e5 !== null && e5 !== void 0 ? e5 : field.name);
  }}, field), props);
}
function TextField$1(_a) {
  var children = _a.children, props = __rest(_a, ["children"]);
  return react.createElement(TextField, __assign({}, fieldToTextField(props)), children);
}
TextField$1.displayName = "FormikMaterialUITextField";

// docs/snowpack/pkg/common/useTheme-b14ef58f.js
var useTheme_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = useTheme3;
  var React2 = _interopRequireWildcard(react);
  var _defaultTheme = interopRequireDefault(defaultTheme_1);
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function")
      return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop2) {
      return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
      return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
      return {default: obj};
    }
    var cache2 = _getRequireWildcardCache(nodeInterop);
    if (cache2 && cache2.has(obj)) {
      return cache2.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj.default = obj;
    if (cache2) {
      cache2.set(obj, newObj);
    }
    return newObj;
  }
  function useTheme3() {
    const theme = (0, esm$1.useTheme)(_defaultTheme.default);
    return theme;
  }
});

// docs/snowpack/pkg/@mui/material/Tooltip.js
var utils = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.getTransitionProps = getTransitionProps2;
  exports.reflow = void 0;
  const reflow2 = (node) => node.scrollTop;
  exports.reflow = reflow2;
  function getTransitionProps2(props, options) {
    var _style$transitionDura, _style$transitionTimi;
    const {
      timeout,
      easing: easing2,
      style: style2 = {}
    } = props;
    return {
      duration: (_style$transitionDura = style2.transitionDuration) != null ? _style$transitionDura : typeof timeout === "number" ? timeout : timeout[options.mode] || 0,
      easing: (_style$transitionTimi = style2.transitionTimingFunction) != null ? _style$transitionTimi : typeof easing2 === "object" ? easing2[options.mode] : easing2,
      delay: style2.transitionDelay
    };
  }
});
var Grow_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _extends22 = interopRequireDefault(_extends_1);
  var _objectWithoutPropertiesLoose22 = interopRequireDefault(objectWithoutPropertiesLoose);
  var React2 = _interopRequireWildcard(react);
  var _propTypes = interopRequireDefault(propTypes);
  var _useTheme = interopRequireDefault(useTheme_1);
  var _useForkRef = interopRequireDefault(useForkRef2);
  const _excluded8 = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function")
      return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop2) {
      return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
      return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
      return {default: obj};
    }
    var cache2 = _getRequireWildcardCache(nodeInterop);
    if (cache2 && cache2.has(obj)) {
      return cache2.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj.default = obj;
    if (cache2) {
      cache2.set(obj, newObj);
    }
    return newObj;
  }
  function getScale2(value) {
    return `scale(${value}, ${value ** 2})`;
  }
  const styles2 = {
    entering: {
      opacity: 1,
      transform: getScale2(1)
    },
    entered: {
      opacity: 1,
      transform: "none"
    }
  };
  const Grow4 = /* @__PURE__ */ React2.forwardRef(function Grow5(props, ref) {
    const {
      addEndListener,
      appear = true,
      children,
      easing: easing2,
      in: inProp,
      onEnter,
      onEntered,
      onEntering,
      onExit,
      onExited,
      onExiting,
      style: style2,
      timeout = "auto",
      TransitionComponent = esm2.Transition
    } = props, other = (0, _objectWithoutPropertiesLoose22.default)(props, _excluded8);
    const timer = React2.useRef();
    const autoTimeout = React2.useRef();
    const theme = (0, _useTheme.default)();
    const nodeRef = React2.useRef(null);
    const foreignRef = (0, _useForkRef.default)(children.ref, ref);
    const handleRef = (0, _useForkRef.default)(nodeRef, foreignRef);
    const normalizedTransitionCallback = (callback) => (maybeIsAppearing) => {
      if (callback) {
        const node = nodeRef.current;
        if (maybeIsAppearing === void 0) {
          callback(node);
        } else {
          callback(node, maybeIsAppearing);
        }
      }
    };
    const handleEntering = normalizedTransitionCallback(onEntering);
    const handleEnter = normalizedTransitionCallback((node, isAppearing) => {
      (0, utils.reflow)(node);
      const {
        duration: transitionDuration,
        delay,
        easing: transitionTimingFunction
      } = (0, utils.getTransitionProps)({
        style: style2,
        timeout,
        easing: easing2
      }, {
        mode: "enter"
      });
      let duration2;
      if (timeout === "auto") {
        duration2 = theme.transitions.getAutoHeightDuration(node.clientHeight);
        autoTimeout.current = duration2;
      } else {
        duration2 = transitionDuration;
      }
      node.style.transition = [theme.transitions.create("opacity", {
        duration: duration2,
        delay
      }), theme.transitions.create("transform", {
        duration: duration2 * 0.666,
        delay,
        easing: transitionTimingFunction
      })].join(",");
      if (onEnter) {
        onEnter(node, isAppearing);
      }
    });
    const handleEntered = normalizedTransitionCallback(onEntered);
    const handleExiting = normalizedTransitionCallback(onExiting);
    const handleExit = normalizedTransitionCallback((node) => {
      const {
        duration: transitionDuration,
        delay,
        easing: transitionTimingFunction
      } = (0, utils.getTransitionProps)({
        style: style2,
        timeout,
        easing: easing2
      }, {
        mode: "exit"
      });
      let duration2;
      if (timeout === "auto") {
        duration2 = theme.transitions.getAutoHeightDuration(node.clientHeight);
        autoTimeout.current = duration2;
      } else {
        duration2 = transitionDuration;
      }
      node.style.transition = [theme.transitions.create("opacity", {
        duration: duration2,
        delay
      }), theme.transitions.create("transform", {
        duration: duration2 * 0.666,
        delay: delay || duration2 * 0.333,
        easing: transitionTimingFunction
      })].join(",");
      node.style.opacity = "0";
      node.style.transform = getScale2(0.75);
      if (onExit) {
        onExit(node);
      }
    });
    const handleExited = normalizedTransitionCallback(onExited);
    const handleAddEndListener = (next) => {
      if (timeout === "auto") {
        timer.current = setTimeout(next, autoTimeout.current || 0);
      }
      if (addEndListener) {
        addEndListener(nodeRef.current, next);
      }
    };
    React2.useEffect(() => {
      return () => {
        clearTimeout(timer.current);
      };
    }, []);
    return /* @__PURE__ */ (0, jsxRuntime.jsx)(TransitionComponent, (0, _extends22.default)({
      appear,
      in: inProp,
      nodeRef,
      onEnter: handleEnter,
      onEntered: handleEntered,
      onEntering: handleEntering,
      onExit: handleExit,
      onExited: handleExited,
      onExiting: handleExiting,
      addEndListener: handleAddEndListener,
      timeout: timeout === "auto" ? null : timeout
    }, other, {
      children: (state, childProps) => {
        return /* @__PURE__ */ React2.cloneElement(children, (0, _extends22.default)({
          style: (0, _extends22.default)({
            opacity: 0,
            transform: getScale2(0.75),
            visibility: state === "exited" && !inProp ? "hidden" : void 0
          }, styles2[state], style2, children.props.style),
          ref: handleRef
        }, childProps));
      }
    }));
  });
  Grow4.muiSupportAuto = true;
  var _default = Grow4;
  exports.default = _default;
});
var Grow3 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
      return _Grow.default;
    }
  });
  var _Grow = interopRequireDefault(Grow_1);
});
var top2 = "top";
var bottom2 = "bottom";
var right2 = "right";
var left2 = "left";
var auto = "auto";
var basePlacements = [top2, bottom2, right2, left2];
var start = "start";
var end = "end";
var clippingParents = "clippingParents";
var viewport = "viewport";
var popper = "popper";
var reference = "reference";
var variationPlacements = /* @__PURE__ */ basePlacements.reduce(function(acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /* @__PURE__ */ [].concat(basePlacements, [auto]).reduce(function(acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []);
var beforeRead = "beforeRead";
var read = "read";
var afterRead = "afterRead";
var beforeMain = "beforeMain";
var main = "main";
var afterMain = "afterMain";
var beforeWrite = "beforeWrite";
var write = "write";
var afterWrite = "afterWrite";
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];
function getNodeName(element) {
  return element ? (element.nodeName || "").toLowerCase() : null;
}
function getWindow(node) {
  if (node == null) {
    return window;
  }
  if (node.toString() !== "[object Window]") {
    var ownerDocument3 = node.ownerDocument;
    return ownerDocument3 ? ownerDocument3.defaultView || window : window;
  }
  return node;
}
function isElement4(node) {
  var OwnElement = getWindow(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}
function isHTMLElement(node) {
  var OwnElement = getWindow(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}
function isShadowRoot(node) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  var OwnElement = getWindow(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}
function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function(name) {
    var style2 = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name];
    if (!isHTMLElement(element) || !getNodeName(element)) {
      return;
    }
    Object.assign(element.style, style2);
    Object.keys(attributes).forEach(function(name2) {
      var value = attributes[name2];
      if (value === false) {
        element.removeAttribute(name2);
      } else {
        element.setAttribute(name2, value === true ? "" : value);
      }
    });
  });
}
function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;
  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }
  return function() {
    Object.keys(state.elements).forEach(function(name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]);
      var style2 = styleProperties.reduce(function(style3, property2) {
        style3[property2] = "";
        return style3;
      }, {});
      if (!isHTMLElement(element) || !getNodeName(element)) {
        return;
      }
      Object.assign(element.style, style2);
      Object.keys(attributes).forEach(function(attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
}
var applyStyles$1 = {
  name: "applyStyles",
  enabled: true,
  phase: "write",
  fn: applyStyles,
  effect,
  requires: ["computeStyles"]
};
function getBasePlacement(placement) {
  return placement.split("-")[0];
}
function getBoundingClientRect(element, includeScale) {
  var rect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;
  return {
    width: rect.width / scaleX,
    height: rect.height / scaleY,
    top: rect.top / scaleY,
    right: rect.right / scaleX,
    bottom: rect.bottom / scaleY,
    left: rect.left / scaleX,
    x: rect.left / scaleX,
    y: rect.top / scaleY
  };
}
function getLayoutRect(element) {
  var clientRect = getBoundingClientRect(element);
  var width2 = element.offsetWidth;
  var height2 = element.offsetHeight;
  if (Math.abs(clientRect.width - width2) <= 1) {
    width2 = clientRect.width;
  }
  if (Math.abs(clientRect.height - height2) <= 1) {
    height2 = clientRect.height;
  }
  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width2,
    height: height2
  };
}
function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode();
  if (parent.contains(child)) {
    return true;
  } else if (rootNode && isShadowRoot(rootNode)) {
    var next = child;
    do {
      if (next && parent.isSameNode(next)) {
        return true;
      }
      next = next.parentNode || next.host;
    } while (next);
  }
  return false;
}
function getComputedStyle(element) {
  return getWindow(element).getComputedStyle(element);
}
function isTableElement(element) {
  return ["table", "td", "th"].indexOf(getNodeName(element)) >= 0;
}
function getDocumentElement(element) {
  return ((isElement4(element) ? element.ownerDocument : element.document) || window.document).documentElement;
}
function getParentNode(element) {
  if (getNodeName(element) === "html") {
    return element;
  }
  return element.assignedSlot || element.parentNode || (isShadowRoot(element) ? element.host : null) || getDocumentElement(element);
}
function getTrueOffsetParent(element) {
  if (!isHTMLElement(element) || getComputedStyle(element).position === "fixed") {
    return null;
  }
  return element.offsetParent;
}
function getContainingBlock(element) {
  var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1;
  var isIE = navigator.userAgent.indexOf("Trident") !== -1;
  if (isIE && isHTMLElement(element)) {
    var elementCss = getComputedStyle(element);
    if (elementCss.position === "fixed") {
      return null;
    }
  }
  var currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && ["html", "body"].indexOf(getNodeName(currentNode)) < 0) {
    var css2 = getComputedStyle(currentNode);
    if (css2.transform !== "none" || css2.perspective !== "none" || css2.contain === "paint" || ["transform", "perspective"].indexOf(css2.willChange) !== -1 || isFirefox && css2.willChange === "filter" || isFirefox && css2.filter && css2.filter !== "none") {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }
  return null;
}
function getOffsetParent(element) {
  var window2 = getWindow(element);
  var offsetParent = getTrueOffsetParent(element);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle(offsetParent).position === "static")) {
    return window2;
  }
  return offsetParent || getContainingBlock(element) || window2;
}
function getMainAxisFromPlacement(placement) {
  return ["top", "bottom"].indexOf(placement) >= 0 ? "x" : "y";
}
var max = Math.max;
var min = Math.min;
var round2 = Math.round;
function within(min$1, value, max$1) {
  return max(min$1, min(value, max$1));
}
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function mergePaddingObject(paddingObject) {
  return Object.assign({}, getFreshSideObject(), paddingObject);
}
function expandToHashMap(value, keys2) {
  return keys2.reduce(function(hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}
var toPaddingObject = function toPaddingObject2(padding2, state) {
  padding2 = typeof padding2 === "function" ? padding2(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding2;
  return mergePaddingObject(typeof padding2 !== "number" ? padding2 : expandToHashMap(padding2, basePlacements));
};
function arrow(_ref) {
  var _state$modifiersData$;
  var state = _ref.state, name = _ref.name, options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var basePlacement = getBasePlacement(state.placement);
  var axis = getMainAxisFromPlacement(basePlacement);
  var isVertical = [left2, right2].indexOf(basePlacement) >= 0;
  var len = isVertical ? "height" : "width";
  if (!arrowElement || !popperOffsets2) {
    return;
  }
  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = getLayoutRect(arrowElement);
  var minProp = axis === "y" ? top2 : left2;
  var maxProp = axis === "y" ? bottom2 : right2;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets2[axis] - state.rects.popper[len];
  var startDiff = popperOffsets2[axis] - state.rects.reference[axis];
  var arrowOffsetParent = getOffsetParent(arrowElement);
  var clientSize = arrowOffsetParent ? axis === "y" ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2;
  var min2 = paddingObject[minProp];
  var max2 = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset2 = within(min2, center, max2);
  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset2, _state$modifiersData$.centerOffset = offset2 - center, _state$modifiersData$);
}
function effect$1(_ref2) {
  var state = _ref2.state, options = _ref2.options;
  var _options$element = options.element, arrowElement = _options$element === void 0 ? "[data-popper-arrow]" : _options$element;
  if (arrowElement == null) {
    return;
  }
  if (typeof arrowElement === "string") {
    arrowElement = state.elements.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return;
    }
  }
  if (!contains(state.elements.popper, arrowElement)) {
    return;
  }
  state.elements.arrow = arrowElement;
}
var arrow$1 = {
  name: "arrow",
  enabled: true,
  phase: "main",
  fn: arrow,
  effect: effect$1,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function getVariation(placement) {
  return placement.split("-")[1];
}
var unsetSides = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function roundOffsetsByDPR(_ref) {
  var x3 = _ref.x, y6 = _ref.y;
  var win = window;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: round2(round2(x3 * dpr) / dpr) || 0,
    y: round2(round2(y6 * dpr) / dpr) || 0
  };
}
function mapToStyles(_ref2) {
  var _Object$assign2;
  var popper2 = _ref2.popper, popperRect = _ref2.popperRect, placement = _ref2.placement, variation = _ref2.variation, offsets = _ref2.offsets, position2 = _ref2.position, gpuAcceleration = _ref2.gpuAcceleration, adaptive = _ref2.adaptive, roundOffsets = _ref2.roundOffsets;
  var _ref3 = roundOffsets === true ? roundOffsetsByDPR(offsets) : typeof roundOffsets === "function" ? roundOffsets(offsets) : offsets, _ref3$x = _ref3.x, x3 = _ref3$x === void 0 ? 0 : _ref3$x, _ref3$y = _ref3.y, y6 = _ref3$y === void 0 ? 0 : _ref3$y;
  var hasX = offsets.hasOwnProperty("x");
  var hasY = offsets.hasOwnProperty("y");
  var sideX = left2;
  var sideY = top2;
  var win = window;
  if (adaptive) {
    var offsetParent = getOffsetParent(popper2);
    var heightProp = "clientHeight";
    var widthProp = "clientWidth";
    if (offsetParent === getWindow(popper2)) {
      offsetParent = getDocumentElement(popper2);
      if (getComputedStyle(offsetParent).position !== "static" && position2 === "absolute") {
        heightProp = "scrollHeight";
        widthProp = "scrollWidth";
      }
    }
    offsetParent = offsetParent;
    if (placement === top2 || (placement === left2 || placement === right2) && variation === end) {
      sideY = bottom2;
      y6 -= offsetParent[heightProp] - popperRect.height;
      y6 *= gpuAcceleration ? 1 : -1;
    }
    if (placement === left2 || (placement === top2 || placement === bottom2) && variation === end) {
      sideX = right2;
      x3 -= offsetParent[widthProp] - popperRect.width;
      x3 *= gpuAcceleration ? 1 : -1;
    }
  }
  var commonStyles = Object.assign({
    position: position2
  }, adaptive && unsetSides);
  if (gpuAcceleration) {
    var _Object$assign;
    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? "0" : "", _Object$assign[sideX] = hasX ? "0" : "", _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x3 + "px, " + y6 + "px)" : "translate3d(" + x3 + "px, " + y6 + "px, 0)", _Object$assign));
  }
  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y6 + "px" : "", _Object$assign2[sideX] = hasX ? x3 + "px" : "", _Object$assign2.transform = "", _Object$assign2));
}
function computeStyles(_ref4) {
  var state = _ref4.state, options = _ref4.options;
  var _options$gpuAccelerat = options.gpuAcceleration, gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat, _options$adaptive = options.adaptive, adaptive = _options$adaptive === void 0 ? true : _options$adaptive, _options$roundOffsets = options.roundOffsets, roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;
  var commonStyles = {
    placement: getBasePlacement(state.placement),
    variation: getVariation(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration
  };
  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive,
      roundOffsets
    })));
  }
  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: "absolute",
      adaptive: false,
      roundOffsets
    })));
  }
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-placement": state.placement
  });
}
var computeStyles$1 = {
  name: "computeStyles",
  enabled: true,
  phase: "beforeWrite",
  fn: computeStyles,
  data: {}
};
var passive = {
  passive: true
};
function effect$2(_ref) {
  var state = _ref.state, instance = _ref.instance, options = _ref.options;
  var _options$scroll = options.scroll, scroll = _options$scroll === void 0 ? true : _options$scroll, _options$resize = options.resize, resize = _options$resize === void 0 ? true : _options$resize;
  var window2 = getWindow(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);
  if (scroll) {
    scrollParents.forEach(function(scrollParent) {
      scrollParent.addEventListener("scroll", instance.update, passive);
    });
  }
  if (resize) {
    window2.addEventListener("resize", instance.update, passive);
  }
  return function() {
    if (scroll) {
      scrollParents.forEach(function(scrollParent) {
        scrollParent.removeEventListener("scroll", instance.update, passive);
      });
    }
    if (resize) {
      window2.removeEventListener("resize", instance.update, passive);
    }
  };
}
var eventListeners = {
  name: "eventListeners",
  enabled: true,
  phase: "write",
  fn: function fn() {
  },
  effect: effect$2,
  data: {}
};
var hash = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash[matched];
  });
}
var hash$1 = {
  start: "end",
  end: "start"
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function(matched) {
    return hash$1[matched];
  });
}
function getWindowScroll(node) {
  var win = getWindow(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft,
    scrollTop
  };
}
function getWindowScrollBarX(element) {
  return getBoundingClientRect(getDocumentElement(element)).left + getWindowScroll(element).scrollLeft;
}
function getViewportRect(element) {
  var win = getWindow(element);
  var html = getDocumentElement(element);
  var visualViewport = win.visualViewport;
  var width2 = html.clientWidth;
  var height2 = html.clientHeight;
  var x3 = 0;
  var y6 = 0;
  if (visualViewport) {
    width2 = visualViewport.width;
    height2 = visualViewport.height;
    if (!/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      x3 = visualViewport.offsetLeft;
      y6 = visualViewport.offsetTop;
    }
  }
  return {
    width: width2,
    height: height2,
    x: x3 + getWindowScrollBarX(element),
    y: y6
  };
}
function getDocumentRect(element) {
  var _element$ownerDocumen;
  var html = getDocumentElement(element);
  var winScroll = getWindowScroll(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width2 = max(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height2 = max(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x3 = -winScroll.scrollLeft + getWindowScrollBarX(element);
  var y6 = -winScroll.scrollTop;
  if (getComputedStyle(body || html).direction === "rtl") {
    x3 += max(html.clientWidth, body ? body.clientWidth : 0) - width2;
  }
  return {
    width: width2,
    height: height2,
    x: x3,
    y: y6
  };
}
function isScrollParent(element) {
  var _getComputedStyle = getComputedStyle(element), overflow2 = _getComputedStyle.overflow, overflowX = _getComputedStyle.overflowX, overflowY = _getComputedStyle.overflowY;
  return /auto|scroll|overlay|hidden/.test(overflow2 + overflowY + overflowX);
}
function getScrollParent(node) {
  if (["html", "body", "#document"].indexOf(getNodeName(node)) >= 0) {
    return node.ownerDocument.body;
  }
  if (isHTMLElement(node) && isScrollParent(node)) {
    return node;
  }
  return getScrollParent(getParentNode(node));
}
function listScrollParents(element, list) {
  var _element$ownerDocumen;
  if (list === void 0) {
    list = [];
  }
  var scrollParent = getScrollParent(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = getWindow(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], isScrollParent(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : updatedList.concat(listScrollParents(getParentNode(target)));
}
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}
function getInnerBoundingClientRect(element) {
  var rect = getBoundingClientRect(element);
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}
function getClientRectFromMixedType(element, clippingParent) {
  return clippingParent === viewport ? rectToClientRect(getViewportRect(element)) : isHTMLElement(clippingParent) ? getInnerBoundingClientRect(clippingParent) : rectToClientRect(getDocumentRect(getDocumentElement(element)));
}
function getClippingParents(element) {
  var clippingParents2 = listScrollParents(getParentNode(element));
  var canEscapeClipping = ["absolute", "fixed"].indexOf(getComputedStyle(element).position) >= 0;
  var clipperElement = canEscapeClipping && isHTMLElement(element) ? getOffsetParent(element) : element;
  if (!isElement4(clipperElement)) {
    return [];
  }
  return clippingParents2.filter(function(clippingParent) {
    return isElement4(clippingParent) && contains(clippingParent, clipperElement) && getNodeName(clippingParent) !== "body";
  });
}
function getClippingRect(element, boundary, rootBoundary) {
  var mainClippingParents = boundary === "clippingParents" ? getClippingParents(element) : [].concat(boundary);
  var clippingParents2 = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents2[0];
  var clippingRect = clippingParents2.reduce(function(accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}
function computeOffsets(_ref) {
  var reference2 = _ref.reference, element = _ref.element, placement = _ref.placement;
  var basePlacement = placement ? getBasePlacement(placement) : null;
  var variation = placement ? getVariation(placement) : null;
  var commonX = reference2.x + reference2.width / 2 - element.width / 2;
  var commonY = reference2.y + reference2.height / 2 - element.height / 2;
  var offsets;
  switch (basePlacement) {
    case top2:
      offsets = {
        x: commonX,
        y: reference2.y - element.height
      };
      break;
    case bottom2:
      offsets = {
        x: commonX,
        y: reference2.y + reference2.height
      };
      break;
    case right2:
      offsets = {
        x: reference2.x + reference2.width,
        y: commonY
      };
      break;
    case left2:
      offsets = {
        x: reference2.x - element.width,
        y: commonY
      };
      break;
    default:
      offsets = {
        x: reference2.x,
        y: reference2.y
      };
  }
  var mainAxis = basePlacement ? getMainAxisFromPlacement(basePlacement) : null;
  if (mainAxis != null) {
    var len = mainAxis === "y" ? "height" : "width";
    switch (variation) {
      case start:
        offsets[mainAxis] = offsets[mainAxis] - (reference2[len] / 2 - element[len] / 2);
        break;
      case end:
        offsets[mainAxis] = offsets[mainAxis] + (reference2[len] / 2 - element[len] / 2);
        break;
    }
  }
  return offsets;
}
function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, _options$placement = _options.placement, placement = _options$placement === void 0 ? state.placement : _options$placement, _options$boundary = _options.boundary, boundary = _options$boundary === void 0 ? clippingParents : _options$boundary, _options$rootBoundary = _options.rootBoundary, rootBoundary = _options$rootBoundary === void 0 ? viewport : _options$rootBoundary, _options$elementConte = _options.elementContext, elementContext = _options$elementConte === void 0 ? popper : _options$elementConte, _options$altBoundary = _options.altBoundary, altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary, _options$padding = _options.padding, padding2 = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = mergePaddingObject(typeof padding2 !== "number" ? padding2 : expandToHashMap(padding2, basePlacements));
  var altContext = elementContext === popper ? reference : popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = getClippingRect(isElement4(element) ? element : element.contextElement || getDocumentElement(state.elements.popper), boundary, rootBoundary);
  var referenceClientRect = getBoundingClientRect(state.elements.reference);
  var popperOffsets2 = computeOffsets({
    reference: referenceClientRect,
    element: popperRect,
    strategy: "absolute",
    placement
  });
  var popperClientRect = rectToClientRect(Object.assign({}, popperRect, popperOffsets2));
  var elementClientRect = elementContext === popper ? popperClientRect : referenceClientRect;
  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset;
  if (elementContext === popper && offsetData) {
    var offset2 = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function(key) {
      var multiply = [right2, bottom2].indexOf(key) >= 0 ? 1 : -1;
      var axis = [top2, bottom2].indexOf(key) >= 0 ? "y" : "x";
      overflowOffsets[key] += offset2[axis] * multiply;
    });
  }
  return overflowOffsets;
}
function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }
  var _options = options, placement = _options.placement, boundary = _options.boundary, rootBoundary = _options.rootBoundary, padding2 = _options.padding, flipVariations = _options.flipVariations, _options$allowedAutoP = _options.allowedAutoPlacements, allowedAutoPlacements = _options$allowedAutoP === void 0 ? placements : _options$allowedAutoP;
  var variation = getVariation(placement);
  var placements$1 = variation ? flipVariations ? variationPlacements : variationPlacements.filter(function(placement2) {
    return getVariation(placement2) === variation;
  }) : basePlacements;
  var allowedPlacements = placements$1.filter(function(placement2) {
    return allowedAutoPlacements.indexOf(placement2) >= 0;
  });
  if (allowedPlacements.length === 0) {
    allowedPlacements = placements$1;
  }
  var overflows = allowedPlacements.reduce(function(acc, placement2) {
    acc[placement2] = detectOverflow(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding: padding2
    })[getBasePlacement(placement2)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function(a3, b5) {
    return overflows[a3] - overflows[b5];
  });
}
function getExpandedFallbackPlacements(placement) {
  if (getBasePlacement(placement) === auto) {
    return [];
  }
  var oppositePlacement = getOppositePlacement(placement);
  return [getOppositeVariationPlacement(placement), oppositePlacement, getOppositeVariationPlacement(oppositePlacement)];
}
function flip(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  if (state.modifiersData[name]._skip) {
    return;
  }
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis, specifiedFallbackPlacements = options.fallbackPlacements, padding2 = options.padding, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, _options$flipVariatio = options.flipVariations, flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio, allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = getBasePlacement(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [getOppositePlacement(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements2 = [preferredPlacement].concat(fallbackPlacements).reduce(function(acc, placement2) {
    return acc.concat(getBasePlacement(placement2) === auto ? computeAutoPlacement(state, {
      placement: placement2,
      boundary,
      rootBoundary,
      padding: padding2,
      flipVariations,
      allowedAutoPlacements
    }) : placement2);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements2[0];
  for (var i2 = 0; i2 < placements2.length; i2++) {
    var placement = placements2[i2];
    var _basePlacement = getBasePlacement(placement);
    var isStartVariation = getVariation(placement) === start;
    var isVertical = [top2, bottom2].indexOf(_basePlacement) >= 0;
    var len = isVertical ? "width" : "height";
    var overflow2 = detectOverflow(state, {
      placement,
      boundary,
      rootBoundary,
      altBoundary,
      padding: padding2
    });
    var mainVariationSide = isVertical ? isStartVariation ? right2 : left2 : isStartVariation ? bottom2 : top2;
    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = getOppositePlacement(mainVariationSide);
    }
    var altVariationSide = getOppositePlacement(mainVariationSide);
    var checks = [];
    if (checkMainAxis) {
      checks.push(overflow2[_basePlacement] <= 0);
    }
    if (checkAltAxis) {
      checks.push(overflow2[mainVariationSide] <= 0, overflow2[altVariationSide] <= 0);
    }
    if (checks.every(function(check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }
    checksMap.set(placement, checks);
  }
  if (makeFallbackChecks) {
    var numberOfChecks = flipVariations ? 3 : 1;
    var _loop = function _loop2(_i2) {
      var fittingPlacement = placements2.find(function(placement2) {
        var checks2 = checksMap.get(placement2);
        if (checks2) {
          return checks2.slice(0, _i2).every(function(check) {
            return check;
          });
        }
      });
      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };
    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);
      if (_ret === "break")
        break;
    }
  }
  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
}
var flip$1 = {
  name: "flip",
  enabled: true,
  phase: "main",
  fn: flip,
  requiresIfExists: ["offset"],
  data: {
    _skip: false
  }
};
function getSideOffsets(overflow2, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }
  return {
    top: overflow2.top - rect.height - preventedOffsets.y,
    right: overflow2.right - rect.width + preventedOffsets.x,
    bottom: overflow2.bottom - rect.height + preventedOffsets.y,
    left: overflow2.left - rect.width - preventedOffsets.x
  };
}
function isAnySideFullyClipped(overflow2) {
  return [top2, right2, bottom2, left2].some(function(side) {
    return overflow2[side] >= 0;
  });
}
function hide(_ref) {
  var state = _ref.state, name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = detectOverflow(state, {
    elementContext: "reference"
  });
  var popperAltOverflow = detectOverflow(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets,
    popperEscapeOffsets,
    isReferenceHidden,
    hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    "data-popper-reference-hidden": isReferenceHidden,
    "data-popper-escaped": hasPopperEscaped
  });
}
var hide$1 = {
  name: "hide",
  enabled: true,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: hide
};
function distanceAndSkiddingToXY(placement, rects, offset2) {
  var basePlacement = getBasePlacement(placement);
  var invertDistance = [left2, top2].indexOf(basePlacement) >= 0 ? -1 : 1;
  var _ref = typeof offset2 === "function" ? offset2(Object.assign({}, rects, {
    placement
  })) : offset2, skidding = _ref[0], distance = _ref[1];
  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [left2, right2].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}
function offset(_ref2) {
  var state = _ref2.state, options = _ref2.options, name = _ref2.name;
  var _options$offset = options.offset, offset2 = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = placements.reduce(function(acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset2);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement], x3 = _data$state$placement.x, y6 = _data$state$placement.y;
  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x3;
    state.modifiersData.popperOffsets.y += y6;
  }
  state.modifiersData[name] = data;
}
var offset$1 = {
  name: "offset",
  enabled: true,
  phase: "main",
  requires: ["popperOffsets"],
  fn: offset
};
function popperOffsets(_ref) {
  var state = _ref.state, name = _ref.name;
  state.modifiersData[name] = computeOffsets({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: "absolute",
    placement: state.placement
  });
}
var popperOffsets$1 = {
  name: "popperOffsets",
  enabled: true,
  phase: "read",
  fn: popperOffsets,
  data: {}
};
function getAltAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function preventOverflow(_ref) {
  var state = _ref.state, options = _ref.options, name = _ref.name;
  var _options$mainAxis = options.mainAxis, checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis, _options$altAxis = options.altAxis, checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis, boundary = options.boundary, rootBoundary = options.rootBoundary, altBoundary = options.altBoundary, padding2 = options.padding, _options$tether = options.tether, tether = _options$tether === void 0 ? true : _options$tether, _options$tetherOffset = options.tetherOffset, tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow2 = detectOverflow(state, {
    boundary,
    rootBoundary,
    padding: padding2,
    altBoundary
  });
  var basePlacement = getBasePlacement(state.placement);
  var variation = getVariation(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = getMainAxisFromPlacement(basePlacement);
  var altAxis = getAltAxis(mainAxis);
  var popperOffsets2 = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === "function" ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var data = {
    x: 0,
    y: 0
  };
  if (!popperOffsets2) {
    return;
  }
  if (checkMainAxis || checkAltAxis) {
    var mainSide = mainAxis === "y" ? top2 : left2;
    var altSide = mainAxis === "y" ? bottom2 : right2;
    var len = mainAxis === "y" ? "height" : "width";
    var offset2 = popperOffsets2[mainAxis];
    var min$1 = popperOffsets2[mainAxis] + overflow2[mainSide];
    var max$1 = popperOffsets2[mainAxis] - overflow2[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === start ? -popperRect[len] : -referenceRect[len];
    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? getLayoutRect(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData["arrow#persistent"] ? state.modifiersData["arrow#persistent"].padding : getFreshSideObject();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide];
    var arrowLen = within(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - tetherOffsetValue : minLen - arrowLen - arrowPaddingMin - tetherOffsetValue;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + tetherOffsetValue : maxLen + arrowLen + arrowPaddingMax + tetherOffsetValue;
    var arrowOffsetParent = state.elements.arrow && getOffsetParent(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === "y" ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = state.modifiersData.offset ? state.modifiersData.offset[state.placement][mainAxis] : 0;
    var tetherMin = popperOffsets2[mainAxis] + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = popperOffsets2[mainAxis] + maxOffset - offsetModifierValue;
    if (checkMainAxis) {
      var preventedOffset = within(tether ? min(min$1, tetherMin) : min$1, offset2, tether ? max(max$1, tetherMax) : max$1);
      popperOffsets2[mainAxis] = preventedOffset;
      data[mainAxis] = preventedOffset - offset2;
    }
    if (checkAltAxis) {
      var _mainSide = mainAxis === "x" ? top2 : left2;
      var _altSide = mainAxis === "x" ? bottom2 : right2;
      var _offset = popperOffsets2[altAxis];
      var _min = _offset + overflow2[_mainSide];
      var _max = _offset - overflow2[_altSide];
      var _preventedOffset = within(tether ? min(_min, tetherMin) : _min, _offset, tether ? max(_max, tetherMax) : _max);
      popperOffsets2[altAxis] = _preventedOffset;
      data[altAxis] = _preventedOffset - _offset;
    }
  }
  state.modifiersData[name] = data;
}
var preventOverflow$1 = {
  name: "preventOverflow",
  enabled: true,
  phase: "main",
  fn: preventOverflow,
  requiresIfExists: ["offset"]
};
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}
function getNodeScroll(node) {
  if (node === getWindow(node) || !isHTMLElement(node)) {
    return getWindowScroll(node);
  } else {
    return getHTMLElementScroll(node);
  }
}
function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = rect.width / element.offsetWidth || 1;
  var scaleY = rect.height / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
}
function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  var isOffsetParentAnElement = isHTMLElement(offsetParent);
  var offsetParentIsScaled = isHTMLElement(offsetParent) && isElementScaled(offsetParent);
  var documentElement = getDocumentElement(offsetParent);
  var rect = getBoundingClientRect(elementOrVirtualElement);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isScrollParent(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      offsets = getBoundingClientRect(offsetParent);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}
function order2(modifiers) {
  var map2 = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function(modifier) {
    map2.set(modifier.name, modifier);
  });
  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function(dep) {
      if (!visited.has(dep)) {
        var depModifier = map2.get(dep);
        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }
  modifiers.forEach(function(modifier) {
    if (!visited.has(modifier.name)) {
      sort(modifier);
    }
  });
  return result;
}
function orderModifiers(modifiers) {
  var orderedModifiers = order2(modifiers);
  return modifierPhases.reduce(function(acc, phase) {
    return acc.concat(orderedModifiers.filter(function(modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}
function debounce2(fn2) {
  var pending;
  return function() {
    if (!pending) {
      pending = new Promise(function(resolve) {
        Promise.resolve().then(function() {
          pending = void 0;
          resolve(fn2());
        });
      });
    }
    return pending;
  };
}
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function(merged2, current) {
    var existing = merged2[current.name];
    merged2[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged2;
  }, {});
  return Object.keys(merged).map(function(key) {
    return merged[key];
  });
}
var DEFAULT_OPTIONS = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  return !args.some(function(element) {
    return !(element && typeof element.getBoundingClientRect === "function");
  });
}
function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }
  var _generatorOptions = generatorOptions, _generatorOptions$def = _generatorOptions.defaultModifiers, defaultModifiers2 = _generatorOptions$def === void 0 ? [] : _generatorOptions$def, _generatorOptions$def2 = _generatorOptions.defaultOptions, defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper2(reference2, popper2, options) {
    if (options === void 0) {
      options = defaultOptions;
    }
    var state = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference2,
        popper: popper2
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state,
      setOptions: function setOptions(setOptionsAction) {
        var options2 = typeof setOptionsAction === "function" ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options2);
        state.scrollParents = {
          reference: isElement4(reference2) ? listScrollParents(reference2) : reference2.contextElement ? listScrollParents(reference2.contextElement) : [],
          popper: listScrollParents(popper2)
        };
        var orderedModifiers = orderModifiers(mergeByName([].concat(defaultModifiers2, state.options.modifiers)));
        state.orderedModifiers = orderedModifiers.filter(function(m5) {
          return m5.enabled;
        });
        runModifierEffects();
        return instance.update();
      },
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }
        var _state$elements = state.elements, reference3 = _state$elements.reference, popper3 = _state$elements.popper;
        if (!areValidElements(reference3, popper3)) {
          return;
        }
        state.rects = {
          reference: getCompositeRect(reference3, getOffsetParent(popper3), state.options.strategy === "fixed"),
          popper: getLayoutRect(popper3)
        };
        state.reset = false;
        state.placement = state.options.placement;
        state.orderedModifiers.forEach(function(modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }
          var _state$orderedModifie = state.orderedModifiers[index], fn2 = _state$orderedModifie.fn, _state$orderedModifie2 = _state$orderedModifie.options, _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2, name = _state$orderedModifie.name;
          if (typeof fn2 === "function") {
            state = fn2({
              state,
              options: _options,
              name,
              instance
            }) || state;
          }
        }
      },
      update: debounce2(function() {
        return new Promise(function(resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };
    if (!areValidElements(reference2, popper2)) {
      return instance;
    }
    instance.setOptions(options).then(function(state2) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state2);
      }
    });
    function runModifierEffects() {
      state.orderedModifiers.forEach(function(_ref3) {
        var name = _ref3.name, _ref3$options = _ref3.options, options2 = _ref3$options === void 0 ? {} : _ref3$options, effect2 = _ref3.effect;
        if (typeof effect2 === "function") {
          var cleanupFn = effect2({
            state,
            name,
            instance,
            options: options2
          });
          var noopFn = function noopFn2() {
          };
          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }
    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function(fn2) {
        return fn2();
      });
      effectCleanupFns = [];
    }
    return instance;
  };
}
var createPopper = /* @__PURE__ */ popperGenerator();
var defaultModifiers = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1];
var createPopper$1 = /* @__PURE__ */ popperGenerator({
  defaultModifiers
});
var defaultModifiers$1 = [eventListeners, popperOffsets$1, computeStyles$1, applyStyles$1, offset$1, flip$1, preventOverflow$1, arrow$1, hide$1];
var createPopper$2 = /* @__PURE__ */ popperGenerator({
  defaultModifiers: defaultModifiers$1
});
var lib = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  popperGenerator,
  detectOverflow,
  createPopperBase: createPopper,
  createPopper: createPopper$2,
  createPopperLite: createPopper$1,
  top: top2,
  bottom: bottom2,
  right: right2,
  left: left2,
  auto,
  basePlacements,
  start,
  end,
  clippingParents,
  viewport,
  popper,
  reference,
  variationPlacements,
  placements,
  beforeRead,
  read,
  afterRead,
  beforeMain,
  main,
  afterMain,
  beforeWrite,
  write,
  afterWrite,
  modifierPhases,
  applyStyles: applyStyles$1,
  arrow: arrow$1,
  computeStyles: computeStyles$1,
  eventListeners,
  flip: flip$1,
  hide: hide$1,
  offset: offset$1,
  popperOffsets: popperOffsets$1,
  preventOverflow: preventOverflow$1
});
var Portal6 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
      return _Portal.default;
    }
  });
  var _Portal = interopRequireDefault(Portal3);
});
var ownerDocument2 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _default = esm.unstable_ownerDocument;
  exports.default = _default;
});
var useEnhancedEffect2 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _default = esm.unstable_useEnhancedEffect;
  exports.default = _default;
});
var Popper_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _extends22 = interopRequireDefault(_extends_1);
  var _objectWithoutPropertiesLoose22 = interopRequireDefault(objectWithoutPropertiesLoose);
  var React2 = _interopRequireWildcard(react);
  var _propTypes = interopRequireDefault(propTypes);
  var _Portal = interopRequireDefault(Portal6);
  var _ownerDocument = interopRequireDefault(ownerDocument2);
  var _useForkRef = interopRequireDefault(useForkRef2);
  var _useEnhancedEffect = interopRequireDefault(useEnhancedEffect2);
  const _excluded8 = ["anchorEl", "children", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "TransitionProps"], _excluded23 = ["anchorEl", "children", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition"];
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function")
      return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop2) {
      return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
      return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
      return {default: obj};
    }
    var cache2 = _getRequireWildcardCache(nodeInterop);
    if (cache2 && cache2.has(obj)) {
      return cache2.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj.default = obj;
    if (cache2) {
      cache2.set(obj, newObj);
    }
    return newObj;
  }
  function flipPlacement(placement, theme) {
    const direction = theme && theme.direction || "ltr";
    if (direction === "ltr") {
      return placement;
    }
    switch (placement) {
      case "bottom-end":
        return "bottom-start";
      case "bottom-start":
        return "bottom-end";
      case "top-end":
        return "top-start";
      case "top-start":
        return "top-end";
      default:
        return placement;
    }
  }
  function resolveAnchorEl2(anchorEl) {
    return typeof anchorEl === "function" ? anchorEl() : anchorEl;
  }
  const defaultPopperOptions = {};
  const PopperTooltip = /* @__PURE__ */ React2.forwardRef(function PopperTooltip2(props, ref) {
    const {
      anchorEl,
      children,
      disablePortal,
      modifiers,
      open,
      placement: initialPlacement,
      popperOptions,
      popperRef: popperRefProp,
      TransitionProps
    } = props, other = (0, _objectWithoutPropertiesLoose22.default)(props, _excluded8);
    const tooltipRef = React2.useRef(null);
    const ownRef = (0, _useForkRef.default)(tooltipRef, ref);
    const popperRef = React2.useRef(null);
    const handlePopperRef = (0, _useForkRef.default)(popperRef, popperRefProp);
    const handlePopperRefRef = React2.useRef(handlePopperRef);
    (0, _useEnhancedEffect.default)(() => {
      handlePopperRefRef.current = handlePopperRef;
    }, [handlePopperRef]);
    React2.useImperativeHandle(popperRefProp, () => popperRef.current, []);
    const theme = (0, esm$1.useThemeWithoutDefault)();
    const rtlPlacement = flipPlacement(initialPlacement, theme);
    const [placement, setPlacement] = React2.useState(rtlPlacement);
    React2.useEffect(() => {
      if (popperRef.current) {
        popperRef.current.forceUpdate();
      }
    });
    (0, _useEnhancedEffect.default)(() => {
      if (!anchorEl || !open) {
        return void 0;
      }
      const handlePopperUpdate = (data) => {
        setPlacement(data.placement);
      };
      const resolvedAnchorEl = resolveAnchorEl2(anchorEl);
      let popperModifiers = [{
        name: "preventOverflow",
        options: {
          altBoundary: disablePortal
        }
      }, {
        name: "flip",
        options: {
          altBoundary: disablePortal
        }
      }, {
        name: "onUpdate",
        enabled: true,
        phase: "afterWrite",
        fn: ({
          state
        }) => {
          handlePopperUpdate(state);
        }
      }];
      if (modifiers != null) {
        popperModifiers = popperModifiers.concat(modifiers);
      }
      if (popperOptions && popperOptions.modifiers != null) {
        popperModifiers = popperModifiers.concat(popperOptions.modifiers);
      }
      const popper2 = (0, lib.createPopper)(resolveAnchorEl2(anchorEl), tooltipRef.current, (0, _extends22.default)({
        placement: rtlPlacement
      }, popperOptions, {
        modifiers: popperModifiers
      }));
      handlePopperRefRef.current(popper2);
      return () => {
        popper2.destroy();
        handlePopperRefRef.current(null);
      };
    }, [anchorEl, disablePortal, modifiers, open, popperOptions, rtlPlacement]);
    const childProps = {
      placement
    };
    if (TransitionProps !== null) {
      childProps.TransitionProps = TransitionProps;
    }
    return /* @__PURE__ */ (0, jsxRuntime.jsx)("div", (0, _extends22.default)({
      ref: ownRef,
      role: "tooltip"
    }, other, {
      children: typeof children === "function" ? children(childProps) : children
    }));
  });
  const Popper2 = /* @__PURE__ */ React2.forwardRef(function Popper3(props, ref) {
    const {
      anchorEl,
      children,
      container: containerProp,
      disablePortal = false,
      keepMounted = false,
      modifiers,
      open,
      placement = "bottom",
      popperOptions = defaultPopperOptions,
      popperRef,
      style: style2,
      transition = false
    } = props, other = (0, _objectWithoutPropertiesLoose22.default)(props, _excluded23);
    const [exited, setExited] = React2.useState(true);
    const handleEnter = () => {
      setExited(false);
    };
    const handleExited = () => {
      setExited(true);
    };
    if (!keepMounted && !open && (!transition || exited)) {
      return null;
    }
    const container = containerProp || (anchorEl ? (0, _ownerDocument.default)(resolveAnchorEl2(anchorEl)).body : void 0);
    return /* @__PURE__ */ (0, jsxRuntime.jsx)(_Portal.default, {
      disablePortal,
      container,
      children: /* @__PURE__ */ (0, jsxRuntime.jsx)(PopperTooltip, (0, _extends22.default)({
        anchorEl,
        disablePortal,
        modifiers,
        ref,
        open: transition ? !exited : open,
        placement,
        popperOptions,
        popperRef
      }, other, {
        style: (0, _extends22.default)({
          position: "fixed",
          top: 0,
          left: 0,
          display: !open && keepMounted && !transition ? "none" : null
        }, style2),
        TransitionProps: transition ? {
          in: open,
          onEnter: handleEnter,
          onExited: handleExited
        } : null,
        children
      }))
    });
  });
  var _default = Popper2;
  exports.default = _default;
});
var Popper = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
      return _Popper.default;
    }
  });
  var _Popper = interopRequireDefault(Popper_1);
});
var useId2 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _default = esm.unstable_useId;
  exports.default = _default;
});
var useControlled2 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _default = esm.unstable_useControlled;
  exports.default = _default;
});
var tooltipClasses_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  exports.getTooltipUtilityClass = getTooltipUtilityClass;
  function getTooltipUtilityClass(slot) {
    return (0, core.generateUtilityClass)("MuiTooltip", slot);
  }
  const tooltipClasses = (0, core.generateUtilityClasses)("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]);
  var _default = tooltipClasses;
  exports.default = _default;
});
var Tooltip_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  exports.testReset = testReset;
  var _objectWithoutPropertiesLoose22 = interopRequireDefault(objectWithoutPropertiesLoose);
  var _extends22 = interopRequireDefault(_extends_1);
  var React2 = _interopRequireWildcard(react);
  var _propTypes = interopRequireDefault(propTypes);
  var _clsx = interopRequireDefault(clsx);
  var _styled = interopRequireDefault(styled_1);
  var _useTheme = interopRequireDefault(useTheme_1);
  var _useThemeProps = interopRequireDefault(useThemeProps_1);
  var _capitalize = interopRequireDefault(capitalize2);
  var _Grow = interopRequireDefault(Grow3);
  var _Popper = interopRequireDefault(Popper);
  var _useEventCallback = interopRequireDefault(useEventCallback2);
  var _useForkRef = interopRequireDefault(useForkRef2);
  var _useId = interopRequireDefault(useId2);
  var _useIsFocusVisible = interopRequireDefault(useIsFocusVisible2);
  var _useControlled = interopRequireDefault(useControlled2);
  var _tooltipClasses = _interopRequireWildcard(tooltipClasses_1);
  const _excluded8 = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "title", "TransitionComponent", "TransitionProps"];
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function")
      return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop2) {
      return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
      return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
      return {default: obj};
    }
    var cache2 = _getRequireWildcardCache(nodeInterop);
    if (cache2 && cache2.has(obj)) {
      return cache2.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj.default = obj;
    if (cache2) {
      cache2.set(obj, newObj);
    }
    return newObj;
  }
  function round3(value) {
    return Math.round(value * 1e5) / 1e5;
  }
  const useUtilityClasses4 = (ownerState) => {
    const {
      classes,
      disableInteractive,
      arrow: arrow2,
      touch,
      placement
    } = ownerState;
    const slots = {
      popper: ["popper", !disableInteractive && "popperInteractive", arrow2 && "popperArrow"],
      tooltip: ["tooltip", arrow2 && "tooltipArrow", touch && "touch", `tooltipPlacement${(0, _capitalize.default)(placement.split("-")[0])}`],
      arrow: ["arrow"]
    };
    return (0, core.unstable_composeClasses)(slots, _tooltipClasses.getTooltipUtilityClass, classes);
  };
  const TooltipPopper = (0, _styled.default)(_Popper.default, {
    name: "MuiTooltip",
    slot: "Popper",
    overridesResolver: (props, styles2) => {
      const {
        ownerState
      } = props;
      return [styles2.popper, !ownerState.disableInteractive && styles2.popperInteractive, ownerState.arrow && styles2.popperArrow, !ownerState.open && styles2.popperClose];
    }
  })(({
    theme,
    ownerState,
    open
  }) => (0, _extends22.default)({
    zIndex: theme.zIndex.tooltip,
    pointerEvents: "none"
  }, !ownerState.disableInteractive && {
    pointerEvents: "auto"
  }, !open && {
    pointerEvents: "none"
  }, ownerState.arrow && {
    [`&[data-popper-placement*="bottom"] .${_tooltipClasses.default.arrow}`]: {
      top: 0,
      marginTop: "-0.71em",
      "&::before": {
        transformOrigin: "0 100%"
      }
    },
    [`&[data-popper-placement*="top"] .${_tooltipClasses.default.arrow}`]: {
      bottom: 0,
      marginBottom: "-0.71em",
      "&::before": {
        transformOrigin: "100% 0"
      }
    },
    [`&[data-popper-placement*="right"] .${_tooltipClasses.default.arrow}`]: (0, _extends22.default)({}, !ownerState.isRtl ? {
      left: 0,
      marginLeft: "-0.71em"
    } : {
      right: 0,
      marginRight: "-0.71em"
    }, {
      height: "1em",
      width: "0.71em",
      "&::before": {
        transformOrigin: "100% 100%"
      }
    }),
    [`&[data-popper-placement*="left"] .${_tooltipClasses.default.arrow}`]: (0, _extends22.default)({}, !ownerState.isRtl ? {
      right: 0,
      marginRight: "-0.71em"
    } : {
      left: 0,
      marginLeft: "-0.71em"
    }, {
      height: "1em",
      width: "0.71em",
      "&::before": {
        transformOrigin: "0 0"
      }
    })
  }));
  const TooltipTooltip = (0, _styled.default)("div", {
    name: "MuiTooltip",
    slot: "Tooltip",
    overridesResolver: (props, styles2) => {
      const {
        ownerState
      } = props;
      return [styles2.tooltip, ownerState.touch && styles2.touch, ownerState.arrow && styles2.tooltipArrow, styles2[`tooltipPlacement${(0, _capitalize.default)(ownerState.placement.split("-")[0])}`]];
    }
  })(({
    theme,
    ownerState
  }) => (0, _extends22.default)({
    backgroundColor: (0, esm$1.alpha)(theme.palette.grey[700], 0.92),
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.common.white,
    fontFamily: theme.typography.fontFamily,
    padding: "4px 8px",
    fontSize: theme.typography.pxToRem(11),
    maxWidth: 300,
    margin: 2,
    wordWrap: "break-word",
    fontWeight: theme.typography.fontWeightMedium
  }, ownerState.arrow && {
    position: "relative",
    margin: 0
  }, ownerState.touch && {
    padding: "8px 16px",
    fontSize: theme.typography.pxToRem(14),
    lineHeight: `${round3(16 / 14)}em`,
    fontWeight: theme.typography.fontWeightRegular
  }, {
    [`.${_tooltipClasses.default.popper}[data-popper-placement*="left"] &`]: (0, _extends22.default)({
      transformOrigin: "right center"
    }, !ownerState.isRtl ? (0, _extends22.default)({
      marginRight: "14px"
    }, ownerState.touch && {
      marginRight: "24px"
    }) : (0, _extends22.default)({
      marginLeft: "14px"
    }, ownerState.touch && {
      marginLeft: "24px"
    })),
    [`.${_tooltipClasses.default.popper}[data-popper-placement*="right"] &`]: (0, _extends22.default)({
      transformOrigin: "left center"
    }, !ownerState.isRtl ? (0, _extends22.default)({
      marginLeft: "14px"
    }, ownerState.touch && {
      marginLeft: "24px"
    }) : (0, _extends22.default)({
      marginRight: "14px"
    }, ownerState.touch && {
      marginRight: "24px"
    })),
    [`.${_tooltipClasses.default.popper}[data-popper-placement*="top"] &`]: (0, _extends22.default)({
      transformOrigin: "center bottom",
      marginBottom: "14px"
    }, ownerState.touch && {
      marginBottom: "24px"
    }),
    [`.${_tooltipClasses.default.popper}[data-popper-placement*="bottom"] &`]: (0, _extends22.default)({
      transformOrigin: "center top",
      marginTop: "14px"
    }, ownerState.touch && {
      marginTop: "24px"
    })
  }));
  const TooltipArrow = (0, _styled.default)("span", {
    name: "MuiTooltip",
    slot: "Arrow",
    overridesResolver: (props, styles2) => styles2.arrow
  })(({
    theme
  }) => ({
    overflow: "hidden",
    position: "absolute",
    width: "1em",
    height: "0.71em",
    boxSizing: "border-box",
    color: (0, esm$1.alpha)(theme.palette.grey[700], 0.9),
    "&::before": {
      content: '""',
      margin: "auto",
      display: "block",
      width: "100%",
      height: "100%",
      backgroundColor: "currentColor",
      transform: "rotate(45deg)"
    }
  }));
  let hystersisOpen = false;
  let hystersisTimer = null;
  function testReset() {
    hystersisOpen = false;
    clearTimeout(hystersisTimer);
  }
  function composeEventHandler(handler, eventHandler) {
    return (event) => {
      if (eventHandler) {
        eventHandler(event);
      }
      handler(event);
    };
  }
  const Tooltip2 = /* @__PURE__ */ React2.forwardRef(function Tooltip3(inProps, ref) {
    var _components$Popper, _ref, _components$Tooltip, _components$Arrow, _componentsProps$popp;
    const props = (0, _useThemeProps.default)({
      props: inProps,
      name: "MuiTooltip"
    });
    const {
      arrow: arrow2 = false,
      children,
      components = {},
      componentsProps = {},
      describeChild = false,
      disableFocusListener = false,
      disableHoverListener = false,
      disableInteractive: disableInteractiveProp = false,
      disableTouchListener = false,
      enterDelay = 100,
      enterNextDelay = 0,
      enterTouchDelay = 700,
      followCursor = false,
      id: idProp,
      leaveDelay = 0,
      leaveTouchDelay = 1500,
      onClose,
      onOpen,
      open: openProp,
      placement = "bottom",
      PopperComponent: PopperComponentProp,
      PopperProps = {},
      title,
      TransitionComponent: TransitionComponentProp = _Grow.default,
      TransitionProps
    } = props, other = (0, _objectWithoutPropertiesLoose22.default)(props, _excluded8);
    const theme = (0, _useTheme.default)();
    const isRtl = theme.direction === "rtl";
    const [childNode, setChildNode] = React2.useState();
    const [arrowRef, setArrowRef] = React2.useState(null);
    const ignoreNonTouchEvents = React2.useRef(false);
    const disableInteractive = disableInteractiveProp || followCursor;
    const closeTimer = React2.useRef();
    const enterTimer = React2.useRef();
    const leaveTimer = React2.useRef();
    const touchTimer = React2.useRef();
    const [openState, setOpenState] = (0, _useControlled.default)({
      controlled: openProp,
      default: false,
      name: "Tooltip",
      state: "open"
    });
    let open = openState;
    const id2 = (0, _useId.default)(idProp);
    const prevUserSelect = React2.useRef();
    const stopTouchInteraction = React2.useCallback(() => {
      if (prevUserSelect.current !== void 0) {
        document.body.style.WebkitUserSelect = prevUserSelect.current;
        prevUserSelect.current = void 0;
      }
      clearTimeout(touchTimer.current);
    }, []);
    React2.useEffect(() => {
      return () => {
        clearTimeout(closeTimer.current);
        clearTimeout(enterTimer.current);
        clearTimeout(leaveTimer.current);
        stopTouchInteraction();
      };
    }, [stopTouchInteraction]);
    const handleOpen = (event) => {
      clearTimeout(hystersisTimer);
      hystersisOpen = true;
      setOpenState(true);
      if (onOpen && !open) {
        onOpen(event);
      }
    };
    const handleClose = (0, _useEventCallback.default)((event) => {
      clearTimeout(hystersisTimer);
      hystersisTimer = setTimeout(() => {
        hystersisOpen = false;
      }, 800 + leaveDelay);
      setOpenState(false);
      if (onClose && open) {
        onClose(event);
      }
      clearTimeout(closeTimer.current);
      closeTimer.current = setTimeout(() => {
        ignoreNonTouchEvents.current = false;
      }, theme.transitions.duration.shortest);
    });
    const handleEnter = (event) => {
      if (ignoreNonTouchEvents.current && event.type !== "touchstart") {
        return;
      }
      if (childNode) {
        childNode.removeAttribute("title");
      }
      clearTimeout(enterTimer.current);
      clearTimeout(leaveTimer.current);
      if (enterDelay || hystersisOpen && enterNextDelay) {
        enterTimer.current = setTimeout(() => {
          handleOpen(event);
        }, hystersisOpen ? enterNextDelay : enterDelay);
      } else {
        handleOpen(event);
      }
    };
    const handleLeave = (event) => {
      clearTimeout(enterTimer.current);
      clearTimeout(leaveTimer.current);
      leaveTimer.current = setTimeout(() => {
        handleClose(event);
      }, leaveDelay);
    };
    const {
      isFocusVisibleRef,
      onBlur: handleBlurVisible,
      onFocus: handleFocusVisible,
      ref: focusVisibleRef
    } = (0, _useIsFocusVisible.default)();
    const [, setChildIsFocusVisible] = React2.useState(false);
    const handleBlur = (event) => {
      handleBlurVisible(event);
      if (isFocusVisibleRef.current === false) {
        setChildIsFocusVisible(false);
        handleLeave(event);
      }
    };
    const handleFocus = (event) => {
      if (!childNode) {
        setChildNode(event.currentTarget);
      }
      handleFocusVisible(event);
      if (isFocusVisibleRef.current === true) {
        setChildIsFocusVisible(true);
        handleEnter(event);
      }
    };
    const detectTouchStart = (event) => {
      ignoreNonTouchEvents.current = true;
      const childrenProps2 = children.props;
      if (childrenProps2.onTouchStart) {
        childrenProps2.onTouchStart(event);
      }
    };
    const handleMouseOver = handleEnter;
    const handleMouseLeave = handleLeave;
    const handleTouchStart = (event) => {
      detectTouchStart(event);
      clearTimeout(leaveTimer.current);
      clearTimeout(closeTimer.current);
      stopTouchInteraction();
      prevUserSelect.current = document.body.style.WebkitUserSelect;
      document.body.style.WebkitUserSelect = "none";
      touchTimer.current = setTimeout(() => {
        document.body.style.WebkitUserSelect = prevUserSelect.current;
        handleEnter(event);
      }, enterTouchDelay);
    };
    const handleTouchEnd = (event) => {
      if (children.props.onTouchEnd) {
        children.props.onTouchEnd(event);
      }
      stopTouchInteraction();
      clearTimeout(leaveTimer.current);
      leaveTimer.current = setTimeout(() => {
        handleClose(event);
      }, leaveTouchDelay);
    };
    React2.useEffect(() => {
      if (!open) {
        return void 0;
      }
      function handleKeyDown2(nativeEvent) {
        if (nativeEvent.key === "Escape" || nativeEvent.key === "Esc") {
          handleClose(nativeEvent);
        }
      }
      document.addEventListener("keydown", handleKeyDown2);
      return () => {
        document.removeEventListener("keydown", handleKeyDown2);
      };
    }, [handleClose, open]);
    const handleUseRef = (0, _useForkRef.default)(setChildNode, ref);
    const handleFocusRef = (0, _useForkRef.default)(focusVisibleRef, handleUseRef);
    const handleRef = (0, _useForkRef.default)(children.ref, handleFocusRef);
    if (title === "") {
      open = false;
    }
    const positionRef = React2.useRef({
      x: 0,
      y: 0
    });
    const popperRef = React2.useRef();
    const handleMouseMove = (event) => {
      const childrenProps2 = children.props;
      if (childrenProps2.onMouseMove) {
        childrenProps2.onMouseMove(event);
      }
      positionRef.current = {
        x: event.clientX,
        y: event.clientY
      };
      if (popperRef.current) {
        popperRef.current.update();
      }
    };
    const nameOrDescProps = {};
    const titleIsString = typeof title === "string";
    if (describeChild) {
      nameOrDescProps.title = !open && titleIsString && !disableHoverListener ? title : null;
      nameOrDescProps["aria-describedby"] = open ? id2 : null;
    } else {
      nameOrDescProps["aria-label"] = titleIsString ? title : null;
      nameOrDescProps["aria-labelledby"] = open && !titleIsString ? id2 : null;
    }
    const childrenProps = (0, _extends22.default)({}, nameOrDescProps, other, children.props, {
      className: (0, _clsx.default)(other.className, children.props.className),
      onTouchStart: detectTouchStart,
      ref: handleRef
    }, followCursor ? {
      onMouseMove: handleMouseMove
    } : {});
    const interactiveWrapperListeners = {};
    if (!disableTouchListener) {
      childrenProps.onTouchStart = handleTouchStart;
      childrenProps.onTouchEnd = handleTouchEnd;
    }
    if (!disableHoverListener) {
      childrenProps.onMouseOver = composeEventHandler(handleMouseOver, childrenProps.onMouseOver);
      childrenProps.onMouseLeave = composeEventHandler(handleMouseLeave, childrenProps.onMouseLeave);
      if (!disableInteractive) {
        interactiveWrapperListeners.onMouseOver = handleMouseOver;
        interactiveWrapperListeners.onMouseLeave = handleMouseLeave;
      }
    }
    if (!disableFocusListener) {
      childrenProps.onFocus = composeEventHandler(handleFocus, childrenProps.onFocus);
      childrenProps.onBlur = composeEventHandler(handleBlur, childrenProps.onBlur);
      if (!disableInteractive) {
        interactiveWrapperListeners.onFocus = handleFocus;
        interactiveWrapperListeners.onBlur = handleBlur;
      }
    }
    const popperOptions = React2.useMemo(() => {
      var _PopperProps$popperOp;
      let tooltipModifiers = [{
        name: "arrow",
        enabled: Boolean(arrowRef),
        options: {
          element: arrowRef,
          padding: 4
        }
      }];
      if ((_PopperProps$popperOp = PopperProps.popperOptions) != null && _PopperProps$popperOp.modifiers) {
        tooltipModifiers = tooltipModifiers.concat(PopperProps.popperOptions.modifiers);
      }
      return (0, _extends22.default)({}, PopperProps.popperOptions, {
        modifiers: tooltipModifiers
      });
    }, [arrowRef, PopperProps]);
    const ownerState = (0, _extends22.default)({}, props, {
      isRtl,
      arrow: arrow2,
      disableInteractive,
      placement,
      PopperComponentProp,
      touch: ignoreNonTouchEvents.current
    });
    const classes = useUtilityClasses4(ownerState);
    const PopperComponent = (_components$Popper = components.Popper) != null ? _components$Popper : TooltipPopper;
    const TransitionComponent = (_ref = TransitionComponentProp != null ? TransitionComponentProp : components.Transition) != null ? _ref : _Grow.default;
    const TooltipComponent = (_components$Tooltip = components.Tooltip) != null ? _components$Tooltip : TooltipTooltip;
    const ArrowComponent = (_components$Arrow = components.Arrow) != null ? _components$Arrow : TooltipArrow;
    const popperProps = (0, core.appendOwnerState)(PopperComponent, (0, _extends22.default)({}, PopperProps, componentsProps.popper), ownerState);
    const transitionProps = (0, core.appendOwnerState)(TransitionComponent, (0, _extends22.default)({}, TransitionProps, componentsProps.transition), ownerState);
    const tooltipProps = (0, core.appendOwnerState)(TooltipComponent, (0, _extends22.default)({}, componentsProps.tooltip), ownerState);
    const tooltipArrowProps = (0, core.appendOwnerState)(ArrowComponent, (0, _extends22.default)({}, componentsProps.arrow), ownerState);
    return /* @__PURE__ */ (0, jsxRuntime.jsxs)(React2.Fragment, {
      children: [/* @__PURE__ */ React2.cloneElement(children, childrenProps), /* @__PURE__ */ (0, jsxRuntime.jsx)(PopperComponent, (0, _extends22.default)({
        as: PopperComponentProp != null ? PopperComponentProp : _Popper.default,
        placement,
        anchorEl: followCursor ? {
          getBoundingClientRect: () => ({
            top: positionRef.current.y,
            left: positionRef.current.x,
            right: positionRef.current.x,
            bottom: positionRef.current.y,
            width: 0,
            height: 0
          })
        } : childNode,
        popperRef,
        open: childNode ? open : false,
        id: id2,
        transition: true
      }, interactiveWrapperListeners, popperProps, {
        className: (0, _clsx.default)(classes.popper, (_componentsProps$popp = componentsProps.popper) == null ? void 0 : _componentsProps$popp.className),
        popperOptions,
        children: ({
          TransitionProps: TransitionPropsInner
        }) => {
          var _componentsProps$tool, _componentsProps$arro;
          return /* @__PURE__ */ (0, jsxRuntime.jsx)(TransitionComponent, (0, _extends22.default)({
            timeout: theme.transitions.duration.shorter
          }, TransitionPropsInner, transitionProps, {
            children: /* @__PURE__ */ (0, jsxRuntime.jsxs)(TooltipComponent, (0, _extends22.default)({}, tooltipProps, {
              className: (0, _clsx.default)(classes.tooltip, (_componentsProps$tool = componentsProps.tooltip) == null ? void 0 : _componentsProps$tool.className),
              children: [title, arrow2 ? /* @__PURE__ */ (0, jsxRuntime.jsx)(ArrowComponent, (0, _extends22.default)({}, tooltipArrowProps, {
                className: (0, _clsx.default)(classes.arrow, (_componentsProps$arro = componentsProps.arrow) == null ? void 0 : _componentsProps$arro.className),
                ref: setArrowRef
              })) : null]
            }))
          }));
        }
      }))]
    });
  });
  var _default = Tooltip2;
  exports.default = _default;
});
var Tooltip = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _exportNames = {
    tooltipClasses: true
  };
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
      return _Tooltip.default;
    }
  });
  Object.defineProperty(exports, "tooltipClasses", {
    enumerable: true,
    get: function() {
      return _tooltipClasses.default;
    }
  });
  var _Tooltip = interopRequireDefault(Tooltip_1);
  var _tooltipClasses = _interopRequireWildcard(tooltipClasses_1);
  Object.keys(_tooltipClasses).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key))
      return;
    if (key in exports && exports[key] === _tooltipClasses[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _tooltipClasses[key];
      }
    });
  });
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function")
      return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop2) {
      return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
      return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
      return {default: obj};
    }
    var cache2 = _getRequireWildcardCache(nodeInterop);
    if (cache2 && cache2.has(obj)) {
      return cache2.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj.default = obj;
    if (cache2) {
      cache2.set(obj, newObj);
    }
    return newObj;
  }
});
var __pika_web_default_export_for_treeshaking__5 = /* @__PURE__ */ getDefaultExportFromCjs(Tooltip);
var Tooltip_default = __pika_web_default_export_for_treeshaking__5;

// docs/dist/form/People.js
var People = () => {
  const {values: values3, errors} = (0, import_formik_esm_c35373e0.u)();
  return /* @__PURE__ */ createElement(import_formik_esm_c35373e0.c, {
    name: "people"
  }, ({remove, push}) => /* @__PURE__ */ createElement(Fragment, null, /* @__PURE__ */ createElement(Typography_default, null, "Who ate? 😋"), values3.people.length > 0 && values3.people.map((friend, index) => /* @__PURE__ */ createElement(Stack_default, {
    direction: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    spacing: 2,
    sx: {m: 2},
    key: index
  }, /* @__PURE__ */ createElement(import_formik_esm_c35373e0.b, {
    name: `people.${index}.name`,
    label: "Name",
    component: TextField$1
  }), /* @__PURE__ */ createElement(Tooltip_default, {
    title: "Delete"
  }, /* @__PURE__ */ createElement(Button_default, {
    type: "button",
    variant: "outlined",
    sx: {minWidth: 0, height: 56, width: 56},
    className: "secondary",
    onClick: () => remove(index)
  }, "🗑️")))), /* @__PURE__ */ createElement(Button_default, {
    type: "button",
    sx: {m: 2},
    variant: "outlined",
    className: "secondary",
    onClick: () => push({name: ""})
  }, "Add Friend 💃"), typeof errors.people === "string" ? /* @__PURE__ */ createElement(Typography_default, {
    variant: "body2",
    sx: {m: 4, color: "error.main"}
  }, errors.people) : null));
};
var People_default = People;

// docs/dist/form/Dish.js
var Dish = ({index, remove}) => {
  const {values: values3} = (0, import_formik_esm_c35373e0.u)();
  return /* @__PURE__ */ react.createElement(Stack_default, {
    justifyContent: "center",
    alignItems: "center",
    direction: "column",
    spacing: {xs: 1, sm: 2, md: 4},
    key: index
  }, /* @__PURE__ */ react.createElement(Stack_default, {
    direction: "row",
    spacing: 2
  }, /* @__PURE__ */ react.createElement(import_formik_esm_c35373e0.b, {
    name: `plates.${index}.name`,
    placeholder: "Dish",
    label: "Dish",
    component: TextField$1
  }), /* @__PURE__ */ react.createElement(import_formik_esm_c35373e0.b, {
    name: `plates.${index}.price`,
    placeholder: "Price",
    label: "Price",
    type: "number",
    component: TextField$1
  })), /* @__PURE__ */ react.createElement(Stack_default, {
    direction: "row",
    spacing: 2,
    alignItems: "center"
  }, /* @__PURE__ */ react.createElement(Typography_default, {
    variant: "caption"
  }, "who ate it?"), /* @__PURE__ */ react.createElement(import_formik_esm_c35373e0.b, {
    component: "select",
    name: `plates.${index}.eatenBy`,
    multiple: true,
    style: {width: 56, height: 56}
  }, values3.people.map(({name}, index2) => /* @__PURE__ */ react.createElement("option", {
    key: index2,
    value: name
  }, name))), /* @__PURE__ */ react.createElement(import_formik_esm_c35373e0.E, {
    name: `plates.${index}.eatenBy`
  }, (msg) => /* @__PURE__ */ react.createElement("div", null, /* @__PURE__ */ react.createElement(Typography_default, {
    variant: "caption",
    sx: {m: 4, color: "error.main"}
  }, msg))), /* @__PURE__ */ react.createElement(Tooltip_default, {
    title: "Delete"
  }, /* @__PURE__ */ react.createElement(Button_default, {
    type: "button",
    variant: "outlined",
    sx: {minWidth: 0, height: 56, width: 56},
    className: "secondary",
    onClick: () => remove(index)
  }, "🗑️"))));
};
Dish.propTypes = {
  index: propTypes.number,
  remove: propTypes.func
};
var Dish_default = Dish;

// docs/dist/form/Dishes.js
var Dishes = () => {
  const {values: values3, errors} = (0, import_formik_esm_c35373e0.u)();
  return /* @__PURE__ */ react.createElement(import_formik_esm_c35373e0.c, {
    name: "plates"
  }, ({remove, push}) => /* @__PURE__ */ react.createElement(Stack_default, {
    spacing: 2,
    alignItems: "center"
  }, /* @__PURE__ */ react.createElement(Typography_default, null, "What did you order? 🥘"), values3.plates.length > 0 && values3.plates.map((_plate, index) => /* @__PURE__ */ react.createElement(Dish_default, {
    key: index,
    index,
    remove
  })), /* @__PURE__ */ react.createElement(Stack_default, null, /* @__PURE__ */ react.createElement(Button_default, {
    type: "button",
    variant: "outlined",
    className: "secondary",
    sx: {mb: 2},
    onClick: () => push({
      name: "",
      price: "",
      eatenBy: []
    })
  }, "Add Dish 😋"), typeof errors.plates === "string" ? /* @__PURE__ */ react.createElement(Typography_default, {
    variant: "body2",
    sx: {m: 4, color: "red"}
  }, errors.plates) : null)));
};
var Dishes_default = Dishes;

// docs/dist/form/Cost.js
var Cost = () => {
  return /* @__PURE__ */ react.createElement(react.Fragment, null, /* @__PURE__ */ react.createElement(Typography_default, null, "What did it cost? 💰"), /* @__PURE__ */ react.createElement(Stack_default, {
    direction: "row",
    justifyContent: "center",
    alignItems: "center",
    sx: {m: 2},
    spacing: 2
  }, /* @__PURE__ */ react.createElement(import_formik_esm_c35373e0.b, {
    name: "price",
    placeholder: "Price",
    type: "number",
    label: "Receipt Total",
    component: TextField$1
  }), /* @__PURE__ */ react.createElement(import_formik_esm_c35373e0.b, {
    name: "tip",
    type: "number",
    placeholder: "Tip",
    label: "Tip",
    component: TextField$1
  })));
};
var Cost_default = Cost;

// docs/snowpack/pkg/@mui/material/Divider.js
var dividerClasses_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  exports.getDividerUtilityClass = getDividerUtilityClass;
  function getDividerUtilityClass(slot) {
    return (0, core.generateUtilityClass)("MuiDivider", slot);
  }
  const dividerClasses = (0, core.generateUtilityClasses)("MuiDivider", ["root", "absolute", "fullWidth", "inset", "middle", "flexItem", "light", "vertical", "withChildren", "withChildrenVertical", "textAlignRight", "textAlignLeft", "wrapper", "wrapperVertical"]);
  var _default = dividerClasses;
  exports.default = _default;
});
var Divider_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _objectWithoutPropertiesLoose22 = interopRequireDefault(objectWithoutPropertiesLoose);
  var _extends22 = interopRequireDefault(_extends_1);
  var React2 = _interopRequireWildcard(react);
  var _propTypes = interopRequireDefault(propTypes);
  var _clsx = interopRequireDefault(clsx);
  var _styled = interopRequireDefault(styled_1);
  var _useThemeProps = interopRequireDefault(useThemeProps_1);
  const _excluded8 = ["absolute", "children", "className", "component", "flexItem", "light", "orientation", "role", "textAlign", "variant"];
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function")
      return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop2) {
      return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
      return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
      return {default: obj};
    }
    var cache2 = _getRequireWildcardCache(nodeInterop);
    if (cache2 && cache2.has(obj)) {
      return cache2.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj.default = obj;
    if (cache2) {
      cache2.set(obj, newObj);
    }
    return newObj;
  }
  const useUtilityClasses4 = (ownerState) => {
    const {
      absolute,
      children,
      classes,
      flexItem,
      light: light2,
      orientation,
      textAlign: textAlign2,
      variant
    } = ownerState;
    const slots = {
      root: ["root", absolute && "absolute", variant, light2 && "light", orientation === "vertical" && "vertical", flexItem && "flexItem", children && "withChildren", children && orientation === "vertical" && "withChildrenVertical", textAlign2 === "right" && orientation !== "vertical" && "textAlignRight", textAlign2 === "left" && orientation !== "vertical" && "textAlignLeft"],
      wrapper: ["wrapper", orientation === "vertical" && "wrapperVertical"]
    };
    return (0, core.unstable_composeClasses)(slots, dividerClasses_1.getDividerUtilityClass, classes);
  };
  const DividerRoot = (0, _styled.default)("div", {
    name: "MuiDivider",
    slot: "Root",
    overridesResolver: (props, styles2) => {
      const {
        ownerState
      } = props;
      return [styles2.root, ownerState.absolute && styles2.absolute, styles2[ownerState.variant], ownerState.light && styles2.light, ownerState.orientation === "vertical" && styles2.vertical, ownerState.flexItem && styles2.flexItem, ownerState.children && styles2.withChildren, ownerState.children && ownerState.orientation === "vertical" && styles2.withChildrenVertical, ownerState.textAlign === "right" && ownerState.orientation !== "vertical" && styles2.textAlignRight, ownerState.textAlign === "left" && ownerState.orientation !== "vertical" && styles2.textAlignLeft];
    }
  })(({
    theme,
    ownerState
  }) => (0, _extends22.default)({
    margin: 0,
    flexShrink: 0,
    borderWidth: 0,
    borderStyle: "solid",
    borderColor: theme.palette.divider,
    borderBottomWidth: "thin"
  }, ownerState.absolute && {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%"
  }, ownerState.light && {
    borderColor: (0, esm$1.alpha)(theme.palette.divider, 0.08)
  }, ownerState.variant === "inset" && {
    marginLeft: 72
  }, ownerState.variant === "middle" && ownerState.orientation === "horizontal" && {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  }, ownerState.variant === "middle" && ownerState.orientation === "vertical" && {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }, ownerState.orientation === "vertical" && {
    height: "100%",
    borderBottomWidth: 0,
    borderRightWidth: "thin"
  }, ownerState.flexItem && {
    alignSelf: "stretch",
    height: "auto"
  }), ({
    theme,
    ownerState
  }) => (0, _extends22.default)({}, ownerState.children && {
    display: "flex",
    whiteSpace: "nowrap",
    textAlign: "center",
    border: 0,
    "&::before, &::after": {
      position: "relative",
      width: "100%",
      borderTop: `thin solid ${theme.palette.divider}`,
      top: "50%",
      content: '""',
      transform: "translateY(50%)"
    }
  }), ({
    theme,
    ownerState
  }) => (0, _extends22.default)({}, ownerState.children && ownerState.orientation === "vertical" && {
    flexDirection: "column",
    "&::before, &::after": {
      height: "100%",
      top: "0%",
      left: "50%",
      borderTop: 0,
      borderLeft: `thin solid ${theme.palette.divider}`,
      transform: "translateX(0%)"
    }
  }), ({
    ownerState
  }) => (0, _extends22.default)({}, ownerState.textAlign === "right" && ownerState.orientation !== "vertical" && {
    "&::before": {
      width: "90%"
    },
    "&::after": {
      width: "10%"
    }
  }, ownerState.textAlign === "left" && ownerState.orientation !== "vertical" && {
    "&::before": {
      width: "10%"
    },
    "&::after": {
      width: "90%"
    }
  }));
  const DividerWrapper = (0, _styled.default)("span", {
    name: "MuiDivider",
    slot: "Wrapper",
    overridesResolver: (props, styles2) => {
      const {
        ownerState
      } = props;
      return [styles2.wrapper, ownerState.orientation === "vertical" && styles2.wrapperVertical];
    }
  })(({
    theme,
    ownerState
  }) => (0, _extends22.default)({
    display: "inline-block",
    paddingLeft: theme.spacing(1.2),
    paddingRight: theme.spacing(1.2)
  }, ownerState.orientation === "vertical" && {
    paddingTop: theme.spacing(1.2),
    paddingBottom: theme.spacing(1.2)
  }));
  const Divider2 = /* @__PURE__ */ React2.forwardRef(function Divider3(inProps, ref) {
    const props = (0, _useThemeProps.default)({
      props: inProps,
      name: "MuiDivider"
    });
    const {
      absolute = false,
      children,
      className,
      component = children ? "div" : "hr",
      flexItem = false,
      light: light2 = false,
      orientation = "horizontal",
      role = component !== "hr" ? "separator" : void 0,
      textAlign: textAlign2 = "center",
      variant = "fullWidth"
    } = props, other = (0, _objectWithoutPropertiesLoose22.default)(props, _excluded8);
    const ownerState = (0, _extends22.default)({}, props, {
      absolute,
      component,
      flexItem,
      light: light2,
      orientation,
      role,
      textAlign: textAlign2,
      variant
    });
    const classes = useUtilityClasses4(ownerState);
    return /* @__PURE__ */ (0, jsxRuntime.jsx)(DividerRoot, (0, _extends22.default)({
      as: component,
      className: (0, _clsx.default)(classes.root, className),
      role,
      ref,
      ownerState
    }, other, {
      children: children ? /* @__PURE__ */ (0, jsxRuntime.jsx)(DividerWrapper, {
        className: classes.wrapper,
        ownerState,
        children
      }) : null
    }));
  });
  var _default = Divider2;
  exports.default = _default;
});
var Divider = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _exportNames = {
    dividerClasses: true
  };
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
      return _Divider.default;
    }
  });
  Object.defineProperty(exports, "dividerClasses", {
    enumerable: true,
    get: function() {
      return _dividerClasses.default;
    }
  });
  var _Divider = interopRequireDefault(Divider_1);
  var _dividerClasses = _interopRequireWildcard(dividerClasses_1);
  Object.keys(_dividerClasses).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key))
      return;
    if (key in exports && exports[key] === _dividerClasses[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _dividerClasses[key];
      }
    });
  });
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function")
      return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop2) {
      return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
      return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
      return {default: obj};
    }
    var cache2 = _getRequireWildcardCache(nodeInterop);
    if (cache2 && cache2.has(obj)) {
      return cache2.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj.default = obj;
    if (cache2) {
      cache2.set(obj, newObj);
    }
    return newObj;
  }
});
var __pika_web_default_export_for_treeshaking__6 = /* @__PURE__ */ getDefaultExportFromCjs(Divider);
var Divider_default = __pika_web_default_export_for_treeshaking__6;

// docs/snowpack/pkg/@mui/material/Paper.js
var paperClasses_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  exports.getPaperUtilityClass = getPaperUtilityClass2;
  function getPaperUtilityClass2(slot) {
    return (0, core.generateUtilityClass)("MuiPaper", slot);
  }
  const paperClasses2 = (0, core.generateUtilityClasses)("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
  var _default = paperClasses2;
  exports.default = _default;
});
var Paper_1 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  var _objectWithoutPropertiesLoose22 = interopRequireDefault(objectWithoutPropertiesLoose);
  var _extends22 = interopRequireDefault(_extends_1);
  var React2 = _interopRequireWildcard(react);
  var _propTypes = interopRequireDefault(propTypes);
  var _clsx = interopRequireDefault(clsx);
  var _styled = interopRequireDefault(styled_1);
  var _useThemeProps = interopRequireDefault(useThemeProps_1);
  var _useTheme = interopRequireDefault(useTheme_1);
  const _excluded8 = ["className", "component", "elevation", "square", "variant"];
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function")
      return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop2) {
      return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
      return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
      return {default: obj};
    }
    var cache2 = _getRequireWildcardCache(nodeInterop);
    if (cache2 && cache2.has(obj)) {
      return cache2.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj.default = obj;
    if (cache2) {
      cache2.set(obj, newObj);
    }
    return newObj;
  }
  const getOverlayAlpha2 = (elevation) => {
    let alphaValue;
    if (elevation < 1) {
      alphaValue = 5.11916 * elevation ** 2;
    } else {
      alphaValue = 4.5 * Math.log(elevation + 1) + 2;
    }
    return (alphaValue / 100).toFixed(2);
  };
  const useUtilityClasses4 = (ownerState) => {
    const {
      square,
      elevation,
      variant,
      classes
    } = ownerState;
    const slots = {
      root: ["root", variant, !square && "rounded", variant === "elevation" && `elevation${elevation}`]
    };
    return (0, core.unstable_composeClasses)(slots, paperClasses_1.getPaperUtilityClass, classes);
  };
  const PaperRoot2 = (0, _styled.default)("div", {
    name: "MuiPaper",
    slot: "Root",
    overridesResolver: (props, styles2) => {
      const {
        ownerState
      } = props;
      return [styles2.root, styles2[ownerState.variant], !ownerState.square && styles2.rounded, ownerState.variant === "elevation" && styles2[`elevation${ownerState.elevation}`]];
    }
  })(({
    theme,
    ownerState
  }) => (0, _extends22.default)({
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    transition: theme.transitions.create("box-shadow")
  }, !ownerState.square && {
    borderRadius: theme.shape.borderRadius
  }, ownerState.variant === "outlined" && {
    border: `1px solid ${theme.palette.divider}`
  }, ownerState.variant === "elevation" && (0, _extends22.default)({
    boxShadow: theme.shadows[ownerState.elevation]
  }, theme.palette.mode === "dark" && {
    backgroundImage: `linear-gradient(${(0, esm$1.alpha)("#fff", getOverlayAlpha2(ownerState.elevation))}, ${(0, esm$1.alpha)("#fff", getOverlayAlpha2(ownerState.elevation))})`
  })));
  const Paper4 = /* @__PURE__ */ React2.forwardRef(function Paper5(inProps, ref) {
    const props = (0, _useThemeProps.default)({
      props: inProps,
      name: "MuiPaper"
    });
    const {
      className,
      component = "div",
      elevation = 1,
      square = false,
      variant = "elevation"
    } = props, other = (0, _objectWithoutPropertiesLoose22.default)(props, _excluded8);
    const ownerState = (0, _extends22.default)({}, props, {
      component,
      elevation,
      square,
      variant
    });
    const classes = useUtilityClasses4(ownerState);
    return /* @__PURE__ */ (0, jsxRuntime.jsx)(PaperRoot2, (0, _extends22.default)({
      as: component,
      ownerState,
      className: (0, _clsx.default)(classes.root, className),
      ref
    }, other));
  });
  var _default = Paper4;
  exports.default = _default;
});
var Paper3 = createCommonjsModule(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var _exportNames = {
    paperClasses: true
  };
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
      return _Paper.default;
    }
  });
  Object.defineProperty(exports, "paperClasses", {
    enumerable: true,
    get: function() {
      return _paperClasses.default;
    }
  });
  var _Paper = interopRequireDefault(Paper_1);
  var _paperClasses = _interopRequireWildcard(paperClasses_1);
  Object.keys(_paperClasses).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key))
      return;
    if (key in exports && exports[key] === _paperClasses[key])
      return;
    Object.defineProperty(exports, key, {
      enumerable: true,
      get: function() {
        return _paperClasses[key];
      }
    });
  });
  function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function")
      return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop2) {
      return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
  }
  function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
      return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
      return {default: obj};
    }
    var cache2 = _getRequireWildcardCache(nodeInterop);
    if (cache2 && cache2.has(obj)) {
      return cache2.get(obj);
    }
    var newObj = {};
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var key in obj) {
      if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) {
          Object.defineProperty(newObj, key, desc);
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    newObj.default = obj;
    if (cache2) {
      cache2.set(obj, newObj);
    }
    return newObj;
  }
});
var __pika_web_default_export_for_treeshaking__7 = /* @__PURE__ */ getDefaultExportFromCjs(Paper3);
var Paper_default = __pika_web_default_export_for_treeshaking__7;

// docs/dist/components/Receipts.js
var Receipts = ({tallies}) => {
  const {values: values3} = (0, import_formik_esm_c35373e0.u)();
  return /* @__PURE__ */ react.createElement(Stack_default, {
    spacing: 6,
    sx: {m: 3}
  }, /* @__PURE__ */ react.createElement(Paper_default, {
    sx: {width: 200, p: 2}
  }, /* @__PURE__ */ react.createElement(Typography_default, {
    variant: "h6"
  }, "Big Receipt"), values3.plates.map((plate, index) => /* @__PURE__ */ react.createElement(Stack_default, {
    key: index,
    spacing: 2,
    direction: "row",
    justifyContent: "space-between",
    sx: {pb: 1}
  }, /* @__PURE__ */ react.createElement(Typography_default, {
    variant: "caption"
  }, plate.name), /* @__PURE__ */ react.createElement(Typography_default, {
    variant: "body2",
    sx: {textAlign: "right"}
  }, "$", plate.price))), /* @__PURE__ */ react.createElement(Divider_default, {
    sx: {mt: 2, mb: 2}
  }), /* @__PURE__ */ react.createElement(Stack_default, {
    spacing: 2,
    direction: "row",
    justifyContent: "space-between",
    sx: {pb: 1}
  }, /* @__PURE__ */ react.createElement(Typography_default, {
    variant: "caption"
  }, "Tax"), /* @__PURE__ */ react.createElement(Typography_default, {
    variant: "body2",
    sx: {textAlign: "right"}
  }, "$", tallies.taxTotal)), /* @__PURE__ */ react.createElement(Stack_default, {
    spacing: 2,
    direction: "row",
    justifyContent: "space-between",
    sx: {pb: 1}
  }, /* @__PURE__ */ react.createElement(Typography_default, {
    variant: "caption"
  }, "Tip"), /* @__PURE__ */ react.createElement(Typography_default, {
    variant: "body2",
    sx: {textAlign: "right"}
  }, "$", tallies.tip)), /* @__PURE__ */ react.createElement(Divider_default, {
    sx: {mt: 2, mb: 2}
  }), /* @__PURE__ */ react.createElement(Stack_default, {
    spacing: 2,
    direction: "row",
    justifyContent: "space-between",
    sx: {pb: 1}
  }, /* @__PURE__ */ react.createElement(Typography_default, {
    variant: "caption"
  }, "Total"), /* @__PURE__ */ react.createElement(Typography_default, {
    variant: "body2",
    sx: {textAlign: "right"}
  }, "$", tallies.total))), Object.keys(tallies.splits).map((name) => /* @__PURE__ */ react.createElement(Paper_default, {
    sx: {width: 200, p: 2},
    key: name
  }, /* @__PURE__ */ react.createElement(Typography_default, {
    variant: "h6"
  }, name), tallies.splits[name].ledger.map((plate, index) => /* @__PURE__ */ react.createElement(Stack_default, {
    key: index,
    spacing: 2,
    direction: "row",
    justifyContent: "space-between",
    sx: {pb: 1}
  }, /* @__PURE__ */ react.createElement(Typography_default, {
    variant: "caption"
  }, plate.name), /* @__PURE__ */ react.createElement(Typography_default, {
    variant: "body2",
    sx: {textAlign: "right"}
  }, "$", plate.plateCost))), /* @__PURE__ */ react.createElement(Divider_default, {
    sx: {mt: 2, mb: 2}
  }), /* @__PURE__ */ react.createElement(Stack_default, {
    spacing: 2,
    direction: "row",
    justifyContent: "space-between",
    sx: {pb: 1}
  }, /* @__PURE__ */ react.createElement(Typography_default, {
    variant: "caption"
  }, "Tax"), /* @__PURE__ */ react.createElement(Typography_default, {
    variant: "body2",
    sx: {textAlign: "right"}
  }, "$", tallies.splits[name].tax.toFixed(2))), /* @__PURE__ */ react.createElement(Stack_default, {
    spacing: 2,
    direction: "row",
    justifyContent: "space-between",
    sx: {pb: 1}
  }, /* @__PURE__ */ react.createElement(Typography_default, {
    variant: "caption"
  }, "Tip"), /* @__PURE__ */ react.createElement(Typography_default, {
    variant: "body2",
    sx: {textAlign: "right"}
  }, "$", tallies.splits[name].tip.toFixed(2))), /* @__PURE__ */ react.createElement(Divider_default, {
    sx: {mt: 2, mb: 2}
  }), /* @__PURE__ */ react.createElement(Stack_default, {
    spacing: 2,
    direction: "row",
    justifyContent: "space-between",
    sx: {pb: 1}
  }, /* @__PURE__ */ react.createElement(Typography_default, {
    variant: "caption"
  }, "Total"), /* @__PURE__ */ react.createElement(Typography_default, {
    variant: "body2",
    sx: {textAlign: "right"}
  }, "$", tallies.splits[name].total.toFixed(2))))));
};
Receipts.propTypes = {
  tallies: propTypes.shape({
    splits: propTypes.shape({
      total: propTypes.number,
      tax: propTypes.number,
      tip: propTypes.number,
      ledger: propTypes.arrayOf(propTypes.shape({
        name: propTypes.string,
        plateCost: propTypes.number,
        plateTotal: propTypes.number,
        tipCost: propTypes.number,
        taxCost: propTypes.number
      }))
    }),
    subTotal: propTypes.number,
    taxRate: propTypes.number,
    taxTotal: propTypes.number,
    preTipTotal: propTypes.number,
    tip: propTypes.number,
    total: propTypes.number
  })
};
var Receipts_default = Receipts;

// docs/dist/App.js
function App() {
  const [step, setStep] = react.useState(0);
  const submitForm = (values3, {setSubmitting, setTouched}) => {
    setStep(step + 1);
    setTouched({});
    setSubmitting(false);
  };
  return /* @__PURE__ */ react.createElement(Container_default, {
    maxWidth: "sm",
    sx: {display: "flex", alignItems: "flex-start", justifyContent: "center", flexWrap: "wrap", textAlign: "center"}
  }, /* @__PURE__ */ react.createElement(Typography_default, {
    variant: "h3",
    sx: {width: "100%", m: 12}
  }, "🥄 Chex"), /* @__PURE__ */ react.createElement(import_formik_esm_c35373e0.F, {
    initialValues: initialValues_default,
    validationSchema: validation_default[step],
    onSubmit: submitForm
  }, ({values: values3}) => /* @__PURE__ */ react.createElement(import_formik_esm_c35373e0.a, null, step === 0 && /* @__PURE__ */ react.createElement(People_default, null), step === 1 && /* @__PURE__ */ react.createElement(Dishes_default, null), step === 2 && /* @__PURE__ */ react.createElement(Cost_default, null), step === 3 && /* @__PURE__ */ react.createElement(Receipts_default, {
    tallies: util_default(values3)
  }), /* @__PURE__ */ react.createElement(Stack_default, {
    direction: "row",
    spacing: 3,
    justifyContent: "center",
    sx: {mb: 5}
  }, /* @__PURE__ */ react.createElement(Button_default, {
    variant: "outlined",
    disabled: step === 0,
    onClick: () => setStep(step - 1)
  }, "Previous"), step !== 3 && /* @__PURE__ */ react.createElement(Button_default, {
    variant: "outlined",
    type: "submit"
  }, step === 2 ? "Finish" : "Next"), step === 3 && /* @__PURE__ */ react.createElement(Button_default, {
    variant: "outlined",
    disabled: step === 0,
    onClick: () => setStep(0)
  }, "Start Over")))));
}
var App_default = App;

// docs/dist/index.js
import.meta.env = env_exports;
reactDom.render(/* @__PURE__ */ react.createElement(react.StrictMode, null, /* @__PURE__ */ react.createElement(App_default, null)), document.getElementById("root"));
if (void 0) {
  (void 0).accept();
}
//# sourceMappingURL=index.js.map
