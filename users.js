var sql      = require('msnodesql');
var conn_str = process.env.SQL_CONNECTION_STRING;
// var bcrypt = require('bcrypt');

function mapProfileToPassportProfile (userProfile) {
  var passportUser = {
    id: userProfile.id,
    displayName: userProfile.displayname,
    name: {
      familyName: userProfile.lastname,
      givenName:  userProfile.firstname
    }, 
    emails:   [{value: userProfile.email}],
    validPassword: function (pwd) {
      //Storing plain text passwords on a database is **VERY DISCOURAGED**.
      //Don't do this, seriously.
      return pwd === userProfile.password;
      
      // bcrypt is the best algorithm to salt passwords.
      // https://github.com/ncb000gt/node.bcrypt.js/
      // However this module requires openssl installed in your machine.
      // There are other less strong mechanism to salt passwords.
      // return bcrypt.compareSync(pwd, userProfile.password);
    }
  };

  return passportUser;
}


exports.findByName = function (name, callback) {
  sql.open(conn_str, function (err, conn) {
    if(err) return callback(err);
    conn.queryRaw("SELECT id, name, displayname, lastname, firstname, password, email FROM Users where name = ?", [name], function (err, results) {
      if(err) return callback(err);
      
      if(!results.rows[0]) return callback(null , null);

      //create an object from the array of properties + metadata.
      var userProfile = results.meta.reduce(function (prev, current, index) {
        prev[current.name] = results.rows[0][index];
        return prev;
      }, {});

      //map row to passport user schema
      passportUser = mapProfileToPassportProfile(userProfile);

      callback(null, passportUser);
    });
  });
};
