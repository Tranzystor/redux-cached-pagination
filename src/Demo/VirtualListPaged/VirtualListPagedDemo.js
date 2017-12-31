import React, { Component } from 'react';
import SearchForm from './SearchForm';
import VirtualListWrapper from './VirtualListWrapper';
import styled from 'styled-components';

const DemoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  & > *:nth-of-type(1) {
    margin-bottom: 10px;
  }
`;

class VirtualListPagedDemo extends Component {
  render() {
    return (
      <DemoContainer>
        <SearchForm />
        <VirtualListWrapper />
      </DemoContainer>
    );
  }
}

export default VirtualListPagedDemo;
