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
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

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
  z-index: 201;
  position: fixed;
  right: 3%;
  top: 20%;
  background: #f9f9f9;
  border-radius: 10px;
  padding: 0.8%;
`;
const MainSumText = styled.h1`
  font-family: Georgia, serif;
  font-size: 80px;
  font-weight: 400;
  cursor: pointer;
`;

const StyledVisibilityOffIcon = styled(VisibilityOffIcon)`
  width: 50px !important;
  height: 50px !important;
`;

const StyledVisibilityIcon = styled(VisibilityIcon)`
  width: 50px !important;
  height: 50px !important;
`;

const ShadeOver = styled.div`
  z-index: 200;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: #123456;
  position: absolute;
  opacity: 0.5;
  transition-timing-function: ease-in-out;
  transition-duration: 2s;
`;

const BottomFloatingButton = styled.div`
  position: absolute;
  bottom: 3%;
  right: 3%;
`;

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: 'SGD$',
      totalSum: '98,720',
      goalSum: '100,000',
      isShowSum: true,
      isShowTable: false,
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
  handleIsShowTable = () => {
    this.setState({
      isShowTable: !this.state.isShowTable
    });
  };
  handleSelectDateRange = () => {
    this.setState({
      isSelectDate: !this.state.isSelectDate
    });
  };
  handleIsShowSum = () => {
    this.setState({
      isShowSum: !this.state.isShowSum
    });
  };

  toInt = sum => {
    return sum.replace(/,/g, '');
  };

  getSumDifference = () => {
    const { goalSum, totalSum } = this.state;
    let diff = this.toInt(goalSum) - this.toInt(totalSum);
    if (diff >= 0) {
      return '+' + diff;
    } else {
      return '-' + diff;
    }
  };
  render() {
    const {
      columns,
      data,
      selectionRange,
      isSelectDate,
      isShowTable,
      displayString,
      totalSum,
      currency,
      goalSum,
      isShowSum
    } = this.state;
    const { handleAddNewItem } = this.props;

    return (
      <Container>
        <div>
          Total Balance
          {isShowSum && (
            <div>
              <StyledVisibilityIcon onClick={this.handleIsShowSum} />
              <MainSumText>
                <p onClick={this.handleIsShowTable}>
                  {currency}
                  {totalSum}
                </p>
              </MainSumText>
              Goal is: {goalSum} ({this.getSumDifference()}){' '}
            </div>
          )}
          {!isShowSum && (
            <div>
              <StyledVisibilityOffIcon onClick={this.handleIsShowSum} />
              <MainSumText>
                <p onClick={this.handleIsShowTable}>{currency} &nbsp;******</p>
              </MainSumText>
              Goal is: {goalSum} ({this.getSumDifference()}){' '}
            </div>
          )}
          {isShowTable && (
            <div>
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
            </div>
          )}
          <BottomFloatingButton>
            <Fab onClick={handleAddNewItem} size='medium' color='default'>
              <AddIcon />
            </Fab>
          </BottomFloatingButton>
        </div>

        {isSelectDate && (
          <div>
            <ShadeOver onClick={this.handleConfirmSelectDates} />
            <DateRangeContainer>
              <strong>Select Date Range</strong>
              <br />
              <DateRangePicker
                ranges={[selectionRange]}
                onChange={this.handleSelectNewDateRange}
                maxDate={new Date()}
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
