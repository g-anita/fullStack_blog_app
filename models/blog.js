var mongoose = require("mongoose");

var blogSchema = new mongoose.Schema({
	title: String,
	content: String,
	image: String,
	created: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Blog", blogSchema)
