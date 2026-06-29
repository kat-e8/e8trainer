const mongoose = require('mongoose');
const Course = mongoose.model('Course');
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

const commentsCreateOne = (req, res) => {
    courseid = req.params.courseid;
    if(courseid){
        Course
            .findById(courseid)
            .then((course) => {
                if(course.students && course.students.length > 0) {
                    student = course.students.id(req.params.studentid);
                    if(!student){
                        return res
                            .status(404)
                            .json({"message": "student not found"});
                    } else {
                        doAddComment(req, res, course, student);
                    }
                }
            }).catch((err) => {
                return res
                        .status(404)
                        .json({"message": "course not found"});
            });
    }
    else{
        return res
                .status(404)
                .json({"message": "supply course id"});
    }
};



const doAddComment = (req, res, course, student) => {

    if(!course){
        return res
                .status(404)
                .json({"message":"course not found"});
    } else {
        if(!student) {
            return res
                    .status(404)
                    .json("student not found")
        } else {
            const { comment } = req.body;
            student.comments.push({
                comment
            });
            student
                .save()
                .then((student) => {
                    const thisComment = student.comments.slice(-1).pop();
                    course
                        .save()
                        .then((course) => {
                            return res
                            .status(201)
                            .json(thisComment);
                        });
                    
                }).catch((err) => {
                    return res
                            .status(400)
                            .json(err);
                });
        }
    }
}

module.exports = {
    commentsReadOne,
    commentsUpdateOne,
    commentsDeleteOne,
    commentsCreateOne
};