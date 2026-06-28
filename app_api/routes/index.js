const express = require('express');
const router = express.Router();

const ctrlStudents = require('../controllers/students');
const ctrlComments = require('../controllers/comments');

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

module.exports = router;