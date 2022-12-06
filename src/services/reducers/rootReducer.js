import { combineReducers } from 'redux';
import {
  ingredientsReducer,
  burgerReducer,
  ingredientReducer,
  orderReducer
} from './reducers';

const rootReducer = combineReducers({
  ingredientsBurger: ingredientsReducer,
  currentBurger: burgerReducer,
  ingredientData: ingredientReducer,
  orderNumber: orderReducer
});

export default rootReducer;