import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateBookLoanDto } from './dto/create-book-loan.dto';
import { UpdateBookLoanDto } from './dto/update-book-loan.dto';
import { BookLoanRepository } from './book-loan.repository';
import { BookCopyService } from '../book-copy/book-copy.service';
import { BookCopyStatus } from '../book-copy/book-copy.constant';
import { Prisma } from '@prisma/client';
import { prismaErrorHelper } from 'src/utils/prismaErrorHelper';
import { QueryBookLoanDto } from './dto/query-book-loan.dto';
import { BookLoan } from './entities/book-loan.entity';
import { FindOneOptions } from 'types/find-options.type';
import { BookCopy } from '../book-copy/entities/book-copy.entity';
import { ReturnBookDto } from './dto/return-book.dto';

@Injectable()
export class BookLoanService {
  constructor(
    private readonly bookLoanRepository: BookLoanRepository,
    private readonly bookCopyService: BookCopyService,
  ) {}

  async create(dto: CreateBookLoanDto) {
    try {
      await this.bookLoanRepository.create(dto);

      return { message: 'OK' };
    } catch (error) {
      prismaErrorHelper(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  async findOne(id: string, options?: FindOneOptions) {
    const { throwIfNotFound } = {
      throwIfNotFound: true,
      ...options,
    };

    const result = await this.bookLoanRepository.findOneById(id);

    if (throwIfNotFound && !result) {
      throw new NotFoundException(`Book loan with id ${id} not found`);
    }

    return result;
  }

  async findAll(query: QueryBookLoanDto) {
    const result = await this.bookLoanRepository.findAll(query);
    return result;
  }

  async update(id: string, dto: UpdateBookLoanDto) {
    try {
      const result = await this.bookLoanRepository.update(id, dto);
      return result;
    } catch (error) {
      prismaErrorHelper(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  async remove(id: string) {
    const bookLoan = (await this.findOne(id)) as BookLoan;
    const bookCopy = await this.bookCopyService.findOne(bookLoan.bookCopyId, {
      throwIfNotFound: true,
    });
    if (bookCopy?.status === BookCopyStatus.CHECKED_OUT) {
      // TODO: to handle book loan entry removal if book is already returned and borrower wants to clean up their loan logs
      throw new UnprocessableEntityException('Book copy is checked out');
    }

    try {
      const result = await this.bookLoanRepository.remove(id);
      return result;
    } catch (error) {
      prismaErrorHelper(error as Prisma.PrismaClientKnownRequestError);
    }
  }

  async checkOutBook(dto: CreateBookLoanDto) {
    const bookCopy = await this.bookCopyService.findOne(dto.bookCopyId, {
      throwIfNotFound: true,
    });

    if (bookCopy) {
      if (bookCopy.status === BookCopyStatus.AVAILABLE) {
        await this.bookLoanRepository.create(dto);
        await this.bookCopyService.update(dto.bookCopyId, {
          status: BookCopyStatus.CHECKED_OUT,
        });
        return { message: 'OK' };
      } else {
        throw new UnprocessableEntityException(
          'Book copy is not available to check out',
        );
      }
    }
  }

  async returnBook(dto: ReturnBookDto) {
    const bookCopy = (await this.bookCopyService.findOne(dto.bookCopyId, {
      throwIfNotFound: true,
    })) as BookCopy;

    if (bookCopy.status === BookCopyStatus.CHECKED_OUT) {
      const bookLoans = await this.bookLoanRepository.findOneCheckedOut(dto);

      if (bookLoans.length !== 1) {
        throw new UnprocessableEntityException(
          'Invalid book loan status. Unable to process request.',
        );
      }

      const bookLoanToReturn = bookLoans[0];

      try {
        await this.bookLoanRepository.update(bookLoanToReturn.id, {
          returnedAt: new Date(),
        });
        await this.bookCopyService.update(dto.bookCopyId, {
          status: BookCopyStatus.AVAILABLE,
        });
        return { message: 'OK' };
      } catch (error) {
        prismaErrorHelper(error as Prisma.PrismaClientKnownRequestError);
      }
    } else {
      throw new UnprocessableEntityException('Book copy is not checked out');
    }
  }
}
