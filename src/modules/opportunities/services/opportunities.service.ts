import { HttpException, Injectable } from '@nestjs/common';
import { CreateOpportunityDto } from '../dto/create-opportunity.dto';
import { UpdateOpportunityDto } from '../dto/update-opportunity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Opportunity } from '../entities/opportunities.entity';
import {
  Between,
  FindOptionsWhere,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { errors } from 'src/common/constants/errors';
import { ResponseDto } from 'src/common/dtos/response.dto';
import { mappingOpportunityDto } from '../dto/response.dto';
import { TypeEnum } from '../models/opportunities.model';

@Injectable()
export class OpportunitiesService {
  constructor(
    @InjectRepository(Opportunity)
    private readonly opportunityRepository: Repository<Opportunity>,
  ) {}

  async findAll(
    pageSize: number,
    page: number,
    followed?: boolean,
    type?: string,
    dateInit?: string,
    dateEnd?: string,
  ) {
    try {
      const where = this.buildWhereConditions(
        followed,
        type,
        dateInit ? new Date(dateInit) : undefined,
        dateEnd ? new Date(dateEnd) : undefined,
      );

      const skip = page && pageSize ? (page - 1) * pageSize : undefined;
      const [opportunities, count] =
        await this.opportunityRepository.findAndCount({
          where,
          skip,
          take: pageSize,
          order: { publish_date: 'DESC' },
        });
      if (!opportunities) {
        throw new HttpException(
          errors.opportunityNotFound.message,
          errors.opportunityNotFound.status,
          {
            cause: errors.opportunityNotFound.code,
          },
        );
      }

      const listDto = opportunities.map((item) =>
        mappingOpportunityDto({ ...item, type: TypeEnum[item.type] }),
      );
      const totalPages = count ? Math.ceil(count / pageSize) : undefined;
      return pageSize
        ? ResponseDto.format('success', { data: listDto, totalPages })
        : ResponseDto.format('success', listDto);
    } catch (error) {
      throw new HttpException(
        errors.internalServerError.message,
        errors.internalServerError.status,
        {
          cause: errors.internalServerError.code,
        },
      );
    }
  }

  async update(id: number, updateOpportunityDto: UpdateOpportunityDto) {
    try {
      const opportunity = await this.opportunityRepository.findOneBy({ id });
      if (!opportunity) {
        throw new HttpException(
          errors.opportunityNotFound.message,
          errors.opportunityNotFound.status,
          {
            cause: errors.opportunityNotFound.code,
          },
        );
      }

      await this.opportunityRepository.update(id, updateOpportunityDto);
      const updatedOpportunity = await this.opportunityRepository.findOneBy({
        id,
      });
      return ResponseDto.format(
        'success',
        mappingOpportunityDto({
          ...updatedOpportunity,
          type: TypeEnum[updatedOpportunity.type],
        }),
      );
    } catch (error) {
      throw new HttpException(
        errors.internalServerError.message,
        errors.internalServerError.status,
        {
          cause: errors.internalServerError.code,
        },
      );
    }
  }

  private buildWhereConditions(
    followed: boolean,
    type: string,
    dateInit: Date,
    dateEnd: Date,
  ) {
    const whereConditions: FindOptionsWhere<Opportunity> = {
      close_date: MoreThanOrEqual(new Date()),
    };

    if (followed) {
      whereConditions.is_followed = followed;
    }

    if (type) {
      whereConditions.type = TypeEnum[type];
    }

    if (dateInit && dateEnd) {
      dateEnd.setDate(dateEnd.getDate() + 1);
      whereConditions.publish_date = Between(dateInit, dateEnd);
    }

    return whereConditions;
  }
}
