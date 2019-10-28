import React from 'react';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';

const CloseButtonContainer = styled.div`
  position: relative;
`;

const CloseButtonSpan = styled(CloseIcon)`
  position: absolute;
  opacity: 0.3;
  cursor: pointer;
  right: 0;
  &:before{
	content: "\d7";
  }
  &:hover {
    opacity: 1;
    color: #FFCCCB 
    transform: rotate(90deg);
    transition: transform 0.5s, opacity 0.5s;
  }
`;

export default class CloseButton extends React.Component {
  render() {
    return (
      <CloseButtonContainer>
        <CloseButtonSpan />
        <p></p>
      </CloseButtonContainer>
    );
  }
}
