import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookEditionDto } from './dto/create-book-edition.dto';
import { UpdateBookEditionDto } from './dto/update-book-edition.dto';
import { BookEditionRepository } from './book-edition.repository';
import { QueryBookEditionDto } from './dto/query-book.dto';
import { FindOneOptions } from 'types/find-options.type';
import { bookEditionPrismaErrorHelper } from './book-edition.utils';
import { Prisma } from '@prisma/client';

@Injectable()
export class BookEditionService {
  constructor(private readonly bookEditionRepository: BookEditionRepository) {}

  async create(dto: CreateBookEditionDto) {
    try {
      await this.bookEditionRepository.create(dto);

      return { message: 'OK' };
    } catch (error) {
      bookEditionPrismaErrorHelper(
        error as Prisma.PrismaClientKnownRequestError,
      );
    }
  }

  async findAll(query?: QueryBookEditionDto) {
    const result = await this.bookEditionRepository.findAll(query);

    return result;
  }

  async findOneById(id: string, options?: FindOneOptions) {
    const { throwIfNotFound } = { throwIfNotFound: true, ...options };

    const result = await this.bookEditionRepository.findOneById(id);

    if (throwIfNotFound && !result) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    return result;
  }

  async findOneByISBN(isbn: string, options?: FindOneOptions) {
    const { throwIfNotFound } = { throwIfNotFound: true, ...options };

    const result = await this.bookEditionRepository.findOneByISBN(isbn);

    if (throwIfNotFound && !result) {
      throw new NotFoundException(`Book with isbn ${isbn} not found`);
    }

    return result;
  }

  async update(id: string, data: UpdateBookEditionDto) {
    try {
      const result = await this.bookEditionRepository.update(id, data);

      return result;
    } catch (error) {
      bookEditionPrismaErrorHelper(
        error as Prisma.PrismaClientKnownRequestError,
      );
    }
  }

  async remove(id: string) {
    try {
      const result = await this.bookEditionRepository.remove(id);

      return result;
    } catch (error) {
      bookEditionPrismaErrorHelper(
        error as Prisma.PrismaClientKnownRequestError,
      );
    }
  }
}
