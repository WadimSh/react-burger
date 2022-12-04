import { useContext } from 'react';
import PropTypes from 'prop-types';

import BurgerIngredientsCard from '../burger-ingredients-card/burger-ingredients-card';
import { CurrentContext } from '../../contexts/context';

//import { messagePropTypes } from '../../utils/messagePropTypes';
import style from './burger-ingredients-block.module.css';

function BurgerIngredientsBlock({ type, name, tabRef, clickButton, handleElement }) {
  const { data } = useContext(CurrentContext);

  return (
    <>
      <h2 className={style.title} ref={tabRef}>{name}</h2>
      <div className={style.grid}>
        {
          data.filter(item => item.type === type).map((element, index) => (
            <BurgerIngredientsCard
              element={element}
              key={index}
              clickButton={clickButton}
              handleElement={handleElement}
            />
          ))
        }               
      </div>
    </>
  )
}

BurgerIngredientsCard.propTypes = {
  //ingredients: PropTypes.arrayOf(messagePropTypes),
  type: PropTypes.string,
  name: PropTypes.string,
  tabRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  clickButton: PropTypes.func,
  handleElement: PropTypes.func
}

export default BurgerIngredientsBlock;
