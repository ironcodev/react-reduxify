
# react-reduxify
This library contains just a single and simple function to ease the pain and headache of using redux connect function.

Instead of using mapStateToProps, mapDispatchToProps and the cryptic and scary ```connect()``` function ...

```javascript
import { connect } from 'react-redux'
import { increment, decrement } from './actions'

const Counter = (props) => {
	return (<div>
		Count = <span>{props.count}</span>
		<button onClick={() => props.increment()}>Increment</button>
		<button onClick={() => props.decrement()}>Decrement</button>
	</div>)
}

const mapStateToProps = state => ({
	count: state.count
})

const mapDispatchToProps = dispatch => ({
	increment: () => dispatch(increment()),
	decrement: () => dispatch(decrement())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)
```

Connect your component with redux using the simpler  ```reduxify()``` function ...

```javascript
import reduxify from 'react-reduxify'
...
export default reduxify(Counter, 'count', { increment, decrement })
```

Isn't it simpler and more readable?

## API
The signature of ```reduxify()``` method is this way:
```javascript
function reduxify(component, neededState, neededActions, mergeOptions, options) {
...
}
```

|parameter	| type | description |
|-------------|-------|--------------|
|component|React class or function component|The component to be connected to redux |
|neededState|object, Array, string|List of state objects to be retrieved from redux store. This could be a string containing comma separated list of state names (like ```"count,started"```), an array of strings (like ```['count', 'started']```) or an object whose properties are state names (like ```{ count: true, started: true }```). When specifying an object, the specified state items will only be mapped to props, if their value is truthy.<br/><br/>**Note**: You can use dot character for the name of state items you want to specify in neededStates, like ```"parent.child.grandChild"```. ```reduxify() ``` extracts the requested state item from redux store and sets a correct object in the props, even if the store does not contain the requested chain of state items.|
|neededActions|function or object|An object containing actions or a function that returns such object (similar to second parameter of ```connect()``` function, i.e. mapDispatchToProps |
|mergeOptions|function|Optional. Similar to mergeOptions in ```connect()```|
|options|object|Optional. Similar to options in ```connect()```|

By default, ```reduxify()``` also puts ```dispatch``` in the props. So, there's no need to specify neededActions.

```javascript
import reduxify from 'react-reduxify'
import { increment, decrement } from './actions'

const Counter = (props) => {
	return (<div>
		Count = <span>{props.count}</span>
		<button onClick={() => props.dispatch(increment())}>Increment</button>
		<button onClick={() => props.dispatch(decrement())}>Decrement</button>
	</div>)
}

export default reduxify(Counter, 'count')
```
This is similar to ```connect()```, but the difference is, even if you specfy neededActions, ```reduxify()``` puts ```dispatch``` in the props anyway, while ```connect()``` only puts ```dispatch``` in the props only if you don't specify mapDispatchToProps.
