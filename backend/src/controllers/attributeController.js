const attributeService = require("../services/attributeService");

const getAllAttributes = async (req, res) => {
  const attributes = await attributeService.getAllAttributes();

  res.json(attributes);
};

const createAttribute = async (req, res) => {
  try {
    const createdAttribute = await attributeService.createAttribute(req.body);

    res.status(201).json(createdAttribute);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const updateAttribute = async (req, res) => {
  const id = Number(req.params.id);

  try {
    const updatedAttribute = await attributeService.updateAttribute(
      id,
      req.body,
    );

    if (!updatedAttribute) {
      return res.status(404).json({
        message: "Attribute not found.",
      });
    }

    res.json(updatedAttribute);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const deleteAttributes = async (req, res) => {
  const { ids } = req.body;

  const deletedCount = await attributeService.deleteAttributes(ids);

  res.status(200).json({
    message: "Attributes deleted successfully.",
    deletedCount,
  });
};

module.exports = {
  getAllAttributes,
  createAttribute,
  updateAttribute,
  deleteAttributes,
};