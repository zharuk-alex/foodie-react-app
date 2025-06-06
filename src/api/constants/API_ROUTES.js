export const API_ROUTES = {
  USERS: {
    REGISTER: "/users/register",
    LOGIN: "/users/login",
    LOGOUT: "/users/logout",
    CURRENT_USER: "/users/current",
    AVATAR: "/users/avatars",
    FOLLOWING: "/users/following",
    FULL_INFO: (id) => `/users/${id}/full`,
    FOLLOW: (id) => `/users/${id}/follow`,
    UNFOLLOW: (id) => `/users/${id}/unfollow`,
    FOLLOWERS: (id) => `/users/${id}/followers`,
  },
  RECIPES: {
    RECIPES: "/recipes",
    POPULAR: "/recipes/popular",
    RECIPE_WITH_ID: (id) => `/recipes/${id}`,
    FAVORITE: (id) => `/recipes/${id}/favorite`,
    OWN_RECIPES: (id) => `/recipes/${id}/own-recipes`,
  },
  AREAS: "/areas",
  CATEGORIES: "/categories",
  INGREDIENTS: "/ingredients",
  TESTIMONIALS: "/testimonials",
};
