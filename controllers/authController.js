const Models = require("../models/index");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");
const process = require("process");

const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
    async login(req, res, next) {
        try {
            const body = {
                email: req.body.email,
                password: req.body.password,
                deviceInfo: req.body.deviceInfo
            };

            const user = await Models.User.findOne({
                where: {
                    [Op.or]: [
                        { email: body.email},
                    ],
                },
                include: [
                    { model: Models.Roles}
                ],
            });
            if (!user) {
                return res.status(400).json({
                    status: false,
                    message: "Kullanıcı bulunamadı",
                    error: null,
                });
            }


            const validPass = await bcrypt.compare(body.password, user.password);
            if (!validPass) {
                return res.status(400).json({
                    status: false,
                    message: "Geçersiz şifre",
                    error: null,
                });
            }

            const token = jwt.sign(
                { id: user.id },
                process.env.TOKEN_SECRET
            );

            res.header("auth-token", token).json({
                status: true,
                message: "Giriş Başarılı",
                result: {
                    user,
                    token
                }
            });

        } catch (error) {
            next(error);
        }
    },

    async register(req, res, next) {
        const {firstName, lastName, password, email,phone, roleId} = req.body;
        const data = {
            password,
            phone,
            email,
            firstName,
            lastName,
            fullName: `${firstName} ${lastName}`,
            RoleId: roleId
        }

        data.password =  await bcrypt.hash(data.password, 10);

        await Models.User.create(data).then(result => {
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
        })

    },
};