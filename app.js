const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/Listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./Utils/wrapAsync.js");
const ExpressError = require("./Utils/ExpressError.js");

const MONGO_URL = "mongodb://localhost:27017/wanderlust";
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/privacy", (req, res) => {
  res.render("legal/privacy.ejs");
});

app.get("/terms", (req, res) => {
  res.render("legal/terms.ejs");
});

app.get(
  "/listings",
  wrapAsync(async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listings/index.ejs", { allListing });
  })
);

app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

app.get(
  "/listings/:id",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const foundListing = await Listing.findById(id);

    if (!foundListing) {
      return next(new ExpressError(404, "Listing not found"));
    }

    res.render("listings/show.ejs", { listing: foundListing });
  })
);

app.post(
  "/listings",
  wrapAsync(async (req, res) => {
    if (!req.body.listing) {
      throw new ExpressError(400, "Send valid listing data");
    }

    const listingData = { ...req.body.listing };

    if (listingData.image) {
      listingData.image = {
        filename: "listingimage",
        url: listingData.image,
      };
    } else {
      delete listingData.image;
    }

    const newListing = new Listing(listingData);
    await newListing.save();
    res.redirect("/listings");
  })
);

app.get(
  "/listings/:id/edit",
  wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const foundListing = await Listing.findById(id);

    if (!foundListing) {
      return next(new ExpressError(404, "Listing not found"));
    }

    res.render("listings/edit.ejs", { listing: foundListing });
  })
);

app.put(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listingData = { ...req.body.listing };

    if (listingData.image) {
      listingData.image = {
        filename: "listingimage",
        url: listingData.image,
      };
    } else {
      delete listingData.image;
    }

    await Listing.findByIdAndUpdate(id, listingData);
    res.redirect(`/listings/${id}`);
  })
);

app.delete(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
  })
);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

async function startServer() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to database.");

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("MongoDB connection failed.");
    console.error("Make sure MongoDB is running on mongodb://localhost:27017");
    console.error(err.message);
  }
}

startServer();
