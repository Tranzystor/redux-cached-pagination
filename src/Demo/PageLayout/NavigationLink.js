import React, { Component } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const activeLinkClassName = 'activeLinkClassName';
const StyledLink = styled(NavLink)`
  padding: 3px 0px;
  display: block;

  &:visited {
    color: #0a202d;
  }

  &:hover {
    color: black;
  }

  &:link {
    text-decoration: none;
  }

  &.${activeLinkClassName} > div {
    color: #2673a0;
  }
`;

class NavigationLink extends Component {
  render() {
    return (
      <StyledLink to={this.props.to} activeClassName={activeLinkClassName}>
        <div>{this.props.children}</div>
      </StyledLink>
    );
  }
}

export default NavigationLink;
