import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import booksSeedData from './seed/2-book.json';

config();

const prisma = new PrismaClient();

async function seedBook({ prisma }: { prisma: PrismaClient }) {
  console.log(`This script will seed books`);

  const totalExistingBooks = await prisma.book.count();

  if (totalExistingBooks > 0) {
    console.log(
      `There are already ${totalExistingBooks} books in the system. Seeding operation is aborted.`,
    );
    return;
  }

  const totalBooksToCreate = booksSeedData.length;

  console.log(`Books to create: ${totalBooksToCreate}`);

  try {
    const result = await prisma.book.createMany({
      data: booksSeedData,
    });

    console.log(`Created ${result.count} borrowers`);
  } catch (error) {
    console.log(`Error occurred: ${error}`);
  }

  console.log(`Seeding ${totalBooksToCreate} books completed`);
}

async function main() {
  console.log('Starting script...');
  await seedBook({ prisma });
  console.log('Script completed');
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

process.on('SIGINT', () => {
  void (async () => {
    console.log(
      'SIGINT signal received. Attempting graceful disconnect of database...',
    );
    try {
      await prisma.$disconnect();
      process.exit(0);
    } catch (error) {
      console.error('Error during Prisma disconnect on SIGINT:', error);
      process.exit(1);
    }
  })();
});

process.on('SIGTERM', () => {
  void (async () => {
    console.log(
      'SIGTERM signal received. Attempting graceful disconnect of database...',
    );
    try {
      await prisma.$disconnect();
      process.exit(0);
    } catch (error) {
      console.error('Error during Prisma disconnect on SIGTERM:', error);
      process.exit(1);
    }
  })();
});
