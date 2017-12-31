
import { buildUniqueKey } from './utils';

export const loadPage = (actionTypes, storeName, callApi, config) => {
    const { fetching,
        success,
        failure,
        removeCache,
        refreshing,
        removeSearchResult } = actionTypes;
    const { searchHistoryLength } = config;

    return (page, searchParams) =>
        (dispatch, getState) => {

            const store = getState()[storeName];
            const entryToRemove = getEntryKeyToRemove(store, searchHistoryLength);
            if (entryToRemove) {
                dispatch({
                    type: removeSearchResult,
                    filtersKey: entryToRemove
                });
            }

            const validSearchParams = getValidSearchParams(searchParams, store);

            const filtersKey = buildUniqueKey(validSearchParams);
            const cachedResult = getPage(getState()[storeName], filtersKey, page);
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

            return callApi(page, validSearchParams, dispatch, getState).then(
                response => {
                    if (!isResponseValid(response)) {
                        dispatch({
                            type: failure,
                            filtersKey: filtersKey,
                            page: page
                        });
                        return Promise.reject('server response is not valid');
                    }

                    const newTotalCount = response.totalElements;
                    let actualTotalCount = undefined;
                    if (getState()[storeName].pagination[filtersKey]) {
                        actualTotalCount = getState()[storeName].pagination[filtersKey].elementsCount;
                    }

                    if (actualTotalCount && actualTotalCount !== newTotalCount) {
                        dispatch({
                            type: removeCache
                        })
                    }
                    dispatch({
                        type: success,
                        filtersKey: filtersKey,
                        page: page,
                        response: response
                    });
                },
                error => {
                    dispatch({
                        type: failure,
                        filtersKey: filtersKey,
                        page: page
                    });
                    return Promise.reject(error);
                }
            )
        }
}

const getValidSearchParams = (searchParams, store) => {
    if (!searchParams) {
        return store.searchParams;
    }
    return searchParams;
}

const getEntryKeyToRemove = (store, searchHistoryLength) => {
    const paginationEntries = Object.entries(store.pagination);
    if (paginationEntries.length > searchHistoryLength) {

        const min = paginationEntries.map(([key, val]) => {
            return { key: key, time: val.lastUpdateTime }
        }).reduce((min, curr) => {
            if (!min) {
                return curr;
            }
            if (curr.time < min.time) {
                return curr;
            }
            return min;
        }, null);
        return min.key
    }
    return null;
}

const shouldAbandonAction = (cachedResult, config) => {
    if (!cachedResult) {
        return false;
    }

    const { refreshResultInBackground, timeToRefresh } = config;
    if (cachedResult.isFetching || !refreshResultInBackground) {
        return true;
    }

    if (isTimeToRefresh(cachedResult.lastUpdateTime, timeToRefresh)) {
        return false;
    }
    return true;
}

const isTimeToRefresh = (prevTime, diff) => {
    const result = Date.now() - prevTime > diff;
    return result;
}

const getPage = (store, filtersKey, page) => {
    if (store && store.pagination && store.pagination[filtersKey] &&
        store.pagination[filtersKey].pages) {
        const foundPage = store.pagination[filtersKey].pages[page];
        return foundPage;
    }
    return null;
}

const isResponseValid = (response) => {
    const { totalElements, elements, entities } = response;

    if (Number.isInteger(totalElements) && totalElements === 0) {
        return true;
    }

    return totalElements && elements && entities;
}

export const updatePaginationParams = (updatePaginationParams) => {
    return (paramsToStore) => (dispatch, getState) => {
        dispatch({
            type: updatePaginationParams,
            paginationParams: paramsToStore
        });
    }
}

export const updateSearchParams = (updateSearchParamsActionType) => {
    return (searchParamsToStore) => (dispatch, getState) => {
        dispatch({
            type: updateSearchParamsActionType,
            searchParams: searchParamsToStore
        });
    }
}

export const setCurrentPage = (setCurrentPageNumberActionType) => {
    return (currentPageNumber) => (dispatch, getState) => {
        dispatch({
            type: setCurrentPageNumberActionType,
            pageNumber: currentPageNumber
        });
    }
}

