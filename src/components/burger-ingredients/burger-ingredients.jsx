import { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsBlock from '../burger-ingredients-block/burger-ingredients-block';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';

import { messagePropTypes } from '../../utils/messagePropTypes';
import style from './burger-ingredients.module.css';

function BurgerIngredients({ ingredients }) {
  const [current, setCurrent] = useState('bun');
  const bunRef = useRef();
  const sauceRef = useRef();
  const mainRef = useRef();

  const [close, setClose] = useState(false);
  const [element, setElement] = useState({});

  const clickTab = (evt, ref) => {
    setCurrent(evt);
    ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleElement = (item) => setElement(item);

  const clickButton = () => setClose(!close);

  return (
    <section className={style.section}>
      {close && (
        <Modal onClose={clickButton} header={"Детали ингредиента"}>
          <IngredientDetails ingredient={element} />
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
          ingredients={ingredients}
          type='bun'
          name='Булки'
          clickButton={clickButton}
          handleElement={handleElement}
        />
        <BurgerIngredientsBlock
          tabRef={sauceRef}
          ingredients={ingredients}
          type='sauce'
          name='Соусы'
          clickButton={clickButton}
          handleElement={handleElement}
        />
        <BurgerIngredientsBlock
          ingredients={ingredients}
          type='main'
          tabRef={mainRef}
          name='Начинки'
          clickButton={clickButton}
          handleElement={handleElement}
        />
      </div>
    </section>
  )
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(messagePropTypes.isRequired).isRequired
}

export default BurgerIngredients;
