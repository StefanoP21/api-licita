import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { OpportunitiesService } from '../services/opportunities.service';
import { UpdateOpportunityDto } from '../dto/update-opportunity.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { ResponseDto } from 'src/common/dtos/response.dto';
import { mappingOpportunityDto } from '../dto/response.dto';

@ApiTags('Opportunities')
@Controller('opportunities')
export class OpportunitiesController {
  constructor(private readonly opportunitiesService: OpportunitiesService) {}

  @Get('/page/:pageSize/:page')
  @ApiOperation({ summary: 'Get opportunities by page' })
  @ApiParam({
    name: 'pageSize',
    description: 'Number of opportunities per page',
    type: Number,
  })
  @ApiParam({
    name: 'page',
    description: 'Page number',
    type: Number,
  })
  @ApiQuery({
    name: 'followed',
    description: 'Filter by followed opportunities',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'type',
    description: 'Filter by opportunity type',
    type: String,
    enum: ['tender', 'agile'],
    required: false,
  })
  @ApiQuery({
    name: 'dateInit',
    description: 'Filter by start date',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'dateEnd',
    description: 'Filter by end date',
    type: String,
    required: false,
  })
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
  @ApiOperation({ summary: 'Update an opportunity' })
  @ApiParam({
    name: 'id',
    description: 'Opportunity ID',
    type: Number,
  })
  @ApiBody({
    description: 'Opportunity data to update',
    type: UpdateOpportunityDto,
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOpportunityDto: UpdateOpportunityDto,
  ) {
    return this.opportunitiesService.update(id, updateOpportunityDto);
  }
}
