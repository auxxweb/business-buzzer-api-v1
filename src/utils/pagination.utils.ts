interface Pagination<T> {
  limit: T;
  page: T;
  noLimit?: boolean;
}

export const getPaginationOptions = ({
  noLimit,
  limit = !(noLimit ?? false) && 10,
  page = 1,
}: Pagination<any>): { limit: number; skip: number } => {
  if (Number(limit) > 30) {
    limit = 30;
  }
  const newLimit = Number(limit);
  const skip = (Number(page) - 1) * Number(limit);

  return {
    limit: newLimit,
    skip,
  };
};
