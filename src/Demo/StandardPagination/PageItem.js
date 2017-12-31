import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getPage, loadExaminationsPage, getCurrentPage } from './standardPaginationConfig';
import ElementCard from './ElementCard';

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      loadExaminationsPage
    },
    dispatch
  );
};

const mapStateToProps = (state, props) => {
  const chosenPage = getCurrentPage(state).pageNumber;
  const page = getPage(state, chosenPage);
  return {
    chosenPage,
    page
  };
};

class PageItem extends Component {
  componentWillMount() {
    this.props.loadExaminationsPage(1);
  }

  componentWillReceiveProps(nextProps) {
    this.props.loadExaminationsPage(nextProps.chosenPage);
  }

  render() {
    const page = this.props.page;
    if (!page) {
      return <div>no data</div>;
    }
    if (page.isFetching) {
      return <div>Loading ...</div>;
    }

    if (page.isSuccess || page.isRefreshing) {
      if (page.elements.length === 0) {
        return <div>elements not found</div>;
      }

      const content = page.elements.map((x, i) => {
        return <ElementCard key={i} {...x} />;
      });
      return (
        <div>
          {page.isRefreshing && <div>refreshing ...</div>}
          {content}
        </div>
      );
    }

    if (page.isFailed) {
      return <div>isFailed</div>;
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageItem);
