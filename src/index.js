import React, { Component } from "react";
import ReactDOM from "react-dom";
import { TimeProvider, TimeConsumer } from "./TimeContext";

import "./styles.css";

const FirstChild = () => (
  <div>
    <TimeConsumer>{({ now }) => `${now}`}</TimeConsumer>
  </div>
);

const SecondChild = () => (
  <div>
    <TimeConsumer>{({ time }) => `${time}`}</TimeConsumer>
  </div>
);

class ContextDemo extends Component {
  render() {
    return (
      <div>
        <h2>Using Context</h2>
        <FirstChild />
        <SecondChild />
        <TimeConsumer>
          {({ togglePause, paused, laps }) => (
            <button onClick={togglePause}>{paused ? `start` : `pause`}</button>
          )}
        </TimeConsumer>
        <div>
          <TimeConsumer>
            {({ laps }) =>
              laps.map((item, key) => {
                console.log(item);
                return <div>{`${item}`}</div>;
              })
            }
          </TimeConsumer>
        </div>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <TimeProvider>
        <ContextDemo />
      </TimeProvider>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
