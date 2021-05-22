import React from "react";

import Jumbotron from "react-bootstrap/Jumbotron";

// Local Imports 
import {ThemeContext} from './index';


class NameForm extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
    this.state = {
      name: "",
    };
  }

  // does not require binding to this
  handleNameChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleSubmit = (event) => {
    alert(`${this.state.name}`);

    event.preventDefault();
  };

  componentDidMount(){
    this.inputRef.current.focus();
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {
          ({theme, toggleTheme}) => {
            return (
              <Jumbotron
                className="page"
                style={{ background: theme.background }}
              >
                <form onSubmit={this.handleSubmit}>
                  <fieldset>
                    <legend className="header" style={{ color: theme.text, fontSize: 40 }}>
                      Name Form
                    </legend>

                    <label style={{ fontWeight: "500", color: theme.text}}>
                      Name:
                      <input
                        style={{ marginLeft: "5px" }}
                        type="text"
                        height="100"
                        value={this.state.name}
                        onChange={this.handleNameChange}
                        ref={this.inputRef}
                      />
                    </label>
                    <input
                      className="btn btn-primary"
                      type="submit"
                      value="Submit"
                      style={{ marginLeft: "10px" }}
                    />
                  </fieldset>
                </form>
              </Jumbotron>
            );
          }
        }
      </ThemeContext.Consumer>
    );
  }
}
export default NameForm;
