const Sequelize = require("sequelize");
const sequelize = require("./index");

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [1]
            }
        },
        // password: {
        //     type: DataTypes.STRING(64),
        //     is: /^[0-9a-f]{64$/i
        // },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            isEmail: true
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: true,
            notEmpty: false
        },
        hasKids: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        hasCats: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        hasDogs: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        whichSpecies: {
            type: DataTypes.STRING,
            allowNull: true,
            notEmpty: false
        }
    });

    User.associate = function (models) {
        User.hasMany(models.Matches, {
            foreignKey: 'userId',
            unique: 'uniqueMatches',
            onDelete: 'cascade'
        });
    };
    return User;
};
