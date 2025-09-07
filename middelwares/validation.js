

function validateId(req, res, next) {
  const id = req.params.id;
  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Invalid format" });
  }
  req.userId = id;
  next();
}
module.exports = { validateId };