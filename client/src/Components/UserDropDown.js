import React from 'react';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';

const Container = styled.div`
  z-index: 199;
  position: absolute;
  top: 6%;
  padding-left: 3%;
  padding-right: 3%;
  width: 20%;
`;

export default class UserDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  componentDidMount = () => {};

  handleClick = () => {
    this.setState({
      open: !this.state.open
    });
  };

  render() {
    const { open } = this.state;
    const {} = this.props;
    return (
      <Container>
        <List component='nav'>
          <ListItem button>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary='Sent mail' />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary='Drafts' />
          </ListItem>
          <ListItem button onClick={this.handleClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary='Inbox' />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItem button>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary='Starred' />
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Container>
    );
  }
}
