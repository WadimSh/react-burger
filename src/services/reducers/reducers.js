import {
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_FAILED,
  ADD_INGREDIENT,
  RESET_INGREDIENT,
  MOVE_INGREDIENT,
  DELETE_INGREDIENT,
  ADD_BUN,
  ADD_INGREDIENT_DATA,
  DELETE_INGREDIENT_DATA,
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_FAILED,
  RESET_ORDER_NUMBER
} from '../actions/actions';

const initialState = {
  data: [],
  isLoading: false,
  hasError: false,
  bun: {},
  ingredients: [],
  modal: false,
  ingredient: {},
  order: null,
  isOrderLoading: false,
  hasOrderError: false
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        hasError: false
      }
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        hasError: false,
        data: action.data,
        ingredientsBurger: {
          ...state.ingredientsBurger, bun: action.bun, main: action.main
        }
      }
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        isLoading: false,
        hasError: true
      }
    }
    default: {
      return state;
    }
  }
}

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

export const ingredientReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT_DATA: {
      return {
        ...state,
        modal: true,
        ingredient: action.ingredient
      }
    }
    case DELETE_INGREDIENT_DATA: {
      return {
        ...state,
        modal: false,
        ingredient: {}
      }
    }
    default: {
      return state;
    }
  }
}

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_NUMBER_REQUEST: {
      return {
        ...state,
        isOrderLoading: true,
        hasOrderError: false
      }
    }
    case GET_ORDER_NUMBER_SUCCESS: {
      return {
        ...state,
        isOrderLoading: false,
        hasOrderError: false,
        order: action.orderNumber
      }
    }
    case GET_ORDER_NUMBER_FAILED: {
      return {
        ...state,
        isOrderLoading: false,
        hasOrderError: true,
        order: null
      }
    }
    case RESET_ORDER_NUMBER: {
      return {
        ...state,
        isOrderLoading: false,
        hasOrderError: false,
        order: null
      }
    }
    default: {
      return state;
    }
  }
}
