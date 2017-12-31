import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
  getPaginationParams,
  getElementByTotalIndex,
} from './paginationConfig';

const SimpleRowStyled = styled.div`
  height: 30px;
  background: ${props => (props.isSelected ? 'rgb(238,243,242)' : 'white')};
  &:hover {
    background: rgb(221, 231, 229);
  }
`;

const mapStateToProps = (state, props) => {
  const rowContent = getElementByTotalIndex(state, props.index);
  return {
    selectedIndex: getPaginationParams(state).selectedIndex,
    rowContent
  };
};

class SimpleRowWithoutPage extends Component {

  render() {
    if (!this.props.rowContent) {
      return <div>no data available</div>;
    }

    const content = this.props.rowContent;
    if (content.isFetching) {
      return <div>isFetching ...</div>;
    }
    if (content.isFailed) {
      return <div>isFailed</div>;
    }
    if (content.isSuccess || content.isRefreshing) {
      if (!content.id) {
        return <div>no elements found</div>;
      }

      const isSelected = this.props.selectedIndex === this.props.index;
      return (
        <SimpleRowStyled isSelected={isSelected}>
          SimpleRow: {content.id} dataa: {content.examData} {content.isRefreshing && ' refreshing'}
        </SimpleRowStyled>
      );
    }
  }
}

export default connect(mapStateToProps, null)(SimpleRowWithoutPage);
