/**
 * Created by alex on 29.07.16.
 */
'use strict';
import _ from 'lodash';
import ActionFactory from './action-factory';
import ListAction from './actions/list-action';
import ViewAction from './actions/view-action';
import CreateAction from './actions/create-action';
import UpdateAction from './actions/update-action';
import RemoveAction from './actions/remove-action';

/**
 * @property {list,view,update,create,remove} actions
 */
export default class Controller {
    constructor(MongooseModel, customActions) {
        this.Model = MongooseModel;
        this.actions = {};
        this.init(customActions);
    }

    init(actions) {
        this.actions.list = new ListAction(this.Model);
        this.actions.view = new ViewAction(this.Model);
        this.actions.create = new CreateAction(this.Model);
        this.actions.update = new UpdateAction(this.Model);
        this.actions.remove = new RemoveAction(this.Model);

        _.each(actions, (actionFn, actionName)=> {
            console.log(actionFn, actionName);
            this.actions[actionName] = ActionFactory(this.Model, actionFn);
        });
    }
}