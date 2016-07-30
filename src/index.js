/**
 * Created by alex on 29.07.16.
 */
'use strict';

import Controller from './controller';

function controllerFactory(MongooseModel, actions) {
    let controller = new Controller(MongooseModel, actions);

    return controller;
}
export {controllerFactory}
