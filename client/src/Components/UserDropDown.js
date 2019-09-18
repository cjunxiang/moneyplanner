import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  z-index: 199;
  position: absolute;
  top: 6%;
  padding-left: 3%;
`;

export default class UserDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {};

  render() {
    const { handleUserDropDown } = this.props;
    return (
      <Container>
        <div class='ui vertical menu'>
          <a class='item'>Set Target Balance</a>
          <a class='item'>Set Starting Balance</a>
          <div class='ui left pointing dropdown link item'>
            <i class='dropdown icon'></i>
            Messages
            <div class='menu'>
              <div class='item'>Inbox</div>
              <div class='item'>Starred</div>
              <div class='item'>Sent Mail</div>
            </div>
          </div>
          <a onClick={handleUserDropDown} class='item'>
            Share the App
          </a>
          <a class='item'>Change Password</a>
          <a class='item'>Log Out</a>
        </div>
      </Container>
    );
  }
}
