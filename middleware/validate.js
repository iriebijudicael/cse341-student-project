// const Validator = require('validatorjs');
// import { Validator } from 'validatorjs';
import { validator } from '../controllers/validate.js';

/**
 * 1. Validation rules for the Contacts collection (7 Required Fields)
 * Validates fields: firstName, lastName, email, favoriteColor, birthday
 */

const saveContact = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    email: 'required|string',
    favoriteColor: 'required|string',
    birthday: 'string'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

// Export individual middleware functions using CommonJS format
export {
  saveContact
};