var express = require("express"),
	router = express.Router(),
	Blog = require("../models/blog");

// INDEX ROUTE
router.get("/", function(req, res){
	res.redirect("/blog");
});

router.get("/blog", function(req, res){
	Blog.find({}, function(err, blog){
		if(err){
			console.log(err);
		} else {
			res.render("index", {blog: blog});
		}
	});
});

// NEW ROUTE
router.get("/blog/new", function(req, res){
	res.render("new");
});

// CREATE ROUTE
router.post("/blog", function(req, res){
	Blog.create(req.body.blog, function(err, newBlog){
		if (err){
			console.log(err);
		} else {
			res.redirect("/blog");
		}
	});
});

// SHOW ROUTE
router.get("/blog/:id", function(req, res){
	Blog.findById(req.params.id, function(err, blog){
		if (err){
			console.log(err);
		} else {
			res.render("show", {blog: blog});
		}
	});
});

// EDIT ROUTE
router.get("/blog/:id/edit", function(req, res){
	Blog.findById(req.params.id, function(err, blog){
		if (err){
			console.log(err);
		} else {
			res.render("edit", {blog: blog});
		}
	});
});

// UPDATE ROUTE
router.put("/blog/:id", function(req, res){
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, blog){
		if (err){
			console.log(err);
		} else {
			res.redirect("/blog/" + req.params.id);
		}
	});
});

// DESTROY ROUTE
router.delete("/blog/:id", function(req, res){
	Blog.findByIdAndRemove(req.params.id, function(err){
    if (err){
      console.log(err);
    } else {
      res.redirect("/blog");
    }
  });
});

module.exports = router;
