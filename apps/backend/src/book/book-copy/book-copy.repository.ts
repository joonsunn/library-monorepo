import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { BookCopy } from './entities/book-copy.entity';
import { UpdateBookCopyDto } from './dto/update-book-copy.dto';
import { prismaErrorHelper } from 'src/utils/prismaErrorHelper';
import { Prisma } from '@prisma/client';
import { Paginated } from 'types/pagination.type';
import { QueryBookCopyDto } from './dto/query-book-copy.dto';
import { PrismaQueryMode } from 'src/constants/prisma-helper.constant';

@Injectable()
export class BookCopyRepository {
  private bookCopyDb: DbService['bookCopy'];

  constructor(private readonly dbService: DbService) {
    this.bookCopyDb = this.dbService.bookCopy;
  }

  async create(bookCopy: { editionId: string }) {
    try {
      await this.bookCopyDb.create({ data: bookCopy });

      return { message: 'OK' };
    } catch (error) {
      prismaErrorHelper(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  async findAll(query?: QueryBookCopyDto): Promise<Paginated<BookCopy>> {
    const { page = 0, pageSize = 10, isbn, title, id, status } = { ...query };

    const bookEditionQuery = { isbn, title };
    const bookCopyQuery = { id, status };

    const where: Prisma.BookCopyWhereInput = {};

    if (Object.keys(bookEditionQuery).length > 0) {
      where.bookEdition = {};
    }

    for (const [key, value] of Object.entries(bookEditionQuery)) {
      if (value) {
        if (!where.bookEdition!.OR) {
          where.bookEdition!.OR = [];
        }
        where.bookEdition!.OR.push({
          [key]: { contains: value, mode: PrismaQueryMode.insensitive },
        });
      }
    }

    for (const [key, value] of Object.entries(bookCopyQuery)) {
      if (value) {
        if (!where.OR) {
          where.OR = [];
        }
        where.OR.push({
          [key]: { contains: value, mode: PrismaQueryMode.insensitive },
        });
      }
    }

    const result = await this.bookCopyDb.findMany({
      where,
      include: {
        bookEdition: { select: { title: true } },
      },
      orderBy: [
        {
          createdAt: 'asc',
        },
      ],
      skip: page * pageSize,
      take: pageSize,
    });

    const totalRows = await this.bookCopyDb.count({ where });
    const totalPages = Math.ceil(totalRows / pageSize);

    return {
      data: result,
      meta: {
        page,
        pageSize,
        totalRows,
        totalPages,
      },
    };
  }

  async findOneById(id: BookCopy['id']) {
    const result = await this.bookCopyDb.findUnique({ where: { id } });

    return result;
  }

  async update(id: BookCopy['id'], data: UpdateBookCopyDto) {
    try {
      const result = await this.bookCopyDb.update({
        where: { id },
        data,
      });

      return result;
    } catch (error) {
      prismaErrorHelper(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  async remove(id: BookCopy['id']) {
    try {
      const result = await this.bookCopyDb.delete({ where: { id } });

      return result;
    } catch (error) {
      prismaErrorHelper(error as Prisma.PrismaClientKnownRequestError);
    }
  }
}
