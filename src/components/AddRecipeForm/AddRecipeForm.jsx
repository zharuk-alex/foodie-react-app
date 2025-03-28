import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { recipeValidationSchema } from "../../validation/recipeValidation";
import Btn from "../UI/Btn/Btn";
import { Plus, Minus, Trash } from "lucide-react";
import styles from "./AddRecipeForm.module.css";

const AddRecipeForm = ({ categories = [], ingredients = [], onSubmitForm }) => {
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

  //   const [imagePreview, setImagePreview] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [preparationTime, setPreparationTime] = useState(1);
  const descriptionValue = watch("description", "");
  const instructionValue = watch("instruction", "");

  //   const handleImageChange = (event) => {
  //     const file = event.target.files[0];
  //     if (file) {
  //       setImagePreview(URL.createObjectURL(file));
  //     }
  //   };

  const addIngredient = () => {
    const ingredient = watch("ingredient");
    const quantity = watch("quantity");
    if (ingredient && quantity) {
      setSelectedIngredients([
        ...selectedIngredients,
        { ingredient, quantity },
      ]);
      setValue("ingredient", "");
      setValue("quantity", "");
    }
  };

  const removeIngredient = (index) => {
    setSelectedIngredients(selectedIngredients.filter((_, i) => i !== index));
  };

  const adjustPreparationTime = (delta) => {
    setPreparationTime((prev) => Math.max(1, prev + delta));
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("recipeName", data.recipeName);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("preparationTime", preparationTime);
    formData.append("instruction", data.instruction);
    if (data.image[0]) formData.append("image", data.image[0]);
    selectedIngredients.forEach((item, index) => {
      formData.append(`ingredients[${index}][name]`, item.ingredient);
      formData.append(`ingredients[${index}][quantity]`, item.quantity);
    });

    onSubmitForm(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      {/* <input
        type="file"
        accept="image/*"
        {...register("image")}
        onChange={handleImageChange}
      />
      {imagePreview && (
        <img src={imagePreview} alt="Preview" className={styles.imagePreview} />
      )} */}

      <input
        type="text"
        placeholder="The Name of the Recipe"
        {...register("recipeName")}
        className={errors.recipeName ? styles.errorInput : ""}
      />
      {errors.recipeName && (
        <p className={styles.errorMessage}>{errors.recipeName.message}</p>
      )}

      <div className={styles.inputWrapper}>
        <textarea
          placeholder="Enter a description of the dish"
          maxLength="200"
          {...register("description")}
          className={errors.description ? styles.errorInput : ""}
        />
        <div className={styles.charCounter}>{descriptionValue.length}/200</div>
      </div>

      <div className={styles.categorytimeName}>
        <label htmlFor="category">Category</label>
        <label htmlFor="preparationtime">COOKING TIME</label>
      </div>

      <div className={styles.categorytimecontainer}>
        <select
          {...register("category")}
          className={errors.category ? styles.errorInput : ""}
        >
          <option value="" disabled hidden>
            Select a category
          </option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <div className={styles.timeContainer}>
          <button
            className={styles.cookingTimeBtn}
            type="button"
            onClick={() => adjustPreparationTime(-1)}
          >
            <Minus size={22} />
          </button>

          <div className={styles.cookingTimeCount}>
            <span>{preparationTime}</span>
            <span>min</span>
          </div>
          <button
            className={styles.cookingTimeBtn}
            type="button"
            onClick={() => adjustPreparationTime(1)}
          >
            <Plus size={22} />
          </button>
        </div>
      </div>

      <label htmlFor="ingredient">Ingredients</label>
      <div className={styles.IngredientContainer}>
        <select {...register("ingredient")}>
          <option value="" disabled hidden>
            Add the ingredient
          </option>
          {ingredients.map((ing) => (
            <option key={ing} value={ing}>
              {ing}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Enter quantity"
          {...register("quantity")}
        />
      </div>
      <Btn className={styles.btnadd} type="button" onClick={addIngredient}>
        Add ingredient <Plus size={22} />
      </Btn>

      <ul>
        {selectedIngredients.map((item, index) => (
          <li key={index}>
            {item.ingredient} - {item.quantity}
            <button type="button" onClick={() => removeIngredient(index)}>
              Remove
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
          {...register("instruction")}
          className={errors.instruction ? styles.errorInput : ""}
        />
        <div className={styles.charCounter}>{instructionValue.length}/200</div>
      </div>

      <div className={styles.publishContainer}>
        <button
          className={styles.cookingTimeBtn}
          type="button"
          onClick={() => reset()}
        >
          <Trash size={18} />
        </button>
        <Btn type="submit">Publish</Btn>
      </div>
    </form>
  );
};

export default AddRecipeForm;
