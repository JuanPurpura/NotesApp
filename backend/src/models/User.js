const { Schema, model} = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    }
}, {
    timestamps: true
});

module.exports = model('User', userSchema);