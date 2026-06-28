const mongoose = require('mongoose');
const Class = mongoose.model('Class')

const classesReadOne = (req, res) => {
    Class
        .findById(req.params.classid)
        .then((class) => {
            if (!class) {
                return res
                    .status(404)
                    .json({"message": "class not found."});
            }
            else {
                return res
                    .status(200)
                    .json(class);
            }
        }).catch((err) => {
            return res
                .status(404)
                .json({"message": "classid not found"});
        });
};

const classesListByDataset = (req, res) => {
    Class
        .find()
        .then((classes) => {
            if(classes && classes.length > 0){
                return res
                        .status(200)
                        .json(classes)
            }
        })
        .catch((err) => {
                return res
                    .status(404)
                    .json({"message": "class list empty"});
        });

};

const classesUpdateOne = (req, res) => {
    if(!req.params.classid){
        return res
                .status(404)
                .json({"message": "class not found, class id required."});
    } else {
        Class
            .findById(req.params.classid)
            .select('-annotations')
            .then((class) => {
                if(req.body.name){
                    class.name = req.body.name;
                }
                if(req.body.description){
                    class.description = req.body.description;
                }
                if(req.body.quality){
                    class.quality = req.body.quality;                
                }
                if(req.body.value){
                    class.value = req.body.value;
                }
                if(req.body.tvs){
                    class.tvs = req.body.tvs;
                }
                class
                    .save()
                    .then((class) => {
                        return res
                                .status(200)
                                .json(class);
                    }).catch((err)=> {
                        return res
                                .status(404)
                                .json({"message": "classid not found"});
                    });

            }).catch((err) => {
                return res
                        .status(400)
                        .json(err);
            });
    }
};

const classesCreate = (req, res) => {
    Class
        .create({
            name: req.body.name,
            role: req.body.role,
            company: req.body.company,
            qualification: req.body.qualification,

        }).then((class) => {
            return res
                    .status(201)
                    .json(class);

        }).catch((err) => {
            return res
                    .status(400)
                    .json(err);
        });
    };

const classesDeleteOne = (req, res) => {
    const {classid} = req.params;
    if(classid){
        Class
            .findByIdAndDelete(classid)
            .then((class) => {
                return res
                        .status(204)
                        .json(null);

            }).catch((err) => {
                return res
                        .status(404)
                        .json({"message": "class not found"});
            });
    } else {
        return res
                .status(404)
                .json({"message": "class id required"});
    }
};

const findClassByName = (req, res) => {
    const className = req.params.name;
    Class
        .find({name: className})
        .select('name _id')
        .then((class) => {
            if(class && class.length > 0){
                return res
                    .status(200)
                    .json(class);
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
    classesReadOne,
    classesListByDataset,
    classesUpdateOne,
    classesCreate,
    classesDeleteOne,
    findClassByName
};