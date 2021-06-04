const Joi = require('@hapi/joi');

const notesValidation = data => {

    const sanitizeSchema = Joi.object({
        notesTitle: Joi.string().min(6).required(),
        notesBody: Joi.string().min(6).required()
    });

    return sanitizeSchema.validate(data);
}

module.exports.notesValidation = notesValidation;