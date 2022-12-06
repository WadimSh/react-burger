import {
  GET_ORDER_NUMBER_SUCCESS,
  GET_ORDER_NUMBER_REQUEST,
  GET_ORDER_NUMBER_FAILED
} from '../actions/actions';

const initialState = {
  modal: false,
  order: null,
  isOrderLoading: false,
  hasOrderError: false
};

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
    default: {
      return state;
    }
  }
}