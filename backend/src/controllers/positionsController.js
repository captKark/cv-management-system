const positionsService = require("../services/positionsService");

const getAllPositions = (req, res) => {
  const positions = positionsService.getAllPositions();
  res.json(positions);
};

const createPosition = (req, res) => {
  const createdPosition = positionsService.createPosition(req.body);
  res.status(201).json(createdPosition);
};

const updatePosition = (req, res) => {
  const id = Number(req.params.id);
  const updatedPosition = positionsService.updatePosition(id, req.body);

  if (!updatedPosition) {
    return res.status(404).json({
      message: "Position not found.",
    });
  }

  res.json(updatedPosition);
};
const deletePositions = (req, res) => {
  const { ids } = req.body;

  const deletedCount = positionsService.deletePositions(ids);

  res.status(200).json({
    message: "Positions deleted successfully.",
    deletedCount,
  });
};

const duplicatePosition = (req, res) => {
  const { id } = req.params;

  const duplicatedPosition = positionsService.duplicatePosition(id);

  if (!duplicatedPosition) {
    return res.status(404).json({
      message: "Position not found.",
    });
  }

  res.status(201).json(duplicatedPosition);
};
module.exports = {
  getAllPositions,
  createPosition,
  updatePosition,
  deletePositions,
  duplicatePosition,
};