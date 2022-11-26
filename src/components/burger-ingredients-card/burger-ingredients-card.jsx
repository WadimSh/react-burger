import { useState } from 'react';
import PropTypes from 'prop-types';

import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';

import { messagePropTypes } from '../../utils/messagePropTypes';
import style from './burger-ingredients-card.module.css';

function BurgerIngredientsCard({ element, clickButton }) {
    
  return (
    <div className={style.item} key={element._id} onClick={clickButton}>
      {element.__v !== 0 && <Counter count={element.__v} size="default" />}
      <img src={element.image} className={style.image} alt={element.name} />
      <p className={style.price}>
        <span className={style.number}>{element.price}</span>
        <CurrencyIcon
          type="primary"
        />
      </p>
      <p className={style.text}>{element.name}</p>
    </div>
  )
}

BurgerIngredientsCard.propTypes = {
  element: PropTypes.objectOf(messagePropTypes).isRequired
}
                      
export default BurgerIngredientsCard;
