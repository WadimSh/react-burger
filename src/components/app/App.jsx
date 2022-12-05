import { useState, useEffect } from 'react';

import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

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

  const { data, isLoading, hasError } = state;

return (
    <div className={style.App}>
      <AppHeader />
      <Main>
        {isLoading && 'Загрузка...'}
        {hasError && 'Произошла ошибка'}
        {!isLoading && !hasError && (
          <>
            <BurgerIngredients ingredients={data} />
            <BurgerConstructor ingredients={data} />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
