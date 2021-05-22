# Introduction

1. It is a JavaScript library for __building UIs(User Interfaces)__

## Introducing JSX(JavaScript XML)

* It is a **syntax extension** to **JavaScript**
* It is neither an HTML nor a JavaScript string
* React doesn't require using JSX, but it is recommended to describe what the UI should look like

```js
    const element = <h1>Hello, JSX</h1>
```

### Embedding Expressions in JSX

* We can embed expression inside JSX using curly braces
* All valid JS expressions are accepted inside the curly braces like :-
  * 2 + 1
  * user.firstName
  * formatName(user), etc.

* Embedding JavaScript variable into JSX

```js
    const name = 'Santosh Swansi';    
    const element = <h1>Hello, {name}</h1>
```

* Embedding JavScript Function into JSX

```js
    function formatName(user) {
        return user.firstName + ' ' + user.lastName;
    }

    const user = {
        firstName: 'Santosh',
        lastName: 'Swansi'
    };

    const element = <h1>Hello, {formatName(user)}</h1>;
```

> **NOTE :** JSX is an expression too. JSX expressions become JavaScript function calls and evaluate to JavaScript objects.**CONCLUSION** : JSX can be used inside _if_ statements, _for_ loops, can be assigned to a variable, can be accepted as arguments, and can be returned from functions

### Specifying Attributes with JSX

```js
    const element1 = <h1 color='green'>Santosh Swansi</h1>

    const user = {
        firstName: 'Santosh',
        lastName: 'Swansi',
        color: 'Sky Blue'
    }
    // JavaScript expression as attribute's value
    const element2 = <h1 style={{color: user.color}}>{user.firstName + ' ' + user.lastName}</h1>
```

* **Notes :**
  * JSX is closer to JavaScript than to HTML
  * **React DOM :** Also called as **Virtual DOM** used by React to update the actual DOM nodes after comparing them with nodes of Virtual DOM
  * Therefore camelCase naming convention is used by React DOM.
  * **Examples:**
    * _class_ to _className_ and
    * _tabindex_ to _tabIndex_

### Specifying children with JSX

```js
    const element = (
        <div>
            <h1>Hello!</h1>
            <p>Welcome to the homepage!</p>
        </div>
    );
```

* **NOTE :** JSX escapes injection attacks by converting the embedded JavaScript expression to string

### JSX represents Objects

* Babel(JavaScript compiler) compiles JSX down to _React.createElement()_ calls

* These two are identical :

```js
    const element = (
        <h1 className='greeting'>
            Hello, Santosh
        </h1>
    );
```

```js
    const element = React.createElement(
        'h1',    // tag name
        {className: 'greeting'},
        'Hello, Santosh'
    );

```

* It creates an object like this :

    ```js
        const element = {
            type: 'h1',
            props: {
                className: 'greeting',
                children: 'Hello, Santosh'
            }
        };
    ```

* These objects are called "**react elements**"
* We can think of them as descriptions of what we want to see on the screen  
* **React reads these objects** and **uses them to construct the Virtual DOM** (React DOM) and to **keep it up to date**

## RENDERING ELEMENTS

> * **Elements** are the **basic building blocks of React apps**
> * An element **describes what we want to see in the screen**
> * Unlike browser DOM elements, React elements are **cheap to create**
> * React DOM(virtual DOM) **takes care of updating** the DOM to match the React elements

### Rendering an Element into the DOM

* SYNTAX :
`
ReactDOM.render(element, location)
`

* EXAMPLE :

```js
    const element = <h1>Hello, Santosh</h1>;
    ReactDOM.render(element, document.getElementById("root"))'
```

### Updating the Rendered Element 

* **React elements** are **immutable**
* We have to render newly created element to update the UI

```js
    const tick = () => {
        const element =  (
            <div>
              <h1>Hello, React!!!</h1>
              <h2>
                It is {new Date().toLocaleTimeString()}
              </h2>  
            </div>
        );

        ReactDOM.render(
            element,
            document.getElementById("root")
        );
    }


    setInterval(tick, 1000);

```

### React Only Updates What's Necessary

* React DOM **compares the changed element and its children to the previous one**, and **only applies the DOM updates necessary to bring the DOM to the desired state**


## React Components & Props

* **Components** let us split the UI into independent, reusable pieces
 
* Conceptually, **components are JavaScript functions**. They accept arbitrary inputs("**props**) and return **React elements** describing what should appear on the screen


### Function Components 

```js
    // Here Welcome is a JavaScript function used as a react component
    function Welcome(props){
        return <h1>Hello, {props.name}!!</h1>
    }
```

### Class Components

```js
    class Welcome extends React.Component {
        render() {
            return <h1>Hello, {props.name}!!</h1> 
        }
    }
```

> Both class and function components are equivalent for React


### Rendering Components

* We know **React element can be used to represent DOM tags** but they can **also represent user-defined components**

```js
    // Here element represents Welcome Component with props name
    const element = <Welcome name="Santosh"/>;

    // rendering the element representing user-defined component
    ReactDOM.render(
        element,
        document.getElementById('root');
    )
```

> **NOTE**: React always treats JSX with name/tag starting with small letter as DOM tags. Therefore use capital letter for naming JSX representing component


### Composing components 

```js
    // defining Welcome react component
    function Welcome(props){
        return <h1>Hello {props.name}!!!</h1>
    }

    // defining APP react component containing several Welcome components
    function App() {
        return (
            <div>
                <Welcome name="Santosh"/>
                <Welcome name="Subhash"/>
                <Welcome name="sangeeta"/>
            </div>
        )
    }

    // rendering App component
    ReactDOM.render(
        <App />,
        document.getElementById('root')
    );
```

> **NOTE**: Always try to split a larger component into smaller one 


### Props are **read only**

* **Pure Functions**: Functions which does not modify its input
* **React has a strict rule to follow**: All React components must act like pure functions w.r.t. their props


## React State and Lifecycle


### React Component Lifecycle

* Each component in React has a lifestyle and it goes through
a series of phases :-
  * Mounting
  * Updating
  * Un-Mounting

1. **Mounting**

* Following methods get called in order when an instance of 
  component is created and inserted in the DOM
  * __constructor()__  : Called first to initiate the component
  * _getDerivedStateFromProps()_ : called right before rendering the element(s) in the DOM
  * __render()__ : Required. Used for rendering UI elements
  * __componentDidMount()__ : Called after UI elements are rendered

2. **Updating**

* An update is caused by the changes to _props_ or _state_
* Following methods are called in order when an update has happened:-
  * _static getDerivedStateFromProps()_ : First method to be called when a component is updated
  * _shouldComponentUpdate()_ : Can return a Boolean value that specifies whether React should continue with the rendering or not
  * __render()__ : Called to re-render UIs elements
  * _getSnapshotBeforeUpdate()_ : Using this method, we can access the value of _props_ and _state_ before the update. It must be present along with _componentDidUpdate()_
  * __componentDidUpdate()__ : Called after the component is updated on the DOM

3. **Un-Mounting**

* It happens when a component is removed from the DOM
* Method called during un-mounting is 
  * __componentWillUnmount()__ 

4. __Error Handling__

* These methods are called when there is an error during rendering :-
  * _static getDerivedStateFromError()_ : 
    * It is invoked after an error has been thrown by a descendant component
    * It `receives error that was thrown` as a parameter
    * It should `return a value to update the state`
  * _componentDidCatch()_ : 
    * It is invoked after an error has been thrown by a descendant component
    * It receives two parameters :-
      * _error_ - Error that was thrown.
      * _info_ - An object with a componentStack key containing information about which component threw the error
    * It can be used for logging errors



* We will use component State and lifecycle methods to build clock so that React Component sets up its own timer and update itself every second

```js
    class Clock extends React.Component {

        // A constructor will initialize the state and 
        // also calls the base constructor
        constructor(props){
            super(props);
            this.state = {date: new Date()};
        }

        // Mounting: When a part of the UI is rendered to the
        // DOM for the first time 

        // UnMounting: When a part of the UI is removed from 
        // the DOM

         
        componentDidMount() {
          // When component is mounted, set up the timer
          this.timerID = setInterval(
              () => this.tick(), 1000
          );   
        } 


        componentWillUnmount() {
            // when clock component is unmounted clear the
            // interval
            clearInterval(this.timerID);
        }


        tick() {
            this.setState({
                date: new Date()
            });
        }

        render(){
            return (
                <div>
                    <h1>Hello, World</h1>
                    <h2>It is {this.state.date.toLocalTimeString()}</h2>
                </div>
            )
        };
    }

    ReactDOM.render(
        <Clock />,
        document.getElementbyId('root');
    );
```

### Using State Correctly

1. Do not modify state directly

```js
    // wrong : This will not re-render the component
    // Only place where state can be assigned is the 
    // constructor
    this.state.comment = 'hello';


    // correct : This will re-render the component
    this.setState({
        comment: 'hello'
    });
```

2. State updates may be asynchronous
 
    * React may batch(group) multiple setState() calls into a single update for performance
    
    * Because `this.props` and `this.state` may be updated asynchronously, we should not rely on their values for calculating the next state

```js
    // Wrong 
    this.setState({
        counter: this.state.counter + this.props.increment
    });

    // Correct 
    this.setState((state, props) => ({
        counter: state.counter + props.increment
    }));

```

3. State Updates are merged
    * Merging is shallow, so `this.setState({comments})` leaves `this.state.posts` intact, but completely replaces `this.state.comments`

```js
    // suppose we initialized the state like this
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            comments: []
        };
    }

    // We can update the posts and comments independently 
    // with separate setState() calls
    componentDidMount() {

        // fetchPosts() is a function which returns posts
        fetchPosts().then(response => {
            this.setState({
                posts: response.posts
            });
        });

        // fetchComments() is a function which returns comments
        fetchComments().then(response => {
            this.setState({
                comments: response.comments
            });
        });
    }
```

* In React Component, data(props) flows from the parent component to the child component [`Uni-directional Data  Flow`]. Also child component does not know from which component it got data
* **State is local & encapsulated**: State is not accessible to any component other than the one that owns and sets it



## Handling Events in React

* React events are named using camelCase notation

* With JSX, we pass a function as a event handler, rather than a string

```js

    // remember we need to pass the function handler, and 
    // does not need to call the function handler
    <button onClick={activate}>
        Activate 
    </button>
```

### Event handlers binding

```js
    class Welcome extends React.Component {
        constructor(props) {
            super(props);
            this.state = { message: 'Hello' };

            // binding clickHandler function with this object
            this.clickHandler = this.clickHandler.bind(this);
        }

        // Another way of binding the event handler with this 
        // object
        // clickHandler = () => {
        //     this.setState({
        //         message: 'GoodBye'
        //     });  
        // }

        // define the clickHandlerFunction 
        clickHandler() {
            this.setState({
                message: 'GoodBye'
            });
        }

        render() {
            return (
                <div>
                    <h1>{this.state.message}</h1>
                    <button onClick={this.clickHandler}>
                        Click Me
                    </button>
                </div>
            );
        }
    }

    ReactDOM.render(
        <Welcome />,
        document.getElementById('root')
    );

```

## Conditional Rendering

* Using `if...else`

```js

    render(
        if(this.state.isLoggedIn){
            return <div>You are logged in</div>
        }else {
            return <div>You are not logged in</div>
        }
    );

```


* Using `element variable`

```js

    render(
        let element;
        if(this.state.isLoggedIn){
            element = <div>You are logged in</div>
        }else {
            element = <div>You are not logged in</div>
        }

        return (
            element
        );
    );
```


* Using `&&`

```js
    render(

      // render nothing if not logged in   
      return this.state.isLoggedIn && <div>You are logged in</div>
    );
```


* Using `Conditional Operator`

```js
    render(
        return (
            this.state.isLoggedIn? <div>Logged In</div> :
            <div>Not Logged In</div>
        );
    );
```


## Lists and Keys 

* Rendering list in react
* Key is needed while creating array of elements so that react DOM will be able to compare the element with the corresponding node in DOM and reflect associated changes
* Otherwise React DOM will not be able to identify which have been modified or removed if the element gets inserted/deleted in-between
* Key associated with each element in the list of elements should be unique

```js
    let persons = [
        {
            id: 1,
            firstName: 'Santosh',
            lastName: 'Swansi',
            age: 20
        },
        {
            id: 2,
            firstName: 'Subhash',
            lastName: 'Swansi',
            age: 22
        },
        {
            id: 3,
            firstName: 'Sangeeta',
            lastName: 'Swansi',
            age: 25
        }
    ];

    let Person = (props) => {
        let person = props.person;
        return <li> I am {person.name}. I am {person.age} years old </li>;
    }

    function Siblings(props){
        let persons = props.persons;
        let PersonList = persons.map((person) => 
            <Person key=person.id person={person}/>
        ) 

        return (
            <ul>
                {PersonList}
            </ul>
        )
    }


    ReactDOM.render(
        <Siblings persons={persons}/>,
        document.getElementById('root)
    );

```

* Another way of rendering list elements (Using {})

```js
    var cricketersList = [
        {
            id: 1,
            name: 'Suresh Raina'
        },
        {
            id: 2,
            name: 'MS Dhoni'
        },
        {
            id: 3,
            name: 'Ravindra Jadeja'
        }
    ];


    function ListItem(props) {
        return (<li> props.name </li>);
    }

    function List(props) {
        const cricketers = props.cricketers;

        return (
            <ul>
                {
                   cricketers.map((cricketer) => 
                    <ListItem key={cricketer.id} name={cricketer.name}/>
                   ) 
                }
            </ul>
        )
    }
``` 



## Forms Handling in React

* `Controlled Component`:  Form data is controlled by React Component. It is preferred over uncontrolled component
* `Un-controlled Component`: Form data is handled by the DOM itself

* `Examples of Controlled Component`

  * `Handling Single Input`

```js
    class NameForm extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                name: ''
            };
        }


        // does not require binding to this
        handleNameChange = (event) => {
            this.setState({
                name: event.target.value
            });
        };

        handleSubmit = (event) => {
            alert(`${this.state.name}`);

            event.preventDefault();
        }

        render() {
            return (
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input
                            type='text'
                            value={this.state.name} 
                            onChange={this.handleNameChange}
                        />
                    </label>
                    <input type='submit' value='Submit' />
                </form>
            );
        }
    }
```

  * `Handling Multiple Inputs`

```js
    class FavoriteForm extends React.Component {
        constructor(props) {
            super(props);

            this.state = {
                name: '',
                topic: 'Politics',
                story: 'Enter your story here!',
            };
        }

        // Does not require binding with this
        handleFormChange = (event) => {
            const target = event.target;
            const value = target.value;
            const name= target.name;

            this.setState({
                
               [name]: value
            }); 
        }

        // Does not require binding with this
        handleSubmit = (event) => {
            // on submission, alert the value
            alert(`${this.state.name}, ${this.state.topic}, $   {this.state.story}`);

            // To prevent default behavior of submit 
            // Or To stop input being reset
            event.preventDefault();
        }


        render(){

            let { name, topic, story } = this.state;

            return (
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:   
                        <input
                            type='text'
                            name='name'
                            value={name}
                            onChange={this.handleFormChange}
                        />
                    </label>

                    <label>
                        Topic:
                        <select
                            name='topic'
                            value={topic}
                            onChange={this.handleFormChange}
                        >
                            <option value='politics'>
                                Politics
                               </option>

                            <option value='education'>
                                Education
                               </option>

                            <option value='addiction'>
                                Addiction
                               </option>

                            <option value='travel'>
                                Travel
                               </option>
                        </select>
                    </label>

                    <label>
                        Story:
                            <textarea
                                name='story'
                                value={story}
                                onChange={this.handleFormChange}
                            />
                    </label>

                    <input type='submit' value='Submit' />

                </form>
            );
        }
    }
```


## Lifting State Up

* Suppose we have to temperature inputs (one in celsius and other in fahrenheit)

* We want to make them sync with each other. When one changes the other should automatically reflect change

* We can accomplish this work by moving the state up to the closest common ancestor of the components that need it. This is called as `lifting state up`

* The component which contains the state {single "source of truth"} will pass props containing `state` and method `handleChange` to handle to change while calling the components which needs it

```js
    const scaleNames = {
        'c': 'Celsius',
        'f': 'Fahrenheit',
    };

    // It is going to get the  input from the  user
    // And using method provided by the component which is 
    // the "source of truth" of state we will make the 
    // multiple inputs in sync with each other
    class TemperatureInput extends React.Component {
        constructor(props){
            super(props);

            this.handleChange = this.handleChange.bind(this);
        }

        handleChange(e) {
            // onTemperatureChange() { provided by the 
            // calling component } will be called to handle 
            // the input change  passing it the changed value
            this.props.onTemperatureChange(e.target.value);
        }

        render() {
            const temperature = this.props.temperature;
            const scale = this.props.scale;

            return (
                // fieldset is used to group together related 
                // items and draw a box over it 
                <fieldset>
                     { /* legend is used to name the box drawn with fieldset  tag */ } 
                    <legend>Enter temperature in {scaleNames[scale]}:</legend>
                    <input 
                        value={temperature} 
                        onChange={this.handleChange}
                    />
                </fieldset>
            );
        }
    }

    // temperature converter functions
    const toFahrenheit = (fahrenheit) => {
        return (fahrenheit − 32)* (5/9); 
    }

    const toCelsius = (celsius) => {
        return (9/5) * celsius + 32;
    }

    const tryConvert(temperature, scale) {

        // when input is empty
        const input = parseFloat(temperature);
        if(Number.isNaN(input)){
            return '';
        }

        const output = convert(input);

        // round upto three decimal places
        const rounded = Math.round(output * 1000)/1000;

        // convert it to string to display it to the user
        return rounded.toString();
    }

    // To display water boils at the given temperature or not
    function BoilingVerdict(celsius) {
        if(celsius >= 100){
            return <h1>Water boils at {celsius}</h1>
        }else{
            return <h1>Water does not boil at {celsius}</h1>
        }
    }




    class Calculator extends React.Component {
        constructor(props) {
            super(props);

            this.state = {temperature:  '', scale: 'c'};
            this.onCelsiusChange = this.onCelsiusChange.bind(this);
            this.onFahrenheitChange = this.onFahrenheitChange.bind(this);
        }

        onCelsiusChange(temperature) {
            this.setState({
                temperature,
                scale: 'c',
            });
        }

        onFahrenheitChange(props) {
            this.setState({
                temperature,
                scale: 'f',
            });
        }

        render() {

            // Changed temperature and corresponding scale
            // is noted here (If change in input)
            let {temperature, scale} = this.state;

            // Get the temperatures in both scales
            let celsius = scale === 'f'? tryConvert(temperature, toCelsius) : temperature;  

            let fahrenheit = scale === 'c'? tryConvert(temperature, toFahrenheit) : temperature; 
            
            return (
                <div>
                    <TemperatureInput 
                        temperature={celsius}
                        scale='c'
                        onTemperatureChange={this.state.onCelsiusChange}
                    />
                    
                    <TemperatureInput 
                        temperature={fahrenheit}
                        scale='f'
                        onTemperatureChange={this.state.onFahrenheitChange}
                    />

                    { /* Whether water boils or not  */ }
                    <BoilingVerdict 
                        celsius={parseFloat(celsius)}
                    />
                </div>
            );
        }
    }
```

## Composition over Inheritance 

* It is recommended to use composition instead of inheritance to reuse code between components

* `Props` and `composition` give you the flexibility we need to customize a component’s look and behavior in an explicit and safe way. [A component may accept arbitrary props, including primitive values, React elements, or functions]

* If we want to reuse non-UI functionality between components, it is suggested to extract it into a separate JavaScript module
* The components may import it and use that function, object, or a class, without extending it

