import { useState, useContext, useEffect, useReducer } from 'react';

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorIngredient from '../burger-constructor-ingredient/burger-constructor-ingredient';
import TotalPrice from '../total-price/total-price';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { CurrentContext } from '../../contexts/context';

import api from '../../utils/api';
import style from './burger-constructor.module.css';

const initialConstructorState = {
  bun: {},
  burgerIngredients: [],
  totalPrice: 0,
};

function BurgerConstructor() {
  const { data } = useContext(CurrentContext);
  const [close, setClose] = useState(false);
  const [orderNumber, setOrderNumber] = useState(0);
  const clickButton = () => setClose(!close);
 
  const reducer = (state, action) => {
    const bun = data.find((item) => item.type === 'bun');
    const burgerIngredients = data.filter((item) => item.type !== 'bun')
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);
    const indexIngredients = [bun, ...burgerIngredients].map((item) => item._id);
    const totalPrice = state.burgerIngredients.reduce((total, current) => total + current.price, state.bun.price * 2);
    switch (action.type) {
      case 'initiate':
        return { ...state, burgerIngredients, bun, indexIngredients };
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

  const handleOrder = () => {
    api.postOrderDetails(constructorState.indexIngredients)
      .then((res) => {
        clickButton();
        setOrderNumber(res.order.number);
      })
      .catch((err) => console.log(err));
  }

  return (
    <section className={style.section}>
      {close && (
        <Modal onClose={clickButton} header={" "}>
          <OrderDetails orderNumber={orderNumber} />
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
       clickButton={handleOrder}
      />
    </section>
  )
}

export default BurgerConstructor;
