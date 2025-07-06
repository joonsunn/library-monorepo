import { Injectable } from '@nestjs/common';
import { Paginated } from 'types/pagination.type';
import { DbService } from 'src/db/db.service';
import { Prisma } from '@prisma/client';
import { CreateBookEditionDto } from './dto/create-book-edition.dto';
import { QueryBookEditionDto } from './dto/query-book.dto';
import { BookEdition } from './entities/book-edition.entity';
import { UpdateBookEditionDto } from './dto/update-book-edition.dto';

@Injectable()
export class BookEditionRepository {
  private bookEditionDb: DbService['bookEdition'];

  constructor(private readonly dbService: DbService) {
    this.bookEditionDb = this.dbService.bookEdition;
  }

  async create(bookEdition: CreateBookEditionDto) {
    const result = await this.bookEditionDb.create({ data: bookEdition });

    return result;
  }

  async findAll(query?: QueryBookEditionDto): Promise<Paginated<BookEdition>> {
    const { page = 0, pageSize = 10, ...rest } = { ...query };

    const where: Prisma.BookEditionWhereInput = {};

    for (const [key, value] of Object.entries(rest)) {
      if (value) {
        where.OR = [
          ...(where.OR || []),
          { [key]: { contains: value, mode: 'insensitive' } },
        ];
      }
    }

    const result = await this.bookEditionDb.findMany({
      where,
      orderBy: [
        {
          title: 'asc',
        },
      ],
      skip: page * pageSize,
      take: pageSize,
    });

    const totalRows = await this.bookEditionDb.count({ where });
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

  async findOneByISBN(isbn: BookEdition['isbn']) {
    const result = await this.bookEditionDb.findUnique({ where: { isbn } });

    return result;
  }

  async findOneById(id: BookEdition['id']) {
    const result = await this.bookEditionDb.findUnique({ where: { id } });

    return result;
  }

  async update(id: BookEdition['id'], data: UpdateBookEditionDto) {
    const result = await this.bookEditionDb.update({
      where: { id },
      data,
    });

    return result;
  }

  async remove(id: BookEdition['id']) {
    const result = await this.bookEditionDb.delete({ where: { id } });

    return result;
  }
}
