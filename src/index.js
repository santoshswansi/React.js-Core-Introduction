import React from "react";
import ReactDOM from "react-dom";


import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// Font Awesome Icon
import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faSignInAlt,
  faSignOutAlt,
  faHandPointDown,
} from "@fortawesome/free-solid-svg-icons";


// React.lazy() does not support named exports
import { Jokes, jokes } from "./Jokes";


// local imports
const NavBar = React.lazy(() => import("./Nav"));
const Login= React.lazy(() => import("./Login"));
const Calculator = React.lazy(() => import("./Calculator"));
const NameForm = React.lazy(() => import("./Form"));

// add icons to the local library
library.add(faSignInAlt, faSignOutAlt, faHandPointDown);


const Themes = {
  dark: {
    background: "#1b262c",
    text: "#fff",
  },
  light: {
    background: "#e1f4f3",
    text: "#222831",
  },
};

const ThemeContext = React.createContext({
  theme: Themes.light,
  toggleTheme: () => {},
});

class LoginControl extends React.Component {

  constructor(props) {
    super(props);

    // NOTE: First define the function then use as key
    //       in state object  
    this.toggleTheme = () => {
      this.setState((state) => ({
        theme: state.theme === Themes.dark ? Themes.light : Themes.dark,
      }));
    };

    this.state = {
      theme: Themes.light,
      toggleTheme: this.toggleTheme,
    };

  }

  render() {
    return (
      <Router>
        <React.Suspense fallback={<div>Loading ....</div>}>
          
          {/* 
            Provider will provide the current theme to the 
            children components
          */}
          <ThemeContext.Provider value={this.state}>
            <NavBar />
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/calculator" component={Calculator} />
              <Route path="/jokes" render={() => <Jokes jokes={jokes} />} />
              <Route path="/form" component={NameForm} />
            </Switch>
          </ThemeContext.Provider>

        </React.Suspense>
      </Router>
    );
  }
}

ReactDOM.render(<LoginControl />, document.getElementById("root"));

export {ThemeContext, LoginControl};
