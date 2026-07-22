const positionAttributeService = require("../services/positionAttributeService");

const getPositionAttributes = async (req, res) => {
  const positionId = Number(req.params.id);

  const position =
    await positionAttributeService.getPositionAttributes(positionId);

  if (!position) {
    return res.status(404).json({
      message: "Position not found.",
    });
  }

  res.json(position);
};

const updatePositionAttributes = async (req, res) => {
  const positionId = Number(req.params.id);

  const { attributeIds } = req.body;

  const updated =
    await positionAttributeService.updatePositionAttributes(
      positionId,
      attributeIds,
    );

  res.json(updated);
};

module.exports = {
  getPositionAttributes,
  updatePositionAttributes,
};