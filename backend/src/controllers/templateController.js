const templateService = require("../services/templateService");

const getTemplates = async (req, res) => {
  const {
    page = 1,
    pageSize = 5,
    search = "",
  } = req.query;

  const templates =
    await templateService.getTemplates({
      page: Number(page),
      pageSize: Number(pageSize),
      search,
    });

  res.status(200).json(templates);
};

const getTemplateById = async (req, res) => {
  const template =
    await templateService.getTemplateById(
      Number(req.params.id),
    );

  if (!template) {
    return res.status(404).json({
      message: "Template not found.",
    });
  }

  res.status(200).json(template);
};

const createTemplate = async (req, res) => {
  const template =
    await templateService.createTemplate(
      req.body,
    );

  res.status(201).json(template);
};

const updateTemplate = async(req,res)=>{
 const template =
   await templateService.updateTemplate(
     Number(req.params.id),
     req.body
   );

 res.status(200).json(template);
}

const deleteTemplates = async (req, res) => {
  await templateService.deleteTemplates(
    req.body.ids,
  );

  res.sendStatus(204);
};
const generatePosition = async (req, res) => {
  const id = Number(req.params.id);

  const position =
    await templateService.generatePositionFromTemplate(
      id,
    );

  if (!position) {
    return res.status(404).json({
      message: "Template not found.",
    });
  }

  res.status(201).json(position);
};
module.exports = {
  getTemplates,
  getTemplateById,
  createTemplate,
  updateTemplate,
  deleteTemplates,
  generatePosition,
};