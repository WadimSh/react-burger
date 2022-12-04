import { useState, useContext } from 'react';
//import PropTypes from 'prop-types';

import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorIngredient from '../burger-constructor-ingredient/burger-constructor-ingredient';
import TotalPrice from '../total-price/total-price';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { CurrentContext } from '../../contexts/context';

//import { messagePropTypes } from '../../utils/messagePropTypes';
import style from './burger-constructor.module.css';

function BurgerConstructor() {
  const { data } = useContext(CurrentContext);
  const [close, setClose] = useState(false);
  const clickButton = () => setClose(!close);

  const main = data.filter((item) => item.type !== "bun");
  const bun = data.find((item) => item.type === "bun");
  const totalPrice = main.reduce((total, current) => total + current.price, bun.price * 2);

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
          text={`${bun.name} (верх)`}
          price={`${bun.price}`}
          thumbnail={`${bun.image}`}
        />
      </div>
      <ul className={style.stuffingList}>
        {data.map((item, index) => item.type !== "bun" && <BurgerConstructorIngredient ingredient={item} key={index} />
        )}
      </ul>
      <div className={style.bun}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={`${bun.name} (низ)`}
          price={`${bun.price}`}
          thumbnail={`${bun.image}`}
        />
      </div>
      <TotalPrice
       totalPrice={totalPrice}
       clickButton={clickButton}
      />
    </section>
  )
}

//BurgerConstructor.propTypes = {
//  ingredients: PropTypes.arrayOf(messagePropTypes.isRequired).isRequired
//}

export default BurgerConstructor;
