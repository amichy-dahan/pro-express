


function validateId(req, res, next) {
  const id = Number(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({ error: 'Invalid format' });
  }
  req.userId = id;
  next();
}


module.exports={ validateId};