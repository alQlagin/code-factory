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

var _actionFactory = require('./action-factory');

var _actionFactory2 = _interopRequireDefault(_actionFactory);

var _listAction = require('./actions/list-action');

var _listAction2 = _interopRequireDefault(_listAction);

var _viewAction = require('./actions/view-action');

var _viewAction2 = _interopRequireDefault(_viewAction);

var _createAction = require('./actions/create-action');

var _createAction2 = _interopRequireDefault(_createAction);

var _updateAction = require('./actions/update-action');

var _updateAction2 = _interopRequireDefault(_updateAction);

var _removeAction = require('./actions/remove-action');

var _removeAction2 = _interopRequireDefault(_removeAction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @property {list,view,update,create,remove} actions
 */
var Controller = function () {
    function Controller(MongooseModel, customActions) {
        _classCallCheck(this, Controller);

        this.Model = MongooseModel;
        this.actions = {};
        this.init(customActions);
    }

    _createClass(Controller, [{
        key: 'init',
        value: function init(actions) {
            var _this = this;

            this.actions.list = new _listAction2.default(this.Model);
            this.actions.view = new _viewAction2.default(this.Model);
            this.actions.create = new _createAction2.default(this.Model);
            this.actions.update = new _updateAction2.default(this.Model);
            this.actions.remove = new _removeAction2.default(this.Model);

            _lodash2.default.each(actions, function (actionFn, actionName) {
                console.log(actionFn, actionName);
                _this.actions[actionName] = (0, _actionFactory2.default)(_this.Model, actionFn);
            });
        }
    }]);

    return Controller;
}();

exports.default = Controller;
//# sourceMappingURL=controller.js.map