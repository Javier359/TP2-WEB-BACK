const { Sequelize } = require('sequelize');

let seqInstance = null;

const createInstance = async () => {
    const instance = new Sequelize(
        'studentsdb', // nombre de base de datos
        'root', // usuario
        'feoso123', // contraseña
        {
            host: 'localhost',
            dialect: 'mysql',
            pool: {
                max: 3
            },
            define: {
                // Aquí puedes definir opciones globales si es necesario
            }
        }
    );

    try {
        await instance.authenticate();
        console.log('Connection has been established successfully.');
        return instance;
    } catch (error) {
        throw new Error('Unable to connect to database');
    }
};

const getSeqInstance = async () => {
    if (!seqInstance) {
        seqInstance = await createInstance();
    }

    return seqInstance;
};

module.exports = {
    getSeqInstance,
    createInstance // Exporta también createInstance si es necesario
};