const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');


const UserSchema = mongoose.Schema({
    Name: {
        type: String
    },
    Phone: {
        type: String
    },
    Visited: {
        type: Number
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]

});

UserSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'randomstring')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token

}

module.exports = mongoose.model("user", UserSchema);