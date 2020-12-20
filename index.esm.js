import { connect } from "react-redux";

const isString = x => typeof (x) == 'string' || x instanceof String;
const isObject = x => typeof (x) == 'object' && x != null;

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

const reduxify = function (component, neededStates, neededActions, mergeOptions, options) {
	const mapStateToProps = function (state) {
		let result = null;

		if (neededStates != null) {
			if (isString(neededStates)) {
				neededStates = neededStates.split(',');
			}

			if (Array.isArray(neededStates)) {
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