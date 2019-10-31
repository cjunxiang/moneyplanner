import React from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IncomeForm from './Subcomponents/IncomeForm';
import ExpenditureForm from './Subcomponents/ExpenditureForm';
import CloseButton from './Reusable/CloseButton';

const Container = styled.div`
  z-index: 201;
  position: absolute;
  top: 20%;
  left: 25%;
  width: 50%;
`;
const StyledCloseButton = styled(CloseButton)`
  right: 0;
`;
const CloseButtonContainer = styled.div`
  padding: 2px;
`;

export default class AddNewExpenditurePopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMoneyIn: false,
      type: '',
      name: '',
      amount: '',
      date: '',
      remarks: ''
    };
  }

  componentDidMount = () => {};

  handleMoneyInSwitch = name => event => {
    this.setState({
      isMoneyIn: event.target.checked
    });
  };

  handleAddNewItem = () => {
    const { handleAddNewItem } = this.props;
    handleAddNewItem();
  };

  handleTypeChange = newInput => {
    this.setState({
      type: newInput
    });
  };
  handleNameChange = newInput => {
    this.setState({
      name: newInput
    });
  };
  handleAmountChange = newInput => {
    this.setState({
      amount: newInput
    });
  };
  handleDateChange = newInput => {
    this.setState({
      date: newInput
    });
  };
  handleRemarksChange = newInput => {
    this.setState({
      remarks: newInput
    });
  };

  handleSubmitExpenditure = () => {
    const { type, name, amount, date, remarks } = this.state;
    let newExp = { type, name, amount, date, remarks };
    this.handleAddNewItem();
    //TODO: do call to RESTful API
    return newExp;
  };

  render() {
    const { isMoneyIn, type, name, amount, date, remarks } = this.state;
    return (
      <Container>
        <Card>
          <CloseButtonContainer onClick={this.handleAddNewItem}>
            <StyledCloseButton />
          </CloseButtonContainer>
          <CardContent>
            <Grid item>
              <Grid item>
                <FormControlLabel
                  control={
                    <Switch
                      checked={isMoneyIn}
                      onChange={this.handleMoneyInSwitch('isMoneyIn')}
                      value='isMoneyIn'
                    />
                  }
                />
                {isMoneyIn && <Grid item>Huat ah</Grid>}
                {!isMoneyIn && <Grid item>Spending</Grid>}
              </Grid>
            </Grid>
            <Grid component='label' container alignItems='center' spacing={1}>
              <Grid item>
                {!isMoneyIn && (
                  <div>
                    <Typography variant='h5' component='h2'>
                      Add Expenditure
                    </Typography>
                    <Typography color='textSecondary'>
                      Walao, spending again?
                    </Typography>
                  </div>
                )}
                {isMoneyIn && (
                  <div>
                    <Typography variant='h5' component='h2'>
                      Add Income
                    </Typography>
                    <Typography color='textSecondary'>
                      Cai Shen Ye Lai lo!
                    </Typography>
                  </div>
                )}
              </Grid>
            </Grid>
            <br />
            {isMoneyIn && (
              <IncomeForm
                type={type}
                handleTypeChange={this.handleTypeChange}
                name={name}
                handleNameChange={this.handleNameChange}
                amount={amount}
                handleAmountChange={this.handleAmountChange}
                date={date}
                handleDateChange={this.handleDateChange}
                remarks={remarks}
                handleRemarksChange={this.handleRemarksChange}
              />
            )}
            {!isMoneyIn && (
              <ExpenditureForm
                type={type}
                handleTypeChange={this.handleTypeChange}
                name={name}
                handleNameChange={this.handleNameChange}
                amount={amount}
                handleAmountChange={this.handleAmountChange}
                date={date}
                handleDateChange={this.handleDateChange}
                remarks={remarks}
                handleRemarksChange={this.handleRemarksChange}
              />
            )}
          </CardContent>

          <CardActions>
            <Button onClick={this.handleSubmitExpenditure} size='small'>
              Confirm
            </Button>
            <Button onClick={this.handleAddNewItem} size='small'>
              Cancel
            </Button>
          </CardActions>
        </Card>
      </Container>
    );
  }
}
