const { getSeqInstance } = require('./setupDb');
const { Students } = require('../model/studentsModels');
const initUserModel = require('../model/usersModel');

const setupModel = async () => {
    const sequelize = await getSeqInstance();
    Students.init(sequelize);  // Usamos el método 'init' en lugar de 'initModel'
    await initUserModel();
};

setupModel();
