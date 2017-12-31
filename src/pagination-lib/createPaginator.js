import { buildFetchingApiActionNames, buildStoreName, convertTotalItemIndexToPageNum } from './utils';
import { loadPage, updatePaginationParams, updateSearchParams, setCurrentPage } from './paginationActions';
import { paginate, entities, paginationParams, searchParamsReducer } from './paginationReducer'
import { getTotalElements, getPage, getPaginationParams, getSearchParams, getCurrentPage, getElementByTotalIndex } from './selectors';
import { combineReducers } from 'redux';
import { currentPageReducer } from './paginationReducer';

export const createPaginator = (actionName, callApi, config, searchParamsInitState) => {
    const actionTypes = buildFetchingApiActionNames(actionName);
    const validatedConfig = validateConfig(config);
    const storeName = buildStoreName(actionName);

    return {
        selectors: {
            getTotalElements: getTotalElements(storeName),
            getPage: getPage(storeName),
            getPageNormalized: getPage(storeName, true),
            getPaginationParams: getPaginationParams(storeName),
            getSearchParams: getSearchParams(storeName),
            getCurrentPage: getCurrentPage(storeName),
            getElementByTotalIndex: getElementByTotalIndex(storeName, validatedConfig.elementsPerPage)
        },
        reducers: combineReducers({
            pagination: paginate(actionTypes),
            entities: entities(actionTypes),
            paginationParams: paginationParams(actionTypes.updatePaginationParams, actionTypes.removeCache),
            searchParams: searchParamsReducer(actionTypes.updateSearchParams, searchParamsInitState || {}),
            currentPage: currentPageReducer(actionTypes.setCurrentPageNumber)
        }),
        storeName,
        requestPage: loadPage(actionTypes, storeName, callApi, validatedConfig),
        updatePaginationParams: updatePaginationParams(actionTypes.updatePaginationParams),
        updateSearchParams: updateSearchParams(actionTypes.updateSearchParams),
        setCurrentPage: setCurrentPage(actionTypes.setCurrentPageNumber),
        convertTotalItemIndexToPageNum: convertTotalItemIndexToPageNum(validatedConfig.elementsPerPage)
    }
}

const validateConfig = (config) => {
    const newConfig = {
        refreshResultInBackground: true,
        timeToRefresh: 5000,
        searchHistoryLength: 5,
        elementsPerPage: 30,
        ...config
    }
    return newConfig;
}