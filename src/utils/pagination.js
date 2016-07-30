/**
 * Created by alex on 29.07.16.
 */
'use strict';


import _ from 'lodash';
export default class Pagination {
    constructor(currentPage, perPage, totalCount) {
        this.currentPage = currentPage;
        this.perPage = perPage;
        this.totalCount = totalCount;
        this.pageCount = Math.ceil(totalCount / perPage);
    }

    static get defaultHeaders() {
        return {
            totalCount: 'pagination-totalCount',
            perPage: 'pagination-perPage',
            pageCount: 'pagination-pageCount',
            currentPage: 'pagination-currentPage',
        }
    }

    setHeaders(res, headers) {
        if (!headers) headers = {};

        _.defaults(headers, this.defaultHeaders);
        res.set(headers.totalCount, this.totalCount);
        res.set(headers.perPage, this.perPage);
        res.set(headers.pageCount, this.totalCount);
        res.set(headers.currentPage, this.currentPage);
        return res;
    }
}