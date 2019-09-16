import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  float: right;
  padding-right: 3%;
  top: 30%;
`;

export default class DateGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {};

  render() {
    const { dateToday } = this.props;
    return (
      <Container>
        <p>{dateToday.toString()}</p>
      </Container>
    );
  }
}
