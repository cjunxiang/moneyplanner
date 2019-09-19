import React from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const Container = styled.div`
  z-index: 201;
  position: absolute;
  top: 20%;
  left: 25%;
  width: 50%;
`;

export default class AddNewExpenditurePopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = () => {};

  render() {
    const { handleAddNewItem } = this.props;
    return (
      <Container>
        <Card>
          <CardContent>
            <Typography color='textSecondary' gutterBottom>
              Word of the Day
            </Typography>
            <Typography variant='h5' component='h2'>
              be • nev • o • lent
            </Typography>
            <Typography color='textSecondary'>adjective</Typography>
            <Typography variant='body2' component='p'>
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={handleAddNewItem} size='small'>
              Learn More
            </Button>
          </CardActions>
        </Card>
      </Container>
    );
  }
}
