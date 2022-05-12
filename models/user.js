module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 50],
                notNull: true,
            },
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 50],
                notNull: true,
            },
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [2, 50],
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true,
        },

        phone: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [10,15]
            },
        },
        password: {
            type: DataTypes.STRING,
            trim: true,
            allowNull: true,
        },

    });

    User.associate = (models) => {
        User.belongsTo(models.Roles, {
            foreignKey: {
                allowNull: false
            }
        })
    };

    return User;
};