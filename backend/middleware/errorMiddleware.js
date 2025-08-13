module.exports = (err, req, res, next) => {
  console.error(err);
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid ID format.' });
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  }
  if (err.code === 11000) {
    return res.status(409).json({ message: 'Duplicate key error.' });
  }
  res.status(err.status || 500).json({ message: err.message || 'Server Error' });
};