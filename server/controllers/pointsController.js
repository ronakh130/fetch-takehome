const req = require('express/lib/request');

const pointsController = {
  getPoints(req, res, next) {
    const { id } = req.params;
    const { ids } = req.app.locals;

    if(id in ids) {
      res.locals.data = ids[id];
      return next();
    }

    return next({
      log: 'pointsController.getPoints: No receipt matched for ID',
      status: 404,
      message: { err: 'ERROR: No receipt found for that ID.' },
    });
  }
};

module.exports = { pointsController };
