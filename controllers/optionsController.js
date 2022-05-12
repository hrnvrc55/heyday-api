const Models = require('../models/index');
const {uploadFile} = require('../helpers/uploadHelper');
module.exports = {
    async get(req,res){
        await Models.Options.findOne().then(result => {
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
        const data = {
            title: req.body.title
        }
        if(req.body.id){
            await Models.Options.update(data,{where: {id: req.body.id}}).then(result => {
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
        }else{
            await Models.Options.create(data).then(result => {
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
        }
    },
    async uploadLogo (req,res){
        await uploadFile(req.file).then(async result => {
            const data = {
                logo: result
            }
            if(!req.body.id){
                return res.status(400).json({
                    status: true,
                    result: null,
                    error: {title: 'Error',message: 'Please input Web Site Title and Save', detail: {}}
                })
            }else{
                await Models.Options.update(data,{where: {id: req.body.id}}).then(result => {
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
            }

        }).catch(err => {
            return res.status(400).json({
                status: true,
                result: null,
                error: {title: err.name,message: err.message, detail: err}
            })
        })
    }
}