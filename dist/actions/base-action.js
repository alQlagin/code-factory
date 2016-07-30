/**
 * Created by alex on 29.07.16.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseAction = function () {
    function BaseAction(Model) {
        _classCallCheck(this, BaseAction);

        this.Model = Model;
    }

    _createClass(BaseAction, [{
        key: "run",
        value: function run() {
            var promise = new Promise(function (resolve, reject) {
                return reject(new Error("Unable to run base action"));
            });
            return promise;
        }
    }]);

    return BaseAction;
}();

exports.default = BaseAction;
//# sourceMappingURL=base-action.js.map