const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const agentSchema = mongoose.Schema({

    numAgent: { type: Int32Array, required: true },
    grade: { type: String, required: true },
    password: { type: String, required: true },

});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Agent', agentSchema);