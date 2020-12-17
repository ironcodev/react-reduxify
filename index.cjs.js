"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactRedux = require("react-redux");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function setProperty(source, prop, target) {
  var current = target;
  var obj = source;
  var key = prop;

  while (true) {
    var dotIndex = key.indexOf('.');

    if (dotIndex < 0) {
      current[key] = obj && obj[key];
      break;
    } else {
      var subKey = key.substr(0, dotIndex);
      current = current[subKey] = {};
      obj = obj && obj[subKey];
      key = key.substr(dotIndex + 1);
    }
  }
}

var reduxify = function reduxify(component, neededState, neededActions, mergeOptions, options) {
  var mapStateToProps = function mapStateToProps(state) {
    var result = null;

    if (neededState != null) {
      if (typeof neededState == 'string' || _instanceof(neededState, String)) {
        neededState = neededState.split(',');
      }

      if (Array.isArray(neededState)) {
        var _iterator = _createForOfIteratorHelper(neededState),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var stateKey = _step.value;

            if (result == null) {
              result = {};
            }

            setProperty(state, (stateKey || '').trim(), result);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } else {
        for (var _i = 0, _Object$keys = Object.keys(neededState); _i < _Object$keys.length; _i++) {
          var key = _Object$keys[_i];

          if (state[key]) {
            if (result == null) {
              result = {};
            }

            setProperty(state, key, result);
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

    return result;
  };
  return (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps, mergeOptions, options)(component);
};

var _default = reduxify;
exports["default"] = _default;