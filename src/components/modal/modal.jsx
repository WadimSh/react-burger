import { createPortal } from 'react-dom';

import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

import style from './modal.module.css';

const modalRoot = document.getElementById("react-modals");

function Modal({ onClose, children }) {
    
return createPortal (
    <>
    <div className={style.modal}>
      <div className={style.header}>
        <h3 className={style.title}>Детали ингредиента</h3>
        <CloseIcon type="primary" onClick={onClose}/>
      </div>
      {children}
    </div>
    <ModalOverlay onClose={onClose}/>
    </>,
    modalRoot
  );
}

export default Modal;