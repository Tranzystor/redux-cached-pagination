import React, { Component } from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 1px;
  padding: 10px;
`;

class ElementCard extends Component {
  render() {
    return (
      <StyledCard>
        id: {this.props.id} data: {this.props.examData}
      </StyledCard>
    );
  }
}

export default ElementCard;
