const BaseJoi = require('joi');
const sanitizeHtml = require('sanitize-html');

const extension = (joi) => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.escapeHTML': '{{#label}} must not include HTML!'
    },
    rules: {
        escapeHTML: {
            validate(value, helpers){
                const clean = sanitizeHtml(value, {
                    allowedTags: [],
                    allowedAttributes: {},
                });
                if (clean !== value) return helpers.error('string.escapeHTML', { value });
                return clean;
            }
        }
    }
});

const Joi = BaseJoi.extend(extension)

module.exports.recordSchema = Joi.object({
    record: Joi.object({
        date: Joi.date().required(),
        duration: Joi.number().greater(0).required(),
        genre: Joi.string().required().valid('fiction', 'non-fiction'),
        bookName: Joi.string().required(),
        memo: Joi.string().required()
    }).required()
})

module.exports.settingSchema = Joi.object({
    setting: Joi.object({
        time: Joi.number().required().greater(0),
        num: Joi.number().required().greater(0)
    }).required()
})