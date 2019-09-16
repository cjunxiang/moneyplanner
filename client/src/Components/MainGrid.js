import React from 'react';
import styled from 'styled-components';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const Container = styled.div`
  float: right;
  padding: 5%;
`;

const MainSumText = styled.h1`
  font-family: Georgia, serif;
  font-size: 80px;
  font-weight: 400;
`;

export default class MainGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: true,
      dateRange: {
        selection: {
          startDate: new Date(),
          endDate: null,
          key: 'selection'
        }
      }
    };
  }

  componentDidMount = () => {};

  handleRangeChange = (which, payload) => {
    console.log(which, payload);
    this.setState({
      [which]: {
        ...this.state[which],
        ...payload
      }
    });
  };

  render() {
    const { isEdit } = this.state;
    const { totalSum, currency } = this.props;

    return (
      <Container>
        Total Balance
        <MainSumText>
          {currency}
          {totalSum}
        </MainSumText>
        {isEdit && (
          <DateRange
            onChange={this.handleRangeChange.bind(this, 'dateRange')}
            ranges={[this.state.dateRange.selection]}
          />
        )}
      </Container>
    );
  }
}
