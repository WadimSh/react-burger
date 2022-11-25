import { useState, useEffect } from 'react';

import AppHeader from '../app-header/app-header';
import Main from '../main/main';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

import style from './App.module.css';
let url = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        setData(res.data)
        console.log(res)
        console.log(data)
      });
  }, []);
  
  return (
    <div className={style.App}>
      <AppHeader />
      <Main>
        <BurgerIngredients
          ingredients={data}
        />
        <BurgerConstructor
         ingredients={data}
        />
      </Main>
    </div>
  );
}

export default App;
