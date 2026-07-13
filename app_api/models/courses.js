require('../models/students');

const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    author: String,
    comment: String,
    createdOn: {
        type: Date,
        'default': Date.now
    }
});


const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    role: String,
    company: String,
    qualification: String,
    rating: {
        type: Number,
        'default': 0
    }, 
    comments: [commentSchema],
    course: String
});


const courseSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desciption: String,
    startDate: Date,
    endDate: Date,
    rating: {
        type: Number,
        'default': 0
    }, 
    students: [studentSchema],
    comments: [commentSchema]
});

mongoose.model('Course', courseSchema);