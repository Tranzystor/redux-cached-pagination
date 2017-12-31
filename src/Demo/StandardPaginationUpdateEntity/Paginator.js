import React, { Component } from 'react';
import Pagination from 'react-js-pagination';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import { getTotalElements, ELEMENTS_PER_PAGE, setCurrentPage, getCurrentPage } from './paginationWithUpdateConfig';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state, props) => {
    const totalItemsCount = getTotalElements(state);
    const activePage = getCurrentPage(state).pageNumber;
    return {
        totalItemsCount,
        activePage,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        setCurrentPage
    }, dispatch);
}

class Paginator extends Component {

    constructor(props) {
        super(props);
        this.onChosenPageChanged = this.onChosenPageChanged.bind(this);
    }

    onChosenPageChanged(page) {
        this.props.setCurrentPage(page);
    }


    render() {
        const { totalItemsCount } = this.props;
        return (
            <Pagination
                activePage={this.props.activePage}
                itemsCountPerPage={ELEMENTS_PER_PAGE}
                totalItemsCount={totalItemsCount}
                pageRangeDisplayed={5}
                onChange={this.onChosenPageChanged}
            />
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Paginator)