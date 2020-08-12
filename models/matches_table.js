const Sequelize = require("sequelize");
const sequelize = require("./index");

module.exports = function (sequelize, DataTypes) {
    var Matches = sequelize.define("Matches", {
       isLiked: {
           type: DataTypes.BOOLEAN,
           allowNull: false
       },
       petName: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: 'uniquePet',
        validate: {
            len: [1]
        }
    },
    isDog: {
        type: DataTypes.BOOLEAN,
        // unique: 'uniquePet',
        allowNull: false
    },
    age: {
        type: DataTypes.STRING,
        // unique: 'uniquePet',
        notEmpty:false
    },
    breed: {
        type: DataTypes.STRING,
        // unique: 'uniquePet',
        notEmpty:false
    },
    sex: {
        type: DataTypes.STRING,
        // unique: 'uniquePet',
        notEmpty:false
    },
    size: {
        type: DataTypes.STRING,
        // unique: 'uniquePet',
        notEmpty:false
    },
    likesKids: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    likesDogs: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    likesCats: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
    });

    Matches.associate = function (models) {
        Matches.belongsTo(models.User, { 
            unique: 'uniqueMatches',
            foreignKey: 'userId', 
            onDelete: 'cascade' 
        });
        Matches.belongsTo(models.Shelter, { 
            unique: 'uniqueMatches',
            foreignKey: 'shelterId', 
            onDelete: 'cascade' 
        });
        // Matches.belongsTo(models.Pet, {
        //     unique: 'uniqueMatches',
        //     foreignKey: 'petId',
        //     onDelete: 'cascade'
        // });
    };
    return Matches;
};