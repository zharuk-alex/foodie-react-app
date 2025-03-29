import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import css from './RecipePreview.module.css';
import { removeRecipeThunk, removeRecipeFromFavoriteThunk } from 'store/recipes/operations';
import placeholderImage from 'images/recipe/placeholder-recipe.jpg';
import { useState } from 'react';

const RecipePreview = ({ data, tab }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { id, thumb, title, description } = data;

  const isDeletable = ['my-recipes', 'favorites'].includes(tab);

  const handleDelete = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (tab === 'my-recipes') {
        await dispatch(removeRecipeThunk(id)).unwrap();
      } else if (tab === 'favorites') {
        await dispatch(removeRecipeFromFavoriteThunk(id)).unwrap();
      }
    } catch (error) {
      console.error('Failed to remove recipe:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.card}>
      <img src={thumb || placeholderImage} alt={title} className={css.image} />
      <div className={css.content}>
        <h3 className={css.title}>{title}</h3>
        <p className={css.description}>{description}</p>
      </div>
      <div className={css.actions}>
        <Link to={`/recipe/${id}`} className={css.link} title="View Recipe">
          ➜
        </Link>
        {isDeletable && (
          <button className={css.delete} onClick={handleDelete} disabled={loading} title="Delete Recipe">
            🗑️
          </button>
        )}
      </div>
    </div>
  );
};

export default RecipePreview;
