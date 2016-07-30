/**
 * Created by alex on 29.07.16.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.controllerFactory = undefined;

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function controllerFactory(MongooseModel, actions) {
  var controller = new _controller2.default(MongooseModel, actions);

  return controller;
}
exports.controllerFactory = controllerFactory;
//# sourceMappingURL=index.js.map