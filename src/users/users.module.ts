import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { IsUniqueConstraint } from './is-unique';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, IsUniqueConstraint],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}
