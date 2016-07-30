/**
 * Created by alex on 29.07.16.
 */
'use strict';

import BaseAction from './base-action';

export default class ViewAction extends BaseAction {
    run(condition) {
        return this.Model.findOne(condition).then(item => {
            if (!item) throw new Error('nothing found');
            return item;
        });
    }
}