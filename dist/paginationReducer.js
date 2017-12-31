'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.currentPageReducer = exports.searchParamsReducer = exports.paginationParams = exports.entities = exports.paginate = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _dotPropImmutable = require('dot-prop-immutable');

var _dotPropImmutable2 = _interopRequireDefault(_dotPropImmutable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var paginate = exports.paginate = function paginate(types) {
    var fetching = types.fetching,
        success = types.success,
        failure = types.failure,
        refreshing = types.refreshing,
        removeCache = types.removeCache,
        removeSearchResult = types.removeSearchResult;


    return function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var action = arguments[1];

        var stateToUpdate = _dotPropImmutable2.default.set(state, action.filtersKey + '.lastUpdateTime', Date.now());
        switch (action.type) {
            case fetching:
                return _dotPropImmutable2.default.set(stateToUpdate, action.filtersKey + '.pages.' + action.page, {
                    isFetching: true,
                    isRefreshing: false,
                    isSuccess: false,
                    isFailed: false,
                    lastUpdateTime: Date.now(),
                    elements: []
                });
            case success:
                var withElemsCount = _dotPropImmutable2.default.merge(stateToUpdate, '' + action.filtersKey, {
                    elementsCount: action.response.totalElements
                });
                return _dotPropImmutable2.default.set(withElemsCount, action.filtersKey + '.pages.' + action.page, {
                    isFetching: false,
                    isRefreshing: false,
                    isSuccess: true,
                    isFailed: false,
                    lastUpdateTime: Date.now(),
                    elements: action.response.elements
                });
            case failure:
                return _dotPropImmutable2.default.set(stateToUpdate, action.filtersKey + '.pages.' + action.page, {
                    isFetching: false,
                    isRefreshing: false,
                    isSuccess: false,
                    isFailed: true,
                    lastUpdateTime: Date.now(),
                    elements: []
                });
            case removeCache:
                return {};
            case refreshing:
                return _dotPropImmutable2.default.merge(stateToUpdate, action.filtersKey + '.pages.' + action.page, {
                    isFetching: false,
                    isRefreshing: true,
                    isSuccess: false,
                    isFailed: false,
                    lastUpdateTime: Date.now()
                });
            case removeSearchResult:
                return _dotPropImmutable2.default.delete(stateToUpdate, '' + action.filtersKey);
            default:
                return state;
        }
    };
};

var entities = exports.entities = function entities(actionTypes) {
    var success = actionTypes.success,
        removeCache = actionTypes.removeCache;

    return function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var action = arguments[1];

        switch (action.type) {
            case success:
                return _extends({}, state, action.response.entities);
            case removeCache:
                return {};
            default:
                return state;
        }
    };
};

var paginationParams = exports.paginationParams = function paginationParams(actionType, removeCacheActionType) {
    var updatePaginationParams = actionType;
    var removeCache = removeCacheActionType;
    return function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var action = arguments[1];

        switch (action.type) {
            case updatePaginationParams:
                return _extends({}, state, action.paginationParams);
            case removeCache:
                return {};
            default:
                return state;
        }
    };
};

var searchParamsReducer = exports.searchParamsReducer = function searchParamsReducer(searchParamsActionType, initState) {
    return function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initState;
        var action = arguments[1];

        switch (action.type) {
            case searchParamsActionType:
                return _extends({}, state, action.searchParams);
            default:
                return state;
        }
    };
};

var currentPageReducer = exports.currentPageReducer = function currentPageReducer(setCurrentPageNumberActionType) {
    return function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { pageNumber: 1 };
        var action = arguments[1];

        switch (action.type) {
            case setCurrentPageNumberActionType:
                return {
                    pageNumber: action.pageNumber
                };
            default:
                return state;
        }
    };
};
//# sourceMappingURL=paginationReducer.js.map