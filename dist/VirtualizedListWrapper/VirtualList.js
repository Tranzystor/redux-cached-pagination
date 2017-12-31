'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n    flex: 1 1 auto;\n'], ['\n    flex: 1 1 auto;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n    outline: none;\n'], ['\n    outline: none;\n']);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactVirtualized = require('react-virtualized');

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _redux = require('redux');

var _utils = require('./../utils');

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var AutoSizerContainer = _styledComponents2.default.div(_templateObject);

var VirtualListWithoutOutline = (0, _styledComponents2.default)(_reactVirtualized.List)(_templateObject2);

var mapStateToProps = function mapStateToProps(state, props) {
    var totalElements = props.paginator.selectors.getTotalElements(state);
    var notZeroRowCount = totalElements > 0 ? totalElements : 1;
    return {
        paginationParams: props.paginator.selectors.getPaginationParams(state),
        searchParams: props.paginator.selectors.getSearchParams(state),
        notZeroRowCount: notZeroRowCount
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch, props) {
    return (0, _redux.bindActionCreators)({
        updatePaginationParams: props.paginator.updatePaginationParams,
        requestPage: props.paginator.requestPage
    }, dispatch);
};

var VirtualList = function (_Component) {
    _inherits(VirtualList, _Component);

    function VirtualList(props) {
        _classCallCheck(this, VirtualList);

        var _this = _possibleConstructorReturn(this, (VirtualList.__proto__ || Object.getPrototypeOf(VirtualList)).call(this, props));

        _this.isRowLoaded = _this.isRowLoaded.bind(_this);
        _this.noRowsRenderer = _this.noRowsRenderer.bind(_this);
        _this.loadMoreRows = _this.loadMoreRows.bind(_this);
        _this.rowRenderer = _this.rowRenderer.bind(_this);
        _this.onRowClick = _this.onRowClick.bind(_this);
        _this.state = { scrollToIndex: 0 };
        _this.prevSearchParamsKey = (0, _utils.buildUniqueKey)(props.searchParams);
        return _this;
    }

    _createClass(VirtualList, [{
        key: 'loadMoreRows',
        value: function loadMoreRows(_ref) {
            //nop

            var startIndex = _ref.startIndex,
                stopIndex = _ref.stopIndex;
        }
    }, {
        key: 'isRowLoaded',
        value: function isRowLoaded(_ref2) {
            var index = _ref2.index;

            return false;
        }
    }, {
        key: 'noRowsRenderer',
        value: function noRowsRenderer() {
            return _react2.default.createElement(
                'div',
                null,
                'no rows'
            );
        }
    }, {
        key: 'onRowClick',
        value: function onRowClick(index) {
            this.props.updatePaginationParams({ selectedIndex: index, force: false });
        }
    }, {
        key: 'rowRenderer',
        value: function rowRenderer(_ref3) {
            var _this2 = this;

            var index = _ref3.index,
                key = _ref3.key,
                style = _ref3.style;

            var pageNum = this.props.paginator.convertTotalItemIndexToPageNum(index);
            this.props.requestPage(pageNum);
            return _react2.default.createElement(
                'div',
                { key: key, style: style, onClick: function onClick() {
                        _this2.onRowClick(index);
                    } },
                this.props.rowRenderer(index)
            );
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _nextProps$pagination = nextProps.paginationParams,
                selectedIndex = _nextProps$pagination.selectedIndex,
                force = _nextProps$pagination.force;

            if (force) {
                this.setState({ scrollToIndex: selectedIndex });
            }

            var searchParamsKey = (0, _utils.buildUniqueKey)(nextProps.searchParams);
            if (searchParamsKey !== this.prevSearchParamsKey) {
                this.props.updatePaginationParams({ selectedIndex: null, force: true });
                this.prevSearchParamsKey = searchParamsKey;
            }
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            this.setState({ scrollToIndex: this.props.paginationParams.selectedIndex });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var scrollToIndexZeroBased = this.state.scrollToIndex;
            return _react2.default.createElement(
                AutoSizerContainer,
                null,
                _react2.default.createElement(
                    _reactVirtualized.AutoSizer,
                    null,
                    function (_ref4) {
                        var width = _ref4.width,
                            height = _ref4.height;
                        return _react2.default.createElement(
                            _reactVirtualized.InfiniteLoader,
                            {
                                key: (0, _utils.buildUniqueKey)(_this3.props.searchParams),
                                isRowLoaded: _this3.isRowLoaded,
                                loadMoreRows: _this3.loadMoreRows,
                                rowCount: _this3.props.notZeroRowCount },
                            function (_ref5) {
                                var onRowsRendered = _ref5.onRowsRendered,
                                    registerChild = _ref5.registerChild;

                                return _react2.default.createElement(VirtualListWithoutOutline, {
                                    ref: registerChild,
                                    height: height,
                                    width: width,
                                    onRowsRendered: onRowsRendered,
                                    rowCount: _this3.props.notZeroRowCount,
                                    rowRenderer: _this3.rowRenderer,
                                    noRowsRenderer: _this3.noRowsRenderer,
                                    rowHeight: _this3.props.rowHeight,
                                    scrollToIndex: scrollToIndexZeroBased,
                                    scrollToAlignment: 'center'
                                });
                            }
                        );
                    }
                )
            );
        }
    }]);

    return VirtualList;
}(_react.Component);

VirtualList.propTypes = {
    rowRenderer: _propTypes2.default.func.isRequired,
    rowHeight: _propTypes2.default.number.isRequired,
    paginator: _propTypes2.default.object.isRequired
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(VirtualList);
//# sourceMappingURL=VirtualList.js.map