/**
 * Created by alex on 29.07.16.
 */
'use strict';

export default class BaseAction {
    constructor(Model) {
        this.Model = Model;
    }

    run() {
        let promise = new Promise((resolve, reject) => reject(new Error("Unable to run base action")));
        return promise;
    }
}