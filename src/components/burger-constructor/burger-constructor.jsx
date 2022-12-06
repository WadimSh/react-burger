import { useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorIngredient from '../burger-constructor-ingredient/burger-constructor-ingredient';
import TotalPrice from '../total-price/total-price';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { postOrderBurger, OPEN_ORDER_MODAL, CLOSE_ORDER_MODAL } from '../../services/actions/actions';
import style from './burger-constructor.module.css';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const { bun, ingredients } = useSelector((store) => store.currentBurger);
  const { modal } = useSelector((store) => store.orderNumber);

  const clickButton = () => {
    dispatch({ type: CLOSE_ORDER_MODAL });
  };
  const indexIngredients = useMemo(() => [bun, ...ingredients].map((item) => item._id), [bun, ingredients]);
  
  const totalPrice = useMemo(() =>(bun && ingredients) > 0 ? ingredients.reduce((total, current) => total + current.price, bun.price * 2) : 0);
   
  const handleOrder = () => {
    dispatch(postOrderBurger(indexIngredients));
    dispatch({ type: OPEN_ORDER_MODAL });
  }

  return (
    <section className={style.section}>
      {modal && (
        <Modal onClose={clickButton} header={" "}>
          <OrderDetails />
        </Modal>
      )}
      {bun > 0 ? (
        <div className={style.bun}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={`${bun.name} (верх)`}
          price={`${bun.price}`}
          thumbnail={`${bun.image}`}
        />
      </div>) : (
        <div className={style.unactiveTop}>Перетащите сюда булку</div>
      )}
      {ingredients.length > 0 ? (
        <ul className={style.stuffingList}>
        {ingredients.map((item, index) => <BurgerConstructorIngredient ingredient={item} key={index} />
        )}
      </ul>
      ) : (
        <div className={style.unactive}>Перетащите сюда ингредиенты</div>
      )}
      
      {bun > 0 ? (
      <div className={style.bun}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={`${bun.price}`}
          thumbnail={`${bun.image}`}
        />
      </div>) : (
        <div className={style.unactiveBotton}>Перетащите сюда булку</div>
      )}      
      <TotalPrice
       totalPrice={totalPrice}
       clickButton={handleOrder}
      />
    </section>
  )
}

export default BurgerConstructor;
