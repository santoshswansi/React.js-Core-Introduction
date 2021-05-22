import React from "react";

import Jumbotron from "react-bootstrap/Jumbotron";
import ListGroup from "react-bootstrap/ListGroup";

// Local Imports
import { ThemeContext } from "./index";

const Joke = require("awesome-dev-jokes");

var jokes = [];
var idCounter = 0;

for (let i = 0; i < 3; ++i) {
  jokes.push(Joke.getRandomJoke());
}

function JokeItem(props) {
  let joke = props.joke;
  return <ListGroup.Item> {joke} </ListGroup.Item>;
}

class Jokes extends React.Component {
  constructor(props) {
    super(props);

    this.state = { jokes: props.jokes };
  }

  render() {
    const jokes = this.state.jokes;
    return (
      <ThemeContext.Consumer>
        {
          ({theme, toggleTheme}) => {
            return (
              <Jumbotron className="page" style={{background: theme.background}}>
                <h1 className="header" style={{color: theme.text}}>Dev Jokes</h1>
                <ListGroup>
                  {jokes.map((joke) => (
                    <JokeItem key={idCounter++} joke={joke} />
                  ))}
                </ListGroup>
              </Jumbotron>
            );
          }
        }
      </ThemeContext.Consumer>
    );
  }
}

export { Jokes, jokes };
