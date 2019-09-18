import React from 'react';
import styled from 'styled-components';
import { Label } from 'semantic-ui-react';

const Container = styled.div`
  position: relative;
  float: left;
  padding-left: 3%;
  top: 30%;
`;

export default class UserGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {};

  render() {
    const { userName, handleUserDropDown } = this.props;
    return (
      <Container>
        <Label onClick={handleUserDropDown} as='a' image>
          <img
            src='https://react.semantic-ui.com/images/avatar/small/joe.jpg'
            alt='Profile'
          />
          {userName}
        </Label>
      </Container>
    );
  }
}
