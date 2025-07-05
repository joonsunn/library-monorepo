import { Injectable } from '@nestjs/common';
import { Paginated } from 'types/pagination.type';
import { DbService } from 'src/db/db.service';
import { Prisma } from '@prisma/client';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.entity';
import { UpdateBookDto } from './dto/update-book.dto';
import { QueryBookDto } from './dto/query-book.dto';

@Injectable()
export class BookRepository {
  private bookDb: DbService['book'];

  constructor(private readonly dbService: DbService) {
    this.bookDb = this.dbService.book;
  }

  async create(book: CreateBookDto) {
    const result = await this.bookDb.create({ data: book });

    return result;
  }

  async findAll(query?: QueryBookDto): Promise<Paginated<Book>> {
    const { page = 0, pageSize = 10, ...rest } = { ...query };

    const where: Prisma.BookWhereInput = {};

    for (const [key, value] of Object.entries(rest)) {
      if (value) {
        where.OR = [
          ...(where.OR || []),
          { [key]: { contains: value, mode: 'insensitive' } },
        ];
      }
    }

    const result = await this.bookDb.findMany({
      where,
      orderBy: [
        {
          title: 'asc',
        },
      ],
      skip: page * pageSize,
      take: pageSize,
    });

    const totalRows = await this.bookDb.count({ where });
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

  async findFirstByISBN(isbn: Book['isbn']) {
    const result = await this.bookDb.findFirst({ where: { isbn } });

    return result;
  }

  async findOneById(id: Book['id']) {
    const result = await this.bookDb.findUnique({ where: { id } });

    return result;
  }

  async update(id: Book['id'], data: UpdateBookDto) {
    const result = await this.bookDb.update({
      where: { id },
      data,
    });

    return result;
  }

  async remove(id: Book['id']) {
    const result = await this.bookDb.delete({ where: { id } });

    return result;
  }
}
