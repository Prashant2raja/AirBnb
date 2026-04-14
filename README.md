# WandrLust

WandrLust is a polished Airbnb-inspired listing platform built with Express, EJS, MongoDB, and Mongoose. The project focuses on presenting travel stays through a clean UI while demonstrating a full CRUD workflow backed by a local database.

## Overview

This project lets users:

- browse all listings
- open a listing detail page
- create new listings
- edit existing listings
- delete listings
- view supporting pages like Privacy and Terms

The interface is server-rendered, responsive, and designed to be portfolio-friendly when pushed to GitHub or shown during a demo.

## Tech Stack

- Node.js
- Express.js
- EJS
- EJS Mate
- MongoDB
- Mongoose
- Bootstrap 5
- Joi
- Method Override

## Features

- responsive landing page and listing UI
- MongoDB-backed listing storage
- seeded sample listing data
- create, read, update, and delete listing flow
- reusable layout, navbar, and footer components
- footer with social links and legal pages
- Bootstrap-assisted form validation
- improved project documentation and structure

## Project Structure

```text
AirBnb-main/
+-- app.js
+-- package.json
+-- package-lock.json
+-- README.md
+-- schema.js
+-- init/
¦   +-- data.js
¦   +-- index.js
+-- models/
¦   +-- Listing.js
+-- Utils/
¦   +-- ExpressError.js
¦   +-- wrapAsync.js
+-- public/
¦   +-- css/
¦   ¦   +-- style.css
¦   +-- js/
¦       +-- script.js
+-- views/
¦   +-- error.ejs
¦   +-- home.ejs
¦   +-- includes/
¦   ¦   +-- footer.ejs
¦   ¦   +-- navbar.ejs
¦   +-- layouts/
¦   ¦   +-- boilerplate.ejs
¦   +-- legal/
¦   ¦   +-- privacy.ejs
¦   ¦   +-- terms.ejs
¦   +-- listings/
¦       +-- edit.ejs
¦       +-- index.ejs
¦       +-- new.ejs
¦       +-- show.ejs
+-- docs/
    +-- API_REFERENCE.md
    +-- sample-listing.json
```

## What Each Folder Does

- `init/`: contains seed data and the script that inserts sample listings into MongoDB.
- `models/`: stores Mongoose schemas and models for the database.
- `Utils/`: reusable helpers for async error handling and custom application errors.
- `public/`: static assets loaded by the browser, including CSS and client-side JavaScript.
- `views/`: EJS templates used to render the UI.
- `views/includes/`: shared partials such as the navbar and footer.
- `views/layouts/`: base layout wrapper used across pages.
- `views/legal/`: simple static support pages.
- `views/listings/`: listing-specific pages for index, create, edit, and detail views.
- `docs/`: extra project documentation and example payloads.

## Database Setup

The project connects to:

```text
mongodb://localhost:27017/wanderlust
```

Database name:

```text
wanderlust
```

Collection used by the app:

```text
listings
```

## Installation

### 1. Install dependencies

```bash
npm install
```

### 2. Start MongoDB locally

Make sure MongoDB is running before starting the app.

### 3. Seed sample data

```bash
npm run seed
```

This loads the listings from `init/data.js` into `wanderlust.listings`.

### 4. Start the application

```bash
npm start
```

### 5. Open in the browser

```text
http://localhost:3000/
```

For all listings:

```text
http://localhost:3000/listings
```

## Available Routes

| Method | Route | Purpose |
|---|---|---|
| GET | `/` | Landing page |
| GET | `/privacy` | Privacy page |
| GET | `/terms` | Terms page |
| GET | `/listings` | Show all listings |
| GET | `/listings/new` | New listing form |
| GET | `/listings/:id` | Listing details |
| POST | `/listings` | Create listing |
| GET | `/listings/:id/edit` | Edit listing form |
| PUT | `/listings/:id` | Update listing |
| DELETE | `/listings/:id` | Delete listing |

## Request Style

This project is a server-rendered Express application, not a pure JSON API.

That means:

- `GET` routes return rendered EJS pages
- `POST`, `PUT`, and `DELETE` routes redirect after success
- form submissions use `application/x-www-form-urlencoded`
- `PUT` and `DELETE` work through method override

## Demo Flow

A good presentation flow for this project is:

1. Open the landing page.
2. Visit `/listings` and browse the seeded cards.
3. Open any listing detail page.
4. Create a new listing.
5. Edit the new listing.
6. Delete the listing and return to the index page.

## Recent Improvements

- added a more professional, responsive visual design
- created legal support pages for footer links
- improved navbar and footer styling
- added social media links in the footer
- cleaned app startup and port handling
- improved edit flow for listing image URLs
- refreshed README structure and setup documentation
- removed unused temporary files from the project

## Known Limitations

- no authentication or user roles
- no booking or reservation system
- no cloud image upload integration
- no production environment configuration yet
- Joi validation is present but not fully wired as middleware
- no automated test suite yet

## Author

Prashant Kumar
