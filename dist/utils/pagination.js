/**
 * Created by alex on 29.07.16.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pagination = function () {
    function Pagination(currentPage, perPage, totalCount) {
        _classCallCheck(this, Pagination);

        this.currentPage = currentPage;
        this.perPage = perPage;
        this.totalCount = totalCount;
        this.pageCount = Math.ceil(totalCount / perPage);
    }

    _createClass(Pagination, [{
        key: 'setHeaders',
        value: function setHeaders(res, headers) {
            if (!headers) headers = {};

            _lodash2.default.defaults(headers, this.defaultHeaders);
            res.set(headers.totalCount, this.totalCount);
            res.set(headers.perPage, this.perPage);
            res.set(headers.pageCount, this.totalCount);
            res.set(headers.currentPage, this.currentPage);
            return res;
        }
    }], [{
        key: 'defaultHeaders',
        get: function get() {
            return {
                totalCount: 'pagination-totalCount',
                perPage: 'pagination-perPage',
                pageCount: 'pagination-pageCount',
                currentPage: 'pagination-currentPage'
            };
        }
    }]);

    return Pagination;
}();

exports.default = Pagination;
//# sourceMappingURL=pagination.js.map