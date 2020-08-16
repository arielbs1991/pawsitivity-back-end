const Sequelize = require("sequelize");
const sequelize = require("./index");

//DO WE JUST WANT TO SAVE PETFINDERID, ISLIKED, SHELTERID(AUTOGENED), AND USERID(AUTOGENED) IN THIS TABLE, AND RENDER ALL THE OTHER ASPECTS THROUGH A QUERY AS NEEDED??? yes.

//have secondary query to return pet by petfinderid

module.exports = function (sequelize, DataTypes) {
    var Match = sequelize.define("Match", {
        isLiked: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        petfinderId: {
            type: DataTypes.STRING,
            allowNull: false,
            // unique: 'uniquePet',
            validate: {
                len: [1]
            }
        },
        // petName: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     // unique: 'uniquePet',
        //     validate: {
        //         len: [1]
        //     }
        // },
       
        // isDog: {
        //     type: DataTypes.BOOLEAN,
        //     // unique: 'uniquePet',
        //     allowNull: false
        // },
        // age: {
        //     type: DataTypes.STRING,
        //     // unique: 'uniquePet',
        //     notEmpty: false
        // },
        // breed: {
        //     type: DataTypes.STRING,
        //     // unique: 'uniquePet',
        //     notEmpty: false
        // },
        // sex: {
        //     type: DataTypes.STRING,
        //     // unique: 'uniquePet',
        //     notEmpty: false
        // },
        // size: {
        //     type: DataTypes.STRING,
        //     // unique: 'uniquePet',
        //     notEmpty: false
        // },
        // image: {
        //     type: DataTypes.STRING,
        //     notEmpty: false
        // },
        // likesKids: {
        //     type: DataTypes.BOOLEAN,
        //     allowNull: true
        // },
        // likesDogs: {
        //     type: DataTypes.BOOLEAN,
        //     allowNull: true
        // },
        // likesCats: {
        //     type: DataTypes.BOOLEAN,
        //     allowNull: true
        // },
    });

    Match.associate = function (models) {
        Match.belongsTo(models.User, {
            unique: 'uniqueMatch',
            foreignKey: 'userId',
            onDelete: 'cascade'
        });
        Match.belongsTo(models.Shelter, {
            unique: 'uniqueMatch',
            foreignKey: 'shelterId',
            onDelete: 'cascade'
        });
    };
    return Match;
};