var express = require('express');
var router = express.Router();

var Christmas = require("./public/js/christmas"),
    zones = require("./public/js/zones"),
    time = require("time");

module.exports = function(app, config, findCountry) {

    var ERROR = function(message) {
        return {
            "errors": [
                {"message": message}
            ]
        }
    };

    var UNAUTHORIZED = "No thank you.",
        BAD_TRIGGER = "Invalid trigger.",
        BAD_TIMEZONE = "Invalid timezone.",
        BAD_COUNTRY = "Invalid country code."


    // if a client secret is set, gate access to some methods
    var authed = function(req) {
        var secret = config.ifttt;
        if (!secret) {
            console.log("No client secret set, not checking auth.");
            return true;
        }

        return req.get("IFTTT-Channel-Key") == secret;
    };

    // Every Christmas since 2007, in the given time zone,
    // to honor the site's history.
    var christmasesFor = function(country, timezone) {
        var firstYear = 2007; // nostalgia

        var now = new time.Date();
        now.setTimezone(timezone);

        var thisYear = 1900 + now.getYear();
        var years = thisYear - firstYear;

        var christmases = [];

        for (var i=0; i<=years; i++) {
            var year = thisYear - i; // reverse chronological order
            var christmasDay = Christmas.forYear(time, year, timezone);

            // only show christmases past
            if (now > christmasDay) {
                christmases.push({
                    answer: Christmas.yes(country),
                    christmas: true,
                    christmas_day: christmasDay.toISOString(),
                    christmas_time: (christmasDay.getTime() / 1000),
                    year: year,
                    id: "christmas-" + year,
                    timezone: timezone,
                    country: country,
                    country_names: Christmas.countries[country].names
                });
            }
        }

        return christmases;
    };

    // given a christmas object above, prepare it for IFTTT format
    var iftttFor = function(christmas) {
        return {
            answer: christmas.answer,
            year: christmas.year,
            created_at: christmas.christmas_day,
            meta: {
                // should only ever fire once a year
                id: christmas.id,
                timestamp: christmas.christmas_time,
            }
        }
    };

    // isitchristmas API.
    // Default to Esperanto and Greenwich Mean Time.
    router.get('/', function(req, res) {
        var country = findCountry(req) || "EO";
        if (!Christmas.countries[country]) return res.status(400).json(ERROR(BAD_COUNTRY));

        var timezone = (req.param("timezone") || "UTC");
        try {
            var test = new time.Date(2007, 12, 25, timezone);
        } catch (e) {
            // ODD BUT IMPORTANT:
            // time.Date will keep failing if not reset once with UTC.
            var test = new time.Date(2007, 12, 25, "UTC");
            return res.status(400).json(ERROR(BAD_TIMEZONE));
        }

        res.json({christmases: christmasesFor(country, timezone)})
    });

    router.get('/test', function(req, res) {
        res.send("The API is alive!");
    });

    router.post('/ifttt/v1/triggers/:trigger', function(req, res) {
        console.log("trigger: " + req.params.trigger);
        if (!authed(req)) return res.status(401).json(ERROR(UNAUTHORIZED));

        if (req.params.trigger != "christmas") return res.status(400).json(ERROR(BAD_TRIGGER));

        if (req.body.limit === 0)
            res.json({"data": []});
        else {
            // map IFTTT zone name to standard zone name
            var timezone;
            if (req.body.user)
                timezone = zones[req.body.user.timezone];
            else
                timezone = "UTC";

            // every christmas since 2007 in the user's time zone
            // for IFTTT, sadly I must just assume English
            var christmases = christmasesFor("US", timezone);

            var items = [];
            for (var i=0; i<christmases.length; i++)
                items.push(iftttFor(christmases[i]))

            // no more than 20 years of christmas data, tops
            items = items.slice(0, (req.body.limit || 20));

            res.json({"data": items});
        }
    });


    router.get('/ifttt/v1/status', function(req, res) {
        if (!authed(req)) return res.status(401).json(ERROR(UNAUTHORIZED));

        res.json({
            "data": {
                "status": "OK",
                "time": new Date().toISOString(),
                "message": "Everything is fine."
            }
        });
    });

    router.post('/ifttt/v1/test/setup', function(req, res) {
        if (!authed(req)) return res.status(401).json(ERROR(UNAUTHORIZED));
        res.json({
            "data": {
                "samples": {
                    "triggers": {
                        "christmas": {

                        }
                    }
                }
            }
        });
    });

    return router;

};
