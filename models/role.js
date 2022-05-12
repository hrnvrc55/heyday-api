module.exports = ((sequelize, DataTypes) => {
    const Role = sequelize.define('Roles', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(300),
            required: true,
            allowNull: false,
            //defaultValue: process.env.WEB_SITE_URL + "images/default.jpg",
            validate: {
                len: [3, 300],
                notNull: false,
            },
        },
        code: {
            type: DataTypes.STRING(50),
            allowNull: false,
            validate: {
                len: [2, 50],
                notNull: true,
            }
        },

    })

    return Role;
})