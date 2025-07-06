import { Injectable } from '@nestjs/common';
import { Borrower } from './entities/borrower.entity';
import { Paginated } from 'types/pagination.type';
import { DbService } from 'src/db/db.service';
import { Prisma } from '@prisma/client';
import { CreateBorrowerDto } from './dto/create-borrower.dto';
import { QueryBorrowerDto } from './dto/query-borrower.dto';
import { UpdateBorrowerDto } from './dto/update-borrower.dto';
import { PrismaQueryMode } from 'src/constants/prisma-helper.constant';

@Injectable()
export class BorrowerRepository {
  private borrowerDb: DbService['borrower'];

  constructor(private readonly dbService: DbService) {
    this.borrowerDb = this.dbService.borrower;
  }

  async create(borrower: CreateBorrowerDto) {
    const result = await this.borrowerDb.create({ data: borrower });

    return result;
  }

  async findAll(query?: QueryBorrowerDto): Promise<Paginated<Borrower>> {
    const { page = 0, pageSize = 10, ...rest } = { ...query };

    const where: Prisma.BorrowerWhereInput = {};

    for (const [key, value] of Object.entries(rest)) {
      if (value) {
        where.OR = [
          ...(where.OR || []),
          { [key]: { contains: value, mode: PrismaQueryMode.insensitive } },
        ];
      }
    }

    const result = await this.borrowerDb.findMany({
      where,
      orderBy: [
        {
          name: 'asc',
        },
      ],
      skip: page * pageSize,
      take: pageSize,
    });

    const totalRows = await this.borrowerDb.count({ where });
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

  async findOneById(id: Borrower['id']) {
    const result = await this.borrowerDb.findUnique({ where: { id } });

    return result;
  }

  async findOneByEmail(email: Borrower['email']) {
    const result = await this.borrowerDb.findUnique({ where: { email } });

    return result;
  }

  async update(id: Borrower['id'], data: UpdateBorrowerDto) {
    const result = await this.borrowerDb.update({
      where: { id },
      data,
    });

    return result;
  }

  async remove(id: Borrower['id']) {
    const result = await this.borrowerDb.delete({ where: { id } });

    return result;
  }
}
