'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getCurrentPage = exports.getSearchParams = exports.getPaginationParams = exports.getElementByTotalIndex = exports.getPage = exports.getTotalElements = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = require('./utils');

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var getTotalElements = exports.getTotalElements = function getTotalElements(sliceName) {
    return function (store, searchParams) {
        var currentStore = store[sliceName];
        var validatedSearchParams = searchParams ? searchParams : currentStore.searchParams;
        var filtersKey = (0, _utils.buildUniqueKey)(validatedSearchParams);

        if (currentStore && currentStore.pagination[filtersKey]) {
            var elementsCount = currentStore.pagination[filtersKey].elementsCount;
            return elementsCount ? elementsCount : 0;
        }
        return 0;
    };
};

var getPage = exports.getPage = function getPage(sliceName, normalized) {
    return function (store, page, searchParams) {
        var currentStore = store[sliceName];
        var validatedSearchParams = searchParams ? searchParams : currentStore.searchParams;
        var filtersKey = (0, _utils.buildUniqueKey)(validatedSearchParams);
        if (currentStore && currentStore.pagination[filtersKey]) {
            var foundPage = currentStore.pagination[filtersKey].pages[page];

            if (foundPage && !normalized) {
                var loadedElements = foundPage.elements.map(function (x) {
                    return currentStore.entities[x];
                });
                return _extends({}, foundPage, { elements: loadedElements });
            }
            return foundPage;
        }
        return null;
    };
};

var getElementByTotalIndex = function getElementByTotalIndex(sliceName, elementsPerPage) {
    return function (store, totalIndex, searchParams) {
        var pageNum = Math.floor(totalIndex / elementsPerPage) + 1;
        var currentStore = store[sliceName];
        var validatedSearchParams = searchParams ? searchParams : currentStore.searchParams;
        var page = getPage(sliceName)(store, pageNum, validatedSearchParams);
        if (page) {
            var elements = page.elements,
                rest = _objectWithoutProperties(page, ['elements']);

            if (page.elements) {
                var elementIndex = totalIndex % elementsPerPage;
                var element = page.elements[elementIndex];
                return _extends({}, element, rest);
            }
            return rest;
        }
        return null;
    };
};

exports.getElementByTotalIndex = getElementByTotalIndex;
var getPaginationParams = exports.getPaginationParams = function getPaginationParams(sliceName) {
    return function (store) {
        var currentStore = store[sliceName];
        return currentStore.paginationParams;
    };
};

var getSearchParams = exports.getSearchParams = function getSearchParams(sliceName) {
    return function (store) {
        var searchParams = store[sliceName].searchParams;
        return searchParams;
    };
};

var getCurrentPage = exports.getCurrentPage = function getCurrentPage(sliceName) {
    return function (store) {
        var currentPage = store[sliceName].currentPage;
        return currentPage;
    };
};
//# sourceMappingURL=selectors.js.map