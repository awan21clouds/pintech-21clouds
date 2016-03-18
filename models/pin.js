/**
 * Created by RizqyFahmi on 18/03/2016.
 */

var mongoose = require('mongoose');
var db = require('./connection');
var Schema = db.Schema;

// create a schema
var pinSchema = new Schema({
    title:{ type: String, default: '-' },
    url:{ type: String, default: '-' },
    user_id:{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
});

// the schema is useless so far
// we need to create a model using it
var pin = mongoose.model('Pin', pinSchema);

// make this available to our users in our Node applications
module.exports = pin;