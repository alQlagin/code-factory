/**
 * Created by alex on 29.07.16.
 */
'use strict';
import BaseAction from './base-action';
import Pagination from '../utils/pagination';


export default class ListAction extends BaseAction {
    constructor(MogooseModel) {
        super(MogooseModel);
        this.defaults = {
            perPage: 10,
            currentPage: 1
        }
    }

    /**
     *
     * @param condition
     * @returns {Query}
     */
    run(condition) {
        return this.Model.find(condition);
    }

    /**
     *
     * @param condition
     * @param currentPage
     * @param perPage
     * @returns {Promise.<TResult>}
     */

    paginate(condition, currentPage = 1, perPage = 10) {
        currentPage = Number(currentPage);
        perPage = Number(perPage);

        if (perPage < 1)
            perPage = this.defaults.perPage;

        if (currentPage < 1)
            currentPage = this.defaults.currentPage;

        let skip = (Number(currentPage) - 1) * Number(perPage);

        let totalCount, data;
        return this.Model.count(condition)
            .then(count => totalCount = count)
            .then(() => {
                return this.run(condition)
                    .skip(skip)
                    .limit(perPage)
            })
            .then(list => data = list)
            .then(() => {
                return {
                    data,
                    pagination: new Pagination(currentPage, perPage, totalCount)
                }
            })
    }


}
