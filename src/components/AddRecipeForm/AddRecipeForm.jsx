import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { Plus, Minus, Trash } from 'lucide-react';

import styles from './AddRecipeForm.module.css';
import Btn from '../UI/Btn/Btn';
import { recipeValidationSchema } from '../../validation/recipeValidation';
import UploadRecipePhoto from '../UploadRecipePhoto/UploadRecipePhoto.jsx';
import RecipeIngredients from '../RecipeIngredients/RecipeIngredients.jsx';
import { Dropdown } from '../UI';

import { fetchIngredients, fetchCategories } from '../../store/recipes/operations.js';
import { selectCategories, selectIngredients } from '../../store/recipes/selectors.js';
import { addRecipeThunk } from '../../store/recipes/operations.js';

const AddRecipeForm = ({ onSubmitForm }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categories = useSelector(selectCategories);
  const ingredients = useSelector(selectIngredients);

  useEffect(() => {
    dispatch(fetchIngredients());
    dispatch(fetchCategories());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(recipeValidationSchema),
  });

  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [ingredientQuantity, setIngredientQuantity] = useState('');
  const [preparationTime, setPreparationTime] = useState(1);
  const [previewImage, setPreviewImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const descriptionValue = watch('description', '');
  const instructionValue = watch('instruction', '');

  const categoryOptions = categories.map(cat => ({ value: cat.id, label: cat.name }));
  const ingredientOptions = ingredients.map(ing => ({ value: ing.id, label: ing.name, img: ing.img }));

  const addIngredient = () => {
    if (!selectedIngredient || !ingredientQuantity) return;

    const newIngredient = {
      id: selectedIngredient.value,
      name: selectedIngredient.label,
      img: selectedIngredient.img || '/default-image.png',
      measure: ingredientQuantity,
    };

    setSelectedIngredients(prev => [...prev, newIngredient]);
    setSelectedIngredient(null);
    setIngredientQuantity('');
  };

  const handleInputResize = event => {
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 'px';
  };

  const handleRemoveIngredient = id => {
    setSelectedIngredients(prev => prev.filter(ingredient => ingredient.id !== id));
  };

  const handleCategoryChange = value => {
    setSelectedCategory(value);
  };

  const adjustPreparationTime = delta => {
    setPreparationTime(prev => Math.max(1, prev + delta));
  };

  const onSubmit = async data => {
    try {
      const formData = new FormData();
      const { image, title, description, category, area, time, instructions } = data;

      formData.append('thumb', image[0]);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('area', area);
      formData.append('time', time);
      formData.append('instructions', instructions);

      formData.append(
        'ingredients',
        JSON.stringify(
          selectedIngredients.map(card => ({
            id: card._id,
            measure: card.measure,
          }))
        )
      );

      await addNewRecipe(formData);
      toast.success('Recipe added successfully');

      if (user) {
        navigate(`/user/${user.id}/recipies`);
      }
    } catch (error) {
      toast.error(`Error occurred while adding new recipe: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {errorMessage && <div className={styles.errorNotification}>{errorMessage}</div>}
      {successMessage && <div className={styles.successNotification}>{successMessage}</div>}

      <UploadRecipePhoto register={register} setValue={setValue} previewImage={previewImage} setPreviewImage={setPreviewImage} />

      <div className={styles.formContainer}>
        <input type="text" placeholder="The Name of the Recipe" {...register('recipeName')} className={errors.recipeName ? styles.errorInput : ''} />
        {errors.recipeName && <p className={styles.errorMessage}>{errors.recipeName.message}</p>}

        <div className={styles.inputWrapper}>
          <textarea
            placeholder="Enter a description of the dish"
            maxLength="200"
            {...register('description')}
            className={errors.description ? styles.errorInput : ''}
            onInput={handleInputResize}
          />
          <div className={styles.charCounter}>{descriptionValue.length}/200</div>
          {errors.description && <p className={styles.errorMessage}>{errors.description.message}</p>}
        </div>

        <div className={styles.categorytimeName}>
          <label htmlFor="category">Category</label>

          <label htmlFor="preparationtime">COOKING TIME</label>
        </div>

        <div className={styles.categorytimecontainer}>
          <Dropdown
            className={styles.Selector}
            options={categoryOptions}
            value={selectedCategory}
            onChange={setSelectedCategory}
            placeholder="Select a category"
            isAddRecipeForm={true}
          />

          <div className={styles.timeContainer}>
            <button className={styles.cookingTimeBtn} type="button" onClick={() => adjustPreparationTime(-1)}>
              <Minus size={22} />
            </button>

            <div className={styles.cookingTimeCount}>
              <span>{preparationTime}</span>
              <span>min</span>
            </div>
            <button className={styles.cookingTimeBtn} type="button" onClick={() => adjustPreparationTime(1)}>
              <Plus size={22} />
            </button>
          </div>
        </div>

        <label htmlFor="ingredient">Ingredients</label>
        <div className={styles.IngredientContainer}>
          <Dropdown
            className={styles.Selector}
            options={ingredientOptions}
            value={selectedIngredient}
            onChange={setSelectedIngredient}
            placeholder="Select an ingredient"
            isAddRecipeForm={true}
          />
          <input
            className={styles.quantity}
            type="text"
            placeholder="Enter quantity"
            value={ingredientQuantity}
            onChange={e => setIngredientQuantity(e.target.value)}
          />
          {errors.ingredients && <p className={styles.errorMessage}>{errors.ingredients.message}</p>}
        </div>
        <Btn className={styles.btnadd} type="button" onClick={addIngredient}>
          Add ingredient <Plus size={22} />
        </Btn>
        <RecipeIngredients ingredients={selectedIngredients} onRemove={handleRemoveIngredient} hideTitle={true} />

        <div className={styles.inputWrapper}>
          <label className={styles.recipeWrapper} htmlFor="instruction">
            Recipe Preparation
          </label>

          <textarea
            placeholder="Enter recipe"
            maxLength="200"
            {...register('instruction')}
            className={errors.instruction ? styles.errorInput : ''}
            onInput={handleInputResize}
          />
          <div className={styles.charCounter}>{instructionValue.length}/200</div>
          {errors.instruction && <p className={styles.errorMessage}>{errors.instruction.message}</p>}
        </div>

        <div className={styles.publishContainer}>
          <button
            className={styles.cookingTimeBtn}
            type="button"
            onClick={() => {
              reset();
              setSelectedIngredients([]);
              setSelectedCategory('');
              setPreparationTime(1);
            }}
          >
            <Trash size={18} />
          </button>
          <Btn type="submit">Publish</Btn>
        </div>
      </div>
    </form>
  );
};

export default AddRecipeForm;
