require('../models/companies');

const mongoose = require('mongoose');
const Company = mongoose.model('Company');


const companiesReadAll = (req, res) => {
    //console.log('reading all...');
    Company
        .find()
        .then((companies) => {
            if(companies && companies.length > 0){
                return res
                        .status(200)
                        .json(companies)
            }
        })
        .catch((err) => {
                return res
                    .status(404)
                    .json({"message": "company list empty"});
        });

};

const companiesReadOne = (req, res) => {
    Company
        .findById(req.params.companyid)
        .then((company) => {
            if (!company) {
                return res
                    .status(404)
                    .json({"message": "company not found."});
            }
            else {
                return res
                    .status(200)
                    .json(company);
            }
        }).catch((err) => {
            return res
                .status(404)
                .json({"message": "companyid not found"});
        });
};

const companiesUpdateOne = (req, res) => {
    if(!req.params.companyid){
        return res
                .status(404)
                .json({"message": "company not found, company id required."});
    } else {
        Company
            .findById(req.params.companyid)
            .select('-comments')
            .then((company) => {
                if(req.body.name){
                    company.name = req.body.name;
                }
                if(req.body.description){
                    company.description = req.body.description;
                }
                if(req.body.address){
                    company.address = req.body.address;                
                }
                if(req.body.industry){
                    company.industry = req.body.industry;
                }
                if(req.body.contactPerson){
                    company.contactPerson = req.body.contactPerson;
                }
                company
                    .save()
                    .then((company) => {
                        return res
                                .status(200)
                                .json(company);
                    }).catch((err)=> {
                        return res
                                .status(404)
                                .json({"message": "companyid not found"});
                    });
            }).catch((err) => {
                return res
                        .status(400)
                        .json(err);
            });
    }
};

const companiesCreateOne = (req, res) => {
    Company
        .create({
            name: req.body.name,
            description: req.body.description,
            address: req.body.address,
            industry: req.body.industry,
            contactPerson: req.body.contactPerson
        }).then((company) => {
            return res
                    .status(201)
                    .json(company);

        }).catch((err) => {
            return res
                    .status(400)
                    .json(err);
        });
    };

const companiesDeleteOne = (req, res) => {
    const {companyid} = req.params;
    if(companyid){
        Company
            .findByIdAndDelete(companyid)
            .then((company) => {
                return res
                        .status(204)
                        .json(null);

            }).catch((err) => {
                return res
                        .status(404)
                        .json({"message": "company not found"});
            });
    } else {
        return res
                .status(404)
                .json({"message": "company id required"});
    }
};

const findCompanyByName = (req, res) => {
    const companyName = req.params.name;
    Company
        .find({name: companyName})
        .select('name _id')
        .then((company) => {
            if(company && company.length > 0){
                return res
                    .status(200)
                    .json(company);
            } else {
                return res
                        .status(404)
                        .json({});
            }
        }).catch((err) => {
            return res
                    .status(404)
                    .json({});
        });
};

module.exports = {
    companiesReadOne,
    companiesReadAll,
    companiesUpdateOne,
    companiesCreateOne,
    companiesDeleteOne,
    findCompanyByName
};