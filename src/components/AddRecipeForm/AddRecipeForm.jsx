import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { recipeValidationSchema } from '../../validation/recipeValidation';
import Btn from '../UI/Btn/Btn';
import { Plus, Minus, Trash } from 'lucide-react';
import styles from './AddRecipeForm.module.css';
import UploadRecipePhoto from '../UploadRecipePhoto/UploadRecipePhoto.jsx';
import { Dropdown } from '../UI';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIngredients, fetchCategories } from '../../store/recipes/operations.js';
import { selectCategories, selectIngredients } from '../../store/recipes/selectors.js';

const AddRecipeForm = ({ onSubmitForm }) => {
  const dispatch = useDispatch();
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

  const descriptionValue = watch('description', '');
  const instructionValue = watch('instruction', '');

  const categoryOptions = categories.map(cat => ({ value: cat.id, label: cat.name }));
  const ingredientOptions = ingredients.map(ing => ({ value: ing.id, label: ing.name }));

  const addIngredient = () => {
    if (selectedIngredient && ingredientQuantity) {
      const newIngredient = { id: selectedIngredient.value, name: selectedIngredient.label, quantity: ingredientQuantity };
      setSelectedIngredients(prev => [...prev, newIngredient]);
      setSelectedIngredient(null);
      setIngredientQuantity('');
    }
  };

  const handleInputResize = event => {
    event.target.style.height = 'auto';
    event.target.style.height = event.target.scrollHeight + 'px';
  };

  const removeIngredient = index => {
    setSelectedIngredients(prev => prev.filter((_, i) => i !== index));
  };

  const handleCategoryChange = value => {
    setSelectedCategory(value);
  };

  const handleIngredientChange = value => {
    setSelectedIngredient(value);
  };

  const adjustPreparationTime = delta => {
    setPreparationTime(prev => Math.max(1, prev + delta));
  };

  const onSubmit = async data => {
    setErrorMessage('');
    const formData = new FormData();
    formData.append('recipeName', data.recipeName);
    formData.append('description', data.description);
    formData.append('category', selectedCategory);
    formData.append('preparationTime', preparationTime);
    formData.append('instruction', data.instruction);
    if (data.image?.[0]) formData.append('thumb', data.image[0]);

    selectedIngredients.forEach((item, index) => {
      formData.append(`ingredients[${index}][name]`, item.ingredient);
      formData.append(`ingredients[${index}][quantity]`, item.quantity);
    });

    try {
      await onSubmitForm(formData);
      navigate('/user');
    } catch (error) {
      setErrorMessage(error.message || 'Something went wrong.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {errorMessage && <div className={styles.errorNotification}>{errorMessage}</div>}

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
          <input className={styles.quantity} type="text" placeholder="Enter quantity" value={ingredientQuantity} onChange={e => setIngredientQuantity(e.target.value)} />
        </div>
        <Btn className={styles.btnadd} type="button" onClick={addIngredient}>
          Add ingredient <Plus size={22} />
        </Btn>

        <ul className={styles.ingredientsList}>
          {selectedIngredients.map((item, index) => (
            <li key={index} className={styles.ingredientItem}>
              <span>
                {item.ingredient} - {item.quantity}
              </span>
              <button type="button" className={styles.removeButton} onClick={() => removeIngredient(index)}>
                <Trash size={18} />
              </button>
            </li>
          ))}
        </ul>

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
        </div>

        <div className={styles.publishContainer}>
          <button className={styles.cookingTimeBtn} type="button" onClick={() => reset()}>
            <Trash size={18} />
          </button>
          <Btn type="submit">Publish</Btn>
        </div>
      </div>
    </form>
  );
};

export default AddRecipeForm;
