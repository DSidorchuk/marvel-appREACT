import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import './style/style.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

/* 
1) при клике персонажа подсвечивать его, как в макете (эфект только на выбраном элементе)
2) что бы по элементам списка можно было пройтись с клавиатуры
подсказки:
в стилях есть класс, который возможно понаобится
ручной фокус и свойство таб индекс
фокус устанавливается на элементе,только после того, как он попадает в дом дерево
возможно понадобтся колюэк рефы

*/