# API Reference

This project uses server-rendered Express routes. Most write operations redirect after success.

## Base URL

```text
http://localhost:8080
```

## Route List

### `GET /`

Returns a simple text response.

### `GET /listings`

Renders the page that shows all listings.

### `GET /listings/new`

Renders the form used to create a new listing.

### `POST /listings`

Creates a new listing.

Body type:

```text
x-www-form-urlencoded
```

Required keys:

- `listing[title]`
- `listing[description]`
- `listing[price]`
- `listing[country]`
- `listing[location]`

Optional key:

- `listing[image]`

Example:

```text
listing[title]=Sea View Villa
listing[description]=Beautiful place near the beach
listing[image]=https://images.unsplash.com/photo-1505693416388-ac5ce068fe85
listing[price]=2500
listing[country]=India
listing[location]=Goa
```

Success behavior:

- saves the document in MongoDB
- redirects to `/listings`

### `GET /listings/:id`

Renders the details page for one listing.

### `GET /listings/:id/edit`

Renders the edit page for one listing.

### `PUT /listings/:id`

Updates an existing listing.

Because the browser form uses method override, you can test it with:

```text
POST /listings/:id?_method=PUT
```

Body type:

```text
x-www-form-urlencoded
```

Expected fields:

- `listing[title]`
- `listing[description]`
- `listing[price]`
- `listing[country]`
- `listing[location]`

Note:

The edit form currently sends `listing.url` for the image instead of `listing[image]`, so image updates may not behave consistently with the schema.

### `DELETE /listings/:id`

Deletes an existing listing.

You can test it with:

```text
POST /listings/:id?_method=DELETE
```

Success behavior:

- removes the listing from MongoDB
- redirects to `/listings`

## Postman Testing Guide

### Create a listing

- Method: `POST`
- URL: `http://localhost:8080/listings`
- Body: `x-www-form-urlencoded`

### Update a listing

- Method: `POST`
- URL: `http://localhost:8080/listings/<LISTING_ID>?_method=PUT`
- Body: `x-www-form-urlencoded`

### Delete a listing

- Method: `POST`
- URL: `http://localhost:8080/listings/<LISTING_ID>?_method=DELETE`

## Response Type Summary

- `GET` routes: HTML pages or plain text
- `POST` create: redirect response
- `PUT` update: redirect response
- `DELETE` delete: redirect response

## Validation Notes

The project includes a Joi schema in `schema.js`, but the validation middleware is not currently applied in the create and update routes.
