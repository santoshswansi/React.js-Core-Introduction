import React from "react";

import { Navbar, Nav,  } from "react-bootstrap";
import {ThemeContext} from "./index";

class NavBar extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/calculator">Calculator</Nav.Link>
            <Nav.Link href="/jokes">Jokes</Nav.Link>
            <Nav.Link href="/form">Form</Nav.Link>
          </Nav>
          
          <ThemeContext.Consumer >{
           ({theme, toggleTheme}) => {
             return (
                <div className="custom-control custom-switch">
                  <input type="checkbox" className="custom-control-input" id="customSwitch" onClick={toggleTheme}/>
                  <label className="custom-control-label switch" htmlFor="customSwitch">Theme</label>
                </div>
             );
           }
          }
          </ThemeContext.Consumer> 

        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
