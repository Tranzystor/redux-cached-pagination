'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.setCurrentPage = exports.updateSearchParams = exports.updatePaginationParams = exports.loadPage = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _utils = require('./utils');

var loadPage = exports.loadPage = function loadPage(actionTypes, storeName, callApi, config) {
    var fetching = actionTypes.fetching,
        success = actionTypes.success,
        failure = actionTypes.failure,
        removeCache = actionTypes.removeCache,
        refreshing = actionTypes.refreshing,
        removeSearchResult = actionTypes.removeSearchResult;
    var searchHistoryLength = config.searchHistoryLength;


    return function (page, searchParams) {
        return function (dispatch, getState) {

            var store = getState()[storeName];
            var entryToRemove = getEntryKeyToRemove(store, searchHistoryLength);
            if (entryToRemove) {
                dispatch({
                    type: removeSearchResult,
                    filtersKey: entryToRemove
                });
            }

            var validSearchParams = getValidSearchParams(searchParams, store);

            var filtersKey = (0, _utils.buildUniqueKey)(validSearchParams);
            var cachedResult = getPage(getState()[storeName], filtersKey, page);
            if (shouldAbandonAction(cachedResult, config)) {
                return Promise.resolve();
            }

            if (!cachedResult) {
                dispatch({
                    type: fetching,
                    filtersKey: filtersKey,
                    page: page
                });
            } else {
                dispatch({
                    type: refreshing,
                    filtersKey: filtersKey,
                    page: page
                });
            }

            return callApi(page, validSearchParams, dispatch, getState).then(function (response) {
                if (!isResponseValid(response)) {
                    dispatch({
                        type: failure,
                        filtersKey: filtersKey,
                        page: page
                    });
                    return Promise.reject('server response is not valid');
                }

                var newTotalCount = response.totalElements;
                var actualTotalCount = undefined;
                if (getState()[storeName].pagination[filtersKey]) {
                    actualTotalCount = getState()[storeName].pagination[filtersKey].elementsCount;
                }

                if (actualTotalCount && actualTotalCount !== newTotalCount) {
                    dispatch({
                        type: removeCache
                    });
                }
                dispatch({
                    type: success,
                    filtersKey: filtersKey,
                    page: page,
                    response: response
                });
            }, function (error) {
                dispatch({
                    type: failure,
                    filtersKey: filtersKey,
                    page: page
                });
                return Promise.reject(error);
            });
        };
    };
};

var getValidSearchParams = function getValidSearchParams(searchParams, store) {
    if (!searchParams) {
        return store.searchParams;
    }
    return searchParams;
};

var getEntryKeyToRemove = function getEntryKeyToRemove(store, searchHistoryLength) {
    var paginationEntries = Object.entries(store.pagination);
    if (paginationEntries.length > searchHistoryLength) {

        var min = paginationEntries.map(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                key = _ref2[0],
                val = _ref2[1];

            return { key: key, time: val.lastUpdateTime };
        }).reduce(function (min, curr) {
            if (!min) {
                return curr;
            }
            if (curr.time < min.time) {
                return curr;
            }
            return min;
        }, null);
        return min.key;
    }
    return null;
};

var shouldAbandonAction = function shouldAbandonAction(cachedResult, config) {
    if (!cachedResult) {
        return false;
    }

    var refreshResultInBackground = config.refreshResultInBackground,
        timeToRefresh = config.timeToRefresh;

    if (cachedResult.isFetching || !refreshResultInBackground) {
        return true;
    }

    if (isTimeToRefresh(cachedResult.lastUpdateTime, timeToRefresh)) {
        return false;
    }
    return true;
};

var isTimeToRefresh = function isTimeToRefresh(prevTime, diff) {
    var result = Date.now() - prevTime > diff;
    return result;
};

var getPage = function getPage(store, filtersKey, page) {
    if (store && store.pagination && store.pagination[filtersKey] && store.pagination[filtersKey].pages) {
        var foundPage = store.pagination[filtersKey].pages[page];
        return foundPage;
    }
    return null;
};

var isResponseValid = function isResponseValid(response) {
    var totalElements = response.totalElements,
        elements = response.elements,
        entities = response.entities;


    if (Number.isInteger(totalElements) && totalElements === 0) {
        return true;
    }

    return totalElements && elements && entities;
};

var updatePaginationParams = exports.updatePaginationParams = function updatePaginationParams(_updatePaginationParams) {
    return function (paramsToStore) {
        return function (dispatch, getState) {
            dispatch({
                type: _updatePaginationParams,
                paginationParams: paramsToStore
            });
        };
    };
};

var updateSearchParams = exports.updateSearchParams = function updateSearchParams(updateSearchParamsActionType) {
    return function (searchParamsToStore) {
        return function (dispatch, getState) {
            dispatch({
                type: updateSearchParamsActionType,
                searchParams: searchParamsToStore
            });
        };
    };
};

var setCurrentPage = exports.setCurrentPage = function setCurrentPage(setCurrentPageNumberActionType) {
    return function (currentPageNumber) {
        return function (dispatch, getState) {
            dispatch({
                type: setCurrentPageNumberActionType,
                pageNumber: currentPageNumber
            });
        };
    };
};
//# sourceMappingURL=paginationActions.js.map