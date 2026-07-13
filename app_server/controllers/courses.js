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
const openCourseForm = (req, res) => {
    res.render('course-add-form', {
        title: 'Create Course',
        pageHeader: {
            title: 'Create Course',
            strapline: ''
        },
        sidebar: {
            content: 'Course',
            callToAction: 'There are three end point levels - collection, document and subdocument. For each level we define appropriate crud operations'
        },
        error: req.query.err
    });
}

const createCourse = (req, res) => {
    const path = 'courses';
    if(!req.body.name ||!req.body.startDate ||!req.body.endDate) {
        res.redirect('/courses/new?err=val');
    } else {
        const formCourse = {
            name: req.body.name,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        };
        const requestOptions = {
            url: `${apiOptions.server}${path}`,
            method: 'POST',
            json: formCourse
        };
        request(requestOptions, (err, {statusCode}, {name}) => {
            if(statusCode === 201) {
                res.redirect('/courses');
            } else if(statusCode === 400) {
                res.redirect('/courses/new?err=val');return;
            } else {
                showError(req, res, statusCode);
            }
        });    
    }
   
};

const renderCourseList = (req, res, courses) => {
    let message = null;
    if(!(courses instanceof Array)) {
        message = 'API lookup error';
        courses = [];
    } else {
        if(!courses.length) {
            message = 'no courses found'
        }
    }
    res.render('course-list', {
        title: 'List of Courses',
        pageHeader: {
            title: 'e8Trainer',
            strapline: 'Setup and manage Course records.'
        },
        sidebar: {
            context: 'This web app assists in collecting, storing and retrieving course and student information. \nSimply create a course, add students to it and post comment about them.'
        },
        courses: courses,
        message
    });

};
const readCourses = (req, res) => {
    const path = 'courses';
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
    };
    request(requestOptions, (err, {statusCode}, courses) => {
        let data = [];
        if(statusCode === 200) {
            data = courses;
            renderCourseList(req, res, courses);
        } else {
            showError(req, res, statusCode);
        }
    });
};

//instance operations
const renderCourse = (req, res, course) => {
    res.render('new-course-info', {
        title: course.name,
        pageHeader: {
            title: course.name,
            strapline: course.startDate
        },
        sidebar: {
            context: `${course.name} is an Inductive Automation course offered by Element8`,
            callToAction: 'My intention is to inject students with an excitement for Ignition, but here\'s a question: \nHow can I pour from an empty cup? \nHow could I possibly hope to inspire if I myself am not inspired?'
        }, 
        course
        
    });
}

const readCourse = (req, res) => {
    const path = `courses/${req.params.courseid}`;
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
    };
    request(requestOptions, (err, {statusCode}, course) => {
        let data;
        if(statusCode === 200) {
            data = course;
            renderCourse(req, res, data);
        } else {
            showError(req, res, statusCode)
        }
      
    })
   
};

/////
const newRenderCourse = (req, res, course) => {
    res.render('course-info', {
        title: course.name,
        pageHeader: {
            title: course.name,
            strapline: course.startDate
        },
        sidebar: {
            context: `${course.name} is an Inductive Automation course offered by Element8`,
            callToAction: 'My intention is to inject students with an excitement for Ignition, but here\'s a question: \nHow can I pour from an empty cup? \nHow could I possibly hope to inspire if I myself am not inspired?'
        }, 
        course
        
    });
}


const newReadCourse = (req, res) => {
    const path = `courses/${req.params.courseid}`;
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
    };
    request(requestOptions, (err, {statusCode}, course) => {
        let data;
        if(statusCode === 200) {
            data = course;
            newRenderCourse(req, res, data);
        } else {
            showError(req, res, statusCode)
        }
      
    })
};

///



const renderCourseStudentForm = (req, res, course, companies) => {
    //console.log(companies);
    companyNames = []
    for(let i=0; i < companies.length; i++){
        companyNames.push(companies[i].name);
    }
    console.log(companyNames);
    res.render('course-student-add-form', {
        title: `student for ${course.name}`,
        pageHeader: {
            title: `Add student to ${course.name}`,
            strapline: ''
        },
        sidebar: {
            content: '',
            callToAction: 'SM is the generic database model. There are three end point levels - collection, document and subdocument. For each level we define appropriate crud operations'
        },
        course,
        companies: companyNames,
        error: req.query.err
    });
};


const openCourseStudentForm = (req, res) => {
    //get all companies
    const path = 'companies';
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
    };
    request(requestOptions, (err, {statusCode}, companies) => {
        let data = [];
        if(statusCode === 200) {
            data = companies;
            //renderCourseList(req, res, courses);
            const path = `courses/${req.params.courseid}`;
            console.log(companies);
        //console.log(path)
        const requestOptions = {
            url: `${apiOptions.server}${path}`,
            method: 'GET',
            json: {},
        };
        request(requestOptions, (err, {statusCode}, course) => {
            if(statusCode === 200) {
                //console.log(course._id)
                renderCourseStudentForm(req, res, course._id, companies);
            } else {
                showError(req, res, statusCode)
            }
        
        });
            } else {
                showError(req, res, statusCode);
            }
        });

    //////  
};

const createCourseStudent = (req, res) => {

   //const path = 'students';
   const path = `courses/${req.params.courseid}/students`
    if(!req.body.name ||!req.body.company) {
           res.redirect('/students/new?err=val');
       } else {
            const formStudent = {
                name: req.body.name,
                role: req.body.role,
                company: req.body.company,
                qualification: req.body.qualification,
                description: req.body.description
            };
           const requestOptions = {
               url: `${apiOptions.server}${path}`,
               method: 'POST',
               json: formStudent
           };
           //console.log(requestOptions);
           request(requestOptions, (err, {statusCode}, courseStudent) => {
                //console.log('just returned...');
               if(statusCode === 201) {
                   //console.log(courseStudent);
                   //
                   
                   //
                   res.redirect(`/courses/${req.params.courseid}`);
               } else if(statusCode === 400) {
                   res.redirect('/students/new?err=val');return;
               } else {
                   showError(req, res, statusCode);
               }
           });    
       }
};

const renderCourseStudentInfo = (req, res, courseStudent) => {
    res.render('course-student-info', {
        title: courseStudent.name,
        pageHeader: {
            title: courseStudent.name,
            strapline: courseStudent.description
        },
        sidebar: {
            context: `${courseStudent.name} is on e8Trainer because they attended Ignition training at Element8 hosted by Katlego Gagoopane.`,
            callToAction: 'My intention is to inject students with an excitement for Ignition, but here\'s a question: \nHow can I pour from an empty cup? \nHow could I possibly hope to inspire if I myself am not inspired?'
        },
        courseid: req.params.courseid, 
        courseStudent
        
    });
};

const renderStudentCommentForm = (req, res, student) => {
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
        studentid: student._id,
        courseid: req.params.courseid,
        error: req.query.err
    });
};

const readCourseStudent = (req, res) => {
    //'/courses/:courseid/students/:studentid'
    const path = `courses/${req.params.courseid}/students/${req.params.studentid}`;
    const requestOptions = {
         url: `${apiOptions.server}${path}`,
         method: 'GET',   
         json: {}
     };
     request(requestOptions,(err, {statusCode}, data) => {
        if(statusCode === 200) {
            //console.log(req.params.courseid);
            renderCourseStudentInfo(req, res, data.courseStudent);
           // renderStudentCommentForm(req, res, data.courseStudent);
           // res.redirect(``);
        } else {
            showError(req, res, statusCode)   
        }
     });
};

const openCourseUpdateForm = (req, res) => {
    const options = [1,2,3,4,5]; 
    //console.log(req.params.courseid)
    res.render('course-update', {
        title: 'Update Course Details', 
        pageHeader: {
            title: 'Update Course details',
            strapline: ''
        },
        sideBar: 'Make modification to Course',
        courseid: req.params.courseid,
        options

    });
};

const updateCourse = (req, res) => {
    const path = `courses/${req.params.courseid}`;
    const formCourse = {
            name: req.body.name,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            rating: req.body.rating
    };
    //console.log(formCourse);
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'PUT',   
        json: formCourse
    };
    request(requestOptions, (err, {statusCode}, body) => {
        if(statusCode === 200 ) {
            res.redirect(`/courses/${req.params.courseid}`);
        } else {
            showError(req, res, statusCode);
        }
    });    
};


const deleteCourse = (req, res) => {
    console.log('deleting');
    const path = `courses/${req.params.courseid}`;
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'DELETE',   
        json: {}
    };
    request(requestOptions, (err, {statusCode}, body) => {
        if(statusCode === 204 ) {
            res.redirect(`/courses`);
        } else {
            showError(req, res, statusCode);
        }
    });
};

const createStudentComment = (req, res) => {

    const path = `courses/${req.params.courseid}/students/${req.params.studentid}/comments`;
    const formatComment = {
        comment: req.body.comment
    };
    const requestOptions = {
         url: `${apiOptions.server}${path}`,
         method: 'POST',   
         json: formatComment
     };
     request(requestOptions,(err, {statusCode}, data) => {
        if(statusCode === 201) {
            //console.log(data);
            res.redirect(`/courses/${req.params.courseid}/students/${req.params.studentid}`);
        } else {
            showError(req, res, statusCode)   
        }
     });

};

const openStudentCommentForm = (req, res) => {
    //console.log('in here against')
    const path = `courses/${req.params.courseid}/students/${req.params.studentid}`;
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
    };
    request(requestOptions, (err, {statusCode}, data) => {
        if(statusCode === 200) {
            //console.log(data);
            renderStudentCommentForm(req, res, data.courseStudent);
            //renderCourseStudentForm(req, res, data.courseStudent);
        } else {
            showError(req, res, statusCode)
        }
      
    });
};

const openStudentUpdateForm = (req, res) => {
    //get all companies
    const path = 'companies';
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
    };
    request(requestOptions, (err, {statusCode}, companies) => {
        let data = [];
        if(statusCode === 200) {
            data = companies;
            //renderCourseList(req, res, courses);
            const path = `courses/${req.params.courseid}`;
            //console.log(companies);
        //console.log(path)
        const requestOptions = {
            url: `${apiOptions.server}${path}`,
            method: 'GET',
            json: {},
        };
        request(requestOptions, (err, {statusCode}, course) => {
            if(statusCode === 200) {
                //console.log(course._id)
                //renderCourseStudentForm(req, res, course._id, companies);
                /////
                options = [1,2,3,4,5]
                res.render('student-update', {
                    title: 'Update Student Details', 
                    pageHeader: {
                        title: 'Update Student details',
                        strapline: ''
                    },
                    sideBar: 'Course Modifications',
                    courseid: req.params.courseid,
                    studentid: req.params.studentid,
                    companies,
                    options
                });
                /////
            } else {
                showError(req, res, statusCode)
            }
        
        });
            } else {
                showError(req, res, statusCode);
            }
    });
    ////
    //console.log(req.params.courseid)
};

const updateStudent = (req, res) => {
    const path = `courses/${req.params.courseid}/students/${req.params.studentid}`;
    const formStudent = {
            name: req.body.name,
            company: req.body.company,
            qualification: req.body.qualification,
            rating: req.body.rating,
            description: req.body.description,
            role: req.body.role
    };
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'PUT',   
        json: formStudent
    };
    //console.log(requestOptions);
    request(requestOptions, (err, {statusCode}, body) => {
        if(statusCode === 200 ) {
            //console.log(body);
            res.redirect(`/courses/${req.params.courseid}/students/${req.params.studentid}`);
        } else {
            showError(req, res, statusCode);
        }
    });    
};

const deleteStudent = (req, res) => {
    courseid = req.params.courseid;
    studentid = req.params.studentid;
    if(courseid && studentid){
       const path = `courses/${req.params.courseid}/students/${req.params.studentid}`;
        const requestOptions = {
            url: `${apiOptions.server}${path}`,
            method: 'DELETE',   
            json: {}
        };
        //console.log(requestOptions);
        request(requestOptions, (err, {statusCode}, body) => {
            if(statusCode === 204 ) {
                //console.log(body);
                res.redirect(`/courses/${courseid}`);
            } else {
                showError(req, res, statusCode);
            }
        }); 
    }

};

const openCourseDeleteForm = (req, res) => {
    res.render('delete-course-form', {
        title: 'Delete Course', 
        pageHeader: {
            title: 'Delete',
            strapline: ''
        },
        sideBar: 'Course Modifications',
        courseid: req.params.courseid,
    });
};

const openStudentDeleteForm = (req, res) => {
    res.render('delete-student-form', {
        title: 'Delete Student', 
        pageHeader: {
            title: 'Delete Student',
            strapline: ''
        },
        sideBar: 'Student Modifications',
        courseid: req.params.courseid,
        studentid: req.params.studentid
    });
};

const commentsRenderCourse = (req, res, course) => {
    res.render('comments-course-info', {
        title: course.name,
        pageHeader: {
            title: course.name,
            strapline: course.startDate
        },
        sidebar: {
            context: `${course.name} is an Inductive Automation course offered by Element8`,
            callToAction: 'My intention is to inject students with an excitement for Ignition, but here\'s a question: \nHow can I pour from an empty cup? \nHow could I possibly hope to inspire if I myself am not inspired?'
        }, 
        course
        
    });
}


const commentsReadCourse = (req, res) => {
    const path = `courses/${req.params.courseid}`;
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
    };
    request(requestOptions, (err, {statusCode}, course) => {
        let data;
        if(statusCode === 200) {
            data = course;
            commentsRenderCourse(req, res, data);
        } else {
            showError(req, res, statusCode)
        }
      
    })
};

const renderCourseCommentForm = (req, res, course) => {
    //console.log(companies);
    res.render('course-comment-add-form', {
        title: `comment for ${course.name}`,
        pageHeader: {
            title: `Add comment to ${course.name}`,
            strapline: ''
        },
        sidebar: {
            content: '',
            callToAction: 'SM is the generic database model. There are three end point levels - collection, document and subdocument. For each level we define appropriate crud operations'
        },
        course,
        error: req.query.err
    });
};

const openCourseCommentForm = (req, res) => {
    const path = `courses/${req.params.courseid}`;
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
            method: 'GET',
            json: {},
    };
    request(requestOptions, (err, {statusCode}, course) => {
        if(statusCode === 200) {
                        //console.log(course._id)
            renderCourseCommentForm(req, res, course);
        } else {
            showError(req, res, statusCode)
        }                
    }); 
};

const createCourseComment = (req, res) => {

    //
    console.log('creating comment.....');
   //const path = 'comments';
   const path = `courses/${req.params.courseid}/comments`
    if(!req.body.comment) {
           res.redirect('/comments/new?err=val');
       } else {
            const formComment = {
                comment: req.body.comment
            };
           const requestOptions = {
               url: `${apiOptions.server}${path}`,
               method: 'POST',
               json: formComment
           };
           request(requestOptions, (err, {statusCode}, courseComment) => {
                //console.log('just returned...');
               if(statusCode === 201) {
                   res.redirect(`/courses/${req.params.courseid}`);
               } else if(statusCode === 400) {
                   res.redirect('/comments/new?err=val');return;
               } else {
                   showError(req, res, statusCode);
               }
           });    
       }
};





module.exports = {
    createCourse,
    readCourse,
    readCourses,
    updateCourse,
    deleteCourse,
    openCourseForm,
    openCourseStudentForm,
    createCourseStudent,
    readCourseStudent,
    createStudentComment,
    openStudentCommentForm,
    openCourseUpdateForm,
    openStudentUpdateForm,
    updateStudent,
    deleteStudent,
    openCourseDeleteForm,
    openStudentDeleteForm,
    newReadCourse,
    commentsReadCourse,
    openCourseCommentForm,
    createCourseComment
};