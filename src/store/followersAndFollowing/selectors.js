export const selectFollowers = state => state.followerAndFollowing.followers;
export const selectFollowing = state => state.followerAndFollowing.following;
export const selectPagination = state => state.followerAndFollowing.pagination;
export const selectIsLoading = state => state.followerAndFollowing.isLoading;
export const selectError = state => state.followerAndFollowing.error;
