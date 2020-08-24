const Sequelize = require("sequelize");
const sequelize = require("./index");

//add constraints and validators later
module.exports = function (sequelize, DataTypes) {
    var Animal = sequelize.define("Animal", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        type: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        location: {
            type: DataTypes.STRING,
            allowNull:true
        },
        imageSrc: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        breed: {
            type: DataTypes.STRING,
            allowNull: true
        },
        secondaryBreed: {
            type: DataTypes.STRING,
            allowNull: true
        },
        age: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        sex: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        size: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bio: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        likesCats: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        likesDogs: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        likesKids: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        isShelterAnimal: {
            type: DataTypes.BOOLEAN,
            default: true,
        }
    });

    Animal.associate = function (models) {
        Animal.hasMany(models.AnimalMatch, {
            onDelete: 'cascade'
        });
        Animal.belongsTo(models.AnimalShelter, {
            onDelete: 'cascade'
        });
    };

    return Animal;
};