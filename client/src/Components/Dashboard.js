import React from 'react';
import styled from 'styled-components';
import { forwardRef } from 'react';
import MaterialTable from 'material-table';
import { DateRangePicker } from 'react-date-range';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import {
  Add,
  AddBox,
  ArrowUpward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  Remove,
  SaveAlt,
  Search,
  ViewColumn,
  Visibility,
  VisibilityOff
} from '@material-ui/icons';
import SaveIcon from '@material-ui/icons/Save';
import Loading from './Reusable/Loading';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const request = require('request');
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

const StyledLoadingCircle = styled(Loading)`
  position: absolute;
  top: 38%;
  left: 50%;
`;

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

const MainDetailsContainer = styled.div`
  text-align: right;
`;

const TableContainer = styled.div`
  position: relative;
  padding-top: 3vh;
  z-index: 198;
`;

const MainSumText = styled.h1`
  font-family: Georgia, serif;
  font-size: 9vh;
  font-weight: 300;
  cursor: pointer;
  opacity: 0.7;
  &:hover {
    opacity: 1;
    font-weight: 600;
    transform: scale(1.2, 1.2);
    transition: transform 0.15s, opacity 2s;
  }
`;

const StyledVisibilityOffIcon = styled(VisibilityOff)`
  width: 50px !important;
  height: 50px !important;
`;

const StyledVisibilityIcon = styled(Visibility)`
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
  position: fixed;
  cursor: pointer;
  z-index:199
  bottom: 3%;
  right: 3%;
  opacity:0.4;

  &:hover {
    opacity: 1;
    color: #FFCCCB 
    transform: scale(1.2,1.2);
    transition: transform 0.25s, opacity 0.25s;
  }  
`;
export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: 'SGD$',
      totalSum: 0,
      totalSpent: 0,
      goalSum: 0,
      isShowSum: true,
      isShowTable: false,
      isFetchingData: true,
      selectionRange: {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
      },
      data: [],
      columns: [
        { title: 'Type', field: 'Type' },
        { title: 'Expenditure', field: 'Name' },
        { title: 'Amount', field: 'Price', type: 'numeric' },
        { title: 'Date', field: 'Date' },
        { title: 'Remarks', field: 'Remarks' }
      ]
    };
  }

  componentDidMount = () => {
    this.fetchAllData();
  };
  componentDidUpdate = (prevProps, prevState) => {};
  /**
   * Fetch all Data does:
   * Fetch all expenditures based on wallet. (Currently fetch all wallet in DB)
   * Calculate Wallet total remaining $$
   * Calculate Target & Current difference
   */
  fetchAllData = async () => {
    this.getWalletDetails();
    this.getEventsDetails();
    this.setState({
      isFetchingData: false
    });
  };

  getWalletDetails = () => {
    const { activeWalletId } = this.props;
    let urlToPost =
      'http://localhost:4000/api/wallet/fetchWalletByWalletId/' +
      activeWalletId;
    request.post(urlToPost, {}, (error, res, body) => {
      if (error) {
        logger.error(`Error ${error}`);
      }
      let dataObject = JSON.parse(res.body);
      this.setState({
        totalSum: dataObject.TotalSum,
        goalSum: dataObject.TargetSum
      });
    });
  };

  getEventsDetails = () => {
    const { activeWalletId } = this.props;
    let urlToPost =
      'http://localhost:4000/api/event/fetchAllEventByWalletId/' +
      activeWalletId;
    request.post(urlToPost, {}, (error, res, body) => {
      if (error) {
        logger.error(`Error ${error}`);
      }
      let dataObject = JSON.parse(res.body);
      let totalSpent = 0;
      for (const data of dataObject) {
        totalSpent = totalSpent + data.Price;
      }
      this.setState({
        data: dataObject,
        totalSpent: -totalSpent,
        isFetchingData: false
      });
    });
  };

  handleSelectNewDateRange = ranges => {
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

  handleTableAdd = async newData => {
    request.post(
      'http://localhost:4000/api/event/addNewEventToDatabase',
      {
        json: {
          ...newData,
          InflowOrOutFlow: 0,
          WalletId: this.props.activeWalletId,
          Price: parseInt(newData.Price)
        }
      },
      (error, res, body) => {
        if (error) {
          logger.error(`Error ${error}`);
        }

        this.getEventsDetails();
      }
    );
  };

  handleTableUpdate = async (newData, oldData) => {
    let IdToBeUpdated = oldData._id;
    let urlToPost =
      'http://localhost:4000/api/event/editEventByEventId/' + IdToBeUpdated;
    console.log(urlToPost);
    request.post(
      urlToPost,
      {
        json: {
          ...newData,
          WalletId: this.props.activeWalletId,
          Price: parseInt(newData.Price),
          InflowOrOutFlow: 0
        }
      },
      (error, res, body) => {
        if (error) {
          console.log(`Error ${error}`);
        }
        console.log(`Item Updated Successfully: ${newData}`);
        this.getEventsDetails();
      }
    );
  };

  handleTableDelete = async oldDataId => {
    console.log(oldDataId);
    let urlToPost =
      'http://localhost:4000/api/event/deleteEventByEventId/' + oldDataId;
    console.log(urlToPost);
    request.post(urlToPost, {}, (error, res, body) => {
      if (error) {
        console.log(`Error ${error}`);
      }
      console.log('deleted Successfully');
      this.getEventsDetails();
    });
  };

  toInt = sum => {
    return sum.replace(/,/g, '');
  };

  getSumDifference = () => {
    const { goalSum, totalSum } = this.state;
    let diff = goalSum - totalSum;
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
      totalSum,

      goalSum,
      isShowSum,
      totalSpent,
      isFetchingData
    } = this.state;
    const { handleAddNewItem, currency } = this.props;

    return (
      <Container>
        {isFetchingData && <StyledLoadingCircle />}
        {!isFetchingData && (
          <div>
            <MainDetailsContainer>
              Total Spent
              {isShowSum && (
                <div>
                  <StyledVisibilityIcon onClick={this.handleIsShowSum} />
                  <MainSumText>
                    <p onClick={this.handleIsShowTable}>
                      {currency}
                      {totalSpent}
                    </p>
                  </MainSumText>
                  Total Sum In Wallet: {totalSum}
                  <br />
                  Goal is: {goalSum} ({this.getSumDifference()})
                </div>
              )}
              {!isShowSum && (
                <div>
                  <StyledVisibilityOffIcon onClick={this.handleIsShowSum} />
                  <MainSumText>
                    <p onClick={this.handleIsShowTable}>{currency} &nbsp;***</p>
                  </MainSumText>
                  Total Sum In Wallet: {this.state.totalSum}
                  <br />
                  Goal is: {goalSum} ({this.getSumDifference()}){' '}
                </div>
              )}
              <Tooltip title='Spend again ah?'>
                <BottomFloatingButton>
                  <Fab onClick={handleAddNewItem} size='medium' color='default'>
                    <Add />
                  </Fab>
                </BottomFloatingButton>
              </Tooltip>
            </MainDetailsContainer>
            {isShowTable && (
              <TableContainer>
                <MaterialTable
                  title='Waliu... can eat so many plate of chicken rice sia'
                  columns={columns}
                  data={data}
                  editable={{
                    onRowAdd: newData =>
                      new Promise(resolve => {
                        setTimeout(() => {
                          resolve();
                          this.setState(prevState => {
                            const data = [...prevState.data];
                            data.push(newData);
                            return { ...prevState, data };
                          });
                          this.handleTableAdd(newData);
                        }, 600);
                      }),
                    onRowUpdate: (newData, oldData) =>
                      new Promise(resolve => {
                        setTimeout(() => {
                          resolve();
                          if (oldData) {
                            this.setState(prevState => {
                              const data = [...prevState.data];
                              data[data.indexOf(oldData)] = newData;
                              return { ...prevState, data };
                            });
                          }
                          this.handleTableUpdate(newData, oldData);
                        }, 600);
                      }),
                    onRowDelete: oldData =>
                      new Promise(resolve => {
                        setTimeout(() => {
                          resolve();
                          this.setState(prevState => {
                            const data = [...prevState.data];
                            data.splice(data.indexOf(oldData), 1);
                            return { ...prevState, data };
                          });
                          this.handleTableDelete(oldData._id);
                        }, 600);
                      })
                  }}
                  icons={tableIcons}
                />
                <Button
                  variant='contained'
                  color='primary'
                  size='small'
                  startIcon={<AddBox />}
                  onClick={this.handleSelectDateRange}
                >
                  Select Date
                </Button>
              </TableContainer>
            )}
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
                  <Button
                    variant='contained'
                    color='primary'
                    size='small'
                    startIcon={<AddBox />}
                    onClick={this.handleConfirmSelectDates}
                  >
                    confirm
                  </Button>
                </DateRangeContainer>
              </div>
            )}
          </div>
        )}
      </Container>
    );
  }
}
