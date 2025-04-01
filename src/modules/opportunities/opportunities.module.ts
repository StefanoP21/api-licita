import { Module } from '@nestjs/common';
import { OpportunitiesService } from './services/opportunities.service';
import { OpportunitiesController } from './controllers/opportunities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Opportunity } from './entities/opportunities.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Opportunity])],
  controllers: [OpportunitiesController],
  providers: [OpportunitiesService],
})
export class OpportunitiesModule {}
