const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.cV.deleteMany();

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
        positionTitle: "Backend Developer",
        status: "Submitted",
        updatedAt: "2026-07-20",
      },
    ],
  });

  console.log("CVs seeded successfully.");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });