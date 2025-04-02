import { OpportunityModel, TypeEnum } from '../models/opportunities.model';

export interface OpportunityResponseDto {
  id: number;
  code: string;
  title: string;
  type: TypeEnum;
  is_followed: boolean;
  publish_date: string;
  close_date: string;
}

const mappingOpportunityDto = (
  opportunity: OpportunityModel,
): OpportunityResponseDto => ({
  id: opportunity.id,
  code: opportunity.code,
  title: opportunity.title,
  type: TypeEnum[opportunity.type],
  is_followed: opportunity.is_followed,
  publish_date: formatDateOnly(opportunity.publish_date),
  close_date: formatDateOnly(opportunity.close_date),
});

export { mappingOpportunityDto };

function formatDateOnly(date: Date): string {
  if (!date) return '';

  return new Intl.DateTimeFormat('es', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}
