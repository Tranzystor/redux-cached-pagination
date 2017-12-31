import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSearchParams, updateSearchParams } from './standardPaginationConfig';
import AutosizeInput from 'react-input-autosize';

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateSearchParams
    },
    dispatch
  );
};

const mapStateToProps = (state, props) => {
  return {
    searchPhrase: getSearchParams(state).searchPhrase
  };
};

class SearchForm extends Component {
  inputChanged(event) {
    this.props.onSearchPhraseChanged(event.target.value);
    this.props.updateSearchParams({ searchPhrase: event.target.value });
  }

  render() {
    return (
      <AutosizeInput
        placeholder="type search phrase"
        placeholderIsMinWidth
        inputStyle={{ border: '1px solid #999', borderRadius: 3, padding: 3, fontSize: 14 }}
        value={this.props.searchPhrase}
        onChange={this.inputChanged.bind(this)}
      />
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
