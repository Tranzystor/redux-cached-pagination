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

export const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(reduxThunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);