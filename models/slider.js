module.exports = ((sequelize, DataTypes) => {
    const Slider = sequelize.define('Sliders', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        image: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,

        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        subTitle: {
            type: DataTypes.STRING,
            allowNull: false,
        },

    })

    Slider.associate = (models) => {
        Slider.belongsTo(models.Work, {
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
            foreignKey: {
                allowNull: true,
            },
        })
    };

    return Slider;
})