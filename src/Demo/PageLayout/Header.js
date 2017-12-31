import React, { Component } from 'react';
import styled from 'styled-components';
import FixedMiddleWithFlexMargins from './FixedMiddleWithFlexMargins';

const HeaderStyle = styled.div`
  height: 100%;
  background: #015f82;
`;

const CenterVertically = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderLabel = styled.div`
  font-size: 24px;
  color: white;
`;

class Header extends Component {
  render() {
    return (
      <HeaderStyle>
        <FixedMiddleWithFlexMargins>
          <CenterVertically>
            <HeaderLabel>DEMO redux-cached-pagination</HeaderLabel>
            <iframe
              src="https://ghbtns.com/github-btn.html?user=tranzystor&repo=redux-cached-pagination&type=star&size=large"
              frameBorder="0"
              scrolling="0"
              width="75px"
              height="30px"
              title="github-star"
            />
          </CenterVertically>
        </FixedMiddleWithFlexMargins>
      </HeaderStyle>
    );
  }
}

export default Header;
