import React, { Component } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';
import TwoRowsLayout from './Demo/PageLayout/TwoRowsLayout';
import Header from './Demo/PageLayout/Header';
import FixedMiddleWithFlexMargins from './Demo/PageLayout/FixedMiddleWithFlexMargins';
import PageContentContainer from './Demo/PageLayout/PageContentContainer';
import NavigationLink from './Demo/PageLayout/NavigationLink';

const TwoColumns = styled.div`
  display: flex;
  margin-top: 40px;
`;

const MenuContainer = styled.div`
  width: 160px;
`;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <TwoRowsLayout>
            <Header />
            <FixedMiddleWithFlexMargins>
              <TwoColumns>
                <MenuContainer>
                  <NavigationLink to="/standard">Standard</NavigationLink>
                  <NavigationLink to="/paginationWithEntityUpdate">With entity update</NavigationLink>
                  <NavigationLink to="/virtualPaged">Virtual</NavigationLink>
                </MenuContainer>
                <PageContentContainer />
              </TwoColumns>
            </FixedMiddleWithFlexMargins>
          </TwoRowsLayout>
        </Router>
      </Provider>
    );
  }
}

export default App;
