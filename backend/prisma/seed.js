const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();
const createTemplate = (data) => {
  return prisma.template.create({ data });
};
async function main() {
  await prisma.cVAttributeValue.deleteMany();
  await prisma.positionAttribute.deleteMany();
  await prisma.templateAttribute.deleteMany();
  await prisma.cV.deleteMany();
  await prisma.position.deleteMany();
  await prisma.template.deleteMany();
  await prisma.attribute.deleteMany();
  await prisma.user.deleteMany();

  const adminPassword = await bcrypt.hash("admin123", 10);
  const recruiterPassword = await bcrypt.hash("recruit123", 10);
  const candidatePassword = await bcrypt.hash("candidate123", 10);

  await prisma.user.createMany({
    data: [
      {
        name: "Administrator",
        email: "admin@test.com",
        passwordHash: adminPassword,
        role: "admin",
      },
      {
        name: "Recruiter",
        email: "recruiter@test.com",
        passwordHash: recruiterPassword,
        role: "recruiter",
      },
      {
        name: "Candidate",
        email: "candidate@test.com",
        passwordHash: candidatePassword,
        role: "candidate",
      },
    ],
  });
  const candidate = await prisma.user.findUnique({
    where: {
      email: "candidate@test.com",
    },
  });

  const frontend = await prisma.position.create({
    data: {
      title: "Frontend Developer",
      department: "Engineering",
      location: "Remote",
      status: "Active",
    },
  });

  const backend = await prisma.position.create({
    data: {
      title: "Backend Developer",
      department: "Engineering",
      location: "Remote",
      status: "Active",
    },
  });

  await prisma.position.createMany({
    data: [
      {
        title: "Data Analyst",
        department: "Analytics",
        location: "New York, NY",
        status: "Interviewing",
      },
      {
        title: "Product Manager",
        department: "Product",
        location: "London, UK",
        status: "On Hold",
      },
      {
        title: "HR Generalist",
        department: "Human Resources",
        location: "Austin, TX",
        status: "Active",
      },
      {
        title: "DevOps Engineer",
        department: "Engineering",
        location: "Remote",
        status: "Closed",
      },
      {
        title: "Systems Administrator",
        department: "Infrastructure",
        location: "Berlin",
        status: "Active",
      },
      {
        title: "Fullstack Developer",
        department: "Engineering",
        location: "San Francisco, CA",
        status: "Interviewing",
      },
      {
        title: "QA Automation Engineer",
        department: "Quality Assurance",
        location: "Remote",
        status: "Active",
      },
      {
        title: "Product Designer",
        department: "Product",
        location: "London, UK",
        status: "On Hold",
      },
      {
        title: "Scrum Master",
        department: "Product",
        location: "Remote",
        status: "Active",
      },
      {
        title: "Talent Acquisition Specialist",
        department: "Human Resources",
        location: "Austin, TX",
        status: "Active",
      },
      {
        title: "Financial Analyst",
        department: "Finance",
        location: "New York, NY",
        status: "Interviewing",
      },
      {
        title: "Security Engineer",
        department: "Infrastructure",
        location: "Remote",
        status: "Active",
      },
      {
        title: "Cloud Architect",
        department: "Infrastructure",
        location: "Seattle, WA",
        status: "Closed",
      },
      {
        title: "Technical Writer",
        department: "Product",
        location: "Remote",
        status: "Active",
      },
      {
        title: "Data Engineer",
        department: "Analytics",
        location: "Austin, TX",
        status: "Active",
      },
      {
        title: "Compensation Specialist",
        department: "Human Resources",
        location: "Remote",
        status: "On Hold",
      },
    ],
  });

  const templates = await Promise.all([
    createTemplate({
      name: "Frontend Developer Template",
      department: "Engineering",
      location: "Remote",
      visibility: "Public",
      projectTag: "Frontend",
      maxProjects: 5,
      description: "Template for frontend engineering positions.",
    }),

    createTemplate({
      name: "Backend Developer Template",
      department: "Engineering",
      location: "Remote",
      visibility: "Public",
      projectTag: "Backend",
      maxProjects: 5,
      description: "Template for backend engineering positions.",
    }),

    createTemplate({
      name: "Full Stack Developer Template",
      department: "Engineering",
      location: "Remote",
      visibility: "Public",
      projectTag: "Full Stack",
      maxProjects: 5,
      description: "Template for full stack engineering positions.",
    }),

    createTemplate({
      name: "QA Engineer Template",
      department: "Quality Assurance",
      location: "Remote",
      visibility: "Public",
      projectTag: "QA",
      maxProjects: 5,
      description: "Template for QA engineering positions.",
    }),
  ]);

  await prisma.attribute.createMany({
    data: [
      { name: "First Name", category: "Personal", type: "Text" },
      { name: "Last Name", category: "Personal", type: "Text" },
      { name: "Email", category: "Contact", type: "Email" },
      { name: "Phone", category: "Contact", type: "Phone" },
      { name: "GitHub", category: "Links", type: "URL" },
      { name: "LinkedIn", category: "Links", type: "URL" },
      { name: "University", category: "Education", type: "Text" },
      { name: "Degree", category: "Education", type: "Text" },
      { name: "GPA", category: "Education", type: "Number" },
      {
        name: "Programming Language",
        category: "Skills",
        type: "Text",
      },
    ],
  });

  const allAttributes = await prisma.attribute.findMany({
    orderBy: {
      id: "asc",
    },
  });

  await prisma.positionAttribute.createMany({
    data: allAttributes.map((attribute) => ({
      positionId: frontend.id,
      attributeId: attribute.id,
    })),
  });

  await prisma.positionAttribute.createMany({
    data: allAttributes.map((attribute) => ({
      positionId: backend.id,
      attributeId: attribute.id,
    })),
  });

  const getAttributeId = (name) => {
    const attribute = allAttributes.find(
      (attribute) => attribute.name === name,
    );

    if (!attribute) {
      throw new Error(`Attribute "${name}" not found.`);
    }

    return attribute.id;
  };

  const frontendAttributes = [
    "First Name",
    "Last Name",
    "Email",
    "GitHub",
    "Programming Language",
  ];

  const backendAttributes = [
    "First Name",
    "Last Name",
    "Email",
    "Programming Language",
    "University",
    "Degree",
  ];

  const fullStackAttributes = [
    "First Name",
    "Last Name",
    "Email",
    "GitHub",
    "LinkedIn",
    "Programming Language",
    "University",
    "Degree",
  ];

  const qaAttributes = [
    "First Name",
    "Last Name",
    "Email",
    "Phone",
    "Programming Language",
  ];

  const templateAttributeMap = [
    {
      template: templates[0],
      attributes: frontendAttributes,
    },
    {
      template: templates[1],
      attributes: backendAttributes,
    },
    {
      template: templates[2],
      attributes: fullStackAttributes,
    },
    {
      template: templates[3],
      attributes: qaAttributes,
    },
  ];

  for (const item of templateAttributeMap) {
    await prisma.templateAttribute.createMany({
      data: item.attributes.map((name) => ({
        templateId: item.template.id,
        attributeId: getAttributeId(name),
      })),
    });
  }

  const createdJohn = await prisma.cV.create({
    data: {
      candidateId: candidate.id,
      positionId: frontend.id,
      positionTitle: frontend.title,
      status: "Draft",
      updatedAt: "2026-07-21",
    },
  });

  const createdJane = await prisma.cV.create({
    data: {
      candidateId: candidate.id,
      positionId: backend.id,
      positionTitle: backend.title,
      status: "Submitted",
      updatedAt: "2026-07-20",
    },
  });

  for (const cv of [createdJohn, createdJane]) {
    const position = await prisma.position.findUnique({
      where: {
        id: cv.positionId,
      },
      include: {
        attributes: true,
      },
    });

    if (position.attributes.length > 0) {
      await prisma.cVAttributeValue.createMany({
        data: position.attributes.map((attribute) => ({
          cvId: cv.id,
          attributeId: attribute.attributeId,
          value: "",
        })),
      });
    }
  }

  console.log("Database seeded successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
