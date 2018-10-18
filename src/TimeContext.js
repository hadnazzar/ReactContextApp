import React, { Component, createContext } from "react";

const TimeContext = createContext();

export class TimeProvider extends Component {
  state = {
    now: new Date(),
    time:
      new Date().getHours() +
      ":" +
      new Date().getMinutes() +
      ":" +
      new Date().getSeconds(),
    paused: false,
    laps: []
  };

  componentDidMount() {
    setInterval(() => {
      var local = new Date();
      var localdatetime =
        local.getHours() + ":" + local.getMinutes() + ":" + local.getSeconds();
      if (!this.state.paused) {
        this.setState({ now: local, time: localdatetime });
      }
    }, 1000);
  }

  togglePause = () => {
    this.setState(prevState => ({
      paused: !prevState.paused,
      laps: [...prevState.laps, new Date()]
    }));
  };
  render() {
    const { now, time, paused, laps } = this.state;
    const { children } = this.props;
    const { togglePause } = this;
    return (
      <TimeContext.Provider value={{ now, time, togglePause, paused, laps }}>
        {children}
      </TimeContext.Provider>
    );
  }
}
export class TimeConsumer extends Component {
  render() {
    const { children } = this.props;
    return <TimeContext.Consumer>{x => children(x)}</TimeContext.Consumer>;
  }
}
