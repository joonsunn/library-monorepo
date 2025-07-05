import {
  Injectable,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

@Injectable()
export class DbService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy, OnApplicationShutdown
{
  get prisma() {
    return this;
  }
  async onModuleInit() {
    try {
      await this.$connect();
      console.log(`Database connected`);
    } catch (error) {
      console.error(`Failed to connect to database: ${error}`);
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      console.log(`Database disconnected successfully`);
    } catch (error) {
      console.error(`Failed to disconnect from database: ${error}`);
    }
  }

  async onApplicationShutdown() {
    try {
      await this.$disconnect();
      console.log(`Database disconnected successfully`);
    } catch (error) {
      console.error(`Failed to disconnect from database: ${error}`);
    }
  }
}
