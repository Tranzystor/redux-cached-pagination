import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class AppMainContainer extends Component {
    render() {
        return (
            <ul>
                <li><Link to={`/standard`}>Standard List Demo</Link></li>
                <li><Link to={`/virtualPaged`}>Virtual list</Link></li>
                <li><Link to={`/paginationWithEntityUpdate`}>Standard list with element update</Link></li>
            </ul>
        );
    }
}

export default connect(null, null)(AppMainContainer)
