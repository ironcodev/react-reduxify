import { connect } from "react-redux";

function setProperty(source, prop, target) {
	let current = target;
	let obj = source;
	let key = prop;

	while (true) {
		let dotIndex = key.indexOf('.');
		
		if (dotIndex < 0) {
			current[key] = obj && obj[key];
			
			break;
		} else {
			const subKey = key.substr(0, dotIndex);
			current = current[subKey] = {}
			obj = obj && obj[subKey];
			key = key.substr(dotIndex + 1);
		}
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

        return result
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

			return result
		}

    return connect(mapStateToProps, mapDispatchToProps, mergeOptions, options)(component)
}

export default reduxify;