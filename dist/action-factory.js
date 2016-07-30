/**
 * Created by alex on 29.07.16.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = actionFactory;

var _baseAction = require('./actions/base-action');

var _baseAction2 = _interopRequireDefault(_baseAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CustomAction = function (_BaseAction) {
    _inherits(CustomAction, _BaseAction);

    function CustomAction(MongooseModel, runFn) {
        _classCallCheck(this, CustomAction);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CustomAction).call(this, MongooseModel));

        _this.runFn = runFn;
        return _this;
    }

    _createClass(CustomAction, [{
        key: 'run',
        value: function run() {
            return this.runFn.apply(this, arguments);
        }
    }]);

    return CustomAction;
}(_baseAction2.default);

function actionFactory(MongooseModel, runFn) {
    return new CustomAction(MongooseModel, runFn);
}
//# sourceMappingURL=action-factory.js.map