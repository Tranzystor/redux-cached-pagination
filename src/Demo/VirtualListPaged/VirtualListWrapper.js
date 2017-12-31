import React, { Component } from 'react';
import VirtualList from './../../pagination-lib/VirtualizedListWrapper/VirtualList';
import { examinationsPaginator } from './paginationConfig';
import SimpleRowWithoutPage from './SimpleRowWithoutPage';

const ROW_HEIGHT = 35;

class VirtualListWrapper extends Component {
    constructor(props) {
        super(props);
        this.rowRenderer = this.rowRenderer.bind(this);
    }

    rowRenderer(index) {
        return (
            <SimpleRowWithoutPage index={index} />
        );
    }

    render() {
        return (
            <VirtualList
                rowRenderer={this.rowRenderer}
                rowHeight={ROW_HEIGHT}
                paginator={examinationsPaginator}
            />
        );
    }
}
export default VirtualListWrapper;