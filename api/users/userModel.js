import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const Schema = mongoose.Schema;

function checkPassword(str)
{
  var regularExpression = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/);
  return regularExpression.test(str);
}

  const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true},
    password: {type: String, required: true },
    favourites: {type:Array}
  });
  
  UserSchema.statics.findByUserName = function (username) {
    return this.findOne({ username: username });
  };

  UserSchema.statics.findByFavoriteID = function (id) {
    return this.findOne({ id: id });
  };

  UserSchema.methods.comparePassword = function (passw, callback) {
    bcrypt.compare(passw, this.password, (err, isMatch) => {
      if (err) {
        return callback(err);
      }
      callback(null, isMatch);
    });
  };

  UserSchema.pre('save', function(next) {
    const user = this;
    if (this.isModified('password') || this.isNew) {
      if(!checkPassword(user.password)) {

        return next(err);
        
      }

        bcrypt.genSalt(10, (err, salt)=> {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, (err, hash)=> {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});
export default mongoose.model('User', UserSchema);