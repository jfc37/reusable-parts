export interface MealCardModel {
  id: string;
  title: string;
  link: string;
  ingredients: IngredientModel[];
  preparationSteps: string[];
  cookingSteps: string[];

  foodOptions: string[];

  ingredientsTitle: string;
  preparationTitle: string;
  cookingStepsTitle: string;
  deleting: boolean;
  updating: boolean;
}

export interface IngredientModel {
  quantity: string;
  food: string;
}
