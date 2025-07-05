import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import borrowersSeedData from './seed/1-borrower.json';

config();

const prisma = new PrismaClient();

async function seedBorrower({ prisma }: { prisma: PrismaClient }) {
  console.log(`This script will seed borrowers`);

  const totalExistingBorrowers = await prisma.borrower.count();

  if (totalExistingBorrowers > 0) {
    console.log(
      `There are already ${totalExistingBorrowers} borrowers in the system. Seeding operation is aborted.`,
    );
    return;
  }

  const totalBorrowersToCreate = borrowersSeedData.length;

  console.log(`Borrowers to create: ${totalBorrowersToCreate}`);

  try {
    const result = await prisma.borrower.createMany({
      data: borrowersSeedData,
    });

    console.log(`Created ${result.count} borrowers`);
  } catch (error) {
    console.log(`Error occurred: ${error}`);
  }

  console.log(`Seeding ${totalBorrowersToCreate} borrowers completed`);
}

async function main() {
  console.log('Starting script...');
  await seedBorrower({ prisma });
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
