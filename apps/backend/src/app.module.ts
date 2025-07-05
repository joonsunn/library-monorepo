import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { BorrowerModule } from './borrower/borrower.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DbModule,
    BorrowerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
