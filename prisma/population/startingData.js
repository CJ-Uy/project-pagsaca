import { PrismaClient } from "@prisma/client";

const main = async () => {
  const prisma = new PrismaClient();

  const user = await prisma.users.create({
    data: {
      name: "Project PAGSACA",
      email: "testemail@gmail.com",
      password: "password",
    },
  });

  const setup = await prisma.setups.create({
    data: {
      name: "Setup 1",
      userId: user.id,
    },
  });

  const module = await prisma.modules.create({
    data: {
      name: "Module 1",
      setupId: setup.id,
    },
  });

  console.log("User created: ", user);
  console.log("Setup created: ", setup);
  console.log("Module created: ", module);
};

main();
