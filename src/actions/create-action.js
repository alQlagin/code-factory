/**
 * Created by alex on 29.07.16.
 */
'use strict';

import BaseAction from './base-action';

export default class CreateAction extends BaseAction {
    run(data) {
        let model = new (this.Model)(data);
        return model.save();
    }
}