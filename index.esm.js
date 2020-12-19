import { connect } from "react-redux";

function setProperty(source, prop, target) {
	let obj = source;
	let colonIndex = prop.indexOf(':');
	let key = colonIndex > 0 ? prop.substr(colonIndex + 1).trim(): prop.trim();
	let current = colonIndex > 0 ? undefined: target;

	while (true) {
		let dotIndex = key.indexOf('.');

		if (dotIndex < 0) {
			if (colonIndex <= 0) {
				current[key] = obj && obj[key];
			} else {
				current = obj && obj[key]
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

const reduxify = function (component, neededState, neededActions, mergeOptions, options) {
    const mapStateToProps = function (state) {
        let result = null;

        if (neededState != null) {
			if (typeof(neededState) == 'string' || neededState instanceof String) {
				neededState = neededState.split(',');
			}
			
            if (Array.isArray(neededState)) {
                for (let stateKey of neededState) {
                    if (result == null) {
                        result = {}
                    }
					
					setProperty(state, (stateKey || '').trim(), result);
                }
            } else {
                for (let key of Object.keys(neededState)) {
                    if (state[key]) {
                        if (result == null) {
                            result = {}
                        }

						setProperty(state, key, result);
                    }
                }
            }
        }

        return result || {}
    }
    const mapDispatchToProps = typeof(neededActions) == 'function' ? neededActions
		:
		function(dispatch) {
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