import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import { getIngredientsBurger } from '../../services/actions/actions';
import style from './App.module.css';

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.ingredientsBurger.isLoading);
  const hasError = useSelector((store) => store.ingredientsBurger.hasError);
  
  useEffect(() => {
    dispatch(getIngredientsBurger());
  }, [dispatch]);
  
  return (
    <div className={style.App}>
      <AppHeader />
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
    </div>
  );
}

export default App;
