const { Op } = require('sequelize');
const generateResponse = require("../shared/serviceResponse")

const createUser = (userRepository, authService) => (displayName, email, password, image) => {
    
}

const userExists = (userRepository) => async (email, password) => {
    const user = await userRepository.findOne({
        where: {
            [Op.and]: [
                { email: email.toLowerCase() },
                { password: password.toLowerCase() },
            ],
        },
    });

    return user !== null;
};

module.exports = { userExists };
