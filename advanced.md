# Advanced Guides

## Accessibility

- Web accessibility (or `a11y`) is the design and creation of websites that can be used by everyone

### ARIA-\- tags in JSX

- `aria__` tags are supported in JSX which should be hyphen-cased

```js
<input
  type="text"
  aria-label={labelText}
  aria-required="true"
  onChange={onchangeHandler}
  value={inputValue}
  name="name"
/>
```

- `Link:`

  - [Techniques for building fully accessible JavaScript widgets](https://www.w3.org/WAI/intro/aria)

### Semantic HTML

- Semantic HTML is the foundation of accessibility in a web application.
- Using the various HTML elements to reinforce the meaning of information in our websites will often give us accessibility for free.

- Use React Fragments in order to render multiple JSX elements to avoid extra tag being added in the DOM

### Accessible Forms

#### __Labelling__

- Every HTML form control( such as `<input>` & `<textarea>`) needs to be labelled
- We need to provide descriptive labels that should be exposed to the screen readers
- `for` property in HTML is written as `htmlFor` is JSX

```js
    <label htmlFor='namedInput'>Name:</label>
    <input type='text' id='namedInput' name='name'/>
```

- `Link:`

  - [How to label Elements?](https://www.w3.org/WAI/tutorials/forms/labels/)

#### __Notifying the user of errors__

- Users should know about the error and we should expose the errors to screen readers as well

- `Links:`

  - [User Notifications](https://www.w3.org/WAI/tutorials/forms/notifications/)
  - [From Validations](https://webaim.org/techniques/formvalidation/)

### Focus Control

- Ensure the website can be operated fully `using keyboard only`
- `Link:`
  - [Keyboard Accessibility](https://webaim.org/techniques/formvalidation/)

#### Keyboard Focus and focus outline

- Keyboard focus refers to the current element in the DOM that is ready to accept input from the keyboard

- Focus outline draws an outline on the UI element which is currently selected

- Use `outline` property to outline an element

#### Mechanisms to skip to desired content

- Provide a mechanism to allow users to skip navigation sections as it assists & speeds up keyboard navigation
- `Skiplinks` or `Skip Navigation Links` (hidden navigation links, visible when users use keyboard to interact with the page) can be used
- We can also use landmark elements (such as `<main>` & `<aside>`) to demarcate page regions to allow quick navigation to the main region

- `Links:`
  - [Skip Navigation Links](https://webaim.org/techniques/formvalidation/)
  - [Accessible Landmarks](https://webaim.org/techniques/formvalidation/)

#### Programmatically managing focus

- Our React applications continuously modify the HTML DOM during runtime, sometimes _leading to keyboard focus being lost or set to an unexpected element_
- `How to repair this?` We need to programmatically nudge the keyboard focus in the right direction
- `For example :` After a modal window is closed, focus should be set to the element which opened the modal window

- To set focus in React, we can use `Refs to DOM element`

### Mouse & pointer events

- Ensure that all functionality exposed through a mouse or pointer event can also be accessed using the keyboard alone.
- Depending only on the pointer device will lead to many cases where keyboard users cannot use your application

### Other Points for Consideration

- `Indicate the correct language` of texts in the page, so that screen reader software will be able to pronounce the word correctly

- `Set the appropriate title` so that user will know the context of the page { `For More:` [React Document Title Component](https://github.com/gaearon/react-document-title) }

- `Color Contrast:`
  - Allow your website to have sufficient color contrast to maximally readable by users with low vision

### Development & Testing Tools

#### The Keyboard

1. Disconnect your mouse
2. Use `Tab` and `Shift+Tab` to browse
3. Use `Enter` to activate elements
4. Use `arrow keys` (where required like `drop downs`, `menus`)

#### Development Assistance

- We can check some accessibility features directly in our JSX code :

  - Intellisense aware us about aria-roles, states and properties

- `Tool`

  - `eslint-plugin-jsx-a11y:` It provides feedback regarding accessibility issues in our JSX
  - `create-react-app` use the above plugin with subset of rules activated. To enable even more accessibility rules, we can create an `.eslintrc` file in the root of your project with this content

    ```js
        "extends": ["react-app", "plugin:jsx-a11y/recommended"],
        "plugins": ["jsx-a11y"]
    ```

- For testing accessibility features in the browser, we can use various tools available:
  _`aXe` `aXe-core` `react-axe`
  _ `WebAIM WAVE` \- `Accessibility inspectors` & `accessibility tree`
- Various screen readers are also available for different browsers to perform accessibility tests

## React Router DOM

- Module `react-router-dom` is used for routing in react

- Basic Example

```js
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

const RoutingExample = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/user">User</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/user" component={User} />
          <Route path="/about" component={About} />
          <Route path="/:id" children={<Child />} />
        </Switch>
      </div>
    </Router>
  );
};

function Child() {
  let { id } = useParams();

  return (
    <div>
      <h1>Hello you are in the {id} page</h1>
    </div>
  );
}
```

## CODE SPLITTING

### Bundling

- It is the process of following the imported files and merging them into a single file `bundle`
- This bundle can then be included on a webpage to load an entire app at once
- Most React apps will be bundled using tools like [Webpack](https://webpack.js.org/), [Rollup](https://webpack.js.org/) or [Browserify](https://webpack.js.org/)

- Example

- `App`

```js
// app.js
import { add } from "./math.js";

console.log(add(21, 27));
```

```js
export function add(a, b) {
  return a + b;
}
```

- `Bundle`

```js
function add(a, b) {
  return a + b;
}

console.log(add(21, 27));
```

- NOTE: Project created using 'create-react-app' and similar tools, will use WebPack to bundle our app

### Code Splitting

- As app grows bundle becomes extremely large
- Which increases the loading time, giving bad user experience
- Code splitting is used to dynamically load the module as and when required not at once

#### Ways to do Code Splitting

##### Dynamic import()

```js
import("./math").then((math) => {
  console.log(math.add(21, 27));
});
```

##### React.lazy() and React.Suspense

> __Note__: React.lazy and Suspense are not yet available for server-side rendering

- It let's use the dynamic import as a regular React Component

```js
const About = React.lazy(() => import("./About"));
```

- Here `About` component will be automatically loaded when the component is rendered for the first time
- It takes a function that must call a `dynamic import()`. It must return a `Promise` which resolves to a module with a `default export` containing a `React component`

- `Lazy` component should then be rendered inside a `Suspense` component(It allows us to give a `fallback` when user is waiting)

```js
const OtherComponent = React.lazy(() => import("./  OtherComponent"));
const AnotherComponent = React.lazy(() => import("./  AnotherComponent"));

function MyComponent() {
  return (
    <div>
      <React.Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
        <AnotherComponent />
      </React.Suspense>
    </div>
  );
}
```

- We can place the `Suspense component` anywhere above the `lazy component`
- You can even `wrap multiple lazy components with a single Suspense component`

##### Error boundaries

- If any module fails to load (for example, due to network failure), it will trigger an error.
- We can handle these errors to show a nice user experience and manage recovery with `Error Boundaries`
- We can use it anywhere above our lazy components to display an error state when there’s a network error(after creating it)

```js
const MyComponent = () => (
  <div>
    <MyErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </MyErrorBoundary>
  </div>
);
```

> __NOTE:__ React.lazy currently only supports default exports.

- Way to tackle this

```js
export { MyComponent as default } from "./ManyComponents.js";
```

## Context in React

- It allows us to pass data through the component tree without having to pass props down manually at every level

### When to use Context in React

- It is recommended to use context when data needs to be shared are considered 'global' for a tree of React component
- Examples of global data: __current authenticated user__, __theme__, or __preferred language__

- __Usage__: When some `data needs to be accessible by many components` at `different nesting levels`
- __Apply it sparingly__ because it makes component reuse more difficult

> If you only want to avoid passing some props through many levels, __component composition__ is often a simpler solution than context

### React.createContext

```js
// 'defaultValue' will be used when component does not have
// a matching provider above in the tree
const myContext = React.createContext("defaultValue");
```

### Context.Provider

- Every `Context object` comes with a `Provider React Component` that allows `Consuming Components` to subscribe to context changes

- It accepts `value` prop which are passed to the `consuming component` descendants of this provider

- `Providers can be nested` to override values deeper within the tree.

- All `descendant consumers` of a Provider will re-render whenever the Provider’s value prop changes

- `Consumer component` is updated even when an ancestor component skips an update
  - __Why?__: Propagation from `Provider` to its `descendant consumers` (including `.contextType` and `useContext`) is not subject to the `shouldComponentUpdate`

```js
  <MyContext.Provider value={/- some value -/}>
```

### Class.contextType

- One way to consume data in `Class Component`
- `contextType` property on a class can be assigned a `Context object` created by `React.createContext()`

- Using this we can consume the nearest current value of that Context type using `this.context`

- We can `reference` this in any of the `lifecycle methods` including the `render()`

- __RESTRICTION__: We can only subscribe to a single context using this API

```js
class MyClass extends React.Component {
  componentDidMount() {
    let value = this.context;
    /- perform a side-effect at mount using the value of  MyContext -/
  }
  componentDidUpdate() {
    let value = this.context;
    /- ... -/
  }
  componentWillUnmount() {
    let value = this.context;
    /- ... -/
  }
  render() {
    let value = this.context;
    /- render something based on the value of MyContext -/
  }
}

MyClass.contextType = MyContext;
```

- If we are using `public class fields syntax`, we can use a `static` class field to initialize our `contextType`

```js
class MyClass extends React.Component {
  static contextType = MyContext;

  render() {
    let value = this.context;

    // render something based on the value
  }
}
```

### Context.Consumer

- It is a React Component that subscribes to context within `functional` as well as `class components`

- It requires a `function as a child` :-

  - __Receives__: Current Context Value
  - __Returns__: React node

- Argument of the function will either contain :-
  - __Default Value__: No Provider for this context above
  - Value equal to the `value` prop of closest Provider for this context above

```js
  <MyContext.Consumer>
    {value => /- render something based on the context value -/}
  </MyContext.Consumer>
```

### Dynamic Context

> __theme-context.js__

```js
export const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222",
  },
};

const ThemeContext = React.createContext(
  themes.dark // default value
);

export { ThemeContext, themes };
```

> __themed-button.js__

```js
import { ThemeContext } from "./theme-context";

class ThemedButton extends React.Component {
  render() {
    // here props object will contain `onClick` key
    // with its value containing a function
    let props = this.props;
    let theme = this.context;
    return (
      <button
        // Destructuring the props object
        // Equivalent to :  onclick={props.changeTheme}
        {...props}
        style={{ backgroundColor: theme.background }}
      />
    );
  }
}
ThemedButton.contextType = ThemeContext;

export default ThemedButton;
```

> __app.js__

```js
import { ThemeContext, themes } from "./theme-context";
import ThemedButton from "./themed-button";

// An intermediate component that uses the ThemedButton
function Toolbar(props) {
  return (
    // `ThemedButton` is a children component of `Toolbar`
    // component therefore it has access to the changing
    // context (here: Theme)

    // `onClick` will be passed as an key to the `props`
    // object to the `ThemedButton` component
    <ThemedButton onClick={props.changeTheme}>Change Theme</ThemedButton>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
    };

    this.toggleTheme = () => {
      this.setState((state) => ({
        theme: state.theme === themes.dark ? themes.light : themes.dark,
      }));
    };
  }

  render() {
    // The ThemedButton button inside the ThemeProvider
    // uses the theme from state while the one outside uses
    // the default dark theme
    return (
      <Page>
        {/-
            Toolbar and all its children components can 
            consume the changing context (here: theme)

            AND

            `changeTheme` props will be passed to the
            `Toolbar` component
          -/}
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
        <Section>
          <ThemedButton />
        </Section>
      </Page>
    );
  }
}

ReactDOM.render(<App />, document.root);
```

### Updating Context from the nested component

- We can pass a function down through the context to allow consumers to update the context

#### Creating the context containing a function\-\-

- __theme-context.js__

  ```js
  export const ThemeContext = React.createContext({
    theme: themes.dark,
    toggleTheme: () => {}, // for changing theme context
  });
  ```

- __theme-toggler-button.js__

  ```js
  import { ThemeContext } from "./theme-context";

  function ThemeTogglerButton() {
    /-
        The Theme Toggler Button receives not only the
        `theme` but also a `toggleTheme` function from the context
      -/

    return (
      <ThemeContext.Consumer>
        {/- 
            Destructuring the value object passed to the    
            provider 
          -/}

        {({ theme, toggleTheme }) => (
          <button
            onClick={toggleTheme}
            style={{ backgroundColor: theme.background }}
          >
            Toggle Theme
          </button>
        )}
      </ThemeContext.Consumer>
    );
  }

  export default ThemeTogglerButton;
  ```

- __app.js__

```js
import { ThemeContext, themes } from "./theme-context";
import ThemeTogglerButton from "./theme-toggler-button";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggleTheme = () => {
      this.setState((state) => ({
        theme: state.theme === themes.dark ? themes.light : themes.dark,
      }));
    };

    // State also contains the updater function so it will
    // be passed down into the context provider
    this.state = {
      theme: themes.light,
      toggleTheme: this.toggleTheme,
    };
  }

  render() {
    // The entire state is passed to the provider
    return (
      <ThemeContext.Provider value={this.state}>
        <Content />
      </ThemeContext.Provider>
    );
  }
}

function Content() {
  return (
    <div>
      <ThemeTogglerButton />
    </div>
  );
}

ReactDOM.render(<App />, document.root);
```

### Consuming Multiple Contexts

- For faster context re-rendering; React makes each context
  consumer a separate node in the tree

- If two or more context values are often used together, we might want to consider creating our own render prop component

```js
// Theme context, default to light theme
const ThemeContext = React.createContext("light");

// Signed-in user context
const UserContext = React.createContext({
  name: "Guest",
});

class App extends React.Component {
  render() {
    const { signedInUser, theme } = this.props;

    // App component that provides initial context values
    return (
      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={signedInUser}>
          <Layout />
        </UserContext.Provider>
      </ThemeContext.Provider>
    );
  }
}

function Layout() {
  return (
    <div>
      <Sidebar />
      <Content />
    </div>
  );
}

// A component may consume multiple contexts
  function Content() {
    return (
      <ThemeContext.Consumer>
        {(theme) => (
          <UserContext.Consumer>
            {(user) => <ProfilePage user={user} theme={theme} />}
          </UserContext.Consumer>
        )}
      </ThemeContext.Consumer>
    );
  }
```

### Caveats

- The Following code will re-render all consumers every time
  the Provider re-render because a new object is created for
  `value`

```js
  
  class App extends React.Component {
    render() {
      return (
        <MyContext.Provider value={{something: 'something'}}>
          <Toolbar />
        </MyContext.Provider>
      );
    }
  }
```

- `Solution`: Lift the value into the parent's state

```js
  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        value: {something: 'something'},
      };
    }

    render() {
      return (
        <Provider value={this.state.value}>
          <Toolbar />
        </Provider>
      );
    }
  }
```

## Error Boundaries

- __Idea:__ A Javascript error in a part of the UI should not break the whole app

- Error boundaries are react component which overrides `static getDerivedStateFromError()` and `componentDidCatch()` to __catch the error__ that have occurred in the child component tree, __log them and display a fallback UI__

- Error boundaries do not catch errors for :-
      - Event Handlers
      - Asynchronous Code(e.g. setTimeout())
      - Server side rendering
      - error thrown in the error boundary itself

- A class component becomes an error boundary if it defines either (or both) of the lifecycle methods `static getDerivedStateFromError()` or `componentDidCatch()`
- `static getDerivedStateFromError()` : To render a fallback UI after an error has been thrown
- `componentDidCatch()` : To log error information

```js
  class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
      // You can also log the error to an error reporting   service
      logErrorToMyService(error, errorInfo);
    }

    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>Something went wrong.</h1>;
      }

      return this.props.children; 
    }
  }
```

- Now to catch error in in the component tree

```js
  <ErrorBoundary>
    <MyComponent />
  </ErrorBoundary>
```

### Where to place Error Boundary

- It can used to wrap top-level route components or individual widgets

### How about try/catch?

- `try/catch` is great but only works for `imperative code`(Code which defines the procedure to get the result you want)

- However, React components are `declarative` (Defines what it want but it does not define the procedure to get it)

- Error boundaries preserve the declarative nature of React, and behave as you would expect
- __For example__, even if an error occurs in a `componentDidUpdate()` caused by a `setState` somewhere deep in the tree, it will still correctly propagate to the closest error boundary

- Use try/catch block to catch error that may have occurred due to `event handlers`

## Refs And the DOM

- `Refs` provide a way to access DOM nodes(react elements) created in the `render()`
- In typical React dataflow, `props` are the only way to interact with their children
- To modify a child, we re-render it using `new props`

- However, there are many cases where we need to modify a child outside of typical dataflow(Child to be modified can be a React Component or DOM element)
- Which is possible using `Refs` in React

### When to Use Refs

- Managing focus, text selection, or media playback
- Triggering imperative animations
- Integrating with third-party DOM libraries

> __NOTE:__ Avoid using `refs` for anything that can be done declaratively
> __For example:__   Instead of exposing `open()` and `close()` methods on a `Dialog` component, pass an `isOpen` prop to it

### Creating Refs

```js
  class MyComponent extends React.Component{
    constructor(props){
      super(props);

      // Creating ref and storing in myRef class variable
      this.myRef = createRef();
    }

    render(){

      // Attaching the ref created above to the below React
      // element
      return <div ref={this.myRef}>Hello</div>;
    }
  }

```

### Accessing Refs

- We can access the ref using `current` attribute of the ref

```js
  const node = this.myRef.current;
```

- The `value of ref` differs depending on the type of the node:
  - __`ref` attribute used on HTML element:__ `current` property will hold underlying DOM elements
  - __`ref` attribute used on custom class component:__ `current` property will holds mounted instance of component

  - __Do not use `ref` property on functional component as they do not have instance__

#### Adding a `Ref` to a DOM element

```js
  class MyComponent extends React.Component {
    constructor(props){
      super(props);
      this.textInputRef = React.createRef();
      this.focusTextInput = this.focusTextInput.bind(this);
    }

    focusTextInput(){

      // It has access to the referenced DOM element
      // set focus to textInput
      this.textInputRef.current.focus();
    }

    render(){
      return (
        <div>
          {/- 
            When input element will be mounted,
            textInputRef.current will store DOM elements and when it is un-mounted, textInputRef.current will store null  
          -/}
          <input type="text" ref={this.textInputRef} />
          <input 
            type="submit" 
            value="Focus the Text Input"
            onClick={this.focusTextInput}
          />
        </div>
      );
    }
  }

```

#### Adding a `ref` to a Class Component

- When the component is mounted `current` property will hold mounted instance of component

```js
  class MyComponent extends React.Component {
    constructor(props){
      super(props);

      this.inputRef = React.createRef();
    }

    componentDidMount(){
      // calling focusTextInput() of MyCustomInput component
      this.inputRef.current.focusTextInput();
    }

    render(){
      return (
        // MyCustomInput must be class component 
        // In order to make it work
        <MyCustomInput ref={this.inputRef}>
      )
    }
  }

```

#### Refs and Function Components

- Since functional component does not have an instance, we cannot use `ref` attribute on them

- However, we can use `ref` attribute inside a functional component as long as we refer to DOM element or class component

#### Ref Forwarding

- It is a technique for automatically passing a `ref` through a component to one of its children

- It is a feature that lets some components take the `ref` they receive, and pass it further down to its children

- __EXAMPLE:__
  - `FancyButton` uses `React.forwardRef` to obtain `ref` passed to it and then forward it to thr DOM `button` that it renders

```js
  const FancyButton = React.forwardRef((props, ref) => (
    <button ref={ref} className="FancyButton">
      {props.children}
    </button>
  ));

  // We can now get a ref directly to the DOM button
  const ref = React.createRef();
  <FancyButton ref={ref}>Click me!</FancyButton>
```

> NOTE: We can also forward ref to class component(apart from DOM component)

## React Fragment

- React fragment allows us to return multiple JSX elements without adding extra node to the DOM

```js
  render(){
    return (
      <React.Fragment>
        <h1>Fragment Demo</h1>
        <div>Fragment Demo</div>
      </React.Fragment>
    );
  }
```

- Consider the following example

```js
  class Table extends React.Component {
    render() {
      return (
        <table>
          <tr>
            <Columns />
          </tr>
        </table>
      );
    }
  }

  class Columns extends React.Component {
    render() {
      return (
        <div>
          <td>Name</td>
          <td>Roll</td>
        </div>
      );
    }
  }

```

- Above Example: Gives us a warning that a `div` element cannot be used inside the `tr` element
- Instead of using `div`, we can use `React.Fragment` to get rid of the warning

```js
 class Columns extends React.Component {
    render() {
      return (
        <React.Fragment>
          <td>Name</td>
          <td>Roll</td>
        </React.Fragment>
      );
    }
  }  
```

> **NOTE:** We can also use empty opening & closing tags (`<>` & `</>`) instead of `React.Fragment`

### Keyed Fragments

- Fragment can also have keys
- USE CASE: Mapping a collection to an array of fragments(create description list)

```js
  function Glossary(props) {
    return (
      <dl>
        {props.items.map(item => (
          // Without the `key`, React will fire a key warning
          <React.Fragment key={item.id}>
            <dt>{item.term}</dt>
            <dd>{item.description}</dd>
          </React.Fragment>
        ))}
      </dl>
    );
  }
```

## Higher Order Components(HOCs)

- A higher-order component is a function that takes a component and returns a new component
  
```js
  const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

- Similar to how component transforms `props` into `UI`, HOC transforms the component into an another component

- __CommentList.js__

```js
  // CommentList.js
  class CommentList extends React.Component {
    

    render() {

      // get the props exposed by HOC to BlogPost
      const comments = this.props.data;
      return (
        <div>
          {comments.map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))}
        </div>
      );
    }
  }

  const CommentListWithSubscription = withSubscription(
    CommentList,
    (DataSource) => DataSource.getComments()
  );
```

- __BlogPost.js__

```js
  // BlogPost.js 
  class BlogPost extends React.Component {

    render() {
      // get the props exposed by HOC to BlogPost
      const blogPost = this.props.data;
      return <TextBlock text={blogPost}} />;
    }
  }

  const BlogPostWithSubscription = withSubscription(
    BlogPost,
    (DataSource, props) => DataSource.getBlogPost(props.id)
  );

```

- __withSubscription.js__

```js
  // withSubscription.js  (HOC)
  function withSubscription(WrappedComponent, selectData) {
    // ...Define another component...
    class UpdatedComponent extends React.Component {
      constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
          data: selectData(DataSource, props)
        };
      }

      componentDidMount() {
        // ... that takes care of the subscription...
        DataSource.addChangeListener(this.handleChange);
      }

      componentWillUnmount() {
        DataSource.removeChangeListener(this.handleChange);
      }

      handleChange() {
        this.setState({
          data: selectData(DataSource, this.props)
        });
      }

      render() {
        // ... and renders the wrapped component with the 
        // fresh data!

        // Notice that we pass through any additional props
        // Additional props that may have been passed to the 
        // Higher Order Component needs to be passed to 
        // WrappedComponent
        return <WrappedComponent data={this.state.data} {...this.props} />;
      }
    }

    return UpdatedComponent;
  }

```

### Don't Mutate the original component. Use Composition

- Do not modify the component's `prototype` inside the HOC

```js
  function logProps(InputComponent) {
    // INCORRECT way of adding features to the InputComponent
    InputComponent.prototype.componentDidUpdate = function  (prevProps) {
      console.log('Current props: ', this.props);
      console.log('Previous props: ', prevProps);
    };
    // The fact that we're returning the original input is a  hint that it has
    // been mutated.
    return InputComponent;
  }

  // EnhancedComponent will log whenever props are received
  const EnhancedComponent = logProps(InputComponent);
```

- Problems associated with it :-
  - `InputComponent` cannot be reused separately from the `EnhancedComponent`
  - If we apply another HOC to `EnhancedComponent` that also mutates `componentDidUpdate`, the first HOC's functionality will be overridden
  - Also second HOC will not work with functional components, which do not have lifecycle methods

- Instead of mutation, HOCs should use composition, by wrapping the component in a container component

```js
  // Correct way of adding features to the InputComponent 
  function logProps(WrappedComponent) {
    return class extends React.Component {
      componentDidUpdate(prevProps) {
        console.log('Current props: ', this.props);
        console.log('Previous props: ', prevProps);
      }
      render() {
        // Wraps the input component in a container, without mutating it. Good!
        return <WrappedComponent {...this.props} />;
      }
    }
  }
```

- This HOC has the same functionality as the mutating version while avoiding the potential for clashes
- It works equally well with class and function components
- Because it’s a pure function, it’s composable with other HOCs, or even with itself

### Convention: Pass unrelated props through to the wrapped component

- HOCs add features to the `WrappedComponent`
- `EnhancedComponent` returned from HOC is expected to have a similar interface to the `WrappedComponent`
- HOCs should pass through the props which are not related to it
- Most `render()` in HOC should look something like this (It helps ensure that HOCs are flexible and reusable as possible)

```js
  render() {
    // Filter out extra props that are specific to this HOC /
    // and shouldn't be passed through
    const { extraProp, ...passThroughProps } = this.props;

    // Inject props into the wrapped component. These are
    // usually state values or instance methods.
    const injectedProp = someStateOrInstanceMethod;

    // Pass props to wrapped component
    return (
      <WrappedComponent
        injectedProp={injectedProp}
        {...passThroughProps}
      />
    );
  }
```

### Convention: Wrap the Display Name for easy Debugging

- Higher Order Component: `withSubscription`
- WrappedComponent's display name: `CommentList`
- Use display name: `WithSubscription(CommentList)`

```js
  function withSubscription(WrappedComponent) {
    class WithSubscription extends React.Component {
      /* ... */
      }

    // Using EnhancedComponent's display name = 
    // HOC(displayName of WrappedComponent)  
    WithSubscription.displayName = `WithSubscription($  {getDisplayName(WrappedComponent)})`;
    return WithSubscription;
  }

  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }
```

### CAVEATS

#### Do not use HOC inside `render()`

- It causes performance issue, but more critically, remounting a component `causes that the state of the component and all of its children to be lost`

```js
  render() {
    // A new version of EnhancedComponent is created on 
    // every render
    // EnhancedComponent1 !== EnhancedComponent2
    const EnhancedComponent = enhance(MyComponent);
    // That causes the entire subtree to unmount/remount 
    // each time!
    return <EnhancedComponent />;
  }
```

- Instead apply HOCs outside the component definition so that the resulting component is created once

#### Static Methods must be copied over

- Ways to do it:-
  - `hoistNonReactStatic()`: Copies non-react specific statics from a child component to a parent component
  - Export static methods separately

### Refs Are not Passed Through

- `ref` are not props, it is handled specially by React
- If we add a `ref` to an element whose component is the result of a HOC, the `ref` refers to an instance of the outermost container component, not the wrapped component
- __SOLUTION:__ React.forwardRef()

## Portals

- Portals provide a first-class way to `render children into a DOM node that exists outside the DOM hierarchy of the parent component`

### Usage

- A typical use case of portals is when parent component has an `overflow:hidden` or `z-index` style, but we need child to visually "break out" of its container
- Example: dialogs, hover-boards and tooltips

```js
  render() {
    // React does *not* create a new div. It renders the  
    // children into `domNode`.
    // `domNode` is any valid DOM node, regardless of its   
    //location in the DOM.
    return ReactDOM.createPortal(
      this.props.children,
      domNode
    );
  }

```

### Event Bubbling Through Portals

- Even though a portal can be anywhere in the DOM tree, it behaves like a normal React child in every other way
- Features like context work the same way
- This also includes __event bubbling__(Event fired from inside a portal, will propagate to ancestors in the react tree, even if those elements are not ancestors in the DOM tree)

```html
  <html>
    <body>
      <div id="app-root"></div>
      <div id="modal-root"></div>
    </body>
  </html>
```

- A parent component in `#app-root` would be able to catch an uncaught event from the sibling node `#modal-root`

```js
  // These two containers are siblings in the DOM
  const appRoot = document.getElementById('app-root');
  const modalRoot = document.getElementById('modal-root');

  class Modal extends React.Component {
    constructor(props) {
      super(props);
      this.el = document.createElement('div');
    }

    componentDidMount() {
      // The portal element is inserted in the DOM tree after
      // the Modal's children are mounted, meaning that   
      // children will be mounted on a detached DOM node. If 
      // a child component requires to be attached to the 
      // DOM tree immediately when mounted, for example to 
      // measure a DOM node, or uses 'autoFocus' in a 
      // descendant, add state to Modal and only render the
      // children when Modal is inserted in the DOM tree
      modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
      modalRoot.removeChild(this.el);
    }

    render() {

      return ReactDOM.createPortal(
        this.props.children,
        this.el
      );
    }
  }

  class Parent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {clicks: 0};
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
      // This will fire when the button in Child is clicked,
      // updating Parent's state, even though button
      // is not direct descendant in the DOM.
      this.setState(state => ({
        clicks: state.clicks + 1
      }));
    }

    render() {
      return (
        <div onClick={this.handleClick}>
          <p>Number of clicks: {this.state.clicks}</p>
          <p>
            Open up the browser DevTools
            to observe that the button
            is not a child of the div
            with the onClick handler
          </p>
          <Modal>
            <Child />
          </Modal>
        </div>
      );
    }
  }

  function Child() {
    // The click event on this button will bubble up to 
    // parent, because there is no 'onClick' attribute 
    // defined
    return (
      <div className="modal">
        <button>Click</button>
      </div>
    );
  }

  ReactDOM.render(<Parent />, appRoot);
```

## Render Props

- It refers to a technique of sharing code between components by using a prop `render` whose value is a function


```js
class Cat extends React.Component {
    render() {
      const mouse = this.props.mouse;
      return (
        <img 
          src="/images/cat.jpg" 
          style={
            { 
              position: 'absolute',
              bottom: mouse.x,
              right: mouse.y, 
            }
          } 
         />
      );
    }
  }

  class Mouse extends React.Component {
    constructor(props) {
      super(props);
      this.handleMouseMove = this.handleMouseMove.bind(this);
      this.state = { x: 0, y: 0 };
    }

    handleMouseMove(event) {
      this.setState({
        x: event.clientX,
        y: event.clientY
      });
    }

    render() {
      return (
        <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>

          {/*
            Instead of providing a static representation of what <Mouse> renders,
            use the `render` prop to dynamically determine what to render.
          */}
          {this.props.render(this.state)}
        </div>
      );
    }
  }

  class MouseTracker extends React.Component {
    render() {
      return (
        <div>
          <h1>Move the mouse around!</h1>

          {/* A Render prop is a function prop that a component uses to know what to render*/}
          {
            /*
              For solving a specific case, we provide a 
              `render` prop, that <Mouse> can use to 
              dynamically determine what it renders
            */
          }
          <Mouse render={mouse => (
            <Cat mouse={mouse} />
          )}/>
        </div>
      );
    }
  }
```

### HOC using regular component with `render` prop

```js
  // If you really want a HOC for some reason, you can 
  // easily create one using a regular component with a 
  // render prop!
  function withMouse(Component) {
    return class extends React.Component {
      render() {
        return (
          {/* 
            Adding <Mouse> component to the input component 
          */}
          <Mouse render={mouse => (
            <Component {...this.props} mouse={mouse} />
          )}/>
        );
      }
    }
  }
```

### Using props other than `render`

- `children` prop

```js
  <Mouse children={mouse => (
    <p>The mouse position is {mouse.x}, {mouse.y}</p>
  )}/>
```

- There is no need of specifying `children` attribute either

```js
  <Mouse>
    {mouse => {
      <p>The mouse position is {mouse.x}, {mouse.y}</p>
    }}
  </Mouse>

```

- Since this  technique is little un-usual, we will probably want to explicitly state that `children` should be a function in our `propTypes` when designing an API

```js
  // defining propTypes of Mouse component
  Mouse.propTypes = {
    // specifying `children` as the function which is 
    // required
    children: PropTypes.func.isRequired
  };
```

## React.PureComponent

- It is similar to `React.Component`
- Thd difference between them is : `React.Component` does not implement `shouldComponentUpdate` lifecycle method, but `React.PureComponent` implements it with shallow props and state comparison

- We can use `React.PureComponent` while `render()` renders the same result given the same props and state for __performance boost__ by avoiding un-necessary renders

> Shallow Comparison: __PRIMITIVE TYPES__ If two values are equal { like string, numbers} __COMPLEX TYPES__ In case of object it just checks the reference not the attribute values



### Caveats

### Be careful when using Render Props with React.PureComponent

- **For example**, continuing with our `<Mouse>` component from above, if `Mouse` were to extend `React.PureComponent` instead of `React.Component`

```js
  class Mouse extends React.PureComponent {
    // Same implementation as above...
  }

  class MouseTracker extends React.Component {
    render() {
      return (
        <div>
          <h1>Move the mouse around!</h1>

          {/*
            This is bad! The value of the `render` prop will
            be different on each render.
          */}
          <Mouse render={mouse => (
            <Cat mouse={mouse} />
          )}/>
        </div>
      );
    }
  }
```

- __Solution__
  - Define the prop as an instance method

```js
  class MouseTracker extends React.Component {
    // Defined as an instance method, `this.renderTheCat` 
    // always refers to *same* function when we use it in 
    // render
    renderTheCat(mouse) {
      return <Cat mouse={mouse} />;
    }

    render() {
      return (
        <div>
          <h1>Move the mouse around!</h1>
          <Mouse render={this.renderTheCat} />
        </div>
      );
    }
  }
```


## React.memo

- What `React.PureComponent` is for class component, `React.memo` is for function component

- It is HOC
- If your component renders the same result given the same props, you can wrap it in  `React.memo` by memoizing the result giving performance boost
- This means that React will skip rendering the component, and reuse the last rendered result
- React.memo only checks for prop changes.
- If function component wrapped in `React.memo` has a `useState`, `useReducer` or `useContext` Hook, it will still re-render when state or context change

```js
  const MyComponent = React.memo(function MyComponent(props){
    /* render using props */
  });
```
