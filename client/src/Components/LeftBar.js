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
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import currencyList from './Reusable/Constant.js';
import InputLabel from '@material-ui/core/InputLabel';

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

const StyledIconButton = styled(IconButton)`
  position: absolute;
  opacity: 0.6;
  &:hover {
    opacity: 1;
    transform: rotate(360deg);
    transition: transform 0.5s, opacity 0.5s;
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
      isCreateNewWallet: true,
      isSelectCurrency: false,
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
          console.log(res.body);
          console.log(res.body.wallet);
          console.log(res.body.wallet._id);
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

  render() {
    const { isLeftBarOpen, handleDrawerOpen } = this.props;
    const {
      classes,
      walletsArray,
      currencyArray,
      isCreateNewWallet,
      isSelectCurrency,
      newWalletCurrency
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
              <ListItem
                button
                key={wallet._id}
                onClick={event => this.handleListItemClick(event, wallet)}
              >
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={wallet.WalletName} />
              </ListItem>
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
            <p onClick={this.handleIsCreateNewWallet}>X</p>
            <Paper>
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
                  fullWidth
                  variant='contained'
                  color='primary'
                  onClick={this.handleCreateNewWallet}
                >
                  Create Wallet
                </Button>
              </React.Fragment>
            </Paper>
          </div>
        )}
      </Drawer>
    );
  }
}
