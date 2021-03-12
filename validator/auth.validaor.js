const Joi = require('@hapi/joi');

const loginValidator = data => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    return schema.validate(data);
}

const createAccountValidator = data => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });
    return schema.validate(data);
}

module.exports.loginValidator = loginValidator;
module.exports.createAccountValidator = createAccountValidator;