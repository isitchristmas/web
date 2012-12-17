#!/usr/bin/env node

// Load in MaxMind's IP address block to country code database.
// Either the free or paid one will work.
//
// Provide the location of the country code CSV as the main command line argument.
//
// Run this script from the root dir of the project.

var setupCollection = function(db) {
  // 1) connect to the collection, 
  // 2) clear it,
  // 3) ensure indexes
  // 4) pass it on!

  db.collection("blocks", function(error, collection) {
    console.log("Emptying blocks...");
    collection.remove({}, {safe: true}, function(err, result) {
      console.log("Cleared " + result + " IP block rows.");

      collection.ensureIndex({ip_start: 1}, {}, function(err, indexName) {
        console.log("Created/ensured index " + indexName + " on blocks");
        readCSV(collection);
      });
    });
  });
};

// read in the given CSV, parse each row, store it
var readCSV = function(collection) {
  var filename = args._[0];

  if (!filename) {
    console.log("Supply a CSV filename as a command line argument.")
    process.exit(1);
  }


  console.log("Reading CSV from " + filename + ":");
  csv()
    .from.stream(fs.createReadStream(filename))
    .on('record', function(row, index) {
      doc = {
        ip_start: new mongo.mongodb.Long(row[2]),
        ip_end: new mongo.mongodb.Long(row[3]),
        country: row[4]
      };

      console.log("#" + index + " " + JSON.stringify(doc));

      collection.insert(doc, {safe: true}, function(err, result) {
        if (err) console.log("Error inserting row: " + err);
      })
    })
    .on('end', function(count) {
      console.log("Finished, lines: " + count);
      process.exit(0);
    });
};


// setup

var env = process.env.NODE_ENV || "development"
  , args = require('optimist').argv
  , fs = require('fs')
  , csv = require('csv')
  , config = require('../config')[env]
  , mongo = require('../mongo');

if (!args._[0]) {
  console.log("Supply a CSV filename as a command line argument.")
  process.exit(1);
}

mongo.connect(config.mongodb, setupCollection);
