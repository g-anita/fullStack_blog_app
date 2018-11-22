var express = require("express"),
	app = express(),
	bodyParser = require("body-parser"),
	mongoose = require("mongoose"),
	flash = require("connect-flash"),
	methodOverride = require("method-override"),
	passport = require("passport"),
	localStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose"),
	Blog = require("./models/blog"),
	User = require("./models/user");

var	blogRoutes = require("./routes/blog"),
	indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost:27017/blog_app", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(flash());

app.use(require("express-session")({
	secret: "secret code",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
})

app.use(blogRoutes);
app.use(indexRoutes);

app.listen(3000, function(){
	console.log("Server has started");
});
