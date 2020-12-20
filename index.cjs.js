"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reactRedux = require("react-redux");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

var isString = function isString(x) {
  return typeof x == 'string' || _instanceof(x, String);
};

var isObject = function isObject(x) {
  return _typeof(x) == 'object' && x != null;
};

function setProperty(source, prop, target, defaultValue) {
  var obj = source;
  var colonIndex = prop.indexOf(':');
  var key = colonIndex > 0 ? prop.substr(colonIndex + 1).trim() : prop.trim();
  var current = colonIndex > 0 ? defaultValue : target;

  while (true) {
    var dotIndex = key.indexOf('.');

    if (dotIndex < 0) {
      var eqIndex = key.indexOf('=');
      defaultValue = defaultValue == undefined && eqIndex >= 0 ? key.substr(eqIndex + 1) : defaultValue;
      var finalKey = eqIndex >= 0 ? key.substr(0, eqIndex).trim() : key;

      if (colonIndex <= 0) {
        current[finalKey] = obj && obj[finalKey] || defaultValue;
      } else {
        current = obj && obj[finalKey] || defaultValue;
      }

      break;
    } else {
      var subKey = key.substr(0, dotIndex);

      if (colonIndex <= 0) {
        current = current[subKey] = {};
      }

      obj = obj && obj[subKey];
      key = key.substr(dotIndex + 1);
    }
  }

  if (colonIndex > 0) {
    target[prop.substr(0, colonIndex).trim()] = current;
  }
}

var reduxify = function reduxify(component, neededStates, neededActions, mergeOptions, options) {
  var mapStateToProps = function mapStateToProps(state) {
    var result = null;

    if (neededStates != null) {
      if (isString(neededStates)) {
        neededStates = neededStates.split(',');
      }

      if (Array.isArray(neededStates)) {
        var _iterator = _createForOfIteratorHelper(neededStates),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var stateKey = _step.value;

            if (result == null) {
              result = {};
            }

            if (isString(stateKey)) {
              setProperty(state, stateKey, result);
            } else if (isObject(stateKey)) {
              setProperty(state, stateKey.name ? "".concat(stateKey.name, ":").concat(stateKey.state) : stateKey.state, result, stateKey.default);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } else {
        for (var _i = 0, _Object$keys = Object.keys(neededStates); _i < _Object$keys.length; _i++) {
          var key = _Object$keys[_i];
          var _stateKey = neededStates[key];

          if (isString(_stateKey)) {
            if (result == null) {
              result = {};
            }

            setProperty(state, _stateKey ? "".concat(key, ":").concat(_stateKey) : key, result);
          } else if (isObject(_stateKey)) {
            if (result == null) {
              result = {};
            }

            if (_stateKey.name) {
              setProperty(state, _stateKey.state ? "".concat(_stateKey.name, ":").concat(_stateKey.state) : "".concat(_stateKey.name, ":").concat(key), result, _stateKey.default);
            } else {
              setProperty(state, _stateKey.state ? "".concat(key, ":").concat(_stateKey.state) : key, result, _stateKey.default);
            }
          } else {
            if (result == null) {
              result = {};
            }

            setProperty(state, key, result, _stateKey);
          }
        }
      }
    }

    return result;
  };

  var mapDispatchToProps = typeof neededActions == 'function' ? neededActions : function (dispatch) {
    var result = null;

    if (neededActions != null) {
      if (neededActions.dispatch == null) {
        result = {
          dispatch: dispatch
        }; // put dispatch in the props to provide free dispatch
      }

      var _loop = function _loop() {
        var key = _Object$keys2[_i2];

        if (result == null) {
          result = {};
        }

        result[key] = function () {
          return dispatch(neededActions[key].apply(neededActions, arguments));
        };
      };

      for (var _i2 = 0, _Object$keys2 = Object.keys(neededActions); _i2 < _Object$keys2.length; _i2++) {
        _loop();
      }
    }

    return result || {};
  };
  return (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, mergeOptions, options)(component);
};

var _default = reduxify;
exports.default = _default;