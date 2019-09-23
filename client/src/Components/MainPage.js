import React from 'react';
import styled from 'styled-components';
import Dashboard from './Dashboard';
import TopBar from './TopBar';
import LeftBar from './LeftBar';
import UserDropDown from './UserDropDown';
import AddNewExpenditurePopUp from './AddNewExpenditurePopUp.js';
import moment from 'moment';
import addDays from 'date-fns/addDays';

const MainPageContainer = styled.div`
  font-family: comfortaa, serif;
`;
const StyledLeftBar = styled(LeftBar)`
  position: fixed;
  left: 0;
  top: 0;
  z-index: 200;
`;
const StyledDashboard = styled(Dashboard)`
  padding-top: 5%;
  position: absolute;
  top: 50px;
`;
const StyledTopBar = styled(TopBar)`
  height: 50px;
  z-index: 198;
  position: absolute;
`;

const StyledUserDropDown = styled(UserDropDown)`
  z-index: 199;
`;

const ShadeOver = styled.div`
  z-index: 200;
  width: 100%;
  height: 100%;
  top: 0;
  background: #123456;
  position: absolute;
  opacity: 0.5;
  transition-timing-function: ease-in-out;
  transition-duration: 2s;
`;

export default class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: 'C.Junxiang',
      userIcon: '',
      isDropDown: false,
      isAddItem: false,
      isLeftBarOpen: false,
      startDate: new Date(),
      endDate: addDays(new Date(), -7)
    };
  }

  componentDidMount = () => {};

  parseDateIntoString = date => {
    return moment(date).format('Do MMM dddd h:mm a');
  };
  parseSumWithComma = number => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  updateStartEndDates = (startDate, endDate) => {
    this.setState({
      startDate: startDate,
      endDate: endDate
    });
    console.log(startDate);
  };

  handleUserDropDown = () => {
    const { isDropDown } = this.state;
    this.setState({
      isDropDown: !isDropDown
    });
    console.log(isDropDown);
  };

  handleAddNewItem = () => {
    const { isAddItem } = this.state;
    this.setState({
      isAddItem: !isAddItem
    });
  };

  handleDrawerOpen = () => {
    this.setState({
      isLeftBarOpen: !this.state.isLeftBarOpen
    });
  };

  render() {
    const { userName, isDropDown, isAddItem, isLeftBarOpen } = this.state;
    return (
      <MainPageContainer>
        <StyledTopBar
          userName={userName}
          handleUserDropDown={this.handleUserDropDown}
          handleDrawerOpen={this.handleDrawerOpen}
        />
        {isDropDown && (
          <StyledUserDropDown handleUserDropDown={this.handleUserDropDown} />
        )}
        {isLeftBarOpen && (
          <StyledLeftBar
            isLeftBarOpen={isLeftBarOpen}
            handleDrawerOpen={this.handleDrawerOpen}
          />
        )}
        <StyledDashboard
          handleAddNewItem={this.handleAddNewItem}
          updateStartEndDates={this.updateStartEndDates}
        />
        {isAddItem && (
          <div>
            <AddNewExpenditurePopUp handleAddNewItem={this.handleAddNewItem} />
            <ShadeOver onClick={this.handleAddNewItem} />
          </div>
        )}
      </MainPageContainer>
    );
  }
}
