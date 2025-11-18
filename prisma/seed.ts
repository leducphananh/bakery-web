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
        "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
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
        "https://images.unsplash.com/photo-1602663491496-73f07481dbea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      description: "Bánh kem tươi với dâu tây tự nhiên",
    },
  });

  const cake3 = await prisma.cake.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: "Bánh Vanilla Thơm Ngon",
      price: 100000,
      originalPrice: 130000,
      image:
        "https://images.unsplash.com/photo-1588195538326-c5b1e5b2f43c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
      description: "Bánh vanilla cổ điển, mềm mại và thơm ngon",
    },
  });

  console.log({ cake1, cake2, cake3 });
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
