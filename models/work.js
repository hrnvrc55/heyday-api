module.exports = ((sequelize, DataTypes) => {
    const Work = sequelize.define('Work', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        titleTr: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        subTitle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        subTitleTr: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        descriptionTr: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        metaDescription: {
            type: DataTypes.STRING,
            allowNull: true
        },
        slug: {
            type: DataTypes.STRING,
            allowNull: false
        }

    })

    return Work;
})