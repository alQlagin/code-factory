/**
 * Created by alex on 29.07.16.
 */
'use strict';

import BaseAction from './actions/base-action';
class CustomAction extends BaseAction {
    constructor(MongooseModel, runFn) {
        super(MongooseModel);
        this.runFn = runFn;
    }

    run() {
        return this.runFn.apply(this, arguments);
    }
}
export default function actionFactory(MongooseModel, runFn) {
    return new CustomAction(MongooseModel, runFn)
}