import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
`;

export default class AddNewExpenditurePopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {};

  render() {
    const {} = this.props;
    return (
      <Container>
        <p>hellobitches</p>
      </Container>
    );
  }
}
