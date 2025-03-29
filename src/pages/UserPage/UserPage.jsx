import css from './UserPage.module.css';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { MainTitle, Subtitle, Modal, Container, Section } from 'components/UI';
import { UserInfo, LogoutFollowButton, TabsList, ListItems, ListPagination, PathInfo } from 'components/User';

import { getFullUserDetailsThunk, getFollowersThunk, getFollowingThunk } from 'store/auth/operations';

import { cleanPagination as cleanAuthPagination, cleanFollowers, cleanFollowing } from 'store/auth/slice';

import { selectCurrentUser, selectFullUserDetails, selectFollowers, selectFollowing } from 'store/auth/selectors';

import { getOwnRecipesThunk, getFavoriteRecipesThunk, fetchRecipes, removeRecipeThunk, removeRecipeFromFavoriteThunk } from 'store/recipes/operations';

import { selectRecipes as selectRecipeList, selectPagination as selectRecipePagination } from 'store/recipes/selectors';

import { cleanPagination as cleanRecipesPagination, cleanRecipes } from 'store/recipes/slice';
import { selectIsLoading } from '../../store/auth/selectors.js';
import { AppLoader } from '../../components/UI/index.js';

const UserPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const fullUserDetails = useSelector(selectFullUserDetails);
  const followers = useSelector(selectFollowers);
  const following = useSelector(selectFollowing);
  const recipes = useSelector(selectRecipeList);
  const recipePagination = useSelector(selectRecipePagination);
  const isLoading = useSelector(selectIsLoading);

  const [activeTab, setActiveTab] = useState('recipes');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);

  const isOwnProfile = id === currentUser?.id;

  useEffect(() => {
    if (isOwnProfile) {
      setActiveTab('my-recipes');
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
    if (!currentUser?.id) return;
    const limit = 5;

    switch (activeTab) {
      case 'followers':
        dispatch(getFollowersThunk({ id, page: currentPage, limit }));
        break;
      case 'following':
        if (isOwnProfile) {
          dispatch(getFollowingThunk({ page: currentPage, limit }));
        }
        break;
      case 'my-recipes':
        dispatch(getOwnRecipesThunk({ id, page: currentPage, limit }));
        break;
      case 'favorites':
        dispatch(getFavoriteRecipesThunk({ id, page: currentPage, limit }));
        break;
      default:
        break;
    }
  }, [activeTab, currentPage, dispatch, id, isOwnProfile]);

  const getTabItems = () => {
    switch (activeTab) {
      case 'followers':
        return followers;
      case 'following':
        return following;
      case 'my-recipes':
      case 'favorites':
        return recipes;
      default:
        return [];
    }
  };

  // Empty page after deletion
  useEffect(() => {
    const items = getTabItems();
    if (items.length === 0 && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  }, [followers, following, recipes, currentPage]);

  return fullUserDetails && !isLoading ? (
    <>
      {/* Section Title */}
      <Section className={css.title}>
        <Container>
          <PathInfo current="PROFILE" />
          <MainTitle className={css.profileTitle}>PROFILE</MainTitle>
          <Subtitle>Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us.</Subtitle>
        </Container>
      </Section>

      {/* Section User */}
      <Section>
        <Container className={css.userContainer}>
          <UserInfo user={fullUserDetails} isOwnProfile={isOwnProfile} />
          <LogoutFollowButton isOwnProfile={isOwnProfile} isFollowing={fullUserDetails?.isFollowing} targetUserId={id} />
        </Container>
      </Section>

      {/* Section Tabs */}
      <Section>
        <Container>
          <TabsList activeTab={activeTab} setActiveTab={setActiveTab} isOwnProfile={isOwnProfile} />

          <ListItems
            tab={activeTab}
            items={getTabItems()}
            onDelete={recipeId => {
              if (activeTab === 'my-recipes') {
                dispatch(removeRecipeThunk(recipeId));
              } else if (activeTab === 'favorites') {
                dispatch(removeRecipeFromFavoriteThunk(recipeId));
              }
            }}
          />

          <ListPagination currentPage={recipePagination.page} totalPages={recipePagination.totalPages} onPageChange={setCurrentPage} />
        </Container>
      </Section>
    </>
  ) : (
    <AppLoader />
  );
};

export default UserPage;
