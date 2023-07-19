const { body, validationResult} = require('express-validator');

const validate = (schemas)  => {
    return async (req, res, next) => {
      await Promise.all(schemas.map((schema) => schema.run(req)));

      const result = validationResult(req);
      if (result.isEmpty()) {
        return next();
      }

      const errors = result.array();
      return  res.send(errors)
    };
  }
 const userRegisterSchema = [
   body('name', 'name field is required').notEmpty(),
   body('email', 'email format unnaceptable').isEmail(),
   body('email', 'email field is required').notEmpty(),
   body('password', 'minimal character is 5').isLength({ min: 5 })
];

const userLoginSchema = [
    body('email', 'email field is required').notEmpty(),
    body('password', 'password field is required').notEmpty()
 ];

module.exports = {
    validate,
    userRegisterSchema,
    userLoginSchema
}