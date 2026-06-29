const mongoose = require('mongoose')


const commentSchema = mongoose.Schema({
    author: String,
    comment: String,
    createdOn: {
        type: Date,
        'default': Date.now
    }
});

mongoose.model('Comment', commentSchema);


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


mongoose.model('Student', studentSchema);