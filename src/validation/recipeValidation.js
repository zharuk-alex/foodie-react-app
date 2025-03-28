import * as Yup from "yup";

export const recipeValidationSchema = Yup.object().shape({
  recipeName: Yup.string().required("Recipe name is required"),
  description: Yup.string()
    .max(200, "Description cannot be more than 200 characters")
    .required("Description is required"),
  category: Yup.string().required("Category is required"),
  ingredients: Yup.array().of(
    Yup.object().shape({
      ingredient: Yup.string().required("Ingredient is required"),
      quantity: Yup.number().required("Quantity is required").positive(),
    })
  ),
  preparationTime: Yup.number()
    .min(1, "Time should be at least 1 minute")
    .required("Preparation time is required"),
  instruction: Yup.string()
    .max(200, "Instruction cannot be more than 200 characters")
    .required("Instruction is required"),
});
