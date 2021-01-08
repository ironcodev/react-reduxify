import { connect } from "react-redux";
import {
	isEmpty,
	isString,
	isObject,
	isSomeString,
	isSomeObject,
	isArray,
	isSomeArray,
	isFunction,
} from 'locustjs-base';

function setProperty(source, prop, target, defaultValue) {
	let obj = source;

	if (prop.startsWith('!') && prop.indexOf(':') < 0) {
		const lastDotIndex = prop.lastIndexOf('.');
		const lastEqIndex = prop.lastIndexOf('=');

		if (lastDotIndex > 0) {
			if (lastEqIndex > lastDotIndex) {
				prop = prop.substr(lastDotIndex + 1, lastEqIndex - lastDotIndex - 1) + ':' + prop.substr(1);
			} else {
				prop = prop.substr(lastDotIndex + 1) + ':' + prop.substr(1);
			}
		}
	}

	let colonIndex = prop.indexOf(':');
	let key = colonIndex > 0 ? prop.substr(colonIndex + 1).trim() : prop.trim();

	let current = colonIndex > 0 ? defaultValue : target;

	while (true) {
		let dotIndex = key.indexOf('.');

		if (dotIndex < 0) {
			let eqIndex = key.indexOf('=');

			defaultValue = defaultValue == undefined && eqIndex >= 0 ? key.substr(eqIndex + 1) : defaultValue;

			const finalKey = eqIndex >= 0 ? key.substr(0, eqIndex).trim() : key;

			if (colonIndex <= 0) {
				current[finalKey] = (obj && obj[finalKey]) || defaultValue;
			} else {
				current = (obj && obj[finalKey]) || defaultValue;
			}

			break;
		} else {
			const subKey = key.substr(0, dotIndex);

			if (colonIndex <= 0) {
				current = current[subKey] = {}
			}

			obj = obj && obj[subKey];
			key = key.substr(dotIndex + 1);
		}
	}

	if (colonIndex > 0) {
		target[prop.substr(0, colonIndex).trim()] = current;
	}
}

let action_type_count = 0;
const isValidStateName = x => isSomeString(x) && /^[A-Za-z_]\w*$/.test(x);
const isValidActionName = isValidStateName;
const getDefaultActionName = x => 'set' + x[0].toUpperCase() + x.substr(1);

const createActionFactory = (type, payloadName) => isSomeString(payloadName) ? (x) => ({ type, [payloadName]: x }) : () => ({ type });

function extractState(state, value) {
	let stateName = '';
	let stateValue = value;

	if (isValidStateName(state)) {
		stateName = state
	} else if (isSomeObject(state)) {
		for (let stateKey of Object.keys(state)) {
			if (isValidStateName(stateKey)) {
				stateName = stateKey;
				stateValue = state[stateKey]
				break;
			}
		}
	}

	return stateName ? { name: stateName, initialValue: stateValue } : null
}

function extractActions(type, action, stateName, switchActionToReducer) {
	let actions = []

	if (isEmpty(action)) {
		actions.push({ type, actionName: getDefaultActionName(stateName) })
	} else if (isFunction(action)) {
		if (switchActionToReducer) {
			actions.push({ type, actionName: getDefaultActionName(stateName), reducer: action })
		} else {
			actions.push({ type, actionName: getDefaultActionName(stateName), action })
		}
	} else if (isValidActionName(action)) {
		actions.push({ type, actionName: action })
	} else if (isArray(action)) {
		for (let act of action) {
			if (isSomeObject(act)) {
				for (let actionName of Object.keys(act)) {
					const actionValue = act[actionName]

					if (isValidActionName(actionName)) {
						if (isFunction(actionValue)) {
							actions.push({ type, actionName, reducer: actionValue })
						} else if (isSomeObject(actionValue)) {
							for (let ar of Object.keys(actionValue)) {
								if (isFunction(ar) && isFunction(actionValue[ar])) {
									actions.push({ type, actionName, action: ar, reducer: actionValue[ar] })
									break;
								}
							}
						}
						break;
					}
				}
			} else if (isValidActionName(act)) {
				actions.push({ type, actionName: act, reducer: (s, a) => ({ ...s, [stateName]: a[stateName] }) })
			}
		}
	} else if (isSomeObject(action)) {
		for (let key of Object.keys(action)) {
			if (isValidActionName(key)) {
				const actionValue = action[key];

				if (isFunction(actionValue)) {
					actions.push({ type, actionName: key, reducer: actionValue })
				} else if (isSomeObject(actionValue)) {
					if (isFunction(actionValue.action)) {
						if (isFunction(actionValue.reducer)) {
							actions.push({ type, actionName: key, action: actionValue.action, reducer: actionValue.reducer })
						} else {
							actions.push({ type, actionName: key, action: actionValue.action })
						}
					}
				} else if (isSomeArray(actionValue)) {
					const _action = actionValue[0];
					const _reducer = actionValue.length > 1 ? actionValue[1] : null;

					if (isFunction(_action)) {
						if (isFunction(_reducer)) {
							actions.push({ type, actionName: key, action: _action, reducer: _reducer })
						} else {
							actions.push({ type, actionName: key, action: _action })
						}
					}
				}
			}
		}
	}

	return actions;
}

function initStoreDefinitions(definitions) {
	let _definitions = [];
	let result = [];

	if (isArray(definitions)) {
		_definitions = definitions
	} else if (isObject(definitions)) {
		_definitions = [definitions]
	} else if (isSomeString(definitions)) {
		_definitions = [definitions]
	}

	for (let item of _definitions) {
		let type;
		let state;
		let actions = [];
		let reducer;

		if (isArray(item)) {
			if (item.length) {
				const _index = isSomeString(item[0]) ? item[0].indexOf('_') : -1;

				if (_index > 0) {
					type = item[0];
					state = item.length > 1 ? extractState(item[1]) : undefined;

					if (state) {
						actions = item.length > 2 ? extractActions(type, item[2], state.name, true) : [{ type, actionName: getDefaultActionName(state.name) }];
						reducer = item.length > 3 && isFunction(item[3]) ? item[3] : null
					}
				} else {
					state = extractState(item[0]);

					if (state) {
						actions = item.length > 1 ? extractActions(null, item[1], state.name, true) : [{ actionName: getDefaultActionName(state.name) }];
						reducer = item.length > 2 && isFunction(item[2]) ? item[2] : null
					}
				}
			}
		} else if (isSomeObject(item)) {
			const _keys = Object.keys(item);
			const _keysExtra = _keys.filter(k => isSomeString(k) && k != 'type' && k != 'action' && k != 'state' && k != 'reducer');

			type = isEmpty(item.type) ? undefined : item.type;
			state = extractState(item.state);

			if (!state && _keysExtra.length) {
				const _keyExtra = _keysExtra[0];

				state = extractState(_keyExtra, item[_keyExtra])
			}

			actions = state ? extractActions(type, item.action, state.name, false) : [];
			reducer = isFunction(item.reducer) ? item.reducer : undefined;

			if (actions.length == 1 && actions[0].action && !actions[0].reducer) {
				if (!reducer) {
					actions[0].reducer = actions[0].action;
					actions[0].action = undefined;
				} else {
					actions[0].reducer = reducer;
					reducer = undefined;
				}
			}

			if (!type && !state && actions.length == 0 && !reducer && _keys.length > 0) {

				for (let key of _keys) {
					const itemValue = item[key];

					if (isSomeString(key)) {
						const _index = key.indexOf('_');

						type = _index >= 0 ? key : undefined;
						state = _index >= 0 ? extractState(itemValue) : extractState(key, itemValue);

						if (state) {
							actions.push({ type, state, actionName: getDefaultActionName(state.name) })
						}
					}
				}
			}
		} else if (isValidStateName(item)) {
			state = { name: item }
			actions.push({ actionName: getDefaultActionName(item) })
		}

		if (state && actions.length > 0) {
			if (actions.length == 1) {
				if (reducer) {
					if (actions[0].reducer) {
						actions[0].action = actions[0].reducer
					}

					actions[0].reducer = reducer
				}
			}

			for (let act of actions) {
				const definition = (function (ac) {
					const _definition = {
						type: ac.type,
						state, actionName: ac.actionName,
						action: ac.action,
						reducer: ac.reducer
					}

					if (!_definition.type) {
						_definition.type = 'TYPE_' + action_type_count++;
					}

					if (!_definition.action) {
						_definition.action = createActionFactory(_definition.type, _definition.state.name)
					} else {
						_definition.action = (...args) => {
							const _ac = ac.action(...args);

							if (isEmpty(_ac.type)) {
								_ac.type = _definition.type
							}

							return _ac
						}
					}

					return _definition;
				})(act)

				result.push(definition);
			}
		}
	}

	return result;
}

function createActionReducer(definitions) {
	const actions = {}
	const initialState = {}
	const _definitions = initStoreDefinitions(definitions);

	for (let definition of _definitions) {
		const stateName = definition.state.name;
		const actionName = definition.actionName;
		const action = definition.action;

		actions[actionName] = action;

		const stateInitialValue = definition.state.initialValue;

		if (isFunction(stateInitialValue)) {
			initialState[stateName] = stateInitialValue()
		} else {
			if (typeof stateInitialValue != 'undefined' || initialState[stateName] == null) {
				initialState[stateName] = stateInitialValue
			}
		}
	}

	const reducer = (state = initialState, action) => {
		for (let definition of _definitions) {
			const type = definition.type
			const stateName = definition.state.name;

			if (action.type == type) {
				const result = definition.reducer ? definition.reducer(state, action) : ({
					...state,
					[stateName]: action[stateName]
				});

				return result;
			}
		}

		return state;
	}

	return ({ actions, initialState, reducer })
}

const reduxify = function (component, neededStates, neededActions, mergeOptions, options) {
	if (arguments.length == 0) {
		return;
	}

	if (arguments.length == 1) {
		return createActionReducer(component)
	}

	const mapStateToProps = function (state) {
		let result = null;

		if (neededStates != null) {
			if (isString(neededStates)) {
				neededStates = neededStates.split(',');
			}

			if (isArray(neededStates)) {
				for (let stateKey of neededStates) {
					if (result == null) {
						result = {}
					}

					if (isString(stateKey)) {
						setProperty(state, stateKey, result);
					} else if (isObject(stateKey)) {
						setProperty(state, (stateKey.name ? `${stateKey.name}:${stateKey.state}` : stateKey.state), result, stateKey.default);
					}
				}
			} else {
				for (let key of Object.keys(neededStates)) {
					const stateKey = neededStates[key];

					if (isString(stateKey)) {
						if (result == null) {
							result = {}
						}

						setProperty(state, (stateKey ? `${key}:${stateKey}` : key), result);
					} else if (isObject(stateKey)) {
						if (result == null) {
							result = {}
						}

						if (stateKey.name) {
							setProperty(state, (stateKey.state ? `${stateKey.name}:${stateKey.state}` : `${stateKey.name}:${key}`), result, stateKey.default);
						} else {
							setProperty(state, (stateKey.state ? `${key}:${stateKey.state}` : key), result, stateKey.default);
						}
					} else {
						if (result == null) {
							result = {}
						}

						setProperty(state, key, result, stateKey);
					}
				}
			}
		}

		return result
	}
	const mapDispatchToProps = typeof (neededActions) == 'function' ? neededActions
		:
		function (dispatch) {
			let result = null

			if (neededActions != null) {
				if (neededActions.dispatch == null) {
					result = { dispatch }		// put dispatch in the props to provide free dispatch
				}

				for (let key of Object.keys(neededActions)) {
					if (result == null) {
						result = {}
					}

					result[key] = (...args) => dispatch(neededActions[key](...args))
				}
			}

			return result || {}
		}

	return connect(mapStateToProps, mapDispatchToProps, mergeOptions, options)(component)
}

export default reduxify;
export {
	setProperty,
	createActionFactory,
	createActionReducer
}