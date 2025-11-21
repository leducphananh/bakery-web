import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  const cake1 = await prisma.cake.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: "Bánh Socola Mơ Ước",
      price: 120000,
      originalPrice: 150000,
      image:
        "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjYWtlfGVufDF8fHx8MTc2Mjk1MTMxNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Bánh socola đậm đà với lớp kem mềm mịn",
    },
  });

  const cake2 = await prisma.cake.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: "Bánh Dâu Tây Ngọt Ngào",
      price: 135000,
      originalPrice: 170000,
      image:
        "https://images.unsplash.com/photo-1602663491496-73f07481dbea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJhd2JlcnJ5JTIwY2FrZXxlbnwxfHx8fDE3NjI5NTU3NjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Bánh kem tươi với dâu tây tự nhiên",
    },
  });

  const cake3 = await prisma.cake.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: "Hộp Bánh Cupcake Vani",
      price: 85000,
      originalPrice: 110000,
      image:
        "https://images.unsplash.com/photo-1723638174646-5322cd088233?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YW5pbGxhJTIwY3VwY2FrZXN8ZW58MXx8fHwxNzYzMDA1MDgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Cupcake vani thơm ngon, mềm mịn",
    },
  });

  const cake4 = await prisma.cake.upsert({
    where: { id: 4 },
    update: {},
    create: {
      name: "Bánh Tart Chanh Dây",
      price: 98000,
      originalPrice: 125000,
      image:
        "https://images.unsplash.com/photo-1543508185-225c92847541?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZW1vbiUyMHRhcnR8ZW58MXx8fHwxNzYzMDA1MDgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Bánh tart chanh dây chua ngọt thanh mát",
    },
  });

  const cake5 = await prisma.cake.upsert({
    where: { id: 5 },
    update: {},
    create: {
      name: "Macaron Pháp",
      price: 95000,
      originalPrice: 120000,
      image:
        "https://images.unsplash.com/photo-1452130200010-cdd9424b1729?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNhcm9ucyUyMHBhc3RyeXxlbnwxfHx8fDE3NjI5NDA0NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Macaron Pháp đặc trưng với nhiều hương vị",
    },
  });

  const cake6 = await prisma.cake.upsert({
    where: { id: 6 },
    update: {},
    create: {
      name: "Bánh Phô Mai Việt Quất",
      price: 125000,
      originalPrice: 155000,
      image:
        "https://images.unsplash.com/photo-1567327613485-fbc7bf196198?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibHVlYmVycnklMjBjaGVlc2VjYWtlfGVufDF8fHx8MTc2MjkyMzg3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      description: "Bánh phô mai mềm mịn với việt quất tươi",
    },
  });

  console.log({ cake1, cake2, cake3, cake4, cake5, cake6 });
  console.log("Seeding finished.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
