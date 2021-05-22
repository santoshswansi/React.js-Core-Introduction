import React from 'react';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';

// Font Awesome Icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Local Imports
import Login from './Login';
import {ThemeContext} from './index';

const Entity = {
  name: 'React',
  intro: 'I am a JavaScript library used for building user interfaces',
};

// defining Welcome react component
function Welcome(props) {
  return (
    <h1 className='header' style={{color: props.color}}>
      {props.message} {props.name}!!
    </h1>
  );
}

// Defining Clock React component using state and lifecycle
// methods

class Clock extends React.Component {
  // Initialize the clock state
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      message: "Hello",
      isLoggedIn: true,
    };

    this.clickOnFocus = true;

    this.clickButtonRef = React.createRef();
    this.logOutButtonRef = React.createRef();

    this.clickHandler = this.clickHandler.bind(this);
    this.logoutHandler = this.logoutHandler.bind(this);
  }

  // Defining clickHandler()
  clickHandler(args) {
    console.log(args);
    let m = 'Goodbye';
    if (this.state.message === 'Goodbye')
      m = 'Hello';

    this.setState({
      message: m,
    });
  }


  // defining logoutHandler()
  logoutHandler() {
    this.setState({
      isLoggedIn: false
    });
  }

  keyPress = (e) => {
    if(e.keyCode === 39 || e.keyCode === 37){

      this.clickOnFocus = !this.clickOnFocus;
      if(this.clickOnFocus)
        this.logOutButtonRef.current.focus();
      else
        this.clickButtonRef.current.focus();
    }
  }

  // set up the timer, when component is mounted
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);

    this.clickButtonRef.current.focus();
  }

  // Clear the timer, when the component is mounted
  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  // define the tick()
  tick() {
    // update the clock state
    this.setState({
      date: new Date(),
    });
  }

  // define render()
  // It will be used to render the component on the ReactDOM
  // when the clock is initialized as well as when the clock
  // component is updated on the React DOM
  render() {

    if (this.state.isLoggedIn === false) {
      return (
        <Login />
      );
    }else {
      return (
        <ThemeContext.Consumer>
        {
          ({theme, toggleTheme}) => {
            return (
              <Jumbotron
                className="page"
                style={{ background: theme.background }}
              >
                {/* Passing multiple properties to Welcome component */}
                <Welcome
                  name={Entity.name}
                  message={this.state.message}
                  color={theme.text}
                />
                <h2 className="date" style={{ color: theme.text }}>
                  It is {new Date().toLocaleTimeString()}
                </h2>

                <p className="para" style={{ color: theme.text }}>
                  {Entity.intro}
                </p>

                {/* react-bootstrap button */}
                {/* Passing arguments to event handlers */}
                {/* e argument represents the react event which will be 
                     passed as a second argument  */}

                <Button
                  variant="primary"
                  size="lg"
                  onClick={(e) => this.clickHandler("clicked", e)}
                  onKeyDown={this.keyPress}
                  ref={this.clickButtonRef}
                >
                  Click Me <FontAwesomeIcon icon="hand-point-down" />
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  onClick={this.logoutHandler}
                  onKeyDown={this.keyPress}
                  ref={this.logOutButtonRef}
                  style={{ marginLeft: "15px" }}
                >
                  Log Out <FontAwesomeIcon icon="sign-out-alt" />
                </Button>
              </Jumbotron>
            );
          }
        }
        </ThemeContext.Consumer>
      );
    }

  }
}


export default Clock;