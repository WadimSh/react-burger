import { useState, useContext, useEffect, useReducer } from 'react';
//import PropTypes from 'prop-types';

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorIngredient from '../burger-constructor-ingredient/burger-constructor-ingredient';
import TotalPrice from '../total-price/total-price';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { CurrentContext } from '../../contexts/context';

//import { messagePropTypes } from '../../utils/messagePropTypes';
import style from './burger-constructor.module.css';

const initialConstructorState = {
  bun: {},
  burgerIngredients: [],
  totalPrice: 0,
};

function BurgerConstructor() {
  const { data } = useContext(CurrentContext);
  const [close, setClose] = useState(false);
  const clickButton = () => setClose(!close);

//--  
  const reducer = (state, action) => {
    const bun = data.find((item) => item.type === 'bun');
    const burgerIngredients = data.filter((item) => item.type !== 'bun')
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);
    const totalPrice = state.burgerIngredients.reduce((total, current) => total + current.price, state.bun.price * 2);
    switch (action.type) {
      case 'initiate':
        return { ...state, burgerIngredients, bun };
      case 'count':
        return { ...state, totalPrice };
      default:
        throw new Error(`Ошибка - не правильный тип экшина`);
    }
  }

  const [
    constructorState,
    constructorStateDispatcher,
  ] = useReducer(reducer, initialConstructorState);

  useEffect(() => {
    constructorStateDispatcher({ type: 'initiate' });
    constructorStateDispatcher({ type: 'count' });
  }, [data]);

  //--
  //const main = data.filter((item) => item.type !== "bun");
  //const bun = data.find((item) => item.type === "bun");
  //const totalPrice = main.reduce((total, current) => total + current.price, bun.price * 2);

  return (
    <section className={style.section}>
      {close && (
        <Modal onClose={clickButton} header={" "}>
          <OrderDetails />
        </Modal>
      )}
      <div className={style.bun}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${constructorState.bun.name} (верх)`}
          price={`${constructorState.bun.price}`}
          thumbnail={`${constructorState.bun.image}`}
        />
      </div>
      <ul className={style.stuffingList}>
        {constructorState.burgerIngredients.map((item, index) => <BurgerConstructorIngredient ingredient={item} key={index} />
        )}
      </ul>
      <div className={style.bun}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${constructorState.bun.name} (низ)`}
          price={`${constructorState.bun.price}`}
          thumbnail={`${constructorState.bun.image}`}
        />
      </div>
      <TotalPrice
       totalPrice={constructorState.totalPrice}
       clickButton={clickButton}
      />
    </section>
  )
}

//BurgerConstructor.propTypes = {
//  ingredients: PropTypes.arrayOf(messagePropTypes.isRequired).isRequired
//}

export default BurgerConstructor;
