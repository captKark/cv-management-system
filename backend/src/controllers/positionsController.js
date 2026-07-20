const positionsService = require("../services/positionsService");

const getAllPositions = (req, res) => {
  const positions = positionsService.getAllPositions();
  res.json(positions);
};

const createPosition = (req, res) => {
  const createdPosition = positionsService.createPosition(req.body);
  res.status(201).json(createdPosition);
};

module.exports = {
  getAllPositions,
  createPosition,
};