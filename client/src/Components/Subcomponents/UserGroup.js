import React from 'react';
import styled from 'styled-components';
import { Label } from 'semantic-ui-react';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const Container = styled.div`
  position: relative;
  float: left;
  padding-left: 3%;
  top: 30%;
`;

export default class UserGroup extends React.Component {
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
        <IconButton onClick={this.handleDrawerOpen}>
          <MenuIcon />
        </IconButton>
        <Label onClick={handleUserDropDown} as='a' image>
          <img
            src='https://react.semantic-ui.com/images/avatar/small/joe.jpg'
            alt='Profile'
          />
          {userName}
        </Label>
      </Container>
    );
  }
}
