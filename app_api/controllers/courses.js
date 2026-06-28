require('../models/courses');

const mongoose = require('mongoose');
const Course = mongoose.model('Course');


const coursesReadAll = (req, res) => {
    console.log('reading all...');
    Course
        .find()
        .then((courses) => {
            if(courses && courses.length > 0){
                return res
                        .status(200)
                        .json(courses)
            }
        })
        .catch((err) => {
                return res
                    .status(404)
                    .json({"message": "course list empty"});
        });

};

const coursesReadOne = (req, res) => {
    console.log('reading one course...')
    Course
        .findById(req.params.courseid)
        .then((course) => {
            if (!course) {
                return res
                    .status(404)
                    .json({"message": "course not found."});
            }
            else {
                return res
                    .status(200)
                    .json(course);
            }
        }).catch((err) => {
            return res
                .status(404)
                .json({"message": "courseid not found"});
        });
};

const coursesUpdateOne = (req, res) => {
    if(!req.params.courseid){
        return res
                .status(404)
                .json({"message": "course not found, course id required."});
    } else {
        Course
            .findById(req.params.courseid)
            .select('-students')
            .then((course) => {
                if(req.body.name){
                    course.name = req.body.name;
                }
                if(req.body.startDate){
                    course.startDate = req.body.startDate;
                }
                if(req.body.endDate){
                    course.endDate = req.body.endDate;                
                }
                course
                    .save()
                    .then((course) => {
                        return res
                                .status(200)
                                .json(course);
                    }).catch((err)=> {
                        return res
                                .status(404)
                                .json({"message": "courseid not found"});
                    });

            }).catch((err) => {
                return res
                        .status(400)
                        .json(err);
            });
    }
};

const coursesCreateOne = (req, res) => {
    Course
        .create({
            name: req.body.name,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
        }).then((course) => {
            return res
                    .status(201)
                    .json(course);

        }).catch((err) => {
            return res
                    .status(400)
                    .json(err);
        });
    };

const coursesDeleteOne = (req, res) => {
    const {courseid} = req.params;
    if(courseid){
        Course
            .findByIdAndDelete(courseid)
            .then((course) => {
                return res
                        .status(204)
                        .json(null);

            }).catch((err) => {
                return res
                        .status(404)
                        .json({"message": "course not found"});
            });
    } else {
        return res
                .status(404)
                .json({"message": "course id required"});
    }
};

const findCourseByName = (req, res) => {
    const courseName = req.params.name;
    Course
        .find({name: courseName})
        .select('name _id')
        .then((course) => {
            if(course && course.length > 0){
                return res
                    .status(200)
                    .json(course);
            } else {
                return res
                        .status(404)
                        .json({});
            }
        }).catch((err) => {
            return res
                    .status(404)
                    .json({});
        });
};

module.exports = {
    coursesReadOne,
    coursesReadAll,
    coursesUpdateOne,
    coursesCreateOne,
    coursesDeleteOne,
    findCourseByName
};