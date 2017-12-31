export const buildFetchingApiActionNames = actionPrefix => {
    return {
        fetching: `${actionPrefix}_FETCHING`,
        success: `${actionPrefix}_SUCCESS`,
        failure: `${actionPrefix}_FAILURE`,
        removeCache: `${actionPrefix}_SOURCE_CHANGED`,
        removeSearchResult: `${actionPrefix}_REMOVE_SEARCH_RESULT`,
        refreshing: `${actionPrefix}_REFRESHING_PAGE`,
        updatePaginationParams: `${actionPrefix}_UPDATE_PAGINATION_PARAMS`,
        updateScrollToIndex: `${actionPrefix}_UPDATE_SCROLL_TO_INDEX`,//obsolete
        updateSearchParams: `${actionPrefix}_UPDATE_SEARCH_PARAMS`,
        setCurrentPageNumber: `${actionPrefix}_SET_CURRENT_PAGE`
    }
}

export const buildStoreName = storePrefix => {
    return `${storePrefix}_store`;
}

export const buildUniqueKey = (obj) => {
    if (!obj) {
        console.error('input has to be defined!');
    }

    let result = '';
    Object.entries(obj).sort().forEach(
        ([key, value]) => {
            result = result.concat(key, '_', value, '_');
        }
    );
    return result;
}

export const convertTotalItemIndexToPageNum = (elementsPerPage) => (totalIndex) => {
    return Math.floor(totalIndex / elementsPerPage) + 1;
}
