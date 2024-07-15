import { PrismaClient } from "@prisma/client";

const main = async () => {
  const prisma = new PrismaClient();

  const user = await prisma.users.create({
    data: {
      name: "Project PAGSACA",
      email: "project@pagsaca.com",
      password: "password",
    },
  });
  console.log("User created: ", user);

  const setup = await prisma.setups.create({
    data: {
      name: "Demo Setup",
      userId: user.id,
    },
  });
  console.log("Setup created: ", setup);

  const module = await prisma.modules.createMany({
    data: [
      {
        name: "Module 1",
        setupId: setup.id,
      },
      {
        name: "Module 2",
        setupId: setup.id,
      },
    ],
  });
  console.log("Modules created: ", module);
};

main();
