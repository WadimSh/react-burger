import React from 'react';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsBlock from '../burger-ingredients-block/burger-ingredients-block';

import style from './burger-ingredients.module.css';

function BurgerIngredients({ ingredients }) {
  const [current, setCurrent] = React.useState('bun');
  const bunRef = React.useRef();
  const sauceRef = React.useRef();
  const mainRef = React.useRef();

  const clickOnTab = (e, ref) => {
    setCurrent(e);
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className={style.section}>
      <h1 className={style.title}>Соберите бургер</h1>
            <div className={style.tabs}>
                <Tab value="bun" active={current === 'bun'} onClick={(e) => clickOnTab(e, bunRef)}>
                    Булки
                </Tab>
                <Tab value="sauce" active={current === 'sauce'} onClick={(e) => clickOnTab(e, sauceRef)}>
                    Соусы
                </Tab>
                <Tab value="main" active={current === 'main'} onClick={(e) => clickOnTab(e, mainRef)}>
                    Начинки
                </Tab>
            </div>
            <div className={style.list}>
                <BurgerIngredientsBlock ingredients={ingredients} type='bun' tabRef={bunRef} name='Булки' />
                <BurgerIngredientsBlock ingredients={ingredients} type='sauce' tabRef={sauceRef} name='Соусы' />
                <BurgerIngredientsBlock ingredients={ingredients} type='main' tabRef={mainRef} name='Начинки' />
            </div>
    </section>
  );
}

export default BurgerIngredients;