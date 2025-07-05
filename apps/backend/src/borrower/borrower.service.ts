import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateBorrowerDto } from './dto/create-borrower.dto';
import { UpdateBorrowerDto } from './dto/update-borrower.dto';
import { BorrowerRepository } from './borrower.repository';
import { QueryBorrowerDto } from './dto/query-borrower.dto';
import { FindOneOptions } from 'types/find-options.type';
import { prismaErrorHelper } from 'src/utils/prismaErrorHelper';

@Injectable()
export class BorrowerService {
  constructor(private readonly borrowerRepository: BorrowerRepository) {}
  async create(dto: CreateBorrowerDto) {
    const { email } = dto;

    await this.findOneByEmail(email, {
      throwIfFound: true,
      throwIfNotFound: false,
    });

    try {
      await this.borrowerRepository.create(dto);

      return { message: 'OK' };
    } catch (error) {
      prismaErrorHelper(error as { code: string | undefined });
    }
  }

  async findAll(query?: QueryBorrowerDto) {
    const result = await this.borrowerRepository.findAll(query);

    return result;
  }

  async findOne(id: string, options?: FindOneOptions) {
    const { throwIfNotFound } = { throwIfNotFound: true, ...options };

    const result = await this.borrowerRepository.findOneById(id);

    if (throwIfNotFound && !result) {
      throw new NotFoundException(`Borrower with id ${id} not found`);
    }

    return result;
  }

  async findOneByEmail(email: string, options?: FindOneOptions) {
    const { throwIfNotFound, throwIfFound } = {
      throwIfNotFound: true,
      throwIfFound: false,
      ...options,
    };

    const result = await this.borrowerRepository.findOneByEmail(email);

    if (throwIfNotFound && !result) {
      throw new NotFoundException(`Borrower with email ${email} not found`);
    }

    if (throwIfFound && result) {
      throw new UnprocessableEntityException(
        `Borrower with email ${email} already exists`,
      );
    }

    return result;
  }

  async update(id: string, data: UpdateBorrowerDto) {
    const { email } = data;

    if (email) {
      await this.findOneByEmail(email, {
        throwIfFound: true,
        throwIfNotFound: false,
      });
    }

    try {
      const result = await this.borrowerRepository.update(id, data);

      return result;
    } catch (error) {
      prismaErrorHelper(error as { code: string | undefined });
    }
  }

  async remove(id: string) {
    try {
      const result = await this.borrowerRepository.remove(id);

      return result;
    } catch (error) {
      prismaErrorHelper(error as { code: string | undefined });
    }
  }
}
