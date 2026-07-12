const mongoose = require('mongoose');
const Company = mongoose.model('Company');

const companyCommentsReadOne = (req, res) => {
   Company
        .findById(req.params.companyid)
        .then((company) => {
            if (company.comments && company.comments.length > 0) {
                companyComment = company.comments.id(req.params.commentid)
                if(!companyComment){
                    return res
                        .status(404)
                        .json({"message": "companyComment not found"});
                }
                else{
                    response = {
                        company : {
                            name: company.name,
                            id: req.params.commentid
                        },
                        companyComment
                    }
                    return res
                            .status(200)
                            .json(response);
                }
            }
        }).catch((err) => {
            return res
                .status(404)
                .json({"message": "company not found"});
        });

};

const companyCommentsUpdateOne = (req, res) => {
    if(!req.params.companyid || !req.params.commentid){
        return res
                .status(400)
                .json({"message": "company id and companyComment id required"});
    } else {
        Company
        .findById(req.params.companyid)
        .select('comments')
        .then((company) => {
            if (company.comments && company.comments.length > 0) {
                companyComment = company.comments.id(req.params.commentid);
                if(!companyComment){
                    return res
                        .status(404)
                        .json({"message": "companyComment not found"});
                }
                else{
                    if(req.body.name){
                        companyComment.comment = req.body.comment;
                    }
                    company
                        .save()
                        .then((company) => {
                            return res
                                    .status(200)
                                    .json(companyComment);

                        }).catch((err) => {
                            return res
                                    .status(404)
                                    .json({"message": "could not save changes."});
                        });   
                }
            }
        }).catch((err) => {
            return res
                .status(404)
                .json({"message": "company not found"});
        });
    }
};

const companyCommentsDeleteOne = (req, res) => {
    if(!req.params.companyid || !req.params.commentid){
        return res
                .status(400)
                .json({"message": "company id and companyComment id required"});
    } else {
        Company
        .findById(req.params.companyid)
        .select('comments')
        .then((company) => {
            if (company.comments && company.comments.length > 0) {
                companyComment = company.comments.id(req.params.commentid)
                if(!companyComment){
                    return res
                        .status(404)
                        .json({"message": "companyComment not found"});
                }
                else{
                    company.comments.id(req.params.commentid).deleteOne();
                    company
                        .save()
                        .then((out) => {
                            return res
                                    .status(204)
                                    .json(null);

                        }).catch((err) => {
                            return res
                                    .status(404)
                                    .json({err});
                        });   
                }
            }
        }).catch((err) => {
            return res
                .status(404)
                .json({"message": "company not found"});
        });

    }  
};

const companyCommentsCreateOne = (req, res) => {
    companyid = req.params.companyid;
    if(companyid){
        Company
            .findById(companyid)
            .then((company) => {
                doAddCompanyComment(req, res, company);

            }).catch((err) => {
                return res
                        .status(404)
                        .json({"message": "company not found"});
            });
    }
    else{
        return res
                .status(404)
                .json({"message": "supply company id"});
    }
};

const doAddCompanyComment = (req, res, company) => {
    if(!company){
        return res
                .status(404)
                .json({"message":"company not found"});
    } else {
        const { comment } = req.body;
        company.comments.push({
           comment 
        });
        company
            .save()
            .then((company) => {
                const thisCompanyComment = company.comments.slice(-1).pop();
                return res
                        .status(201)
                        .json(thisCompanyComment);

            }).catch((err) => {
                return res
                        .status(400)
                        .json(err);
            });
    }
}

module.exports = {
    companyCommentsReadOne,
    companyCommentsUpdateOne,
    companyCommentsDeleteOne,
    companyCommentsCreateOne
};