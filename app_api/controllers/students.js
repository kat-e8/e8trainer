const mongoose = require('mongoose');
const Student = mongoose.model('Student')

const studentsReadOne = (req, res) => {
    Student
        .findById(req.params.studentid)
        .then((student) => {
            if (!student) {
                return res
                    .status(404)
                    .json({"message": "student not found."});
            }
            else {
                return res
                    .status(200)
                    .json(student);
            }
        }).catch((err) => {
            return res
                .status(404)
                .json({"message": "studentid not found"});
        });
};

const studentsListByDataset = (req, res) => {
    Student
        .find()
        .then((students) => {
            if(students && students.length > 0){
                return res
                        .status(200)
                        .json(students)
            }
        })
        .catch((err) => {
                return res
                    .status(404)
                    .json({"message": "student list empty"});
        });

};

const studentsUpdateOne = (req, res) => {
    if(!req.params.studentid){
        return res
                .status(404)
                .json({"message": "student not found, student id required."});
    } else {
        Student
            .findById(req.params.studentid)
            .select('-annotations')
            .then((student) => {
                if(req.body.name){
                    student.name = req.body.name;
                }
                if(req.body.description){
                    student.description = req.body.description;
                }
                if(req.body.quality){
                    student.quality = req.body.quality;                
                }
                if(req.body.value){
                    student.value = req.body.value;
                }
                if(req.body.tvs){
                    student.tvs = req.body.tvs;
                }
                student
                    .save()
                    .then((student) => {
                        return res
                                .status(200)
                                .json(student);
                    }).catch((err)=> {
                        return res
                                .status(404)
                                .json({"message": "studentid not found"});
                    });

            }).catch((err) => {
                return res
                        .status(400)
                        .json(err);
            });
    }
};

const studentsCreate = (req, res) => {
    Student
        .create({
            name: req.body.name,
            role: req.body.role,
            company: req.body.company,
            qualification: req.body.qualification,

        }).then((student) => {
            return res
                    .status(201)
                    .json(student);

        }).catch((err) => {
            return res
                    .status(400)
                    .json(err);
        });
    };

const studentsDeleteOne = (req, res) => {
    const {studentid} = req.params;
    if(studentid){
        Student
            .findByIdAndDelete(studentid)
            .then((student) => {
                return res
                        .status(204)
                        .json(null);

            }).catch((err) => {
                return res
                        .status(404)
                        .json({"message": "student not found"});
            });
    } else {
        return res
                .status(404)
                .json({"message": "student id required"});
    }
};

const findStudentByName = (req, res) => {
    const studentName = req.params.name;
    Student
        .find({name: studentName})
        .select('name _id')
        .then((student) => {
            if(student && student.length > 0){
                return res
                    .status(200)
                    .json(student);
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
    studentsReadOne,
    studentsListByDataset,
    studentsUpdateOne,
    studentsCreate,
    studentsDeleteOne,
    findStudentByName
};