const cvsService = require("../services/cvsService");

const getAllCVs = async (req, res) => {
  const cvs = await cvsService.getAllCVs();

  res.status(200).json(cvs);
};

const createCV = async (req, res) => {
  const cvData = { ...req.body };

  if (req.user.role === "candidate") {
    cvData.candidateId = req.user.id;
  }

  const createdCV = await cvsService.createCV(cvData);

  res.status(201).json(createdCV);
};

const updateCV = async (req, res) => {
  const id = Number(req.params.id);

  const existingCV = await cvsService.getCVById(id);

  if (!existingCV) {
    return res.status(404).json({
      message: "CV not found.",
    });
  }

  if (
    req.user.role === "candidate" &&
    existingCV.candidateId !== req.user.id
  ) {
    return res.status(403).json({
      message: "You can only modify your own CVs.",
    });
  }

  const updatedCV = await cvsService.updateCV(id, req.body);

  res.json(updatedCV);
};
const updateAttributeValues = async (req, res) => {
  const cvId = Number(req.params.id);

  await cvsService.updateAttributeValues(cvId, req.body);

  res.json({
    message: "Attribute values updated successfully.",
  });
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
  updateAttributeValues,
};
