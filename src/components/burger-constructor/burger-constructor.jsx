import React from 'react';

import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorIngredient from '../burger-constructor-ingredient/burger-constructor-ingredient';

import style from './burger-constructor.module.css';

function BurgerConstructor({ ingredients }) {
  const main = ingredients.filter((item) => item.type !== "bun");
  const bun = ingredients.find((item) => item.type === "bun");
  const totalPrice = main.reduce((total, current) => total + current.price, bun.price * 2);

  const [active, setActive] = React.useState(false);
  const clickOnButton = () => setActive(!active);

  return (
    <section className={style.section}>
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
        {ingredients.map((item, index) => {
          if (item.type !== "bun") {
            return (
              <BurgerConstructorIngredient ingredient={item} key={index} />
            )
          } else {
            return null
          }
        })}
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
      <div className={style.total}>
        <div className={style.priceBox}>
          <p className={style.price}>{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={() => clickOnButton}>
				  Оформить заказ
			  </Button>
      </div>
    </section>
  );
}

export default BurgerConstructor;