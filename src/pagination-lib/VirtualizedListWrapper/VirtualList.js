import React, { Component } from 'react';
import { List, InfiniteLoader, AutoSizer } from 'react-virtualized';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { buildUniqueKey } from './../utils';
import styled from 'styled-components';

const AutoSizerContainer = styled.div`
    flex: 1 1 auto;
`;

const VirtualListWithoutOutline = styled(List)`
    outline: none;
`;

const mapStateToProps = (state, props) => {
    const totalElements = props.paginator.selectors.getTotalElements(state);
    const notZeroRowCount = totalElements > 0 ? totalElements : 1;
    return {
        paginationParams: props.paginator.selectors.getPaginationParams(state),
        searchParams: props.paginator.selectors.getSearchParams(state),
        notZeroRowCount
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return bindActionCreators({
        updatePaginationParams: props.paginator.updatePaginationParams,
        requestPage: props.paginator.requestPage
    }, dispatch);
}

class VirtualList extends Component {

    constructor(props) {
        super(props);
        this.isRowLoaded = this.isRowLoaded.bind(this);
        this.noRowsRenderer = this.noRowsRenderer.bind(this);
        this.loadMoreRows = this.loadMoreRows.bind(this);
        this.rowRenderer = this.rowRenderer.bind(this);
        this.onRowClick = this.onRowClick.bind(this);
        this.state = { scrollToIndex: 0 }
        this.prevSearchParamsKey = buildUniqueKey(props.searchParams);
    }

    loadMoreRows({ startIndex, stopIndex }) {
        //nop
    }

    isRowLoaded({ index }) {
        return false;
    }

    noRowsRenderer() {
        return (<div>no rows</div>);
    }

    onRowClick(index) {
        this.props.updatePaginationParams({ selectedIndex: index, force: false });
    }

    rowRenderer({ index, key, style }) {
        const pageNum = this.props.paginator.convertTotalItemIndexToPageNum(index);
        this.props.requestPage(pageNum);
        return (
            <div key={key} style={style} onClick={() => { this.onRowClick(index) }}>
                {this.props.rowRenderer(index)}
            </div>);
    }

    componentWillReceiveProps(nextProps) {
        const { selectedIndex, force } = nextProps.paginationParams;
        if (force) {
            this.setState({ scrollToIndex: selectedIndex });
        }

        const searchParamsKey = buildUniqueKey(nextProps.searchParams);
        if (searchParamsKey !== this.prevSearchParamsKey) {
            this.props.updatePaginationParams({ selectedIndex: null, force: true });
            this.prevSearchParamsKey = searchParamsKey;
        }
    }

    componentWillMount() {
        this.setState({ scrollToIndex: this.props.paginationParams.selectedIndex });
    }

    render() {
        const scrollToIndexZeroBased = this.state.scrollToIndex;
        return (
            <AutoSizerContainer>
                <AutoSizer>
                    {({ width, height }) => (
                        <InfiniteLoader
                            key={buildUniqueKey(this.props.searchParams)}
                            isRowLoaded={this.isRowLoaded}
                            loadMoreRows={this.loadMoreRows}
                            rowCount={this.props.notZeroRowCount}>
                            {({ onRowsRendered, registerChild }) => {
                                return (
                                    <VirtualListWithoutOutline
                                        ref={registerChild}
                                        height={height}
                                        width={width}
                                        onRowsRendered={onRowsRendered}
                                        rowCount={this.props.notZeroRowCount}
                                        rowRenderer={this.rowRenderer}
                                        noRowsRenderer={this.noRowsRenderer}
                                        rowHeight={this.props.rowHeight}
                                        scrollToIndex={scrollToIndexZeroBased}
                                        scrollToAlignment="center"
                                    />);
                            }
                            }
                        </InfiniteLoader>
                    )}
                </AutoSizer>
            </AutoSizerContainer>
        );
    }
}

VirtualList.propTypes = {
    rowRenderer: PropTypes.func.isRequired,
    rowHeight: PropTypes.number.isRequired,
    paginator: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(VirtualList);
