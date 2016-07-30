/**
 * Created by alex on 30.07.16.
 */
'use strict';

var mongoose = require('mongoose');

var dbURI = 'mongodb://localhost:27017/code_factory_test';

process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        process.exit(0);
    });
});

mongoose.connect(dbURI);