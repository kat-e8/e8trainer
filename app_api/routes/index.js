const express = require('express');
const router = express.Router();

const ctrlStudents = require('../controllers/students');
const ctrlComments = require('../controllers/comments');
const ctrlCourses = require('../controllers/courses');
const ctrlCourseStudents = require('../controllers/courseStudents');
const ctrlStudentComments = require('../controllers/studentComments');
// students
router
    .route('/students')
    .get(ctrlStudents.studentsListByDataset)
    .post(ctrlStudents.studentsCreate);
router
    .route('/students/:studentid')
    .get(ctrlStudents.studentsReadOne)
    .put(ctrlStudents.studentsUpdateOne)
    .delete(ctrlStudents.studentsDeleteOne);

router
    .route('/students/find/:name')
    .get(ctrlStudents.findStudentByName);

//comments
router
    .route('/students/:studentid/comments/')
    .post(ctrlComments.commentsCreate);

router
    .route('/students/:studentid/comments/:commentid')
    .get(ctrlComments.commentsReadOne)
    .put(ctrlComments.commentsUpdateOne)
    .delete(ctrlComments.commentsDeleteOne);


router
    .route('/courses')
    .get(ctrlCourses.coursesReadAll)
    .post(ctrlCourses.coursesCreateOne);

router
    .route('/courses/:courseid')
    .get(ctrlCourses.coursesReadOne)
    .put(ctrlCourses.coursesUpdateOne)
    .delete(ctrlCourses.coursesDeleteOne);

router
    .route('/courses/:courseid/students')
    .post(ctrlCourseStudents.courseStudentsCreateOne);

router
    .route('/courses/:courseid/students/:studentid')
    .get(ctrlCourseStudents.courseStudentsReadOne)
    .put(ctrlCourseStudents.courseStudentsUpdateOne)
    .delete(ctrlCourseStudents.courseStudentsDeleteOne);

router
    .route('/courses/:courseid/students/:studentid/comments')
    .post(ctrlStudentComments.commentsCreateOne);

module.exports = router;