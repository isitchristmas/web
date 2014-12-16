var express = require('express');
var router = express.Router();

var Christmas = require("./public/js/christmas");

module.exports = function(app, config) {

    var UNAUTHORIZED_RESPONSE = {
        "errors": [
            {"message": "No thank you."}
        ]
    };

    var BAD_TRIGGER = {
        "errors": [
            {"message": "Invalid trigger."}
        ]
    };

    var ONLY_TRIGGER = "christmas";

    // if a client secret is set, gate access to some methods
    var authed = function(req) {
        var secret = config.ifttt;
        if (!secret) {
            console.log("No client secret set, not checking auth.");
            return true;
        }

        return req.get("IFTTT-Channel-Key") == secret;
    };

    // Heartbeat
    router.get('/', function(req, res) {res.send("The API is alive!");});

    // Trigger
    // https://ifttt.com/developers/docs/protocol_reference#triggers
    router.post('/ifttt/v1/triggers/:trigger', function(req, res) {
        console.log("trigger: " + req.params.trigger);

        if (!authed(req)) return res.status(401).json(UNAUTHORIZED_RESPONSE);

        if (req.params.trigger != ONLY_TRIGGER) return res.status(400).json(BAD_TRIGGER);

        if (req.body.limit === 0)
            res.json({"data": []});
        else {
            console.log("trigger body: " + JSON.stringify(req.body, null, 2));

            var christmas = new Date();
            var year = 1900 + christmas.getYear();
            var items = [
                {
                    answer: "YES",
                    year: year,
                    meta: {
                        // should only ever fire once a year
                        id: "christmas-" + year,
                        timestamp: christmas.getTime(),
                    }
                }
            ];

            // no more than 20 years of christmas data, tops
            var items = items.slice(0, req.body.limit || 20);

            res.json({data: items});
        }
    });


    // Channel Status
    // https://ifttt.com/developers/docs/protocol_reference#channel-status
    router.get('/ifttt/v1/status', function(req, res) {
        if (!authed(req)) return res.status(401).json(UNAUTHORIZED_RESPONSE);

        res.json({
            "data": {
                "status": "OK",
                "time": new Date().toISOString(),
                "message": "Everything is fine."
            }
        });
    });

    // Test Setup
    // https://ifttt.com/developers/docs/testing#the-testsetup-endpoint
    router.post('/ifttt/v1/test/setup', function(req, res) {
        if (!authed(req)) return res.status(401).json(UNAUTHORIZED_RESPONSE);
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
