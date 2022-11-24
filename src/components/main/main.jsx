import React from 'react';

import style from './main.module.css';

function Main({children}) {
  return (
    <div className={style.main}>
      {children}
    </div>
  );
}

export default Main;