module.exports = ((sequelize, DataTypes) => {
    const WorkImage = sequelize.define('WorkImages', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        imageLink: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isCover: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    })

    WorkImage.associate = (models) => {
        WorkImage.belongsTo(models.Work, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: {
                allowNull: false,
            },
        })
    };

    return WorkImage;
})