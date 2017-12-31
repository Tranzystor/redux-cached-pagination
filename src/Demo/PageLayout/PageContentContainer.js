import React, { Component } from 'react';
import styled from 'styled-components';
import { Route } from 'react-router-dom';

import AppMainContainer from '../../AppMainContainer';
import StandardPaginationDemo from '../StandardPagination/StandardPaginationDemo';
import PaginationWithUpdateDemo from '../StandardPaginationUpdateEntity/PaginationWithUpdateDemo';
import VirtualListPagedDemo from '../VirtualListPaged/VirtualListPagedDemo';

const ContentStyle = styled.div`
  display: flex;
  width: 640px;
  background: white;
  overflow: auto;

  margin-bottom: 20px;
  padding: 40px;
  padding-top: 10px;
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 1px;
`;

class PageContentContainer extends Component {
  render() {
    return (
      <ContentStyle>
        <Route exact path="/" component={AppMainContainer} />
        <Route path="/standard" component={StandardPaginationDemo} />
        <Route path="/paginationWithEntityUpdate" component={PaginationWithUpdateDemo} />
        <Route path="/virtualPaged" component={VirtualListPagedDemo} />
      </ContentStyle>
    );
  }
}

export default PageContentContainer;
