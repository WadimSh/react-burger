import { useState, useEffect } from 'react';

import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import Modal from '../modal/modal';

import api from '../../utils/api';
import style from './App.module.css';

function App() {
  const [close, setClose] = useState(false);
  const clickButtonModal = () => setClose(!close);

  const [state, setState] = useState({
    isLoading: true,
    hasError: false,
    data: []
  });
  
  useEffect(() => {
    setState({ ...state, hasError: false, isLoading: true });
    api.getIngredients()
      .then(res => {
        setState({ data: res.data, hasError: false, isLoading: false })
      })
      .catch(err => {
        setState({ ...state, hasError: true, isLoading: false });
      });
  }, []);
     
return (
    <div className={style.App}>
      <AppHeader />
      <Main>
        {state.isLoading && 'Загрузка...'}
        {state.hasError && 'Произошла ошибка'}
        {!state.isLoading && !state.hasError && (
          <>
            <BurgerIngredients ingredients={state.data} clickButton={clickButtonModal} />
            <BurgerConstructor ingredients={state.data} clickButton={clickButtonModal} />
          </>
        )}
      </Main>
      {close && (
        <Modal onClose={clickButtonModal}>

        </Modal>
      )}
    </div>
  );
}

export default App;
