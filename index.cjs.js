"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setProperty = setProperty;
exports.createActionReducer = createActionReducer;
exports.createActionFactory = exports["default"] = void 0;

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

var action_type_count = 0;

var isValidStateName = function isValidStateName(x) {
  return (0, _locustjsBase.isSomeString)(x) && /^[A-Za-z_]\w*$/.test(x);
};

var isValidActionName = isValidStateName;

var getDefaultActionName = function getDefaultActionName(x) {
  return "set" + x[0].toUpperCase() + x.substr(1);
};

var createActionFactory = function createActionFactory(type, payloadName) {
  return (0, _locustjsBase.isSomeString)(payloadName)
    ? function (x) {
        return _defineProperty(
          {
            type: type
          },
          payloadName,
          x
        );
      }
    : function () {
        return {
          type: type
        };
      };
};

exports.createActionFactory = createActionFactory;

function extractState(state, value) {
  var stateName = "";
  var stateValue = value;

  if (isValidStateName(state)) {
    stateName = state;
  } else if ((0, _locustjsBase.isSomeObject)(state)) {
    for (
      var _i = 0, _Object$keys = Object.keys(state);
      _i < _Object$keys.length;
      _i++
    ) {
      var stateKey = _Object$keys[_i];

      if (isValidStateName(stateKey)) {
        stateName = stateKey;
        stateValue = state[stateKey];
        break;
      }
    }
  }

  return stateName
    ? {
        name: stateName,
        initialValue: stateValue
      }
    : null;
}

function extractActions(type, action, stateName, switchActionToReducer) {
  var actions = [];

  if ((0, _locustjsBase.isEmpty)(action)) {
    actions.push({
      type: type,
      actionName: getDefaultActionName(stateName)
    });
  } else if ((0, _locustjsBase.isFunction)(action)) {
    if (switchActionToReducer) {
      actions.push({
        type: type,
        actionName: getDefaultActionName(stateName),
        reducer: action
      });
    } else {
      actions.push({
        type: type,
        actionName: getDefaultActionName(stateName),
        action: action
      });
    }
  } else if (isValidActionName(action)) {
    actions.push({
      type: type,
      actionName: action
    });
  } else if ((0, _locustjsBase.isArray)(action)) {
    var _iterator = _createForOfIteratorHelper(action),
      _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var act = _step.value;

        if ((0, _locustjsBase.isSomeObject)(act)) {
          for (
            var _i2 = 0, _Object$keys2 = Object.keys(act);
            _i2 < _Object$keys2.length;
            _i2++
          ) {
            var actionName = _Object$keys2[_i2];
            var actionValue = act[actionName];

            if (isValidActionName(actionName)) {
              if ((0, _locustjsBase.isFunction)(actionValue)) {
                actions.push({
                  type: type,
                  actionName: actionName,
                  reducer: actionValue
                });
              } else if ((0, _locustjsBase.isSomeObject)(actionValue)) {
                for (
                  var _i3 = 0, _Object$keys3 = Object.keys(actionValue);
                  _i3 < _Object$keys3.length;
                  _i3++
                ) {
                  var ar = _Object$keys3[_i3];

                  if (
                    (0, _locustjsBase.isFunction)(ar) &&
                    (0, _locustjsBase.isFunction)(actionValue[ar])
                  ) {
                    actions.push({
                      type: type,
                      actionName: actionName,
                      action: ar,
                      reducer: actionValue[ar]
                    });
                    break;
                  }
                }
              }

              break;
            }
          }
        } else if (isValidActionName(act)) {
          actions.push({
            type: type,
            actionName: act,
            reducer: function reducer(s, a) {
              return _objectSpread(
                _objectSpread({}, s),
                {},
                _defineProperty({}, stateName, a[stateName])
              );
            }
          });
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  } else if ((0, _locustjsBase.isSomeObject)(action)) {
    for (
      var _i4 = 0, _Object$keys4 = Object.keys(action);
      _i4 < _Object$keys4.length;
      _i4++
    ) {
      var key = _Object$keys4[_i4];

      if (isValidActionName(key)) {
        var _actionValue = action[key];

        if ((0, _locustjsBase.isFunction)(_actionValue)) {
          actions.push({
            type: type,
            actionName: key,
            reducer: _actionValue
          });
        } else if ((0, _locustjsBase.isSomeObject)(_actionValue)) {
          if ((0, _locustjsBase.isFunction)(_actionValue.action)) {
            if ((0, _locustjsBase.isFunction)(_actionValue.reducer)) {
              actions.push({
                type: type,
                actionName: key,
                action: _actionValue.action,
                reducer: _actionValue.reducer
              });
            } else {
              actions.push({
                type: type,
                actionName: key,
                action: _actionValue.action
              });
            }
          }
        } else if ((0, _locustjsBase.isSomeArray)(_actionValue)) {
          var _action = _actionValue[0];

          var _reducer = _actionValue.length > 1 ? _actionValue[1] : null;

          if ((0, _locustjsBase.isFunction)(_action)) {
            if ((0, _locustjsBase.isFunction)(_reducer)) {
              actions.push({
                type: type,
                actionName: key,
                action: _action,
                reducer: _reducer
              });
            } else {
              actions.push({
                type: type,
                actionName: key,
                action: _action
              });
            }
          }
        }
      }
    }
  }

  return actions;
}

function initStoreDefinitions(definitions) {
  var _definitions = [];
  var result = [];

  if ((0, _locustjsBase.isArray)(definitions)) {
    _definitions = definitions;
  } else if ((0, _locustjsBase.isObject)(definitions)) {
    _definitions = [definitions];
  } else if ((0, _locustjsBase.isSomeString)(definitions)) {
    _definitions = [definitions];
  }

  var _iterator2 = _createForOfIteratorHelper(_definitions),
    _step2;

  try {
    var _loop = function _loop() {
      var item = _step2.value;
      var type = void 0;
      var state = void 0;
      var actions = [];
      var reducer = void 0;

      if ((0, _locustjsBase.isArray)(item)) {
        if (item.length) {
          var _index = (0, _locustjsBase.isSomeString)(item[0])
            ? item[0].indexOf("_")
            : -1;

          if (_index > 0) {
            type = item[0];
            state = item.length > 1 ? extractState(item[1]) : undefined;

            if (state) {
              actions =
                item.length > 2
                  ? extractActions(type, item[2], state.name, true)
                  : [
                      {
                        type: type,
                        actionName: getDefaultActionName(state.name)
                      }
                    ];
              reducer =
                item.length > 3 && (0, _locustjsBase.isFunction)(item[3])
                  ? item[3]
                  : null;
            }
          } else {
            state = extractState(item[0]);

            if (state) {
              actions =
                item.length > 1
                  ? extractActions(null, item[1], state.name, true)
                  : [
                      {
                        actionName: getDefaultActionName(state.name)
                      }
                    ];
              reducer =
                item.length > 2 && (0, _locustjsBase.isFunction)(item[2])
                  ? item[2]
                  : null;
            }
          }
        }
      } else if ((0, _locustjsBase.isSomeObject)(item)) {
        var _keys = Object.keys(item);

        var _keysExtra = _keys.filter(function (k) {
          return (
            (0, _locustjsBase.isSomeString)(k) &&
            k != "type" &&
            k != "action" &&
            k != "state" &&
            k != "reducer"
          );
        });

        type = (0, _locustjsBase.isEmpty)(item.type) ? undefined : item.type;
        state = extractState(item.state);

        if (!state && _keysExtra.length) {
          var _keyExtra = _keysExtra[0];
          state = extractState(_keyExtra, item[_keyExtra]);
        }

        actions = state
          ? extractActions(type, item.action, state.name, false)
          : [];
        reducer = (0, _locustjsBase.isFunction)(item.reducer)
          ? item.reducer
          : undefined;

        if (actions.length == 1 && actions[0].action && !actions[0].reducer) {
          if (!reducer) {
            actions[0].reducer = actions[0].action;
            actions[0].action = undefined;
          } else {
            actions[0].reducer = reducer;
            reducer = undefined;
          }
        }

        if (
          !type &&
          !state &&
          actions.length == 0 &&
          !reducer &&
          _keys.length > 0
        ) {
          var _iterator3 = _createForOfIteratorHelper(_keys),
            _step3;

          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
              var key = _step3.value;
              var itemValue = item[key];

              if ((0, _locustjsBase.isSomeString)(key)) {
                var _index2 = key.indexOf("_");

                type = _index2 >= 0 ? key : undefined;
                state =
                  _index2 >= 0
                    ? extractState(itemValue)
                    : extractState(key, itemValue);

                if (state) {
                  actions.push({
                    type: type,
                    state: state,
                    actionName: getDefaultActionName(state.name)
                  });
                }
              }
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        }
      } else if (isValidStateName(item)) {
        state = {
          name: item
        };
        actions.push({
          actionName: getDefaultActionName(item)
        });
      }

      if (state && actions.length > 0) {
        if (actions.length == 1) {
          if (reducer) {
            if (actions[0].reducer) {
              actions[0].action = actions[0].reducer;
            }

            actions[0].reducer = reducer;
          }
        }

        var _iterator4 = _createForOfIteratorHelper(actions),
          _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
            var act = _step4.value;

            var definition = (function (ac) {
              var _definition = {
                type: ac.type,
                state: state,
                actionName: ac.actionName,
                action: ac.action,
                reducer: ac.reducer
              };

              if (!_definition.type) {
                _definition.type = "TYPE_" + action_type_count++;
              }

              if (!_definition.action) {
                _definition.action = createActionFactory(
                  _definition.type,
                  _definition.state.name
                );
              } else {
                _definition.action = function () {
                  var _ac = ac.action.apply(ac, arguments);

                  if ((0, _locustjsBase.isEmpty)(_ac.type)) {
                    _ac.type = _definition.type;
                  }

                  return _ac;
                };
              }

              return _definition;
            })(act);

            result.push(definition);
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      }
    };

    for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
      _loop();
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return result;
}

function createActionReducer(definitions) {
  var actions = {};
  var initialState = {};

  var _definitions = initStoreDefinitions(definitions);

  var _iterator5 = _createForOfIteratorHelper(_definitions),
    _step5;

  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
      var definition = _step5.value;
      var stateName = definition.state.name;
      var actionName = definition.actionName;
      var action = definition.action;
      actions[actionName] = action;
      var stateInitialValue = definition.state.initialValue;

      if ((0, _locustjsBase.isFunction)(stateInitialValue)) {
        initialState[stateName] = stateInitialValue();
      } else {
        if (
          typeof stateInitialValue != "undefined" ||
          initialState[stateName] == null
        ) {
          initialState[stateName] = stateInitialValue;
        }
      }
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }

  var reducer = function reducer() {
    var state =
      arguments.length > 0 && arguments[0] !== undefined
        ? arguments[0]
        : initialState;
    var action = arguments.length > 1 ? arguments[1] : undefined;

    var _iterator6 = _createForOfIteratorHelper(_definitions),
      _step6;

    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done; ) {
        var definition = _step6.value;
        var type = definition.type;
        var stateName = definition.state.name;

        if (action.type == type) {
          var result = definition.reducer
            ? definition.reducer(state, action)
            : _objectSpread(
                _objectSpread({}, state),
                {},
                _defineProperty({}, stateName, action[stateName])
              );
          return result;
        }
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }

    return state;
  };

  return {
    actions: actions,
    initialState: initialState,
    reducer: reducer
  };
}

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

  if (arguments.length == 1) {
    return createActionReducer(component);
  }

  var mapStateToProps = function mapStateToProps(state) {
    var result = null;

    if (neededStates != null) {
      if ((0, _locustjsBase.isString)(neededStates)) {
        neededStates = neededStates.split(",");
      }

      if ((0, _locustjsBase.isArray)(neededStates)) {
        var _iterator7 = _createForOfIteratorHelper(neededStates),
          _step7;

        try {
          for (_iterator7.s(); !(_step7 = _iterator7.n()).done; ) {
            var stateKey = _step7.value;

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
          _iterator7.e(err);
        } finally {
          _iterator7.f();
        }
      } else {
        for (
          var _i5 = 0, _Object$keys5 = Object.keys(neededStates);
          _i5 < _Object$keys5.length;
          _i5++
        ) {
          var key = _Object$keys5[_i5];
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

            var _loop2 = function _loop2() {
              var key = _Object$keys6[_i6];

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
              var _i6 = 0, _Object$keys6 = Object.keys(neededActions);
              _i6 < _Object$keys6.length;
              _i6++
            ) {
              _loop2();
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
