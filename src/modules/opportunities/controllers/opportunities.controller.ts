import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Query,
  ParseBoolPipe,
  ParseIntPipe,
  ParseDatePipe,
} from '@nestjs/common';
import { OpportunitiesService } from '../services/opportunities.service';
import { UpdateOpportunityDto } from '../dto/update-opportunity.dto';

@Controller('opportunities')
export class OpportunitiesController {
  constructor(private readonly opportunitiesService: OpportunitiesService) {}

  @Get('/page/:pageSize/:page')
  findAll(
    @Param('pageSize', ParseIntPipe) pageSize: number,
    @Param('page', ParseIntPipe) page: number,
    @Query('followed') followed?: string,
    @Query('type') type?: string,
    @Query('dateInit') dateInit?: string,
    @Query('dateEnd') dateEnd?: string,
  ) {
    return this.opportunitiesService.findAll(
      pageSize,
      page,
      followed,
      type,
      dateInit,
      dateEnd,
    );
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOpportunityDto: UpdateOpportunityDto,
  ) {
    return this.opportunitiesService.update(id, updateOpportunityDto);
  }
}
