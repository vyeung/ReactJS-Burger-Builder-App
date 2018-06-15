import * as actionTypes from "./actionTypes";

export const initIngredients = () => {
  return {
    type: actionTypes.INIT_INGREDIENTS,
  };
}

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredName: name
  };
}

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredName: name
  };
}