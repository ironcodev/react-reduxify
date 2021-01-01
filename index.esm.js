import { connect } from "react-redux";
import {
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

const createActionFactory = (type, payloadName) => (x) => ({ type, [payloadName]: x });

function* initStoreDefinitions(definitions) {
	for (let item of definitions) {
		let definition;

		if (isSomeObject(item)) {
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
			definition = [item.type, item.stateName, item.stateInitialValue, item.actionName, item.action, item.reducer];
		} else {
			definition = item
		}

		if (isSomeArray(definition) && isSomeString(definition[0]) && isSomeString(definition[1])) {
			yield definition;
		}
	}
}

const createActionReducer = definitions => {
	const actions = {}
	const initialState = {}
	const _definitions = initStoreDefinitions(definitions);

	for (let definition of _definitions) {
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
		const type = definition[0];
		const stateName = definition[1];
		const actionName = definition.length > 3 && isSomeString(definition[3]) ? definition[3] : ('set' + stateName[0].toUpperCase() + stateName.substr(1));
		const action = definition.length > 4 && isFunction(definition[4]) ? definition[4] : createActionFactory(type, stateName);

		actions[actionName] = action;

		const stateInitialValue = definition.length > 2 ? definition[2] : undefined;

		if (isFunction(stateInitialValue)) {
			initialState[stateName] = stateInitialValue()
		} else {
			initialState[stateName] = stateInitialValue
		}
	}

	const reducer = (state = initialState, action) => {
		const _definitions = initStoreDefinitions(definitions);

		for (let definition of _definitions) {
			const type = definition[0]
			const stateName = definition[1];

			if (action.type == type) {
				const result = definition.length > 5 && isFunction(definition[5]) ? definition[5](state, action) : ({
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

	if (arguments.length == 1 && isArray(component)) {
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