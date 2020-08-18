const Sequelize = require("sequelize");
const sequelize = require("./index");
const bcrypt = require('bcrypt')

module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            // unique: true,
            validate: {
                len: [1]
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            // unique: true,
            validate: {
                len: [1]
            }
        },
        password: {
            type: DataTypes.STRING(15),
            is: /^[0-9a-f]{64$/i,
                validate: {
                    len: [6, 15]
                }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            isEmail: true
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        postcode: {
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
        User.hasMany(models.Match, {
            foreignKey: 'userId',
            unique: 'uniqueMatch',
            onDelete: 'cascade'
        });
    };
    // REMOVE COMMENT WHEN YOU WANT TO HASH AND SALT PASSWORDS
    // User.beforeCreate(function (user){
    //     user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null)
    // })
    return User;
};
