const cvsService = require("../services/cvsService");

const getAllCVs = (req, res) => {
  const cvs = cvsService.getAllCVs();

  res.status(200).json(cvs);
};

const createCV = (req, res) => {
  const createdCV = cvsService.createCV(req.body);
  res.status(201).json(createdCV);
};

const updateCV = (req, res) => {
  const id = Number(req.params.id);
  const updatedData = req.body;

  const updatedCV = cvsService.updateCV(id, updatedData);

  if (!updatedCV) {
    return res.status(404).json({
      message: "CV not found.",
    });
  }

  res.status(200).json(updatedCV);
};

const deleteCVs = (req, res) => {
  const { ids } = req.body;

  const deletedCount = cvsService.deleteCVs(ids);

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
