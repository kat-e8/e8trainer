const express = require('express');
const router = express.Router();

const ctrlMain = require('../controllers/main');
const ctrlStudents = require('../controllers/students');
const ctrlOthers = require('../controllers/others');
const ctrlComments = require('../controllers/comments');

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

/* About Page*/
router.get('/about', ctrlOthers.about)

module.exports = router;
