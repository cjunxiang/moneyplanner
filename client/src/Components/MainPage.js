import React from 'react';
import styled from 'styled-components';
import MainGrid from './MainGrid';
import TopBar from './TopBar';
import moment from 'moment';
import addDays from 'date-fns/addDays';

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
      dateToday: this.parseDateIntoString(new Date()),
      userName: 'C.Junxiang',
      userIcon: '',
      currency: 'SGD$',
      totalSum: '9,872',
      startDate: new Date(),
      endDate: addDays(new Date(), -7)
    };
  }

  componentDidMount = () => {};

  parseDateIntoString = date => {
    return moment(date).format('Do MMM dddd h:mm:ss a');
  };
  parseSumWithComma = number => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  updateStartEndDates = (startDate, endDate) => {
    this.setState({
      startDate: startDate,
      endDate: endDate
    });
  };

  render() {
    const { dateToday, userName, currency, totalSum } = this.state;
    return (
      <MainPageContainer>
        <StyledTopBar dateToday={dateToday} userName={userName} />
        <StyledMainGrid totalSum={totalSum} currency={currency} update />
      </MainPageContainer>
    );
  }
}
