'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createPaginator = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = require('./utils');

var _paginationActions = require('./paginationActions');

var _paginationReducer = require('./paginationReducer');

var _selectors = require('./selectors');

var _redux = require('redux');

var createPaginator = exports.createPaginator = function createPaginator(actionName, callApi, config, searchParamsInitState) {
    var actionTypes = (0, _utils.buildFetchingApiActionNames)(actionName);
    var validatedConfig = validateConfig(config);
    var storeName = (0, _utils.buildStoreName)(actionName);

    return {
        selectors: {
            getTotalElements: (0, _selectors.getTotalElements)(storeName),
            getPage: (0, _selectors.getPage)(storeName),
            getPageNormalized: (0, _selectors.getPage)(storeName, true),
            getPaginationParams: (0, _selectors.getPaginationParams)(storeName),
            getSearchParams: (0, _selectors.getSearchParams)(storeName),
            getCurrentPage: (0, _selectors.getCurrentPage)(storeName),
            getElementByTotalIndex: (0, _selectors.getElementByTotalIndex)(storeName, validatedConfig.elementsPerPage)
        },
        reducers: (0, _redux.combineReducers)({
            pagination: (0, _paginationReducer.paginate)(actionTypes),
            entities: (0, _paginationReducer.entities)(actionTypes),
            paginationParams: (0, _paginationReducer.paginationParams)(actionTypes.updatePaginationParams, actionTypes.removeCache),
            searchParams: (0, _paginationReducer.searchParamsReducer)(actionTypes.updateSearchParams, searchParamsInitState || {}),
            currentPage: (0, _paginationReducer.currentPageReducer)(actionTypes.setCurrentPageNumber)
        }),
        storeName: storeName,
        requestPage: (0, _paginationActions.loadPage)(actionTypes, storeName, callApi, validatedConfig),
        updatePaginationParams: (0, _paginationActions.updatePaginationParams)(actionTypes.updatePaginationParams),
        updateSearchParams: (0, _paginationActions.updateSearchParams)(actionTypes.updateSearchParams),
        setCurrentPage: (0, _paginationActions.setCurrentPage)(actionTypes.setCurrentPageNumber),
        convertTotalItemIndexToPageNum: (0, _utils.convertTotalItemIndexToPageNum)(validatedConfig.elementsPerPage)
    };
};

var validateConfig = function validateConfig(config) {
    var newConfig = _extends({
        refreshResultInBackground: true,
        timeToRefresh: 5000,
        searchHistoryLength: 5,
        elementsPerPage: 30
    }, config);
    return newConfig;
};
//# sourceMappingURL=createPaginator.js.map