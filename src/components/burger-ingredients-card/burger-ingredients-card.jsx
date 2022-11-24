import React from 'react';

import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import style from './burger-ingredients-card.module.css';

function BurgerIngredientsCard({ el }) {
  return (
    <div className={style.item} key={el._id}>
      <Counter count={1} size="default" />
      <img src={el.image} className={style.image} alt={el.name} />
      <p className={style.price}>
        <span className={style.number}>{el.price}</span> <CurrencyIcon type="primary" />
      </p>
      <p className={style.text}>{el.name}</p>
    </div>
  );
}
                      
export default BurgerIngredientsCard;