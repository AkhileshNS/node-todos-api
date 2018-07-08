var mongoose = require('mongoose');
var validator = require('validator');
var jwt = require('jsonwebtoken');
var _ = require('lodash');

var UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.methods.toJSON = function () {
    var user = this;
    var userObj = user.toObject();

    return _.pick(userObj, ['email','_id']);
}

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = `auth`;
    var obj = {
        _id: user._id.toHexString(), 
        access
    };

    var token = jwt.sign(obj, "TheSecret");

    user.tokens.push({access, token});

    return user.save().then(() => {
        return token;
    });
};

var User = mongoose.model('User', UserSchema);

module.exports = {User};