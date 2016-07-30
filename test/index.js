/**
 * Created by alex on 30.07.16.
 */
'use strict';
var expect = require('chai').expect;
var mockgoose = require('mockgoose');
var mongoose = require('mongoose');
mongoose.Promise = Promise;
// mock mongoose before requiring the script which establishes the connection (to mock the connection)
mockgoose(mongoose);

before(function (done) {
    require('./db');
    done();
});
after(function () {
    mockgoose.reset();
    mongoose.connection.close();
});

var Item = require('./model/item');

beforeEach(function (done) {
    mockgoose.reset(done);
});

var codeFactory = require('../dist');

describe('codeFacoty', function () {
    it('should create controller', function (done) {
        var controller = codeFactory.controllerFactory(Item);
        expect(controller.Model).is.equal(Item);
        done();
    });

    describe('Base controller', function () {
        var controller;
        before(function (done) {
            controller = codeFactory.controllerFactory(Item);
            done();
        });

        it('should have actions', function (done) {
            expect(controller).has.property('actions');
            expect(controller.actions).to.have.all.keys('view', 'create', 'update', 'list', 'remove');
            done();
        });
        describe('Actions', function () {
            describe('List', function () {
                var action;
                before(function (done) {
                    action = controller.actions.list;
                    done();
                });
                beforeEach(function (done) {
                    var data = [];
                    for (var i = 0; i < 32; i++)
                        data.push({text: 'item ' + i})
                    Item.create(data)
                        .then(function (docs) {
                            done();
                        })
                        .catch(done)

                });
                it('should run() and return all items', function (done) {
                    action.run({})
                        .then(function (list) {
                            expect(list.length).to.be.equal(32);
                            done();
                        })
                        .catch(done)
                })
                describe('pagination', function () {
                    it('should return pagination object', function (done) {
                        action.paginate({}, 1, 15)
                            .then(function (provider) {
                                expect(provider).has.property('pagination');
                                expect(provider.pagination.currentPage).is.equal(1);
                                expect(provider.pagination.perPage).is.equal(15);
                                expect(provider.pagination.totalCount).is.equal(32);
                                expect(provider.pagination.pageCount).is.equal(3);
                                expect()
                                done();
                            })
                            .catch(done)
                    })

                    it('should return data', function (done) {
                        action.paginate({}, 2, 15)
                            .then(function (provider) {
                                expect(provider).has.property('data');
                                expect(provider.data.length).is.equal(15);
                                expect(provider.data[0].text).is.equal('item 15')
                                done();
                            })
                            .catch(done)
                    })
                })
            });
            describe('View', function () {
                var action;
                before(function () {
                    action = controller.actions.view;
                });

                beforeEach(function (done) {
                    Item.create({text: 'item 1'})
                        .then(function (docs) {
                            done();
                        })
                        .catch(done)

                });
                it('should load item by condition', function (done) {
                    action.run({text: 'item 1'})
                        .then(function (item) {
                            expect(item).is.ok;
                            expect(item.text).is.equal('item 1');
                            done();
                        })
                        .catch(done)
                });
                it('should throw error when nothing found', function (done) {
                    action.run({text: 'missed item'})
                        .then(function (item) {
                            done(new Error('missed item should reject promise'));
                        }, function (err) {
                            if (err.message == 'nothing found')
                                done();
                            else
                                throw err;
                        })
                        .catch(done)
                });
            });
            describe('Update', function () {
                var action;
                before(function () {
                    action = controller.actions.update;
                });
                beforeEach(function (done) {
                    Item.create({text: 'item 1', mixed: {'text': 'mixed text 1'}})
                        .then(function (docs) {
                            done();
                        })
                        .catch(done)

                });

                it('should find object, modify and save object changes', function (done) {
                    action.run({text: 'item 1'}, {text: 'item_1'})
                        .then(function (item) {
                            expect(item.text).is.equal('item_1');
                            done();
                        })
                        .catch(done)
                });
                describe('Mixed fields', function () {
                    it('should change mixed fields', function (done) {
                        action.run({text: 'item 1'}, {mixed: {text: 'mixed_text_1'}})
                            .then(function (item) {
                                expect(item.mixed).has.property('text', 'mixed_text_1');
                                done();
                            })
                            .catch(done)
                    });
                    it('should overwrite mixed fields', function (done) {
                        action.run({text: 'item 1'}, {mixed: {data: 'mixed data'}})
                            .then(function (item) {
                                expect(item.mixed).has.not.property('text');
                                expect(item.mixed).has.property('data', 'mixed data');
                                done();
                            })
                            .catch(done)
                    });
                    it('should merge mixed fields', function (done) {
                        action.run({text: 'item 1'}, {mixed: {data: 'mixed data'}}, true)
                            .then(function (item) {
                                expect(item.mixed).has.property('text', 'mixed text 1');
                                expect(item.mixed).has.property('data', 'mixed data');
                                done();
                            })
                            .catch(done)
                    });
                })
            })
            describe('Create', function () {
                var action;
                before(function (done) {
                    action = controller.actions.create;
                    done();
                });

                it('should create new record', function (done) {
                    action.run({text: 'new record'})
                        .then(function (record) {
                            expect(record).is.ok;
                            return Item.count();
                        })
                        .then(function (count) {
                            expect(count).is.equal(1);
                            done();
                        })
                        .catch(done)
                })
            })
            describe('Remove', function () {
                var action;
                before(function (done) {
                    action = controller.actions.remove;
                    done();
                });
                beforeEach(function (done) {
                    Item.create({text: 'item 1'})
                        .then(function (docs) {
                            done();
                        })
                        .catch(done)

                });
                it('should remove item', function (done) {
                    action.run({text: 'item 1'})
                        .then(function () {
                            return Item.count({});
                        })
                        .then(function (count) {
                            expect(count).is.equal(0);
                            done();
                        })
                        .catch(done);
                });
            })
        })
    })

    describe('Extended controller', function () {
        var controller;
        before(function (done) {
            controller = codeFactory.controllerFactory(Item, {
                searchByText: function (text) {
                    return Item.find({text: new RegExp(text, 'i')});
                },
                view: function (id) {
                    return Item.findById(id);
                }
            });
            done();
        });

        it('should have action searchByText', function (done) {
            expect(controller.actions).has.property('searchByText');
            done();
        });

        describe('Custom action', function () {
            var action;
            before(function (done) {
                action = controller.actions.searchByText;
                done();
            });
            beforeEach(function (done) {
                var data = [];
                for (var i = 0; i < 10; i++) {
                    data.push({text: 'searchable item' + i})
                }
                for (var i = 0; i < 20; i++) {
                    data.push({text: 'simple item' + i})
                }
                Item.create(data)
                    .then(function (docs) {
                        done();
                    })
                    .catch(done)
            });
            it('should have method run', function (done) {

                expect(action).has.property('run').which.is.a('function');
                done();
            });
            it('should find searchable items', function (done) {
                action.run('searchable')
                    .then(function (list) {
                        expect(list.length).is.equal(10);
                        done();
                    })
                    .catch(done)
            })
        })
        describe('Overload view', function () {
            var doc, action;
            before(function (done) {
                action = controller.actions.view;
                done();
            })
            beforeEach(function (done) {
                Item.create({text: 'item 1'})
                    .then(function (result) {
                        doc = result;
                        done();
                    })
                    .catch(done)
            });
            it('should find object by id', function (done) {
                action.run(doc._id)
                    .then(function (item) {
                        expect(item).is.ok;
                        done();
                    })
                    .catch(done)
            });
            it('should not reject when item not found', function (done) {
                action.run(new mongoose.Types.ObjectId)
                    .then(function (item) {
                        expect(item).is.not.ok;
                        done();
                    })
                    .catch(done)
            })
        })
    })
});