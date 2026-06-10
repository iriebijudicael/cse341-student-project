const Validator = require('validatorjs');

// Core validator utility helper engine
const validator = (body, rules, customMessages, callback) => {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};

// -------------------------------------------------------------------------
// USERS COLLECTION VALIDATION RULES (POST & PUT)
// -------------------------------------------------------------------------
const saveUser = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string|min:2',
    lastName: 'required|string|min:2',
    email: 'required|email',
    role: 'string|in:customer,admin' // Ensures role can only be customer or admin if provided
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

// -------------------------------------------------------------------------
// PRODUCTS COLLECTION VALIDATION RULES (POST & PUT)
// -------------------------------------------------------------------------
const saveProduct = (req, res, next) => {
  const validationRule = {
    title: 'required|string|min:3',
    description: 'required|string',
    category: 'required|string',
    price: 'required|numeric|min:0', // Validates price is a decimal/number and not negative
    stock: 'required|integer|min:0'   // Validates stock quantity is a whole integer
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

module.exports = { 
  validator, 
  saveUser, 
  saveProduct 
};