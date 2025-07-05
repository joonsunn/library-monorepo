import {
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

export function prismaErrorHelper(error: { code: string | undefined }) {
  if (error.code) {
    switch (error.code) {
      case 'P2002':
        throw new UnprocessableEntityException('Unique constraint failed');

      case 'P2003':
        throw new UnprocessableEntityException('Foreign key constraint failed');

      case 'P2025':
        throw new NotFoundException('Record not found');

      default:
        throw new UnprocessableEntityException('Unable to process request');
    }
  } else {
    throw new Error((error as unknown as Error).message, { cause: error });
  }
}
