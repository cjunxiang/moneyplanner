import React from 'react';
import styled from 'styled-components';
import UserGroup from './Subcomponents/UserGroup';
import DateGroup from './Subcomponents/DateGroup';
const Container = styled.div`
  height: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const TopBarLeft = styled.div``;
const TopBarRight = styled.div``;

export default class TopBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {};

  render() {
    const { dateToday, userName, handleUserDropDown } = this.props;
    return (
      <Container>
        <TopBarLeft>
          <UserGroup
            handleUserDropDown={handleUserDropDown}
            userName={userName}
          />
        </TopBarLeft>
        <TopBarRight>
          <DateGroup dateToday={dateToday} />
        </TopBarRight>
      </Container>
    );
  }
}
