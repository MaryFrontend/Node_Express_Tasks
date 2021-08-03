const { ErrorHandler } = require('../helpers/error');

const validateTask = (req, res, next) => {
    const { title, description } = req.body;
    if (!title || title === null || !description || description === null) {
      throw new ErrorHandler(404, 'Invalid req data');
    }
    next();
};

module.exports = { validateTask }