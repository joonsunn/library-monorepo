import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import { BookCopyStatus } from 'src/book/book-copy/book-copy.constant';

config();

const prisma = new PrismaClient();

async function seedBookCopy({ prisma }: { prisma: PrismaClient }) {
  console.log(`This script will seed book copies`);

  const bookEditionDb = prisma.bookEdition;
  const bookCopyDb = prisma.bookCopy;

  const allBookEditions = await bookEditionDb.findMany();

  if (allBookEditions.length === 0) {
    console.log(
      `There are no book editions in the system. Seeding operation is aborted.`,
    );
    return;
  }

  const totalExistingBookCopies = await bookCopyDb.count();

  if (totalExistingBookCopies > 0) {
    console.log(
      `There are already ${totalExistingBookCopies} book copies in the system. Seeding operation is aborted.`,
    );
    return;
  }

  console.log(`No book copies found in system. Seeding operation will proceed`);
  console.log(`${allBookEditions.length} book editions found in the system`);
  console.log(
    `One (1) book copy will be created for each of the ${allBookEditions.length} book editions`,
  );

  try {
    const result = await bookCopyDb.createMany({
      data: allBookEditions.map((edition) => ({
        editionId: edition.id,
        status: BookCopyStatus.AVAILABLE,
      })),
    });

    console.log(`Created ${result.count} book copies`);
  } catch (error) {
    console.log(`Error occurred: ${error}`);
  }

  console.log(
    `Seeding copies of ${allBookEditions.length} book editions completed`,
  );
}

async function main() {
  console.log('Starting script...');
  await seedBookCopy({ prisma });
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
