const express = require('express');
const router = express.Router();

const ctrlMain = require('../controllers/main');
const ctrlStudents = require('../controllers/students');
const ctrlOthers = require('../controllers/others');
const ctrlComments = require('../controllers/comments');
const ctrlCourses = require('../controllers/courses');
const ctrlCompanies = require('../controllers/companies');

/* GET home page. */
router.get('/', ctrlMain.index);

// /* Student Pages */
// router.get('/students/:studentid', ctrlStudents.readStudent);
// router.get('/add-student', ctrlStudents.openStudentForm);

// router
//     .route('/students')
//     .get(ctrlStudents.readStudents)
//     .post(ctrlStudents.openStudentForm);

// router
//     .route('/students/new')
//     .post(ctrlStudents.createStudent)

// router
//     .route('/students/:studentid/delete')
//     .get(ctrlStudents.deleteStudent);


// router
//     .route('/students/:studentid/comment/new')
//     .get(ctrlStudents.openCommentForm)
//     .post(ctrlStudents.createComment);



/* Course Pages */
router
    .route('/courses')
    .get(ctrlCourses.readCourses)
    .post(ctrlCourses.openCourseForm);

router
    .route('/courses/new')
    .post(ctrlCourses.createCourse);

router.get('/courses/:courseid', ctrlCourses.readCourse);
router.get('/add-course', ctrlCourses.openCourseForm);


router
    .route('/courses/:courseid/update')
    .get(ctrlCourses.openCourseUpdateForm)
    .post(ctrlCourses.updateCourse);

router
    .route('/courses/:courseid/delete')
    .get(ctrlCourses.openCourseDeleteForm)
    .post(ctrlCourses.deleteCourse);

router
    .route('/courses/:courseid/comments')
    .get(ctrlCourses.commentsReadCourse);

router
    .route('/courses/:courseid/students')
    .get(ctrlCourses.newReadCourse);

router
    .route('/courses/:courseid/students/:studentid/update')
    .get(ctrlCourses.openStudentUpdateForm)
    .post(ctrlCourses.updateStudent);

router
    .route('/courses/:courseid/students/new')
    .get(ctrlCourses.openCourseStudentForm)
    .post(ctrlCourses.createCourseStudent);

router
    .route('/courses/:courseid/comments/new')
    .get(ctrlCourses.openCourseCommentForm)
    .post(ctrlCourses.createCourseComment);

router
    .route('/courses/:courseid/students/:studentid')
    .get(ctrlCourses.readCourseStudent);

router
    .route('/courses/:courseid/students/:studentid/comment/new')
    .get(ctrlCourses.openStudentCommentForm)
    .post(ctrlCourses.createStudentComment);


router
    .route('/courses/:courseid/students/:studentid/delete')
    .get(ctrlCourses.openStudentDeleteForm)
    .post(ctrlCourses.deleteStudent);

router
    .route('/courses/:courseid/students/search')
    .post(ctrlCourses.readSearchedCourseStudents);

router
    .route('/courses/search')
    .post(ctrlCourses.readSearchedCourses);


/* About Page*/
router.get('/about', ctrlOthers.about)

module.exports = router;


/* Companies Pages */
router
    .route('/companies')
    .get(ctrlCompanies.readCompanies)
    .post(ctrlCompanies.openCompanyForm);

router
    .route('/companies/new')
    .post(ctrlCompanies.createCompany);

router.get('/companies/:companyid', ctrlCompanies.readCompany);
router.get('/add-company', ctrlCompanies.openCompanyForm);


router
    .route('/companies/:companyid/update')
    .get(ctrlCompanies.openCompanyUpdateForm)
    .post(ctrlCompanies.updateCompany);

router
    .route('/companies/:companyid/delete')
    .get(ctrlCompanies.openCompanyDeleteForm)
    .post(ctrlCompanies.deleteCompany);

router
    .route('/companies/:companyid/comments/:commentid/update')
    .get(ctrlCompanies.openCommentUpdateForm)
    .post(ctrlCompanies.updateComment);
    
router
    .route('/companies/:companyid/comments/new')
    .get(ctrlCompanies.openCompanyCommentForm)
    .post(ctrlCompanies.createCompanyComment);
    
router
    .route('/companies/:companyid/comments/:commentid')
    .get(ctrlCompanies.readCompanyComment);

router
    .route('/companies/search')
    .post(ctrlCompanies.readSearchedCompanies);
