/**
 * Created by alex on 30.07.16.
 */
'use strict';

import ViewAction from './view-action';

export default class RemoveAction extends ViewAction {
    run(condition) {
        return super.run(condition)
            .then(item => item.remove())
    }
}