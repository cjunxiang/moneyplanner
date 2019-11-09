import React from 'react';
import styled from 'styled-components';
import Dashboard from './Dashboard';
import TopBar from './TopBar';
import LeftBar from './LeftBar';
import UserDropDown from './UserDropDown';
import AddNewExpenditurePopUp from './AddNewExpenditurePopUp.js';
import moment from 'moment';
const request = require('request');

const MainPageContainer = styled.div`
  font-family: comfortaa, serif;
`;

const StyledLeftBar = styled(LeftBar)`
  display: ${({ isleftbaropen }) =>
    isleftbaropen ? 'block' : 'none'} !important;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 200;
`;

const DropDownGroup = styled.div`
  width: 19vw;
  min-width: 185px;
`;

const StyledDashboard = styled(Dashboard)`
  padding-top: 5%;
  position: absolute;
  top: 50px;
`;
const StyledTopBar = styled(TopBar)`
  z-index: 199;
  position: absolute;
  width: 19vw;
  min-width: 185px;
`;

const StyledUserDropDown = styled(UserDropDown)`
  z-index: 199;
`;

const ShadeOver = styled.div`
  z-index: 200;
  width: 200%;
  height: 200%;
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
      userId: 1,
      wallets: {},
      currency: 'SGD$',
      activeWallet: {
        _id: '5dc67ed35da4c53108974dd3',
        WalletName: 'Wallet New',
        UserId: 1,
        TargetSum: 999,
        Currency: 'CNY',
        Active: true,
        __v: 0
      },
      userIcon: '',
      isDropDown: false,
      isAddItem: false,
      isLeftBarOpen: false
    };
  }

  componentDidMount = () => {
    //this.getUserId();
    this.fetchAllWallets();
    document.addEventListener('mousedown', this.handleClick);
  };

  componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.handleClick);
  };

  handleClick = e => {
    if (!this.node.contains(e.target) && this.state.isDropDown === true) {
      this.handleUserDropDown();
    }
  };

  fetchAllWallets = async () => {
    const { userId } = this.state;
    let urlToPost =
      'http://localhost:4000/api/wallet/fetchAllWalletByUserId/' + userId;
    request.post(urlToPost, {}, (error, res, body) => {
      if (error) {
        console.log(`Error ${error}`);
      }
      let dataObject = JSON.parse(res.body);
      this.setState({
        wallets: dataObject
      });
    });
  };

  parseDateIntoString = date => {
    return moment(date).format('Do MMM dddd h:mm a');
  };
  parseSumWithComma = number => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  handleUserDropDown = () => {
    const { isDropDown } = this.state;
    this.setState({
      isDropDown: !isDropDown
    });
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

  handleChangeActiveWallet = newWallet => {
    if (newWallet !== this.state.activeWallet) {
      this.setState({
        activeWallet: newWallet,
        currency: newWallet.Currency
      });
    }
  };

  render() {
    const {
      userName,
      isDropDown,
      isAddItem,
      isLeftBarOpen,
      wallets,
      activeWallet,
      userId
    } = this.state;
    return (
      <MainPageContainer id='mpc'>
        <DropDownGroup id='ddg' ref={node => (this.node = node)}>
          <StyledTopBar
            id='topbar'
            userName={userName}
            isDropDown={isDropDown}
            handleUserDropDown={this.handleUserDropDown}
            handleDrawerOpen={this.handleDrawerOpen}
          />
          <StyledUserDropDown
            handleUserDropDown={this.handleUserDropDown}
            isDropDown={isDropDown}
          />
        </DropDownGroup>
        <StyledLeftBar
          wallets={wallets}
          isLeftBarOpen={isLeftBarOpen}
          handleDrawerOpen={this.handleDrawerOpen}
          handleChangeActiveWallet={this.handleChangeActiveWallet}
          userId={userId}
          fetchAllWallets={this.fetchAllWallets}
        />
        <StyledDashboard
          handleAddNewItem={this.handleAddNewItem}
          activeWallet={activeWallet}
        />
        {isAddItem && (
          <div>
            <AddNewExpenditurePopUp
              activeWallet={activeWallet}
              handleAddNewItem={this.handleAddNewItem}
            />
            <ShadeOver onClick={this.handleAddNewItem} />
          </div>
        )}
      </MainPageContainer>
    );
  }
}
