// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const path = require("path");

// app.use(express.urlencoded({ extended: true }));

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderworld";
// const Listing = require("./models/listing");
// const ejsMate = require("ejs-mate");

// main()
//   .then(() => {
//     console.log("connected to db");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async function main() {
//   await mongoose.connect(MONGO_URL);
// }

// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

// const methodOverride = require("method-override");
// app.use(methodOverride("_method"));
// app.use(express.urlencoded({ extended: true }));
// app.engine("ejs", ejsMate);
// app.use(express.static(path.join(__dirname, "/public")));

// app.get("/", (req, res) => {
//   res.send("Hi,I am root");
// });

// //Index Route
// app.get("/listings", async (req, res) => {
//   const allListings = await Listing.find({});
//   res.render("listings/index.ejs", { allListings });
// });

// //New Route
// app.get("/listings/new", (req, res) => {
//   res.render("listings/new.ejs");
// });

// //Show Route
// app.get("/listings/:id", async (req, res) => {
//   let { id } = req.params;
//   const listing = await Listing.findById(id);
//   res.render("listings/show.ejs", { listing });
// });

// //Create Route
// app.post("/listings", async (req, res) => {
//   const newListing = new Listing(req.body.listing);
//   await newListing.save();
//   res.redirect("/listings");
// });

// //Edit Route
// app.get("/listings/:id/edit", async (req, res) => {
//   let { id } = req.params;
//   const listing = await Listing.findById(id);
//   res.render("listings/edit.ejs", { listing });
// });

// //Update Route
// app.put("/listings/:id", async (req, res) => {
//   let { id } = req.params;
//   await Listing.findByIdAndUpdate(id, { ...req.body.listing });
//   res.redirect(`/listings/${id}`);
// });

// //Delete Route
// app.delete("/listings/:id", async (req, res) => {
//   let { id } = req.params;
//   let deletedListing = await Listing.findByIdAndDelete(id);
//   console.log(deletedListing);
//   res.redirect("/listings");
// });

// app.listen(8000, () => {
//   console.log("server is listening to port 8000");
// });

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const ExpressError = require("./utils/ExpressError.js");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const userRoutes = require("./routes/user.js");

// ---------------- CONFIG ----------------
const dbUrl = process.env.ATLASDB_URL;
const PORT = process.env.PORT || 8000;

// ---------------- DB CONNECTION ----------------
mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log("DB connection error:", err);
  });

mongoose.set("strictQuery", false); // ← ADD THIS LINE HERE
// ---------------- SESSION STORE ----------------
const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.log("ERROR IN MONGO SESSION STORE", err);
});

const sessionOptions = {
  store,
  name: "wanderworld",
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionOptions));
app.use(flash());

// ---------------- PASSPORT ----------------
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ---------------- MIDDLEWARE ----------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  res.locals.MAP_TOKEN = process.env.MAP_TOKEN;
  next();
});

// ---------------- ROUTES ----------------
app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);
app.use("/", userRoutes);

// ---------------- ERROR HANDLING ----------------
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

// ---------------- SERVER ----------------
app.listen(PORT, () => {
  console.log(`server is listening to port ${PORT}`);
});
