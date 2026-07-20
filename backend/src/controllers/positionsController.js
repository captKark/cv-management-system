const positionsService = require("../services/positionsService");

function getAllPositions(req, res) {
  const positions = positionsService.getAllPositions();

  res.json(positions);
}

module.exports = {
  getAllPositions,
};