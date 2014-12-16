
module.exports = function(app, config) {

    var UNAUTHORIZED_RESPONSE = {
        "errors": [
            {"message": "No thank you."}
        ]
    };

    // if a client secret is set, gate access to some methods
    var authed = function(req) {
        var secret = config.ifttt;
        if (!secret) {
            console.log("No client secret set, not checking auth.");
            return true;
        }

        return req.get("IFTTT-Channel-Key") == secret;
    };

    // IFTTT posts JSON
    app.use(bodyParser.json())

    // Heartbeat
    app.get('/', function(req, res) {res.send("I'm alive!");});

    // Trigger
    // https://ifttt.com/developers/docs/protocol_reference#triggers
    app.post('/ifttt/v1/triggers/:trigger', function(req, res) {
        console.log("trigger: " + req.params.trigger);

        if (!authed(req)) return res.status(401).json(UNAUTHORIZED_RESPONSE);

        if (req.body.limit === 0)
            res.json({"data": []});
        else {

            // req.body.triggerFields,
            // req.body.before,
            // req.body.after,
            // req.body.limit,
            // function(err, items) {
            //     if (err) return res.send(500, err);

            //     res.json({"data": items});
            // }

            res.json({
                data: [
                    {
                        answer: "YES",
                        meta: {
                            id: "christmas-2014",
                            timestamp: Date.now()
                        }
                    }
                ]
            });
        }
    });


    // Channel Status
    // https://ifttt.com/developers/docs/protocol_reference#channel-status
    app.get('/ifttt/v1/status', function(req, res) {
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
    app.post('/ifttt/v1/test/setup', function(req, res) {
        if (!authed(req)) return res.status(401).json(UNAUTHORIZED_RESPONSE);
        res.json({
            "data": {
                "samples": {}
            }
        });
    });

};
