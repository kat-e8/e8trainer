const express = require('express');
const router = express.Router();

const ctrlCourses = require('../controllers/courses');
const ctrlCourseStudents = require('../controllers/courseStudents');
const ctrlStudentComments = require('../controllers/studentComments');
const ctrlCompanies = require('../controllers/companies');
const ctrlCompanyComments = require('../controllers/companyComments');
const ctrlCourseComments = require('../controllers/courseComments');

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
    .route('/courses/:courseid/students/search')
    .get(ctrlCourseStudents.searchForStudent);


router
    .route('/courses/:courseid/students/:studentid')
    .get(ctrlCourseStudents.courseStudentsReadOne)
    .put(ctrlCourseStudents.courseStudentsUpdateOne)
    .delete(ctrlCourseStudents.courseStudentsDeleteOne);

router
    .route('/courses/:courseid/students/:studentid/comments')
    .post(ctrlStudentComments.commentsCreateOne);

router
    .route('/courses/:courseid/comments')
    .post(ctrlCourseComments.courseCommentsCreateOne);

///Company
router
    .route('/companies')
    .get(ctrlCompanies.companiesReadAll)
    .post(ctrlCompanies.companiesCreateOne);

router
    .route('/companies/:companyid')
    .get(ctrlCompanies.companiesReadOne)
    .put(ctrlCompanies.companiesUpdateOne)
    .delete(ctrlCompanies.companiesDeleteOne);


router
    .route('/companies/:companyid/comments')
    .post(ctrlCompanyComments.companyCommentsCreateOne);

router
    .route('/companies/:companyid/comments/:commentid')
    .get(ctrlCompanyComments.companyCommentsReadOne)
    .put(ctrlCompanyComments.companyCommentsUpdateOne)
    .delete(ctrlCompanyComments.companyCommentsDeleteOne);


module.exports = router;