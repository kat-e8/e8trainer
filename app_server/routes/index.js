const express = require('express');
const router = express.Router();

const ctrlMain = require('../controllers/main');
const ctrlStudents = require('../controllers/students');
const ctrlOthers = require('../controllers/others');
const ctrlComments = require('../controllers/comments');
const ctrlCourses = require('../controllers/courses');

/* GET home page. */
router.get('/', ctrlMain.index);

/* Student Pages */
router.get('/students/:studentid', ctrlStudents.readStudent);
router.get('/add-student', ctrlStudents.openStudentForm);

router
    .route('/students')
    .get(ctrlStudents.readStudents)
    .post(ctrlStudents.openStudentForm);

router
    .route('/students/new')
    .post(ctrlStudents.createStudent)

router
    .route('/students/:studentid/delete')
    .get(ctrlStudents.deleteStudent);


router
    .route('/students/:studentid/comment/new')
    .get(ctrlStudents.openCommentForm)
    .post(ctrlStudents.createComment);



/* Course Pages */
router.get('/courses/:courseid', ctrlCourses.readCourse);
router.get('/add-course', ctrlCourses.openCourseForm);

router
    .route('/courses')
    .get(ctrlCourses.readCourses)
    .post(ctrlCourses.openCourseForm);

router
    .route('/courses/new')
    .post(ctrlCourses.createCourse)

router
    .route('/courses/:courseid/update')
    .get(ctrlCourses.openCourseUpdateForm)
    .post(ctrlCourses.updateCourse);

router
    .route('/courses/:courseid/delete')
    .get(ctrlCourses.openCourseDeleteForm);

router
    .route('/courses/:courseid/delete/new')
    .post(ctrlCourses.deleteCourse);


router
    .route('/courses/:courseid/students/:studentid/update')
    .get(ctrlCourses.openStudentUpdateForm)
    .post(ctrlCourses.updateStudent);

router
    .route('/courses/:courseid/students/new')
    .get(ctrlCourses.openCourseStudentForm)
    .post(ctrlCourses.createCourseStudent);

router
    .route('/courses/:courseid/students/:studentid')
    .get(ctrlCourses.readCourseStudent);

router
    .route('/courses/:courseid/students/:studentid/comment/new')
    .get(ctrlCourses.openStudentCommentForm)
    .post(ctrlCourses.createStudentComment);


router
    .route('/courses/:courseid/students/:studentid/delete')
    .get(ctrlCourses.deleteStudent);

/* About Page*/
router.get('/about', ctrlOthers.about)

module.exports = router;
