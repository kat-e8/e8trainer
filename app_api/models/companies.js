const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    comment: String,
    createdOn: {
        type: Date,
        'default': Date.now
    }
});

const companySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    address: String,
    contactPerson: String,
    industry: String,
    comments: [commentSchema]
});

mongoose.model('Company', companySchema);