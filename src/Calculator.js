import React, {useContext} from "react";

// bootstrap
import Jumbotron from "react-bootstrap/Jumbotron";

// local import(s)
import {ThemeContext} from './index';
import ErrorBoundary from "./ErrorBoundary";


const scaleNames = {
  c: "Celsius",
  f: "Fahrenheit",
};

// It is going to get the  input from the  user
// And using method provided by the component which is
// the 'source of truth' of state we will make the
// multiple inputs in sync with each other
class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    // onTemperatureChange() { provided by the
    // calling component } will be called to handle
    // the input change  passing it the changed value
    this.props.onTemperatureChange(e.target.value);
  }

  componentDidMount(){
    if(this.props.scale === 'c')
      this.inputRef.current.focus();
  }

  render() {
    // object destructuring
    const temperature = this.props.temperature;
    const scale = this.props.scale;

    const dynamicAttrOfInput = {};

    if(scale === 'c')
      dynamicAttrOfInput['ref'] = this.inputRef;

    return (

      <ThemeContext.Consumer>
        {({ theme, toggleTheme }) => {
          return (
            <div className="form-group">
              <label htmlFor="inputTemperature" style={{ color: theme.text }}>
                Enter temperature in {scaleNames[scale]}
              </label>

              <input
                className="form-control"
                id="inputTemperature"
                placeholder="Temperature in specified scale"
                value={temperature}
                onChange={this.handleChange}
                {...dynamicAttrOfInput}
              />
            </div>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

// temperature converter functions
const toFahrenheit = (celsius) => {
  return (celsius * 9) / 5 + 32;
};

const toCelsius = (fahrenheit) => {
  return (fahrenheit - 32) * (5 / 9);
};

const tryConvert = (temperature, convert) => {
  // when input is empty
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return "";
  }

  const output = convert(input);

  // round upto three decimal places
  const rounded = Math.round(output * 1000) / 1000;

  // convert it to string to display it to the user
  return rounded.toString();
};

// To display water boils at the given temperature or not
function BoilingVerdict(props) {
  // Note we can render object
  const celsius = props.celsius;

  // React Hooks
  const context = useContext(ThemeContext);

    if (celsius >= 100) {
      return <p style={{color: context.theme.text}}>Water boils at {celsius}</p>;
    } else {
      return <p style={{color: context.theme.text}}>Water does not boil at {celsius}</p>;
    }
}


class Calculator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      temperature: "",
      scale: "c",
    };
    this.onCelsiusChange = this.onCelsiusChange.bind(this);
    this.onFahrenheitChange = this.onFahrenheitChange.bind(this);
  }

  onCelsiusChange(temperature) {
    this.setState({
      temperature,
      scale: "c",
    });
  }

  onFahrenheitChange(temperature) {
    this.setState({
      temperature,
      scale: "f",
    });
  }


  render() {
    // Changed temperature and corresponding scale
    // is noted here (If change in input)
    let temperature = this.state.temperature;
    let scale = this.state.scale;

    // Get the temperatures in both scales
    let celsius =
      scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
    let fahrenheit =
      scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature;

    return (

      <ThemeContext.Consumer>
       {
          ({theme, toggleTheme}) => {
            return (
              <Jumbotron
                className="page"
                style={{ background: theme.background }}
              >
                <h1 className="header" style={{ color: theme.text }}>
                  Boiling Temperature
                </h1>
                <form>
                  <ErrorBoundary>
                    <TemperatureInput
                      temperature={celsius}
                      scale="c"
                      onTemperatureChange={this.onCelsiusChange}
                    />
                  </ErrorBoundary>

                  <ErrorBoundary>
                    <TemperatureInput
                      temperature={fahrenheit}
                      scale="f"
                      onTemperatureChange={this.onFahrenheitChange}
                    />
                  </ErrorBoundary>

                  {/* Whether water boils or not  */}
                  {Number.isNaN(parseFloat(celsius)) === false && (
                    <BoilingVerdict celsius={parseFloat(celsius)} />
                  )}
                </form>
              </Jumbotron>
            ); 
          }
       }
      
      </ThemeContext.Consumer>
    );
  }
}

export default Calculator;
