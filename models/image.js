var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ImageSchema = new Schema({
    query:String,
    image_paths : [String]
});

module.exports = mongoose.model('image',ImageSchema);
