import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import styled from 'styled-components';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';

const drawerWidth = 50;

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
      walletsArray: []
    };
  }

  componentDidMount = () => {
    this.updateWalletArray();
  };

  componentDidUpdate = prevProps => {
    const { wallets: oldwallets } = prevProps;
    const { wallets: newwallets } = this.props;
    oldwallets !== newwallets && this.updateWalletArray();
  };

  updateWalletArray = () => {
    const { wallets } = this.props;
    const walletsArray = Object.keys(wallets).map(i => {
      return wallets[i];
    });
    this.setState({
      walletsArray: walletsArray
    });
  };

  render() {
    const { isLeftBarOpen, handleDrawerOpen } = this.props;
    const { classes, walletsArray } = this.state;

    const populatedWallets = walletsArray.map((wallet, index) => {
      return (
        <ListItem button key={wallet._id}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={wallet.WalletName} />
        </ListItem>
      );
    });

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
        <List>{populatedWallets}</List>
        <Divider />
      </Drawer>
    );
  }
}
