import React from 'react';
import styled from 'styled-components';
import { BounceLoader } from 'react-spinners';

const StyledBounceLoader = styled(BounceLoader)`
  size: 25;
  margin: 2px;
`;

export default class Loading extends React.Component {
  render() {
    return <StyledBounceLoader color={'#4495EE'} />;
  }
}
