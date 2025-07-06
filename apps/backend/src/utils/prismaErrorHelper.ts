import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

export function prismaErrorHelper(error: Prisma.PrismaClientKnownRequestError) {
  if (error.code) {
    switch (error.code) {
      case 'P2002':
        throw new UnprocessableEntityException(
          `Unique constraint failed on field(s): ${((error.meta?.target as string[]).length ? (error.meta?.target as string[]).join(', ') : error.meta?.target) as string}`,
        );

      case 'P2003':
        throw new UnprocessableEntityException(
          `Foreign key constraint failed on field(s): ${((error.meta?.target as string[]).length ? (error.meta?.target as string[]).join(', ') : error.meta?.target) as string}`,
        );

      case 'P2025':
        throw new NotFoundException('Record not found');

      default:
        throw new UnprocessableEntityException('Unable to process request');
    }
  } else {
    throw new Error((error as unknown as Error).message, { cause: error });
  }
}
