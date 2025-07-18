import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import booksSeedData from './seed/2-book.json';

config();

const prisma = new PrismaClient();

async function seedBook({ prisma }: { prisma: PrismaClient }) {
  console.log(`This script will seed book editions`);

  const bookEditionDb = prisma.bookEdition;

  const totalExistingBooks = await bookEditionDb.count();

  if (totalExistingBooks > 0) {
    console.log(
      `There are already ${totalExistingBooks} book editions in the system. Seeding operation is aborted.`,
    );
    return;
  }

  const totalBooksToCreate = booksSeedData.length;

  console.log(`Book editions to create: ${totalBooksToCreate}`);

  try {
    const result = await bookEditionDb.createMany({
      data: booksSeedData,
    });

    console.log(`Created ${result.count} book editions`);
  } catch (error) {
    console.log(`Error occurred: ${error}`);
  }

  console.log(`Seeding ${totalBooksToCreate} book edition(s) completed`);
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
