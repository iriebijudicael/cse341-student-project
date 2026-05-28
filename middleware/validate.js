// // const Validator = require('validatorjs');
// // import { Validator } from 'validatorjs';
// import  validator  from '../controllers/validate.js';

// /**
//  * 1. Validation rules for the Contacts collection (7 Required Fields)
//  * Validates fields: firstName, lastName, email, favoriteColor, birthday
//  */
// const saveContact = (req, res, next) => {
//   const validationRule = {
//     firstName: 'required|string',
//     lastName: 'required|string',
//     email: 'required|string',
//     favoriteColor: 'required|string',
//     birthday: 'string'
//   };

//   validator(req.body, validationRule, {}, (err, status) => {
//     if (!status) {
//       res.status(400).send({
//         success: false,
//         message: 'Validation failed',
//         data: err
//       });
//     } else {
//       next();
//     }
//   });
// };

// /**
//  * 2. Validation for Tasks Collection
//  */
// const saveTask = (req, res, next) => {
//   const validationRule = {
//     firstName: 'required|string',
//     lastName: 'required|string',
//     email: 'required|string',
//     favoriteColor: 'required|string',
//     birthday: 'string'
//   };

//   validator(req.body, validationRule, {}, (err, status) => {
//     if (!status) {
//       res.status(400).send({
//         success: false,
//         message: 'Validation failed',
//         data: err
//       });
//     } else {
//       next();
//     }
//   });
// };

// // Export individual middleware functions using CommonJS format
// export {
//   saveContact, saveTask
// };







import Validator from 'validatorjs';

const validator = (body, rules, customMessages, callback) => {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};

const saveCourse = (req, res, next) => {
  const validationRule = {
    courseTitle: 'required|string|min:3',
    courseId: 'required|string',
    instructor: 'required|string',
    classMax: 'required|integer',
    currentEnrollment: 'required|integer',
    startDate: 'required|string',
    endDate: 'required|string'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: err.errors
      });
    }
    next();
  });
};

const saveInstructor = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    email: 'required|email',
    department: 'required|string',
    officeLocation: 'string'
  };

  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: err.errors
      });
    }
    next();
  });
};

export default {
  saveCourse,
  saveInstructor
};