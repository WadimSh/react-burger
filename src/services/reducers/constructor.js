import {
  ADD_INGREDIENT,
  RESET_INGREDIENT,
  MOVE_INGREDIENT,
  DELETE_INGREDIENT,
  ADD_BUN,
} from '../actions/actions';

const initialState = {
  bun: {},
  ingredients: []
};

export const burgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...state,
        bun: action.data,
      }
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.data]
      }
    }
    case RESET_INGREDIENT: {
      return {
        ...state,
        ingredients: [],
        bun: {}
      }
    }
    case MOVE_INGREDIENT: {
      const dragIngredient = [...state.item];
      dragIngredient.splice(action.data.dragIndex, 0, dragIngredient.splice(action.data.hoverIndex, 1)[0]);
      return {
        ...state,
        ingredients: dragIngredient
      }
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        currentBurger: [...state.ingredients].filter((item) => item.id !== action.id)
      }
    }
    default: {
      return state;
    }
  }
}