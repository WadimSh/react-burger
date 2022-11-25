import style from './main.module.css';

function Main({children}) {
  
  return (
    <main className={style.main}>
      {children}
    </main>
  )
}

export default Main;
