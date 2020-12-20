

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
|neededState|object, Array, string|List of state items to be retrieved from redux store. This could be a string containing comma separated list of state names (like ```"count,started"```), an array of strings (like ```['count', 'started']```) or an object whose properties are state names (like ```{ count: true, started: true }```). |
|neededActions|function or object|An object containing actions or a function that returns such object (similar to second parameter of ```connect()``` function, i.e. mapDispatchToProps |
|mergeOptions|function|Optional. Similar to mergeOptions in ```connect()```|
|options|object|Optional. Similar to options in ```connect()```|

## ```neededStates``` parameter
As it is said , the argument specified for this parameter could be either of the followings:
- string
- array of string or object
- object

### string
Wecan specify a comma separated list of state items as as string. Each item in the string could have the following format:

<center>{name}:{key}={default value}</center>

name and default value are optional.
#### name
We can specify a name for the extracted state item to have in the props of our React component. For example ```reduxify(Counter, 'mycount:count')``` means to set a property named ```mycount``` in the props. This is similar to the following code:
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
We can use dot character for the name of state items we want to specify in neededStates, like ```"parent.child.grandChild"```. ```reduxify() ``` extracts the requested state item from redux store and sets a correct object in the props, even if the store does not contain the requested chain of state items.
```javascript
reduxify(Counter, 'counters.socials.like_count');
```
After the above code, the ```props``` in Counter would be:
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
When using objects, the objects should follow the following format:
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
Example 3: default values
```javascript
export default reduxify(Counter, {
     likes: 0,	// state item = state.likes
     hits: 1    // state item = state.hits
});
```
This is similar to:
```javascript
const mapStateToProps = state => ({ likes: state.likes, hits: state.hits })
export default connect(mapStateToProps)(Counter);
```
Example 2: object values (names in props would be property names by default)
```javascript
export default reduxify(Counter, {
     likes: { state: 'counters.like_count', default: 0 },
     hits: { state: 'counters.hit_count', default: 1 }
});
```
A mixed of all various values for property names could also be used.

## dispatch
By default, ```reduxify()``` puts ```dispatch``` in the props as well. So, there's no need to specify neededActions. We can use dispatch directly without the need to set a property on the props and use those properties.

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
