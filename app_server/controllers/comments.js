const request = require("request");

const apiOptions = {
    server: 'localhost:3000/api'
};

if(process.env.NODE_ENV === 'production') {
    apiOptions.server = 'https://ppApp.herokuapp.com/api/';
}

const showError = (req, res, code) => {
    let titl = '';
    let content = '';
    if(code === 404) {
        titl = '404, page not found';
        content = 'Oh flip, looks like you can\'t find this page. Sorry.'
    } else {
        titl = `${code}, something's gone wrong`;
        content = 'Something, somewhere has just gone a little bit wrong.'
    }
    res
      .status(code)
      .render('generic-text', {
        title: titl,
        pageHeader: {
            title: titl,
            strapline: ''
        },
        sideBar: '',
        content
      });

}

const getStudentInfo = (req, res, callback) => {
    const path = `/students/${req.params.studentid}`;
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {}
    };
    console.log('path  ' + requestOptions.url)
    request(requestOptions, (err, {statusCode}, student) => {
        console.log('response ' + student)
        if(statusCode === 200) {
            callback(req, res, student);
        } else {
            showError(req, res, statusCode);
        }
    })
};



const createComment = (req, res) => {
    console.log('creating student...')
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

const readComments = (req, res) => {
    res.render('comment-list', {
        title: 'List of Comments'
    });
};

//submodel instance operations

const readComment = (req, res) => {
    res.render('comment-details', {
        title: 'Details of Comment'
    });
};
const updateComment = (req, res) => {
    res.render('comment-update', {
        title: 'Update Comment'
    });
};

const doDeleteComment = (req, res, student) => {
    const path = `/students/${req.params.studentid}/comments/${req.params.commentid}`;
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'DELETE',
        json: {}
    };
    request(requestOptions, (err, {statusCode}, body) => {
        if(statusCode === 204) {
            res.redirect(`/students/${req.params.studentid}`);
        } else {
            showError(req, res, statusCode);
        }
    });
}
const deleteComment = (req, res) => {
    getStudentInfo(req, res, (req, res, m) => {
        doDeleteComment(req, res, m);
    });
 
};


module.exports = {
    createComment,
    readComments,
    readComment,
    updateComment,
    deleteComment
};