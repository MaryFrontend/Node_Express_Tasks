const { ErrorHandler } = require('../helpers/error');

const validateTask = async (req, res, next) => {
  try {
    const { id, title} = req.body;
    const description = req.body.description ;
    console.log(description);
    if (!title || title == null || !description || description == null) {
      throw new ErrorHandler(404, 'Invalid req data');
    }
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = { validateTask }