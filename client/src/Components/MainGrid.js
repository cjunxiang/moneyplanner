import React from 'react';
import styled from 'styled-components';
import { forwardRef } from 'react';
import MaterialTable from 'material-table';
import { DateRangePicker } from 'react-date-range';
import Fab from '@material-ui/core/Fab';
import AddBox from '@material-ui/icons/AddBox';
import AddIcon from '@material-ui/icons/Add';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const Container = styled.div`
  float: right;
  padding: 5%;
`;
const DateRangeContainer = styled.div`
  position: fixed;
  right: 3%;
  background: #f2711c;
  border-radius: 10px;
  padding: 0.8%;
`;
const MainSumText = styled.h1`
  font-family: Georgia, serif;
  font-size: 80px;
  font-weight: 400;
`;

const BottomFloatingButton = styled.div`
  position: absolute;
  bottom: 3%;
  right: 3%;
`;

export default class MainGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectionRange: {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
      },
      columns: [
        { title: 'Type', field: 'type' },
        { title: 'Expenditure', field: 'expenditure' },
        { title: 'Amount', field: 'amount', type: 'numeric' },
        { title: 'Date', field: 'date' },
        { title: 'Remarks', field: 'remarks' }
      ],
      data: [
        {
          type: 'Food',
          expenditure: 'Bak Kut Teh',
          amount: 5.0,
          date: '18-Sep-2019',
          remarks: '-'
        },
        {
          type: 'Transport',
          expenditure: 'MRT ',
          amount: 1.72,
          date: '17-Sep-2019',
          remarks: 'Top up at Clementi MRT'
        }
      ]
    };
  }

  componentDidMount = () => {};

  handleSelectNewDateRange = ranges => {
    // console.log(ranges.selection.startDate);
    // console.log(ranges.selection.endDate);
    this.setState({
      selectionRange: {
        startDate: ranges.selection.startDate,
        endDate: ranges.selection.endDate
      }
    });
  };

  handleConfirmSelectDates = () => {
    const { updateStartEndDates } = this.props;
    const { selectionRange } = this.state;
    this.handleSelectDateRange();
    updateStartEndDates(selectionRange.startDate, selectionRange.endDate);
    let displayString =
      selectionRange.startDate.toString().substring(0, 15) +
      ' - ' +
      selectionRange.endDate.toString().substring(0, 15);
    this.setState({
      displayString: displayString
    });
  };

  handleSelectDateRange = () => {
    this.setState({
      isSelectDate: !this.state.isSelectDate
    });
  };

  render() {
    const {
      columns,
      data,
      selectionRange,
      isSelectDate,
      displayString
    } = this.state;
    const { totalSum, currency, handleAddNewItem } = this.props;

    return (
      <Container>
        {!isSelectDate && (
          <div>
            Total Balance
            <MainSumText>
              {currency}
              {totalSum}
            </MainSumText>
            <MaterialTable
              title={displayString}
              columns={columns}
              data={data}
              editable={{
                onRowAdd: newData => {},
                onRowUpdate: (newData, oldData) => {},
                onRowDelete: () => {}
              }}
              icons={tableIcons}
            />
            <button onClick={this.handleSelectDateRange}>
              Select Date Range
            </button>
            <BottomFloatingButton>
              <Fab onClick={handleAddNewItem} size='medium' color='default'>
                <AddIcon />
              </Fab>
            </BottomFloatingButton>
          </div>
        )}

        {isSelectDate && (
          <div>
            <h1>Select Date Range</h1>
            <DateRangeContainer>
              <DateRangePicker
                ranges={[selectionRange]}
                onChange={this.handleSelectNewDateRange}
              />
              <br />
              <button onClick={this.handleConfirmSelectDates}>confirm</button>
            </DateRangeContainer>
          </div>
        )}
      </Container>
    );
  }
}
