import dotProp from 'dot-prop-immutable';

export const paginate = (types) => {
    const { fetching, success, failure, refreshing, removeCache, removeSearchResult } = types;

    return (state = {}, action) => {
        const stateToUpdate = dotProp.set(state, `${action.filtersKey}.lastUpdateTime`, Date.now());
        switch (action.type) {
            case fetching:
                return dotProp.set(stateToUpdate, `${action.filtersKey}.pages.${action.page}`,
                    {
                        isFetching: true,
                        isRefreshing: false,
                        isSuccess: false,
                        isFailed: false,
                        lastUpdateTime: Date.now(),
                        elements: []
                    }
                );
            case success:
                const withElemsCount = dotProp.merge(stateToUpdate, `${action.filtersKey}`,
                    {
                        elementsCount: action.response.totalElements
                    });
                return dotProp.set(withElemsCount, `${action.filtersKey}.pages.${action.page}`,
                    {
                        isFetching: false,
                        isRefreshing: false,
                        isSuccess: true,
                        isFailed: false,
                        lastUpdateTime: Date.now(),
                        elements: action.response.elements
                    }
                );
            case failure:
                return dotProp.set(stateToUpdate, `${action.filtersKey}.pages.${action.page}`,
                    {
                        isFetching: false,
                        isRefreshing: false,
                        isSuccess: false,
                        isFailed: true,
                        lastUpdateTime: Date.now(),
                        elements: []
                    }
                );
            case removeCache:
                return {};
            case refreshing:
                return dotProp.merge(stateToUpdate, `${action.filtersKey}.pages.${action.page}`,
                    {
                        isFetching: false,
                        isRefreshing: true,
                        isSuccess: false,
                        isFailed: false,
                        lastUpdateTime: Date.now()
                    });
            case removeSearchResult:
                return dotProp.delete(stateToUpdate, `${action.filtersKey}`);
            default:
                return state;
        }
    }
}

export const entities = (actionTypes) => {
    const { success, removeCache } = actionTypes;
    return (state = {}, action) => {
        switch (action.type) {
            case success:
                return {
                    ...state,
                    ...action.response.entities
                }
            case removeCache:
                return {};
            default:
                return state;
        }
    }
}

export const paginationParams = (actionType, removeCacheActionType) => {
    const updatePaginationParams = actionType;
    const removeCache = removeCacheActionType;
    return (state = {}, action) => {
        switch (action.type) {
            case updatePaginationParams:
                return { ...state, ...action.paginationParams };
            case removeCache:
                return {};
            default:
                return state;
        }
    }
}

export const searchParamsReducer = (searchParamsActionType, initState) => {
    return (state = initState, action) => {
        switch (action.type) {
            case searchParamsActionType:
                return { ...state, ...action.searchParams };
            default:
                return state;
        }
    }
}

export const currentPageReducer = (setCurrentPageNumberActionType) => {
    return (state = { pageNumber: 1 }, action) => {
        switch (action.type) {
            case setCurrentPageNumberActionType:
                return {
                    pageNumber: action.pageNumber
                };
            default:
                return state;
        }
    }
}