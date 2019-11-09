import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import currencyList from './Reusable/Constant.js';
import InputLabel from '@material-ui/core/InputLabel';
import CloseButton from './Reusable/CloseButton';

const drawerWidth = 50;
const request = require('request');

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

const ListItemContainer = styled.div`
  width: 28vw;
  min-width: 206px;
  width: 100%;
  opacity: 0.7;
  &:hover {
    opacity: 1;
    font-weight: 600;
    transform: scale(1.05, 1.05);
    transition: transform 0.1, opacity 0.2s;
  }
`;

const StyledIconButton = styled(IconButton)`
  position: absolute;
  opacity: 0.6;
  &:hover {
    opacity: 1;
    transform: rotate(360deg);
    transition: transform 0.5s, opacity 0.5s;
  }
`;

const StyledListItemIcon = styled(ListItemIcon)`
  flex-direction: row-reverse;
`;

const StyledDeleteIcon = styled(DeleteForeverRoundedIcon)`
  opacity: 0.4;
  &:hover {
    opacity: 1;
    transform: scale(1.01, 1.01);
    transition: transform 0.1, opacity 0.2s;
  }
`;

const StyledEditIcon = styled(EditOutlinedIcon)`
  opacity: 0.4;
  &:hover {
    opacity: 1;
    transform: scale(1.01, 1.01);
    transition: transform 0.1, opacity 0.2s;
  }
`;

export default class LeftBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: useStyles,
      theme: useTheme,
      walletsArray: [],
      currencyArray: [],
      isCreateNewWallet: false,
      isSelectCurrency: false,
      isDeleteWalletArray: [],
      newWalletName: '',
      newWalletCurrency: '',
      newWalletTargetSum: 0,
      newWalletTotalSum: 0
    };
  }

  componentDidMount = () => {
    this.updateWalletArray();
    this.updateCurrencyArray();
  };

  componentDidUpdate = prevProps => {
    const { wallets: oldwallets } = prevProps;
    const { wallets: newwallets } = this.props;
    oldwallets !== newwallets && this.updateWalletArray();
  };

  updateWalletArray = () => {
    const { wallets } = this.props;
    const walletsArray = Object.keys(wallets).map(index => {
      return wallets[index];
    });
    this.setState({
      walletsArray: walletsArray
    });
  };
  updateCurrencyArray = () => {
    Object.keys(currencyList).forEach(index => {
      this.setState({
        currencyArray: currencyList[index]
      });
    });
  };
  handleIsCreateNewWallet = () => {
    this.setState({
      isCreateNewWallet: !this.state.isCreateNewWallet
    });
  };

  handleListItemClick = (event, wallet) => {
    this.props.handleChangeActiveWallet(wallet);
  };

  handleCreateNewWallet = () => {
    const { userId } = this.props;
    const {
      newWalletName,
      newWalletCurrency,
      newWalletTargetSum,
      newWalletTotalSum
    } = this.state;
    request.post(
      'http://localhost:4000/api/wallet/addNewWalletToDatabase',
      {
        json: {
          WalletName: newWalletName,
          UserId: userId,
          TargetSum: newWalletTargetSum,
          Currency: newWalletCurrency,
          Active: true
        }
      },
      (error, res, body) => {
        if (error) {
          console.log(`Error ${error}`);
        } else {
          console.log(res.body.wallet._id);
          request.post(
            'http://localhost:4000/api/event/addNewEventToDatabase',
            {
              json: {
                WalletId: res.body.wallet._id,
                Type: 'Wallet Created',
                Name: 'First Event',
                Date: new Date(),
                Remarks: '',
                Price: newWalletTotalSum
              }
            },
            (error, res, body) => {
              if (error) {
                console.log(`Error ${error}`);
              }
            }
          );
          this.props.fetchAllWallets();
        }
      }
    );
  };

  handleIsSelectCurrency = () => {
    this.setState({
      isSelectCurrency: !this.state.isSelectCurrency
    });
  };

  handleSelectCurrency = e => {
    this.setState({
      newWalletCurrency: e.target.value
    });
  };

  handleNewCurrentSum = e => {
    this.setState({
      newWalletTotalSum: e.target.value
    });
  };

  handleNewName = e => {
    this.setState({
      newWalletName: e.target.value
    });
  };

  handleNewTargetSum = e => {
    this.setState({
      newWalletTargetSum: e.target.value
    });
  };
  handleIsDeleteWallet = (event, index) => {
    let { isDeleteWalletArray } = this.state;
    isDeleteWalletArray[index] = !isDeleteWalletArray[index];
    this.setState({
      isDeleteWalletArray: isDeleteWalletArray
    });
  };

  handleDeleteWallet = (wallet, index) => {
    console.log('deleting');
    let urlToPost =
      'http://localhost:4000/api/wallet/deleteWalletByWalletId/' + wallet._id;
    request.post(urlToPost, {}, (error, res, body) => {
      if (error) {
        console.log(`Error ${error}`);
      } else {
        console.log(`deleted Successfully`);
        this.handleIsDeleteWallet(0, index);
        this.props.fetchAllWallets();
      }
    });
  };

  render() {
    const { isLeftBarOpen, handleDrawerOpen } = this.props;
    const {
      classes,
      walletsArray,
      currencyArray,
      isCreateNewWallet,
      isSelectCurrency,
      newWalletCurrency,
      isDeleteWalletArray
    } = this.state;

    return (
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='left'
        open={isLeftBarOpen}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <StyledIconButton onClick={handleDrawerOpen}>
            <ChevronLeftIcon />
          </StyledIconButton>
        </div>
        <Divider />
        <List>
          {walletsArray.map((wallet, index) => {
            return (
              <ListItemContainer>
                {!isDeleteWalletArray[index] && (
                  <ListItem button key={wallet._id}>
                    <ListItemIcon
                      onClick={event => this.handleListItemClick(event, wallet)}
                    >
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText
                      onClick={event => this.handleListItemClick(event, wallet)}
                      primary={wallet.WalletName}
                    />
                    <StyledListItemIcon>
                      <StyledEditIcon
                        onClick={event =>
                          this.handleIsDeleteWallet(event, index)
                        }
                      />
                      <StyledDeleteIcon
                        onClick={event =>
                          this.handleIsDeleteWallet(event, index)
                        }
                      />
                    </StyledListItemIcon>
                  </ListItem>
                  //onClick={ event => this.handleIsDeleteWallet(event, index)}
                )}
                {isDeleteWalletArray[index] && (
                  <div>
                    <Button
                      onClick={event => this.handleDeleteWallet(wallet, index)}
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={event => this.handleIsDeleteWallet(event, index)}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </ListItemContainer>
            );
          })}
        </List>
        <Divider />
        {!isCreateNewWallet && (
          <Button variant='outlined' onClick={this.handleIsCreateNewWallet}>
            New Wallet
          </Button>
        )}
        {isCreateNewWallet && (
          <div>
            <Paper>
              <CloseButton onClick={this.handleIsCreateNewWallet} />
              <React.Fragment>
                <TextField
                  type='Wallet Name?'
                  variant='outlined'
                  margin='dense'
                  required
                  fullWidth
                  label='wallet name'
                  onChange={this.handleNewName}
                />
                <TextField
                  type='Current Sum?'
                  variant='outlined'
                  margin='dense'
                  required
                  fullWidth
                  label='current sum'
                  onChange={this.handleNewCurrentSum}
                />
                <TextField
                  type='Target Sum?'
                  variant='outlined'
                  margin='dense'
                  required
                  fullWidth
                  label='target sum'
                  onChange={this.handleNewTargetSum}
                  // helperText={!isMatch && 'Password does not match'}
                  // error={!isMatch}
                />
                <InputLabel shrink>Currency</InputLabel>
                <Select
                  open={isSelectCurrency}
                  onClose={this.handleIsSelectCurrency}
                  onOpen={this.handleIsSelectCurrency}
                  value={newWalletCurrency}
                  onChange={this.handleSelectCurrency}
                  autoWidth
                >
                  {currencyArray.map(currency => (
                    <MenuItem value={currency}>{currency}</MenuItem>
                  ))}
                </Select>
                <Button
                  type='submit'
                  variant='contained'
                  onClick={this.handleCreateNewWallet}
                >
                  Create Wallet
                </Button>
                <Button
                  variant='contained'
                  onClick={this.handleIsCreateNewWallet}
                >
                  Cancel
                </Button>
              </React.Fragment>
            </Paper>
          </div>
        )}
      </Drawer>
    );
  }
}
