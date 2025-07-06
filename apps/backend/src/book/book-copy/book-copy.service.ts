import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBookCopyDto } from './dto/create-book-copy.dto';
import { UpdateBookCopyDto } from './dto/update-book-copy.dto';
import { BookCopyRepository } from './book-copy.repository';
import { QueryBookCopyDto } from './dto/query-book-copy.dto';
import { BookEditionService } from '../book-edition/book-edition.service';
import { BookEdition } from '../book-edition/entities/book-edition.entity';
import { FindOneOptions } from 'types/find-options.type';
import { prismaErrorHelper } from 'src/utils/prismaErrorHelper';
import { Prisma } from '@prisma/client';

@Injectable()
export class BookCopyService {
  constructor(
    private readonly bookCopyRepository: BookCopyRepository,
    private readonly bookEditionService: BookEditionService,
  ) {}

  async create(dto: CreateBookCopyDto) {
    let bookEdition: BookEdition | null = null;

    if (dto.editionId) {
      bookEdition = await this.bookEditionService.findOneById(dto.editionId);
    } else if (dto.isbn) {
      bookEdition = await this.bookEditionService.findOneByISBN(dto.isbn);
    }

    if (!bookEdition)
      return new BadRequestException(`Book with isbn ${dto.isbn} not found`);

    try {
      await this.bookCopyRepository.create({
        editionId: bookEdition.id,
      });

      return { message: 'OK' };
    } catch (error) {
      prismaErrorHelper(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  async findAll(query?: QueryBookCopyDto) {
    const result = await this.bookCopyRepository.findAll(query);

    return result;
  }

  async findOne(id: string, options?: FindOneOptions) {
    const { throwIfNotFound } = {
      throwIfNotFound: true,
      ...options,
    };

    const result = await this.bookCopyRepository.findOneById(id);

    if (throwIfNotFound && !result) {
      throw new NotFoundException(`Book copy with id ${id} not found`);
    }

    return result;
  }

  async update(id: string, dto: UpdateBookCopyDto) {
    try {
      const result = await this.bookCopyRepository.update(id, dto);
      return result;
    } catch (error) {
      prismaErrorHelper(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  async remove(id: string) {
    try {
      const result = await this.bookCopyRepository.remove(id);
      return result;
    } catch (error) {
      prismaErrorHelper(error as Prisma.PrismaClientKnownRequestError);
    }
  }
}
