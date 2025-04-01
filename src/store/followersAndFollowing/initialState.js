export const initialState = {
  followers: [],
  following: [],
  pagination: {
    page: 1,
    limit: 5,
    totalPages: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  },
  isLoading: false,
  error: null,
};
