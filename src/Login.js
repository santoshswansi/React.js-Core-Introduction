import React, { Component } from "react";

import Button from "react-bootstrap/Button";
import Jumbotron from "react-bootstrap/Jumbotron";

// FontAwesomeIcon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// local import
import Clock from "./Clock";
import {ThemeContext} from "./index";


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      message: "You are not Logged In. Try to click the button below!!",
    };

    this.loginButtonRef = React.createRef();

    // Login and Logout Button click handlers
    this.loginHandler = this.loginHandler.bind(this);
  }

  loginHandler() {
    this.setState({
      isLoggedIn: true,
    });
  }

  // As soon as component is mounted, provide focus to 
  // login button
  componentDidMount(){
    this.loginButtonRef.current.focus();
  }  

  render() {
    let component;

    if (this.state.isLoggedIn) {
      component = <Clock />;
    } else{
      component = (
        <ThemeContext.Consumer>
        {
          ({theme, toggleTheme}) => {
            return (
              <Jumbotron
                style={{ background: theme.background }}
                className="page"
              >
                <h1 className="header" style={{ color: theme.text }}>
                  {this.state.message}
                </h1>

                <Button variant="primary" size="lg" ref={this.loginButtonRef} onClick={this.loginHandler}>
                  Log In <FontAwesomeIcon icon="sign-in-alt" />
                </Button>
              </Jumbotron>
            );
          }
        }
        </ThemeContext.Consumer>
      );
    }

    return component;
  }
}

export default Login;
