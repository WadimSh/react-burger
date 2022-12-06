import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorIngredient from '../burger-constructor-ingredient/burger-constructor-ingredient';
import TotalPrice from '../total-price/total-price';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

import { postOrderBurger } from '../../services/actions/actions';
import style from './burger-constructor.module.css';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const { bun, ingredients } = useSelector((store) => store.currentBurger);

  const [close, setClose] = useState(false);

  const clickButton = () => setClose(!close);
  const indexIngredients = ["609646e4dc916e00276b286e","60d3b41abdacab0026a733cd","609646e4dc916e00276b286e"]
  //useMemo(() => [bun, ...ingredients].map((item) => item._id), [bun, ingredients]);
  
  const totalPrice = (bun && ingredients) > 0 ? ingredients.reduce((total, current) => total + current.price, bun.price * 2) : 0;
   
  const handleOrder = () => {
    dispatch(postOrderBurger(indexIngredients));
  }

  return (
    <section className={style.section}>
      {close && (
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
