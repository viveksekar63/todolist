/**
 * Module dependencies.
 */
const validator = require('../helpers/validator');

/**
 * Schema Field Validation
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const activityValidation = (req, res, next) => {
    const validationRule = {
        "activityName": "required|string",
        "style":{
            "italic": "boolean",
            "bold": "boolean"
        },
        "activityStatus": "required|boolean",
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    data: err
                });
        } else {
            next();
        }
    });
}

/**
 * Exporting the Modules
 */
module.exports = { 
    activityValidation
}