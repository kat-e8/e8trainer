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
const openCompanyForm = (req, res) => {
    res.render('company-add-form', {
        title: 'Create Company',
        pageHeader: {
            title: 'Create Company',
            strapline: ''
        },
        sidebar: {
            content: 'Company',
            callToAction: 'There are three end point levels - collection, document and subdocument. For each level we define appropriate crud operations'
        },
        error: req.query.err
    });
}

const createCompany = (req, res) => {
    const path = 'companies';
    if(!req.body.name) {
        res.redirect('/companies/new?err=val');
    } else {
        const formCompany = {
            name: req.body.name,
            address: req.body.address,
            description: req.body.description,
            industry: req.body.industry,
            contactPerson: req.body.contactPerson
        };
        const requestOptions = {
            url: `${apiOptions.server}${path}`,
            method: 'POST',
            json: formCompany
        };
        request(requestOptions, (err, {statusCode}, {name}) => {
            if(statusCode === 201) {
                res.redirect('/companies');
            } else if(statusCode === 400) {
                res.redirect('/companies/new?err=val');return;
            } else {
                showError(req, res, statusCode);
            }
        });    
    }
   
};

const renderCompanyList = (req, res, companies) => {
    let message = null;
    if(!(companies instanceof Array)) {
        message = 'API lookup error';
        companies = [];
    } else {
        if(!companies.length) {
            message = 'no companies found'
        }
    }
    res.render('company-list', {
        title: 'List of Companies',
        pageHeader: {
            title: 'e8Trainer',
            strapline: 'Setup and manage Company records.'
        },
        sidebar: {
            context: 'This web app assists in collecting, storing and retrieving company and comment information. \nSimply create a company, add comments to it and post comment about them.'
        },
        companies: companies,
        message
    });

};
const readCompanies = (req, res) => {
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
            renderCompanyList(req, res, companies);
        } else {
            showError(req, res, statusCode);
        }
    });
};

//instance operations
const renderCompany = (req, res, company) => {
    res.render('company-info', {
        title: company.name,
        pageHeader: {
            title: company.name,
            strapline: company.startDate
        },
        sidebar: {
            context: `${company.name} is an Inductive Automation company offered by Element8`,
            callToAction: 'My intention is to inject comments with an excitement for Ignition, but here\'s a question: \nHow can I pour from an empty cup? \nHow could I possibly hope to inspire if I myself am not inspired?'
        }, 
        company
        
    });
}

const readCompany = (req, res) => {
    const path = `companies/${req.params.companyid}`;
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
    };
    request(requestOptions, (err, {statusCode}, company) => {
        let data;
        if(statusCode === 200) {
            data = company;
            renderCompany(req, res, data);
        } else {
            showError(req, res, statusCode)
        }
    })
};

const renderCompanyCommentForm = (req, res, company) => {
    //console.log('am i here?')
    res.render('company-comment-add-form', {
        title: `comment for ${company.name}`,
        pageHeader: {
            title: `Add comment to ${company.name}`,
            strapline: ''
        },
        sidebar: {
            content: '',
            callToAction: 'SM is the generic database model. There are three end point levels - collection, document and subdocument. For each level we define appropriate crud operations'
        },
        company,
        error: req.query.err
    });
};


const openCompanyCommentForm = (req, res) => {
    const path = `companies/${req.params.companyid}`;
    //console.log(path)
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
    };
    request(requestOptions, (err, {statusCode}, company) => {
        if(statusCode === 200) {
            //console.log(company._id)
            renderCompanyCommentForm(req, res, company._id);
        } else {
            showError(req, res, statusCode)
        }
      
    });  
};

const createCompanyComment = (req, res) => {

    //
    console.log('creating comment.....');
   //const path = 'comments';
   const path = `companies/${req.params.companyid}/comments`
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
           request(requestOptions, (err, {statusCode}, companyComment) => {
                //console.log('just returned...');
               if(statusCode === 201) {
                   res.redirect(`/companies/${req.params.companyid}`);
               } else if(statusCode === 400) {
                   res.redirect('/comments/new?err=val');return;
               } else {
                   showError(req, res, statusCode);
               }
           });    
       }
};

const renderCompanyCommentInfo = (req, res, companyComment) => {
    res.render('company-comment-info', {
        title: companyComment.name,
        pageHeader: {
            title: companyComment.name,
            strapline: companyComment.description
        },
        sidebar: {
            context: `${companyComment.name} is on e8Trainer because they attended Ignition training at Element8 hosted by Katlego Gagoopane.`,
            callToAction: 'My intention is to inject comments with an excitement for Ignition, but here\'s a question: \nHow can I pour from an empty cup? \nHow could I possibly hope to inspire if I myself am not inspired?'
        },
        companyid: req.params.companyid, 
        companyComment
        
    });
};

const renderCommentCommentForm = (req, res, comment) => {
    res.render('comment-comment-form', {
        title: `comment for ${comment.name}`,
        pageHeader: {
            title: `Create comment for ${comment.name}`,
            strapline: ''
        },
        sidebar: {
            content: '',
            callToAction: 'SM is the generic database model. There are three end point levels - collection, document and subdocument. For each level we define appropriate crud operations'
        },
        commentid: comment._id,
        companyid: req.params.companyid,
        error: req.query.err
    });
};

const readCompanyComment = (req, res) => {
    //'/companies/:companyid/comments/:commentid'
    const path = `companies/${req.params.companyid}/comments/${req.params.commentid}`;
    const requestOptions = {
         url: `${apiOptions.server}${path}`,
         method: 'GET',   
         json: {}
     };
     request(requestOptions,(err, {statusCode}, data) => {
        if(statusCode === 200) {
            //console.log(req.params.companyid);
            renderCompanyCommentInfo(req, res, data.companyComment);
           // renderCommentCommentForm(req, res, data.companyComment);
           // res.redirect(``);
        } else {
            showError(req, res, statusCode)   
        }
     });
};

const openCompanyUpdateForm = (req, res) => {
    //const options = [1,2,3,4,5]; 
    //console.log(req.params.companyid)
    res.render('company-update', {
        title: 'Update Company Details', 
        pageHeader: {
            title: 'Update Company details',
            strapline: ''
        },
        sideBar: 'Make modification to Company',
        companyid: req.params.companyid
    });
};

const updateCompany = (req, res) => {
    console.log('posting...')
    const path = `companies/${req.params.companyid}`;
    const formCompany = {
            name: req.body.name,
            address: req.body.address,
            description: req.body.description,
            industry: req.body.industry,
            contactPerson: req.body.contactPerson
    };
    //console.log(formCompany);
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'PUT',   
        json: formCompany
    };
    request(requestOptions, (err, {statusCode}, body) => {
        if(statusCode === 200 ) {
            res.redirect(`/companies/${req.params.companyid}`);
        } else {
            showError(req, res, statusCode);
        }
    });    
};


const deleteCompany = (req, res) => {
    console.log('deleting');
    const path = `companies/${req.params.companyid}`;
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'DELETE',   
        json: {}
    };
    request(requestOptions, (err, {statusCode}, body) => {
        if(statusCode === 204 ) {
            res.redirect(`/companies`);
        } else {
            showError(req, res, statusCode);
        }
    });
};

const createCommentComment = (req, res) => {

    const path = `companies/${req.params.companyid}/comments/${req.params.commentid}/comments`;
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
            res.redirect(`/companies/${req.params.companyid}/comments/${req.params.commentid}`);
        } else {
            showError(req, res, statusCode)   
        }
     });

};

const openCommentCommentForm = (req, res) => {
    //console.log('in here against')
    const path = `companies/${req.params.companyid}/comments/${req.params.commentid}`;
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
    };
    request(requestOptions, (err, {statusCode}, data) => {
        if(statusCode === 200) {
            //console.log(data);
            renderCommentCommentForm(req, res, data.companyComment);
            //renderCompanyCommentForm(req, res, data.companyComment);
        } else {
            showError(req, res, statusCode)
        }
      
    });
};

const openCommentUpdateForm = (req, res) => {
    //console.log(req.params.companyid)
    //options = [1,2,3,4,5]
    res.render('comment-update', {
        title: 'Update Comment Details', 
        pageHeader: {
            title: 'Update Comment details',
            strapline: ''
        },
        sideBar: 'Company Modifications',
        companyid: req.params.companyid,
        commentid: req.params.commentid,
        options
    });
};

const updateComment = (req, res) => {
    const path = `companies/${req.params.companyid}/comments/${req.params.commentid}`;
    const formComment = {
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
        json: formComment
    };
    //console.log(requestOptions);
    request(requestOptions, (err, {statusCode}, body) => {
        if(statusCode === 200 ) {
            //console.log(body);
            res.redirect(`/companies/${req.params.companyid}/comments/${req.params.commentid}`);
        } else {
            showError(req, res, statusCode);
        }
    });    
};

const deleteComment = (req, res) => {
    companyid = req.params.companyid;
    commentid = req.params.commentid;
    if(companyid && commentid){
       const path = `companies/${req.params.companyid}/comments/${req.params.commentid}`;
        const requestOptions = {
            url: `${apiOptions.server}${path}`,
            method: 'DELETE',   
            json: {}
        };
        //console.log(requestOptions);
        request(requestOptions, (err, {statusCode}, body) => {
            if(statusCode === 204 ) {
                //console.log(body);
                res.redirect(`/companies/${companyid}`);
            } else {
                showError(req, res, statusCode);
            }
        }); 
    }

};

const openCompanyDeleteForm = (req, res) => {
    res.render('delete-company-form', {
        title: 'Delete Company', 
        pageHeader: {
            title: 'Delete',
            strapline: ''
        },
        sideBar: 'Company Modifications',
        companyid: req.params.companyid,
    });
};

const openCommentDeleteForm = (req, res) => {
    res.render('delete-comment-form', {
        title: 'Delete Comment', 
        pageHeader: {
            title: 'Delete Comment',
            strapline: ''
        },
        sideBar: 'Comment Modifications',
        companyid: req.params.companyid,
        commentid: req.params.commentid
    });
};

const searchRenderCompanies = (req, res, foundCompanies) => {
    //console.log(foundStudents.matchingStudents);
    res.render('search-company-list', {
        pageHeader: {
            title: 'Companies',
            strapline: 'Element 8 Partners'
        },
        sidebar: {
            context: `Inductive Automation courses offered by Element8`,
            callToAction: 'My intention is to inject students with an excitement for Ignition, but here\'s a question: \nHow can I pour from an empty cup? \nHow could I possibly hope to inspire if I myself am not inspired?'
        }, 
        foundCompanies
    });
}


const readSearchedCompanies = (req, res) => {
    ///
    const path = `companies/search/find`;
    const formSearch = {searchPhrase: req.body.searchPhrase};
    const requestOptions = {
            url: `${apiOptions.server}${path}`,
            method: 'GET',   
            json: formSearch
    };
    request(requestOptions,(err, {statusCode}, foundCompanies) => {
            if(statusCode === 200) {
                searchRenderCompanies(req, res, foundCompanies);
            } else {
                showError(req, res, statusCode)   
            }
    });
    
};



module.exports = {
    createCompany,
    readCompany,
    readCompanies,
    updateCompany,
    deleteCompany,
    openCompanyForm,
    openCompanyCommentForm,
    createCompanyComment,
    readCompanyComment,
    createCommentComment,
    openCommentCommentForm,
    openCompanyUpdateForm,
    openCommentUpdateForm,
    updateComment,
    deleteComment,
    openCompanyDeleteForm,
    openCommentDeleteForm,
    readSearchedCompanies
};