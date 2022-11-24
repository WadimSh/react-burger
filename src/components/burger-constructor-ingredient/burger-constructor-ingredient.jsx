import React from 'react';

import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import style from '../burger-constructor/burger-constructor.module.css';

function BurgerConstructorIngredient({ ingredient }) {
  
  return (
    <li className={style.stuffingItem} key={ingredient._id}>
      <DragIcon type="primary"/>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
      />
    </li>
  );
}

export default BurgerConstructorIngredient;