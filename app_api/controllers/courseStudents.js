const mongoose = require('mongoose');
const Course = mongoose.model('Course');

const courseStudentsReadOne = (req, res) => {
   Course
        .findById(req.params.courseid)
        .then((course) => {
            if (course.students && course.students.length > 0) {
                courseStudent = course.students.id(req.params.studentid)
                if(!courseStudent){
                    return res
                        .status(404)
                        .json({"message": "courseStudent not found"});
                }
                else{
                    response = {
                        course : {
                            name: course.name,
                            id: req.params.studentid
                        },
                        courseStudent
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

const courseStudentsUpdateOne = (req, res) => {
    if(!req.params.courseid || !req.params.studentid){
        return res
                .status(400)
                .json({"message": "course id and courseStudent id required"});
    } else {
        Course
        .findById(req.params.courseid)
        .select('students')
        .then((course) => {
            if (course.students && course.students.length > 0) {
                courseStudent = course.students.id(req.params.studentid);
                if(!courseStudent){
                    return res
                        .status(404)
                        .json({"message": "courseStudent not found"});
                }
                else{
                    if(req.body.name){
                        courseStudent.name = req.body.name;
                    }
                    if(req.body.description){
                        courseStudent.description = req.body.description;
                    }
                    if(req.body.role){
                        courseStudent.role = req.body.role;
                    }
                    if(req.body.company){
                        courseStudent.company = req.body.company;
                    }
                    if(req.body.qualification){
                        courseStudent.qualification = req.body.qualification;
                    }
                    if(req.body.rating){
                        courseStudent.rating = req.body.rating;
                    }
                    course
                        .save()
                        .then((course) => {
                            return res
                                    .status(200)
                                    .json(courseStudent);

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

const courseStudentsDeleteOne = (req, res) => {
    if(!req.params.courseid || !req.params.studentid){
        return res
                .status(400)
                .json({"message": "course id and courseStudent id required"});
    } else {
        Course
        .findById(req.params.courseid)
        .select('students')
        .then((course) => {
            if (course.students && course.students.length > 0) {
                courseStudent = course.students.id(req.params.studentid)
                if(!courseStudent){
                    return res
                        .status(404)
                        .json({"message": "courseStudent not found"});
                }
                else{
                    course.students.id(req.params.studentid).deleteOne();
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

const courseStudentsCreateOne = (req, res) => {
    console.log('naam...' + req.body)
    courseid = req.params.courseid;
    if(courseid){
        Course
            .findById(courseid)
            .then((course) => {
                doAddCourseStudent(req, res, course);

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

const doAddCourseStudent = (req, res, course) => {
    if(!course){
        return res
                .status(404)
                .json({"message":"course not found"});
    } else {
        const { name, description, company, role, qualification } = req.body;
        course.students.push({
            name,
            description,
            company,
            role,
            qualification 
        });
        course
            .save()
            .then((course) => {
                const thisCourseStudent = course.students.slice(-1).pop();
                return res
                        .status(201)
                        .json(thisCourseStudent);

            }).catch((err) => {
                return res
                        .status(400)
                        .json(err);
            });
    }
}

module.exports = {
    courseStudentsReadOne,
    courseStudentsUpdateOne,
    courseStudentsDeleteOne,
    courseStudentsCreateOne
};