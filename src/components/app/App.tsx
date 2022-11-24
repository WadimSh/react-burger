import React from 'react';

import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import {data} from '../../utils/data';

import style from './App.module.css';

function App() {
  
  return (
    <div className={style.App}>
      <AppHeader />
      <Main>
        <BurgerIngredients ingredients={data} />
        <BurgerConstructor ingredients={data} />
      </Main>
    </div>
  );
}

export default App;
