const request = require('request');

const apiOptions = {
    server: 'http://localhost:3000/api/'
};


const showError = (req, res, code) => {
    let title = '';
    let content = '';
    if(code === 404) {
        title = '404, page not found';
        content = 'Oh flip, looks like you can\'t find this page. Sorry.'
    } else {
        title = `${code}, something's gone wrong`;
        content = 'Something, somewhere has just gone a little bit wrong.'
    }
    res
      .status(code)
      .render('generic-text', {
        title: title,
        pageHeader: {
            title: title,
            strapline: ''
        },
        sideBar: '',
        content
      });
}


//list operations
const openStudentForm = (req, res) => {
    res.render('student-add-form', {
        title: 'Create Student',
        pageHeader: {
            title: 'Create Student',
            strapline: ''
        },
        sidebar: {
            content: 'Student attending calss.',
            callToAction: 'There are three end point levels - collection, document and subdocument. For each level we define appropriate crud operations'
        },
        error: req.query.err
    });
}

const createStudent = (req, res) => {
    const path = 'students';
    if(!req.body.name ||!req.body.role ||!req.body.company ||!req.body.qualification) {
        res.redirect('/students/new?err=val');
    } else {
        const formStudent = {
            name: req.body.name,
            role: req.body.role,
            company: req.body.company,
            qualification: req.body.qualification
        };
        const requestOptions = {
            url: `${apiOptions.server}${path}`,
            method: 'POST',
            json: formStudent
        };
        request(requestOptions, (err, {statusCode}, {name}) => {
            if(statusCode === 201) {
                res.redirect('/students');
            } else if(statusCode === 400) {
                res.redirect('/students/new?err=val');return;
            } else {
                showError(req, res, statusCode);
            }
        });    
    }
   
};

const renderStudentList = (req, res, students) => {
    let message = null;
    if(!(students instanceof Array)) {
        message = 'API lookup error';
        students = [];
    } else {
        if(!students.length) {
            message = 'no students found'
        }
    }
    res.render('student-list', {
        title: 'List of Students',
        pageHeader: {
            title: 'e8Trainer',
            strapline: 'Create and update Student records.'
        },
        sidebar: {
            context: 'side context'
        },
        students: students,
        message
    });

};

const readStudents = (req, res) => {
    const path = 'students';
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
    };
    request(requestOptions, (err, {statusCode}, students) => {
        let data = [];
        if(statusCode === 200) {
            data = students;
            renderStudentList(req, res, students);
        } else {
            showError(req, res, statusCode);
        }
    });
};

//instance operations
const renderStudent = (req, res, student) => {
    res.render('student-info', {
        title: student.name,
        pageHeader: {
            title: student.name,
            strapline: student.description
        },
        sidebar: {
            context: `${student.name} is on e8Trainer because they attended Ignition training at Element8 hosted by Katlego Gagoopane.`,
            callToAction: 'My intention is to inject students with an excitement for Ignition, but here\'s a question: \nHow can I pour from an empty cup? \nHow could I possibly hope to inspire if I myself am not inspired?'
        }, 
        student
        
    });
}

const readStudent = (req, res) => {
    const path = `students/${req.params.studentid}`;
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
    };
    request(requestOptions, (err, {statusCode}, student) => {
        let data;
        if(statusCode === 200) {
            data = student;
            renderStudent(req, res, data);
        } else {
            showError(req, res, statusCode)
        }
      
    })
   
};

const renderCommentForm = (req, res, student) => {
    res.render('student-comment-form', {
        title: `comment for ${student.name}`,
        pageHeader: {
            title: `Create comment for ${student.name}`,
            strapline: ''
        },
        sidebar: {
            content: '',
            callToAction: 'SM is the generic database model. There are three end point levels - collection, document and subdocument. For each level we define appropriate crud operations'
        },
        error: req.query.err
    });
};


const openCommentForm = (req, res) => {
        const path = `students/${req.params.studentid}`;
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
    };
    request(requestOptions, (err, {statusCode}, student) => {
        if(statusCode === 200) {
            renderCommentForm(req, res, student);
        } else {
            showError(req, res, statusCode)
        }
      
    })  
};

const createComment = (req, res) => {
    console.log('creating student...' + req.body.comment)
    const path = `students/${req.params.studentid}/comments`;
    if(!req.body.comment) {
        res.redirect(`/students/${req.params.studentid}/comments/new?err=val`);
    } else {
        const formComment = {
            author: 'Katlego',
            comment: req.body.comment
        };
        const requestOptions = {
            url: `${apiOptions.server}${path}`,
            method: 'POST',
            json: formComment
        };
        request(requestOptions, (err, {statusCode}, comments) => {
            if(statusCode === 201) {
                res.redirect(`/students/${req.params.studentid}`);
            } else if(statusCode === 400) {
                res.redirect(`/students/${req.params.studentid}/comments/new?err=val`);
            } 
            else {
                showError(req, res, statusCode);
            }
        });    
    }
};


const updateStudent = (req, res) => {
    res.render('student-update', {
        title: 'Update Student', 
        pageHeader: {
            title: 'Update Student details',
            strapline: ''
        },
        sideBar: 'Make corrections to existing Student'

    });
};
const deleteStudent = (req, res) => {
    const path = `students/${req.params.studentid}`;
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'DELETE',   
        json: {}
    };
    request(requestOptions, (err, {statusCode}, body) => {
        if(statusCode === 204 ) {
            res.redirect(`/students`);
        } else {
            showError(req, res, statusCode);
        }
    });
};




module.exports = {
    createStudent,
    readStudents,
    readStudent,
    updateStudent,
    deleteStudent,
    openStudentForm,
    openCommentForm,
    createComment
};