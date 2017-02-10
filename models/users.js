var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
SALT_WORK_FACTOR = 10;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

var userSchema = mongoose.Schema({
  email: {type:String, required:true, unique:true},
  name: {type:String, required:true},
  pass: {type:String, required:true},
  phone: {type:String, required:true},
  dept: String,
  schedule: Object,
  is_updated : Boolean,
  password_reset_code : String
});

userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('pass')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.pass, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.pass = hash;
            next();
        });
    });
});

module.exports = mongoose.model('User', userSchema);
