const positionsService = require("../services/positionsService");

const getAllPositions = async (req, res) => {
  const positions = await positionsService.getAllPositions();

  res.json(positions);
};

const createPosition = async (req, res) => {
  const createdPosition = await positionsService.createPosition(req.body);

  res.status(201).json(createdPosition);
};

const updatePosition = async (req, res) => {
  const id = Number(req.params.id);

  const updatedPosition = await positionsService.updatePosition(id, req.body);

  if (!updatedPosition) {
    return res.status(404).json({
      message: "Position not found.",
    });
  }

  res.json(updatedPosition);
};
const deletePositions = async (req, res) => {
  const { ids } = req.body;

  const deletedCount = await positionsService.deletePositions(ids);

  res.status(200).json({
    message: "Positions deleted successfully.",
    deletedCount,
  });
};

const duplicatePosition = async (req, res) => {
  const id = Number(req.params.id);

  const duplicatedPosition = await positionsService.duplicatePosition(id);

  if (!duplicatedPosition) {
    return res.status(404).json({
      message: "Position not found.",
    });
  }

  res.status(201).json(duplicatedPosition);
};
const getPositionTemplate = async (req, res) => {
  const id = Number(req.params.id);

  const position = await positionsService.getPositionTemplate(id);

  if (!position) {
    return res.status(404).json({
      message: "Position not found.",
    });
  }

  res.json(position);
};
module.exports = {
  getAllPositions,
  createPosition,
  updatePosition,
  deletePositions,
  duplicatePosition,
  getPositionTemplate,
  
};
