const mongoose = require('mongoose');
const Student = mongoose.model('Student');

const commentsReadOne = (req, res) => {
   Student
        .findById(req.params.studentid)
        .then((student) => {
            if (student.comments && student.comments.length > 0) {
                comment = student.comments.id(req.params.commentid)
                if(!comment){
                    return res
                        .status(404)
                        .json({"message": "comment not found"});
                }
                else{
                    response = {
                        student : {
                            name: student.name,
                            id: req.params.studentid
                        },
                        comment
                    }
                    return res
                            .status(200)
                            .json(response);
                }
            }
        }).catch((err) => {
            return res
                .status(404)
                .json({"message": "student not found"});
        });

};

const commentsUpdateOne = (req, res) => {
    if(!req.params.studentid || !req.params.commentid){
        return res
                .status(400)
                .json({"message": "student id and comment id required"});
    } else {
        Student
        .findById(req.params.studentid)
        .select('comments')
        .then((student) => {
            if (student.comments && student.comments.length > 0) {
                comment = student.comments.id(req.params.commentid)
                if(!comment){
                    return res
                        .status(404)
                        .json({"message": "comment not found"});
                }
                else{
                    if(req.body.author){
                        comment.author = req.body.author;
                    }
                    if(req.body.comment){
                        comment.comment = req.body.comment;
                    }
                    student
                        .save()
                        .then((student) => {
                            return res
                                    .status(200)
                                    .json(comment);

                        }).catch((err) => {
                            return res
                                    .status(404)
                                    .json({"message": "could not save changes."});
                        });   
                }
            }
        }).catch((err) => {
            return res
                .status(404)
                .json({"message": "student not found"});
        });

    }

};

const commentsDeleteOne = (req, res) => {
    if(!req.params.studentid || !req.params.commentid){
        return res
                .status(400)
                .json({"message": "student id and comment id required"});
    } else {
        Student
        .findById(req.params.studentid)
        .select('comments')
        .then((student) => {
            if (student.comments && student.comments.length > 0) {
                comment = student.comments.id(req.params.commentid)
                if(!comment){
                    return res
                        .status(404)
                        .json({"message": "comment not found"});
                }
                else{
                    student.comments.id(req.params.commentid).deleteOne();
                    student
                        .save()
                        .then((out) => {
                            return res
                                    .status(204)
                                    .json(null);

                        }).catch((err) => {
                            return res
                                    .status(404)
                                    .json({err});
                        });   
                }
            }
        }).catch((err) => {
            return res
                .status(404)
                .json({"message": "student not found"});
        });

    }  
};

const commentsCreate = (req, res) => {
    studentid = req.params.studentid;
    if(studentid){
        Student
            .findById(studentid)
            .then((student) => {
                doAddcomment(req, res, student);

            }).catch((err) => {
                return res
                        .status(404)
                        .json({"message": "student not found"});
            });
    }
    else{
        return res
                .status(404)
                .json({"message": "supply student id"});
    }
};

const doAddcomment = (req, res, student) => {
    if(!student){
        return res
                .status(404)
                .json({"message":"student not found"});
    } else {
        const { author, comment } = req.body;
        student.comments.push({
            author,
            comment
        });
        student
            .save()
            .then((student) => {
                const thiscomment = student.comments.slice(-1).pop();
                return res
                        .status(201)
                        .json(thiscomment);

            }).catch((err) => {
                return res
                        .status(400)
                        .json(err);
            });
    }
}

module.exports = {
    commentsReadOne,
    commentsUpdateOne,
    commentsDeleteOne,
    commentsCreate
};