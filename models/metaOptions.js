module.exports = ((sequelize, DataTypes) => {
    const MetaOption = sequelize.define('MetaOption', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        mainMetaDescription: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        worksMetaDescription: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        aboutMetaDescription: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        pinterestCode: {
            type: DataTypes.STRING,
            allowNull: true,
        },

    })

    return MetaOption;
})