import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateEntities } from './store/updateElement';
import styled from 'styled-components';

const StyledCard = styled.div`
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 1px;
  padding: 10px;
`;

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      updateEntities
    },
    dispatch
  );
};

class ElementCard extends Component {
  constructor(props) {
    super(props);
    this.onUpdate = this.onUpdate.bind(this);
  }

  onUpdate() {
    console.log('update: ' + this.props.id);
    this.props.updateEntities(this.props.id, 'abc');
  }

  render() {
    return (
      <StyledCard>
        ElementCard id: {this.props.id} examData: {this.props.examData} <button onClick={this.onUpdate}>Update</button>
        {this.props.isUpdating && ' isUpdating'}
        {this.props.isUpdatingSuccess && ' success'}
        {this.props.isUpdatingFailure && ' failed'}
      </StyledCard>
    );
  }
}

export default connect(null, mapDispatchToProps)(ElementCard);
