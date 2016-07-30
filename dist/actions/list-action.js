/**
 * Created by alex on 29.07.16.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _baseAction = require('./base-action');

var _baseAction2 = _interopRequireDefault(_baseAction);

var _pagination = require('../utils/pagination');

var _pagination2 = _interopRequireDefault(_pagination);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ListAction = function (_BaseAction) {
    _inherits(ListAction, _BaseAction);

    function ListAction(MogooseModel) {
        _classCallCheck(this, ListAction);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ListAction).call(this, MogooseModel));

        _this.defaults = {
            perPage: 10,
            currentPage: 1
        };
        return _this;
    }

    /**
     *
     * @param condition
     * @returns {Query}
     */


    _createClass(ListAction, [{
        key: 'run',
        value: function run(condition) {
            return this.Model.find(condition);
        }

        /**
         *
         * @param condition
         * @param currentPage
         * @param perPage
         * @returns {Promise.<TResult>}
         */

    }, {
        key: 'paginate',
        value: function paginate(condition) {
            var _this2 = this;

            var currentPage = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
            var perPage = arguments.length <= 2 || arguments[2] === undefined ? 10 : arguments[2];

            currentPage = Number(currentPage);
            perPage = Number(perPage);

            if (perPage < 1) perPage = this.defaults.perPage;

            if (currentPage < 1) currentPage = this.defaults.currentPage;

            var skip = (Number(currentPage) - 1) * Number(perPage);

            var totalCount = void 0,
                data = void 0;
            return this.Model.count(condition).then(function (count) {
                return totalCount = count;
            }).then(function () {
                return _this2.run(condition).skip(skip).limit(perPage);
            }).then(function (list) {
                return data = list;
            }).then(function () {
                return {
                    data: data,
                    pagination: new _pagination2.default(currentPage, perPage, totalCount)
                };
            });
        }
    }]);

    return ListAction;
}(_baseAction2.default);

exports.default = ListAction;
//# sourceMappingURL=list-action.js.map