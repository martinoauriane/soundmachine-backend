const bcrypt = require("bcrypt");

function hash_pwd(password: string) {
  const saltRounds = 10; // You can adjust this value as needed
  bcrypt.genSalt(saltRounds, function (err: Error, salt: string) {
    bcrypt.hash(password, salt, function (err: Error, hash: string) {
      if (err) {
        throw err;
      } else {
        return hash;
      }
    });
  });
}

export default hash_pwd;
