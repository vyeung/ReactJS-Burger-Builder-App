import * as actionTypes from "../actions/actionTypes";

const INGREDIENT_PRICES = {
  lettuce: 0.5,
  bacon: 1.5,
  cheese: 1.0,
  beef: 2.0
}

const initialState = {
  ingredients: {
    lettuce: 0,
    bacon: 0,
    cheese: 0,
    beef: 0
  },
  totalPrice: 3
};

const burgerBuilderReducer = (state=initialState, action) => {
  if(action.type === actionTypes.ADD_INGREDIENT) {
    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        //ES6 syntax called computed property
        [action.ingredName]: state.ingredients[action.ingredName] + 1
      },
      totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredName]
    };
  }
  else if(action.type === actionTypes.REMOVE_INGREDIENT) {
    return {
      ...state,
      ingredients: {
        ...state.ingredients,
        [action.ingredName]: state.ingredients[action.ingredName] - 1
      },
      totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredName]
    };
  }

  return state;
}

export default burgerBuilderReducer;