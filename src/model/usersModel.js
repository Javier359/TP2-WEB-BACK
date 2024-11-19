const { DataTypes, Model } = require('sequelize');
const { getSeqInstance } = require('../config/setupDb');

class User extends Model {}

const initUserModel = async () => {
    const sequelize = await getSeqInstance();

    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
    });

    return User;  // Devuelve la clase User ya inicializada
};

module.exports = initUserModel;
