import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { recipeValidationSchema } from "../../validation/recipeValidation";
import Btn from "../UI/Btn/Btn";
import ClearButton from "../UI/ClearBtn/ClearButton";
import styles from "./AddRecipeForm.module.css";

const AddRecipeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(recipeValidationSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    // Логіка для відправки даних на бекенд.
  };

  const handleClearForm = () => {
    reset(); // очищує всю форму
  };

  const instructionValue = watch("instruction", "");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div>
        <label htmlFor="recipeName">Recipe Name</label>
        <input
          type="text"
          id="recipeName"
          {...register("recipeName")}
          className={errors.recipeName ? styles.errorInput : ""}
        />
        {errors.recipeName && (
          <p className={styles.errorMessage}>{errors.recipeName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          {...register("description")}
          className={errors.description ? styles.errorInput : ""}
        />
        {errors.description && (
          <p className={styles.errorMessage}>{errors.description.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          {...register("category")}
          className={errors.category ? styles.errorInput : ""}
        >
          <option value="">Select Category</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="non-vegetarian">Non-Vegetarian</option>
        </select>
        {errors.category && (
          <p className={styles.errorMessage}>{errors.category.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="preparationTime">Preparation Time (min)</label>
        <input
          type="number"
          id="preparationTime"
          {...register("preparationTime")}
          className={errors.preparationTime ? styles.errorInput : ""}
        />
        {errors.preparationTime && (
          <p className={styles.errorMessage}>
            {errors.preparationTime.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="instruction">Instructions</label>
        <textarea
          id="instruction"
          {...register("instruction")}
          maxLength="200"
          className={errors.instruction ? styles.errorInput : ""}
        />
        <p className={styles.characterCount}>
          {200 - instructionValue.length} characters remaining
        </p>
        {errors.instruction && (
          <p className={styles.errorMessage}>{errors.instruction.message}</p>
        )}
      </div>

      <div>
        <Btn type="submit" variant="main" disabled={false}>
          Publish
        </Btn>{" "}
        <ClearButton onClick={handleClearForm} />
      </div>
    </form>
  );
};

export default AddRecipeForm;
