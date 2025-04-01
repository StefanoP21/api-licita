export const errors = {
  internalServerError: {
    code: 'INTERNAL_SERVER_ERROR',
    status: 500,
    message: 'Internal server error',
  },
  // Opportunity
  opportunityNotExist: {
    code: 'OPPORTUNITY_NOT_FOUND',
    status: 404,
    message: 'Oportunidad no encontrada',
  },
} as const;
