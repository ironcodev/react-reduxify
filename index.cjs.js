"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setProperty = setProperty;
exports.createActionReducer = exports.createActionFactory = exports[
  "default"
] = void 0;

var _reactRedux = require("react-redux");

var _locustjsBase = require("locustjs-base");

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly)
      symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    keys.push.apply(keys, symbols);
  }
  return keys;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(
          target,
          key,
          Object.getOwnPropertyDescriptor(source, key)
        );
      });
    }
  }
  return target;
}

var _marked = /*#__PURE__*/ regeneratorRuntime.mark(initStoreDefinitions);

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;
  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (
      Array.isArray(o) ||
      (it = _unsupportedIterableToArray(o)) ||
      (allowArrayLike && o && typeof o.length === "number")
    ) {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return { done: true };
          return { done: false, value: o[i++] };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }
    throw new TypeError(
      "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function s() {
      it = o[Symbol.iterator]();
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function setProperty(source, prop, target, defaultValue) {
  var obj = source;

  if (prop.startsWith("!") && prop.indexOf(":") < 0) {
    var lastDotIndex = prop.lastIndexOf(".");
    var lastEqIndex = prop.lastIndexOf("=");

    if (lastDotIndex > 0) {
      if (lastEqIndex > lastDotIndex) {
        prop =
          prop.substr(lastDotIndex + 1, lastEqIndex - lastDotIndex - 1) +
          ":" +
          prop.substr(1);
      } else {
        prop = prop.substr(lastDotIndex + 1) + ":" + prop.substr(1);
      }
    }
  }

  var colonIndex = prop.indexOf(":");
  var key = colonIndex > 0 ? prop.substr(colonIndex + 1).trim() : prop.trim();
  var current = colonIndex > 0 ? defaultValue : target;

  while (true) {
    var dotIndex = key.indexOf(".");

    if (dotIndex < 0) {
      var eqIndex = key.indexOf("=");
      defaultValue =
        defaultValue == undefined && eqIndex >= 0
          ? key.substr(eqIndex + 1)
          : defaultValue;
      var finalKey = eqIndex >= 0 ? key.substr(0, eqIndex).trim() : key;

      if (colonIndex <= 0) {
        current[finalKey] = (obj && obj[finalKey]) || defaultValue;
      } else {
        current = (obj && obj[finalKey]) || defaultValue;
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

var createActionFactory = function createActionFactory(type, payloadName) {
  return function (x) {
    return _defineProperty(
      {
        type: type
      },
      payloadName,
      x
    );
  };
};

exports.createActionFactory = createActionFactory;

function initStoreDefinitions(definitions) {
  var _iterator, _step, item, definition;

  return regeneratorRuntime.wrap(
    function initStoreDefinitions$(_context) {
      while (1) {
        switch ((_context.prev = _context.next)) {
          case 0:
            _iterator = _createForOfIteratorHelper(definitions);
            _context.prev = 1;

            _iterator.s();

          case 3:
            if ((_step = _iterator.n()).done) {
              _context.next = 12;
              break;
            }

            item = _step.value;
            definition = void 0;

            if ((0, _locustjsBase.isSomeObject)(item)) {
              /*
            	{
            		type: [string],
            		stateName: [string],
            		stateInitialValue: [any?],  // default: undefined
            		actionName: [string?],      // default: 'set' + stateName[0].toUpperCase() + stateName.substr(1)
            		action: [function?],        // default: createActionFactory(type, stateName)
            		reducer: [function?]        // default: { ...state, [stateName]: action[stateName]}
            	}
            */
              definition = [
                item.type,
                item.stateName,
                item.stateInitialValue,
                item.actionName,
                item.action,
                item.reducer
              ];
            } else {
              definition = item;
            }

            if (
              !(
                (0, _locustjsBase.isSomeArray)(definition) &&
                (0, _locustjsBase.isSomeString)(definition[0]) &&
                (0, _locustjsBase.isSomeString)(definition[1])
              )
            ) {
              _context.next = 10;
              break;
            }

            _context.next = 10;
            return definition;

          case 10:
            _context.next = 3;
            break;

          case 12:
            _context.next = 17;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](1);

            _iterator.e(_context.t0);

          case 17:
            _context.prev = 17;

            _iterator.f();

            return _context.finish(17);

          case 20:
          case "end":
            return _context.stop();
        }
      }
    },
    _marked,
    null,
    [[1, 14, 17, 20]]
  );
}

var createActionReducer = function createActionReducer(definitions) {
  var actions = {};
  var initialState = {};

  var _definitions = initStoreDefinitions(definitions);

  var _iterator2 = _createForOfIteratorHelper(_definitions),
    _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
      var definition = _step2.value;

      /*
      	[
      		type,
      		stateName,
      		stateInitialValue?,	// default: undefined
      		actionName?,		// default: 'set' + stateName[0].toUpperCase() + stateName.substr(1)
      		action?,			// default: createActionFactory(type, stateName)
      		reducer?			// default: { ...state, [stateName]: action[stateName]}
      	]
      */
      var type = definition[0];
      var stateName = definition[1];
      var actionName =
        definition.length > 3 && (0, _locustjsBase.isSomeString)(definition[3])
          ? definition[3]
          : "set" + stateName[0].toUpperCase() + stateName.substr(1);
      var action =
        definition.length > 4 && (0, _locustjsBase.isFunction)(definition[4])
          ? definition[4]
          : createActionFactory(type, stateName);
      actions[actionName] = action;
      var stateInitialValue = definition.length > 2 ? definition[2] : undefined;

      if ((0, _locustjsBase.isFunction)(stateInitialValue)) {
        initialState[stateName] = stateInitialValue();
      } else {
        initialState[stateName] = stateInitialValue;
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  var reducer = function reducer() {
    var state =
      arguments.length > 0 && arguments[0] !== undefined
        ? arguments[0]
        : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    var _definitions = initStoreDefinitions(definitions);

    var _iterator3 = _createForOfIteratorHelper(_definitions),
      _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
        var definition = _step3.value;
        var type = definition[0];
        var stateName = definition[1];

        if (action.type == type) {
          var result =
            definition.length > 5 &&
            (0, _locustjsBase.isFunction)(definition[5])
              ? definition[5](state, action)
              : _objectSpread(
                  _objectSpread({}, state),
                  {},
                  _defineProperty({}, stateName, action[stateName])
                );
          return result;
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    return state;
  };

  return {
    actions: actions,
    initialState: initialState,
    reducer: reducer
  };
};

exports.createActionReducer = createActionReducer;

var reduxify = function reduxify(
  component,
  neededStates,
  neededActions,
  mergeOptions,
  options
) {
  if (arguments.length == 0) {
    return;
  }

  if (arguments.length == 1 && (0, _locustjsBase.isArray)(component)) {
    return createActionReducer(component);
  }

  var mapStateToProps = function mapStateToProps(state) {
    var result = null;

    if (neededStates != null) {
      if ((0, _locustjsBase.isString)(neededStates)) {
        neededStates = neededStates.split(",");
      }

      if ((0, _locustjsBase.isArray)(neededStates)) {
        var _iterator4 = _createForOfIteratorHelper(neededStates),
          _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
            var stateKey = _step4.value;

            if (result == null) {
              result = {};
            }

            if ((0, _locustjsBase.isString)(stateKey)) {
              setProperty(state, stateKey, result);
            } else if ((0, _locustjsBase.isObject)(stateKey)) {
              setProperty(
                state,
                stateKey.name
                  ? "".concat(stateKey.name, ":").concat(stateKey.state)
                  : stateKey.state,
                result,
                stateKey["default"]
              );
            }
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      } else {
        for (
          var _i = 0, _Object$keys = Object.keys(neededStates);
          _i < _Object$keys.length;
          _i++
        ) {
          var key = _Object$keys[_i];
          var _stateKey = neededStates[key];

          if ((0, _locustjsBase.isString)(_stateKey)) {
            if (result == null) {
              result = {};
            }

            setProperty(
              state,
              _stateKey ? "".concat(key, ":").concat(_stateKey) : key,
              result
            );
          } else if ((0, _locustjsBase.isObject)(_stateKey)) {
            if (result == null) {
              result = {};
            }

            if (_stateKey.name) {
              setProperty(
                state,
                _stateKey.state
                  ? "".concat(_stateKey.name, ":").concat(_stateKey.state)
                  : "".concat(_stateKey.name, ":").concat(key),
                result,
                _stateKey["default"]
              );
            } else {
              setProperty(
                state,
                _stateKey.state
                  ? "".concat(key, ":").concat(_stateKey.state)
                  : key,
                result,
                _stateKey["default"]
              );
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

  var mapDispatchToProps =
    typeof neededActions == "function"
      ? neededActions
      : function (dispatch) {
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
                return dispatch(
                  neededActions[key].apply(neededActions, arguments)
                );
              };
            };

            for (
              var _i2 = 0, _Object$keys2 = Object.keys(neededActions);
              _i2 < _Object$keys2.length;
              _i2++
            ) {
              _loop();
            }
          }

          return result || {};
        };
  return (0, _reactRedux.connect)(
    mapStateToProps,
    mapDispatchToProps,
    mergeOptions,
    options
  )(component);
};

var _default = reduxify;
exports["default"] = _default;
