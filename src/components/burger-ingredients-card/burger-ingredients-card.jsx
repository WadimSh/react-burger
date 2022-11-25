import PropTypes from 'prop-types';

import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';

import style from './burger-ingredients-card.module.css';

function BurgerIngredientsCard({ element }) {

  return (
    <div className={style.item} key={element._id}>
      {(element.__v !== 0) ? <Counter count={element.__v} size="default" /> : ""}
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
  element: PropTypes.object.isRequired
}
                      
export default BurgerIngredientsCard;
