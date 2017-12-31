import React, { Component } from 'react';
import styled from 'styled-components';
import Paginator from './Paginator';
import PageItem from './PageItem';
import SearchForm from './SearchForm';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setCurrentPage } from './paginationWithUpdateConfig';

const DemoContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  & > *:nth-child(1) {
    align-self: center;
  }

  & > *:nth-child(2) {
    flex: none;
    margin-bottom: 10px;
  }
`;

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setCurrentPage
    },
    dispatch
  );
};

class PaginationWithUpdateDemo extends Component {
  onSearchPhraseChanged(searchPhrase) {
    this.props.setCurrentPage(1);
  }

  render() {
    return (
      <DemoContainer>
        <Paginator />
        <SearchForm onSearchPhraseChanged={this.onSearchPhraseChanged.bind(this)} />
        <PageItem />
      </DemoContainer>
    );
  }
}

export default connect(null, mapDispatchToProps)(PaginationWithUpdateDemo);
