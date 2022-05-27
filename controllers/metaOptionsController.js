const Models = require("../models/index");

module.exports = {
    async get(req, res, next) {
        await Models.MetaOption.findOne().then(result => {
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

    async save(req, res, next) {
        if(req.body.id){
            await Models.MetaOption.update({
                mainMetaDescription: req.body.mainMetaDescription,
                worksMetaDescription: req.body.worksMetaDescription,
                aboutMetaDescription: req.body.aboutMetaDescription,

            },{where: {id:req.body.id}}).then(result => {
                return res.status(200).json({
                    status: true,
                    message: "Veri Başarıyla Oluşturuldu",
                    data: result,
                });
            }).catch(err => {
                return res.status(400).json({
                    status: true,
                    result: null,
                    error: {title: err.name,message: err.message, detail: err}
                })
            });
        }else{
            await Models.MetaOption.create({
                mainMetaDescription: req.body.mainMetaDescription,
                worksMetaDescription: req.body.worksMetaDescription,
                aboutMetaDescription: req.body.aboutMetaDescription,

            }).then(result => {
                return res.status(200).json({
                    status: true,
                    message: "Veri Başarıyla Oluşturuldu",
                    data: result,
                });
            }).catch(err => {
                return res.status(400).json({
                    status: true,
                    result: null,
                    error: {title: err.name,message: err.message, detail: err}
                })
            });
        }


    },
    async delete(req, res, next) {

        const { id } = req.params;

        await Models.MetaOptions.destroy(
            { where: { id: id } }
        ).then(result => {
            return res.status(200).json({
                status: true,
                message: "Veri Silindi",
                data: result,
            });
        }).catch(err => {
            return res.status(400).json({
                status: true,
                result: null,
                error: {title: err.name,message: err.message, detail: err}
            })
        });
    },
};