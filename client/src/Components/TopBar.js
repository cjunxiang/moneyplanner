import React from 'react';
import styled from 'styled-components';
import UserGroup from './Subcomponents/UserGroup';

const Container = styled.div`
  height: 5vh;
  min-height: 43px;
  width: 19vw;
  min-width: 185px;
`;

const TopBarLeft = styled.div``;
const TopBarRight = styled.div``;

export default class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {};
  handleDrawerOpen = () => {
    this.props.handleDrawerOpen();
  };
  render() {
    const { userName, handleUserDropDown } = this.props;
    return (
      <Container>
        <TopBarLeft>
          <UserGroup
            handleDrawerOpen={this.handleDrawerOpen}
            handleUserDropDown={handleUserDropDown}
            userName={userName}
          />
        </TopBarLeft>
        <TopBarRight></TopBarRight>
      </Container>
    );
  }
}
