/* eslint-disable @typescript-eslint/no-misused-promises */
import { PrismaClient, Category, Product } from '@prisma/client';
import { faker } from '@faker-js/faker';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  const categories: Category[] = Array.from({ length: 5 }).map(
    (_value, index) => ({
      name: faker.commerce.productMaterial(),
      id: index + 1,
    }),
  );

  await prisma.category.createMany({ data: categories, skipDuplicates: true });

  const products: Product[] = Array.from({ length: 10 }).map(
    (_value, index) => ({
      id: index + 1,
      name: faker.commerce.productName(),
      price: +faker.commerce.price({ min: 10, max: 100 }),
      qty: faker.helpers.rangeToNumber({ min: 10, max: 100 }),
    }),
  );

  await prisma.product.createMany({ data: products, skipDuplicates: true });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
