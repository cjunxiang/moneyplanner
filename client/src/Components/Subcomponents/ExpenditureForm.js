import React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

const Container = styled.div``;

export default class ExpenditureForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleNameChange = event => {
    const { handleNameChange } = this.props;
    handleNameChange(event.target.value);
  };
  handleTypeChange = event => {
    const { handleTypeChange } = this.props;
    handleTypeChange(event.target.value);
  };
  handleAmountChange = event => {
    const { handleAmountChange } = this.props;
    handleAmountChange(event.target.value);
  };
  handleDateChange = event => {
    const { handleDateChange } = this.props;
    handleDateChange(event.target.value);
  };
  handleRemarksChange = event => {
    const { handleRemarksChange } = this.props;
    handleRemarksChange(event.target.value);
  };
  componentDidMount = () => {};
  render() {
    const { type, name, amount, date, remarks } = this.props;
    return (
      <Container>
        <TextField
          value={type}
          defaultValue='foo'
          label='Type'
          onChange={this.handleTypeChange}
          margin='dense'
          variant='outlined'
        />
        <br />
        <TextField
          value={name}
          defaultValue='foo'
          label='Name'
          onChange={this.handleNameChange}
          margin='dense'
          variant='outlined'
        />
        <br />
        <TextField
          value={amount}
          defaultValue='foo'
          label='Amount'
          onChange={this.handleAmountChange}
          margin='dense'
          variant='outlined'
        />
        <br />
        <TextField
          value={date}
          defaultValue='foo'
          label='Date'
          onChange={this.handleDateChange}
          margin='dense'
          variant='outlined'
        />
        <br />
        <TextField
          value={remarks}
          defaultValue='foo'
          label='Remarks'
          onChange={this.handleRemarksChange}
          margin='dense'
          variant='outlined'
          multiline
          rowsMax='4'
        />
      </Container>
    );
  }
}
