const Models = require('../models/index');
const {
    ref,
    uploadBytes,
    listAll,
    deleteObject,
} = require("firebase/storage");
const storage = require("../firebase");
const urlSlug = require('url-slug');
const moment = require('moment');
const url = require("url");
const uploadFile = (file) => new Promise(async (resolve, reject) => {
    const imageRef = ref(storage, file.originalname);
    const metatype = { contentType: file.mimetype, name: file.originalname };
    await uploadBytes(imageRef, file.buffer, metatype)
        .then((snapshot) => {
            resolve(`https://firebasestorage.googleapis.com/v0/b/heyday-1b03a.appspot.com/o/${file.originalname}?alt=media`)
        })
        .catch((error) => reject({message: error.message}));
});


module.exports = {
    async getAll(req,res){
        await Models.Work.findAll().then(result => {
            return res.status(200).json({
                status: true,
                result: result,
                error: null
            })
        }).catch(err => {
            return res.status(400).json({
                status: true,
                result: null,
                error: {title: err.name,message: err.message, detail: err}
            })
        });
    },
    async save(req,res){
        const {title, subTitle, description} = req.body
        const data = {
            title,
            subTitle,
            description: description ? description : '',
            slug: urlSlug(title)
        }
        await Models.Work.create(data).then(result => {
            return res.status(200).json({
                status: true,
                result: data,
                error: null
            })
        }).catch(err => {
            return res.status(400).json({
                status: true,
                result: null,
                error: {title: err.name,message: err.message, detail: err}
            })
        });
    },
    async update(req,res){
        return res.status(200).json({
            status: true,
            result: [],
            error: null
        })
    },
    async delete(req,res){
        await Models.Work.destroy({where: {id: req.params.id}}).then(result => {
            if(result === 1){
                return res.status(200).json({
                    status: true,
                    result: result,
                    error: null
                })
            }else{
                return res.status(400).json({
                    status: true,
                    result: null,
                    error: {title: 'Delete Error',message: 'This data not found', detail: null}
                })
            }

        }).catch(err => {
            return res.status(400).json({
                status: true,
                result: null,
                error: {title: err.name,message: err.message, detail: err}
            })
        });
    },
    async uploadImage(req,res){
       const bodyData = {WorkId: req.query.workId, isCover: false}
       await uploadFile(req.file).then(async result => {
           bodyData.imageLink = result;
           await Models.WorkImages.create(bodyData).then(result => {
               return res.status(200).json({
                   status: true,
                   result: bodyData,
                   error: null
               })
           }).catch(err => {
               return res.status(400).json({
                   status: true,
                   result: null,
                   error: {title: err.name,message: err.message, detail: err}
               })
           });

       }).catch((err) => {
           return res.status(400).json({
               status: false,
               result: null,
               error: err.message
           })
       })
    },
    async getImages(req,res){
        await Models.WorkImages.findAll({where: {workId: req.params.id}}).then(result => {
            return res.status(200).json({
                status: true,
                result: result,
                error: null
            })
        }).catch(err => {
            return res.status(400).json({
                status: true,
                result: null,
                error: {title: err.name,message: err.message, detail: err}
            })
        });
    },
    async getCoverImages(req,res){
        await Models.WorkImages.findAll().then(result => {
            return res.status(200).json({
                status: true,
                result: result,
                error: null
            })
        }).catch(err => {
            return res.status(400).json({
                status: true,
                result: null,
                error: {title: err.name,message: err.message, detail: err}
            })
        });
    },
    async getWorksWithImages(req,res){
        await Models.WorkImages.findAll({
            include: [{
                model: Models.Work,
            }],
            where: {isCover: true}
        }).then(result => {
            return res.status(200).json({
                status: true,
                result: result,
                error: null
            })
        }).catch(err => {
            return res.status(400).json({
                status: true,
                result: null,
                error: {title: err.name,message: err.message, detail: err}
            })
        });
    },
    async selectCoverImage(req,res){
        const {workId, id} = req.body;
        await Models.WorkImages.update({isCover: false},{where: {WorkId: workId}}).then(async result => {
            await Models.WorkImages.update({isCover: true},{where: {id: id}}).then(result => {
                return res.status(200).json({
                    status: true,
                    result: result,
                    error: null
                })
            }).catch(err => {
                return res.status(400).json({
                    status: true,
                    result: null,
                    error: {title: err.name,message: err.message, detail: err}
                })
            })

        }).catch(err => {
            return res.status(400).json({
                status: true,
                result: null,
                error: {title: err.name,message: err.message, detail: err}
            })
        });
    },
    async getWorkWithSlug(req,res){
        await Models.Work.findOne({
            where: {
                slug: req.query.slug
            }
        }).then(async result => {
            let newResult = result.dataValues;
            await Models.WorkImages.findAll({
                where: {
                    WorkId: result.id
                }
            }).then(result => {
                newResult.imageList = result;
                newResult.updatedAt = moment(newResult.updatedAt).format('MM/YYYY');
                return res.status(200).json({
                    status: true,
                    result: newResult,
                    error: null
                })
            }).catch(err => {
                return res.status(400).json({
                    status: true,
                    result: null,
                    error: {title: err.name,message: err.message, detail: err}
                })
            })

        }).catch(err => {
            return res.status(400).json({
                status: true,
                result: null,
                error: {title: err.name,message: err.message, detail: err}
            })
        });
    }

}