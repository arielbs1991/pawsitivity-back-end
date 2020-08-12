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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            //email validator
            validate: {
                len: [1]
            }
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
            notEmpty:false
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
