


# react-reduxify
This library contains a single 'reduxify' function to ease using redux.

# First Usage: reduxify() over connect()
Instead of using mapStateToProps, mapDispatchToProps and the cryptic and scary `connect()` function ...

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

Connect your component with redux using the simpler  `reduxify()` function ...

```javascript
import reduxify from 'react-reduxify'
...
export default reduxify(Counter, 'count', { increment, decrement })
```

Isn't it simpler and more readable?

## API
The signature of `reduxify()` method is this way:
```javascript
function reduxify(component, neededState, neededActions, mergeOptions, options) {
...
}
```

|parameter	| type | description |
|-------------|-------|--------------|
|component|React class or function component|The component to be connected to redux |
|neededState|object, Array, string|List of state items to be retrieved from redux store. This could be a string containing comma separated list of state names (like `"count,started"`), an array of strings (like `['count', 'started']`) or an object whose properties are state names (like `{ count: 0, started: true }`). |
|neededActions|function or object|An object containing actions or a function that returns such object (similar to second parameter of `connect()`, i.e. mapDispatchToProps |
|mergeOptions|function|Optional. Similar to mergeOptions in `connect()`|
|options|object|Optional. Similar to options in `connect()`|

## `neededStates` parameter
As it is said , the argument specified for this parameter could be either of the followings:
- string
- array of string or object
- object

### string
We can specify a comma separated list of state items as string. Each item in the string could have the following format:

<center>`{name?}:{key}={default_value?}`</center>
<br/>

name and default value are optional. If name is not specified, speciifed state item will be propagated into the props corresponding the way it is specified (this is explained in 'state name chain' section).
#### name
We can specify a name for the extracted state item to have in the props of our React component. For example `reduxify(Counter, 'mycount:count')` means to set a property named `mycount` in the props. This is similar to the following code:
```javascript
const mapStateToProps = state => ({ mycount: state.count });
export default connect(mapStateToProps)(Counter);
```
#### default value
We can specify a default value for the prop item if the state item was not found or it was undefined, after an equal sign.
```javascript
export default reduxify(Counter, 'mycount:count=0'); // if state.count was undefined,
                                                     // the default value of "0" would be
                                                     // used for props.mycount
```
#### state name chain
We can use dot character for the name of state items we want to specify in neededStates, like `"parent.child.grandChild"`. `reduxify() ` extracts the requested state item from redux store and sets a correct object in the props, even if the store does not contain the requested chain of state items.
```javascript
reduxify(Counter, 'counters.socials.like_count');
```
After the above code, the `props` in `Counter` would be:
```
// props
{
  counters: {
    socials: {
       like_count: ... // value of state.counters.socials.like_count
    }
  }
}
```
Using an exclamation mark (!) we can negate this propagation behavior. In this case, the last property name will be assumed as the prop name for the state item.

Example:
```javascript
export default reduxify(Counter, '!counters.socials.likes');
```
Here, instead of propagating requested state (`state.counters.socials.likes`) onto the props, a property named `likes` will be set for props with the value of `state.counters.socials.likes`.

#### Specifying list of state items
Here is an example with a list of state items:
```javascript
export default reduxify(Counter, 'likes:counters.like_count=0,hits:counters.hit_count=0');
```
### Array of string or object
We can specify an array of string or object for neededStates.
```javascript
export default reduxify(Counter, ['likes:counter.like_count', 'hits:counters.hit_count']);
```
When using objects, the objects should follow this format:
```javascript
{
   name: '...',       // string: prop name (optional).
                      // state will be used by default
                      // if name is not specified
   state: '...'       // string: state item in redux store
   default: #         // any: default value for prop item
                      // if store does not contain speicified
                      // state item or if it is undefined
}
```
Example:
```javascript
export default reduxify(Counter, [
     { name: 'likes', state: 'counter.like_count', default: 0 },
     { name: 'hits', state: 'counters.hit_count', default: 1 }
]);
```
The benefit of using objects is to specify a default value of any type, while when using strings like 'likes:counters.hit_count=1' , the default value is always string (here, "1").

### Object
Finally we can specify an object for neededStates whose property names are either our intended prop name and their values are either string or object with the format mentioned in previous sections. If values specified for neededStates property names are neither string nor object, they will be assumed as default value for the state item.

Example 1: string values
```javascript
export default reduxify(Counter, {
     likes: 'counters.like_count',
     hits: 'counters.hit_count'}
});
```
Example 2: default values
```javascript
export default reduxify(Counter, {
     likes: 0,	// state item = state.likes
     hits: 1    // state item = state.hits
});
```
This is -almost- similar to:
```javascript
const mapStateToProps = state => ({ likes: state.likes, hits: state.hits })
export default connect(mapStateToProps)(Counter);
```
Example 3: object values (names in props would be property names by default)
```javascript
export default reduxify(Counter, {
     likes: { state: 'counters.like_count', default: 0 },
     hits: { state: 'counters.hit_count', default: 1 }
});
```
A mixed of various values for property names could also be used.

## dispatch
By default, `reduxify()` puts `dispatch` in the props as well. So, there's no need to specify neededActions. We can use dispatch directly without the need to set a property on the props and use those properties.

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
This behavior is similar to ```connect()```, but the difference is ```connect``` refrains from setting ```dispatch``` for the props if you specify mapDispatchToProps for it. Reduxify always sets ```dispatch``` for the props even if you specify neededActions (unless you specify a ```{ dispatch: false }``` item in the neededActions and explicitly say that you don't want to have ```dispatch``` in the props).

# Second Usage: reduxify() over manually defining actions and reducers
Instead of writing these boilerplate codes ...

```javascript
// ------------ ./reducers/counter.js
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

// actions
const increment = (x) => ({ type: INCREMENT })
const decrement = (x) => ({ type: DECREMENT })

const counterReducer = (state = { count: 0 }, action) {
	switch (action.type) {
		case INCREMENT: return { ...state, count: state.count + 1 }
		case DECREMENT: return { ...state, count: state.count - 1 }
	}
	
	return state;
}

export {
	INCREMENT,
	DECREMENT,
	increment,
	decrement,
	counterReducer
}
```

Simplify it by using reduxify() this way ...

```javascript
import reduxify from 'react-reduxify'

const counterActionReducer = reduxify({
	state: { count: 0 },
	action: [
		increment: (s, a) => ({ ...s, count: s.count + 1 }),
		decrement: (s, a) => ({ ...s, count: s.count - 1 })
	]
});

export default counterActionReducer;
```

That's all!

The result of `reduxify()` in this usage is an object with the following format.

```
     {
          actions: [],        // array of actions (each action is a function),
          initialState: {},   // an object that holds the initial state for the reducer
          reducer: function   // the final reducer that is created
     }
```

There is no need to know about action type values. The generated 'reducer' internally uses custom action types.

Here is an example on how to use the `reduxify` result in this second usage.

```javascript
// -------------- index.js ----------------
import counterActionReducer from './reducers/counter.js';
import { createStore } from 'redeux'

const store = createStore(counterActionReducer.reducer)

// -------------- ./Components/Counter.js ----------------
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import counterActionReducer from '../reducers/counter.js';
import reduxify from 'react-reduxify'

const Counter = () => {
     const count = useSelector(state => state.count);
     const dispatch = useDispatch();
     const { increment, decrement } = counterActionReducer.actions;

	return (<div>
		Count = <span>{count}</span>
		<button onClick={() => dispatch(increment())}>Increment</button>
		<button onClick={() => dispatch(decrement())}>Decrement</button>
	</div>)
}

export default Counter;
```

## Action/Reducer definition
The array we pass to `reduxify` includes a list of action/reducer definition. Each item could be an object or an array.

When using an object, the object should follow the following format:

```javascript
     {
          type: '',                // optional: string: type of action.
          state: ...,              // required: string or object: state item
          action: ...,             // optional: string | array | object: explicit action. name (default is 'set' + stateName in pascal-case).
          reducer: function        // optional: function : custom reducer.
     }
```

Examples:
```
{ state: 'count' }		// default state value = undefined, action = setCount
{
	state: { count: 0 }	// default state value = 0
}						// action = setCount
{ state: 'count', action: 'setClickCount' }		// default state value = undefined, action = setClickCount
{
	state: { count: 0 },
	action: 'setClickCount'	// action = setClickCount
}
{
	state: { count: 0 },
	action: x => ({ count: x + 2})	// custom action
}
{
	state: { count: 0 },
	action: x => ({ count: x + 2})	// custom action
	reducer: (state, action) => ({ ...state, count: action.count})	// custom reducer
}
{
	state: { count: 0 },
	action: {
		incClickCount: (state, action) => {
			// custom reducer
			return {...state, count: state.count + 1 }
		},
		decClickCount: (state, action) => {
			// custom reducer
			return {...state, count: state.count - 1 }
		}
	}
}
```

If we have a single definition, we can pass it right to reduxify() (there's no need to wrap it inside an array).

```javascript
reduxify({ state: 'count' })
```

Or with default value:

```javascript
reduxify({ state: { count: 0 } })
```

simpler default value:

```javascript
reduxify({ count: 0 })
```

We can even pass a string. It is assumed as the name of the state item. action and reducer will be created based on default definition.

```javascript
reduxify('count')
```

It is also possible to specify each definition as an array:

```javascript
reduxify([
	['count'],						// state
	['SET_COUNT', 'count'],			// type, state
	['SET_COUNT', { count: 10 }],	// type, state with initial value
	['count', 'setClickCount' ],	// state, action name
	['count', ['inc', 'dec']],	// state, multiple action name
	['count', { 'setClickCount': (s, a) => ({ ...s, count: a.count }) }],	// state, action name, reducer
	['count', 'setClickCount', (s, a) => ({ ...s, count: a.count }) ], // state, action name, reducer
	['count', x => ({ count: x + 2}), , (s, a) => ({ ...s, count: a.count }) ],	// state, action, reducer
	['SET_COUNT', 'count', x => ({ count: x + 2}), , (s, a) => ({ ...s, count: a.count }) ]	// type, state, action, reducer
])
```

### Various examples

reduxify([
	{
		state: { 'count': 0 },
		action: {
			'increment': (state, action) => ({ ...state, 'count': action.count + 1 }),
			'decrement': (state, action) => ({ ...state, 'count': action.count - 1 }) 
		}
	},
	[
		{ 'count': 0 },
		{
			'increment': (state, action) => ({ ...state, 'count': action.count + 1 }),
			'decrement': (state, action) => ({ ...state, 'count': action.count - 1 }) 
		}
	],
	[
		{ 'count': 0 },
		[
			{ 'increment': (state, action) => ({ ...state, count: action.count }) },
			{ 'decrement': (state, action) => ({ ...state, count: action.count }) }
		]
	],
	[
		'count',
		{
			'increment': (state, action) => ({ ...state, 'count': (action.count || 0) + 1 }),
			'decrement': (state, action) => ({ ...state, 'count': (action.count || 0) - 1 }) 
		}
	],
	[
		{ 'count': 0 },
		[ 'increment', 'decrement' ]
	],
	{
		state: { 'count': 0 },
		action: {
			'increment': { action: x => ( 'count': x + 1 ), reducer: (state, action) => ({ ...state, count: action.count }) },
			'decrement': { action: x => ( 'count': x - 1 ), reducer: (state, action) => ({ ...state, count: action.count }) }
		}
	},
	{
		state: 'count'
	},
	{
		state: 'count'
		action: x => ({ type: 'SET_COUNT', count: x}),
	},
	{
		state: 'count',
		action: x => ({ count: x}),
		reducer: (s, a) => ({ ...s, count: a.count })
	},
	{
		type: 'SET_COUNT',
		state: 'count',
	},
	{
		type: 'SET_COUNT',
		state: 'count',
		action: x => ({ type: 'SET_COUNT', count: x}),
	},
	{
		type: 'SET_COUNT',
		state: 'count',
		action: x => ({ type: 'SET_COUNT', count: x}),
		reducer: (s, a) => ({ ...s, count: a.count })
	},
	{
		state: { 'count': 0 },
		action: [
			{ 'increment': { x => ( 'count': x + 1 ): (state, action) => ({ ...state, count: action.count }) } },
			{ 'decrement': { x => ( 'count': x - 1 ): (state, action) => ({ ...state, count: action.count }) } }
		]
	},
	[
		{ 'count': 0 },
		{
			'increment': { action: x => ( 'count': x + 1 ), reducer: (state, action) => ({ ...state, count: action.count }) },
			'decrement': { action: x => ( 'count': x - 1 ), reducer: (state, action) => ({ ...state, count: action.count }) }
		}
	],
	[
		{ 'count': 0 },
		[
			{ 'increment': { action: x => ( 'count': x + 1 ), reducer: (state, action) => ({ ...state, count: action.count }) } },
			{ 'decrement': { action: x => ( 'count': x - 1 ), reducer: (state, action) => ({ ...state, count: action.count }) } }
		]
	],
	[
		{ 'count': 0 },
		[
			{ 'increment': { x => ( 'count': x + 1 ): (state, action) => ({ ...state, count: action.count }) } },
			{ 'decrement': { x => ( 'count': x - 1 ): (state, action) => ({ ...state, count: action.count }) } }
		]
	],
	{
		state: { layout: { type: 'boxed' } },
		action: { 'setTemplateLayout': x => ({ layout: { type: x }}) },
		reducer: (state, action) => ({ ...state, layout: { type: action.layout.type } })
	},
	[
		{ 'logAdded': [] },
		null,
		(state, action) => {
			const result = { ...state }

			result.logs = [...state.logs]
			result.logs.push(action.log)

			return log
		}
	],
	[
		{ 'session_ended': true },
		'setSessionEnd',
		(state, action) => ({ ...state, session_ended: action.session_ended })
	],
	[
		'session_ended',
		'setSessionEnd',
		(state, action) => ({ ...state, session_ended: action.session_ended })
	],
	[
		{ 'session_ended': true },
		'setSessionEnd'
	],
	[
		'session_ended', 'setSessionEnd'
	],
	[	'session_ended'	],
	'session_ended',
	{
		'SET_LOGGED_IN': 'loggedIn'
	},
	[
		'SET_LOGGED_IN',
		'loggedIn',
	],
	[
		'SET_LOGGED_IN',
		'loggedIn',
		(s, a) => ({ ...s, a.loggedIn})
	],
	[
		'SET_LOGGED_IN',
		{ 'loggedIn': false },
	],
	[
		'SET_LOGGED_IN',
		{ 'loggedIn': false },
		(s, a) => ({ ...s, a.loggedIn})
	]
]);
