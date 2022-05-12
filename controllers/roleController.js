const Models = require("../models/index");

module.exports = {
    async getAll(req, res, next) {
        await Models.Roles.findAll().then(result => {
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
    async getOne(req, res, next) {

        await Models.Roles.findOne({
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

    async save(req, res, next) {
        await Models.Roles.create({
            name: req.body.name,
            code: req.body.code,

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

        await Models.Roles.update(
            {
                name: req.body.name,
                code: req.body.code,

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

        await Models.Roles.destroy(
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