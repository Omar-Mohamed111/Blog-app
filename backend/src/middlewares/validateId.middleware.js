

const validateId = (paramNames) => {

  return (req, res, next) => {
    
    const id  = req.params[paramNames];

    const numId = Number(id);
    if (!Number.isInteger(numId) || numId <= 0) {
      return res.status(400).json({
        message: "Invalid ID",
      });
    }

    next();
  };
};

module.exports = validateId;
