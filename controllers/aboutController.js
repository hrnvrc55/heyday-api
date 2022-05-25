const Models = require("../models/index");

module.exports = {
    general: {
        async save(req, res) {
            const {id,title, description,descriptionTr,companyName,address,locationLink,contactEmail,workTogetherEmail,phoneNumber,faxNumber,established,principal} = req.body
            const data = {
                title,
                description,
                descriptionTr,
                companyName,
                address,
                locationLink,
                contactEmail,
                workTogetherEmail,
                phoneNumber,
                faxNumber,
                established,
                principal
            }
            if(id){
                await Models.General.update(data,{where: {id}}).then(result => {
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

                await Models.General.create(data).then(result => {
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
        async get(req, res) {
            console.log(req.headers["accept-language"],'HEADERS')
            await Models.General.findOne().then(result => {
                result.description = req.headers["accept-language"] === 'tr' ? result.descriptionTr : result.description
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
        }
    },
    owner:{
        async save(req, res) {
            const {id,name, description, image,descriptionTr} = req.body
            const data = {
                name,
                description,
                descriptionTr,
                image
            }
            if(id){
                await Models.Owner.update(data,{where: {id}}).then(result => {
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

                await Models.Owner.create(data).then(result => {
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
        async get(req, res) {
            await Models.Owner.findOne().then(result => {
                result.description = req.headers["accept-language"] === 'tr' ? result.descriptionTr : result.description

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
        }
    },
    award:{
    async save(req, res) {
        const {id,dateText, description} = req.body
        const data = {
            dateText,
            description,
        }
        if(id){
            await Models.Award.update(data,{where: {id}}).then(result => {
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

            await Models.Award.create(data).then(result => {
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
    async getAll(req, res) {
        await Models.Award.findAll().then(result => {
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
    async delete(req, res) {
        await Models.Award.destroy({where: {id: req.params.id}}).then(result => {
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
    }
}

};
