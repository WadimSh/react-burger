import { useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsBlock from '../burger-ingredients-block/burger-ingredients-block';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { DELETE_INGREDIENT_DATA, ADD_INGREDIENT_DATA } from '../../services/actions/actions';
import style from './burger-ingredients.module.css';

function BurgerIngredients() {
  const [current, setCurrent] = useState('bun');
  const bunRef = useRef();
  const sauceRef = useRef();
  const mainRef = useRef();

  const dispatch = useDispatch();
  const { modal } = useSelector((store) => store.ingredientData);

  const clickTab = (evt, ref) => {
    setCurrent(evt);
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleElement = (ingredient) => {
    dispatch({ type: ADD_INGREDIENT_DATA, ingredient });
  };

  const clickButton = () => {
    dispatch({ type: DELETE_INGREDIENT_DATA });
  };

  return (
    <section className={style.section}>
      {modal && (
        <Modal onClose={clickButton} header={"Детали ингредиента"}>
          <IngredientDetails />
        </Modal>
      )}
      <h1 className={style.title}>Соберите бургер</h1>
      <div className={style.tabs}>
        <Tab
          value="bun"
          active={current === 'bun'}
          onClick={(evt) => clickTab(evt, bunRef)}
        >
          Булки
        </Tab>
        <Tab
          value="sauce"
          active={current === 'sauce'}
          onClick={(evt) => clickTab(evt, sauceRef)}
        >
          Соусы
        </Tab>
        <Tab
          value="main"
          active={current === 'main'}
          onClick={(evt) => clickTab(evt, mainRef)}
        >
          Начинки
        </Tab>
      </div>
      <div className={style.list}>
        <BurgerIngredientsBlock
          tabRef={bunRef}
          type='bun'
          name='Булки'
          handleElement={handleElement}
        />
        <BurgerIngredientsBlock
          tabRef={sauceRef}
          type='sauce'
          name='Соусы'
          handleElement={handleElement}
        />
        <BurgerIngredientsBlock
          type='main'
          tabRef={mainRef}
          name='Начинки'
          handleElement={handleElement}
        />
      </div>
    </section>
  )
}

export default BurgerIngredients;
