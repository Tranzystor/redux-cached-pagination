import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import reduxThunk from 'redux-thunk';
import { examinationsPaginatorReducers, examinationsStoreName } from './Demo/VirtualListPaged/paginationConfig';
import { examsPaginatorReducers, examsStoreName } from './Demo/StandardPagination/standardPaginationConfig';
import { paginationUpdateReducers, paginationUpdateStoreName } from './Demo/StandardPaginationUpdateEntity/paginationWithUpdateConfig';
import { globalExaminationsReducer } from './Demo/StandardPaginationUpdateEntity/store/updateElement';

const rootReducer = combineReducers({
    [examinationsStoreName]: examinationsPaginatorReducers,
    [examsStoreName]: examsPaginatorReducers,
    [paginationUpdateStoreName]: paginationUpdateReducers,
    globalEntities: globalExaminationsReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(reduxThunk)
    )
);