import { useSelector } from 'react-redux';
import css from './ListItems.module.css';
import { RecipePreview, UserCard } from 'components/User';
import { selectIsLoading as selectIsLoadingFollow } from '../../../store/followersAndFollowing/selectors.js';
import { selectIsLoading as selectIsLoadingRecipe } from '../../../store/recipes/selectors.js';
import { AppLoader } from '../../UI/index.js';

const ListItems = ({ tab, items, onDelete = () => {} }) => {
  const isLoadingFollow = useSelector(selectIsLoadingFollow);
  const isLoadingRecipe = useSelector(selectIsLoadingRecipe);

  const getEmptyMessage = () => {
    switch (tab) {
      case 'my-recipes':
        return 'Nothing has been added to your recipes list yet. Please browse our recipes and add your favorites for easy access in the future.';
      case 'favorites':
        return 'Nothing has been added to your favorite recipes list yet. Please browse our recipes and add your favorites for easy access in the future.';
      case 'followers':
        return 'There are currently no followers on your account. Please engage our visitors with interesting content and draw their attention to your profile.';
      case 'following':
        return 'Your account currently has no subscriptions to other users. Learn more about our users and select those whose content interests you.';
      default:
        return 'No items to display.';
    }
  };
  return (
    <>
      {(isLoadingFollow || isLoadingRecipe) && <AppLoader />}
      {((!isLoadingFollow && !isLoadingRecipe) && (!items || items.length === 0)) ? (
        <div className={css.empty}>{getEmptyMessage()}</div>
      ) : (
        <div className={css.itemsGrid}>
          {['my-recipes', 'favorites', 'recipes'].includes(tab) &&
            items.map(recipe => <RecipePreview key={recipe.id} data={recipe} tab={tab} onDelete={onDelete} />)}
          {['followers', 'following'].includes(tab) && items.map(user => <UserCard key={user.id} user={user} tab={tab} />)}
        </div>
      )}
    </>
  );
};

export default ListItems;
