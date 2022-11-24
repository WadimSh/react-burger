import React from 'react';

import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';

import style from './burger-ingredients-block.module.css';

function BurgerIngredientsBlock({ ingredients, type, name, tabRef }) {
  return (
    <>
      <h2 className={style.title} ref={tabRef}>{name}</h2>
        <div className={style.grid}>
          {
            ingredients.filter(item => item.type === type).map((element, index) => (
              <BurgerIngredientsCard element={element} key={index} />
            ))
          }               
        </div>
    </>
  );
}
  
  export default BurgerIngredientsBlock;