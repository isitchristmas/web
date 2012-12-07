var mongodb = require('mongodb');

module.exports = {
  mongodb: mongodb,
  connect: function(config, callback) {
    var db = new mongodb.Db(
        config.database, 
        new mongodb.Server(config.host, config.port, 
          {auto_reconnect: true}),
        {safe: true}
      );

    // open the database, auth if needed
    db.open(function(err, data) {
      if (data) {
        if (config.username && config.password) {
          data.authenticate(config.username, config.password, function(err2, status) {
            if (status)
              callback(data);
            else
              console.log("Error authenticating: " + err2);
          });
        } else
          callback(data);
      } else
        console.log("Error opening MongoDB: " + err);
    });
  }
};