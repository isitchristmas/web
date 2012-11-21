var mongodb = require('mongodb');

module.exports = {
  mongodb: mongodb,
  connect: function(config, callback) {
    var db = new mongodb.Db(
        config.database, 
        new mongodb.Server(config.host, config.port, 
          {auto_reconnect: true}),
        {safe: false}
      );

    // open the database, auth if needed
    db.open(function(err, data) {
      if (data) {
        if (config.username && config.password) {
          data.authenticate(config.username, config.password, function(data2, err2) {
            if (data2)
              callback(data2);
            else
              console.log("Error authenticating: " + err);
          });
        } else
          callback(data);
      } else
        console.log("Error opening MongodB: " + err);
    });
  }
};