const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.attribute.deleteMany();

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
      }
    ],
  });

  console.log("Attributes seeded successfully.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());