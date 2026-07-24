const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // ---------- Clear Database ----------

  await prisma.cVAttributeValue.deleteMany();
  await prisma.positionAttribute.deleteMany();
  await prisma.cV.deleteMany();
  await prisma.attribute.deleteMany();
  await prisma.position.deleteMany();

  // ---------- Seed Positions ----------

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

  // ---------- Seed Attributes ----------

  const attributes = await prisma.attribute.createMany({
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
      { name: "Programming Language", category: "Skills", type: "Text" },
    ],
  });

  const allAttributes = await prisma.attribute.findMany({
    orderBy: {
      id: "asc",
    },
  });

  // ---------- Assign Attributes to Positions ----------

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

  // ---------- Seed CVs ----------

  const createdJohn = await prisma.cV.create({
    data: {
      candidateName: "John Smith",
      positionId: frontend.id,
      positionTitle: frontend.title,
      status: "Draft",
      updatedAt: "2026-07-21",
    },
  });

  const createdJane = await prisma.cV.create({
    data: {
      candidateName: "Jane Doe",
      positionId: backend.id,
      positionTitle: backend.title,
      status: "Submitted",
      updatedAt: "2026-07-20",
    },
  });

  // ---------- Generate CV Attribute Values ----------

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