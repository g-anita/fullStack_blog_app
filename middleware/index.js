var Blog = require("../models/blog");

var middlewareObj = {};

middlewareObj.checkBlogOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Blog.findById(req.params.id, function(err, foundBlog){
           if(err){
               req.flash("error", "Blog not found");
               res.redirect("back");
           }  else {
               // does user own the campground?
            if(foundBlog.author.id.equals(req.user._id)) {
                next();
            } else {
                req.flash("error", "You don't have permission");
                res.redirect("back");
            }
           }
        });
    } else {
        req.flash("error", "You need to be logged in");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
  if(req.isAuthenticated()){
    return next()
  }
  req.flash("error", "You need to be logged in");
  res.redirect("/login");
}

module.exports = middlewareObj;
