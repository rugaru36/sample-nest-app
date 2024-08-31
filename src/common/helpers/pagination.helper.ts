export const getPaginationHelper = (
  limit: number,
  page: number,
): { offset: number; limit: number | null } => {
  return {
    limit: limit || null,
    offset: page && limit ? (page - 1) * limit : 0,
  };
};
