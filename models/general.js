module.exports = ((sequelize, DataTypes) => {
    const General = sequelize.define('General', {
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
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        descriptionTr: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        companyName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        locationLink: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contactEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                isEmail: true,
            }
        },
        workTogetherEmail: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                isEmail: true,
            }
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        faxNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        established: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        principal: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        instagram: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        facebook: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        linkedin: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    })

    return General;
})