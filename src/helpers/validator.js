
/**
 * Module dependencies.
 */
const Validator = require('validatorjs');

/**
 * 
 * @param {*} body 
 * @param {*} rules 
 * @param {*} customMessages 
 * @param {*} callback 
 */
const validator = (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};

/**
 * exporting the modules
 */
module.exports = validator;