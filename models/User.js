const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  passwordHashed: String
});

// example user:
// username: admin
// passwordHashed: $2a$10$pkTkA7ZdaHJo4F4MO.BTSONeEdHOrmwgvyq3WumdEPdv4KiNeAZxa

UserSchema.methods.comparePasswords = function (password) {
  return bcrypt.compareSync(password, '$2a$10$pkTkA7ZdaHJo4F4MO.BTSONeEdHOrmwgvyq3WumdEPdv4KiNeAZxa');
  // return bcrypt.compareSync(password, this.passwordHashed);
};

module.exports = mongoose.model('User', UserSchema);