import css from "./ListItems.module.css";
import { RecipePreview, UserCard } from "components/User";

const ListItems = ({ tab, items }) => {
  if (!items || items.length === 0) {
    return <div className={css.empty}>Nothing to show here.</div>;
  }

  const renderContent = () => {
    if (["my-recipes", "favorites", "recipes"].includes(tab)) {
      return items.map((recipe) => (
        <RecipePreview key={recipe.id} data={recipe} tab={tab} />
      ));
    }

    if (["followers", "following"].includes(tab)) {
      return items.map((user) => (
        <UserCard key={user.id} user={user} tab={tab} />
      ));
    }

    return null;
  };

  return <div className={css.itemsGrid}>{renderContent()}</div>;
};

export default ListItems;
