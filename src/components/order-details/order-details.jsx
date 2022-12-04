import PropTypes from 'prop-types';

import style from './order-details.module.css';
import done from '../../images/done.png';

function OrderDetails({ orderNumber }) {
    
return (
  <div className={style.wrapper}>
    <h2 className={style.title}>{orderNumber}</h2>
    <p className={style.subtitle}>идентификатор заказа</p>
    <img className={style.img} src={done} alt="иконка" />
    <p className={style.text}>Ваш заказ начали готовить</p>
    <p className={style.info}>Дождитесь готовности на орбитальной станции</p>
  </div>
)}

OrderDetails.propTypes = {
  orderNumber: PropTypes.number
}

export default OrderDetails;
