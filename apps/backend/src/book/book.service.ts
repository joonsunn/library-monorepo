import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookRepository } from './book.repository';
import { prismaErrorHelper } from 'src/utils/prismaErrorHelper';
import { QueryBookDto } from './dto/query-book.dto';
import { FindOneOptions } from 'types/find-options.type';
import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}
  async create(dto: CreateBookDto) {
    const { isbn } = dto;

    await this.checkBookDataConsistency(dto, isbn);

    try {
      await this.bookRepository.create(dto);

      return { message: 'OK' };
    } catch (error) {
      prismaErrorHelper(error as { code: string | undefined });
    }
  }

  async findAll(query?: QueryBookDto) {
    const result = await this.bookRepository.findAll(query);

    return result;
  }

  async findOne(id: string, options?: FindOneOptions) {
    const { throwIfNotFound } = { throwIfNotFound: true, ...options };

    const result = await this.bookRepository.findOneById(id);

    if (throwIfNotFound && !result) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    return result;
  }

  async update(id: string, data: UpdateBookDto) {
    await this.checkBookDataConsistency({ id, ...data });

    try {
      const result = await this.bookRepository.update(id, data);

      return result;
    } catch (error) {
      prismaErrorHelper(error as { code: string | undefined });
    }
  }

  async checkBookDataConsistency(
    data: UpdateBookDto & { id?: string },
    isbn?: string,
  ) {
    const { id, ...dataToVerify } = data;
    let frozenBookData: Book | null = null;

    if (isbn) {
      frozenBookData = await this.bookRepository.findFirstByISBN(isbn);
    } else if (id) {
      frozenBookData = await this.bookRepository.findOneById(id);
    }

    if (!frozenBookData) return;

    for (const key in dataToVerify) {
      if (dataToVerify[key] !== frozenBookData[key]) {
        throw new UnprocessableEntityException(
          'Input data is inconsistent with existing book of the same ISBN',
        );
      }
    }
  }

  async remove(id: string) {
    try {
      const result = await this.bookRepository.remove(id);

      return result;
    } catch (error) {
      prismaErrorHelper(error as { code: string | undefined });
    }
  }
}
