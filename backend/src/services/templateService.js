const prisma = require("../lib/prisma");

const buildWhereClause = (search) => {
  if (!search) {
    return {};
  }

  return {
    name: {
      contains: search,
      mode: "insensitive",
    },
  };
};

const buildPagination = (page, pageSize) => {
  return {
    skip: (page - 1) * pageSize,
    take: pageSize,
  };
};

const getTemplates = async ({
  page,
  pageSize,
  search,
}) => {
  const where = buildWhereClause(search);

  const templates = await prisma.template.findMany({
    where,
    ...buildPagination(page, pageSize),
    orderBy: {
      name: "asc",
    },
    include: {
      attributes: {
        include: {
          attribute: true,
        },
      },
    },
  });

  const total = await prisma.template.count({
    where,
  });

  return {
    templates,
    total,
    totalPages: Math.ceil(total / pageSize),
  };
};

const getTemplateById = (id) => {
  return prisma.template.findUnique({
    where: {
      id,
    },
    include: {
      attributes: {
        include: {
          attribute: true,
        },
      },
    },
  });
};

const createTemplateAttributes = (
  tx,
  templateId,
  attributeIds,
) => {
  if (!attributeIds?.length) {
    return;
  }

  return tx.templateAttribute.createMany({
    data: attributeIds.map((attributeId) => ({
      templateId,
      attributeId,
    })),
  });
};
const findTemplateById = (client, id) => {
  return client.template.findUnique({
    where: { id },
    include: {
      attributes: {
        include: {
          attribute: true,
        },
      },
    },
  });
};
const createTemplate = async ({
  attributeIds = [],
  ...templateData
}) => {
  return prisma.$transaction(async (tx) => {
    const template = await tx.template.create({
      data: templateData,
    });

    await createTemplateAttributes(
      tx,
      template.id,
      attributeIds,
    );

    return findTemplateById(tx, template.id);
  });
};

const updateTemplate = async (
  id,
  {
    attributeIds = [],
    ...templateData
  },
) => {
  return prisma.$transaction(async (tx) => {
    await tx.template.update({
      where: {
        id,
      },
      data: templateData,
    });

    await tx.templateAttribute.deleteMany({
      where: {
        templateId: id,
      },
    });

    await createTemplateAttributes(
      tx,
      id,
      attributeIds,
    );

    return findTemplateById(tx, id);
  });
};

const deleteTemplates = (ids) => {
  return prisma.template.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
};
const generatePositionFromTemplate = async (id) => {
  return prisma.$transaction(async (tx) => {
    const template =
      await tx.template.findUnique({
        where: {
          id,
        },
        include: {
          attributes: true,
        },
      });

    if (!template) {
      return null;
    }

    const position =
      await tx.position.create({
        data: {
          title: template.name,
          department: template.department,
          location: template.location,
          visibility: template.visibility,
          projectTag: template.projectTag,
          maxProjects: template.maxProjects,
          description: template.description,
          status: "Active",
        },
      });

    if (template.attributes.length > 0) {
      await tx.positionAttribute.createMany({
        data: template.attributes.map(
          (attribute) => ({
            positionId: position.id,
            attributeId:
              attribute.attributeId,
          }),
        ),
      });
    }

    return position;
  });
};
module.exports = {
  getTemplates,
  getTemplateById,
  createTemplate,
  updateTemplate,
  deleteTemplates,
  generatePositionFromTemplate,
};