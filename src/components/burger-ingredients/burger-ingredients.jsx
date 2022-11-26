import { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsBlock from '../burger-ingredients-block/burger-ingredients-block';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

import { messagePropTypes } from '../../utils/messagePropTypes';
import style from './burger-ingredients.module.css';

function BurgerIngredients({ ingredients }) {
  const [close, setClose] = useState(false);
  const [current, setCurrent] = useState('bun');

  const bunRef = useRef();
  const sauceRef = useRef();
  const mainRef = useRef();

  const clickOnTab = (e, ref) => {
    setCurrent(e);
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

   const clickButton = () => setClose(!close);

  return (
    <section className={style.section}>
      {close && (
        <Modal onClose={clickButton} header={"Детали ингредиента"}>
          <IngredientDetails ingredient={JSON.parse(localStorage.getItem('element'))} />
        </Modal>
      )}
      <h1 className={style.title}>Соберите бургер</h1>
      <div className={style.tabs}>
        <Tab
          value="bun"
          active={current === 'bun'}
          onClick={(e) => clickOnTab(e, bunRef)}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === 'sauce'}
          onClick={(e) => clickOnTab(e, sauceRef)}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={current === 'main'}
          onClick={(e) => clickOnTab(e, mainRef)}
        >
          Начинки
        </Tab>
      </div>
      <div className={style.list}>
        <BurgerIngredientsBlock
          ingredients={ingredients}
          type='bun'
          tabRef={bunRef}
          name='Булки'
          clickButton={clickButton}
        />
        <BurgerIngredientsBlock
          ingredients={ingredients}
          type='sauce'
          tabRef={sauceRef}
          name='Соусы'
          clickButton={clickButton}
        />
        <BurgerIngredientsBlock
          ingredients={ingredients}
          type='main'
          tabRef={mainRef}
          name='Начинки'
          clickButton={clickButton}
        />
      </div>
    </section>
  )
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(messagePropTypes.isRequired).isRequired
}

export default BurgerIngredients;
