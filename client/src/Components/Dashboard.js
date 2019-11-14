import React from "react";
import styled from "styled-components";
import { forwardRef } from "react";
import MaterialTable from "material-table";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { DateRangePicker } from "react-date-range";
// import enGb from 'react-date-range/dist/locale/en-GB';
import { addDays } from "date-fns";

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
} from "@material-ui/icons";
import Loading from "./Reusable/Loading";
import CloseButton from "./Reusable/CloseButton";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
const request = require("request");

const StyledCloseButton = styled(CloseButton)`
  right: 0;
`;

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
    opacity: 0.9;
    font-weight: 600;
    transform: scale(1.01, 1.01);
    transition: transform 0.1s, opacity 1s;
  }
`;

const StyledVisibilityOffIcon = styled(VisibilityOff)`
  width: 50px !important;
  height: 50px !important;
  opacity: 0.3;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
    transition: opacity 0.1s linear;
  }
`;

const StyledVisibilityIcon = styled(Visibility)`
  width: 50px !important;
  height: 50px !important;
  opacity: 0.3;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
    transition: opacity 0.1s linear;
  }
`;

const ShadeOver = styled.div`
  z-index: 200;
  width: 200%;
  height: 200%;
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
      dateRangePicker: {
        selection: {
          endDate: new Date(),
          startDate: addDays(new Date(), -7),
          key: "selection"
        }
      },
      totalSum: 0,
      totalSpent: 0,
      netIn: 0,
      netOut: 0,
      goalSum: 0,
      isShowSum: true,
      isShowTable: false,
      isFetchingData: true,
      focusedRange: [0, 0],
      data: [],
      columns: [
        { title: "Type", field: "Type" },
        { title: "Expenditure", field: "Name" },
        { title: "Amount", field: "Price", type: "numeric" },
        { title: "Date", field: "Date" },
        { title: "Remarks", field: "Remarks" }
      ]
    };
  }

  componentDidMount = () => {
    this.setState({
      isFetchingData: false
    });
    // this.fetchAllData();
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.activeWallet !== this.props.activeWallet) {
      this.getEventsDetails();
    }
  };

  fetchAllData = async () => {
    this.getWalletDetails();
    this.getEventsDetails();
  };

  getWalletDetails = () => {
    const { activeWallet } = this.props;
    let urlToPost =
      "http://localhost:4000/api/wallet/fetchWalletByWalletId/" +
      activeWallet._id;
    request.post(urlToPost, {}, (error, res, body) => {
      if (error) {
        console.log(`Error ${error}`);
      }
      let dataObject = JSON.parse(res.body);
      this.setState({
        goalSum: dataObject.TargetSum
      });
    });
  };

  getEventsDetails = async () => {
    const { activeWallet } = this.props;
    const { dateRangePicker } = this.state;
    const startDateDate = new Date(dateRangePicker.selection.startDate);
    const endDateDate = new Date(dateRangePicker.selection.endDate);

    request.post(
      "http://localhost:4000/api/event/fetchAllEventByWalletId/" +
        activeWallet._id,
      {},
      (error, res, body) => {
        if (error) {
          console.log(`Error ${error}`);
        }
        let dataObject = JSON.parse(res.body);
        let totalSum = 0;
        let totalSpent = 0;
        let netIn = 0;
        let netOut = 0;
        dataObject.forEach(data => {
          totalSum = totalSum + data.Price;
          let dataObjectDate = new Date(data.Date);
          if (dataObjectDate < endDateDate && dataObjectDate > startDateDate) {
            totalSpent = totalSpent + data.Price;
            if (data.Price > 0) {
              netIn = netIn + data.Price;
            } else {
              netOut = netOut + data.Price;
            }
          }
        });
        this.setState({
          data: dataObject,
          totalSum: totalSum,
          totalSpent: totalSpent,
          isFetchingData: false,
          netIn: netIn,
          netOut: netOut
        });
      }
    );
  };

  parseDateToString = date => {
    const currentDate = new Date(date);
    return currentDate
      .toLocaleDateString("en-SG", {
        month: "short",
        day: "numeric",
        year: "2-digit"
      })
      .split(" ")
      .join(" ");
  };

  handleConfirmSelectDates = async (which, payload) => {
    await this.setState({
      isFetchingData: true,
      [which]: {
        ...this.state[which],
        ...payload
      }
    });
    this.getEventsDetails();
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
      "http://localhost:4000/api/event/addNewEventToDatabase",
      {
        json: {
          ...newData,
          WalletId: this.props.activeWallet.WalletId,
          Price: parseInt(newData.Price)
        }
      },
      (error, res, body) => {
        if (error) {
          console.log(`Error ${error}`);
        }
        this.getEventsDetails();
      }
    );
  };

  handleTableUpdate = async (newData, oldData) => {
    let IdToBeUpdated = oldData._id;
    let urlToPost =
      "http://localhost:4000/api/event/editEventByEventId/" + IdToBeUpdated;
    request.post(
      urlToPost,
      {
        json: {
          ...newData,
          WalletId: this.props.activeWallet.WalletId,
          Price: parseInt(newData.Price)
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
    let urlToPost =
      "http://localhost:4000/api/event/deleteEventByEventId/" + oldDataId;
    request.post(urlToPost, {}, (error, res, body) => {
      if (error) {
        console.log(`Error ${error}`);
      }
      console.log("deleted Successfully");
      this.getEventsDetails();
    });
  };

  toInt = sum => {
    return sum.replace(/,/g, "");
  };

  getSumDifference = () => {
    const { goalSum, totalSum } = this.state;
    let diff = goalSum - totalSum;
    if (diff >= 0) {
      return "+" + diff;
    } else {
      return "-" + diff;
    }
  };

  render() {
    const {
      columns,
      data,
      isSelectDate,
      isShowTable,
      totalSum,
      isShowSum,
      totalSpent,
      isFetchingData,
      focusedRange,
      netIn,
      netOut
    } = this.state;
    const { handleAddNewItem, activeWallet } = this.props;

    return (
      <Container>
        {isFetchingData && <StyledLoadingCircle />}
        {!isFetchingData && (
          <div>
            <MainDetailsContainer>
              Net Spending
              {isShowSum && (
                <div>
                  <MainSumText>
                    <Tooltip
                      isShowTable={isShowTable}
                      title="Show/Hide Details"
                    >
                      <p onClick={this.handleIsShowTable}>
                        {activeWallet.Currency}
                        {totalSpent}
                      </p>
                    </Tooltip>
                  </MainSumText>
                  <br />
                  Income: {netIn}
                  <br />
                  Spent: {netOut}
                  <br />
                  Total Sum In Wallet: {totalSum}
                  <br />
                  {this.parseDateToString(
                    this.state.dateRangePicker.selection.startDate
                  )}{" "}
                  -{" "}
                  {this.parseDateToString(
                    this.state.dateRangePicker.selection.endDate
                  )}
                  <br />
                  <Button
                    variant="contained"
                    size="small"
                    onClick={this.handleSelectDateRange}
                  >
                    Select Date
                  </Button>
                  <br />
                  Goal is: {this.getSumDifference()}
                  <br />
                  <Tooltip title="Hide what hide, alot of money meh?">
                    <StyledVisibilityIcon onClick={this.handleIsShowSum} />
                  </Tooltip>
                </div>
              )}
              {!isShowSum && (
                <div>
                  <MainSumText>
                    <p onClick={this.handleIsShowTable}>
                      {activeWallet.Currency} &nbsp;***
                    </p>
                  </MainSumText>
                  <StyledVisibilityOffIcon onClick={this.handleIsShowSum} />
                </div>
              )}
              <Tooltip title="Spend again ah?">
                <BottomFloatingButton>
                  <Fab onClick={handleAddNewItem} size="medium" color="default">
                    <Add />
                  </Fab>
                </BottomFloatingButton>
              </Tooltip>
            </MainDetailsContainer>
            {isShowTable && (
              <TableContainer>
                <MaterialTable
                  title="Waliu... can eat so many plate of chicken rice sia"
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
              </TableContainer>
            )}
            {isSelectDate && (
              <div>
                <ShadeOver onClick={this.handleSelectDateRange} />
                <DateRangeContainer>
                  <div onClick={this.handleSelectDateRange}>
                    <StyledCloseButton />
                  </div>
                  <strong>Select Date Range</strong>

                  <br />
                  <DateRangePicker
                    onChange={this.handleConfirmSelectDates.bind(
                      this,
                      "dateRangePicker"
                    )}
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    months={1}
                    ranges={[this.state.dateRangePicker.selection]}
                    maxDate={new Date()}
                    focusedRange={focusedRange}
                    onRangeFocusChange={focusedRange => {
                      const [, rangeStep] = focusedRange;
                      if (!rangeStep) {
                        this.handleSelectDateRange();
                      }
                      this.setState({ focusedRange });
                    }}
                  />
                  <br />
                </DateRangeContainer>
              </div>
            )}
          </div>
        )}
      </Container>
    );
  }
}
