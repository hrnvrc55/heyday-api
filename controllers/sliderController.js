const Models = require("../models/index");
const fsPromises = require("fs/promises");

module.exports = {
    async getAll(req, res, next) {
        let baseUrl = req.protocol + "://" + req.headers.host;
        await Models.Sliders.findAll({
            include:[{
                model: Models.Work
            }]
        }).then(result => {
            const newResult = result.map(item => {
                item.image = baseUrl + "/sliders/" + item.image;
                return item;
            })
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
        });
    },


    async save(req, res, next) {
        await Models.Sliders.create({
            image: req.body.image,
            title: req.body.title,
            subTitle: req.body.subTitle,
            WorkId: req.body.workId,

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

    },
    async update(req, res, next) {

        await Models.Sliders.update(
            {
                image: req.body.image,
                title: req.body.title,
                subTitle: req.body.subTitle,
                WorkId: req.body.workId,

            },
            { where: { id: req.params.id } }
        ).then(result => {
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


    },
    async delete(req, res, next) {
        const { id } = req.params;
        await Models.Sliders.findOne({where:{id:id}}).then(async result => {
            try {
                await fsPromises.unlink(`public/sliders/${result.dataValues.image}`);
                await Models.Sliders.destroy(
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
                })
            } catch (err) {
                return res.status(400).json({
                    status: true,
                    result: null,
                    error: {title: err.name,message: err.message, detail: err}
                })
            }
        })


        //
        // await Models.Sliders.destroy(
        //     { where: { id: id } }
        // ).then(result => {
        //     return res.status(200).json({
        //         status: true,
        //         message: "Veri Silindi",
        //         data: result,
        //     });
        // }).catch(err => {
        //     return res.status(400).json({
        //         status: true,
        //         result: null,
        //         error: {title: err.name,message: err.message, detail: err}
        //     })
        // });
    },
    async getOne(req, res, next) {

        await Models.Sliders.findOne({
            where: { id: req.params.id },
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
    async uploadImage(req, res, next) {
        if(req.file){
            return res.status(200).json({status: true, result: req.file.filename, error: null});

        }else{
            return res.status(400).json({status: false, result: null, error: "Image Upload Error"});
        }
    },
};