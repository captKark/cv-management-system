const cvsService = require("../services/cvsService");

const getAllCVs = async (req, res) => {
  const cvs = await cvsService.getAllCVs();

  res.status(200).json(cvs);
};

const createCV = async (req, res) => {
  const createdCV = await cvsService.createCV(req.body);

  res.status(201).json(createdCV);
};

const updateCV = async (req, res) => {
  const id = Number(req.params.id);

  const updatedCV = await cvsService.updateCV(id, req.body);

  if (!updatedCV) {
    return res.status(404).json({
      message: "CV not found.",
    });
  }

  res.json(updatedCV);
};

const deleteCVs = async (req, res) => {
  const { ids } = req.body;

  const deletedCount = await cvsService.deleteCVs(ids);

  res.status(200).json({
    message: "CVs deleted successfully.",
    deletedCount,
  });
};

module.exports = {
  getAllCVs,
  createCV,
  updateCV,
  deleteCVs,
};
