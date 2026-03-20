
function validate(schema,type) {

  return (req, res, next) => {
    const { error,value } = schema.validate(req[type]);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message
      });
    }
    req.body = value;
    next();
  };

};

module.exports = validate;