export interface MealCardModel {
  id: string;
  title: string;
  link: string;
  ingredients: IngredientModel[];
  preparationSteps: string[];

  ingredientsTitle: string;
  preparationTitle: string;
  deleting: boolean;
  updating: boolean;
}

export interface IngredientModel {
  quantity: string;
  food: string;
}
