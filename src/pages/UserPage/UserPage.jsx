import css from "./UserPage.module.css";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { MainTitle, Subtitle, Modal, Container } from "components/UI";
import {
  UserInfo,
  FollowButton,
  TabsList,
  ListItems,
  ListPagination,
  PathInfo,
} from "components/User";
// import { LogOutModal } from "components/UI";

import {
  getFullUserDetailsThunk,
  getFollowersThunk,
  getFollowingThunk,
  updateAvatarThunk,
} from "store/auth/operations";

import {
  cleanPagination as cleanAuthPagination,
  cleanFollowers,
  cleanFollowing,
} from "store/auth/slice";

import {
  selectCurrentUser,
  selectFullUserDetails,
  selectFollowers,
  selectFollowing,
} from "store/auth/selectors";

import {
  getOwnRecipesThunk,
  getFavoriteRecipesThunk,
  fetchRecipes,
  removeRecipeThunk,
  removeRecipeFromFavoriteThunk,
} from "store/recipes/operations";

import {
  selectRecipes as selectRecipeList,
  selectPagination as selectRecipePagination,
} from "store/recipes/selectors";

import {
  cleanPagination as cleanRecipesPagination,
  cleanRecipes,
} from "store/recipes/slice";

const UserPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const fullUserDetails = useSelector(selectFullUserDetails);
  const followers = useSelector(selectFollowers);
  const following = useSelector(selectFollowing);
  const recipes = useSelector(selectRecipeList);
  const recipePagination = useSelector(selectRecipePagination);

  const [activeTab, setActiveTab] = useState("recipes");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);

  const isOwnProfile = id === currentUser?.id;

  useEffect(() => {
    if (isOwnProfile) {
      setActiveTab("my-recipes");
    }
  }, [isOwnProfile]);

  useEffect(() => {
    dispatch(getFullUserDetailsThunk(id));
  }, [dispatch, id]);

  // Reset pagination and lists when tab changes
  useEffect(() => {
    setCurrentPage(1);
    dispatch(cleanAuthPagination());
    dispatch(cleanRecipesPagination());
    dispatch(cleanFollowers());
    dispatch(cleanFollowing());
    dispatch(cleanRecipes());
  }, [activeTab, dispatch]);

  // Load tabs
  useEffect(() => {
    const limit = 5;

    switch (activeTab) {
      case "followers":
        dispatch(getFollowersThunk({ id, page: currentPage, limit }));
        break;
      case "following":
        if (isOwnProfile) {
          dispatch(getFollowingThunk({ page: currentPage, limit }));
        }
        break;
      case "my-recipes":
        dispatch(getOwnRecipesThunk({ id, page: currentPage, limit }));
        break;
      case "favorites":
        dispatch(getFavoriteRecipesThunk({ id, page: currentPage, limit }));
        break;
      case "recipes":
        dispatch(fetchRecipes({ userId: id, page: currentPage, limit }));
        break;
      default:
        break;
    }
  }, [activeTab, currentPage, dispatch, id, isOwnProfile]);

  // Upload handler
  const handleAvatarChange = useCallback(
    (file) => {
      const formData = new FormData();
      formData.append("avatar", file);
      dispatch(updateAvatarThunk(formData));
    },
    [dispatch]
  );

  const getTabItems = () => {
    switch (activeTab) {
      case "followers":
        return followers;
      case "following":
        return following;
      case "my-recipes":
      case "favorites":
      case "recipes":
        return recipes;
      default:
        return [];
    }
  };

  // Empty page after deletion
  useEffect(() => {
    const items = getTabItems();
    if (items.length === 0 && currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [followers, following, recipes, currentPage]);

  return (
    <>
      <Container>
        <PathInfo current="User Profile" />
        <MainTitle
          title={
            isOwnProfile ? "My Profile" : `${fullUserDetails?.name}'s Profile`
          }
        />
        <Subtitle subtitle="Welcome to the user profile page" />

        <UserInfo
          user={fullUserDetails}
          isOwnProfile={isOwnProfile}
          onAvatarChange={handleAvatarChange}
        />

        {isOwnProfile ? (
          <button type="button" onClick={() => setModalOpen(true)}>
            Log Out
          </button>
        ) : (
          <FollowButton
            targetUserId={id}
            isFollowing={fullUserDetails?.isFollowing}
          />
        )}

        <TabsList
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOwnProfile={isOwnProfile}
        />

        <ListItems
          tab={activeTab}
          items={getTabItems()}
          onDelete={(recipeId) => {
            if (activeTab === "my-recipes") {
              dispatch(removeRecipeThunk(recipeId));
            } else if (activeTab === "favorites") {
              dispatch(removeRecipeFromFavoriteThunk(recipeId));
            }
          }}
        />

        <ListPagination
          currentPage={recipePagination.page}
          totalPages={recipePagination.totalPages}
          onPageChange={setCurrentPage}
        />

        <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
          {/* <LogOutModal /> */}
        </Modal>
      </Container>
    </>
  );
};

export default UserPage;
