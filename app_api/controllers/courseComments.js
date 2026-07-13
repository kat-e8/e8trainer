const mongoose = require('mongoose');
const Course = mongoose.model('Course');

const courseCommentsReadOne = (req, res) => {
   Course
        .findById(req.params.courseid)
        .then((course) => {
            if (course.comments && course.comments.length > 0) {
                courseComment = course.comments.id(req.params.commentid)
                if(!courseComment){
                    return res
                        .status(404)
                        .json({"message": "courseComment not found"});
                }
                else{
                    response = {
                        course : {
                            name: course.name,
                            id: req.params.commentid
                        },
                        courseComment
                    }
                    return res
                            .status(200)
                            .json(response);
                }
            }
        }).catch((err) => {
            return res
                .status(404)
                .json({"message": "course not found"});
        });

};

const courseCommentsUpdateOne = (req, res) => {
    if(!req.params.courseid || !req.params.commentid){
        return res
                .status(400)
                .json({"message": "course id and courseComment id required"});
    } else {
        Course
        .findById(req.params.courseid)
        .select('comments')
        .then((course) => {
            if (course.comments && course.comments.length > 0) {
                courseComment = course.comments.id(req.params.commentid);
                if(!courseComment){
                    return res
                        .status(404)
                        .json({"message": "courseComment not found"});
                }
                else{
                    if(req.body.name){
                        courseComment.comment = req.body.comment;
                    }
                    course
                        .save()
                        .then((course) => {
                            return res
                                    .status(200)
                                    .json(courseComment);

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
                .json({"message": "course not found"});
        });
    }
};

const courseCommentsDeleteOne = (req, res) => {
    if(!req.params.courseid || !req.params.commentid){
        return res
                .status(400)
                .json({"message": "course id and courseComment id required"});
    } else {
        Course
        .findById(req.params.courseid)
        .select('comments')
        .then((course) => {
            if (course.comments && course.comments.length > 0) {
                courseComment = course.comments.id(req.params.commentid)
                if(!courseComment){
                    return res
                        .status(404)
                        .json({"message": "courseComment not found"});
                }
                else{
                    course.comments.id(req.params.commentid).deleteOne();
                    course
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
                .json({"message": "course not found"});
        });

    }  
};

const courseCommentsCreateOne = (req, res) => {
    courseid = req.params.courseid;
    if(courseid){
        Course
            .findById(courseid)
            .then((course) => {
                doAddCourseComment(req, res, course);

            }).catch((err) => {
                //console.log(req.params.courseid);
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

const doAddCourseComment = (req, res, course) => {
    if(!course){
        return res
                .status(404)
                .json({"message":"course not found"});
    } else {
        const { comment } = req.body;
        course.comments.push({
           comment 
        });
        course
            .save()
            .then((course) => {
                const thisCourseComment = course.comments.slice(-1).pop();
                return res
                        .status(201)
                        .json(thisCourseComment);

            }).catch((err) => {
                return res
                        .status(400)
                        .json(err);
            });
    }
}

module.exports = {
    courseCommentsReadOne,
    courseCommentsUpdateOne,
    courseCommentsDeleteOne,
    courseCommentsCreateOne
};