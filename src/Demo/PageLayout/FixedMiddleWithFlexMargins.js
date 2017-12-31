import React, { Component } from 'react';
import styled from 'styled-components';

//Trzy kolumny
//środkowa ma ustaloną szerokość
//lewa i prawa dopasowuje się do pozostałego wolnego miejsca

const Wrapper = styled.div`
  display: flex;
  height: 100%;

  & > :nth-child(1) {
    flex: 1 1 auto;
  }

  & > :nth-child(2) {
    flex: 0 0 800px;
  }

  & > :nth-child(3) {
    flex: 1 1 auto;
  }
`;

class FixedMiddleWithFlexMargins extends Component {
  render() {
    return (
      <Wrapper>
        <div />
        {this.props.children}
        <div />
      </Wrapper>
    );
  }
}

export default FixedMiddleWithFlexMargins;
