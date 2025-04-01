export class OpportunityModel {
  id?: number;
  code: string;
  title: string;
  type: TypeEnum;
  is_followed: boolean;
  publish_date: Date;
  close_date: Date;
}

export enum TypeEnum {
  tender = 'tender',
  agile = 'agile',
}
