import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { prismaErrorHelper } from 'src/utils/prismaErrorHelper';
import { Prisma } from '@prisma/client';
import { BookLoan } from './entities/book-loan.entity';
import { CreateBookLoanDto } from './dto/create-book-loan.dto';
import { Borrower } from 'src/borrower/entities/borrower.entity';
import { QueryBookLoanDto } from './dto/query-book-loan.dto';
import { Paginated } from 'types/pagination.type';
import { PrismaQueryMode } from 'src/constants/prisma-helper.constant';

@Injectable()
export class BookLoanRepository {
  private bookLoanDb: DbService['bookLoan'];

  constructor(private readonly dbService: DbService) {
    this.bookLoanDb = this.dbService.bookLoan;
  }

  async create(bookLoan: CreateBookLoanDto) {
    try {
      await this.bookLoanDb.create({ data: bookLoan });

      return { message: 'OK' };
    } catch (error) {
      prismaErrorHelper(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  async findAll(query?: QueryBookLoanDto): Promise<Paginated<BookLoan>> {
    const { page = 0, pageSize = 10, ...rest } = { ...query };

    const where: Prisma.BookLoanWhereInput = {};

    if (Object.keys(rest).length > 0) {
      where.bookCopy = {};
    }

    for (const [key, value] of Object.entries(rest)) {
      if (value) {
        if (!where.bookCopy!.OR) {
          where.bookCopy!.OR = [];
        }
        where.bookCopy!.OR.push({
          [key]: { contains: value, mode: PrismaQueryMode.insensitive },
        });
      }
    }

    const result = await this.bookLoanDb.findMany({
      where,
      include: {
        bookCopy: {
          select: {
            id: true,
            bookEdition: { select: { title: true } },
          },
        },
      },
      orderBy: [
        {
          createdAt: 'asc',
        },
      ],
      skip: page * pageSize,
      take: pageSize,
    });

    const totalRows = await this.bookLoanDb.count({ where });
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

  async findOneById(id: BookLoan['id']) {
    const result = await this.bookLoanDb.findUnique({ where: { id } });

    return result;
  }

  async findAllByBorrower(id: Borrower['id']) {
    const result = await this.bookLoanDb.findMany({
      where: { borrowerId: id },
    });

    return result;
  }

  async findOneCheckedOut({ bookCopyId }: { bookCopyId: string }) {
    const result = await this.bookLoanDb.findMany({
      where: { bookCopyId, returnedAt: null },
    });

    return result;
  }

  async update(id: BookLoan['id'], data: Partial<BookLoan>) {
    try {
      const result = await this.bookLoanDb.update({
        where: { id },
        data,
      });

      return result;
    } catch (error) {
      prismaErrorHelper(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  async remove(id: BookLoan['id']) {
    try {
      const result = await this.bookLoanDb.delete({ where: { id } });

      return result;
    } catch (error) {
      prismaErrorHelper(error as Prisma.PrismaClientKnownRequestError);
    }
  }
}
