DROP DATABASE IF EXISTS userreviews;
CREATE DATABASE userreviews;
\c userreviews;

CREATE TABLE users (
  firstName varchar(250),
  firstLetter varchar(250),
  numOfRatings varchar(250),
  topReviewer varchar(250),
  id SERIAL PRIMARY KEY
);

CREATE TABLE reviews (
  reviewID varchar(250),
  restaurantID varchar(250),
  starRating varchar(250),
  comments varchar(1200),
  ordered varchar(1200),
  date varchar(250),
  id SERIAL,
  FOREIGN KEY (id) REFERENCES users(id)
);


-- psql postgres -U daylanberry -f schema.sql
-- psql -U postgres -d template1 -f schema.sql