import { Module } from '@nestjs/common';
import { BorrowerService } from './borrower.service';
import { BorrowerController } from './borrower.controller';
import { BorrowerRepository } from './borrower.repository';

@Module({
  controllers: [BorrowerController],
  providers: [BorrowerService, BorrowerRepository],
})
export class BorrowerModule {}
