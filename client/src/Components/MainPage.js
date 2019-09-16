import React from 'react';
import styled from 'styled-components';
import MainGrid from './MainGrid';
import TopBar from './TopBar';

const MainPageContainer = styled.div`
  font-family: comfortaa;
`;

const StyledMainGrid = styled(MainGrid)`
  padding-top: 5%;
`;
const StyledTopBar = styled(TopBar)`
  height: 50px;
  z-index: 199;
  position: relative;
`;

export default class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateToday: new Date(),
      userName: 'C.Junxiang',
      userIcon: ''
    };
  }

  componentDidMount = () => {
    console.log(
      'Ooo.. Look who is here. If you are looking for something... then: Main Page loaded!'
    );
  };

  render() {
    const { dateToday, userName } = this.state;
    return (
      <MainPageContainer>
        <StyledTopBar dateToday={dateToday} userName={userName} />
        <StyledMainGrid />
      </MainPageContainer>
    );
  }
}
