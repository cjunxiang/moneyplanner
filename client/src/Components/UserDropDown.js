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
//#eceaea
const StyledList = styled(List)`
  background: #f9f9f9;
`;
export default class UserDropDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openSetup: false
    };
  }

  componentDidMount = () => {};

  handleSetupClick = () => {
    this.setState({
      openSetup: !this.state.openSetup
    });
  };

  render() {
    const { openSetup } = this.state;
    const {} = this.props;
    return (
      <Container>
        <StyledList component='nav'>
          <ListItem button onClick={this.handleSetupClick}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary='Set-up' />
            {openSetup ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openSetup} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItem button>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary='Set initial Sum' />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary='Set target' />
              </ListItem>
            </List>
          </Collapse>
          <ListItem button>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary='Go to Telegram Bot (Under Dev)' />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary='View Analytics (Under Dev)' />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary='Change Password' />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary='Log-out' />
          </ListItem>
        </StyledList>
      </Container>
    );
  }
}
