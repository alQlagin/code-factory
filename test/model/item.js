/**
 * Created by alex on 30.07.16.
 */
'use strict';

let mongoose = require('mongoose');
let ItemSchema = new mongoose.Schema({
    text: String,
    mixed: mongoose.Schema.Types.Mixed
});


module.exports = mongoose.model('Item', ItemSchema);
