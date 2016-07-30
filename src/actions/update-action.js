/**
 * Created by alex on 29.07.16.
 */
'use strict';
import _ from 'lodash';
import ViewAction from './view-action';

export default class UpdateAction extends ViewAction {
    run(condition, data, deepMerge = false) {
        return super.run(condition)
            .then(model => {
                if (deepMerge)
                    _.merge(model, data);
                else
                    _.assign(model, data);
                return model.save();
            })
    }
}