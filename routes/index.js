var express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  User = require("../models/user");
// register routes
router.get("/register", function(req, res){
  res.render("register");
});

router.post("/register", function(req, res){
  req.body.username;
  req.body.password;
  var newUser = new User({username: req.body.username})
  User.register(newUser, req.body.password, function(err, user){
    if (err){
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
    res.redirect("/blog");
    });
  });
});

// login routes
router.get("/login", function(req, res){
  res.render("login");
})

router.post("/login", passport.authenticate("local", {
  successRedirect: "/blog",
  failureRedirect: "/login"
}), function(req, res){
});

// logout routes
router.get("/logout", function(req, res){
  req.logout();
  res.redirect("/blog")
})

module.exports = router;
