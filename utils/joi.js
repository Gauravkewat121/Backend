
function validate(schema) {

  return (req, res, next) => {

    const { error,value } = schema.validate(req.body);

    if (error) {
      console.log(error.details[0].message)
      return res.status(400).json({
        message: error.details[0].message
      });
    }
    console.log(value);
    req.body = value;
    next();
  };

};

module.exports = validate;