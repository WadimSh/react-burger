import { useState, useEffect } from 'react';

import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { CurrentContext } from '../../contexts/context';

import api from '../../utils/api';
import style from './App.module.css';

function App() {
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

  const { isLoading, hasError } = state;

  return (
    <div className={style.App}>
      <AppHeader />
      <CurrentContext.Provider value={state}>
        <Main>
          {isLoading && 'Загрузка...'}
          {hasError && 'Произошла ошибка'}
          {!isLoading && !hasError && (
            <>
              <BurgerIngredients />
              <BurgerConstructor />
            </>
          )}
        </Main>
      </CurrentContext.Provider>
    </div>
  );
}

export default App;
