import React from "react";
import styled from "styled-components";
// const request = require("request");

const DataVizContainer = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
  z-index: 500;
  color: #123456;
  background-color: #123456;
  width: 93vw;
  height: 87vh;
  border-radius: 5px;
`;

export default class DataViz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {} = this.state;
    return <DataVizContainer>hello bb</DataVizContainer>;
  }
}
