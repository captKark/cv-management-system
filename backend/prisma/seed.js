const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.positionAttribute.deleteMany();
  await prisma.cVAttributeValue.deleteMany();
  await prisma.cV.deleteMany();
  await prisma.attribute.deleteMany();
  await prisma.position.deleteMany();

  // ---------------- Positions ----------------

  await prisma.position.createMany({
    data: [
      {
        title: "Frontend Developer",
        department: "Engineering",
        location: "Remote",
        status: "Active",
      },
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
        title: "Backend Engineer",
        department: "Engineering",
        location: "Remote",
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

  // ---------------- Attributes ----------------

  await prisma.attribute.createMany({
    data: [
      {
        name: "First Name",
        category: "Personal",
        type: "Text",
      },
      {
        name: "Last Name",
        category: "Personal",
        type: "Text",
      },
      {
        name: "Email",
        category: "Contact",
        type: "Email",
      },
      {
        name: "Phone",
        category: "Contact",
        type: "Phone",
      },
      {
        name: "GitHub",
        category: "Links",
        type: "URL",
      },
      {
        name: "LinkedIn",
        category: "Links",
        type: "URL",
      },
      {
        name: "University",
        category: "Education",
        type: "Text",
      },
      {
        name: "Degree",
        category: "Education",
        type: "Text",
      },
      {
        name: "GPA",
        category: "Education",
        type: "Number",
      },
      {
        name: "Programming Language",
        category: "Skills",
        type: "Text",
      },
    ],
  });

  // ---------------- CVs ----------------

  await prisma.cV.createMany({
    data: [
      {
        candidateName: "John Smith",
        positionId: 1,
        positionTitle: "Frontend Developer",
        status: "Draft",
        updatedAt: "2026-07-21",
      },
      {
        candidateName: "Jane Doe",
        positionId: 2,
        positionTitle: "Data Analyst",
        status: "Submitted",
        updatedAt: "2026-07-20",
      },
    ],
  });

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
