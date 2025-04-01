import { OpportunityModel, TypeEnum } from '../models/opportunities.model';

export interface OpportunityResponseDto {
  id: number;
  code: string;
  title: string;
  type: TypeEnum;
  is_followed: boolean;
  publish_date: Date;
  close_date: Date;
}

const mappingOpportunityDto = (
  opportunity: OpportunityModel,
): OpportunityResponseDto => ({
  id: opportunity.id,
  code: opportunity.code,
  title: opportunity.title,
  type: TypeEnum[opportunity.type],
  is_followed: opportunity.is_followed,
  publish_date: opportunity.publish_date,
  close_date: opportunity.close_date,
});

export { mappingOpportunityDto };
