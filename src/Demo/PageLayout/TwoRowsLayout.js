import styled from 'styled-components';

const TwoRowsLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #f7f7f7;

  & > :nth-child(1) {
    height: 60px;
    flex: 0 0 auto;
  }

  & > :nth-child(2) {
    flex: 1 1 100%;
  }
`;

export default TwoRowsLayout;
