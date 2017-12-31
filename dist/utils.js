'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var buildFetchingApiActionNames = exports.buildFetchingApiActionNames = function buildFetchingApiActionNames(actionPrefix) {
    return {
        fetching: actionPrefix + '_FETCHING',
        success: actionPrefix + '_SUCCESS',
        failure: actionPrefix + '_FAILURE',
        removeCache: actionPrefix + '_SOURCE_CHANGED',
        removeSearchResult: actionPrefix + '_REMOVE_SEARCH_RESULT',
        refreshing: actionPrefix + '_REFRESHING_PAGE',
        updatePaginationParams: actionPrefix + '_UPDATE_PAGINATION_PARAMS',
        updateScrollToIndex: actionPrefix + '_UPDATE_SCROLL_TO_INDEX', //obsolete
        updateSearchParams: actionPrefix + '_UPDATE_SEARCH_PARAMS',
        setCurrentPageNumber: actionPrefix + '_SET_CURRENT_PAGE'
    };
};

var buildStoreName = exports.buildStoreName = function buildStoreName(storePrefix) {
    return storePrefix + '_store';
};

var buildUniqueKey = exports.buildUniqueKey = function buildUniqueKey(obj) {
    if (!obj) {
        console.error('input has to be defined!');
    }

    var result = '';
    Object.entries(obj).sort().forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        result = result.concat(key, '_', value, '_');
    });
    return result;
};

var convertTotalItemIndexToPageNum = exports.convertTotalItemIndexToPageNum = function convertTotalItemIndexToPageNum(elementsPerPage) {
    return function (totalIndex) {
        return Math.floor(totalIndex / elementsPerPage) + 1;
    };
};
//# sourceMappingURL=utils.js.map